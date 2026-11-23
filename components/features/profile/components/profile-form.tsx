import type { FormEvent } from "react";
import { CalendarDays, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ProfileHero } from "@/components/features/profile/components/profile-hero";
import { InterestsSettingsLink } from "@/components/features/interests/containers/interests-settings-link";
import { SettingsLinks } from "@/components/shared/settings-links";
import type { ProfileFormState } from "@/components/features/profile/types/profile.types";
import { DEFAULT_MEETUP_INTENT, MEETUP_INTENTS, MEETUP_INTENT_EMOJIS, MEETUP_INTENT_LABELS } from "@/domain/users/meetup-intent";
import { MEETUP_INTENT_COLORS } from "@/common/people/constants/meetup-intent-colors";

type ProfileFormProps = {
    form: ProfileFormState;
    isEditing: boolean;
    isSaving: boolean;
    onCancel: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onStatusChange: (status: string) => void;
    onVisibilityChange: (isVisible: boolean) => void;
    onMeetupIntentChange: (meetupIntent: ProfileFormState["meetupIntent"]) => void;
};

export function ProfileForm({
    form,
    isEditing,
    isSaving,
    onCancel,
    onSubmit,
    onStatusChange,
    onVisibilityChange,
    onMeetupIntentChange,
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

            <section className="flex flex-col gap-3 rounded-xl bg-white p-4">
                <div>
                    <p aria-live="polite" className="mt-1 min-h-8 text-sm text-muted-foreground">
                        {MEETUP_INTENT_LABELS[form.meetupIntent ?? DEFAULT_MEETUP_INTENT]}
                    </p>
                </div>
                <div className="flex items-center justify-between gap-1" role="group" aria-label="Намерение для знакомства">
                    {MEETUP_INTENTS.map((intent) => (
                        <button
                            key={intent}
                            type="button"
                            aria-label={MEETUP_INTENT_LABELS[intent]}
                            aria-pressed={form.meetupIntent === intent}
                            onClick={() => onMeetupIntentChange(intent)}
                            title={MEETUP_INTENT_LABELS[intent]}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14 ${form.meetupIntent === intent ? "ring-2 ring-zinc-900 ring-offset-1 dark:ring-white" : "outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white"}`}
                        >
                            <span
                                aria-hidden="true"
                                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl sm:h-12 sm:w-12 sm:text-3xl"
                                style={{ backgroundColor: MEETUP_INTENT_COLORS[intent] }}
                            >
                                {MEETUP_INTENT_EMOJIS[intent]}
                            </span>
                        </button>
                    ))}
                </div>
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