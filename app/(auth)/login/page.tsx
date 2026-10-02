import { LoginForm } from "@/components/auth/LoginForm"
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-4xl">
                <Suspense fallback={null}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}