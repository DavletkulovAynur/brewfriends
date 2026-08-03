import { userRepository } from "@/server/repositories/user.repo";
import {
  displayNameFromTelegramUser,
  type TelegramWebAppUser,
  validateTelegramInitData,
} from "@/lib/telegram/validate";
import { setSessionCookie } from "@/lib/auth/session";
import type { User } from "@/domain/users/user.types";

const DEV_USER: TelegramWebAppUser = {
  id: 100001,
  first_name: "Айнур",
  username: "aynur_dev",
};

function isDevAuthBypassEnabled() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_AUTH_BYPASS === "1"
  );
}

export const authService = {
  async loginWithTelegramInitData(initData: string): Promise<User> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      throw new Error("TELEGRAM_BOT_TOKEN is not configured");
    }

    const validated = validateTelegramInitData(initData, botToken);
    return this.upsertAndCreateSession(validated.user);
  },

  async loginWithDevBypass(): Promise<User> {
    if (!isDevAuthBypassEnabled()) {
      throw new Error("Dev auth bypass is disabled");
    }
    return this.upsertAndCreateSession(DEV_USER);
  },

  async upsertAndCreateSession(telegramUser: TelegramWebAppUser): Promise<User> {
    const user = await userRepository.upsertFromTelegram({
      telegramId: String(telegramUser.id),
      name: displayNameFromTelegramUser(telegramUser),
      telegramUsername: telegramUser.username,
    });

    await setSessionCookie({
      userId: user.id,
      telegramId: String(telegramUser.id),
    });

    return user;
  },
};

export { isDevAuthBypassEnabled };
