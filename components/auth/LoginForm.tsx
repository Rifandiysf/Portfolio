'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginSchema, LoginValues } from "@/lib/schema/auth-schema";
import Image from "next/image";
import { apiClient } from "@/lib/axios";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const router = useRouter()
    const params = useSearchParams()
    const { data } = useAuth()
    const [form, setForm] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({})

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: LoginValues) => apiClient.post("/auth/login", data).then((r) => r.data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
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

    async function loginWithGoogle() {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
    }

    useEffect(() => {
        if (data) router.replace("/admin")
    }, [data, router])

    const error =
        params.get("error") === "unauthorized"
            ? "Akun Google ini tidak diizinkan."
            : null

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

                            {error && <p className="text-sm text-destructive">{error}</p>}

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
                                <div className="flex items-center justify-between">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link href="/forgot-password" className="text-sm underline-offset-2 hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>
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

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <Button variant="outline" type="button" onClick={loginWithGoogle}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span>Login with Google</span>
                            </Button>

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