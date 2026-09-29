import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/axios"

export function useAuth() {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            const res = await apiClient.get("/auth/me")
            return res.data as { email: string }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}