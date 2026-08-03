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

export function readyTelegramWebApp() {
  const webApp = getTelegramWebApp();
  if (!webApp) return;

  webApp.ready();
  webApp.expand();
}
