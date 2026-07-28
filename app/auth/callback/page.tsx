"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "@/lib/services/authApi";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setAuth = useAuthStore((s) => s.setAuth);

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            router.push("/login");
            return;
        }

        useAuthStore.setState({ token });

        authApi
            .getMe()
            .then((user) => {
                setAuth(token, user);
                router.push("/admin");
            })
            .catch(() => {
                useAuthStore.setState({ token: null });
                router.push("/login");
            });
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Authenticating...</p>
        </div>
    );
}