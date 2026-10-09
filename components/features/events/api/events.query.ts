"use client";

import { useQuery } from "@tanstack/react-query";
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

export function useEventQuery(id: string) {
  return useQuery({ queryKey: ["events", id], queryFn: () => fetchEvent(id) });
}
