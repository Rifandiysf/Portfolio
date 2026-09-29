import axios from "axios";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

apiClient.interceptors.request.use((config) => {
    if (["post", "put", "patch", "delete"].includes(config.method ?? "")) {
        const csrf = getCookie("csrf_token");
        if (csrf) config.headers["X-CSRF-Token"] = csrf;
    }
    return config;
});

let refreshPromise: Promise<unknown> | null = null;

apiClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;
        const isAuthRoute = original?.url?.includes("/auth/");

        if (error.response?.status === 401 && !original._retry && !isAuthRoute) {
            original._retry = true;
            try {
                refreshPromise ??= apiClient
                    .post("/auth/refresh")
                    .finally(() => (refreshPromise = null));
                await refreshPromise;
                return apiClient(original);
            } catch {}
        }

        const status = error.response?.status;
        const rawMessage = error.response?.data?.message;
        const message = Array.isArray(rawMessage)
            ? rawMessage.join(", ")
            : (rawMessage ?? error.message);
        const normalized = new Error(message) as Error & { status?: number };
        normalized.status = status;
        return Promise.reject(normalized);
    },
);
