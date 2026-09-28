import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthState = {
    token: string | null
    hasHydrated: boolean
    setToken: (token: string | null) => void
    logout: () => void
    setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            hasHydrated: false,
            setToken: (token) => set({ token }),
            logout: () => set({ token: null }),
            setHasHydrated: (value) => set({ hasHydrated: value }),
        }),
        {
            name: "rifandiysf",
            partialize: (state) => ({ token: state.token }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true)
            },
        }
    )
)