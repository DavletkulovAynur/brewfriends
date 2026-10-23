import type { SuggestedPerson } from "@/domain/users/profile.types";
import { canViewProfile, shuffleProfiles } from "@/domain/users/profile.logic";
import {
  userRepository,
} from "@/server/users/user.repository";
import type { UpdateUserProfileInput } from "@/server/users/user.types";
import { eventRepository } from "@/server/events/event.repository";
import { interestsService } from "@/server/profile/interests.service";

export const profileService = {
  async listSuggestedProfiles(viewerId?: string): Promise<SuggestedPerson[]> {
    const users = await userRepository.findAll();

    const visibleProfiles = users
      .filter((user) => user.id !== viewerId && user.status.trim().length > 0)
      .filter((user) => canViewProfile(user, viewerId))
      .map(({ id, name, status, telegramUsername }) => ({
        id,
        name,
        status,
        telegramUsername,
      }));

    const primaryEvents = await eventRepository.findPrimaryByCreatorIds(
      visibleProfiles.map((user) => user.id),
    );
    const interests = await interestsService.listByUsers(
      visibleProfiles.map((user) => user.id),
    );
    const interestsByUserId = new Map<string, typeof interests>();
    for (const interest of interests) {
      const userInterests = interestsByUserId.get(interest.userId) ?? [];
      userInterests.push(interest);
      interestsByUserId.set(interest.userId, userInterests);
    }
    return shuffleProfiles(
      visibleProfiles.map((user) => ({
        ...user,
        primaryEvent: primaryEvents.get(user.id) ?? null,
        interests: interestsByUserId.get(user.id)?.map(({ activity, participation }) => ({
          activity,
          participation,
        })) ?? [],
      })),
    );
  },

  async update(userId: string, input: UpdateUserProfileInput) {
    const users = await userRepository.findAll();
    const knownUserIds = new Set(
      users.filter((user) => user.id !== userId).map((user) => user.id),
    );
    const unknownIds = input.visibleToUserIds.filter(
      (id) => !knownUserIds.has(id),
    );

    if (unknownIds.length > 0) {
      throw new Error("Selected audience contains unknown users");
    }

    return userRepository.updateProfile(userId, {
      ...input,
      visibleToUserIds:
        input.visibility === "selected" ? input.visibleToUserIds : [],
    });
  },
};