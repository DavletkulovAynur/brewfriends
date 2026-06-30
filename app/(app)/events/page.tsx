"use client";

import { EventListCard } from "@/components/features/events/event-list-card";
import { EventsHeader } from "@/components/features/events/events-header";
import { mockEvents } from "@/components/features/events/mock-events";

export default function EventsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <EventsHeader onSuggest={() => {}} />

      <ul className="flex flex-col gap-3">
        {mockEvents.map((event) => (
          <li key={event.id}>
            <EventListCard event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
