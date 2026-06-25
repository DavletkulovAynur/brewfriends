import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type BentoEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  tag: string;
  hostName?: string;
  hostRole?: string;
  color: "amber" | "sky" | "rose";
  size: "large" | "medium" | "small";
  variant?: "event" | "cta";
};

const colorStyles = {
  amber: "bg-[#f0d490] text-zinc-900",
  sky: "bg-[#b8d4f0] text-zinc-900",
  rose: "bg-[#e8c5dc] text-zinc-900",
} as const;

type EventBentoCardProps = {
  event: BentoEvent;
};

export function EventBentoCard({ event }: EventBentoCardProps) {
  const isCta = event.variant === "cta";

  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[28px] p-5",
        colorStyles[event.color],
        event.size === "large" && "min-h-[280px] justify-between",
        event.size === "medium" && "min-h-[132px]",
        event.size === "small" && "min-h-[132px] justify-center",
      )}
    >
      {isCta ? (
        <button
          type="button"
          className="flex h-full flex-col items-center justify-center gap-3"
        >
          <span className="flex size-12 items-center justify-center rounded-full border-2 border-zinc-900/20 bg-white/40">
            <Plus className="size-6" strokeWidth={1.5} />
          </span>
          <div className="text-center">
            <p className="text-lg font-semibold">{event.title}</p>
            <p className="mt-1 text-sm text-zinc-700">{event.location}</p>
          </div>
        </button>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full bg-white/45 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {event.tag}
            </span>

            <div className={cn(event.size === "medium" && "max-w-[58%]")}>
              <h3
                className={cn(
                  "font-semibold leading-tight",
                  event.size === "large" ? "text-3xl" : "text-2xl",
                )}
              >
                {event.title}
              </h3>

              <div className="mt-3 space-y-0.5 text-sm text-zinc-800">
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
              </div>
            </div>
          </div>

          {event.size === "large" && event.hostName ? (
            <div className="mt-6 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-white/50 text-sm font-semibold">
                {event.hostName.charAt(0)}
              </span>
              <div>
                <p className="text-sm text-zinc-700">{event.hostRole}</p>
                <p className="font-semibold">{event.hostName}</p>
              </div>
            </div>
          ) : null}

          {event.size === "medium" ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -right-2 bottom-0 size-28 opacity-80"
            >
              <div className="absolute right-4 top-2 size-10 rounded-full bg-white/35" />
              <div className="absolute right-0 top-10 size-16 rounded-full border-4 border-white/30" />
              <div className="absolute right-10 top-14 size-5 rounded-full bg-white/50" />
            </div>
          ) : null}
        </>
      )}
    </article>
  );
}
