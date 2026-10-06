"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LockKeyhole, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/providers/telegram-auth-provider";

type Candidate = { id: string; name: string };
type Visibility = "everyone" | "selected";

export function ProfileEditor() {
    const { status: authStatus, refresh } = useAuth();
    const [name, setName] = useState("");
    const [profileStatus, setProfileStatus] = useState("");
    const [visibility, setVisibility] = useState<Visibility>("everyone");
    const [visibleToUserIds, setVisibleToUserIds] = useState<string[]>([]);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (authStatus === "loading") return;
        if (authStatus !== "authenticated") return;

        let cancelled = false;
        void fetch("/api/profile", { credentials: "include" })
            .then(async (response) => {
                const data = (await response.json()) as {
                    user?: {
                        name: string;
                        status: string;
                        visibility: Visibility;
                        visibleToUserIds: string[];
                    };
                    candidates?: Candidate[];
                    error?: string;
                };
                if (!response.ok || !data.user) {
                    throw new Error(data.error ?? "Could not load profile");
                }
                if (cancelled) return;
                setName(data.user.name);
                setProfileStatus(data.user.status);
                setVisibility(data.user.visibility);
                setVisibleToUserIds(data.user.visibleToUserIds);
                setCandidates(data.candidates ?? []);
            })
            .catch((fetchError: unknown) => {
                if (!cancelled) {
                    setError(
                        fetchError instanceof Error
                            ? fetchError.message
                            : "Could not load profile",
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [authStatus]);

    async function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError(null);
        setSaved(false);

        try {
            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    status: profileStatus,
                    visibility,
                    visibleToUserIds,
                }),
            });
            const data = (await response.json()) as {
                user?: { name: string };
                error?: string;
            };
            if (!response.ok || !data.user) {
                throw new Error(data.error ?? "Could not save profile");
            }

            setName(data.user.name);
            setSaved(true);
            await refresh();
        } catch (saveError) {
            setError(
                saveError instanceof Error ? saveError.message : "Could not save profile",
            );
        } finally {
            setSaving(false);
        }
    }

    function toggleRecipient(id: string, checked: boolean) {
        setVisibleToUserIds((current) =>
            checked ? [...new Set([...current, id])] : current.filter((item) => item !== id),
        );
    }

    if (authStatus === "loading") {
        return <p className="p-6 text-sm text-muted-foreground">Loading profile...</p>;
    }

    if (authStatus !== "authenticated") {
        return <p className="p-6 text-sm text-muted-foreground">Open Brewfriends in Telegram to edit your profile.</p>;
    }

    if (loading) {
        return <p className="p-6 text-sm text-muted-foreground">Loading profile...</p>;
    }

    return (
        <form onSubmit={saveProfile} className="flex flex-1 flex-col gap-8 p-6 pt-4">
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium">
                    Status
                    <Input
                        maxLength={60}
                        placeholder="Coffee and a good book"
                        value={profileStatus}
                        onChange={(event) => setProfileStatus(event.target.value)}
                    />
                    <span className="text-xs font-normal text-muted-foreground">
                        Shown below your name in stories. Up to 60 characters.
                    </span>
                </label>
            </section>

            <section className="flex flex-col gap-4 border-b border-border pb-6">
                <div>
                    <h2 className="text-sm font-semibold">Who can see your profile?</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Your name and status are shown in stories.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2" role="group" aria-label="Profile visibility">
                    <Button
                        type="button"
                        variant={visibility === "everyone" ? "default" : "outline"}
                        aria-pressed={visibility === "everyone"}
                        onClick={() => setVisibility("everyone")}
                    >
                        <Users /> Everyone
                    </Button>
                    <Button
                        type="button"
                        variant={visibility === "selected" ? "default" : "outline"}
                        aria-pressed={visibility === "selected"}
                        onClick={() => setVisibility("selected")}
                    >
                        <LockKeyhole /> Selected people
                    </Button>
                </div>

                {visibility === "selected" ? (
                    <div className="flex flex-col divide-y divide-border">
                        {candidates.length ? (
                            candidates.map((candidate) => (
                                <label
                                    key={candidate.id}
                                    className="flex min-h-11 cursor-pointer items-center gap-3 py-2 text-sm"
                                >
                                    <Checkbox
                                        checked={visibleToUserIds.includes(candidate.id)}
                                        onCheckedChange={(checked) =>
                                            toggleRecipient(candidate.id, checked === true)
                                        }
                                    />
                                    <span>{candidate.name}</span>
                                </label>
                            ))
                        ) : (
                            <p className="py-3 text-sm text-muted-foreground">
                                No other members yet.
                            </p>
                        )}
                    </div>
                ) : null}
            </section>

            {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            {saved ? <p role="status" className="text-sm text-muted-foreground">Profile saved.</p> : null}

            <div>
                <Button type="submit" disabled={saving || !name.trim()}>
                    {saving ? "Saving..." : "Save profile"}
                </Button>
            </div>
        </form>
    );
}