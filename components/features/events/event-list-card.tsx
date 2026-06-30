import type { BentoEvent } from "./event-bento-card";

type EventListCardProps = {
  event: BentoEvent;
};

export function EventListCard({ event }: EventListCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {event.location}
          </p>
        </div>
        {event.tag ? (
          <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
            {event.tag}
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <span>{event.date}</span>
        <span>{event.time}</span>
      </div>

      {event.hostName ? (
        <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <span className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold dark:bg-zinc-900">
            {event.hostName.charAt(0)}
          </span>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {event.hostRole}
            </p>
            <p className="text-sm font-medium">{event.hostName}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}
