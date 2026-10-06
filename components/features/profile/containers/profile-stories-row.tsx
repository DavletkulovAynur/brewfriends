"use client";

import { useRouter } from "next/navigation";
import { ProfileStoryCircle } from "@/components/features/profile/components/profile-story-circle";
import { useProfileStoriesRow } from "@/components/features/profile/hooks/use-profile-stories-row";

export function ProfileStoriesRow() {
  const router = useRouter();
  const { ownStory, stories, error, isLoading } = useProfileStoriesRow();

  return (
    <section className="flex flex-col gap-3" aria-busy={isLoading}>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-0.5">
        <ProfileStoryCircle
          name={ownStory.name}
          status={ownStory.status}
          initial={ownStory.initial}
          coverSrc={ownStory.coverSrc}
          onClick={() => router.push("/settings")}
        />

        {stories.map((story) => (
          <ProfileStoryCircle
            key={story.id}
            name={story.name}
            status={story.status}
            initial={story.initial}
            coverSrc={story.coverSrc}
          />
        ))}
      </div>

      {error ? <p className="text-center text-xs text-red-500">{error}</p> : null}
    </section>
  );
}