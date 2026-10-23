"use client";

import { useState } from "react";
import { Send, Users } from "lucide-react";
import { useEventConnectionsQuery } from "@/components/features/events/api/events.query";
import { Button } from "@/components/ui/button";

type EventConnectionsListProps = {
    eventId: string;
    count: number;
};

export function EventConnectionsList({ eventId, count }: EventConnectionsListProps) {
    const [open, setOpen] = useState(false);
    const query = useEventConnectionsQuery(eventId, open);

    return (
        <div className="mt-3">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={count === 0}
                onClick={() => setOpen((value) => !value)}
            >
                <Users aria-hidden /> Откликнулись: {count}
            </Button>
            {open ? (
                query.isLoading ? (
                    <p className="mt-2 text-xs text-muted-foreground">Загружаем...</p>
                ) : query.error ? (
                    <p role="alert" className="mt-2 text-xs text-destructive">{query.error.message}</p>
                ) : (
                    <ul className="mt-2 flex flex-col gap-2">
                        {query.data?.map((connection) => (
                            <li key={connection.userId} className="flex items-center justify-between gap-3 text-sm">
                                <span className="min-w-0 truncate">{connection.name}</span>
                                {connection.telegramUsername ? (
                                    <a
                                        href={`https://t.me/${encodeURIComponent(connection.telegramUsername)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Написать ${connection.name} в Telegram`}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <Send className="size-4" aria-hidden />
                                    </a>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                )
            ) : null}
        </div>
    );
}
