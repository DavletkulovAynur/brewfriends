import type { User } from "@/domain/users/user.types";

const stubUsers: User[] = [];

export const userRepository = {
  async findAll(): Promise<User[]> {
    return stubUsers;
  },
};
