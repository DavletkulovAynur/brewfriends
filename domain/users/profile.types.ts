import type { User } from "./user.types";
import type { Event } from "@/domain/events/event.types";

export type SuggestedPerson = Pick<
	User,
	"id" | "name" | "status" | "telegramUsername"
> & { primaryEvent?: Event | null; interests?: SuggestedInterest[] };

export const INTEREST_PARTICIPATIONS = [
	"looking_for_company",
	"looking_for_teacher",
	"want_to_try",
	"can_teach",
] as const;

export type InterestParticipation = (typeof INTEREST_PARTICIPATIONS)[number];

export type UserInterest = {
	id: string;
	userId: string;
	activity: string;
	description: string | null;
	participation: InterestParticipation;
	createdAt: string;
};

export type SuggestedInterest = Pick<UserInterest, "activity" | "participation">;