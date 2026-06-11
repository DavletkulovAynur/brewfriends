import { eventRepository } from "@/server/repositories/event.repo";

export const eventService = {
  async list() {
    return eventRepository.findAll();
  },
};
