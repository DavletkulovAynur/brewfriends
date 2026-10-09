"use client";

import { SuggestedPeopleRow } from "@/components/features/suggestedPeople/containers/suggested-people-row";
import { useEventsQuery } from "@/components/features/events/api/events.query";
import { EventsBento } from "@/components/features/events/containers/events-bento";
import { HOME_EVENT_TILE_COUNT } from "@/components/features/events/components/event-bento-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data: events, isLoading } = useEventsQuery();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <SuggestedPeopleRow />

      {isLoading ? (
        <Skeleton className="h-80 w-full rounded-3xl" />
      ) : (
        <EventsBento events={(events ?? []).slice(0, HOME_EVENT_TILE_COUNT)} />
      )}
    </div>
  );
}
