"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTelegramInitData, getTelegramWebApp } from "@/lib/telegram";

export type EventFormValues = {
    description: string;
    startsAt: string | null;
};

type EventFormProps = {
    initialValues?: EventFormValues;
    submitLabel: string;
    isPending: boolean;
    error: string | null;
    cancelHref: string;
    onSubmit: (values: EventFormValues) => void;
};

function toLocalInput(value: string | null) {
    if (!value) return "";
    const date = new Date(value);
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
}

export function EventForm({
    initialValues = { description: "", startsAt: null },
    submitLabel,
    isPending,
    error,
    cancelHref,
    onSubmit,
}: EventFormProps) {
    const router = useRouter();
    const [description, setDescription] = useState(initialValues.description);
    const [startsAt, setStartsAt] = useState(toLocalInput(initialValues.startsAt));
    const [hasTelegramBackButton, setHasTelegramBackButton] = useState(false);

    useEffect(() => {
        const backButton = getTelegramWebApp()?.BackButton;
        if (!backButton || !getTelegramInitData()) return;

        const goBack = () => router.push(cancelHref);
        backButton.show();
        backButton.onClick(goBack);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasTelegramBackButton(true);

        return () => {
            backButton.offClick(goBack);
            backButton.hide();
        };
    }, [cancelHref, router]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit({
            description: description.trim(),
            startsAt: startsAt ? new Date(startsAt).toISOString() : null,
        });
    }

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <header className="flex min-h-9 items-center justify-between gap-3">
                    {hasTelegramBackButton ? <span /> : (
                        <Button type="button" variant="ghost" onClick={() => router.push(cancelHref)}>
                            Назад
                        </Button>
                    )}
                    <Button type="submit" variant="secondary" disabled={isPending || !description.trim()}>
                        {isPending ? "Сохраняем..." : submitLabel}
                    </Button>
                </header>

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

                {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            </form>
        </div>
    );
}