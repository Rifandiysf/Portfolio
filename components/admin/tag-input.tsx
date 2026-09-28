'use client'
import { useState } from "react"
import { X } from "lucide-react"

export function TagInput({ value, onChange, placeholder }: {
    value: string[]
    onChange: (v: string[]) => void
    placeholder?: string
}) {
    const [draft, setDraft] = useState("")

    const add = () => {
        const v = draft.trim()
        if (v && !value.includes(v)) onChange([...value, v])
        setDraft("")
    }

    return (
        <div className="flex flex-wrap gap-2 rounded-md border p-2">
            {value.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs">
                    {tag}
                    <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))}>
                        <X size={12} />
                    </button>
                </span>
            ))}
            <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); add() }
                    else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1))
                }}
                onBlur={add}
                placeholder={placeholder}
                className="min-w-40 flex-1 bg-transparent text-sm outline-none"
            />
        </div>
    )
}