'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { apiClient } from "@/lib/axios"
import { resetPasswordSchema, ResetPasswordValues } from "@/lib/schema/auth-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import { Card, CardContent } from "@/components/ui/card"

export default function ResetPasswordForm() {
    const router = useRouter()
    const token = useSearchParams().get("token")
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
    })

    const mutation = useMutation({
        mutationFn: (data: ResetPasswordValues) =>
            apiClient.post("/auth/reset-password", { token, password: data.password }),
        onSuccess: () => router.push("/login"),
    })

    if (!token) {
        return <p className="p-6 text-center text-muted-foreground">Missing or invalid reset link.</p>
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="space-y-5">
                        <h1 className="text-center text-2xl font-bold">Reset password</h1>
                        <Field>
                            <FieldLabel htmlFor="password">New password</FieldLabel>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                        </Field>
                        {mutation.isError && <p className="text-sm text-red-500">{mutation.error.message}</p>}
                        <Button type="submit" className="w-full" disabled={mutation.isPending}>
                            {mutation.isPending ? "Resetting..." : "Reset password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}