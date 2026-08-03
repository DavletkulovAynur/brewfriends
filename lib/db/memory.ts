import type { Cafe } from "@/domain/cafes/cafe.types";
import type { UserPresence } from "@/domain/presence/presence.types";
import type { User } from "@/domain/users/user.types";

const SEED_CAFES: Cafe[] = [
  {
    id: "cafe_starbucks",
    name: "Starbucks",
    address: "ул. Тверская, 1",
    lat: 55.757,
    lng: 37.615,
  },
  {
    id: "cafe_double_b",
    name: "Double B",
    address: "Патриаршие пруды",
    lat: 55.763,
    lng: 37.592,
  },
  {
    id: "cafe_surf",
    name: "Surf Coffee",
    address: "ул. Покровка, 10",
    lat: 55.758,
    lng: 37.648,
  },
];

const globalStore = globalThis as typeof globalThis & {
  __brewfriendsMemory?: {
    users: Map<string, User>;
    usersByTelegramId: Map<string, string>;
    cafes: Map<string, Cafe>;
    presences: Map<string, UserPresence>;
  };
};

function store() {
  if (!globalStore.__brewfriendsMemory) {
    const cafes = new Map(SEED_CAFES.map((cafe) => [cafe.id, cafe]));
    globalStore.__brewfriendsMemory = {
      users: new Map(),
      usersByTelegramId: new Map(),
      cafes,
      presences: new Map(),
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
  getCafes() {
    return store().cafes;
  },
  getPresences() {
    return store().presences;
  },
};
