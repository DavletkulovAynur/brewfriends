import { scoreMatches } from "@/domain/matching/matching.logic";
import { userRepository } from "@/server/users/user.repository";

export const matchService = {
  async findMatches() {
    const users = await userRepository.findAll();
    return scoreMatches(users);
  },
};