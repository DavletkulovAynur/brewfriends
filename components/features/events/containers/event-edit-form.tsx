"use client";

import { useRouter } from "next/navigation";
import { EventForm } from "@/components/features/events/components/event-form";
import {
    useMyEventsQuery,
    useUpdateEventMutation,
} from "@/components/features/events/api/events.query";

export function EventEditForm({ eventId }: { eventId: string }) {
    const router = useRouter();
    const eventsQuery = useMyEventsQuery();
    const updateEvent = useUpdateEventMutation();
    const event = eventsQuery.data?.find((item) => item.id === eventId);

    if (eventsQuery.isLoading) {
        return <p className="p-6 text-sm text-muted-foreground">Загружаем событие...</p>;
    }
    if (eventsQuery.error) {
        return <p role="alert" className="p-6 text-sm text-destructive">{eventsQuery.error.message}</p>;
    }
    if (!event) {
        return <p role="alert" className="p-6 text-sm text-muted-foreground">Событие не найдено.</p>;
    }

    return (
        <EventForm
            key={event.id}
            initialValues={{
                description: event.description,
                startsAt: event.startsAt,
            }}
            submitLabel="Сохранить"
            isPending={updateEvent.isPending}
            error={updateEvent.error?.message ?? null}
            cancelHref="/settings/events"
            onSubmit={(values) => updateEvent.mutate(
                { id: event.id, ...values },
                { onSuccess: () => router.push("/settings/events") },
            )}
        />
    );
}
