import type { FormEvent } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProfileHero } from "@/components/features/profile/components/profile-hero";
import type { ProfileFormState } from "@/components/features/profile/types/profile.types";

type ProfileFormProps = {
    form: ProfileFormState;
    error?: string;
    saved: boolean;
    isSaving: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onStatusChange: (status: string) => void;
    onVisibilityChange: (isVisible: boolean) => void;
};

export function ProfileForm({
    form,
    error,
    saved,
    isSaving,
    onSubmit,
    onStatusChange,
    onVisibilityChange,
}: ProfileFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5 p-6 pt-4">
            <ProfileHero name={form.name} />

            <section className="flex flex-col gap-1">
                <label className="flex flex-col bg-white rounded-xl">
                    <span className="sr-only">Status</span>
                    <Input
                        aria-label="Status"
                        className="h-16 rounded-full border-transparent bg-white px-6 text-lg shadow-none"
                        maxLength={60}
                        placeholder="Status."
                        value={form.status}
                        onChange={(event) => onStatusChange(event.target.value)}
                    />
                </label>
                <span className="pl-4 text-sm font-normal text-muted-foreground">
                    Status
                </span>
            </section>

            <Link
                href="/events/create"
                className="flex min-h-14 items-center justify-between gap-4 rounded-xl bg-white px-4 text-sm font-semibold transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <span>Создать событие</span>
                <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
            </Link>

            <section className="flex flex-col gap-4 rounded-xl bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-sm font-semibold">Profile visibility</h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Show your profile to other users.
                        </p>
                    </div>
                    <Switch
                        checked={form.isVisible}
                        onCheckedChange={onVisibilityChange}
                        aria-label="Show profile to other users"
                    />
                </div>
            </section>

            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            {saved ? <p role="status" className="text-sm text-muted-foreground">Profile saved.</p> : null}

            <div>
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save profile"}
                </Button>
            </div>
        </form>
    );
}