import type { User } from "./user.types";

export type SuggestedPerson = Pick<
	User,
	"id" | "name" | "status" | "telegramUsername"
>;