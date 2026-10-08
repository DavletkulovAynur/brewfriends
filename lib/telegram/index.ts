"use client";

import WebApp from "@twa-dev/sdk";

export type TelegramClientUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
};

export function getTelegramWebApp() {
  if (typeof window === "undefined") return null;

  try {
    return WebApp;
  } catch {
    return null;
  }
}

export function getTelegramInitData(): string | null {
  const webApp = getTelegramWebApp();
  const initData = webApp?.initData;
  return initData && initData.length > 0 ? initData : null;
}

export function getTelegramUser(): TelegramClientUser | null {
  const webApp = getTelegramWebApp();
  const user = webApp?.initDataUnsafe?.user;
  if (!user?.id || !user.first_name) return null;

  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    photoUrl: user.photo_url,
  };
}

const EVENT_START_PARAM = /^event_([A-Za-z0-9-]+)$/;

export function parseEventStartParam(): string | null {
  const param = getTelegramWebApp()?.initDataUnsafe?.start_param;
  return param?.match(EVENT_START_PARAM)?.[1] ?? null;
}

function buildEventLink(eventId: string) {
  const bot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;
  const app = process.env.NEXT_PUBLIC_TELEGRAM_APP_NAME;
  if (!bot) return null;

  const base = app ? `https://t.me/${bot}/${app}` : `https://t.me/${bot}`;
  return `${base}?startapp=event_${eventId}`;
}

export function shareEventInTelegram(event: {
  id: string;
  title: string;
  time: string;
  location: string;
}) {
  const link = buildEventLink(event.id);
  if (!link) return;

  const text = `${event.title}\n${event.time}, ${event.location}`;
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;

  const webApp = getTelegramWebApp();
  if (webApp && getTelegramInitData()) {
    webApp.openTelegramLink(shareUrl);
  } else {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }
}

export function readyTelegramWebApp() {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  webApp.ready();
  webApp.expand();
}
