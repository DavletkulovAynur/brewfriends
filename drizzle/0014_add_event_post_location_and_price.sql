ALTER TABLE "event_posts" ADD COLUMN "location" text DEFAULT 'Место пока не указано' NOT NULL;--> statement-breakpoint
ALTER TABLE "event_posts" ADD COLUMN "price_type" text DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "event_posts" ADD COLUMN "price_amount" integer;