CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY NOT NULL,
  "telegram_id" text NOT NULL,
  "telegram_username" text,
  "name" text NOT NULL,
  "bio" text,
  "interests" text[] DEFAULT '{}' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "users_telegram_id_idx" ON "users" ("telegram_id");

CREATE TABLE IF NOT EXISTS "cafes" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "address" text NOT NULL,
  "lat" real NOT NULL,
  "lng" real NOT NULL
);

CREATE TABLE IF NOT EXISTS "presences" (
  "user_id" text PRIMARY KEY NOT NULL,
  "status" text DEFAULT 'offline' NOT NULL,
  "is_location_shared" boolean DEFAULT false NOT NULL,
  "cafe_id" text,
  "shared_until" timestamp with time zone,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
  ALTER TABLE "presences" ADD CONSTRAINT "presences_user_id_users_id_fk"
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "presences" ADD CONSTRAINT "presences_cafe_id_cafes_id_fk"
    FOREIGN KEY ("cafe_id") REFERENCES "public"."cafes"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "presences_visible_idx"
  ON "presences" ("is_location_shared", "status", "shared_until");
