"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/domain/users/user.types";
import type { ProfileUpdatePayload } from "@/components/features/profile/types/profile.types";
import { currentUserQueryKey } from "@/components/providers/telegram-auth-provider/api/current-user.query";
import { profileQueryKey } from "./profile.query";

async function updateProfile(input: ProfileUpdatePayload): Promise<User> {
  const response = await fetch("/api/profile", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as { user?: User; error?: string };

  if (!response.ok || !data.user) {
    throw new Error(data.error ?? "Could not save profile");
  }

  return data.user;
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData<User>(profileQueryKey, user);
      queryClient.setQueryData<User>(currentUserQueryKey, user);
    },
  });
}