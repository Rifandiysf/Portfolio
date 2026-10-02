import { create } from "zustand"

export const useAuthStore = create<{ email: string | null; setEmail: (e: string | null) => void }>((set) => ({
    email: null,
    setEmail: (email) => set({ email }),
}))