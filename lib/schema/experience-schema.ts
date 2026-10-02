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

export const experienceFormSchema = z.object({
    role: z.string().min(1, "Role is required"),
    companyName: z.string().min(1, "Company is required"),
    date: z.string().min(1, "Date is required"),
    description: z.string().min(1, "Description is required"),
    techStack: z.array(z.string()).min(1, "Add at least one technology"),
    order: z.number({ error: "Order is required" }).int().min(0),
})

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>

export const experienceListSchema = z.array(experienceSchema)

export type Experience = z.infer<typeof experienceSchema>