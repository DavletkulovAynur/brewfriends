import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { eventService } from "@/server/events/event.service";

export async function GET() {
  const events = await eventService.list();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  if (
    !requestBody ||
    typeof requestBody !== "object" ||
    Array.isArray(requestBody)
  ) {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const body = requestBody as { description?: unknown; startsAt?: unknown };
  if (
    typeof body.description !== "string" ||
    body.description.trim().length === 0 ||
    body.description.trim().length > 500
  ) {
    return NextResponse.json({ error: "Введите описание до 500 символов" }, { status: 400 });
  }

  let startsAt: string | null = null;
  if (body.startsAt !== undefined && body.startsAt !== null && body.startsAt !== "") {
    if (typeof body.startsAt !== "string") {
      return NextResponse.json({ error: "Некорректная дата встречи" }, { status: 400 });
    }
    const date = new Date(body.startsAt);
    if (Number.isNaN(date.getTime()) || date.getTime() <= Date.now()) {
      return NextResponse.json({ error: "Укажите будущую дату встречи" }, { status: 400 });
    }
    startsAt = date.toISOString();
  }

  try {
    const event = await eventService.create(session.userId, {
      description: body.description.trim(),
      startsAt,
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Не удалось создать встречу" }, { status: 500 });
  }
}
