export type User = {
  id: string;
  name: string;
  status: string;
  visibility: "everyone" | "selected";
  visibleToUserIds: string[];
  bio?: string;
  interests: string[];
  telegramUsername?: string;
  telegramId?: string;
};
