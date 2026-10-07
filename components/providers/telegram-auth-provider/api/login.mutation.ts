"use client";

import { useMutation } from "@tanstack/react-query";
import type { User } from "@/domain/users/user.types";

type LoginPayload = { initData: string } | { devBypass: true };

async function login(payload: LoginPayload): Promise<User> {
  const response = await fetch("/api/auth/telegram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as { user?: User; error?: string };
  if (!response.ok || !data.user) {
    throw new Error(data.error ?? "Authentication failed");
  }
  return data.user;
}

// Authenticates with Telegram initData or the server-gated development bypass.
export function useLoginMutation() {
  return useMutation({ mutationFn: login });
}