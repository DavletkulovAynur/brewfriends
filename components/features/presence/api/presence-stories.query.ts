"use client";

import { useQuery } from "@tanstack/react-query";
import type { CafeStoryPerson } from "../types/types";

export const presenceStoriesQueryKey = ["presence", "stories"] as const;

async function fetchPresenceStories(): Promise<CafeStoryPerson[]> {
	const response = await fetch("/api/presence", { credentials: "include" });
	if (!response.ok) throw new Error("Не удалось загрузить статус");

	const data = (await response.json()) as { people: CafeStoryPerson[] };
	return data.people;
}

export function usePresenceStoriesQuery(enabled = true) {
	return useQuery({
		queryKey: presenceStoriesQueryKey,
		queryFn: fetchPresenceStories,
		enabled,
	});
}