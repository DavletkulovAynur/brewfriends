import type { User } from "@/domain/users/user.types";

export type AuthStatus = "loading" | "authenticated" | "anonymous";

export type AuthContextValue = {
  status: AuthStatus;
  user: User | null;
  error: string | null;
  refresh: () => Promise<void>;
};