export type EventColor = "amber" | "sky" | "rose";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  startsAt: string | null;
  endsAt: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  color: EventColor;
};

export type CreateEventInput = {
  description: string;
  startsAt: string | null;
};
