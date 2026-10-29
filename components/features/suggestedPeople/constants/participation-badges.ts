import type { InterestParticipation } from "@/domain/users/profile.types";

export const PARTICIPATION_BADGES: Record<
    InterestParticipation,
    { label: string; className: string }
> = {
    looking_for_company: { label: "Ищет компанию", className: "bg-[#caffa7]" },
    looking_for_teacher: { label: "Ищет, кто научит", className: "bg-[#a9e2f2]" },
    can_teach: { label: "Готов(а) поделиться опытом", className: "bg-[#f8f9e5]" },
    want_to_try: { label: "Хочет попробовать впервые", className: "bg-[#caffa7]" },
};