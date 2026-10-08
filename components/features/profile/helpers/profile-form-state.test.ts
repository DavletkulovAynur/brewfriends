import { describe, expect, it } from "vitest";
import type { User } from "@/domain/users/user.types";
import {
  toProfileFormState,
  toProfileUpdatePayload,
} from "./profile-form-state";

describe("profile form visibility", () => {
  it("treats a selected audience as not visible in the toggle", () => {
    const user: User = {
      id: "user-1",
      name: "Aynur",
      status: "Coffee",
      visibility: "selected",
      visibleToUserIds: ["user-2"],
      interests: [],
    };

    expect(toProfileFormState(user).isVisible).toBe(false);
  });

  it("hides the profile from everyone when the toggle is off", () => {
    expect(
      toProfileUpdatePayload({
        name: "Aynur",
        status: "Coffee",
        isVisible: false,
      }),
    ).toEqual({
      name: "Aynur",
      status: "Coffee",
      visibility: "selected",
      visibleToUserIds: [],
    });
  });

  it("makes the profile visible to everyone when the toggle is on", () => {
    expect(
      toProfileUpdatePayload({
        name: "Aynur",
        status: "Coffee",
        isVisible: true,
      }),
    ).toEqual({
      name: "Aynur",
      status: "Coffee",
      visibility: "everyone",
      visibleToUserIds: [],
    });
  });
});