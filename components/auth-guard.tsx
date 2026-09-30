"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { data, isPending, isError } = useAuth()

    useEffect(() => {
        if (isError) router.replace("/login")
    }, [isError, router])

    if (isPending || !data) {
        return (
            <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
                Loading...
            </div>
        )
    }

    return <>{children}</>
}