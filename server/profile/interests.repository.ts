import { and, asc, eq, inArray } from "drizzle-orm";
import type { InterestParticipation, UserInterest } from "@/domain/users/profile.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory";
import type { DbUserInterest } from "@/lib/db/schema";

function mapInterest(row: DbUserInterest): UserInterest {
  return {
    id: row.id,
    userId: row.userId,
    activity: row.activity,
    description: row.description,
    participation: row.participation,
    createdAt: row.createdAt.toISOString(),
  };
}

export const interestsRepository = {
  async listByUser(userId: string): Promise<UserInterest[]> {
    if (!isDbConfigured()) {
      return [...memoryStore.getInterests().values()]
        .filter((interest) => interest.userId === userId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    const rows = await getDb()
      .select()
      .from(schema.userInterests)
      .where(eq(schema.userInterests.userId, userId))
      .orderBy(asc(schema.userInterests.createdAt));
    return rows.map(mapInterest);
  },

  async listByUsers(userIds: string[]): Promise<UserInterest[]> {
    if (userIds.length === 0) return [];
    if (!isDbConfigured()) {
      const ids = new Set(userIds);
      return [...memoryStore.getInterests().values()]
        .filter((interest) => ids.has(interest.userId));
    }

    const rows = await getDb()
      .select()
      .from(schema.userInterests)
      .where(inArray(schema.userInterests.userId, userIds))
      .orderBy(asc(schema.userInterests.createdAt));
    return rows.map(mapInterest);
  },

  async create(
    userId: string,
    activity: string,
    description: string | null,
    participation: InterestParticipation,
  ): Promise<UserInterest> {
    if (!isDbConfigured()) {
      const interest: UserInterest = {
        id: crypto.randomUUID(),
        userId,
        activity,
        description,
        participation,
        createdAt: new Date().toISOString(),
      };
      memoryStore.getInterests().set(interest.id, interest);
      return interest;
    }

    const [row] = await getDb()
      .insert(schema.userInterests)
      .values({ userId, activity, description, participation })
      .returning();
    return mapInterest(row);
  },

  async deleteOwned(id: string, userId: string): Promise<boolean> {
    if (!isDbConfigured()) {
      const interest = memoryStore.getInterests().get(id);
      if (!interest || interest.userId !== userId) return false;
      return memoryStore.getInterests().delete(id);
    }

    const rows = await getDb()
      .delete(schema.userInterests)
      .where(and(eq(schema.userInterests.id, id), eq(schema.userInterests.userId, userId)))
      .returning({ id: schema.userInterests.id });
    return rows.length > 0;
  },
};