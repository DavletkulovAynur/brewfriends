import type { User } from "./user.types";

export function isProfileComplete(user: User): boolean {
  return Boolean(user.name && user.interests.length > 0);
}
