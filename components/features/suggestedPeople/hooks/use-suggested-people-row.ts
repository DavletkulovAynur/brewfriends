import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useSuggestedPeopleQuery } from "@/components/features/suggestedPeople/api/suggested-people.query";
import { DEFAULT_MEETUP_INTENT } from "@/domain/users/meetup-intent";

// Builds display-ready data for the row, including the current user and suggested profiles.
export function useSuggestedPeopleRow() {
  const { status, user } = useAuth();
  const peopleQuery = useSuggestedPeopleQuery(status !== "loading");
  const ownProfile = {
    id: user?.id ?? "own",
    name: user?.name ?? "Your prof",
    status: user?.status ?? "",
    initial: user?.name?.charAt(0) ?? "X",
    avatarUrl: user?.avatarUrl,
    meetupIntent: user?.meetupIntent ?? DEFAULT_MEETUP_INTENT,
  };
  const people = (peopleQuery.data ?? []).map((person) => ({
    ...person,
    initial: person.name.charAt(0),
  }));

  return {
    ownProfile,
    people,
    error: peopleQuery.error?.message,
    isLoading: status === "loading" || peopleQuery.isLoading,
  };
}