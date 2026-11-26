import { getDb, schema } from "@/lib/db";

const { peopleSuggestions } = schema;

export const feedbackRepository = {
  async createPeopleSuggestion(userId: string, message: string) {
    await getDb().insert(peopleSuggestions).values({ userId, message });
  },
};