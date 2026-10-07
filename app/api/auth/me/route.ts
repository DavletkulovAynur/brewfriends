import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { userService } from "@/server/users/user.service";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const user = await userService.getById(session.userId);
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}

