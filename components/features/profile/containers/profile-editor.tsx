"use client";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/telegram-auth-provider";
import { useProfileQuery } from "@/components/features/profile/api/profile.query";
import { useUpdateProfileMutation } from "@/components/features/profile/api/profile.mutation";
import { ProfileForm } from "@/components/features/profile/components/profile-form";
import { ProfileLoadingSkeleton } from "@/components/features/profile/components/profile-loading-skeleton";
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
    const profile = profileQuery.data;
    const initialForm = profile ? toProfileFormState(profile) : null;
    const form = draft ?? initialForm;
    const isEditing = Boolean(
        draft && initialForm &&
        (draft.status !== initialForm.status || draft.isVisible !== initialForm.isVisible),
    );

    useEffect(() => {
        if (profileQuery.error) {
            toast.error(profileQuery.error.message, { id: "profile-load-error" });
        }
    }, [profileQuery.error]);

    function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!form) return;
        updateProfile.mutate(toProfileUpdatePayload(form), {
            onSuccess: () => {
                setDraft(null);
                toast.success("Profile saved.");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    function updateDraft(update: Partial<ProfileFormState>) {
        if (!form) return;
        setDraft({ ...form, ...update });
    }

    function cancelEditing() {
        setDraft(null);
    }

    if (authStatus === "loading") {
        return <ProfileLoadingSkeleton />;
    }

    if (authStatus !== "authenticated") {
        return <p className="p-6 text-sm text-muted-foreground">Open Brewfriends in Telegram to edit your profile.</p>;
    }

    if (profileQuery.isLoading) {
        return <ProfileLoadingSkeleton />;
    }

    if (!form) {
        return (
            <div className="p-6">
                <Button type="button" onClick={() => void profileQuery.refetch()}>
                    Retry loading profile
                </Button>
            </div>
        );
    }

    return (
        <ProfileForm
            form={form}
            isEditing={isEditing}
            isSaving={updateProfile.isPending}
            onCancel={cancelEditing}
            onSubmit={saveProfile}
            onStatusChange={(status) => updateDraft({ status })}
            onVisibilityChange={(isVisible) => updateDraft({ isVisible })}
        />
    );
}