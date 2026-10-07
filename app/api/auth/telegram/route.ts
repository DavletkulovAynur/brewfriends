import { NextResponse } from "next/server";
import {
  authService,
  isDevAuthBypassEnabled,
} from "@/server/auth/auth.service";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      initData?: string;
      devBypass?: boolean;
    };

    if (body.devBypass) {
      if (!isDevAuthBypassEnabled()) {
        return NextResponse.json(
          { error: "Dev auth bypass is disabled" },
          { status: 403 },
        );
      }
      const user = await authService.loginWithDevBypass();
      return NextResponse.json({ user });
    }

    if (!body.initData) {
      return NextResponse.json(
        { error: "initData is required" },
        { status: 400 },
      );
    }

    const user = await authService.loginWithTelegramInitData(body.initData);
    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
