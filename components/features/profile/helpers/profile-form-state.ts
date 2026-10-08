import type { ProfileFormState } from "../types/profile.types";
import type { User } from "@/domain/users/user.types";
import type { ProfileUpdatePayload } from "../types/profile.types";

export function toProfileFormState(user: User): ProfileFormState {
  return {
    name: user.name,
    status: user.status,
    isVisible: user.visibility === "everyone",
  };
}

export function toProfileUpdatePayload(
  form: ProfileFormState,
): ProfileUpdatePayload {
  return {
    name: form.name,
    status: form.status,
    visibility: form.isVisible ? "everyone" : "selected",
    visibleToUserIds: [],
  };
}