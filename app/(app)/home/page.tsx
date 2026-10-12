import { SuggestedPeopleRow } from "@/components/features/suggestedPeople/containers/suggested-people-row";
import { EventsBento } from "@/components/features/events/containers/events-bento";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      <SuggestedPeopleRow />
      <EventsBento />
    </div>
  );
}
