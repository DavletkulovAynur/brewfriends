import {
  isActivelySharing,
  presenceSharedUntil,
  resolvePresenceStatus,
} from "@/domain/presence/presence.logic";
import type { UserPresence } from "@/domain/presence/presence.types";
import { cafeRepository } from "@/server/repositories/cafe.repo";
import { presenceRepository } from "@/server/repositories/presence.repo";
import { userRepository } from "@/server/repositories/user.repo";

export type PresenceStoryPerson = {
  id: string;
  name: string;
  cafeName: string;
  cafeId?: string;
};

export type OwnPresenceView = {
  isAvailable: boolean;
  cafeId: string | null;
  status: UserPresence["status"];
  sharedUntil?: string;
};

const MAX_VISIBLE_STORIES = 6;

function randomSample<T>(items: T[], limit: number): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled.slice(0, limit);
}

export const presenceService = {
  async getOwn(userId: string): Promise<OwnPresenceView> {
    const presence = await presenceRepository.findByUserId(userId);
    if (!presence || !isActivelySharing(presence)) {
      return {
        isAvailable: false,
        cafeId: null,
        status: "offline",
      };
    }

    return {
      isAvailable: true,
      cafeId: presence.cafeId ?? null,
      status: presence.status,
      sharedUntil: presence.sharedUntil,
    };
  },

  async listVisibleStories(excludeUserId?: string): Promise<PresenceStoryPerson[]> {
    const [presences, users, cafes] = await Promise.all([
      presenceRepository.findAll(),
      userRepository.findAll(),
      cafeRepository.findAll(),
    ]);

    const usersById = new Map(users.map((user) => [user.id, user]));
    const cafesById = new Map(cafes.map((cafe) => [cafe.id, cafe]));

    const visibleStories = presences
      .filter((presence) => isActivelySharing(presence))
      .filter((presence) => presence.userId !== excludeUserId)
      .flatMap((presence) => {
        const user = usersById.get(presence.userId);
        if (!user) return [];

        const cafe = presence.cafeId
          ? cafesById.get(presence.cafeId)
          : undefined;

        const person: PresenceStoryPerson = {
          id: user.id,
          name: user.name,
          cafeName: cafe?.name ?? "Онлайн",
          cafeId: presence.cafeId,
        };
        return [person];
      });

    return randomSample(visibleStories, MAX_VISIBLE_STORIES);
  },

  async save(
    userId: string,
    input: { isAvailable: boolean; cafeId: string | null },
  ): Promise<OwnPresenceView> {
    if (!input.isAvailable) {
      await presenceRepository.hide(userId);
      return this.getOwn(userId);
    }

    if (input.cafeId) {
      const cafe = await cafeRepository.findById(input.cafeId);
      if (!cafe) {
        throw new Error("Cafe not found");
      }
    }

    const status = resolvePresenceStatus(true, input.cafeId);
    await presenceRepository.upsert({
      userId,
      status,
      isLocationShared: true,
      cafeId: input.cafeId,
      sharedUntil: presenceSharedUntil(),
    });

    return this.getOwn(userId);
  },

  async hide(userId: string): Promise<OwnPresenceView> {
    await presenceRepository.hide(userId);
    return this.getOwn(userId);
  },
};
