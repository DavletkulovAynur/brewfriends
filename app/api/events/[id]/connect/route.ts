import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { eventService } from "@/server/events/event.service";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(_request: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const result = await eventService.connect(id, session.userId);
  if (result === "not_found") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (result === "own_event") {
    return NextResponse.json(
      { error: "Нельзя откликнуться на свою встречу" },
      { status: 400 },
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await eventService.disconnect(id, session.userId);
  return NextResponse.json({ ok: true });
}
