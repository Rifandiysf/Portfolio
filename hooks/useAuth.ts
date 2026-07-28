import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { ForgotPasswordDto, LoginDto, ResetPasswordDto } from "@/lib/types";
import { authApi } from "@/lib/services/authApi";

export function useLogin() {
    const setAuth = useAuthStore((s) => s.setAuth);
    const router = useRouter();

    return useMutation({
        mutationFn: (data: LoginDto) => authApi.login(data),
        onSuccess: (data) => {
            setAuth(data.accessToken, {
                ...data.user,
                bio: null,
                createdAt: "",
            });
            router.push("/admin")
        }
    });
}

export function useLogout() {
    const logout = useAuthStore((s) => s.logout);
    const router = useRouter();

    return () => {
        logout();
        router.push("/")
    }
}

export function useProfile() {
    const token = useAuthStore((s) => s.token);
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: authApi.getMe,
        enabled: !!token,
        staleTime: 5 * 60 * 1000
    })
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordDto) => authApi.forgotPassword(data),
    });
}

export function useResetPassword() {
    const router = useRouter();
    return useMutation({
        mutationFn: (data: ResetPasswordDto) => authApi.resetPassword(data),
        onSuccess: () => {
            router.push("/login")
        },
    })
}

export function useGoogleLogin() {
    return () => authApi.loginWithGoogle();
}

export function useIsAdmin() {
    return useAuthStore((s) => s.isAdmin());
}

export function useIsAuthenticated() {
    return useAuthStore((s) => s.isAuthenticated());
}

export function useCurrentUser() {
    return useAuthStore((s) => s.user);
}