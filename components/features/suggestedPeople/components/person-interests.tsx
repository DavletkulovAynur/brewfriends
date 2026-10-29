import type { SuggestedInterest } from "@/domain/users/profile.types";
import { Badge } from "@/components/ui/badge";
import { PARTICIPATION_BADGES } from "@/components/features/suggestedPeople/constants/participation-badges";

export function PersonInterests({ interests }: { interests: SuggestedInterest[] }) {
    return (
        <section className="mx-6 mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground">Чем хочет заняться</h3>
            <ul className="mt-3 flex flex-col gap-3">
                {interests.map((interest, index) => {
                    const badge = PARTICIPATION_BADGES[interest.participation];

                    return (
                        <li key={`${interest.activity}-${index}`} className="rounded-xl bg-white p-4">
                            <p className="break-words text-base font-medium leading-snug text-[#1f4557]">{interest.activity}</p>
                            <div className="mt-2 flex flex-wrap items-start gap-2">
                                {interest.description ? (
                                    <p className="min-w-0 flex-1 basis-32 break-words text-sm leading-5 text-[#1f4557]/80">
                                        {interest.description}
                                    </p>
                                ) : null}
                                <Badge
                                    variant="secondary"
                                    className={`h-auto shrink-0 rounded-md px-2 py-1 text-xs text-[#1f4557] ${badge.className}`}
                                >
                                    {badge.label}
                                </Badge>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
