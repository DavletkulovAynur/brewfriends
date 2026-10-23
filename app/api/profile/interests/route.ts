import { NextResponse } from "next/server";
import { parseCreateInterestInput } from "@/domain/users/interests.logic";
import { getSession } from "@/server/auth/session";
import { interestsService } from "@/server/profile/interests.service";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const interests = await interestsService.list(session.userId);
    return NextResponse.json({ interests });
  } catch {
    return NextResponse.json({ error: "Не удалось загрузить интересы" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const input = parseCreateInterestInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Укажите занятие до 100 символов и выберите формат" },
      { status: 400 },
    );
  }

  try {
    const interest = await interestsService.create(session.userId, input);
    return NextResponse.json({ interest }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Не удалось сохранить интерес" }, { status: 500 });
  }
}