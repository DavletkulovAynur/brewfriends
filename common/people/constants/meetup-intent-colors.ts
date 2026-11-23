import type { MeetupIntent } from "@/domain/users/meetup-intent";

export const MEETUP_INTENT_COLORS: Record<MeetupIntent, string> = {
  coffee_chat: "#c68d40",
  book_chat: "#e4ccaa",
  series_chat: "#73848b",
  video_games: "#7a774a",
  learn_together: "#c68d40",
  just_browsing: "#37565b",
};

export const MEETUP_INTENT_SHORT_LABELS: Record<MeetupIntent, string> = {
  coffee_chat: "Кофе",
  book_chat: "Книги",
  series_chat: "Сериалы",
  video_games: "Игры",
  learn_together: "Учиться",
  just_browsing: "Знакомлюсь",
};