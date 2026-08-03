"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/domain/users/user.types";
import {
  getTelegramInitData,
  readyTelegramWebApp,
} from "@/lib/telegram";

type AuthStatus = "loading" | "authenticated" | "anonymous";

type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  error: string | null;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchMe(): Promise<User | null> {
  const response = await fetch("/api/auth/me", { credentials: "include" });
  if (!response.ok) return null;
  const data = (await response.json()) as { user: User | null };
  return data.user;
}

async function loginWithTelegram(initData: string): Promise<User> {
  const response = await fetch("/api/auth/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ initData }),
  });
  const data = (await response.json()) as { user?: User; error?: string };
  if (!response.ok || !data.user) {
    throw new Error(data.error ?? "Telegram auth failed");
  }
  return data.user;
}

async function loginWithDevBypass(): Promise<User> {
  const response = await fetch("/api/auth/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ devBypass: true }),
  });
  const data = (await response.json()) as { user?: User; error?: string };
  if (!response.ok || !data.user) {
    throw new Error(data.error ?? "Dev auth failed");
  }
  return data.user;
}

export function TelegramAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setStatus("loading");
    setError(null);

    try {
      readyTelegramWebApp();

      const existing = await fetchMe();
      if (existing) {
        setUser(existing);
        setStatus("authenticated");
        return;
      }

      const initData = getTelegramInitData();
      if (initData) {
        const authenticated = await loginWithTelegram(initData);
        setUser(authenticated);
        setStatus("authenticated");
        return;
      }

      if (process.env.NODE_ENV !== "production") {
        const authenticated = await loginWithDevBypass();
        setUser(authenticated);
        setStatus("authenticated");
        return;
      }

      setUser(null);
      setStatus("anonymous");
    } catch (err) {
      setUser(null);
      setStatus("anonymous");
      setError(err instanceof Error ? err.message : "Auth failed");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ status, user, error, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within TelegramAuthProvider");
  }
  return context;
}
