import type { CreateEventInput } from "@/domain/events/event.types";
import { canViewProfile } from "@/domain/users/profile.logic";
import { eventRepository } from "@/server/events/event.repository";
import { userRepository } from "@/server/users/user.repository";

export type ConnectResult = "ok" | "not_found" | "own_event";
export type ListConnectionsResult =
  | { status: "ok"; connections: Awaited<ReturnType<typeof eventRepository.listConnections>> }
  | { status: "not_found" }
  | { status: "forbidden" };

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
    const events = await eventRepository.findByCreator(creatorId);
    const counts = await eventRepository.countConnections(
      events.map((event) => event.id),
    );
    return events.map((event) => ({
      ...event,
      connectionsCount: counts.get(event.id) ?? 0,
    }));
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

  async connect(eventPostId: string, userId: string): Promise<ConnectResult> {
    const post = await eventRepository.findPostCreatorId(eventPostId);
    if (!post?.creatorId) return "not_found";
    if (post.creatorId === userId) return "own_event";

    const creator = await userRepository.findById(post.creatorId);
    if (!creator || !canViewProfile(creator, userId)) return "not_found";

    await eventRepository.addConnection(eventPostId, userId);
    return "ok";
  },

  async disconnect(eventPostId: string, userId: string) {
    await eventRepository.removeConnection(eventPostId, userId);
  },

  async listConnections(
    eventPostId: string,
    requesterId: string,
  ): Promise<ListConnectionsResult> {
    const post = await eventRepository.findPostCreatorId(eventPostId);
    if (!post) return { status: "not_found" };
    if (post.creatorId !== requesterId) return { status: "forbidden" };
    return {
      status: "ok",
      connections: await eventRepository.listConnections(eventPostId),
    };
  },
};