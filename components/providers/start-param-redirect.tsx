"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseEventStartParam } from "@/lib/telegram";

// Opens the shared event when the Mini App is launched via a startapp link.
export function StartParamRedirect() {
    const router = useRouter();

    useEffect(() => {
        const eventId = parseEventStartParam();
        if (eventId) router.replace(`/events/${eventId}`);
    }, [router]);

    return null;
}
