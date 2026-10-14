import Image from "next/image";
import { EventBentoCard } from "@/components/features/events/components/event-bento-card";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

export const HOME_EVENT_TILE_COUNT = 6;

export function EventHomeTileGrid({ events }: { events: BentoEvent[] }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {events.slice(0, 3).map((event) => (
                <EventBentoCard key={event.id} event={event} />
            ))}
            <aside className="relative col-span-2 flex min-h-36 items-end overflow-hidden rounded-2xl bg-zinc-900 p-4 text-white">
                <Image
                    src="/events/1.jpg"
                    alt="Уютное место для просмотра кино"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <p className="relative text-lg font-semibold">Кино, кофе и встречи по соседству</p>
            </aside>
            {events.slice(3, HOME_EVENT_TILE_COUNT).map((event) => (
                <EventBentoCard key={event.id} event={event} />
            ))}
        </div>
    );
}
