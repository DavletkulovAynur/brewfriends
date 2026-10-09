import { asc, eq, sql } from "drizzle-orm";
import type { Event } from "@/domain/events/event.types";
import { getDb, schema } from "@/lib/db";

const { events } = schema;

function toEvent(row: typeof events.$inferSelect): Event {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    startsAt: row.startsAt.toISOString(),
    endsAt: row.endsAt?.toISOString() ?? null,
    imageUrl: row.imageUrl,
    color: row.color,
  };
}

export const eventRepository = {
  // Upcoming and ongoing events only.
  async findUpcoming(): Promise<Event[]> {
    const rows = await getDb()
      .select()
      .from(events)
      .where(sql`coalesce(${events.endsAt}, ${events.startsAt}) >= now()`)
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