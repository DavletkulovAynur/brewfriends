import { asc, eq, sql } from "drizzle-orm";
import type { CreateEventInput, Event } from "@/domain/events/event.types";
import { getDb, schema } from "@/lib/db";

const { events } = schema;

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
  };
}

export const eventRepository = {
  async create(creatorId: string, input: CreateEventInput): Promise<Event> {
    const [row] = await getDb()
      .insert(events)
      .values({
        title: input.description,
        description: input.description,
        location: "Место пока не указано",
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
        creatorId,
      })
      .returning();

    return toEvent(row);
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

  async findById(id: string): Promise<Event | null> {
    const [row] = await getDb()
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);
    return row ? toEvent(row) : null;
  },
};