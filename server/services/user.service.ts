import { userRepository } from "@/server/repositories/user.repo";

export const userService = {
  async list() {
    return userRepository.findAll();
  },

  async getById(id: string) {
    return userRepository.findById(id);
  },
};
