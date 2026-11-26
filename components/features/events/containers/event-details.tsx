"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    getTelegramInitData,
    getTelegramWebApp,
    shareEventInTelegram,
} from "@/lib/telegram";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

type EventDetailsProps = {
    event: BentoEvent;
    eyebrow?: string;
    metadata?: { label: string; value: string }[];
    contentSections?: { title: string; content: string }[];
    shareable?: boolean;
};

function getDateParts(value: string | null) {
    if (!value) return { month: "Без даты", day: "--", weekday: "" };

    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return {
        month: new Intl.DateTimeFormat("ru-RU", { month: "long" }).format(date),
        day: new Intl.DateTimeFormat("ru-RU", { day: "2-digit" }).format(date),
        weekday: new Intl.DateTimeFormat("ru-RU", { weekday: "long" }).format(date),
    };
}

export function EventDetails({ event, eyebrow, metadata, contentSections, shareable = true }: EventDetailsProps) {
    const router = useRouter();
    const [hasNativeBack, setHasNativeBack] = useState(false);

    useEffect(() => {
        const backButton = getTelegramWebApp()?.BackButton;
        if (!backButton || !getTelegramInitData()) return;

        const goBack = () => router.back();
        backButton.show();
        backButton.onClick(goBack);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasNativeBack(true);

        return () => {
            backButton.offClick(goBack);
            backButton.hide();
        };
    }, [router]);

    const mapEmbedUrl = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(event.location)}&z=14`;
    const dateParts = getDateParts(event.date);
    const startTime = event.time?.split(/[–—-]/, 1)[0].trim() || "Уточняется";
    const fallbackColor = {
        amber: "bg-amber-100",
        sky: "bg-sky-100",
        rose: "bg-rose-100",
    }[event.color];
    const eventMetadata = metadata ?? [
        { label: dateParts.month, value: dateParts.day },
        { label: dateParts.weekday || "День", value: startTime },
    ];
    const sections = contentSections ?? [
        {
            title: "Почему стоит пойти",
            content: "Это отличный повод сменить обстановку, познакомиться с новыми людьми и провести время за любимым занятием.",
        },
    ];
    const priceLabel = event.priceType === "free"
        ? "Бесплатно"
        : event.priceType === "paid"
            ? `${event.priceAmount} ₽`
            : null;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
            {hasNativeBack ? null : (
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="-ml-2 flex w-fit items-center gap-1 text-sm font-medium text-sky-600"
                >
                    <ChevronLeft className="size-5" />
                    Назад
                </button>
            )}

            <article className="flex min-h-[200px] overflow-hidden rounded-2xl border border-border bg-white">
                <div className={`relative w-[30%] shrink-0 overflow-hidden ${fallbackColor}`}>
                    {event.videoUrl ? (
                        <video
                            src={event.videoUrl}
                            poster={event.imageUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                            className="absolute inset-0 size-full object-cover"
                        />
                    ) : event.imageUrl ? (
                        <Image src={event.imageUrl} alt="" fill sizes="30vw" className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/10 to-black/5">
                            <CalendarDays className="size-8 text-foreground/50" strokeWidth={1.5} aria-hidden="true" />
                        </div>
                    )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-4 p-3">
                    <section className={`${eventMetadata.length === 1 ? "grid-cols-1" : "grid-cols-2"} grid gap-2 text-sm`}>
                        {eventMetadata.slice(0, 2).map((item) => (
                            <div key={item.label} className="flex min-w-0 flex-col justify-between gap-1 rounded-xl bg-background p-2.5">
                                <span className="truncate text-xs capitalize text-muted-foreground">{item.label}</span>
                                <span className="break-words text-lg font-semibold leading-tight text-foreground">{item.value}</span>
                            </div>
                        ))}
                    </section>

                    <section className="mt-auto flex min-w-0 flex-col gap-2">
                        <iframe
                            title={`Карта: ${event.location}`}
                            src={mapEmbedUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-28 w-full rounded-lg border-0 bg-muted"
                        />
                    </section>
                </div>
            </article>

            <section className="flex flex-col gap-2 px-1 pt-1">
                {eyebrow ? <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p> : null}
                <h1 className="break-words text-3xl font-semibold leading-tight text-foreground">{event.title}</h1>
                {event.description && event.description !== event.title ? (
                    <p
                        className="max-w-prose whitespace-pre-line break-words text-lg leading-[1.4]"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        {event.description}
                    </p>
                ) : null}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {event.location ? <p>Место: {event.location}</p> : null}
                    {priceLabel ? <p>Стоимость: {priceLabel}</p> : null}
                </div>
            </section>

            {sections.map((section) => (
                <section key={section.title} className="rounded-2xl bg-primary/5 p-4">
                    <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">{section.content}</p>
                </section>
            ))}

            {shareable ? (
                <Button
                    type="button"
                    onClick={() => shareEventInTelegram(event)}
                    size="xl"
                >
                    <Share2 className="size-4" aria-hidden="true" />
                    Поделиться
                </Button>
            ) : null}
        </div>
    );
}
