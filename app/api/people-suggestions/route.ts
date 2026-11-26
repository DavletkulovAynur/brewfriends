import { NextResponse } from "next/server";
import { getSession } from "@/server/auth/session";
import { feedbackService } from "@/server/feedback/feedback.service";

const MAX_SUGGESTION_LENGTH = 1000;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Нужно войти в приложение" }, { status: 401 });
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
    Array.isArray(requestBody) ||
    typeof (requestBody as { message?: unknown }).message !== "string"
  ) {
    return NextResponse.json({ error: "Напишите вашу идею" }, { status: 400 });
  }

  const message = (requestBody as { message: string }).message.trim();
  if (!message || message.length > MAX_SUGGESTION_LENGTH) {
    return NextResponse.json(
      { error: `Идея должна содержать не более ${MAX_SUGGESTION_LENGTH} символов` },
      { status: 400 },
    );
  }

  try {
    await feedbackService.submitPeopleSuggestion(session.userId, message);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Не удалось сохранить идею. Попробуйте ещё раз." },
      { status: 500 },
    );
  }
}