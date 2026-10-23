import { CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { useSetEventConnectionMutation } from "@/components/features/events/api/events.query";
import { ConnectEventAction } from "@/components/features/suggestedPeople/components/connect-event-action";

export type PersonEvent = {
    id: string;
    title: string;
    startsAt: string | null;
    isConnected?: boolean;
};

const dayFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
});

export function PersonEventCard({ event }: { event: PersonEvent }) {
    const connection = useSetEventConnectionMutation();

    return (
        <section className="mx-6 rounded-2xl bg-[#253f8a] p-4 text-white">
            {event.startsAt ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-white/70">
                    {dayFormatter.format(new Date(event.startsAt)).replace(".", "")} ·{" "}
                    {timeFormatter.format(new Date(event.startsAt))}
                </p>
            ) : null}
            <p className="mt-4 text-2xl font-bold leading-snug">{event.title}</p>
            <p className="mt-2 text-base text-white/80 line-clamp-3">
                Это стандартный текст-«рыба» для дизайна и вёрстки. Он помогает оценить макет, не отвлекаясь на смысл.
            </p>

            <ConnectEventAction
                isConnected={Boolean(event.isConnected)}
                isPending={connection.isPending}
                onChange={(connected) =>
                    connection.mutate(
                        { id: event.id, connected },
                        {
                            onSuccess: () =>
                                toast.success(connected ? "Заявка отправлена" : "Заявка отменена"),
                            onError: (error) => toast.error(error.message),
                        },
                    )
                }
            />
        </section>
    );
}
