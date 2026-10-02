// hooks/use-logout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/axios"

export function useLogout() {
    const qc = useQueryClient()
    const router = useRouter()

    return useMutation({
        mutationFn: () => apiClient.post("/auth/logout"),
        onSettled: () => {
            qc.clear()
            router.replace("/login")
        },
    })
}