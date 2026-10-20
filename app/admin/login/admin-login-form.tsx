"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";

export function AdminLoginForm() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.get("username"),
                    password: formData.get("password"),
                }),
            });
            const result = (await response.json()) as { error?: string };

            if (!response.ok) {
                setError(
                    result.error === "Admin login is not configured"
                        ? "Вход ещё не настроен на сервере."
                        : result.error ?? "Не удалось войти.",
                );
                return;
            }

            router.replace("/admin");
            router.refresh();
        } catch {
            setError("Не удалось связаться с сервером.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block space-y-2 text-sm font-medium text-stone-700">
                Логин
                <input
                    autoComplete="username"
                    className="h-12 w-full rounded-md border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    name="username"
                    required
                />
            </label>
            <label className="block space-y-2 text-sm font-medium text-stone-700">
                Пароль
                <input
                    autoComplete="current-password"
                    className="h-12 w-full rounded-md border border-stone-300 bg-white px-3 text-base outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                    name="password"
                    required
                    type="password"
                />
            </label>
            {error ? (
                <p aria-live="polite" className="text-sm text-red-700">
                    {error}
                </p>
            ) : null}
            <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-emerald-800 px-4 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-60"
                disabled={isSubmitting}
                type="submit"
            >
                <KeyRound aria-hidden="true" className="size-4" />
                {isSubmitting ? "Входим..." : "Войти в панель"}
            </button>
            <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                <ShieldCheck aria-hidden="true" className="size-4" />
                Защищённый доступ
            </div>
        </form>
    );
}