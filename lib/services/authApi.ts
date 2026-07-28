import { api } from "../axios";
import { AuthResponse, ForgotPasswordDto, LoginDto, ResetPasswordDto, UserProfile } from "../types";

export const authApi = {
    login: (data: LoginDto) => 
        api.post<AuthResponse>('/auth/login', data).then((res) => res.data),

    getMe: () => 
        api.get<UserProfile>('/auth/me').then((res) => res.data),

    forgotPassword: (data: ForgotPasswordDto) => 
        api.post<{ message: string }>('/auth/forgot-password', data).then((res) => res.data),

    resetPassword: (data: ResetPasswordDto) => 
        api.post<{ message: string }>('/auth/reset-password', data).then((res) => res.data),

    loginWithGoogle: () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
    },
}