import { PersonAvatar } from "@/common/people/components/person-avatar";
import type { EventParticipant } from "@/domain/events/event.types";

export function EventParticipants({ participants }: { participants: EventParticipant[] }) {
    if (participants.length === 0) return null;

    return (
        <div className="mt-4 flex flex-wrap items-center gap-y-2 pl-1" role="group" aria-label="Откликнувшиеся на событие">
            {participants.map((participant, index) => (
                <span
                    key={participant.id}
                    role="img"
                    aria-label={participant.name}
                    className={index > 0 ? "-ml-3" : undefined}
                >
                    <PersonAvatar
                        initial={participant.name.trim().charAt(0).toUpperCase()}
                        avatarSrc={participant.avatarUrl}
                        size="sm"
                        className="border-2 border-white bg-[#dceaff]"
                    />
                </span>
            ))}
        </div>
    );
}