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
  isPrimary?: boolean;
  isConnected?: boolean;
  connectionsCount?: number;
};

export type EventConnection = {
  userId: string;
  name: string;
  telegramUsername?: string;
  createdAt: string;
};

export type CreateEventInput = {
  description: string;
  startsAt: string | null;
};
