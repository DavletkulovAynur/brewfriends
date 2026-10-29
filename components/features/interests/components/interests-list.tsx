"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, X } from "lucide-react";
import type { InterestParticipation } from "@/domain/users/profile.types";
import {
    deleteInterest,
    fetchMyInterests,
    interestsQueryKey,
} from "@/components/features/interests/api/interests.api";
import { Button } from "@/components/ui/button";

const participationLabels: Record<InterestParticipation, string> = {
    looking_for_company: "Ищу компанию",
    looking_for_teacher: "Ищу того, кто научит",
    want_to_try: "Хочу попробовать впервые",
    can_teach: "Готов(а) поделиться опытом",
};

export function InterestsList() {
    const queryClient = useQueryClient();
    const interestsQuery = useQuery({ queryKey: interestsQueryKey, queryFn: fetchMyInterests });
    const deleteMutation = useMutation({
        mutationFn: deleteInterest,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: interestsQueryKey }),
                queryClient.invalidateQueries({ queryKey: ["profiles", "suggestions"] }),
            ]);
        },
    });

    return (
        <section className="flex flex-col gap-4 rounded-xl bg-white p-4">
            {interestsQuery.isLoading ? (
                <p className="text-sm text-muted-foreground">Загружаем интересы…</p>
            ) : interestsQuery.error ? (
                <p role="alert" className="text-sm text-destructive">{interestsQuery.error.message}</p>
            ) : interestsQuery.data?.length ? (
                <ul className="flex flex-col divide-y divide-border">
                    {interestsQuery.data.map((interest) => (
                        <li key={interest.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                            <div className="min-w-0">
                                <p className="break-words text-sm font-medium">{interest.activity}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    {participationLabels[interest.participation]}
                                </p>
                                {interest.description ? (
                                    <p className="mt-1 break-words text-sm text-muted-foreground">
                                        {interest.description}
                                    </p>
                                ) : null}
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                aria-label={`Удалить интерес: ${interest.activity}`}
                                disabled={deleteMutation.isPending}
                                onClick={() => deleteMutation.mutate(interest.id)}
                            >
                                <X aria-hidden="true" />
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <Link
                    href="/interests/create"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    Пока интересов нет
                    <ChevronRight className="size-5" aria-hidden="true" />
                </Link>
            )}
        </section>
    );
}