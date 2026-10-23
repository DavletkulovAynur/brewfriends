import { and, asc, eq, inArray, sql } from "drizzle-orm";
import type {
  CreateEventInput,
  Event,
  EventConnection,
} from "@/domain/events/event.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";

const { eventPosts, events, eventConnections, users } = schema;

const EVENT_POST_LOCATION = "Место пока не указано";

function toEvent(row: typeof events.$inferSelect): Event {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    startsAt: row.startsAt?.toISOString() ?? null,
    endsAt: row.endsAt?.toISOString() ?? null,
    imageUrl: row.imageUrl,
    videoUrl: row.videoUrl,
    color: row.color,
    isPrimary: false,
  };
}

function toEventPost(row: typeof eventPosts.$inferSelect): Event {
  return {
    id: row.id,
    title: row.description,
    description: row.description,
    location: EVENT_POST_LOCATION,
    startsAt: row.startsAt?.toISOString() ?? null,
    endsAt: null,
    imageUrl: null,
    videoUrl: null,
    color: "amber",
    isPrimary: row.isPrimary,
  };
}

export const eventRepository = {
  async create(creatorId: string, input: CreateEventInput): Promise<Event> {
    const [row] = await getDb()
      .insert(eventPosts)
      .values({
        description: input.description,
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
        creatorId,
      })
      .returning();

    return toEventPost(row);
  },

  // Upcoming, ongoing, and undated events.
  async findUpcoming(): Promise<Event[]> {
    const rows = await getDb()
      .select()
      .from(events)
      .where(
        sql`${events.startsAt} is null or coalesce(${events.endsAt}, ${events.startsAt}) >= now()`,
      )
      .orderBy(asc(events.startsAt));
    return rows.map(toEvent);
  },

  async findByCreator(creatorId: string): Promise<Event[]> {
    const rows = await getDb()
      .select()
      .from(eventPosts)
      .where(eq(eventPosts.creatorId, creatorId))
      .orderBy(asc(eventPosts.startsAt));
    return rows.map(toEventPost);
  },

  async findPrimaryByCreatorIds(creatorIds: string[]) {
    if (creatorIds.length === 0 || !isDbConfigured()) {
      return new Map<string, Event>();
    }

    const rows = await getDb()
      .select()
      .from(eventPosts)
      .where(
        and(inArray(eventPosts.creatorId, creatorIds), eq(eventPosts.isPrimary, true)),
      );
    return new Map(
      rows
        .filter((row): row is typeof row & { creatorId: string } => row.creatorId !== null)
        .map((row) => [row.creatorId, toEventPost(row)]),
    );
  },

  async updateOwned(
    id: string,
    creatorId: string,
    input: CreateEventInput,
  ): Promise<Event | null> {
    const [row] = await getDb()
      .update(eventPosts)
      .set({
        description: input.description,
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
      })
      .where(and(eq(eventPosts.id, id), eq(eventPosts.creatorId, creatorId)))
      .returning();
    return row ? toEventPost(row) : null;
  },

  async setPrimary(id: string, creatorId: string): Promise<Event | null> {
    const [ownedEvent] = await getDb()
      .select({ id: eventPosts.id })
      .from(eventPosts)
      .where(and(eq(eventPosts.id, id), eq(eventPosts.creatorId, creatorId)))
      .limit(1);
    if (!ownedEvent) return null;

    const result = await getDb().execute(sql`
      update ${eventPosts}
      set is_primary = (id = ${id})
      where creator_id = ${creatorId}
      returning id
    `);
    if (result.rows.length === 0) return null;
    const [eventPost] = await getDb()
      .select()
      .from(eventPosts)
      .where(eq(eventPosts.id, id))
      .limit(1);
    return eventPost ? toEventPost(eventPost) : null;
  },

  async deleteOwned(id: string, creatorId: string): Promise<boolean> {
    const rows = await getDb()
      .delete(eventPosts)
      .where(and(eq(eventPosts.id, id), eq(eventPosts.creatorId, creatorId)))
      .returning({ id: eventPosts.id });
    return rows.length > 0;
  },

  async findPostCreatorId(eventPostId: string) {
    const [row] = await getDb()
      .select({ creatorId: eventPosts.creatorId })
      .from(eventPosts)
      .where(eq(eventPosts.id, eventPostId))
      .limit(1);
    return row ? { creatorId: row.creatorId } : null;
  },

  async addConnection(eventPostId: string, userId: string) {
    await getDb()
      .insert(eventConnections)
      .values({ eventPostId, userId })
      .onConflictDoNothing();
  },

  async removeConnection(eventPostId: string, userId: string) {
    await getDb()
      .delete(eventConnections)
      .where(
        and(
          eq(eventConnections.eventPostId, eventPostId),
          eq(eventConnections.userId, userId),
        ),
      );
  },

  async listConnections(eventPostId: string): Promise<EventConnection[]> {
    const rows = await getDb()
      .select({
        userId: users.id,
        name: users.name,
        telegramUsername: users.telegramUsername,
        createdAt: eventConnections.createdAt,
      })
      .from(eventConnections)
      .innerJoin(users, eq(users.id, eventConnections.userId))
      .where(eq(eventConnections.eventPostId, eventPostId))
      .orderBy(asc(eventConnections.createdAt));
    return rows.map((row) => ({
      userId: row.userId,
      name: row.name,
      telegramUsername: row.telegramUsername ?? undefined,
      createdAt: row.createdAt.toISOString(),
    }));
  },

  async findConnectedPostIds(userId: string, eventPostIds: string[]) {
    if (eventPostIds.length === 0 || !isDbConfigured()) return new Set<string>();
    const rows = await getDb()
      .select({ eventPostId: eventConnections.eventPostId })
      .from(eventConnections)
      .where(
        and(
          eq(eventConnections.userId, userId),
          inArray(eventConnections.eventPostId, eventPostIds),
        ),
      );
    return new Set(rows.map((row) => row.eventPostId));
  },

  async countConnections(eventPostIds: string[]) {
    const counts = new Map<string, number>();
    if (eventPostIds.length === 0) return counts;
    const rows = await getDb()
      .select({
        eventPostId: eventConnections.eventPostId,
        count: sql<number>`count(*)::int`,
      })
      .from(eventConnections)
      .where(inArray(eventConnections.eventPostId, eventPostIds))
      .groupBy(eventConnections.eventPostId);
    for (const row of rows) counts.set(row.eventPostId, row.count);
    return counts;
  },

  async findById(id: string): Promise<Event | null> {
    const [row] = await getDb()
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);
    if (row) return toEvent(row);

    const [eventPost] = await getDb()
      .select()
      .from(eventPosts)
      .where(eq(eventPosts.id, id))
      .limit(1);
    return eventPost ? toEventPost(eventPost) : null;
  },
};