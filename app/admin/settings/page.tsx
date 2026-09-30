'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { changePasswordSchema, ChangePasswordValues } from "@/lib/schema/auth-schema"

export default function SettingsPage() {
    const { data: me } = useAuth()
    const qc = useQueryClient()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
    })

    const mutation = useMutation({
        mutationFn: (data: ChangePasswordValues) =>
            apiClient.patch("/auth/change-password", data),
        onSuccess: () => {
            reset()
            qc.invalidateQueries({ queryKey: ["auth", "me"] })
        },
    })

    return (
        <div className="flex w-full flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-muted-foreground">Manage your admin account</p>
            </div>

            {/* Account Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                        Account information used to sign in. Email cannot be changed from this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="size-16 rounded-full">
                        <AvatarImage src={me?.avatarUrl ?? me?.email.slice(0, 2).toUpperCase() ?? "RY"} alt={me?.name ?? ""} />
                        <AvatarFallback className="rounded-full text-lg">
                            {me?.name?.[0]?.toUpperCase() || me?.email?.[0]?.toUpperCase() || "A"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <p className="font-medium text-foreground">{me?.name || "-"}</p>
                        <p className="text-sm text-muted-foreground">{me?.email}</p>
                        <Badge variant="secondary" className="w-fit">
                            Admin
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
                <form onSubmit={handleSubmit((v) => mutation.mutate(v))}>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>
                            Make sure your new password is strong and hasn&apos;t been used before.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                {...register("currentPassword")}
                            />
                            {errors.currentPassword && (
                                <span className="text-xs text-destructive">
                                    {errors.currentPassword.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                {...register("newPassword")}
                            />
                            {errors.newPassword && (
                                <span className="text-xs text-destructive">
                                    {errors.newPassword.message}
                                </span>
                            )}
                        </div>

                        {mutation.isError && (
                            <p className="text-sm text-destructive">
                                {mutation.error.message}
                            </p>
                        )}
                        {mutation.isSuccess && (
                            <p className="text-sm text-green-600">
                                Password updated successfully.
                            </p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving..." : "Change Password"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}