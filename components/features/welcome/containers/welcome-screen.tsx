"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeActions } from "@/components/features/welcome/components/welcome-actions";
import { WelcomeAvatars } from "@/components/features/welcome/components/welcome-avatars";
import { WelcomeHero } from "@/components/features/welcome/components/welcome-hero";
import { WelcomeIntro } from "@/components/features/welcome/components/welcome-intro";

export function WelcomeScreen() {
    const router = useRouter();
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <main className="min-h-dvh bg-[#f3e8d5] text-[#1c2922]">
            <div className="mx-auto flex min-h-dvh w-full max-w-[520px] flex-col bg-[#f3e8d5]">
                <WelcomeHero />

                <div className="flex flex-1 flex-col px-6 pb-[max(24px,env(safe-area-inset-bottom))] sm:px-8">
                    <WelcomeAvatars />
                    <WelcomeIntro />
                    <WelcomeActions
                        acceptedTerms={acceptedTerms}
                        onAcceptedTermsChange={setAcceptedTerms}
                        onContinue={() => router.push("/home")}
                    />
                </div>
            </div>
        </main>
    );
}