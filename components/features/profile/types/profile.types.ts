export type ProfileVisibility = "everyone" | "selected";
import type { MeetupIntent } from "@/domain/users/meetup-intent";

export type ProfileFormState = {
  name: string;
  status: string;
  isVisible: boolean;
  meetupIntent: MeetupIntent;
};

export type ProfileUpdatePayload = {
  status: string;
  visibility: ProfileVisibility;
  visibleToUserIds: string[];
  meetupIntent: MeetupIntent;
};