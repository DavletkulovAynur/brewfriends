import type { User } from "@/domain/users/user.types";

export type MatchScore = {
  user: User;
  score: number;
};

export function scoreMatches(users: User[]): MatchScore[] {
  return users.map((user) => ({ user, score: 0 }));
}
