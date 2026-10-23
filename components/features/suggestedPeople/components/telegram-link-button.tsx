import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TelegramLinkButton({ username }: { username?: string }) {
    return (
        <Button asChild={Boolean(username)} disabled={!username} variant="outline" className="h-11 w-full">
            {username ? (
                <a href={`https://t.me/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer">
                    <Send className="size-4" aria-hidden />
                    Написать в Telegram
                </a>
            ) : (
                <>
                    <Send className="size-4" aria-hidden />
                    Telegram недоступен
                </>
            )}
        </Button>
    );
}
