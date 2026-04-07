'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium hover:text-primary transition-colors mb-16"
        >
            <ArrowLeft size={14} />
            Back
        </button>
    )
}