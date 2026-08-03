import { eq } from "drizzle-orm";
import type { Cafe } from "@/domain/cafes/cafe.types";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { memoryStore } from "@/lib/db/memory";
import type { DbCafe } from "@/lib/db/schema";

function mapDbCafe(row: DbCafe): Cafe {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
  };
}

const SEED_CAFES: Cafe[] = [
  {
    id: "cafe_starbucks",
    name: "Starbucks",
    address: "ул. Тверская, 1",
    lat: 55.757,
    lng: 37.615,
  },
  {
    id: "cafe_double_b",
    name: "Double B",
    address: "Патриаршие пруды",
    lat: 55.763,
    lng: 37.592,
  },
  {
    id: "cafe_surf",
    name: "Surf Coffee",
    address: "ул. Покровка, 10",
    lat: 55.758,
    lng: 37.648,
  },
];

export const cafeRepository = {
  async ensureSeeded(): Promise<void> {
    if (!isDbConfigured()) return;

    const db = getDb();
    const existing = await db.select().from(schema.cafes).limit(1);
    if (existing.length > 0) return;

    await db.insert(schema.cafes).values(SEED_CAFES);
  },

  async findAll(): Promise<Cafe[]> {
    if (!isDbConfigured()) {
      return [...memoryStore.getCafes().values()];
    }

    await this.ensureSeeded();
    const rows = await getDb().select().from(schema.cafes);
    return rows.map(mapDbCafe);
  },

  async findById(id: string): Promise<Cafe | null> {
    if (!isDbConfigured()) {
      return memoryStore.getCafes().get(id) ?? null;
    }

    await this.ensureSeeded();
    const rows = await getDb()
      .select()
      .from(schema.cafes)
      .where(eq(schema.cafes.id, id))
      .limit(1);

    return rows[0] ? mapDbCafe(rows[0]) : null;
  },
};
