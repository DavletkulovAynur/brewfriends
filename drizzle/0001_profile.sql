ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "profile_name" text,
  ADD COLUMN IF NOT EXISTS "status" text DEFAULT '' NOT NULL,
  ADD COLUMN IF NOT EXISTS "profile_visibility" text DEFAULT 'everyone' NOT NULL,
  ADD COLUMN IF NOT EXISTS "visible_to_user_ids" text[] DEFAULT '{}' NOT NULL;