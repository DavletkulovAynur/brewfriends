ALTER TABLE "event_posts" ADD COLUMN "title" text;
--> statement-breakpoint
UPDATE "event_posts"
SET "title" = left(btrim("description"), 100);
--> statement-breakpoint
ALTER TABLE "event_posts" ALTER COLUMN "title" SET NOT NULL;