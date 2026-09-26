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
});

export const projectListSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;
