import { PersonAvatar } from "@/common/people/components/person-avatar";
import { PersonEventCard, type PersonEvent } from "@/components/features/suggestedPeople/components/person-event-card";
import { PersonInterests } from "@/components/features/suggestedPeople/components/person-interests";
import { TelegramLinkButton } from "@/components/features/suggestedPeople/components/telegram-link-button";
import type { SuggestedInterest } from "@/domain/users/profile.types";
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
                className="h-[75dvh] max-h-[640px] overflow-y-auto rounded-t-2xl bg-background px-0 pt-0 sm:mx-auto sm:max-w-lg"
            >
                {person ? (
                    <>
                        <SheetHeader className="mt-6 flex-row items-center gap-4 px-6 pr-16 text-left">
                            <PersonAvatar initial={person.initial} size="md" />
                            <div className="min-w-0 flex-1">
                                <SheetTitle className="line-clamp-2 text-xl font-semibold">{person.name}</SheetTitle>
                                <SheetDescription className="mt-1 whitespace-pre-wrap break-words">
                                    {person.status || "Статус не указан"}
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        {person.primaryEvent ? <PersonEventCard event={person.primaryEvent} /> : null}
                        {person.interests?.length ? <PersonInterests interests={person.interests} /> : null}
                        <SheetFooter className="mt-auto px-6 pb-6">
                            <TelegramLinkButton username={person.telegramUsername} />
                        </SheetFooter>
                    </>
                ) : null}
            </SheetContent>
        </Sheet>
    );
}
