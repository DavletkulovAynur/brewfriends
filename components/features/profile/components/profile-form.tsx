import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ProfileFormState } from "@/components/features/profile/types/profile.types";

type ProfileFormProps = {
    form: ProfileFormState;
    error?: string;
    saved: boolean;
    isSaving: boolean;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onNameChange: (name: string) => void;
    onStatusChange: (status: string) => void;
    onVisibilityChange: (isVisible: boolean) => void;
};

export function ProfileForm({
    form,
    error,
    saved,
    isSaving,
    onSubmit,
    onNameChange,
    onStatusChange,
    onVisibilityChange,
}: ProfileFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-8 p-6 pt-4">
            <header>
                <h1 className="text-2xl font-semibold">Profile</h1>
            </header>

            <section className="flex flex-col gap-4 border-b border-border pb-6">
                <label className="flex flex-col gap-2 text-sm font-medium">
                    Name
                    <Input
                        autoComplete="name"
                        maxLength={40}
                        required
                        value={form.name}
                        onChange={(event) => onNameChange(event.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium">
                    Status
                    <Input
                        maxLength={60}
                        placeholder="Coffee and a good book"
                        value={form.status}
                        onChange={(event) => onStatusChange(event.target.value)}
                    />
                    <span className="text-xs font-normal text-muted-foreground">
                        Shown below your name in stories. Up to 60 characters.
                    </span>
                </label>
            </section>

            <section className="flex flex-col gap-4 border-b border-border pb-6">
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
                <Button type="submit" disabled={isSaving || !form.name.trim()}>
                    {isSaving ? "Saving..." : "Save profile"}
                </Button>
            </div>
        </form>
    );
}