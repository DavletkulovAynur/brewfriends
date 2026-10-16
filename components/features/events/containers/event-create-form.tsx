"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCreateEventMutation } from "@/components/features/events/api/events.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTelegramInitData, getTelegramWebApp } from "@/lib/telegram";

export function EventCreateForm() {
    const router = useRouter();
    const createEvent = useCreateEventMutation();
    const [hasTelegramBackButton, setHasTelegramBackButton] = useState(false);
    const [description, setDescription] = useState("");
    const [startsAt, setStartsAt] = useState("");

    useEffect(() => {
        const backButton = getTelegramWebApp()?.BackButton;
        if (!backButton || !getTelegramInitData()) return;

        const goBack = () => router.push("/settings");
        backButton.show();
        backButton.onClick(goBack);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasTelegramBackButton(true);

        return () => {
            backButton.offClick(goBack);
            backButton.hide();
        };
    }, [router]);

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
                {hasTelegramBackButton ? null : (
                    <button
                        type="button"
                        onClick={() => router.push("/settings")}
                        className="shrink-0 text-sm font-medium text-sky-600"
                    >
                        Назад
                    </button>
                )}
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <section className="flex min-w-0 flex-col gap-2">
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
                        className="min-h-24 resize-none rounded-xl border-transparent bg-white p-4 text-base shadow-sm focus-visible:border-ring md:text-base"
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
                        className="h-12 w-full min-w-0 max-w-full box-border appearance-none overflow-hidden rounded-xl border-transparent bg-white px-4 text-base shadow-sm md:text-base"
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