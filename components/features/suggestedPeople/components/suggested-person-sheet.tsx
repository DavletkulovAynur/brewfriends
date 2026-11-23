import { PersonAvatar } from "@/common/people/components/person-avatar";
import { PersonEventCard, type PersonEvent } from "@/components/features/suggestedPeople/components/person-event-card";
import { PersonInterests } from "@/components/features/suggestedPeople/components/person-interests";
import { TelegramLinkButton } from "@/components/features/suggestedPeople/components/telegram-link-button";
import type { SuggestedInterest } from "@/domain/users/profile.types";
import type { MeetupIntent } from "@/domain/users/meetup-intent";
import { MEETUP_INTENT_EMOJIS, MEETUP_INTENT_LABELS } from "@/domain/users/meetup-intent";
import { MEETUP_INTENT_COLORS } from "@/common/people/constants/meetup-intent-colors";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

type SuggestedPersonSheetProps = {
    person: {
        name: string;
        status: string;
        initial: string;
        telegramUsername?: string;
        avatarUrl?: string;
        meetupIntent: MeetupIntent;
        interests?: SuggestedInterest[];
        primaryEvent?: PersonEvent | null;
    } | null;
    onOpenChange: (open: boolean) => void;
};

export function SuggestedPersonSheet({ person, onOpenChange }: SuggestedPersonSheetProps) {
    return (
        <Sheet open={person !== null} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="h-[75dvh] max-h-[640px] gap-0 overflow-hidden rounded-t-2xl bg-background px-0 pt-0 sm:mx-auto sm:max-w-lg"
            >
                <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
                    {person ? (
                        <>
                            <SheetHeader className="mt-6 flex-row items-center gap-4 px-6 pr-16 text-left">
                                <PersonAvatar initial={person.initial} avatarSrc={person.avatarUrl} size="md" />
                                <div className="min-w-0 flex-1">
                                    <SheetDescription className="mt-1 whitespace-pre-wrap break-words">
                                        {person.status || "Статус не указан"}
                                    </SheetDescription>
                                    <SheetTitle className="line-clamp-2 text-lg font-semibold">{person.name}</SheetTitle>
                                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                        <span
                                            aria-hidden="true"
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl"
                                            style={{ backgroundColor: MEETUP_INTENT_COLORS[person.meetupIntent] }}
                                        >
                                            {MEETUP_INTENT_EMOJIS[person.meetupIntent]}
                                        </span>
                                        {MEETUP_INTENT_LABELS[person.meetupIntent]}
                                    </p>

                                </div>
                            </SheetHeader>
                            {person.primaryEvent ? (
                                <PersonEventCard
                                    event={person.primaryEvent}
                                />
                            ) : null}
                            {person.interests?.length ? <PersonInterests interests={person.interests} /> : null}
                            <SheetFooter className="mt-auto px-6 pb-6">
                                <TelegramLinkButton username={person.telegramUsername} />
                            </SheetFooter>
                        </>
                    ) : null}
                </div>
            </SheetContent>
        </Sheet>
    );
}
