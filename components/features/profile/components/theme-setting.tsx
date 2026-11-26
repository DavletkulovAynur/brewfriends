"use client";

import { useSyncExternalStore } from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const subscribe = () => () => { };

export function ThemeSetting() {
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <section className="mx-6 mb-6 rounded-xl bg-card p-4 text-card-foreground">
            <div className="flex items-center justify-between gap-4">
                <label htmlFor="dark-theme" className="flex items-center gap-3 text-sm font-medium">
                    <Moon className="size-5 text-muted-foreground" aria-hidden="true" />
                    Тёмная тема
                </label>
                <Switch
                    id="dark-theme"
                    checked={mounted && resolvedTheme === "dark"}
                    disabled={!mounted}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
            </div>
        </section>
    );
}