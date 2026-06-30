import type { BentoEvent } from "./event-bento-card";

export const mockEvents: BentoEvent[] = [
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
    title: "Latte & Learn",
    date: "30 ноя.",
    time: "18:00–19:00",
    location: "Surf Coffee",
    tag: "Скоро",
    hostName: "Макс П.",
    hostRole: "Организатор",
    color: "rose",
    size: "small",
  },
];
