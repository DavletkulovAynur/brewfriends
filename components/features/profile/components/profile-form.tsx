import type { FormEvent } from "react";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProfileHero } from "@/components/features/profile/components/profile-hero";
import { InterestsSettingsLink } from "@/components/features/interests/containers/interests-settings-link";
import { SettingsLinks } from "@/components/shared/settings-links";
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

            <SettingsLinks
                items={[
                    { href: "/events/create", label: "Создать событие", icon: CalendarPlus },
                    { href: "/settings/events", label: "Мои события", icon: CalendarDays },
                ]}
                description="Создавай встречи и приглашай других присоединиться."
            />

            <InterestsSettingsLink />

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