import type { Event } from "@/domain/events/event.types";
import type { BentoEvent } from "@/components/features/events/types/bento-event.types";

const pad = (value: number) => String(value).padStart(2, "0");
const formatTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;

// Date and time are shown in the viewer's local timezone.
export function toBentoEvent(event: Event): BentoEvent {
  const start = event.startsAt ? new Date(event.startsAt) : null;
  const end = event.endsAt ? new Date(event.endsAt) : null;

  return {
    id: event.id,
    title: event.title,
    description: event.description || undefined,
    date: start
      ? `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`
      : null,
    time: start
      ? end
        ? `${formatTime(start)}–${formatTime(end)}`
        : formatTime(start)
      : null,
    location: event.location,
    color: event.color,
    imageUrl: event.imageUrl ?? undefined,
    videoUrl: event.videoUrl ?? undefined,
  };
}
