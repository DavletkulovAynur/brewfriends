import { STORY_COVERS } from "../constants/constants";
import type { CafeOption } from "@/components/features/cafes/types/cafe.types";
import type { OwnPresence } from "../types/types";

export function getStoryCover(id: string): string {
  const hash = [...id].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  return STORY_COVERS[hash % STORY_COVERS.length];
}

export function getOwnSubtitle(
  presence: OwnPresence,
  cafes: CafeOption[],
): string {
  if (!presence.isAvailable) return "Я в кафе";
  if (!presence.cafeId) return "Доступен";
  return cafes.find((cafe) => cafe.id === presence.cafeId)?.name ?? "В кафе";
}