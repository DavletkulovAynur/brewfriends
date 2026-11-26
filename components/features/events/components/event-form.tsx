"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { getTelegramInitData, getTelegramWebApp } from "@/lib/telegram";
import type { EventPriceType } from "@/domain/events/event.types";

export type EventFormValues = {
    title: string;
    description: string;
    location: string;
    priceType: EventPriceType;
    priceAmount: number | null;
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
    initialValues = {
        title: "",
        description: "",
        location: "",
        priceType: "free",
        priceAmount: null,
        startsAt: null,
    },
    submitLabel,
    isPending,
    error,
    cancelHref,
    onSubmit,
}: EventFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialValues.title);
    const [description, setDescription] = useState(initialValues.description);
    const [location, setLocation] = useState(initialValues.location);
    const [priceType, setPriceType] = useState<EventPriceType>(initialValues.priceType);
    const [priceAmount, setPriceAmount] = useState(initialValues.priceAmount?.toString() ?? "");
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
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            priceType,
            priceAmount: priceType === "free" ? null : Number(priceAmount),
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
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={
                            isPending ||
                            !title.trim() ||
                            !description.trim() ||
                            (priceType !== "free" && (!priceAmount || !Number.isSafeInteger(Number(priceAmount))))
                        }
                    >
                        {isPending ? "Сохраняем..." : submitLabel}
                    </Button>
                </header>

                <section className="flex min-w-0 flex-col gap-2">
                    <Input
                        id="event-title"
                        required
                        maxLength={100}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Основной title"
                    />
                </section>

                <section className="flex min-w-0 flex-col gap-2">

                    <Textarea
                        id="event-description"
                        required
                        maxLength={500}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Ищу компанию для работы в коворкинге в субботу"
                    />
                    <p className="text-xs text-muted-foreground">
                        Опиши встречу коротко, до 500 символов.
                    </p>
                </section>

                <section className="flex min-w-0 flex-col gap-2">
                    <label htmlFor="event-location" className="text-sm font-semibold">
                        Место <span className="font-normal text-muted-foreground">Необязательно</span>
                    </label>
                    <Input
                        id="event-location"
                        maxLength={200}
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="Например, Гостиный двор"
                    />
                </section>

                <section className="flex min-w-0 flex-col gap-2">
                    <label className="text-sm font-semibold">Стоимость</label>
                    <ToggleGroup
                        type="single"
                        value={priceType}
                        onValueChange={(value) => {
                            if (value === "free" || value === "paid") setPriceType(value);
                        }}
                        aria-label="Стоимость встречи"
                        className="h-14 w-full grid-cols-2 rounded-full border border-border bg-background p-1"
                    >
                        <ToggleGroupItem
                            value="paid"
                            className="h-full flex-1 rounded-full px-3 text-base data-[state=on]:bg-primary/10 data-[state=on]:text-foreground"
                        >
                            Платно
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="free"
                            className="h-full flex-1 rounded-full px-3 text-base data-[state=on]:bg-primary/10 data-[state=on]:text-foreground"
                        >
                            Бесплатно
                        </ToggleGroupItem>
                    </ToggleGroup>
                    {priceType !== "free" ? (
                        <div className="flex flex-col gap-2">
                            <label htmlFor="event-price-amount" className="text-sm font-medium">
                                Сумма, ₽
                            </label>
                            <Input
                                id="event-price-amount"
                                type="number"
                                inputMode="numeric"
                                min={1}
                                step={1}
                                required
                                value={priceAmount}
                                onChange={(event) => setPriceAmount(event.target.value)}
                                placeholder="Например, 500"
                            />
                        </div>
                    ) : null}
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
                        className="max-w-full box-border appearance-none overflow-hidden text-base shadow-sm md:text-base"
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