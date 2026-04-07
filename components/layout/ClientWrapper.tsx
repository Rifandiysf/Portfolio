'use client'
import { useState } from "react"
import Preloader from "@/components/ui/Preloader"

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [done, setDone] = useState(false)

    return (
        <>
            <Preloader onComplete={() => setDone(true)} />
            <div
                style={{
                    opacity: done ? 1 : 0,
                    transform: done ? "none" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            >
                {children}
            </div>
        </>
    )
}