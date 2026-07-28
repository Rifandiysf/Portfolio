import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "@/lib/types";

interface AuthStore {
    token: string | null;
    user: UserProfile | null;
    setAuth: (token: string, user: UserProfile) => void;
    logout: () => void;
    isAdmin: () => boolean;
    isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            user: null,
            setAuth: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            isAdmin: () => get().user?.role === "ADMIN",
            isAuthenticated: () => !!get().token,
        }),
        { name: "rifandiysf-auth" }
    )
)