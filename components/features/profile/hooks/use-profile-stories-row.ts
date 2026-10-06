import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useProfileStoriesQuery } from "@/components/features/profile/api/profile-stories.query";
import { STORY_COVERS } from "@/components/features/profile/constants/story-covers";
import { getStoryCover } from "@/components/features/profile/helpers/get-story-cover";

export function useProfileStoriesRow() {
  const { status, user } = useAuth();
  const storiesQuery = useProfileStoriesQuery(status !== "loading");
  const ownStory = {
    id: user?.id ?? "own",
    name: user?.name ?? "Your profile",
    status: user?.status ?? "",
    initial: user?.name?.charAt(0) ?? "А",
    coverSrc: STORY_COVERS[0],
  };
  const stories = (storiesQuery.data ?? []).map((person) => ({
    ...person,
    initial: person.name.charAt(0),
    coverSrc: getStoryCover(person.id),
  }));

  return {
    ownStory,
    stories,
    error: storiesQuery.error?.message,
    isLoading: storiesQuery.isLoading,
  };
}