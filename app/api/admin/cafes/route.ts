import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb, isDbConfigured, schema } from "@/lib/db";
import { hasAdminSession } from "@/server/admin/admin-auth";
import { parseCafeInput } from "@/server/admin/cafe-validation";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ error: "Database is not configured" }, { status: 503 });
  }

  try {
    const cafes = await getDb().select().from(schema.cafes).orderBy(asc(schema.cafes.name));
    return NextResponse.json({ cafes });
  } catch {
    return NextResponse.json({ error: "Не удалось загрузить кафе" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const [cafe] = await getDb()
      .insert(schema.cafes)
      .values({ id: crypto.randomUUID(), ...input })
      .returning();
    return NextResponse.json({ cafe }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Не удалось добавить кафе" }, { status: 500 });
  }
}