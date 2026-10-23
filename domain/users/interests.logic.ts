import {
  INTEREST_PARTICIPATIONS,
  type InterestParticipation,
} from "./profile.types";

export type CreateInterestInput = {
  activity: string;
  description: string | null;
  participation: InterestParticipation;
};

export function parseCreateInterestInput(value: unknown): CreateInterestInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const input = value as Record<string, unknown>;
  const activity = typeof input.activity === "string" ? input.activity.trim() : "";
  const rawDescription = typeof input.description === "string" ? input.description.trim() : "";
  const participation = input.participation;

  if (
    activity.length === 0 ||
    activity.length > 100 ||
    rawDescription.length > 100 ||
    typeof participation !== "string" ||
    !INTEREST_PARTICIPATIONS.includes(participation as InterestParticipation)
  ) {
    return null;
  }

  return {
    activity,
    description: rawDescription || null,
    participation: participation as InterestParticipation,
  };
}