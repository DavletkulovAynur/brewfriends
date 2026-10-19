import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { eventService } from "@/server/events/event.service";

export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const event = await eventService.setPrimary(id, session.userId);
  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ event });
}