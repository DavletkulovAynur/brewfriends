"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCreateEventMutation } from "@/components/features/events/api/events.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function EventCreateForm() {
    const router = useRouter();
    const createEvent = useCreateEventMutation();
    const [description, setDescription] = useState("");
    const [startsAt, setStartsAt] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        createEvent.mutate(
            {
                description: description.trim(),
                startsAt: startsAt ? new Date(startsAt).toISOString() : null,
            },
            {
                onSuccess: (createdEvent) => router.push(`/events/${createdEvent.id}`),
            },
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
            <header className="flex items-center gap-3">
                <Link
                    href="/settings"
                    aria-label="Назад"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <ArrowLeft className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <h1 className="text-2xl font-semibold">Создать встречу</h1>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                    <label htmlFor="event-description" className="text-sm font-semibold">
                        Что планируешь?
                    </label>
                    <Textarea
                        id="event-description"
                        required
                        maxLength={500}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Ищу компанию для работы в коворкинге в субботу"
                        className="min-h-36 resize-none rounded-xl border-transparent bg-white p-4 text-base shadow-sm focus-visible:border-ring md:text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                        Опиши встречу коротко, до 500 символов.
                    </p>
                </section>

                <section className="flex flex-col gap-2">
                    <label htmlFor="event-starts-at" className="text-sm font-semibold">
                        Когда? <span className="font-normal text-muted-foreground">Необязательно</span>
                    </label>
                    <Input
                        id="event-starts-at"
                        type="datetime-local"
                        value={startsAt}
                        onChange={(event) => setStartsAt(event.target.value)}
                        className="h-12 rounded-xl border-transparent bg-white px-4 text-base shadow-sm md:text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                        Оставь пустым, если дата и время пока не определены.
                    </p>
                </section>

                {createEvent.error ? (
                    <p role="alert" className="text-sm text-destructive">
                        {createEvent.error.message}
                    </p>
                ) : null}

                <Button
                    type="submit"
                    disabled={createEvent.isPending || !description.trim()}
                    className="min-h-11 w-full rounded-xl"
                >
                    {createEvent.isPending ? "Публикуем..." : "Опубликовать встречу"}
                </Button>
            </form>
        </div>
    );
}