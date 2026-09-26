import { useAuthStore } from "@/stores/auth-store";
import axios from "axios"

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
})

apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = useAuthStore.getState().token
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response?.status
        const rawMessage = error.response?.data?.message
        const message = Array.isArray(rawMessage)
            ? rawMessage.join(", ")
            : rawMessage ?? error.message ?? "Something went wrong"

        const normalized = new Error(message) as Error & { status?: number }
        normalized.status = status
        return Promise.reject(normalized)
    }
)