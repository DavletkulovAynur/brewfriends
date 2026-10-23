import Link from "next/link";
import { ChevronRight, Heart, Plus } from "lucide-react";

export function InterestsSettingsLink() {
    return (
        <div className="flex flex-col gap-1">
            <section className="flex flex-col gap-3 rounded-xl bg-white p-4">

                <Link
                    href="/interests/create"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span className="flex items-center gap-3">
                        <Plus className="size-5 text-muted-foreground" aria-hidden="true" />
                        Создать интерес
                    </span>
                    <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                </Link>
                <hr className="my-2 ml-10 border-t border-muted-foreground/10" />
                <Link
                    href="/interests"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span className="flex items-center gap-3">
                        <Heart className="size-5 text-muted-foreground" aria-hidden="true" />
                        Мои интересы
                    </span>
                    <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                </Link>
            </section>
            <div>
                <p className="pl-4 text-xs text-muted-foreground">
                    Добавь интересы, чтобы найти компанию или поделиться опытом.
                </p>
            </div>
        </div>

    );
}