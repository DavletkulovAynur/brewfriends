import type { User } from "./user.types";

export function canViewProfile(
  profile: Pick<User, "visibility" | "visibleToUserIds">,
  viewerId?: string,
): boolean {
  return (
    profile.visibility === "everyone" ||
    (viewerId !== undefined && profile.visibleToUserIds.includes(viewerId))
  );
}

export function shuffleProfiles<T>(profiles: T[], random = Math.random): T[] {
  const shuffled = [...profiles];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}