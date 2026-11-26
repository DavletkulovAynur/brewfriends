"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_SUGGESTION_LENGTH = 1000;

export function PeopleIdeaForm() {
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const suggestion = message.trim();
        if (!suggestion || isSubmitting) return;

        setIsSubmitting(true);
        setFeedback(null);

        try {
            const response = await fetch("/api/people-suggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: suggestion }),
            });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Не удалось отправить идею");
            }

            setMessage("");
            setFeedback({ type: "success", message: "Спасибо! Мы прочитаем вашу идею." });
        } catch (error) {
            setFeedback({
                type: "error",
                message: error instanceof Error ? error.message : "Не удалось отправить идею",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={submit}>
            <label className="text-sm font-medium" htmlFor="people-suggestion">
                Ваше предложение
            </label>
            <Textarea
                id="people-suggestion"
                maxLength={MAX_SUGGESTION_LENGTH}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Например: карта любимых кафе, где можно встретить участников сообщества..."
                required
                value={message}
            />
            <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground" aria-live="polite">
                    {message.length}/{MAX_SUGGESTION_LENGTH}
                </span>
                <Button disabled={isSubmitting || !message.trim()} type="submit">
                    <Send aria-hidden="true" />
                    {isSubmitting ? "Отправляем..." : "Отправить идею"}
                </Button>
            </div>
            {feedback ? (
                <p
                    aria-live="polite"
                    className={feedback.type === "success" ? "text-sm text-emerald-700" : "text-sm text-destructive"}
                    role="status"
                >
                    {feedback.message}
                </p>
            ) : null}
        </form>
    );
}