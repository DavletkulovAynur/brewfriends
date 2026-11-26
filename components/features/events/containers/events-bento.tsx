"use client";

import { useEventsQuery } from "@/components/features/events/api/events.query";
import { EventHomeTileGrid } from "@/components/features/events/components/event-home-tile-grid";
import { EventHomeTileGridSkeleton } from "@/components/features/events/components/event-home-tile-grid-skeleton";
import { SectionHeader } from "@/components/shared/section-header";

export function EventsBento() {
  const { data: events, isLoading } = useEventsQuery();

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Встречи" href="/events" linkLabel="Все" />

      {isLoading ? (
        <EventHomeTileGridSkeleton />
      ) : (
        <EventHomeTileGrid events={events ?? []} />
      )}
    </section>
  );
}
