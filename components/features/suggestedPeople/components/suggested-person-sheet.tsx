import { Send } from "lucide-react";
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