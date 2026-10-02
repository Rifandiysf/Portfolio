'use server'
import { updateTag } from "next/cache"

export async function revalidateContent(tag: "projects" | "experiences") {
    updateTag(tag)
}