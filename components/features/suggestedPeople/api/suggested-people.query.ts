"use client";

import { useQuery } from "@tanstack/react-query";
import type { SuggestedPerson } from "@/domain/users/profile.types";

export const suggestedPeopleQueryKey = ["profiles", "suggestions"] as const;

async function fetchSuggestedPeople(): Promise<SuggestedPerson[]> {
  const response = await fetch("/api/profiles/suggestions", {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Не удалось загрузить профили");

  const data = (await response.json()) as { people: SuggestedPerson[] };
  return data.people;
}

export function useSuggestedPeopleQuery(enabled = true) {
  return useQuery({
    queryKey: suggestedPeopleQueryKey,
    queryFn: fetchSuggestedPeople,
    enabled,
  });
}