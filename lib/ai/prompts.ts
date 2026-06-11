import type { User } from "@/domain/users/user.types";

export function matchPrompt(users: User[]): string {
  return `Find best matches among ${users.length} users based on interests and availability.`;
}
