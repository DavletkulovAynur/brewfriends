import { cafeRepository } from "@/server/repositories/cafe.repo";

export const cafeService = {
  async list() {
    return cafeRepository.findAll();
  },
};
