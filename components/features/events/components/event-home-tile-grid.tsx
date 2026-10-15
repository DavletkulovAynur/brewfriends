import { EventBentoCard } from "@/components/features/events/components/event-bento-card";
import { EventPromoBanner } from "@/components/features/events/components/event-promo-banner";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

export const HOME_EVENT_TILE_COUNT = 6;

export function EventHomeTileGrid({ events }: { events: BentoEvent[] }) {
    const finalTileEvents = events.slice(3, HOME_EVENT_TILE_COUNT);

    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
                {events.slice(0, 2).map((event) => (
                    <EventBentoCard key={event.id} event={event} />
                ))}
            </div>
            {events[2] ? (
                <div className="flex items-center">
                    <EventBentoCard event={events[2]} detailsBelow />
                </div>
            ) : null}
            <EventPromoBanner />
            {finalTileEvents[0] ? (
                <div className="flex items-center">
                    <EventBentoCard event={finalTileEvents[0]} detailsBelow />
                </div>
            ) : null}
            {finalTileEvents.length > 1 ? (
                <div className="flex flex-col gap-3">
                    {finalTileEvents.slice(1).map((event) => (
                        <EventBentoCard key={event.id} event={event} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
