import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { presenceService } from "@/server/services/presence.service";

export async function GET() {
  const session = await getSession();
  const people = await presenceService.listVisibleStories(session?.userId);
  return NextResponse.json({ people });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      isAvailable?: boolean;
      cafeId?: string | null;
    };

    if (typeof body.isAvailable !== "boolean") {
      return NextResponse.json(
        { error: "isAvailable is required" },
        { status: 400 },
      );
    }

    const presence = await presenceService.save(session.userId, {
      isAvailable: body.isAvailable,
      cafeId: body.cafeId ?? null,
    });

    return NextResponse.json({ presence });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save presence";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const presence = await presenceService.hide(session.userId);
  return NextResponse.json({ presence });
}
