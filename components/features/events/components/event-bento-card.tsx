import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { formatEventDateLabel } from "@/domain/events/event.logic";
import { cn } from "@/lib/utils";

export type BentoEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  color: "amber" | "sky" | "rose";
  imageUrl?: string;
  description?: string;
};

export type EventCardVariant = "compact" | "tall" | "wide";

export const HOME_EVENT_TILE_COUNT = 5;

const colorStyles = {
  amber:
    "bg-gradient-to-br from-amber-50 via-amber-100 to-orange-200 text-zinc-900 ring-amber-200/60",
  sky: "bg-gradient-to-br from-sky-50 via-sky-100 to-blue-200 text-zinc-900 ring-sky-200/60",
  rose: "bg-gradient-to-br from-rose-50 via-rose-100 to-pink-200 text-zinc-900 ring-rose-200/60",
} as const;

const TILE_SLOTS: {
  variant: EventCardVariant;
  className: string;
}[] = [
    { variant: "compact", className: "col-start-1 row-start-1" },
    { variant: "tall", className: "col-start-2 row-start-1 row-span-2" },
    { variant: "tall", className: "col-start-1 row-start-2 row-span-2" },
    { variant: "compact", className: "col-start-2 row-start-3" },
    { variant: "wide", className: "col-span-2 row-start-4" },
  ];

function DateBadge({
  label,
  onImage = false,
}: {
  label: string;
  onImage?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm",
        onImage ? "bg-black/35 text-white" : "bg-white/60 text-zinc-900",
      )}
    >
      {label}
    </span>
  );
}

function EventMeta({
  time,
  location,
  locationClassName,
  onImage = false,
}: {
  time: string;
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
      <p className="flex items-center gap-2">
        <Clock className="size-3.5 shrink-0 opacity-80" strokeWidth={2} />
        <span>{time}</span>
      </p>
      <p className="flex items-center gap-2">
        <MapPin className="size-3.5 shrink-0 opacity-80" strokeWidth={2} />
        <span className={locationClassName}>{location}</span>
      </p>
    </div>
  );
}

type EventBentoCardProps = {
  event: BentoEvent;
  variant?: EventCardVariant;
  className?: string;
};

function TallImageCard({
  event,
  dateLabel,
  className,
}: {
  event: BentoEvent;
  dateLabel: string;
  className?: string;
}) {
  return (
    <Link
      href={`/events/${event.id}`}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-3xl bg-zinc-300 text-left ring-1 ring-black/10 transition-transform active:scale-[0.98] dark:bg-zinc-800",
        className,
      )}
    >
      <Image
        src={event.imageUrl!}
        alt=""
        fill
        sizes="(max-width: 768px) 45vw, 200px"
        loading="eager"
        decoding="sync"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

      <div className="relative flex h-full flex-col justify-between gap-2 p-3.5">
        <DateBadge label={dateLabel} onImage />

        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-3 text-lg font-semibold leading-5 text-white">
            {event.title} 1
          </h3>
          <EventMeta
            time={event.time}
            location={event.location}
            locationClassName="line-clamp-2"
            onImage
          />
        </div>
      </div>
    </Link>
  );
}

export function EventBentoCard({
  event,
  variant = "compact",
  className,
}: EventBentoCardProps) {
  const dateLabel = formatEventDateLabel(event.date);
  const isTall = variant === "tall";
  const isWide = variant === "wide";

  if (isTall && event.imageUrl) {
    return (
      <TallImageCard
        event={event}
        dateLabel={dateLabel}
        className={className}
      />
    );
  }

  if (isWide) {
    return (
      <Link
        href={`/events/${event.id}`}
        className={cn(
          "flex h-full w-full flex-col justify-between gap-2 rounded-3xl p-3.5 text-left ring-1 transition-transform active:scale-[0.98]",
          colorStyles[event.color],
          className,
        )}
      >
        <div className="flex min-w-0 items-start justify-between gap-3">
          <DateBadge label={dateLabel} />
          <h3 className="min-w-0 flex-1 truncate text-right text-sm font-semibold leading-5">
            {event.title}
          </h3>
        </div>

        <EventMeta
          time={event.time}
          location={event.location}
          locationClassName="truncate"
        />
      </Link>
    );
  }

  return (
    <Link
      href={`/events/${event.id}`}
      className={cn(
        "flex h-full w-full flex-col gap-2 rounded-3xl p-3.5 text-left ring-1 transition-transform active:scale-[0.98]",
        colorStyles[event.color],
        className,
      )}
    >
      <DateBadge label={dateLabel} />

      <h3
        className={cn(
          "font-semibold leading-5",
          isTall ? "line-clamp-3 text-lg" : "line-clamp-2 text-sm",
        )}
      >
        {event.title}
      </h3>

      <div className="mt-auto">
        <EventMeta
          time={event.time}
          location={event.location}
          locationClassName={isTall ? "line-clamp-2" : "line-clamp-1"}
        />
      </div>
    </Link>
  );
}

type EventHomeTileGridProps = {
  events: BentoEvent[];
};

export function EventHomeTileGrid({ events }: EventHomeTileGridProps) {
  const tiles = events.slice(0, HOME_EVENT_TILE_COUNT);

  return (
    <div className="grid grid-cols-2 gap-3 [grid-template-rows:7.5rem_7.5rem_7.5rem_6.5rem]">
      {tiles.map((event, index) => (
        <EventBentoCard
          key={event.id}
          event={event}
          variant={TILE_SLOTS[index].variant}
          className={TILE_SLOTS[index].className}
        />
      ))}
    </div>
  );
}
