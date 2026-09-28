import { unstable_cache } from "next/cache"
import { apiClient } from "../axios";
import { projectListSchema, ProjectPayload, projectSchema } from "../schema/project-schema";
import { ExperienceFormValues, experienceListSchema } from "../schema/experience-schema";
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

// Projects
export async function getAdminProjects() {
    const res = await apiClient.get("/projects/admin/all")
    return projectListSchema.parse(res.data)
}
export const createProject = (data: ProjectPayload) => apiClient.post("/projects", data)
export const updateProject = ({ id, data }: { id: string; data: ProjectPayload }) =>
    apiClient.patch(`/projects/${id}`, data)
export const deleteProject = (id: string) => apiClient.delete(`/projects/${id}`)

// Experiences
export async function getAdminExperiences() {
    const res = await apiClient.get("/experiences")
    return experienceListSchema.parse(res.data)
}
export const createExperience = (data: ExperienceFormValues) => apiClient.post("/experiences", data)
export const updateExperience = ({ id, data }: { id: string; data: ExperienceFormValues }) =>
    apiClient.patch(`/experiences/${id}`, data)
export const deleteExperience = (id: string) => apiClient.delete(`/experiences/${id}`)

// Upload
export async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const res = await apiClient.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // timpa default application/json
    })
    return res.data.url as string
}