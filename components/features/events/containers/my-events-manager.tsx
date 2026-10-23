"use client";

import { useRouter } from "next/navigation";
import { Pencil, Star, Trash2 } from "lucide-react";
import {
    useDeleteEventMutation,
    useMyEventsQuery,
    useSetPrimaryEventMutation,
} from "@/components/features/events/api/events.query";
import { Button } from "@/components/ui/button";
import { EventConnectionsList } from "@/components/features/events/components/event-connections-list";
import { formatEventDateLabel } from "@/domain/events/event.logic";
import { toBentoEvent } from "@/components/features/events/helpers/to-bento-event";

export function MyEventsManager() {
    const router = useRouter();
    const eventsQuery = useMyEventsQuery();
    const setPrimary = useSetPrimaryEventMutation();
    const deleteEvent = useDeleteEventMutation();

    function removeEvent(id: string) {
        if (!window.confirm("Удалить эту встречу?")) return;
        deleteEvent.mutate(id);
    }

    return (
        <section className="flex flex-col gap-3 px-6 pb-6" aria-busy={eventsQuery.isLoading}>
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold">Мои события</h2>
                <span className="text-xs text-muted-foreground">Главная будет видна в профиле</span>
            </div>

            {eventsQuery.error ? (
                <p role="alert" className="text-sm text-destructive">{eventsQuery.error.message}</p>
            ) : null}
            {setPrimary.error ? <p role="alert" className="text-sm text-destructive">{setPrimary.error.message}</p> : null}
            {deleteEvent.error ? <p role="alert" className="text-sm text-destructive">{deleteEvent.error.message}</p> : null}

            {eventsQuery.isLoading ? (
                <p className="text-sm text-muted-foreground">Загружаем встречи...</p>
            ) : eventsQuery.data?.length ? (
                <ul className="flex flex-col gap-3">
                    {eventsQuery.data.map((event) => (
                        <li key={event.id} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                            <>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="whitespace-pre-line text-sm font-medium">{event.description}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{formatEventDateLabel(toBentoEvent(event).date)}</p>
                                    </div>
                                    {event.isPrimary ? (
                                        <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-amber-700">
                                            <Star className="size-3.5 fill-current" aria-hidden /> Главная
                                        </span>
                                    ) : null}
                                </div>
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {!event.isPrimary ? (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            disabled={setPrimary.isPending}
                                            onClick={() => setPrimary.mutate(event.id)}
                                        >
                                            <Star aria-hidden /> Сделать главной
                                        </Button>
                                    ) : null}
                                    <Button type="button" variant="ghost" size="icon-sm" aria-label="Редактировать встречу" onClick={() => router.push(`/events/${encodeURIComponent(event.id)}/edit`)}>
                                        <Pencil aria-hidden />
                                    </Button>
                                    <Button type="button" variant="ghost" size="icon-sm" aria-label="Удалить встречу" onClick={() => removeEvent(event.id)} disabled={deleteEvent.isPending}>
                                        <Trash2 aria-hidden />
                                    </Button>
                                </div>
                                <EventConnectionsList eventId={event.id} count={event.connectionsCount ?? 0} />
                            </>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-muted-foreground">Пока нет опубликованных встреч.</p>
            )}
        </section>
    );
}