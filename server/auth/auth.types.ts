export type SessionPayload = {
  userId: string;
  telegramId: string;
};

export type TelegramWebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
};

export type ValidatedInitData = {
  user: TelegramWebAppUser;
  authDate: number;
  queryId?: string;
};