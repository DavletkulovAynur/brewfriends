import type { Event } from "@/domain/events/event.types";

const stubEvents: Event[] = [];

export const eventRepository = {
  async findAll(): Promise<Event[]> {
    return stubEvents;
  },
};
