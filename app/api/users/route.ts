import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { userService } from "@/server/users/user.service";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await userService.list();
  return NextResponse.json(
    users
      .filter((user) => user.id !== session.userId)
      .map(({ id, name }) => ({ id, name })),
  );
}
