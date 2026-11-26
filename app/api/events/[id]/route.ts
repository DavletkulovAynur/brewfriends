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

  const input = body as {
    title?: unknown;
    description?: unknown;
    location?: unknown;
    priceType?: unknown;
    priceAmount?: unknown;
    startsAt?: unknown;
  };
  if (
    typeof input.title !== "string" ||
    input.title.trim().length === 0 ||
    input.title.trim().length > 100
  ) {
    return NextResponse.json({ error: "Введите название до 100 символов" }, { status: 400 });
  }
  if (
    typeof input.description !== "string" ||
    input.description.trim().length === 0 ||
    input.description.trim().length > 500
  ) {
    return NextResponse.json({ error: "Введите описание до 500 символов" }, { status: 400 });
  }
  if (input.location !== undefined && (typeof input.location !== "string" || input.location.trim().length > 200)) {
    return NextResponse.json({ error: "Место должно содержать не более 200 символов" }, { status: 400 });
  }
  if (input.priceType !== "free" && input.priceType !== "paid") {
    return NextResponse.json({ error: "Выберите вариант стоимости" }, { status: 400 });
  }
  if (input.priceType === "free") {
    if (input.priceAmount !== null && input.priceAmount !== undefined) {
      return NextResponse.json({ error: "Для бесплатной встречи сумма не нужна" }, { status: 400 });
    }
  } else if (
    typeof input.priceAmount !== "number" ||
    !Number.isSafeInteger(input.priceAmount) ||
    input.priceAmount <= 0
  ) {
    return NextResponse.json({ error: "Укажите положительную сумму в целых рублях" }, { status: 400 });
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
    title: input.title.trim(),
    description: input.description.trim(),
    location: typeof input.location === "string" ? input.location.trim() : "",
    priceType: input.priceType,
    priceAmount: input.priceType === "free" ? null : input.priceAmount as number,
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
