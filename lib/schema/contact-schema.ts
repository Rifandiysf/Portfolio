import { z } from "zod"

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name is too short").max(100),
    email: z.string().email("Invalid email address"),
    service: z.string().optional(),
    message: z.string().min(10, "Message is too short").max(2000),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>