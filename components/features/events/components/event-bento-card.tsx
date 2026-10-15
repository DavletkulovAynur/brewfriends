import Image from "next/image";
import Link from "next/link";
import { formatEventDateLabel } from "@/domain/events/event.logic";
import { cn } from "@/lib/utils";
import { DateTimeBadges } from "@/components/features/events/components/event-card-parts";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

export function EventBentoCard({
  event,
  detailsBelow = false,
}: {
  event: BentoEvent;
  detailsBelow?: boolean;
}) {
  const hasImage = Boolean(event.imageUrl);
  const hasMedia = hasImage || Boolean(event.videoUrl);

  return (
    <Link
      href={`/events/${event.id}`}
      className={cn(
        detailsBelow
          ? "flex w-full flex-col gap-2 text-left"
          : "relative aspect-[9/16] w-full overflow-hidden rounded-3xl text-left ring-1",
        "transition-transform active:scale-[0.98]",
        !detailsBelow &&
        (hasMedia
          ? "bg-zinc-300 ring-black/10 dark:bg-zinc-800"
          : "bg-zinc-100 text-zinc-900 ring-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-800"),
      )}
    >
      <div
        className={cn(
          "overflow-hidden",
          detailsBelow
            ? "relative aspect-[9/16] w-full rounded-2xl ring-1"
            : "absolute inset-0",
          hasImage
            ? "bg-zinc-300 ring-black/10 dark:bg-zinc-800"
            : "bg-zinc-100 dark:bg-zinc-900",
        )}
      >
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
            className="size-full object-cover"
          />
        ) : event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 45vw, 200px"
            loading="eager"
            decoding="sync"
            className="object-cover"
          />
        ) : null}
        {!detailsBelow && hasMedia ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
        ) : null}
      </div>

      {detailsBelow ? (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs leading-4 text-zinc-500 dark:text-zinc-400">
            {formatEventDateLabel(event.date)}
          </p>
          <h3 className="line-clamp-2 text-xl font-semibold leading-4 text-zinc-900 dark:text-zinc-100">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1 text-base leading-4 text-zinc-600 dark:text-zinc-400">

            <p className="flex items-center gap-1.5">

              <span className="line-clamp-2 break-words">{event.location}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col gap-2 p-3.5">
          <DateTimeBadges
            dateLabel={formatEventDateLabel(event.date)}
            time={event.time}
            onImage={hasImage}
          />
          <div className={cn("flex flex-col gap-1.5", hasImage && "mt-auto")}>
            <h3
              className={cn(
                "line-clamp-3 text-xl font-semibold leading-5",
                hasImage && "text-white",
              )}
            >
              {event.title}
            </h3>
            <p
              className={cn(
                "flex items-center gap-1.5 text-xs leading-4",
                hasImage ? "text-white/80" : "text-zinc-600 dark:text-zinc-400",
              )}
            >
              <span className="truncate">{event.location}</span>
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}
