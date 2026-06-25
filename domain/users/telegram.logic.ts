import type { User } from "./user.types";

export function getTelegramChatUrl(user: User): string | null {
  if (user.telegramUsername) {
    return `https://t.me/${user.telegramUsername}`;
  }

  if (user.telegramId) {
    return `tg://user?id=${user.telegramId}`;
  }

  return null;
}

export function canContactViaTelegram(user: User): boolean {
  return Boolean(user.telegramUsername || user.telegramId);
}
