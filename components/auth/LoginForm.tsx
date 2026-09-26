'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/stores/auth-store";
import { loginSchema, LoginValues } from "@/lib/schema/auth-schema";
import { loginAdmin } from "@/lib/services/api";
import Image from "next/image";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter()
    const setToken = useAuthStore((state) => state.setToken)
    const [form, setForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({})

    const mutation = useMutation({
        mutationFn: loginAdmin,
        onSuccess: (data) => {
            setToken(data.accessToken)
            router.push("/admin")
        },
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const result = loginSchema.safeParse(form)
        if (!result.success) {
            const fieldErrors: typeof errors = {}
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0] as keyof LoginValues] = issue.message
            })
            setErrors(fieldErrors)
            return
        }
        setErrors({})
        mutation.mutate(result.data)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Admin Login</h1>
                                <p className="text-balance text-muted-foreground">
                                    Sign in to manage portfolio content
                                </p>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                                {errors.email && (
                                    <span className="text-xs text-red-500">{errors.email}</span>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                />
                                {errors.password && (
                                    <span className="text-xs text-red-500">{errors.password}</span>
                                )}
                            </Field>

                            {mutation.isError && (
                                <p className="text-sm text-red-500 text-center">
                                    {mutation.error.message === "Invalid credentials"
                                        ? "Wrong email or password."
                                        : "Something went wrong. Please try again."}
                                </p>
                            )}

                            <Field>
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? "Signing in..." : "Login"}
                                </Button>
                            </Field>

                            <FieldDescription className="text-center">
                                Portfolio content management
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            fill
                            src="/placeholder.svg"
                            alt="placeholder"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}