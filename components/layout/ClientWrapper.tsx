'use client'

import { useState } from "react"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"
import Preloader from "@/components/ui/Preloader"
import ContactSection from "@/components/section/ContactSection"
import FooterSection from "@/components/section/FooterSection"

let hasPreloaded = false

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [done, setDone] = useState(hasPreloaded)
    const pathname = usePathname()
    const segments = useSelectedLayoutSegments()

    const isContact = pathname === "/contact" || "/not-found"
    const isNotFound = segments.length === 0 && pathname !== "/"

    const hideContact = isContact || isNotFound

    return (
        <>
            {!hasPreloaded && (
                <Preloader
                    onComplete={() => {
                        hasPreloaded = true
                        setDone(true)
                    }}
                />
            )}

            <div
                style={{
                    opacity: done ? 1 : 0,
                    transform: done ? "none" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            >
                {children}

                {!hideContact && <ContactSection />}
                <FooterSection />
            </div>
        </>
    )
}