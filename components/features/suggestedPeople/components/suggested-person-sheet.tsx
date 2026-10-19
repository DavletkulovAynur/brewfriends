import { CalendarDays, Send } from "lucide-react";
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
        coverSrc: string;
        telegramUsername?: string;
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
                className="h-[50dvh] rounded-t-2xl px-0 pt-0 sm:mx-auto sm:max-w-lg"
            >
                {person ? (
                    <>

                        <SheetHeader className="gap-2 px-6 pt-5">
                            <div className="flex size-14 items-center justify-center rounded-full border-2 border-background bg-muted text-xl font-semibold">
                                {person.initial}
                            </div>
                            <SheetTitle className="text-xl">{person.name}</SheetTitle>
                            <SheetDescription>
                                {person.status || "No status yet."}
                            </SheetDescription>
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
                                        <Send aria-hidden />
                                        Написать в Telegram
                                    </a>
                                ) : (
                                    <>
                                        <Send aria-hidden />
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