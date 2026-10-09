"use client";

import { useParams } from "next/navigation";
import { useEventQuery } from "@/components/features/events/api/events.query";
import { EventDetails } from "@/components/features/events/containers/event-details";
import { EventDetailsSkeleton } from "@/components/features/events/containers/event-details-skeleton";

export default function EventPage() {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading, error } = useEventQuery(id);

    if (isLoading) return <EventDetailsSkeleton />;

    if (error) {
        return <p className="p-6 text-center text-sm text-red-500">{error.message}</p>;
    }

    if (!event) {
        return (
            <p className="p-6 text-center text-sm text-zinc-500">Событие не найдено</p>
        );
    }

    return <EventDetails event={event} />;
}
