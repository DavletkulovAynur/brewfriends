"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function logout() {
        setIsSubmitting(true);
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
    }

    return (
        <button
            aria-label="Выйти"
            className="inline-flex size-10 items-center justify-center rounded-md border border-stone-300 text-stone-700 transition hover:bg-stone-100 disabled:opacity-50"
            disabled={isSubmitting}
            onClick={logout}
            title="Выйти"
            type="button"
        >
            <LogOut aria-hidden="true" className="size-4" />
        </button>
    );
}