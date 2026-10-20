import { scryptSync } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isAdminConfigured, verifyAdminCredentials } from "./admin-auth";

const password = "correct-horse-battery-staple";
const salt = "a1b2c3d4e5f607182930aabbccddeeff";

describe("admin credentials", () => {
  beforeEach(() => {
    vi.stubEnv("ADMIN_USERNAME", "operator");
    vi.stubEnv("ADMIN_PASSWORD_SALT", salt);
    vi.stubEnv(
      "ADMIN_PASSWORD_HASH",
      scryptSync(password, salt, 64).toString("hex"),
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("accepts only the configured credentials", () => {
    expect(isAdminConfigured()).toBe(true);
    expect(verifyAdminCredentials("operator", password)).toBe(true);
    expect(verifyAdminCredentials("another-user", password)).toBe(false);
    expect(verifyAdminCredentials("operator", "wrong-password")).toBe(false);
  });

  it("rejects login when the password hash is missing", () => {
    vi.stubEnv("ADMIN_PASSWORD_HASH", "");

    expect(isAdminConfigured()).toBe(false);
    expect(verifyAdminCredentials("operator", password)).toBe(false);
  });
});