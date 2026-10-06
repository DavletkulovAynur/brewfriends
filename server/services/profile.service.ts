import type { User } from "@/domain/users/user.types";
import { canViewProfile } from "@/domain/users/profile.logic";
import {
  userRepository,
  type UpdateUserProfileInput,
} from "@/server/repositories/user.repo";

export type ProfileStory = Pick<User, "id" | "name" | "status">;

export const profileService = {
  async listVisibleStories(viewerId?: string): Promise<ProfileStory[]> {
    const users = await userRepository.findAll();

    return users
      .filter((user) => user.id !== viewerId && user.status.trim().length > 0)
      .filter((user) => canViewProfile(user, viewerId))
      .map(({ id, name, status }) => ({ id, name, status }));
  },

  async listVisibilityCandidates(userId: string) {
    const users = await userRepository.findAll();
    return users
      .filter((user) => user.id !== userId)
      .map(({ id, name }) => ({ id, name }));
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