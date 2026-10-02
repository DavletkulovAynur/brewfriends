"use client";

import { CafeStoriesRow } from "@/components/features/presence/containers/cafe-stories-row";
import { EventsBento } from "@/components/features/events/containers/events-bento";
import { HOME_EVENT_TILE_COUNT } from "@/components/features/events/components/event-bento-card";
import { mockEvents } from "@/components/features/events/mock-events";
import { useAuth } from "@/components/providers/telegram-auth-provider";

export default function HomePage() {
  const { user, status } = useAuth();
  const name = user?.name ?? (status === "loading" ? "..." : "друг");

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <header></header>

      <CafeStoriesRow />

      <EventsBento events={mockEvents.slice(0, HOME_EVENT_TILE_COUNT)} />
    </div>
  );
}
