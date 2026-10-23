import type { InterestParticipation, UserInterest } from "@/domain/users/profile.types";

export const interestsQueryKey = ["interests", "mine"] as const;

export async function fetchMyInterests(): Promise<UserInterest[]> {
  const response = await fetch("/api/profile/interests", { credentials: "include" });
  const data = (await response.json()) as { interests?: UserInterest[]; error?: string };
  if (!response.ok || !data.interests) {
    throw new Error(data.error ?? "Не удалось загрузить интересы");
  }
  return data.interests;
}

export async function createInterest(input: {
  activity: string;
  description: string;
  participation: InterestParticipation;
}): Promise<UserInterest> {
  const response = await fetch("/api/profile/interests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });
  const data = (await response.json()) as { interest?: UserInterest; error?: string };
  if (!response.ok || !data.interest) {
    throw new Error(data.error ?? "Не удалось сохранить интерес");
  }
  return data.interest;
}

export async function deleteInterest(id: string): Promise<void> {
  const response = await fetch(`/api/profile/interests/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = (await response.json()) as { error?: string };
  if (!response.ok) throw new Error(data.error ?? "Не удалось удалить интерес");
}