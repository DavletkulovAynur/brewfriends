import { redirect } from "next/navigation";
import { Coffee } from "lucide-react";
import { AdminLoginForm } from "@/app/admin/login/admin-login-form";
import { hasAdminSession } from "@/server/admin/admin-auth";

export default async function AdminLoginPage() {
    if (await hasAdminSession()) redirect("/admin");

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f3f1ea] px-5 py-12">
            <section className="w-full max-w-md border border-stone-200 bg-white p-7 shadow-[0_18px_60px_-35px_rgba(28,25,23,0.38)] sm:p-9">
                <div className="flex size-12 items-center justify-center rounded-md bg-emerald-900 text-white">
                    <Coffee aria-hidden="true" className="size-6" />
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    Brewfriends
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-stone-950">
                    Вход в админ-панель
                </h1>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                    Введите учётные данные администратора.
                </p>
                <AdminLoginForm />
            </section>
        </main>
    );
}