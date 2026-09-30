import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

const SAFE_METHODS = ["get", "head", "options"]

function getCookie(name: string) {
    if (typeof document === "undefined") return null
    const match = document.cookie.match(
        new RegExp(`(?:^|; )${name}=([^;]*)`),
    )
    return match ? decodeURIComponent(match[1]) : null
}

apiClient.interceptors.request.use((config) => {
    if (!SAFE_METHODS.includes(config.method?.toLowerCase() ?? "get")) {
        const csrf = getCookie("csrf_token")
        if (csrf) config.headers["x-csrf-token"] = csrf
    }
    return config
})

let refreshing: Promise<void> | null = null
const NO_REFRESH = ["/auth/login", "/auth/refresh", "/auth/logout"]

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean }

apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as RetryConfig | undefined

        if (
            error.response?.status !== 401 ||
            !original ||
            original._retry ||
            NO_REFRESH.some((p) => original.url?.includes(p))
        ) {
            return Promise.reject(error)
        }

        original._retry = true

        try {
            refreshing ??= apiClient
                .post("/auth/refresh")
                .then(() => undefined)
                .finally(() => {
                    refreshing = null
                })
            await refreshing
            return apiClient(original)
        } catch (refreshError) {
            if (typeof window !== "undefined" && !location.pathname.startsWith("/login")) {
                window.location.href = "/login"
            }
            return Promise.reject(refreshError)
        }
    },
)