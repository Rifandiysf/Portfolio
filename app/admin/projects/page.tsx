'use client'
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { CircleCheck, EllipsisVertical, Loader, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteProject, getAdminProjects } from "@/lib/services/api"
import { revalidateContent } from "@/app/actions/revalidate"

export default function AdminProjectsPage() {
    const qc = useQueryClient()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin", "projects"],
        queryFn: getAdminProjects,
    })

    const remove = useMutation({
        mutationFn: deleteProject,
        onSuccess: async () => {
            await revalidateContent("projects")
            await qc.invalidateQueries({ queryKey: ["admin", "projects"] })
        },
    })

    return (
        <div className="space-y-4 p-4 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Projects</h1>
                <Button asChild size="sm">
                    <Link href="/admin/projects/new">
                        <Plus />
                        <span>New project</span>
                    </Link>
                </Button>
            </div>

            {isLoading && <p className="text-muted-foreground">Loading...</p>}
            {isError && <p className="text-red-500">{error.message}</p>}
            {remove.isError && <p className="text-red-500">{remove.error.message}</p>}

            {data && (
                <>
                    <div className="overflow-hidden rounded-lg border">
                        <Table>
                            <TableHeader className="bg-muted">
                                <TableRow>
                                    <TableHead className="w-20 pl-4">Cover</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-12" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            Belum ada project.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {data.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="pl-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.image} alt="" className="h-10 w-16 rounded-md border object-cover" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{p.title}</div>
                                            <div className="text-xs text-muted-foreground">/{p.slug}</div>
                                        </TableCell>
                                        <TableCell>{p.year}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                                                {p.published ? (
                                                    <CircleCheck className="text-green-500 dark:text-green-400" />
                                                ) : (
                                                    <Loader />
                                                )}
                                                {p.published ? "Published" : "Draft"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="size-8 text-muted-foreground data-[state=open]:bg-muted"
                                                    >
                                                        <EllipsisVertical />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-32">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/admin/projects/${p.id}/edit`}>Edit</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        disabled={remove.isPending}
                                                        onClick={() => {
                                                            if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id)
                                                        }}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <p className="px-1 text-sm text-muted-foreground">{data.length} project(s)</p>
                </>
            )}
        </div>
    )
}