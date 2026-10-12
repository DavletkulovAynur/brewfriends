"use client";

import { useEventsQuery } from "@/components/features/events/api/events.query";
import { EventHomeTileGrid } from "@/components/features/events/components/event-home-tile-grid";
import { SectionHeader } from "@/components/shared/section-header";
import { Skeleton } from "@/components/ui/skeleton";

export function EventsBento() {
  const { data: events, isLoading } = useEventsQuery();

  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Встречи" href="/events" linkLabel="Все" />

      {isLoading ? (
        <Skeleton className="h-80 w-full rounded-3xl" />
      ) : (
        <EventHomeTileGrid events={events ?? []} />
      )}
    </section>
  );
}
