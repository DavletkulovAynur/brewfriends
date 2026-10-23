CREATE TABLE "event_connections" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid()::text NOT NULL,
	"event_post_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event_connections" ADD CONSTRAINT "event_connections_event_post_id_event_posts_id_fk" FOREIGN KEY ("event_post_id") REFERENCES "public"."event_posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_connections" ADD CONSTRAINT "event_connections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "event_connections_post_user_idx" ON "event_connections" USING btree ("event_post_id","user_id");
