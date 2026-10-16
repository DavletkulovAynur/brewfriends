import type { CreateEventInput } from "@/domain/events/event.types";
import { eventRepository } from "@/server/events/event.repository";

export const eventService = {
  async list() {
    return eventRepository.findUpcoming();
  },

  async getById(id: string) {
    return eventRepository.findById(id);
  },

  async create(creatorId: string, input: CreateEventInput) {
    return eventRepository.create(creatorId, input);
  },
};