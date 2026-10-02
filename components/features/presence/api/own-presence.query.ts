"use client";

import { useQuery } from "@tanstack/react-query";
import type { OwnPresence } from "../types/types";

export function ownPresenceQueryKey(userId?: string) {
	return userId
		? (["presence", "own", userId] as const)
		: (["presence", "own"] as const);
}

async function fetchOwnPresence(): Promise<OwnPresence> {
	const response = await fetch("/api/presence/me", {
		credentials: "include",
	});
	if (!response.ok) throw new Error("Не удалось загрузить свой статус");

	const data = (await response.json()) as { presence: OwnPresence };
	return data.presence;
}

export function useOwnPresenceQuery(userId: string | undefined, enabled = true) {
	return useQuery({
		queryKey: ownPresenceQueryKey(userId),
		queryFn: fetchOwnPresence,
		enabled: Boolean(userId) && enabled,
	});
}