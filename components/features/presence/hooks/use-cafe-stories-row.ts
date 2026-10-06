import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useCafesQuery } from "@/components/features/cafes/api/cafes.query";
import { useOwnPresenceQuery } from "@/components/features/presence/api/own-presence.query";
import { usePresenceStoriesQuery } from "@/components/features/presence/api/presence-stories.query";
import { STORY_COVERS } from "@/components/features/presence/constants/constants";
import { getOwnSubtitle, getStoryCover } from "@/components/features/presence/helpers/helpers";

//FIXME: почему мы показываем себя??? 
export function useCafeStoriesRow() {
  const { status, user } = useAuth();
  const storiesQuery = usePresenceStoriesQuery(status !== "loading");
  const ownPresenceQuery = useOwnPresenceQuery(
    user?.id,
    status === "authenticated",
  );
  const cafesQuery = useCafesQuery(status !== "loading");

  const cafes = cafesQuery.data ?? [];
  const ownStory = {
    id: user?.id ?? "own",
    subtitle: getOwnSubtitle(
      ownPresenceQuery.data ?? { isAvailable: false, cafeId: null },
      cafes,
    ),
    initial: user?.name?.charAt(0) ?? "А",
    coverSrc: STORY_COVERS[0],
  };
  const stories = (storiesQuery.data ?? []).map((person) => ({
    id: person.id,
    name: person.name,
    subtitle: person.cafeName,
    initial: person.name.charAt(0),
    coverSrc: getStoryCover(person.id),
  }));

  return {
    ownStory,
    stories,
    error:
      storiesQuery.error?.message ??
      ownPresenceQuery.error?.message ??
      cafesQuery.error?.message,
    isLoading:
      storiesQuery.isLoading ||
      ownPresenceQuery.isLoading ||
      cafesQuery.isLoading,
  };
}
