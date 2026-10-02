'use client'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { TagInput } from "./tag-input"
import { ImageUploader } from "./image-uploader"
import { createProject, updateProject } from "@/lib/services/api"
import { revalidateContent } from "@/app/actions/revalidate"
import {
    Project, ProjectFormValues, ProjectPayload, projectFormSchema,
} from "@/lib/schema/project-schema"

const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

const toPayload = (v: ProjectFormValues): ProjectPayload => ({
    ...v,
    liveUrl: v.liveUrl || null,
    githubUrl: v.githubUrl || null,
    objective: v.objective || null,
    solution: v.solution || null,
})

const Error = ({ msg }: { msg?: string }) =>
    msg ? <span className="text-xs text-red-500">{msg}</span> : null

export function ProjectForm({ project }: { project?: Project }) {
    const router = useRouter()
    const qc = useQueryClient()

    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } =
        useForm<ProjectFormValues>({
            resolver: zodResolver(projectFormSchema),
            defaultValues: {
                slug: project?.slug ?? "",
                title: project?.title ?? "",
                description: project?.description ?? "",
                image: project?.image ?? "",
                images: project?.images ?? [],
                status: project?.status ?? [],
                year: project?.year ?? new Date().getFullYear(),
                liveUrl: project?.liveUrl ?? "",
                githubUrl: project?.githubUrl ?? "",
                techStack: project?.techStack ?? [],
                features: project?.features ?? [],
                objective: project?.objective ?? "",
                solution: project?.solution ?? "",
                published: project?.published ?? true,
            },
        })

    const mutation = useMutation({
        mutationFn: (values: ProjectFormValues) =>
            project
                ? updateProject({ id: project.id, data: toPayload(values) })
                : createProject(toPayload(values)),
        onSuccess: async () => {
            await revalidateContent("projects")
            await qc.invalidateQueries({ queryKey: ["admin", "projects"] })
            router.push("/admin/projects")
        },
    })

    return (
        <form onSubmit={handleSubmit((v) => mutation.mutate(v))} className="mx-auto max-w-3xl space-y-6 p-6">
            <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                    id="title"
                    {...register("title", {
                        onBlur: () => {
                            if (!getValues("slug")) setValue("slug", slugify(getValues("title")))
                        },
                    })}
                />
                <Error msg={errors.title?.message} />
            </Field>

            <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input id="slug" {...register("slug")} />
                <FieldDescription>Dipakai sebagai URL (/project/slug). Mengubahnya akan memutus link lama.</FieldDescription>
                <Error msg={errors.slug?.message} />
            </Field>

            <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" rows={3} {...register("description")} />
                <Error msg={errors.description?.message} />
            </Field>

            <Field>
                <FieldLabel>Cover image</FieldLabel>
                <Controller
                    control={control}
                    name="image"
                    render={({ field }) => (
                        <ImageUploader
                            max={1}
                            value={field.value ? [field.value] : []}
                            onChange={(v) => field.onChange(v[0] ?? "")}
                        />
                    )}
                />
                <Error msg={errors.image?.message} />
            </Field>

            <Field>
                <FieldLabel>Gallery images</FieldLabel>
                <Controller
                    control={control}
                    name="images"
                    render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} />}
                />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field>
                    <FieldLabel htmlFor="year">Year</FieldLabel>
                    <Input id="year" type="number" {...register("year", { valueAsNumber: true })} />
                    <Error msg={errors.year?.message} />
                </Field>
                <Field>
                    <FieldLabel>Categories</FieldLabel>
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <TagInput value={field.value} onChange={field.onChange} placeholder="Web Development, ..." />
                        )}
                    />
                    <Error msg={errors.status?.message} />
                </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <Field>
                    <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
                    <Input id="liveUrl" placeholder="https://..." {...register("liveUrl")} />
                    <Error msg={errors.liveUrl?.message} />
                </Field>
                <Field>
                    <FieldLabel htmlFor="githubUrl">GitHub URL</FieldLabel>
                    <Input id="githubUrl" placeholder="https://github.com/..." {...register("githubUrl")} />
                    <Error msg={errors.githubUrl?.message} />
                </Field>
            </div>

            <Field>
                <FieldLabel>Tech stack</FieldLabel>
                <Controller
                    control={control}
                    name="techStack"
                    render={({ field }) => (
                        <TagInput value={field.value} onChange={field.onChange} placeholder="Next.js, NestJS, ..." />
                    )}
                />
                <Error msg={errors.techStack?.message} />
            </Field>

            <Field>
                <FieldLabel>Features</FieldLabel>
                <Controller
                    control={control}
                    name="features"
                    render={({ field }) => (
                        <TagInput value={field.value} onChange={field.onChange} placeholder="Ketik fitur lalu tekan Enter" />
                    )}
                />
            </Field>

            <Field>
                <FieldLabel htmlFor="objective">Objective</FieldLabel>
                <Textarea id="objective" rows={4} {...register("objective")} />
            </Field>

            <Field>
                <FieldLabel htmlFor="solution">Solution</FieldLabel>
                <Textarea id="solution" rows={4} {...register("solution")} />
            </Field>

            <Field>
                <div className="flex items-center gap-3">
                    <Controller
                        control={control}
                        name="published"
                        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                    />
                    <FieldLabel>Published</FieldLabel>
                </div>
                <FieldDescription>Draft (off) tidak akan tampil di website publik.</FieldDescription>
            </Field>

            {mutation.isError && <p className="text-sm text-red-500">{mutation.error.message}</p>}

            <div className="flex gap-3">
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Saving..." : project ? "Save changes" : "Create project"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
                    Cancel
                </Button>
            </div>
        </form>
    )
}