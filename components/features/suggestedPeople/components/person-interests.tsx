import type { SuggestedInterest } from "@/domain/users/profile.types";
import { Badge } from "@/components/ui/badge";

const PARTICIPATION_LABELS: Record<SuggestedInterest["participation"], string> = {
    looking_for_company: "Ищет компанию",
    looking_for_teacher: "Ищет, кто научит",
    can_teach: "Может научить",
    want_to_try: "Хочет попробовать",
};

export function PersonInterests({ interests }: { interests: SuggestedInterest[] }) {
    return (
        <section className="mx-6 mt-6">
            <h3 className="text-xs font-semibold text-muted-foreground">Чем хочет заняться</h3>
            <ul className="mt-3 flex flex-col gap-3">
                {interests.map((interest, index) => (
                    <li key={`${interest.activity}-${index}`} className="flex items-start justify-between gap-3">
                        <span className="text-sm font-medium">{interest.activity}</span>
                        <Badge variant="secondary" className="h-auto shrink-0 py-1">
                            {PARTICIPATION_LABELS[interest.participation]}
                        </Badge>
                    </li>
                ))}
            </ul>
        </section>
    );
}
