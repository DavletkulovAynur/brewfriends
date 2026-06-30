"use client";

import { useState } from "react";
import Link from "next/link";
import { CafeStoryCircle } from "./cafe-story-circle";
import { PresenceSheet, type CafeOption } from "./presence-sheet";
import { SectionHeader } from "../shared/section-header";

export type CafeStoryPerson = {
  id: string;
  name: string;
  cafeName: string;
};

type OwnPresence = {
  isAvailable: boolean;
  cafeId: string | null;
};

type CafeStoriesRowProps = {
  people: CafeStoryPerson[];
  cafes: CafeOption[];
  userInitial?: string;
};

function getOwnSubtitle(
  presence: OwnPresence,
  cafes: CafeOption[],
): string {
  if (!presence.isAvailable) return "Я в кафе";

  if (!presence.cafeId) return "Доступен";

  return cafes.find((cafe) => cafe.id === presence.cafeId)?.name ?? "В кафе";
}

export function CafeStoriesRow({
  people,
  cafes,
  userInitial = "А",
}: CafeStoriesRowProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [ownPresence, setOwnPresence] = useState<OwnPresence>({
    isAvailable: false,
    cafeId: null,
  });

  const isSharing = ownPresence.isAvailable;
  const ownSubtitle = getOwnSubtitle(ownPresence, cafes);

  return (
    <>
      <section className="flex flex-col gap-3">
        <SectionHeader title="Сейчас в кафе" href="/map" linkLabel="На карте" />

        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-1">
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
        onClose={() => setSheetOpen(false)}
        onSave={({ isAvailable, cafeId }) => {
          setOwnPresence({
            isAvailable,
            cafeId: isAvailable ? cafeId : null,
          });
          setSheetOpen(false);
        }}
        onHide={() => {
          setOwnPresence({ isAvailable: false, cafeId: null });
          setSheetOpen(false);
        }}
      />
    </>
  );
}
