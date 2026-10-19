import { and, asc, eq, inArray, sql } from "drizzle-orm";
import type { CreateEventInput, Event } from "@/domain/events/event.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";

const { eventPosts, events } = schema;

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
    const [eventRows, eventPostRows] = await Promise.all([
      getDb()
        .select()
        .from(events)
        .where(
          sql`${events.startsAt} is null or coalesce(${events.endsAt}, ${events.startsAt}) >= now()`,
        )
        .orderBy(asc(events.startsAt)),
      getDb()
        .select()
        .from(eventPosts)
        .where(
          sql`${eventPosts.startsAt} is null or ${eventPosts.startsAt} >= now()`,
        )
        .orderBy(asc(eventPosts.startsAt)),
    ]);
    return [...eventRows.map(toEvent), ...eventPostRows.map(toEventPost)].sort(
      (left, right) => {
        if (!left.startsAt) return right.startsAt ? 1 : 0;
        if (!right.startsAt) return -1;
        return left.startsAt.localeCompare(right.startsAt);
      },
    );
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