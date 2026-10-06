import type { User } from "@/domain/users/user.types";

const globalStore = globalThis as typeof globalThis & {
  __brewfriendsMemory?: {
    users: Map<string, User>;
    usersByTelegramId: Map<string, string>;
  };
};

function store() {
  if (!globalStore.__brewfriendsMemory) {
    globalStore.__brewfriendsMemory = {
      users: new Map(),
      usersByTelegramId: new Map(),
    };
  }
  return globalStore.__brewfriendsMemory;
}

export const memoryStore = {
  getUsers() {
    return store().users;
  },
  getUsersByTelegramId() {
    return store().usersByTelegramId;
  },
};
