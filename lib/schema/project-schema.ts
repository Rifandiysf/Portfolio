import { z } from "zod";

export const projectSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    images: z.array(z.string()),
    status: z.array(z.string()),
    year: z.number(),
    liveUrl: z.string().nullable().optional(),
    githubUrl: z.string().nullable().optional(),
    techStack: z.array(z.string()),
    features: z.array(z.string()),
    objective: z.string().nullable().optional(),
    solution: z.string().nullable().optional(),
    published: z.boolean().optional(),
});

export const projectListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;

export const projectFormSchema = z.object({
    slug: z.string().min(1, "Slug is required")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers, and hyphens only"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().min(1, "Cover image is required"),
    images: z.array(z.string()),
    status: z.array(z.string()).min(1, "Add at least one category"),
    year: z.number({ error: "Year is required" }).int().min(2000).max(2100),
    liveUrl: z.string().url("Invalid URL").or(z.literal("")),
    githubUrl: z.string().url("Invalid URL").or(z.literal("")),
    techStack: z.array(z.string()).min(1, "Add at least one technology"),
    features: z.array(z.string()),
    objective: z.string(),
    solution: z.string(),
    published: z.boolean(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
export type ProjectPayload = Omit<ProjectFormValues, "liveUrl" | "githubUrl" | "objective" | "solution"> & {
    liveUrl: string | null
    githubUrl: string | null
    objective: string | null
    solution: string | null
}
