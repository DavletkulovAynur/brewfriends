import { feedbackRepository } from "@/server/feedback/feedback.repository";

export const feedbackService = {
  submitPeopleSuggestion(userId: string, message: string) {
    return feedbackRepository.createPeopleSuggestion(userId, message);
  },
};