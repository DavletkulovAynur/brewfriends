"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PersonCircle } from "@/components/features/suggestedPeople/components/person-circle";
import { SuggestedPersonSheet } from "@/components/features/suggestedPeople/components/suggested-person-sheet";
import { useSuggestedPeopleRow } from "@/components/features/suggestedPeople/hooks/use-suggested-people-row";
import { getTelegramUser } from "@/lib/telegram";

export function SuggestedPeopleRow() {
  const router = useRouter();
  const {
    ownProfile,
    people,
    error,
    isLoading,
  } = useSuggestedPeopleRow();
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>();
  const [selectedPerson, setSelectedPerson] = useState<(typeof people)[number] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvatarSrc(getTelegramUser()?.photoUrl);
  }, []);

  return (
    <section className="flex flex-col gap-3" aria-busy={isLoading}>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-0.5">
        <PersonCircle
          name={ownProfile.name}
          status={ownProfile.status}
          initial={ownProfile.initial}
          coverSrc={ownProfile.coverSrc}
          avatarSrc={avatarSrc}
          onClick={() => router.push("/settings")}
        />

        {people.map((person) => (
          <PersonCircle
            key={person.id}
            name={person.name}
            status={person.status}
            initial={person.initial}
            coverSrc={person.coverSrc}
            onClick={() => setSelectedPerson(person)}
          />
        ))}
      </div>

      {error ? <p className="text-center text-xs text-red-500">{error}</p> : null}

      <SuggestedPersonSheet
        person={selectedPerson}
        onOpenChange={(open) => {
          if (!open) setSelectedPerson(null);
        }}
      />
    </section>
  );
}