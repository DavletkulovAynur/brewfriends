import { CafeStoriesRow } from "@/components/features/home/cafe-stories-row";
import { EventsBento } from "@/components/features/home/events-bento";
import type { BentoEvent } from "@/components/features/home/event-bento-card";
import { StatsRow } from "@/components/features/home/stats-row";

const mockStats = [
  { label: "кафе рядом", value: 4, href: "/map" },
  { label: "онлайн", value: 12, href: "/people" },
  { label: "в кафе", value: 3, href: "/map" },
] as const;

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

const mockEvents: BentoEvent[] = [
  {
    id: "1",
    title: "Coffee & Code",
    date: "25 ноя.",
    time: "14:00–15:30",
    location: "Starbucks, Невский",
    tag: "Сегодня",
    hostName: "Анна К.",
    hostRole: "Организатор",
    color: "amber",
    size: "large",
  },
  {
    id: "2",
    title: "Morning Brew",
    date: "28 ноя.",
    time: "10:00–11:00",
    location: "Double B",
    tag: "Рядом",
    color: "sky",
    size: "medium",
  },
  {
    id: "3",
    title: "Создать встречу",
    date: "",
    time: "",
    location: "Пригласи людей на кофе",
    tag: "",
    color: "rose",
    size: "small",
    variant: "cta",
  },
];

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

      <StatsRow items={[...mockStats]} />

      <EventsBento events={mockEvents} />
    </div>
  );
}
