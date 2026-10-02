"use client";

import { useState } from "react";
import { CafeStoryCircle } from "../components/cafe-story-circle";
import { PresenceSheet } from "../components/presence-sheet";
import { useAuth } from "@/components/providers/telegram-auth-provider";
import { STORY_COVERS } from "../constants/constants";
import { getOwnSubtitle, getStoryCover } from "../helpers/helpers";
import { useCafesQuery } from "@/components/features/cafes/api/cafes.query";
import { useOwnPresenceQuery } from "../api/own-presence.query";
import { usePresenceStoriesQuery } from "../api/presence-stories.query";
import { useHidePresenceMutation } from "../api/presence.delete";
import { useSavePresenceMutation } from "../api/presence.mutation";

export function CafeStoriesRow() {
  const { status, user } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const storiesQuery = usePresenceStoriesQuery(status !== "loading");
  const ownPresenceQuery = useOwnPresenceQuery(
    user?.id,
    status === "authenticated",
  );
  const cafesQuery = useCafesQuery(status !== "loading");
  const savePresenceMutation = useSavePresenceMutation();
  const hidePresenceMutation = useHidePresenceMutation();

  const ownPresence = ownPresenceQuery.data;
  const cafes = cafesQuery.data ?? [];
  const error =
    storiesQuery.error?.message ??
    ownPresenceQuery.error?.message ??
    cafesQuery.error?.message ??
    savePresenceMutation.error?.message ??
    hidePresenceMutation.error?.message;
  const saving = savePresenceMutation.isPending || hidePresenceMutation.isPending;
  const ownSubtitle = getOwnSubtitle(
    ownPresence ?? { isAvailable: false, cafeId: null },
    cafes,
  );
  const userInitial = user?.name?.charAt(0) ?? "А";

  async function handleSave(data: {
    isAvailable: boolean;
    cafeId: string | null;
  }) {
    try {
      await savePresenceMutation.mutateAsync(data);
      setSheetOpen(false);
    } catch {
      return;
    }
  }

  async function handleHide() {
    try {
      await hidePresenceMutation.mutateAsync();
      setSheetOpen(false);
    } catch {
      return;
    }
  }

  return (
    <>
      <section className="flex flex-col gap-3">

        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-0.5">
          <CafeStoryCircle
            name="Ты"
            subtitle={ownSubtitle}
            initial={userInitial}
            coverSrc={STORY_COVERS[0]}
            onClick={() => setSheetOpen(true)}
          />

          {(storiesQuery.data ?? []).map((person) => (
            <CafeStoryCircle
              key={person.id}
              name={person.name}
              subtitle={person.cafeName}
              initial={person.name.charAt(0)}
              coverSrc={getStoryCover(person.id)}
            />
          ))}
        </div>

        {error ? (
          <p className="text-center text-xs text-red-500">{error}</p>
        ) : null}

      </section>

      <PresenceSheet
        key={sheetOpen ? "open" : "closed"}
        open={sheetOpen}
        cafes={cafes}
        isAvailable={ownPresence?.isAvailable ?? false}
        selectedCafeId={ownPresence?.cafeId ?? null}
        saving={saving}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
        onHide={handleHide}
      />
    </>
  );
}
