"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getTelegramInitData, getTelegramUser, getTelegramWebApp } from "@/lib/telegram";

export function ProfileHero({ name }: { name: string }) {
    const router = useRouter();
    const [avatarUrl, setAvatarUrl] = useState<string>();
    const [hasTelegramBackButton, setHasTelegramBackButton] = useState(false);

    useEffect(() => {
        const backButton = getTelegramWebApp()?.BackButton;
        if (!backButton || !getTelegramInitData()) return;

        const goHome = () => router.push("/home");
        backButton.show();
        backButton.onClick(goHome);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasTelegramBackButton(true);

        return () => {
            backButton.offClick(goHome);
            backButton.hide();
        };
    }, [router]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAvatarUrl(getTelegramUser()?.photoUrl);
    }, []);

    return (
        <section className="-mx-3 flex flex-col items-center pb-2 text-center">
            <div className="relative h-44 w-full  bg-muted">
                <Image
                    src="/cover_user.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 768px) calc(100vw - 24px), 600px"
                    className="object-cover rounded-[2rem]"
                />
                {hasTelegramBackButton ? null : (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon-lg"
                        aria-label="На главную"
                        onClick={() => router.push("/home")}
                        className="absolute left-3 top-3 z-10 rounded-full bg-white/75 text-zinc-900 shadow-sm backdrop-blur hover:bg-white"
                    >
                        <ArrowLeft aria-hidden="true" />
                    </Button>
                )}
                <div className="absolute -bottom-12 left-1/2 size-28 -translate-x-1/2 overflow-hidden rounded-full border-4 border-background bg-muted shadow-md">
                    {avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt=""
                            fill
                            unoptimized
                            sizes="112px"
                            className="object-cover"
                        />
                    ) : (
                        <span className="flex size-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                            {name.trim().charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>
            <h1 className="mt-14 max-w-full truncate px-6 text-2xl font-semibold">
                {name}
            </h1>
        </section>
    );
}