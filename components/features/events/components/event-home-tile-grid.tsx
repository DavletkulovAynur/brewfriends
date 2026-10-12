import { EventBentoCard } from "@/components/features/events/components/event-bento-card";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

export const HOME_EVENT_TILE_COUNT = 6;

export function EventHomeTileGrid({ events }: { events: BentoEvent[] }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {events.slice(0, HOME_EVENT_TILE_COUNT).map((event) => (
                <EventBentoCard key={event.id} event={event} />
            ))}
        </div>
    );
}
