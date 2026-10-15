ALTER TABLE "events" ADD COLUMN "video_url" text;
UPDATE "events" SET "video_url" = '/events/test.mp4' WHERE "id" = 'seed-3';