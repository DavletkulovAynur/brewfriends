import {
  boolean,
  index,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    telegramId: text("telegram_id").notNull(),
    telegramUsername: text("telegram_username"),
    name: text("name").notNull(),
    bio: text("bio"),
    interests: text("interests").array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("users_telegram_id_idx").on(table.telegramId)],
);

export const cafes = pgTable("cafes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
});

export const presences = pgTable(
  "presences",
  {
    userId: text("user_id")
      .primaryKey()
      .references(() => users.id, { onDelete: "cascade" }),
    status: text("status", {
      enum: ["offline", "online", "in_cafe"],
    })
      .notNull()
      .default("offline"),
    isLocationShared: boolean("is_location_shared").notNull().default(false),
    cafeId: text("cafe_id").references(() => cafes.id, {
      onDelete: "set null",
    }),
    sharedUntil: timestamp("shared_until", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("presences_visible_idx").on(
      table.isLocationShared,
      table.status,
      table.sharedUntil,
    ),
  ],
);

export type DbUser = typeof users.$inferSelect;
export type DbCafe = typeof cafes.$inferSelect;
export type DbPresence = typeof presences.$inferSelect;
