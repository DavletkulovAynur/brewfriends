import {
  pgTable,
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
    profileName: text("profile_name"),
    status: text("status").notNull().default(""),
    profileVisibility: text("profile_visibility", {
      enum: ["everyone", "selected"],
    })
      .notNull()
      .default("everyone"),
    visibleToUserIds: text("visible_to_user_ids").array().notNull().default([]),
    bio: text("bio"),
    interests: text("interests").array().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("users_telegram_id_idx").on(table.telegramId)],
);

export type DbUser = typeof users.$inferSelect;
