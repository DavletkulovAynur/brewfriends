import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { MyEventsManager } from "@/components/features/events/containers/my-events-manager";

export default function MyEventsPage() {
    return (
        <div className="flex flex-1 flex-col gap-5 pt-4">
            <header className="flex items-center gap-3 px-6">
                <Link
                    href="/settings"
                    aria-label="Назад к настройкам"
                    className="flex size-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                >
                    <ChevronLeft className="size-5" aria-hidden="true" />
                </Link>
                <h1 className="text-xl font-semibold">Мои события</h1>
            </header>
            <MyEventsManager />
        </div>
    );
}