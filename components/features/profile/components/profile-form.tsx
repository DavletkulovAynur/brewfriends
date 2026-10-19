import type { FormEvent } from "react";
import Link from "next/link";
import { CalendarDays, CalendarPlus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProfileHero } from "@/components/features/profile/components/profile-hero";
import type { ProfileFormState } from "@/components/features/profile/types/profile.types";

type ProfileFormProps = {
    form: ProfileFormState;
    isEditing: boolean;
    isSaving: boolean;
    onCancel: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onStatusChange: (status: string) => void;
    onVisibilityChange: (isVisible: boolean) => void;
};

export function ProfileForm({
    form,
    isEditing,
    isSaving,
    onCancel,
    onSubmit,
    onStatusChange,
    onVisibilityChange,
}: ProfileFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5 p-6 pt-4">
            <div className="relative">
                <ProfileHero
                    name={form.name}
                    isEditing={isEditing}
                    cancelDisabled={isSaving}
                    onCancel={onCancel}
                />
                {isEditing ? (
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={isSaving}
                        className="absolute right-0 top-3"
                    >
                        {isSaving ? "Saving..." : "Save profile"}
                    </Button>
                ) : null}
            </div>

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

            <section className="flex flex-col gap-1 rounded-xl bg-white p-4">
                <Link
                    href="/events/create"
                    className="flex min-h-12 items-center justify-between gap-4 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span className="flex items-center gap-3">
                        <CalendarPlus className="size-5 text-muted-foreground" aria-hidden="true" />
                        Создать событие
                    </span>
                    <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                </Link>
                <hr className="my-2 border-t border-muted-foreground/30" />
                <Link
                    href="/settings/events"
                    className="flex min-h-12 items-center justify-between gap-4 rounded-lg px-2 text-sm font-medium transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <span className="flex items-center gap-3">
                        <CalendarDays className="size-5 text-muted-foreground" aria-hidden="true" />
                        Мои события
                    </span>
                    <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
                </Link>
            </section>

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

        </form>
    );
}