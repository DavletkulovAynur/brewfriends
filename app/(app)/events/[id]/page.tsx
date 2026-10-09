"use client";

import { useParams } from "next/navigation";
import { useEventQuery } from "@/components/features/events/api/events.query";
import { EventDetails } from "@/components/features/events/containers/event-details";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventPage() {
    const { id } = useParams<{ id: string }>();
    const { data: event, isLoading, error } = useEventQuery(id);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
        );
    }

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
