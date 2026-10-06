"use client";

import { ProfileStoriesRow } from "@/components/features/profile/containers/profile-stories-row";
import { EventsBento } from "@/components/features/events/containers/events-bento";
import { HOME_EVENT_TILE_COUNT } from "@/components/features/events/components/event-bento-card";
import { mockEvents } from "@/components/features/events/mock-events";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <header></header>

      <ProfileStoriesRow />

      <EventsBento events={mockEvents.slice(0, HOME_EVENT_TILE_COUNT)} />
    </div>
  );
}
