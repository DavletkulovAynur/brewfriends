ALTER TABLE "events" ALTER COLUMN "starts_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "creator_id" text;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;