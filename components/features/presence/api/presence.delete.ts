"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownPresenceQueryKey } from "./own-presence.query";
import { presenceStoriesQueryKey } from "./presence-stories.query";
import type { OwnPresence } from "../types/types";

async function hidePresence(): Promise<OwnPresence> {
	const response = await fetch("/api/presence", {
		method: "DELETE",
		credentials: "include",
	});
	const data = (await response.json()) as {
		presence?: OwnPresence;
		error?: string;
	};

	if (!response.ok || !data.presence) {
		throw new Error(data.error ?? "Не удалось скрыть");
	}
	return data.presence;
}

export function useHidePresenceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: hidePresence,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: presenceStoriesQueryKey }),
				queryClient.invalidateQueries({ queryKey: ownPresenceQueryKey() }),
			]);
		},
	});
}