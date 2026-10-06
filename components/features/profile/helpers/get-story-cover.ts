import { STORY_COVERS } from "../constants/story-covers";

export function getStoryCover(profileId: string): string {
  const hash = [...profileId].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return STORY_COVERS[hash % STORY_COVERS.length];
}