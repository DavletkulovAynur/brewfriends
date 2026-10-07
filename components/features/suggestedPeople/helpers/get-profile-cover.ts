import { PROFILE_COVERS } from "../constants/profile-covers";

export function getProfileCover(profileId: string): string {
  const hash = Array.from(profileId).reduce(
    (value, character) => value + character.charCodeAt(0),
    0,
  );
  return PROFILE_COVERS[hash % PROFILE_COVERS.length];
}