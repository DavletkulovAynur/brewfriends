"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useProfileQuery } from "@/components/features/profile/api/profile.query";
import { useUpdateProfileMutation } from "@/components/features/profile/api/profile.mutation";
import { ProfileForm } from "@/components/features/profile/components/profile-form";
import {
    toProfileFormState,
    toProfileUpdatePayload,
} from "@/components/features/profile/helpers/profile-form-state";
import type { ProfileFormState } from "@/components/features/profile/types/profile.types";

export function ProfileEditor() {
    const { status: authStatus } = useAuth();
    const profileQuery = useProfileQuery(authStatus === "authenticated");
    const updateProfile = useUpdateProfileMutation();
    const [draft, setDraft] = useState<ProfileFormState | null>(null);
    const [saved, setSaved] = useState(false);
    const profile = profileQuery.data;
    const form = draft ?? (profile ? toProfileFormState(profile) : null);
    const error = profileQuery.error?.message ?? updateProfile.error?.message;

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!form) return;
        setSaved(false);
        updateProfile.mutate(toProfileUpdatePayload(form), {
            onSuccess: (user) => {
                setDraft(toProfileFormState(user));
                setSaved(true);
            },
        });
    }

    function updateDraft(update: Partial<ProfileFormState>) {
        if (!form) return;
        setDraft({ ...form, ...update });
    }

    if (authStatus === "loading") {
        return <p className="p-6 text-sm text-muted-foreground">Loading profile...</p>;
    }

    if (authStatus !== "authenticated") {
        return <p className="p-6 text-sm text-muted-foreground">Open Brewfriends in Telegram to edit your profile.</p>;
    }

    if (profileQuery.isLoading) {
        return <p className="p-6 text-sm text-muted-foreground">Loading profile...</p>;
    }

    if (!form) {
        return <p role="alert" className="p-6 text-sm text-destructive">{error ?? "Could not load profile"}</p>;
    }

    return (
        <ProfileForm
            form={form}
            error={error}
            saved={saved}
            isSaving={updateProfile.isPending}
            onSubmit={saveProfile}
            onNameChange={(name) => updateDraft({ name })}
            onStatusChange={(status) => updateDraft({ status })}
            onVisibilityChange={(isVisible) => updateDraft({ isVisible })}
        />
    );
}