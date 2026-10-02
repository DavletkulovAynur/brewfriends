"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownPresenceQueryKey } from "./own-presence.query";
import { presenceStoriesQueryKey } from "./presence-stories.query";
import type { OwnPresence } from "../types/types";

type SavePresenceInput = {
	isAvailable: boolean;
	cafeId: string | null;
};

async function savePresence(input: SavePresenceInput): Promise<OwnPresence> {
	const response = await fetch("/api/presence", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify(input),
	});
	const data = (await response.json()) as {
		presence?: OwnPresence;
		error?: string;
	};

	if (!response.ok || !data.presence) {
		throw new Error(data.error ?? "Не удалось сохранить");
	}
	return data.presence;
}

export function useSavePresenceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: savePresence,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: presenceStoriesQueryKey }),
				queryClient.invalidateQueries({ queryKey: ownPresenceQueryKey() }),
			]);
		},
	});
}