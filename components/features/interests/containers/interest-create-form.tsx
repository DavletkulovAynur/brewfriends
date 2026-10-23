"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check, GraduationCap, UsersRound } from "lucide-react";
import type { InterestParticipation } from "@/domain/users/profile.types";
import {
    createInterest,
    interestsQueryKey,
} from "@/components/features/interests/api/interests.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { quickInterests } from "@/components/features/interests/constants/quick-interests";

const participationOptions: {
    value: InterestParticipation;
    title: string;
    description: string;
    icon: typeof UsersRound;
}[] = [
        {
            value: "looking_for_company",
            title: "Найти компанию",
            description: "Хочу найти людей с похожими интересами",
            icon: UsersRound,
        },
        {
            value: "looking_for_teacher",
            title: "Найти того, кто научит",
            description: "Например, если я новичок в этом направлении",
            icon: GraduationCap,
        },
    ];

export function InterestCreateForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activity, setActivity] = useState("");
    const [selectedQuickInterest, setSelectedQuickInterest] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [participation, setParticipation] = useState<InterestParticipation>("looking_for_company");
    const createMutation = useMutation({
        mutationFn: createInterest,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: interestsQueryKey }),
                queryClient.invalidateQueries({ queryKey: ["profiles", "suggestions"] }),
            ]);
            router.push("/settings");
        },
    });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const trimmedActivity = activity.trim();
        if (!trimmedActivity) return;
        createMutation.mutate({ activity: trimmedActivity, description: description.trim(), participation });
    }

    return (
        <form onSubmit={submit} className="mx-auto flex w-full max-w-[560px] flex-col gap-7 px-5 pb-6">
            <section aria-labelledby="popular-interests-title" className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h2 id="popular-interests-title" className="text-base font-semibold">
                        Популярные варианты
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {quickInterests.map((interest) => (
                        <button
                            key={interest.id}
                            type="button"
                            aria-pressed={selectedQuickInterest === interest.id}
                            onClick={() => {
                                setActivity(interest.inputTitle);
                                setSelectedQuickInterest(interest.id);
                            }}
                            className={`flex min-h-24 min-w-0 flex-col items-start justify-center gap-2 rounded-[20px] px-3 py-3 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${interest.color} ${selectedQuickInterest === interest.id ? "ring-2 ring-foreground/70" : ""}`}
                        >
                            <span className="text-[30px] leading-none" aria-hidden="true">{interest.icon}</span>
                            <span className="text-sm font-medium leading-tight">{interest.title}</span>
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-pressed={selectedQuickInterest === "custom"}
                        onClick={() => {
                            setActivity("");
                            setSelectedQuickInterest("custom");
                        }}
                        className={`flex min-h-24 min-w-0 flex-col items-start justify-center gap-2 rounded-[20px] border border-dashed border-border bg-white px-3 py-3 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedQuickInterest === "custom" ? "ring-2 ring-foreground/70" : ""}`}
                    >
                        <span className="text-[30px] leading-none" aria-hidden="true">✍️</span>
                        <span className="text-sm font-medium leading-tight">Свой вариант</span>
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="interest-activity" className="text-sm font-medium">
                        Или напиши свой вариант
                    </label>
                    <Input
                        id="interest-activity"
                        value={activity}
                        onChange={(event) => {
                            setActivity(event.target.value);
                            setSelectedQuickInterest(null);
                        }}
                        maxLength={100}
                        placeholder="Например, сквош"
                        required
                        className="h-12 rounded-2xl border-border bg-white px-5"
                    />
                </div>
                <div className="relative">
                    <label htmlFor="interest-description" className="sr-only">
                        Описание интереса
                    </label>
                    <Textarea
                        id="interest-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        maxLength={100}
                        placeholder="Например, хочу научиться играть в сквош"
                        className="min-h-24 resize-none rounded-2xl border-border bg-white px-5 pb-8 pt-3"
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-muted-foreground" aria-live="polite">
                        {description.length}/100
                    </span>
                </div>
            </section>

            <fieldset className="flex flex-col gap-3">
                <legend className="mb-1 text-base font-semibold">Как ты хочешь участвовать?</legend>
                {participationOptions.map(({ value, title, description: optionDescription, icon: Icon }) => {
                    const isSelected = participation === value;
                    return (
                        <button
                            key={value}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setParticipation(value)}
                            className={`flex min-h-[104px] items-center gap-4 rounded-[20px] border bg-white p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-amber-700/60 bg-amber-50/40" : "border-border hover:bg-muted/30"}`}
                        >
                            <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-900">
                                <Icon className="size-8" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-base font-semibold">{title}</span>
                                <span className="mt-1 block text-sm leading-snug text-muted-foreground">{optionDescription}</span>
                            </span>
                            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-amber-800 bg-amber-800 text-white" : "border-zinc-300 text-transparent"}`}>
                                {isSelected ? <Check className="size-4" aria-hidden="true" /> : null}
                            </span>
                        </button>
                    );
                })}
            </fieldset>

            {createMutation.error ? (
                <p role="alert" className="text-sm text-destructive">{createMutation.error.message}</p>
            ) : null}
            <Button type="submit" disabled={!activity.trim() || createMutation.isPending} className="h-12 rounded-xl">
                {createMutation.isPending ? "Сохраняем…" : "Добавить интерес"}
            </Button>
        </form>
    );
}