import { describe, expect, it } from "vitest";
import type { User } from "@/domain/users/user.types";
import {
  toProfileFormState,
  toProfileUpdatePayload,
} from "./profile-form-state";

describe("profile form state", () => {
  it("treats a selected audience as not visible in the toggle", () => {
    const user: User = {
      id: "user-1",
      name: "Aynur",
      status: "Coffee",
      visibility: "selected",
      visibleToUserIds: ["user-2"],
      interests: [],
      meetupIntent: "series_chat",
    };

    expect(toProfileFormState(user).isVisible).toBe(false);
    expect(toProfileFormState(user).meetupIntent).toBe("series_chat");
  });

  it("hides the profile from everyone when the toggle is off", () => {
    expect(
      toProfileUpdatePayload({
        name: "Aynur",
        status: "Coffee",
        isVisible: false,
        meetupIntent: "series_chat",
      }),
    ).toEqual({
      status: "Coffee",
      visibility: "selected",
      visibleToUserIds: [],
      meetupIntent: "series_chat",
    });
  });

  it("makes the profile visible to everyone when the toggle is on", () => {
    expect(
      toProfileUpdatePayload({
        name: "Aynur",
        status: "Coffee",
        isVisible: true,
        meetupIntent: "coffee_chat",
      }),
    ).toEqual({
      status: "Coffee",
      visibility: "everyone",
      visibleToUserIds: [],
      meetupIntent: "coffee_chat",
    });
  });
});