import type { CreateInterestInput } from "@/domain/users/interests.logic";
import { interestsRepository } from "@/server/profile/interests.repository";

export const interestsService = {
  list(userId: string) {
    return interestsRepository.listByUser(userId);
  },

  listByUsers(userIds: string[]) {
    return interestsRepository.listByUsers(userIds);
  },

  create(userId: string, input: CreateInterestInput) {
    return interestsRepository.create(userId, input.activity, input.description, input.participation);
  },

  delete(userId: string, id: string) {
    return interestsRepository.deleteOwned(id, userId);
  },
};