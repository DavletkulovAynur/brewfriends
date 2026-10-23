import { describe, expect, it } from "vitest";
import { parseCreateInterestInput } from "../../domain/users/interests.logic";

describe("parseCreateInterestInput", () => {
  it("trims interest text and accepts a supported participation", () => {
    expect(parseCreateInterestInput({
      activity: "  Сходить на выставку  ",
      description: "  Ищу компанию на выходные  ",
      participation: "looking_for_company",
    })).toEqual({
      activity: "Сходить на выставку",
      description: "Ищу компанию на выходные",
      participation: "looking_for_company",
    });
  });

  it("allows an omitted description and rejects empty or oversized activity", () => {
    expect(parseCreateInterestInput({ activity: "Теннис", participation: "looking_for_teacher" })).toEqual({
      activity: "Теннис",
      description: null,
      participation: "looking_for_teacher",
    });
    expect(parseCreateInterestInput({ activity: "  ", participation: "want_to_try" })).toBeNull();
    expect(parseCreateInterestInput({ activity: "a".repeat(101), participation: "want_to_try" })).toBeNull();
    expect(parseCreateInterestInput({ activity: "Теннис", description: "a".repeat(101), participation: "can_teach" })).toBeNull();
  });

  it("rejects unsupported participation values and malformed input", () => {
    expect(parseCreateInterestInput({ activity: "Теннис", participation: "admin" })).toBeNull();
    expect(parseCreateInterestInput(null)).toBeNull();
  });
});