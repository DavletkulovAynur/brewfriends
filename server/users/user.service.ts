import { userRepository } from "@/server/users/user.repository";

export const userService = {
  async list() {
    return userRepository.findAll();
  },

  async getById(id: string) {
    return userRepository.findById(id);
  },
};