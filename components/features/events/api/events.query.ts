"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Event } from "@/domain/events/event.types";
import { toBentoEvent } from "@/components/features/events/helpers/to-bento-event";

async function fetchEvents() {
  const response = await fetch("/api/events");
  if (!response.ok) throw new Error("Не удалось загрузить события");

  const data = (await response.json()) as { events: Event[] };
  return data.events.map(toBentoEvent);
}

async function fetchEvent(id: string) {
  const response = await fetch(`/api/events/${encodeURIComponent(id)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Не удалось загрузить событие");

  const data = (await response.json()) as { event: Event };
  return toBentoEvent(data.event);
}

export function useEventsQuery() {
  return useQuery({ queryKey: ["events"], queryFn: fetchEvents });
}

export const myEventsQueryKey = ["events", "mine"] as const;

async function fetchMyEvents(): Promise<Event[]> {
  const response = await fetch("/api/events/mine", { credentials: "include" });
  if (!response.ok) throw new Error("Не удалось загрузить ваши встречи");
  const data = (await response.json()) as { events: Event[] };
  return data.events;
}

export function useMyEventsQuery(enabled = true) {
  return useQuery({
    queryKey: myEventsQueryKey,
    queryFn: fetchMyEvents,
    enabled,
  });
}

export function useEventQuery(id: string) {
  return useQuery({ queryKey: ["events", id], queryFn: () => fetchEvent(id) });
}

async function createEvent(input: { description: string; startsAt: string | null }) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as { event?: Event; error?: string };

  if (!response.ok || !data.event) {
    throw new Error(data.error ?? "Не удалось создать встречу");
  }

  return data.event;
}

export function useCreateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: async (event) => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      await queryClient.invalidateQueries({ queryKey: myEventsQueryKey });
      await queryClient.invalidateQueries({ queryKey: ["profiles", "suggestions"] });
      queryClient.setQueryData(["events", event.id], toBentoEvent(event));
    },
  });
}

async function updateEvent(input: {
  id: string;
  description: string;
  startsAt: string | null;
}) {
  const response = await fetch(`/api/events/${encodeURIComponent(input.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ description: input.description, startsAt: input.startsAt }),
  });
  const data = (await response.json()) as { event?: Event; error?: string };
  if (!response.ok || !data.event) throw new Error(data.error ?? "Не удалось изменить встречу");
  return data.event;
}

async function setPrimaryEvent(id: string) {
  const response = await fetch(`/api/events/${encodeURIComponent(id)}/primary`, {
    method: "PUT",
    credentials: "include",
  });
  const data = (await response.json()) as { event?: Event; error?: string };
  if (!response.ok || !data.event) throw new Error(data.error ?? "Не удалось выбрать встречу");
  return data.event;
}

async function deleteEvent(id: string) {
  const response = await fetch(`/api/events/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = (await response.json()) as { error?: string };
  if (!response.ok) throw new Error(data.error ?? "Не удалось удалить встречу");
}

function useInvalidateEventLists() {
  const queryClient = useQueryClient();
  return async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["events"] }),
      queryClient.invalidateQueries({ queryKey: myEventsQueryKey }),
      queryClient.invalidateQueries({ queryKey: ["profiles", "suggestions"] }),
    ]);
  };
}

export function useUpdateEventMutation() {
  const invalidate = useInvalidateEventLists();
  return useMutation({ mutationFn: updateEvent, onSuccess: invalidate });
}

export function useSetPrimaryEventMutation() {
  const invalidate = useInvalidateEventLists();
  return useMutation({ mutationFn: setPrimaryEvent, onSuccess: invalidate });
}

export function useDeleteEventMutation() {
  const invalidate = useInvalidateEventLists();
  return useMutation({ mutationFn: deleteEvent, onSuccess: invalidate });
}
