import { SuggestedPeopleRow } from "@/components/features/suggestedPeople/containers/suggested-people-row";
import { EventsBento } from "@/components/features/events/containers/events-bento";
import { FilmsList } from "@/components/features/films/containers/films-list";
import { TheaterPosters } from "@/components/features/theater/containers/theater-posters";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-4">
      <SuggestedPeopleRow />
      <EventsBento />
      <FilmsList />
      <TheaterPosters />
    </div>
  );
}
