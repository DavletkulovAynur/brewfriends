import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function DateBadge({
    label,
    onImage = false,
}: {
    label: string;
    onImage?: boolean;
}) {
    return (
        <span
            className={cn(
                "inline-flex w-fit shrink-0 whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium backdrop-blur-sm",
                onImage ? "bg-black/35 text-white" : "bg-white/60 text-zinc-900",
            )}
        >
            {label}
        </span>
    );
}

export function DateTimeBadges({
    dateLabel,
    time,
    onImage = false,
}: {
    dateLabel: string;
    time: string | null;
    onImage?: boolean;
}) {
    // `time` is a range like "14:00–15:30"; only the start is shown.
    const startTime = time?.split("–")[0];

    return (
        <DateBadge
            label={startTime ? `${dateLabel} / ${startTime}` : dateLabel}
            onImage={onImage}
        />
    );
}

export function EventMeta({
    time,
    location,
    locationClassName,
    onImage = false,
}: {
    time: string | null;
    location: string;
    locationClassName?: string;
    onImage?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex flex-col gap-1 text-xs leading-4",
                onImage ? "text-white/90" : "text-zinc-800/90",
            )}
        >
            {time ? (
                <p className="flex items-center gap-2">
                    <Clock className="size-3.5 shrink-0 opacity-80" strokeWidth={2} />
                    <span>{time}</span>
                </p>
            ) : null}
            <p className="flex items-center gap-2">
                <MapPin className="size-3.5 shrink-0 opacity-80" strokeWidth={2} />
                <span className={locationClassName}>{location}</span>
            </p>
        </div>
    );
}
