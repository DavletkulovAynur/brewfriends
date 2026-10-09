import { eventRepository } from "@/server/events/event.repository";

export const eventService = {
  async list() {
    return eventRepository.findUpcoming();
  },

  async getById(id: string) {
    return eventRepository.findById(id);
  },
};