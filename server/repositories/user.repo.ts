import { eq } from "drizzle-orm";
import type { User } from "@/domain/users/user.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory";
import type { DbUser } from "@/lib/db/schema";

function mapDbUser(row: DbUser): User {
  return {
    id: row.id,
    name: row.name,
    bio: row.bio ?? undefined,
    interests: row.interests ?? [],
    telegramUsername: row.telegramUsername ?? undefined,
    telegramId: row.telegramId,
  };
}

export type UpsertTelegramUserInput = {
  telegramId: string;
  name: string;
  telegramUsername?: string;
};

export const userRepository = {
  async findAll(): Promise<User[]> {
    if (!isDbConfigured()) {
      return [...memoryStore.getUsers().values()];
    }

    const rows = await getDb().select().from(schema.users);
    return rows.map(mapDbUser);
  },

  async findById(id: string): Promise<User | null> {
    if (!isDbConfigured()) {
      return memoryStore.getUsers().get(id) ?? null;
    }

    const rows = await getDb()
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id))
      .limit(1);

    return rows[0] ? mapDbUser(rows[0]) : null;
  },

  async findByTelegramId(telegramId: string): Promise<User | null> {
    if (!isDbConfigured()) {
      const id = memoryStore.getUsersByTelegramId().get(telegramId);
      if (!id) return null;
      return memoryStore.getUsers().get(id) ?? null;
    }

    const rows = await getDb()
      .select()
      .from(schema.users)
      .where(eq(schema.users.telegramId, telegramId))
      .limit(1);

    return rows[0] ? mapDbUser(rows[0]) : null;
  },

  async upsertFromTelegram(input: UpsertTelegramUserInput): Promise<User> {
    if (!isDbConfigured()) {
      const existingId = memoryStore
        .getUsersByTelegramId()
        .get(input.telegramId);
      const existing = existingId
        ? memoryStore.getUsers().get(existingId)
        : undefined;

      const user: User = {
        id: existing?.id ?? crypto.randomUUID(),
        name: input.name,
        bio: existing?.bio,
        interests: existing?.interests ?? [],
        telegramUsername: input.telegramUsername,
        telegramId: input.telegramId,
      };

      memoryStore.getUsers().set(user.id, user);
      memoryStore.getUsersByTelegramId().set(input.telegramId, user.id);
      return user;
    }

    const db = getDb();
    const existing = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.telegramId, input.telegramId))
      .limit(1);

    if (existing[0]) {
      const [updated] = await db
        .update(schema.users)
        .set({
          name: input.name,
          telegramUsername: input.telegramUsername ?? null,
        })
        .where(eq(schema.users.id, existing[0].id))
        .returning();

      return mapDbUser(updated);
    }

    const [created] = await db
      .insert(schema.users)
      .values({
        id: crypto.randomUUID(),
        telegramId: input.telegramId,
        name: input.name,
        telegramUsername: input.telegramUsername ?? null,
        interests: [],
      })
      .returning();

    return mapDbUser(created);
  },
};
