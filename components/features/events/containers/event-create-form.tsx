"use client";

import { useRouter } from "next/navigation";
import { EventForm } from "@/components/features/events/components/event-form";
import { useCreateEventMutation } from "@/components/features/events/api/events.query";

export function EventCreateForm() {
    const router = useRouter();
    const createEvent = useCreateEventMutation();

    return (
        <EventForm
            submitLabel="Опубликовать"
            isPending={createEvent.isPending}
            error={createEvent.error?.message ?? null}
            cancelHref="/settings"
            onSubmit={(values) => createEvent.mutate(values, {
                onSuccess: () => router.push("/settings/events"),
            })}
        />
    );
}
