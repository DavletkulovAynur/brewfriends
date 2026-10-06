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