"use client";

import { useQuery } from "@tanstack/react-query";
import type { ProfileStory } from "@/domain/users/profile.types";

export const profileStoriesQueryKey = ["profiles", "stories"] as const;

async function fetchProfileStories(): Promise<ProfileStory[]> {
  const response = await fetch("/api/profiles/stories", {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Не удалось загрузить профили");

  const data = (await response.json()) as { people: ProfileStory[] };
  return data.people;
}

export function useProfileStoriesQuery(enabled = true) {
  return useQuery({
    queryKey: profileStoriesQueryKey,
    queryFn: fetchProfileStories,
    enabled,
  });
}