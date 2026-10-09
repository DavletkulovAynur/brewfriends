CREATE TABLE IF NOT EXISTS "events" (
  "id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
  "title" text NOT NULL,
  "description" text DEFAULT '' NOT NULL,
  "location" text NOT NULL,
  "starts_at" timestamp with time zone NOT NULL,
  "ends_at" timestamp with time zone,
  "image_url" text,
  "color" text DEFAULT 'amber' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "events_starts_at_idx" ON "events" ("starts_at");
