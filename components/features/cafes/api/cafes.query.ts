"use client";

import { useQuery } from "@tanstack/react-query";
import type { CafeOption } from "../types/cafe.types";

export const cafesQueryKey = ["cafes"] as const;

async function fetchCafes(): Promise<CafeOption[]> {
  const response = await fetch("/api/cafes", { credentials: "include" });
  if (!response.ok) throw new Error("Не удалось загрузить кафе");

  const data = (await response.json()) as { cafes: CafeOption[] };
  return data.cafes;
}

export function useCafesQuery(enabled = true) {
  return useQuery({
    queryKey: cafesQueryKey,
    queryFn: fetchCafes,
    enabled,
  });
}