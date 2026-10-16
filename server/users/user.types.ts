import type { User } from "@/domain/users/user.types";

export type UpsertTelegramUserInput = {
  telegramId: string;
  name: string;
  telegramUsername?: string;
};

export type UpdateUserProfileInput = {
  status: string;
  visibility: User["visibility"];
  visibleToUserIds: string[];
};