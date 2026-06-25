"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CafeOption = {
  id: string;
  name: string;
  distance: string;
};

type PresenceSheetProps = {
  open: boolean;
  cafes: CafeOption[];
  isAvailable: boolean;
  selectedCafeId: string | null;
  onClose: () => void;
  onSave: (data: { isAvailable: boolean; cafeId: string | null }) => void;
  onHide: () => void;
};

export function PresenceSheet({
  open,
  cafes,
  isAvailable,
  selectedCafeId,
  onClose,
  onSave,
  onHide,
}: PresenceSheetProps) {
  const [available, setAvailable] = useState(isAvailable);
  const [cafeId, setCafeId] = useState<string | null>(selectedCafeId);

  useEffect(() => {
    if (open) {
      setAvailable(isAvailable);
      setCafeId(selectedCafeId);
    }
  }, [open, isAvailable, selectedCafeId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-t-3xl bg-white p-6 pb-8 dark:bg-zinc-950">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />

        <h2 className="text-lg font-semibold">Твой статус</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Покажи, что ты онлайн. Кафе можно выбрать, но это необязательно.
        </p>

        <div className="mt-6 flex flex-col gap-6">
          <label className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div>
              <p className="font-medium">Онлайн и доступен</p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Люди смогут увидеть, что ты открыт к общению
              </p>
            </div>
            <input
              type="checkbox"
              checked={available}
              onChange={(event) => setAvailable(event.target.checked)}
              className="size-5 accent-zinc-900 dark:accent-white"
            />
          </label>

          <fieldset
            className={cn(
              "flex flex-col gap-3",
              !available && "pointer-events-none opacity-40",
            )}
          >
            <legend className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Кафе{" "}
              <span className="font-normal text-zinc-500">(необязательно)</span>
            </legend>

            <button
              type="button"
              onClick={() => setCafeId(null)}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                cafeId === null
                  ? "border-zinc-900 dark:border-white"
                  : "border-zinc-200 dark:border-zinc-800",
              )}
            >
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-full border",
                  cafeId === null
                    ? "border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white"
                    : "border-zinc-300 dark:border-zinc-600",
                )}
              >
                {cafeId === null ? (
                  <span className="size-1.5 rounded-full bg-white dark:bg-zinc-900" />
                ) : null}
              </span>
              <div>
                <p className="font-medium">Без кафе</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Просто онлайн, без привязки к месту
                </p>
              </div>
            </button>

            {cafes.map((cafe) => (
              <button
                key={cafe.id}
                type="button"
                onClick={() => setCafeId(cafe.id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                  cafeId === cafe.id
                    ? "border-zinc-900 dark:border-white"
                    : "border-zinc-200 dark:border-zinc-800",
                )}
              >
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded-full border",
                    cafeId === cafe.id
                      ? "border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white"
                      : "border-zinc-300 dark:border-zinc-600",
                  )}
                >
                  {cafeId === cafe.id ? (
                    <span className="size-1.5 rounded-full bg-white dark:bg-zinc-900" />
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{cafe.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {cafe.distance}
                  </p>
                </div>
              </button>
            ))}
          </fieldset>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() =>
                onSave({
                  isAvailable: available,
                  cafeId: available ? cafeId : null,
                })
              }
              className="rounded-full bg-zinc-900 py-3 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
            >
              Сохранить
            </button>

            {isAvailable ? (
              <button
                type="button"
                onClick={onHide}
                className="rounded-full border border-zinc-300 py-3 text-sm font-medium dark:border-zinc-700"
              >
                Скрыть меня
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
