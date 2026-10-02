'use client'
import { useRef, useState } from "react"
import { Loader2, Plus, X } from "lucide-react"
import { uploadImage } from "@/lib/services/api";

const MAX_SIZE = 5 * 1024 * 1024

export function ImageUploader({ value, onChange, max }: {
    value: string[]
    onChange: (v: string[]) => void
    max?: number
}) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const canAdd = !max || value.length < max

    const handleFiles = async (files: FileList | null) => {
        if (!files?.length) return
        setError(null)
        const picked = Array.from(files).slice(0, max ? max - value.length : undefined)

        for (const f of picked) {
            if (!f.type.startsWith("image/")) return setError("Only image files are allowed")
            if (f.size > MAX_SIZE) return setError("Each image must be 5 MB or smaller")
        }

        setUploading(true)
        try {
            const urls: string[] = []
            for (const f of picked) urls.push(await uploadImage(f))
            onChange([...value, ...urls])
        } catch (e) {
            setError(e instanceof Error ? e.message : "Upload failed")
        } finally {
            setUploading(false)
            if (inputRef.current) inputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-3">
                {value.map((url) => (
                    <div key={url} className="relative h-24 w-32 overflow-hidden rounded-md border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        <button
                            type="button"
                            onClick={() => onChange(value.filter((u) => u !== url))}
                            className="absolute right-1 top-1 rounded-full bg-background/90 p-1"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
                {canAdd && (
                    <button
                        type="button"
                        disabled={uploading}
                        onClick={() => inputRef.current?.click()}
                        className="flex h-24 w-32 items-center justify-center rounded-md border border-dashed text-muted-foreground hover:bg-muted disabled:opacity-50"
                    >
                        {uploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    </button>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple={max !== 1}
                hidden
                onChange={(e) => handleFiles(e.target.files)}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}