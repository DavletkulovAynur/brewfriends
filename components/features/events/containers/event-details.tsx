"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Clock, MapPin, Share2 } from "lucide-react";
import { formatEventDateLabel } from "@/domain/events/event.logic";
import {
    getTelegramInitData,
    getTelegramWebApp,
    shareEventInTelegram,
} from "@/lib/telegram";
import type { BentoEvent } from "../components/event-bento-card";

type EventDetailsProps = {
    event: BentoEvent;
};

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

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
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

            <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                    {formatEventDateLabel(event.date)}
                </span>
                <h1 className="text-2xl font-semibold leading-7">{event.title}</h1>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
                <p className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-zinc-500" strokeWidth={1.5} />
                    {event.time}
                </p>
                <p className="flex items-center gap-3">
                    <MapPin className="size-4 shrink-0 text-zinc-500" strokeWidth={1.5} />
                    {event.location}
                </p>
            </div>

            {event.description ? (
                <p className="whitespace-pre-line text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {event.description}
                </p>
            ) : null}

            <button
                type="button"
                onClick={() => shareEventInTelegram(event)}
                className="flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-medium text-white transition-transform active:scale-[0.98]"
            >
                <Share2 className="size-4" />
                Поделиться
            </button>
        </div>
    );
}
