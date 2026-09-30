import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const forgotPasswordSchema = z.object({ email: z.string().email() })

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginValues = z.infer<typeof loginSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>