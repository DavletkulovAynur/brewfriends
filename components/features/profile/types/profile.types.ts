export type ProfileVisibility = "everyone" | "selected";

export type ProfileFormState = {
  name: string;
  status: string;
  isVisible: boolean;
};

export type ProfileUpdatePayload = {
  status: string;
  visibility: ProfileVisibility;
  visibleToUserIds: string[];
};