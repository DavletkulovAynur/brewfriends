import { beforeEach, describe, expect, it, vi } from "vitest";
import { profileService } from "./profile.service";
import { userRepository } from "@/server/users/user.repository";
import { eventRepository } from "@/server/events/event.repository";
import { interestsService } from "@/server/profile/interests.service";
import type { User } from "@/domain/users/user.types";
import type { Event } from "@/domain/events/event.types";

vi.mock("@/domain/users/profile.logic", async () => import("../../domain/users/profile.logic"));
vi.mock("@/server/users/user.repository", () => ({
  userRepository: { findAll: vi.fn() },
}));
vi.mock("@/server/events/event.repository", () => ({
  eventRepository: {
    findPrimaryByCreatorIds: vi.fn(),
    findConnectedPostIds: vi.fn(),
    findConnectionsByPostIds: vi.fn(),
  },
}));
vi.mock("@/server/profile/interests.service", () => ({
  interestsService: { listByUsers: vi.fn() },
}));

const users: User[] = [
  { id: "host", name: "Host", status: "Hosting", visibility: "everyone", visibleToUserIds: [], interests: [] },
  { id: "public", name: "Public", status: "", visibility: "everyone", visibleToUserIds: [], interests: [], avatarUrl: "public.jpg" },
  { id: "private", name: "Private", status: "", visibility: "selected", visibleToUserIds: ["viewer"], interests: [] },
  { id: "hidden", name: "Hidden", status: "", visibility: "selected", visibleToUserIds: [], interests: [] },
  { id: "viewer", name: "Viewer", status: "", visibility: "selected", visibleToUserIds: [], interests: [] },
  { id: "not-connected", name: "Not connected", status: "", visibility: "everyone", visibleToUserIds: [], interests: [] },
];

const event: Event = {
  id: "event", title: "Event", description: "Event", location: "", startsAt: null,
  endsAt: null, imageUrl: null, videoUrl: null, color: "amber",
};

describe("listSuggestedProfiles event participants", () => {
  beforeEach(() => {
    vi.mocked(userRepository.findAll).mockResolvedValue(users);
    vi.mocked(eventRepository.findPrimaryByCreatorIds).mockResolvedValue(new Map([["host", event]]));
    vi.mocked(eventRepository.findConnectedPostIds).mockResolvedValue(new Set(["event"]));
    vi.mocked(eventRepository.findConnectionsByPostIds).mockResolvedValue(
      ["public", "private", "hidden", "viewer"].map((userId) => ({ eventPostId: "event", userId })),
    );
    vi.mocked(interestsService.listByUsers).mockResolvedValue([]);
  });

  it("includes only visible connections and the viewer's own connection", async () => {
    const profiles = await profileService.listSuggestedProfiles("viewer");
    const primaryEvent = profiles.find((profile) => profile.id === "host")?.primaryEvent;

    expect(primaryEvent?.isConnected).toBe(true);
    expect(primaryEvent?.participants).toEqual([
      { id: "public", name: "Public", avatarUrl: "public.jpg" },
      { id: "private", name: "Private", avatarUrl: undefined },
      { id: "viewer", name: "Viewer", avatarUrl: undefined },
    ]);
  });

  it("shows anonymous visitors only public connections", async () => {
    const profiles = await profileService.listSuggestedProfiles();
    const primaryEvent = profiles.find((profile) => profile.id === "host")?.primaryEvent;

    expect(primaryEvent?.isConnected).toBe(false);
    expect(primaryEvent?.participants).toEqual([
      { id: "public", name: "Public", avatarUrl: "public.jpg" },
    ]);
  });
});