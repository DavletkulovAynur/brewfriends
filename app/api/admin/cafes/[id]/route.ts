import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { hasAdminSession } from "@/server/admin/admin-auth";
import { parseCafeInput } from "@/server/admin/cafe-validation";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const input = parseCafeInput(body);
  if (!input) {
    return NextResponse.json(
      { error: "Проверьте название, адрес и координаты кафе" },
      { status: 400 },
    );
  }

  try {
    const { id } = await context.params;
    const [cafe] = await getDb()
      .update(schema.cafes)
      .set(input)
      .where(eq(schema.cafes.id, id))
      .returning();
    if (!cafe) {
      return NextResponse.json({ error: "Кафе не найдено" }, { status: 404 });
    }
    return NextResponse.json({ cafe });
  } catch {
    return NextResponse.json({ error: "Не удалось обновить кафе" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
  }

  try {
    const { id } = await context.params;
    const [deleted] = await getDb()
      .delete(schema.cafes)
      .where(eq(schema.cafes.id, id))
      .returning({ id: schema.cafes.id });
    if (!deleted) {
      return NextResponse.json({ error: "Кафе не найдено" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Не удалось удалить кафе" }, { status: 500 });
  }
}