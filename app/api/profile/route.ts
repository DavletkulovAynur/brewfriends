import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { userService } from "@/server/services/user.service";
import { profileService } from "@/server/services/profile.service";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user, candidates] = await Promise.all([
    userService.getById(session.userId),
    profileService.listVisibilityCandidates(session.userId),
  ]);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user, candidates });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      name?: unknown;
      status?: unknown;
      visibility?: unknown;
      visibleToUserIds?: unknown;
    };

    if (
      typeof body.name !== "string" ||
      body.name.trim().length === 0 ||
      body.name.trim().length > 40 ||
      typeof body.status !== "string" ||
      body.status.trim().length > 60 ||
      (body.visibility !== "everyone" && body.visibility !== "selected") ||
      !Array.isArray(body.visibleToUserIds) ||
      body.visibleToUserIds.length > 50 ||
      !body.visibleToUserIds.every((id) => typeof id === "string")
    ) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 400 });
    }

    const user = await profileService.update(session.userId, {
      name: body.name.trim(),
      status: body.status.trim(),
      visibility: body.visibility,
      visibleToUserIds: body.visibleToUserIds,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}