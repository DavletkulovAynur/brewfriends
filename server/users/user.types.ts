import type { User } from "@/domain/users/user.types";
import type { MeetupIntent } from "@/domain/users/meetup-intent";

export type UpsertTelegramUserInput = {
  telegramId: string;
  name: string;
  telegramUsername?: string;
  avatarUrl?: string;
};

export type UpdateUserProfileInput = {
  status: string;
  visibility: User["visibility"];
  visibleToUserIds: string[];
  meetupIntent: MeetupIntent;
};