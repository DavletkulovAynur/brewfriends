"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@/domain/users/user.types";

export const currentUserQueryKey = ["auth", "me"] as const;

// возвращаем пользователя текущего 
async function fetchCurrentUser(): Promise<User | null> {
  const response = await fetch("/api/auth/me", { credentials: "include" });
  if (!response.ok) return null;
  const data = (await response.json()) as { user: User | null };
  return data.user;
}

// Loads the current user session on demand when the auth provider calls refetch.
export function useCurrentUserQuery() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: fetchCurrentUser,
    enabled: false,
    retry: false,
  });
}