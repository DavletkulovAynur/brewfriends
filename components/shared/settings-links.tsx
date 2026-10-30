import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

type SettingsLinkItem = {
    href: string;
    label: string;
    icon: LucideIcon;
};

export function SettingsLinks({
    items,
    description,
}: {
    items: SettingsLinkItem[];
    description?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <section className="flex flex-col rounded-xl bg-white p-4">
                {items.map(({ href, label, icon: Icon }, index) => (
                    <div key={href}>
                        {index > 0 ? <hr className="my-2 ml-10 border-t border-muted-foreground/10" /> : null}
                        <Link
                            href={href}
                            className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <span className="flex items-center gap-3">
                                <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                                {label}
                            </span>
                            <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                        </Link>
                    </div>
                ))}
            </section>
            {description ? (
                <p className="pl-4 text-xs text-muted-foreground">{description}</p>
            ) : null}
        </div>
    );
}