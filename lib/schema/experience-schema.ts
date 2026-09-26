import { z } from "zod"

export const experienceSchema = z.object({
    id: z.string(),
    role: z.string(),
    companyName: z.string(),
    date: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    order: z.number(),
})

export const experienceListSchema = z.array(experienceSchema)

export type Experience = z.infer<typeof experienceSchema>