import type { PresenceStatus, UserPresence } from "./presence.types";

export const DEFAULT_PRESENCE_HOURS = 2;

export function isActivelySharing(presence: UserPresence): boolean {
  return (
    presence.isLocationShared &&
    presence.status !== "offline" &&
    !isPresenceExpired(presence)
  );
}

export function isPresenceExpired(presence: UserPresence): boolean {
  if (!presence.sharedUntil) return false;
  return new Date(presence.sharedUntil).getTime() <= Date.now();
}

export function presenceSharedUntil(hours = DEFAULT_PRESENCE_HOURS): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function resolvePresenceStatus(
  isAvailable: boolean,
  cafeId: string | null,
): PresenceStatus {
  if (!isAvailable) return "offline";
  if (cafeId) return "in_cafe";
  return "online";
}
