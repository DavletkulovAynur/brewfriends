import { eq } from "drizzle-orm";
import type { PresenceStatus, UserPresence } from "@/domain/presence/presence.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory";
import type { DbPresence } from "@/lib/db/schema";

function toIso(value: Date | null | undefined): string | undefined {
  return value ? value.toISOString() : undefined;
}

function mapDbPresence(row: DbPresence): UserPresence {
  return {
    userId: row.userId,
    status: row.status as PresenceStatus,
    isLocationShared: row.isLocationShared,
    cafeId: row.cafeId ?? undefined,
    sharedUntil: toIso(row.sharedUntil),
  };
}

export type UpsertPresenceInput = {
  userId: string;
  status: PresenceStatus;
  isLocationShared: boolean;
  cafeId: string | null;
  sharedUntil: Date | null;
};

export const presenceRepository = {
  async findByUserId(userId: string): Promise<UserPresence | null> {
    if (!isDbConfigured()) {
      return memoryStore.getPresences().get(userId) ?? null;
    }

    const rows = await getDb()
      .select()
      .from(schema.presences)
      .where(eq(schema.presences.userId, userId))
      .limit(1);

    return rows[0] ? mapDbPresence(rows[0]) : null;
  },

  async findAll(): Promise<UserPresence[]> {
    if (!isDbConfigured()) {
      return [...memoryStore.getPresences().values()];
    }

    const rows = await getDb().select().from(schema.presences);
    return rows.map(mapDbPresence);
  },

  async upsert(input: UpsertPresenceInput): Promise<UserPresence> {
    const presence: UserPresence = {
      userId: input.userId,
      status: input.status,
      isLocationShared: input.isLocationShared,
      cafeId: input.cafeId ?? undefined,
      sharedUntil: toIso(input.sharedUntil),
    };

    if (!isDbConfigured()) {
      memoryStore.getPresences().set(input.userId, presence);
      return presence;
    }

    const db = getDb();
    const [row] = await db
      .insert(schema.presences)
      .values({
        userId: input.userId,
        status: input.status,
        isLocationShared: input.isLocationShared,
        cafeId: input.cafeId,
        sharedUntil: input.sharedUntil,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.presences.userId,
        set: {
          status: input.status,
          isLocationShared: input.isLocationShared,
          cafeId: input.cafeId,
          sharedUntil: input.sharedUntil,
          updatedAt: new Date(),
        },
      })
      .returning();

    return mapDbPresence(row);
  },

  async hide(userId: string): Promise<UserPresence> {
    return this.upsert({
      userId,
      status: "offline",
      isLocationShared: false,
      cafeId: null,
      sharedUntil: null,
    });
  },
};
