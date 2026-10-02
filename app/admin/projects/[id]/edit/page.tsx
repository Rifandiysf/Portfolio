'use client'
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ProjectForm } from "@/components/admin/project-form"
import { getAdminProjects } from "@/lib/services/api"

export default function EditProjectPage() {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading } = useQuery({ queryKey: ["admin", "projects"], queryFn: getAdminProjects })

    if (isLoading) return <p className="p-6 text-muted-foreground">Loading...</p>
    const project = data?.find((p) => p.id === id)
    if (!project) return <p className="p-6">Project not found.</p>

    return <ProjectForm project={project} />
}