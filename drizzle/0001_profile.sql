ALTER TABLE "users"
  ADD COLUMN "profile_name" text,
  ADD COLUMN "status" text DEFAULT '' NOT NULL,
  ADD COLUMN "profile_visibility" text DEFAULT 'everyone' NOT NULL,
  ADD COLUMN "visible_to_user_ids" text[] DEFAULT '{}' NOT NULL;

DROP TABLE IF EXISTS "presences";
DROP TABLE IF EXISTS "cafes";