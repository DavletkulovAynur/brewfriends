"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Check, Compass, GraduationCap, Lightbulb, UsersRound } from "lucide-react";
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
        {
            value: "can_teach",
            title: "Поделиться опытом",
            description: "Могу подсказать и помочь другим разобраться",
            icon: Lightbulb,
        },
        {
            value: "want_to_try",
            title: "Попробовать впервые",
            description: "Хочу познакомиться с этим занятием с нуля",
            icon: Compass,
        },
    ];

export function InterestCreateForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activity, setActivity] = useState("");
    const [selectedQuickInterest, setSelectedQuickInterest] = useState<string | null>("custom");
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
        <form onSubmit={submit} className="mx-auto flex w-full max-w-[560px] flex-col gap-6 px-5 pb-28">
            <section aria-labelledby="popular-interests-title" className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                    <h2 id="popular-interests-title" className="text-base font-semibold">
                        Популярные варианты
                    </h2>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                    {quickInterests.map((interest) => (
                        <button
                            key={interest.id}
                            type="button"
                            aria-pressed={selectedQuickInterest === interest.id}
                            onClick={() => {
                                setActivity(interest.inputTitle);
                                setSelectedQuickInterest(interest.id);
                            }}
                            className={`flex min-h-20 min-w-0 flex-col items-start justify-center gap-1.5 rounded-2xl px-3 py-2.5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${interest.color} ${selectedQuickInterest === interest.id ? "ring-2 ring-foreground/70" : ""}`}
                        >
                            <span className="text-2xl leading-none" aria-hidden="true">{interest.icon}</span>
                            <span className="text-[13px] font-medium leading-tight">{interest.title}</span>
                        </button>
                    ))}
                    <button
                        type="button"
                        aria-pressed={selectedQuickInterest === "custom"}
                        onClick={() => {
                            setActivity("");
                            setSelectedQuickInterest("custom");
                        }}
                        className={`flex min-h-20 min-w-0 flex-col items-start justify-center gap-1.5 rounded-2xl border border-dashed border-border bg-white px-3 py-2.5 text-left transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selectedQuickInterest === "custom" ? "ring-2 ring-foreground/70" : ""}`}
                    >
                        <span className="text-2xl leading-none" aria-hidden="true">✍️</span>
                        <span className="text-[13px] font-medium leading-tight">Свой вариант</span>
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
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
                        className="pb-8"
                    />
                    <span className="absolute bottom-3 right-4 text-xs text-muted-foreground" aria-live="polite">
                        {description.length}/100
                    </span>
                </div>
            </section>

            <fieldset className="flex min-w-0 flex-col gap-2">
                <legend className="mb-1 text-base font-semibold">Как ты хочешь участвовать?</legend>
                {participationOptions.map(({ value, title, description: optionDescription, icon: Icon }) => {
                    const isSelected = participation === value;
                    return (
                        <Button
                            variant="outline"
                            key={value}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setParticipation(value)}
                            className={`flex h-auto min-h-[76px] min-w-0 w-full items-center gap-3 rounded-xl p-3 text-left whitespace-normal transition-colors focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "border-primary/50 bg-primary/5 hover:bg-primary/10" : "border-border bg-white hover:bg-muted/30"}`}
                        >
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon className="size-5" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold leading-snug">{title}</span>
                                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{optionDescription}</span>
                            </span>
                            <span className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary text-white" : "border-zinc-300 text-transparent"}`}>
                                {isSelected ? <Check className="size-3.5" aria-hidden="true" /> : null}
                            </span>
                        </Button>
                    );
                })}
            </fieldset>


            {createMutation.error ? (
                <p role="alert" className="text-sm text-destructive">{createMutation.error.message}</p>
            ) : null}
            <Button size="xl" type="submit" disabled={!activity.trim() || createMutation.isPending} loading={createMutation.isPending}>
                Добавить интерес
            </Button>
        </form>
    );
}