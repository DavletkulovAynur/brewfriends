"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CafeStoryCircle } from "./cafe-story-circle";
import { PresenceSheet, type CafeOption } from "./presence-sheet";
import { SectionHeader } from "../shared/section-header";
import { useAuth } from "@/components/providers/telegram-auth-provider";

export type CafeStoryPerson = {
  id: string;
  name: string;
  cafeName: string;
};

type OwnPresence = {
  isAvailable: boolean;
  cafeId: string | null;
};

function getOwnSubtitle(
  presence: OwnPresence,
  cafes: CafeOption[],
): string {
  if (!presence.isAvailable) return "Я в кафе";
  if (!presence.cafeId) return "Доступен";
  return cafes.find((cafe) => cafe.id === presence.cafeId)?.name ?? "В кафе";
}

export function CafeStoriesRow() {
  const { status, user } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [people, setPeople] = useState<CafeStoryPerson[]>([]);
  const [cafes, setCafes] = useState<CafeOption[]>([]);
  const [ownPresence, setOwnPresence] = useState<OwnPresence>({
    isAvailable: false,
    cafeId: null,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setError(null);
    try {
      const [peopleRes, meRes, cafesRes] = await Promise.all([
        fetch("/api/presence", { credentials: "include" }),
        fetch("/api/presence/me", { credentials: "include" }),
        fetch("/api/cafes", { credentials: "include" }),
      ]);

      if (peopleRes.ok) {
        const data = (await peopleRes.json()) as { people: CafeStoryPerson[] };
        setPeople(data.people);
      }

      if (meRes.ok) {
        const data = (await meRes.json()) as {
          presence: OwnPresence;
        };
        setOwnPresence({
          isAvailable: data.presence.isAvailable,
          cafeId: data.presence.cafeId,
        });
      }

      if (cafesRes.ok) {
        const data = (await cafesRes.json()) as { cafes: CafeOption[] };
        setCafes(data.cafes);
      }
    } catch {
      setError("Не удалось загрузить статус");
    }
  }, []);

  useEffect(() => {
    if (status === "loading") return;
    void loadData();
  }, [status, loadData]);

  const isSharing = ownPresence.isAvailable;
  const ownSubtitle = getOwnSubtitle(ownPresence, cafes);
  const userInitial = user?.name?.charAt(0) ?? "А";

  async function handleSave(data: {
    isAvailable: boolean;
    cafeId: string | null;
  }) {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as {
        presence?: OwnPresence;
        error?: string;
      };
      if (!response.ok || !payload.presence) {
        throw new Error(payload.error ?? "Не удалось сохранить");
      }
      setOwnPresence({
        isAvailable: payload.presence.isAvailable,
        cafeId: payload.presence.cafeId,
      });
      setSheetOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  async function handleHide() {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch("/api/presence", {
        method: "DELETE",
        credentials: "include",
      });
      const payload = (await response.json()) as {
        presence?: OwnPresence;
        error?: string;
      };
      if (!response.ok || !payload.presence) {
        throw new Error(payload.error ?? "Не удалось скрыть");
      }
      setOwnPresence({
        isAvailable: payload.presence.isAvailable,
        cafeId: payload.presence.cafeId,
      });
      setSheetOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <section className="flex flex-col gap-3">
        <SectionHeader title="Сейчас в кафе" href="/map" linkLabel="На карте" />

        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-0.5">
          <CafeStoryCircle
            name="Ты"
            subtitle={ownSubtitle}
            initial={userInitial}
            isAdd={!isSharing}
            isLive={isSharing}
            onClick={() => setSheetOpen(true)}
          />

          {people.map((person) => (
            <CafeStoryCircle
              key={person.id}
              name={person.name}
              subtitle={person.cafeName}
              initial={person.name.charAt(0)}
              isLive
            />
          ))}
        </div>

        {error ? (
          <p className="text-center text-xs text-red-500">{error}</p>
        ) : null}

        {people.length === 0 && !isSharing ? (
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            Пока никого в кафе.{" "}
            <Link href="/map" className="underline underline-offset-2">
              Посмотреть карту
            </Link>
          </p>
        ) : null}
      </section>

      <PresenceSheet
        open={sheetOpen}
        cafes={cafes}
        isAvailable={ownPresence.isAvailable}
        selectedCafeId={ownPresence.cafeId}
        saving={saving}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
        onHide={handleHide}
      />
    </>
  );
}
