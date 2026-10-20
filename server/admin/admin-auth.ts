import { createHash, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "bf_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSessionKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET must be set (min 32 chars)");
    }
    return new TextEncoder().encode("dev-only-session-secret");
  }
  return new TextEncoder().encode(secret);
}

function hashValue(value: string) {
  return scryptSync(value, process.env.ADMIN_PASSWORD_SALT ?? "", 64);
}

function safeStringEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD_SALT &&
      /^[a-f\d]{128}$/i.test(process.env.ADMIN_PASSWORD_HASH ?? ""),
  );
}

export function verifyAdminCredentials(username: string, password: string) {
  if (!isAdminConfigured()) return false;

  const configuredUsername = process.env.ADMIN_USERNAME ?? "";
  const usernameMatches = safeStringEqual(username, configuredUsername);
  const candidateHash = hashValue(password);
  const expectedHash = Buffer.from(process.env.ADMIN_PASSWORD_HASH!, "hex");
  const passwordMatches = timingSafeEqual(candidateHash, expectedHash);

  return usernameMatches && passwordMatches;
}

export async function setAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSessionKey());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function hasAdminSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getSessionKey());
    return payload.sub === "admin" && payload.role === "admin";
  } catch {
    return false;
  }
}