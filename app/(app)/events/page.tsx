"use client";

import { useEventsQuery } from "@/components/features/events/api/events.query";
import { EventListCard } from "@/components/features/events/components/event-list-card";
import { EventsHeader } from "@/components/features/events/components/events-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventsPage() {
  const { data: events, isLoading, error } = useEventsQuery();

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <EventsHeader onSuggest={() => { }} />

      {error ? <p className="text-center text-sm text-red-500">{error.message}</p> : null}

      <ul className="flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-24 w-full rounded-2xl" />
            </li>
          ))
          : events?.map((event) => (
            <li key={event.id}>
              <EventListCard event={event} />
            </li>
          ))}
      </ul>
    </div>
  );
}
