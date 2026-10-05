"use client";

import { CafeStoryCircle } from "@/components/features/presence/components/cafe-story-circle";
import { useCafeStoriesRow } from "@/components/features/presence/hooks/use-cafe-stories-row";

export function CafeStoriesRow() {
  const { ownStory, stories, error, isLoading } = useCafeStoriesRow();

  return (
    <section className="flex flex-col gap-3" aria-busy={isLoading}>
      <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-0.5">
        <CafeStoryCircle
          name={ownStory.name}
          subtitle={ownStory.subtitle}
          initial={ownStory.initial}
          coverSrc={ownStory.coverSrc}
        />

        {stories.map((story) => (
          <CafeStoryCircle
            key={story.id}
            name={story.name}
            subtitle={story.subtitle}
            initial={story.initial}
            coverSrc={story.coverSrc}
          />
        ))}
      </div>

      {error ? (
        <p className="text-center text-xs text-red-500">{error}</p>
      ) : null}
    </section>
  );
}
