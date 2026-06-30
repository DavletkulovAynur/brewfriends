import { CafeStoriesRow } from "@/components/features/home/presence/cafe-stories-row";
import { EventsBento } from "@/components/features/events/events-bento";
import { mockEvents } from "@/components/features/events/mock-events";

const mockPeopleInCafes = [
  { id: "1", name: "Анна", cafeName: "Starbucks" },
  { id: "2", name: "Макс", cafeName: "Double B" },
  { id: "3", name: "Лена", cafeName: "Surf Coffee" },
  { id: "4", name: "Иван", cafeName: "Starbucks" },
  { id: "5", name: "Катя", cafeName: "Double B" },
] as const;

const mockNearbyCafes = [
  { id: "1", name: "Starbucks", distance: "200 м", peopleCount: 2 },
  { id: "2", name: "Double B", distance: "450 м", peopleCount: 1 },
  { id: "3", name: "Surf Coffee", distance: "600 м", peopleCount: 0 },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6 pt-4">
      <header>
        <h1 className="text-sm text-zinc-500 dark:text-zinc-400">
          Привет, <span className="text-foreground">Айнур</span>
        </h1>
      </header>

      <CafeStoriesRow
        people={[...mockPeopleInCafes]}
        cafes={mockNearbyCafes.map((cafe) => ({
          id: cafe.id,
          name: cafe.name,
          distance: cafe.distance,
        }))}
        userInitial="А"
      />

      <EventsBento events={mockEvents} />
    </div>
  );
}
