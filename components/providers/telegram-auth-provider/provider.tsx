"use client";

import {
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import {
    getTelegramInitData,
    readyTelegramWebApp,
} from "@/lib/telegram";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUserQuery, currentUserQueryKey } from "./api/current-user.query";
import { useLoginMutation } from "./api/login.mutation";
import { AuthContext } from "./context";
import type { AuthStatus } from "./types";

export function TelegramAuthProvider({ children }: { children: ReactNode }) {
    const queryClient = useQueryClient();
    const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUserQuery();
    const { mutateAsync: login } = useLoginMutation();
    const [status, setStatus] = useState<AuthStatus>("loading");
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setStatus("loading");
        setError(null);

        try {
            readyTelegramWebApp();

            const { data: existing } = await refetchCurrentUser({ throwOnError: true });
            if (existing) {
                setStatus("authenticated");
                return;
            }

            const initData = getTelegramInitData();
            if (initData) {
                const authenticated = await login({ initData });
                queryClient.setQueryData(currentUserQueryKey, authenticated);
                setStatus("authenticated");
                return;
            }

            if (process.env.NODE_ENV !== "production") {
                const authenticated = await login({ devBypass: true });
                queryClient.setQueryData(currentUserQueryKey, authenticated);
                setStatus("authenticated");
                return;
            }

            setStatus("anonymous");
        } catch (err) {
            queryClient.setQueryData(currentUserQueryKey, null);
            setStatus("anonymous");
            setError(err instanceof Error ? err.message : "Auth failed");
        }
    }, [login, queryClient, refetchCurrentUser]);

    useEffect(() => {
        // Authentication is an external async operation that updates provider state.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void refresh();
    }, [refresh]);

    return (
        <AuthContext.Provider value={{ status, user: currentUser ?? null, error, refresh }}>
            {children}
        </AuthContext.Provider>
    );
}