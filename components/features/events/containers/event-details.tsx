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

export function EventDetails({ event }: EventDetailsProps) {
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

    const mapLocation = "ул. Карла Маркса, 23";
    const mapCoordinates = "55.940412,54.725556";
    const mapEmbedUrl = `https://yandex.ru/map-widget/v1/?ll=${mapCoordinates}&z=14&pt=${mapCoordinates},pm2rdm`;
    const dateParts = getDateParts(event.date);
    const startTime = event.time?.split(/[–—-]/, 1)[0].trim() || "Уточняется";
    const fallbackColor = {
        amber: "bg-amber-100",
        sky: "bg-sky-100",
        rose: "bg-rose-100",
    }[event.color];

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


                    <section className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex min-w-0 flex-col justify-between gap-1 rounded-xl bg-background p-2.5">
                            <span className="truncate text-xs capitalize text-muted-foreground">{dateParts.month}</span>
                            <span className="text-lg font-semibold leading-none text-foreground">{dateParts.day}</span>
                        </div>
                        <div className="flex min-w-0 flex-col justify-between gap-1 rounded-xl bg-background p-2.5">
                            <span className="truncate text-xs capitalize text-muted-foreground">{dateParts.weekday || "День"}</span>
                            <span className="break-words text-lg font-semibold leading-none text-foreground">{startTime}</span>
                        </div>
                    </section>

                    <section className="mt-auto flex min-w-0 flex-col gap-2">

                        <iframe
                            title={`Карта: ${mapLocation}`}
                            src={mapEmbedUrl}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-28 w-full rounded-lg border-0 bg-muted"
                        />
                    </section>
                </div>
            </article>

            <section className="flex flex-col gap-2 px-1 pt-1">
                <h1 className="break-words text-3xl font-semibold leading-tight text-foreground">{event.title}</h1>
                {event.description && event.description !== event.title ? (
                    <p
                        className="max-w-prose whitespace-pre-line break-words text-lg leading-[1.4]"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                        {event.description}
                    </p>
                ) : null}
            </section>

            <section className="rounded-2xl bg-primary/5 p-4">
                <h2 className="text-base font-semibold text-foreground">Почему стоит пойти</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Это отличный повод сменить обстановку, познакомиться с новыми людьми и провести время за любимым занятием.
                </p>
            </section>

            <Button
                type="button"
                onClick={() => shareEventInTelegram(event)}
                size="xl"

            >
                <Share2 className="size-4" aria-hidden="true" />
                Поделиться
            </Button>
        </div>
    );
}
