import type { SuggestedPerson } from "@/domain/users/profile.types";
import { canViewProfile, shuffleProfiles } from "@/domain/users/profile.logic";
import {
  userRepository,
} from "@/server/users/user.repository";
import type { UpdateUserProfileInput } from "@/server/users/user.types";

export const profileService = {
  async listSuggestedProfiles(viewerId?: string): Promise<SuggestedPerson[]> {
    const users = await userRepository.findAll();

    const visibleProfiles = users
      .filter((user) => user.id !== viewerId && user.status.trim().length > 0)
      .filter((user) => canViewProfile(user, viewerId))
      .map(({ id, name, status }) => ({ id, name, status }));

    return shuffleProfiles(visibleProfiles);
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