import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { eventService } from "@/server/events/event.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = await eventService.getById(id);
  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ event });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const input = body as { description?: unknown; startsAt?: unknown };
  if (
    typeof input.description !== "string" ||
    input.description.trim().length === 0 ||
    input.description.trim().length > 500
  ) {
    return NextResponse.json({ error: "Введите описание до 500 символов" }, { status: 400 });
  }

  let startsAt: string | null = null;
  if (input.startsAt !== null && input.startsAt !== "") {
    if (typeof input.startsAt !== "string") {
      return NextResponse.json({ error: "Некорректная дата встречи" }, { status: 400 });
    }
    const date = new Date(input.startsAt);
    if (Number.isNaN(date.getTime())) {
      return NextResponse.json({ error: "Некорректная дата встречи" }, { status: 400 });
    }
    startsAt = date.toISOString();
  }

  const { id } = await params;
  const event = await eventService.updateOwned(id, session.userId, {
    description: input.description.trim(),
    startsAt,
  });
  if (!event) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ event });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await eventService.deleteOwned(id, session.userId);
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
