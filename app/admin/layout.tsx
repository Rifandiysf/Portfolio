'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const token = useAuthStore((state) => state.token)
    const hasHydrated = useAuthStore((state) => state.hasHydrated)

    useEffect(() => {
        if (hasHydrated && !token) router.replace("/login")
    }, [hasHydrated, token, router])

    if (!hasHydrated || !token) return null

    return <div className="min-h-screen">{children}</div>
}