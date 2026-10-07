import type { User } from "@/domain/users/user.types";

export type UpsertTelegramUserInput = {
  telegramId: string;
  name: string;
  telegramUsername?: string;
};

export type UpdateUserProfileInput = {
  name: string;
  status: string;
  visibility: User["visibility"];
  visibleToUserIds: string[];
};