'use client'
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { EllipsisVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExperienceForm } from "@/components/admin/experience-form"
import { deleteExperience, getAdminExperiences } from "@/lib/services/api"
import { revalidateContent } from "@/app/actions/revalidate"
import { Experience } from "@/lib/schema/experience-schema"

export default function AdminExperiencesPage() {
    const qc = useQueryClient()
    const [editing, setEditing] = useState<Experience | "new" | null>(null)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["admin", "experiences"],
        queryFn: getAdminExperiences,
    })

    const remove = useMutation({
        mutationFn: deleteExperience,
        onSuccess: async () => {
            await revalidateContent("experiences")
            await qc.invalidateQueries({ queryKey: ["admin", "experiences"] })
        },
    })

    const nextOrder = data?.length ? Math.max(...data.map((e) => e.order)) + 1 : 0

    return (
        <div className="space-y-4 p-4 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Experiences</h1>
                <Button size="sm" onClick={() => setEditing("new")}>
                    <Plus />
                    <span>New experience</span>
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
                                    <TableHead className="w-16 pl-4">Order</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="w-12" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            Belum ada experience.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {data.map((e) => (
                                    <TableRow key={e.id}>
                                        <TableCell className="pl-4">{e.order}</TableCell>
                                        <TableCell className="font-medium">{e.role}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="px-1.5 text-muted-foreground">
                                                {e.companyName}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{e.date}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => setEditing(e)}>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        disabled={remove.isPending}
                                                        onClick={() => {
                                                            if (confirm(`Delete "${e.role}"?`)) remove.mutate(e.id)
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
                    <p className="px-1 text-sm text-muted-foreground">{data.length} experience(s)</p>
                </>
            )}

            <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editing === "new" ? "New experience" : "Edit experience"}</DialogTitle>
                    </DialogHeader>
                    {editing && (
                        <ExperienceForm
                            key={editing === "new" ? "new" : editing.id}
                            experience={editing === "new" ? undefined : editing}
                            nextOrder={nextOrder}
                            onDone={() => setEditing(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}