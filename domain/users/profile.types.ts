import type { User } from "./user.types";
import type { Event } from "@/domain/events/event.types";

export type SuggestedPerson = Pick<
	User,
	"id" | "name" | "status" | "telegramUsername"
> & { primaryEvent?: Event | null };