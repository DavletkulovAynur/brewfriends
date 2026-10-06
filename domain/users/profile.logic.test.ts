import { describe, expect, it } from "vitest";
import { canViewProfile } from "./profile.logic";

describe("canViewProfile", () => {
  it("shows public profiles to everyone", () => {
    expect(
      canViewProfile({ visibility: "everyone", visibleToUserIds: [] }),
    ).toBe(true);
  });

  it("shows selected profiles only to listed viewers", () => {
    const profile = {
      visibility: "selected" as const,
      visibleToUserIds: ["viewer-1"],
    };

    expect(canViewProfile(profile, "viewer-1")).toBe(true);
    expect(canViewProfile(profile, "viewer-2")).toBe(false);
    expect(canViewProfile(profile)).toBe(false);
  });
});