"use client";

import { useQuery } from "@tanstack/react-query";
import type { User } from "@/domain/users/user.types";

export const profileQueryKey = ["profile", "editor"] as const;

async function fetchProfile(): Promise<User> {
  const response = await fetch("/api/profile", { credentials: "include" });
  const data = (await response.json()) as {
    user?: User;
    error?: string;
  };

  if (!response.ok || !data.user) {
    throw new Error(data.error ?? "Could not load profile");
  }

  return data.user;
}

export function useProfileQuery(enabled = true) {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: fetchProfile,
    enabled,
    retry: false,
  });
}