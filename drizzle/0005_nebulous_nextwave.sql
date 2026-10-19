CREATE TABLE "event_posts" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"description" text NOT NULL,
	"starts_at" timestamp with time zone,
	"creator_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "event_posts" ("id", "description", "starts_at", "creator_id", "created_at")
SELECT "id", "description", "starts_at", "creator_id", "created_at"
FROM "events"
WHERE "creator_id" IS NOT NULL;
--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_creator_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "event_posts" ADD CONSTRAINT "event_posts_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" DROP COLUMN "creator_id";