import { Clock3, Flame } from "lucide-react";
import { toast } from "sonner";
import { useSetEventConnectionMutation } from "@/components/features/events/api/events.query";
import { ConnectEventAction } from "@/components/features/suggestedPeople/components/connect-event-action";
import { EventParticipants } from "@/components/features/suggestedPeople/components/event-participants";
import type { EventParticipant } from "@/domain/events/event.types";

export type PersonEvent = {
    id: string;
    title: string;
    startsAt: string | null;
    isConnected?: boolean;
    participants?: EventParticipant[];
};

const dayFormatter = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
});

const timeFormatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
});

export function PersonEventCard({
    event,
}: {
    event: PersonEvent;
}) {
    const connection = useSetEventConnectionMutation();
    const startDateTime = event.startsAt
        ? `${dayFormatter.format(new Date(event.startsAt)).replace(".", "").toLocaleUpperCase("ru-RU")} • ${timeFormatter.format(new Date(event.startsAt))}`
        : null;

    return (
        <section className="mx-6">
            <div className="relative isolate overflow-hidden rounded-[24px] bg-[#087cf5] p-5 text-white shadow-sm">
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 -z-10 size-[360px] rounded-full border-[34px] border-white/[0.08]" />
                <div className="relative">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {startDateTime ? (
                            <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/15 px-3 text-xs font-semibold backdrop-blur-sm">
                                <Clock3 className="size-4" aria-hidden="true" />
                                {startDateTime}
                            </span>
                        ) : null}
                        <span className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-semibold text-[#e77b69] shadow-sm">
                            <Flame className="size-4 fill-[#ff8c48] text-[#ff8c48]" aria-hidden="true" />
                            Основное событие
                        </span>
                    </div>

                    <h3 className="mt-6 line-clamp-3 text-2xl font-bold leading-tight">
                        {event.title}
                    </h3>
                    <p className="mt-2 font-serif line-clamp-3 text-base leading-relaxed">
                        Ищу компанию, чтобы провести вечер за настольными играми и познакомиться с новыми людьми.
                    </p>

                    <EventParticipants participants={event.participants ?? []} />


                    <ConnectEventAction
                        isConnected={Boolean(event.isConnected)}
                        isPending={connection.isPending}
                        className="w-full"
                        onChange={(connected) =>
                            connection.mutate(
                                { id: event.id, connected },
                                {
                                    onSuccess: () => {
                                        if (connected) {
                                            toast.success("Вы откликнулись и идёте на мероприятие", {
                                                description: "Если планы изменятся, пожалуйста, отмените свой отклик.",
                                                duration: 7000,
                                            });
                                        } else {
                                            toast.success("Заявка отменена");
                                        }
                                    },
                                    onError: (error) => toast.error(error.message),
                                },
                            )
                        }
                    />
                </div>
            </div>

        </section>
    );
}
