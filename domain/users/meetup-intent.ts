export const MEETUP_INTENTS = [
  "coffee_chat",
  "book_chat",
  "series_chat",
  "video_games",
  "learn_together",
  "just_browsing",
] as const;

export type MeetupIntent = (typeof MEETUP_INTENTS)[number];

export const DEFAULT_MEETUP_INTENT: MeetupIntent = "just_browsing";

export const MEETUP_INTENT_LABELS: Record<MeetupIntent, string> = {
  coffee_chat: "Обсудить что-нибудь за кофе",
  book_chat: "Обсудить книги",
  series_chat: "Обсудить сериалы",
  video_games: "Поиграть в видеоигры",
  learn_together: "Узнать что-то новое вместе",
  just_browsing: "Пока присматриваюсь",
};

export const MEETUP_INTENT_EMOJIS: Record<MeetupIntent, string> = {
  coffee_chat: "☕",
  book_chat: "📚",
  series_chat: "📺",
  video_games: "🎮",
  learn_together: "🧠",
  just_browsing: "👀",
};

export function isMeetupIntent(value: unknown): value is MeetupIntent {
  return MEETUP_INTENTS.some((intent) => intent === value);
}