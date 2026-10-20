import { NextResponse } from "next/server";
import {
  isAdminConfigured,
  setAdminSession,
  verifyAdminCredentials,
} from "@/server/admin/admin-auth";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured" },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    username?: unknown;
    password?: unknown;
  } | null;

  if (
    typeof body?.username !== "string" ||
    typeof body.password !== "string" ||
    body.username.length > 128 ||
    body.password.length > 1024
  ) {
    return NextResponse.json({ error: "Invalid login" }, { status: 400 });
  }

  if (!verifyAdminCredentials(body.username, body.password)) {
    return NextResponse.json(
      { error: "Неверный логин или пароль" },
      { status: 401 },
    );
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}