import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Coffee } from "lucide-react";
import { AdminLogoutButton } from "@/app/admin/logout-button";
import { CafeManager } from "@/app/admin/cafes/cafe-manager";
import { hasAdminSession } from "@/server/admin/admin-auth";

export default async function AdminCafesPage() {
    if (!(await hasAdminSession())) redirect("/admin/login");

    return (
        <main className="min-h-screen bg-[#f3f1ea] text-stone-950">
            <header className="border-b border-stone-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
                    <Link className="flex items-center gap-3" href="/admin">
                        <span className="flex size-10 items-center justify-center rounded-md bg-emerald-900 text-white">
                            <Coffee aria-hidden="true" className="size-5" />
                        </span>
                        <span>
                            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                                Brewfriends
                            </span>
                            <span className="mt-1 block text-sm text-stone-500">Администрирование</span>
                        </span>
                    </Link>
                    <AdminLogoutButton />
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
                <Link
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-emerald-900"
                    href="/admin"
                >
                    <ArrowLeft aria-hidden="true" className="size-4" />
                    Панель администратора
                </Link>
                <div className="mt-7">
                    <p className="text-sm font-medium text-emerald-800">Справочник мест</p>
                    <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Кафе</h1>
                </div>
                <CafeManager />
            </div>
        </main>
    );
}