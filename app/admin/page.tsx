import { count } from "drizzle-orm";
import { redirect } from "next/navigation";
import { CalendarDays, UsersRound } from "lucide-react";
import Link from "next/link";
import { schema, getDb, isDbConfigured } from "@/lib/db";
import { hasAdminSession } from "@/server/admin/admin-auth";
import { AdminLogoutButton } from "@/app/admin/logout-button";

async function getOverview() {
    if (!isDbConfigured()) return null;

    const db = getDb();
    const [userRows, eventRows, postRows] = await Promise.all([
        db.select({ value: count() }).from(schema.users),
        db.select({ value: count() }).from(schema.events),
        db.select({ value: count() }).from(schema.eventPosts),
    ]);

    return {
        users: userRows[0]?.value ?? 0,
        events: eventRows[0]?.value ?? 0,
        posts: postRows[0]?.value ?? 0,
    };
}

export default async function AdminPage() {
    if (!(await hasAdminSession())) redirect("/admin/login");

    let overview: Awaited<ReturnType<typeof getOverview>> = null;
    let databaseError = false;
    try {
        overview = await getOverview();
    } catch {
        databaseError = true;
    }

    const metrics = [
        { label: "Пользователи", value: overview?.users, icon: UsersRound },
        { label: "События", value: overview?.events, icon: CalendarDays },
        { label: "Встречи сообщества", value: overview?.posts, icon: CalendarDays },
    ];

    return (
        <main className="min-h-screen bg-[#f3f1ea] text-stone-950">
            <header className="border-b border-stone-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                            Brewfriends
                        </p>
                        <p className="mt-1 text-sm text-stone-500">Администрирование</p>
                    </div>
                    <AdminLogoutButton />
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-emerald-800">Обзор</p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">
                            Панель администратора
                        </h1>
                    </div>
                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${overview
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-amber-100 text-amber-900"
                            }`}
                    >
                        <span className="size-1.5 rounded-full bg-current" />
                        {overview ? "База данных подключена" : "База данных недоступна"}
                    </span>
                </div>

                {databaseError ? (
                    <p className="mt-6 border-l-2 border-amber-600 bg-white px-4 py-3 text-sm text-stone-700">
                        Не удалось загрузить статистику. Проверьте подключение к Neon.
                    </p>
                ) : null}

                <section
                    aria-label="Статистика приложения"
                    className="mt-8 grid gap-px overflow-hidden border border-stone-200 bg-stone-200 sm:grid-cols-3"
                >
                    {metrics.map(({ label, value, icon: Icon }) => (
                        <article key={label} className="min-h-40 bg-white p-6 sm:p-7">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-stone-600">{label}</p>
                                <Icon aria-hidden="true" className="size-4 text-emerald-800" />
                            </div>
                            <p className="mt-7 text-4xl font-semibold tabular-nums">
                                {value ?? "—"}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="mt-10 border-t border-stone-300 pt-7">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">Справочники</h2>
                            <p className="mt-1 text-sm text-stone-600">Управление кафе и их координатами</p>
                        </div>
                        <Link
                            className="inline-flex h-10 items-center gap-2 rounded-md bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900"
                            href="/admin/cafes"
                        >
                            Управлять кафе
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}