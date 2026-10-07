import { eventRepository } from "@/server/events/event.repository";

export const eventService = {
  async list() {
    return eventRepository.findAll();
  },
};