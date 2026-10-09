export type EventColor = "amber" | "sky" | "rose";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string | null;
  imageUrl: string | null;
  color: EventColor;
};
