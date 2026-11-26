export type EventColor = "amber" | "sky" | "rose";
export type EventPriceType = "free" | "paid";

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  priceType?: EventPriceType;
  priceAmount?: number | null;
  startsAt: string | null;
  endsAt: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  color: EventColor;
  isPrimary?: boolean;
  isConnected?: boolean;
  connectionsCount?: number;
  participants?: EventParticipant[];
};

export type EventParticipant = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type EventConnection = {
  userId: string;
  name: string;
  telegramUsername?: string;
  createdAt: string;
};

export type CreateEventInput = {
  title: string;
  description: string;
  location: string;
  priceType: EventPriceType;
  priceAmount: number | null;
  startsAt: string | null;
};
