import { unstable_cache } from "next/cache"
import { apiClient } from "../axios";
import { projectListSchema, projectSchema } from "../schema/project-schema";
import { experienceListSchema } from "../schema/experience-schema";
import { ContactFormValues } from "../schema/contact-schema";
import { LoginValues } from "../schema/auth-schema";


export const getProjects = unstable_cache(
    async () => {
        const res = await apiClient.get("/projects")
        return projectListSchema.parse(res.data)
    },
    ["projects"],
    { revalidate: 3600, tags: ["projects"] }
)

export function getProjectBySlug(slug: string) {
    return unstable_cache(
        async () => {
            try {
                const res = await apiClient.get(`/projects/${slug}`)
                return projectSchema.parse(res.data)
            } catch (err) {
                if ((err as { status?: number }).status === 404) return null
                throw err
            }
        },
        ["project", slug],
        { revalidate: 3600, tags: ["projects", `project-${slug}`] }
    )()
}

export const getExperiences = unstable_cache(
    async () => {
        const res = await apiClient.get("/experiences")
        return experienceListSchema.parse(res.data)
    },
    ["experiences"],
    { revalidate: 3600, tags: ["experiences"] }
)

export async function sendContactMessage(data: ContactFormValues) {
    const res = await apiClient.post("/contact", data)
    return res.data as { message: string }
}

export async function loginAdmin(data: LoginValues) {
    const res = await apiClient.post("/auth/login", data)
    return res.data as { accessToken: string }
}