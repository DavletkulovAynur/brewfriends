import { sql } from "drizzle-orm";
import {
  boolean,
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

export const events = pgTable("events", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  location: text("location").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  color: text("color", { enum: ["amber", "sky", "rose"] })
    .notNull()
    .default("amber"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type DbEvent = typeof events.$inferSelect;

export const eventPosts = pgTable("event_posts", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`),
  description: text("description").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }),
  isPrimary: boolean("is_primary").notNull().default(false),
  creatorId: text("creator_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type DbEventPost = typeof eventPosts.$inferSelect;

export const eventConnections = pgTable(
  "event_connections",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()::text`),
    eventPostId: text("event_post_id")
      .notNull()
      .references(() => eventPosts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("event_connections_post_user_idx").on(
      table.eventPostId,
      table.userId,
    ),
  ],
);

export const userInterests = pgTable("user_interests", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()::text`),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  activity: text("activity").notNull(),
  description: text("description"),
  participation: text("participation", {
    enum: ["looking_for_company", "looking_for_teacher", "want_to_try", "can_teach"],
  })
    .notNull()
    .default("looking_for_company"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type DbUserInterest = typeof userInterests.$inferSelect;

export const cafes = pgTable("cafes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
});

export type DbCafe = typeof cafes.$inferSelect;
