import type { User } from "./user.types";

export type ProfileStory = Pick<User, "id" | "name" | "status">;