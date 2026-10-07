import { createHmac, timingSafeEqual } from "node:crypto";
import type {
  TelegramWebAppUser,
  ValidatedInitData,
} from "@/server/auth/auth.types";

function buildDataCheckString(params: URLSearchParams): string {
  return [...params.entries()]
    .filter(([key]) => key !== "hash")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
}

export function validateTelegramInitData(
  initData: string,
  botToken: string,
  maxAgeSeconds = 60 * 60 * 24,
): ValidatedInitData {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) {
    throw new Error("Missing hash in initData");
  }

  const dataCheckString = buildDataCheckString(params);
  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  const hashBuffer = Buffer.from(hash, "hex");
  const calculatedBuffer = Buffer.from(calculatedHash, "hex");

  if (
    hashBuffer.length !== calculatedBuffer.length ||
    !timingSafeEqual(hashBuffer, calculatedBuffer)
  ) {
    throw new Error("Invalid initData signature");
  }

  const authDateRaw = params.get("auth_date");
  if (!authDateRaw) {
    throw new Error("Missing auth_date in initData");
  }

  const authDate = Number(authDateRaw);
  if (!Number.isFinite(authDate)) {
    throw new Error("Invalid auth_date in initData");
  }

  const ageSeconds = Math.floor(Date.now() / 1000) - authDate;
  if (ageSeconds > maxAgeSeconds) {
    throw new Error("initData expired");
  }

  const userRaw = params.get("user");
  if (!userRaw) {
    throw new Error("Missing user in initData");
  }

  const user = JSON.parse(userRaw) as TelegramWebAppUser;
  if (!user?.id || !user.first_name) {
    throw new Error("Invalid user payload in initData");
  }

  return {
    user,
    authDate,
    queryId: params.get("query_id") ?? undefined,
  };
}

export function displayNameFromTelegramUser(user: TelegramWebAppUser): string {
  return [user.first_name, user.last_name].filter(Boolean).join(" ");
}