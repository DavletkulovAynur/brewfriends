import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { formatEventDateLabel } from "@/domain/events/event.logic";
import type { BentoEvent } from "./event-bento-card";

type EventListCardProps = {
  event: BentoEvent;
};

export function EventListCard({ event }: EventListCardProps) {
  const dateLabel = formatEventDateLabel(event.date);

  return (
    <Link href={`/events/${event.id}`} className="block">
      <article className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-3.5 transition-transform active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 flex-1 text-base font-semibold leading-5">
            {event.title}
          </h2>
          <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            {dateLabel}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-xs leading-4 text-zinc-600 dark:text-zinc-400">
          <p className="flex items-center gap-2">
            <Clock className="size-3.5 shrink-0" strokeWidth={1.5} />
            {event.time}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.5} />
            {event.location}
          </p>
        </div>
      </article>
    </Link>
  );
}
