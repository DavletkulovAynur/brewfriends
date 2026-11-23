ALTER TABLE "users" RENAME COLUMN "profile_color" TO "meetup_intent";
UPDATE "users" SET "meetup_intent" = 'just_browsing';