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

  async listByCreator(creatorId: string) {
    return eventRepository.findByCreator(creatorId);
  },

  async updateOwned(id: string, creatorId: string, input: CreateEventInput) {
    return eventRepository.updateOwned(id, creatorId, input);
  },

  async setPrimary(id: string, creatorId: string) {
    return eventRepository.setPrimary(id, creatorId);
  },

  async deleteOwned(id: string, creatorId: string) {
    return eventRepository.deleteOwned(id, creatorId);
  },
};