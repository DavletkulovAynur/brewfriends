import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useSuggestedPeopleQuery } from "@/components/features/suggestedPeople/api/suggested-people.query";
import { PROFILE_COVERS } from "@/components/features/suggestedPeople/constants/profile-covers";
import { getProfileCover } from "@/components/features/suggestedPeople/helpers/get-profile-cover";

// Builds display-ready data for the row, including the current user and suggested profiles.
export function useSuggestedPeopleRow() {
  const { status, user } = useAuth();
  const peopleQuery = useSuggestedPeopleQuery(status !== "loading");
  const ownProfile = {
    id: user?.id ?? "own",
    name: user?.name ?? "Your profile",
    status: user?.status ?? "",
    initial: user?.name?.charAt(0) ?? "X",
    coverSrc: PROFILE_COVERS[0],
  };
  const people = (peopleQuery.data ?? []).map((person) => ({
    ...person,
    initial: person.name.charAt(0),
    coverSrc: getProfileCover(person.id),
  }));

  return {
    ownProfile,
    people,
    error: peopleQuery.error?.message,
    isLoading: peopleQuery.isLoading,
  };
}