import type { UserPresence } from "./presence.types";

export function isVisibleOnMap(presence: UserPresence): boolean {
  return (
    presence.status === "in_cafe" &&
    presence.isLocationShared &&
    Boolean(presence.cafeId) &&
    !isPresenceExpired(presence)
  );
}

export function isPresenceExpired(presence: UserPresence): boolean {
  if (!presence.sharedUntil) return false;
  return new Date(presence.sharedUntil).getTime() <= Date.now();
}
