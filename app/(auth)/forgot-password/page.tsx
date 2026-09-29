'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/lib/axios"
import { forgotPasswordSchema, ForgotPasswordValues } from "@/lib/schema/auth-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"

export default function ForgotPasswordPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
    })
    const mutation = useMutation({
        mutationFn: (data: ForgotPasswordValues) => apiClient.post("/auth/forgot-password", data),
    })

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardContent className="p-8">
                    {mutation.isSuccess ? (
                        <p className="text-center text-sm text-muted-foreground">
                            If that email exists, a reset link has been sent. Check your inbox.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-5">
                            <h1 className="text-center text-2xl font-bold">Forgot password</h1>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                            </Field>
                            <Button type="submit" className="w-full" disabled={mutation.isPending}>
                                {mutation.isPending ? "Sending..." : "Send reset link"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}