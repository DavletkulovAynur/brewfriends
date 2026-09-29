import { describe, expect, it } from "vitest";
import { formatEventDateLabel } from "./event.logic";

describe("formatEventDateLabel", () => {
  const now = new Date(2026, 8, 29, 12);

  it("labels an event today", () => {
    expect(formatEventDateLabel("2026-09-29", now)).toBe("Сегодня");
  });

  it("labels an event tomorrow", () => {
    expect(formatEventDateLabel("2026-09-30", now)).toBe("Завтра");
  });
});