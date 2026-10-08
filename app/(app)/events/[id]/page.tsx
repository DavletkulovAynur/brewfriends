"use client";

import { useParams } from "next/navigation";
import { EventDetails } from "@/components/features/events/containers/event-details";
import { mockEvents } from "@/components/features/events/mock-events";

export default function EventPage() {
    const { id } = useParams<{ id: string }>();
    const event = mockEvents.find((item) => item.id === id);

    if (!event) {
        return (
            <p className="p-6 text-center text-sm text-zinc-500">Событие не найдено</p>
        );
    }

    return <EventDetails event={event} />;
}
