import { CalendarDays, Send } from "lucide-react";
import { PersonAvatar } from "@/common/people/components/person-avatar";
import type { SuggestedInterest } from "@/domain/users/profile.types";
import { Button } from "@/components/ui/button";
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
        primaryEvent?: {
            title: string;
            startsAt: string | null;
        } | null;
    } | null;
    onOpenChange: (open: boolean) => void;
};

export function SuggestedPersonSheet({
    person,
    onOpenChange,
}: SuggestedPersonSheetProps) {
    return (
        <Sheet open={person !== null} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="h-[75dvh] max-h-[640px] overflow-y-auto rounded-t-2xl px-0 pt-0 sm:mx-auto sm:max-w-lg"
            >
                {person ? (
                    <>
                        <SheetHeader className="mt-6 flex-row items-center gap-4 px-6 pr-16 text-left">
                            <PersonAvatar
                                initial={person.initial}
                                size="md"
                            />
                            <div className="min-w-0 flex-1">
                                <SheetTitle className="line-clamp-2 text-xl font-semibold">
                                    {person.name}
                                </SheetTitle>
                                <SheetDescription className="mt-1 whitespace-pre-wrap break-words">
                                    {person.status || "Статус не указан"}
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                        {person.primaryEvent ? (
                            <section className="mx-6 mt-5 rounded-xl bg-muted/60 p-4">
                                <h3 className="text-xs font-semibold text-muted-foreground">Главная встреча</h3>
                                <p className="mt-1 text-sm font-medium">{person.primaryEvent.title}</p>
                                {person.primaryEvent.startsAt ? (
                                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                        <CalendarDays className="size-3.5" aria-hidden />
                                        {new Intl.DateTimeFormat("ru-RU", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        }).format(new Date(person.primaryEvent.startsAt))}
                                    </p>
                                ) : null}
                            </section>
                        ) : null}
                        {person.interests?.length ? (
                            <section className="mx-6 mt-5 rounded-xl bg-muted/60 p-4">
                                <h3 className="text-xs font-semibold text-muted-foreground">Чем хочет заняться</h3>
                                <ul className="mt-2 flex flex-col gap-2">
                                    {person.interests.map((interest, index) => (
                                        <li key={`${interest.activity}-${index}`} className="text-sm">
                                            <span className="font-medium">{interest.activity}</span>
                                            <span className="mt-0.5 block text-xs text-muted-foreground">
                                                {interest.participation === "looking_for_company"
                                                    ? "Ищет компанию"
                                                    : interest.participation === "looking_for_teacher"
                                                        ? "Ищет того, кто научит"
                                                        : interest.participation === "can_teach"
                                                            ? "Может показать или научить"
                                                            : "Хочет попробовать"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ) : null}
                        <SheetFooter className="mt-auto px-6 pb-6">
                            <Button
                                asChild={Boolean(person.telegramUsername)}
                                disabled={!person.telegramUsername}
                                className="h-12 w-full"
                            >
                                {person.telegramUsername ? (
                                    <a
                                        href={`https://t.me/${encodeURIComponent(person.telegramUsername)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="flex size-9 items-center justify-center rounded-full border border-white/45 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)] backdrop-blur-xl">
                                            <Send className="size-4" aria-hidden />
                                        </span>
                                        Написать в Telegram
                                    </a>
                                ) : (
                                    <>
                                        <span className="flex size-9 items-center justify-center rounded-full border border-white/45 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)] backdrop-blur-xl">
                                            <Send className="size-4" aria-hidden />
                                        </span>
                                        Telegram недоступен
                                    </>
                                )}
                            </Button>
                        </SheetFooter>
                    </>
                ) : null}
            </SheetContent>
        </Sheet>
    );
}