export type PresenceStatus = "offline" | "online" | "in_cafe";

export type UserPresence = {
  userId: string;
  status: PresenceStatus;
  isLocationShared: boolean;
  cafeId?: string;
  sharedUntil?: string;
};
