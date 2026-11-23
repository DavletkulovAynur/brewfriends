import { describe, expect, it } from "vitest";
import {
  DEFAULT_MEETUP_INTENT,
  isMeetupIntent,
  MEETUP_INTENTS,
  MEETUP_INTENT_EMOJIS,
  MEETUP_INTENT_LABELS,
} from "./meetup-intent";

describe("meetup intents", () => {
  it("defines six labeled intents and a neutral default", () => {
    expect(MEETUP_INTENTS).toHaveLength(6);
    expect(Object.keys(MEETUP_INTENT_LABELS)).toHaveLength(6);
    expect(Object.keys(MEETUP_INTENT_EMOJIS)).toHaveLength(6);
    expect(DEFAULT_MEETUP_INTENT).toBe("just_browsing");
  });

  it("rejects values outside the supported intent list", () => {
    expect(isMeetupIntent("coffee_chat")).toBe(true);
    expect(isMeetupIntent("event_companion")).toBe(false);
    expect(isMeetupIntent("#fff")).toBe(false);
  });
});