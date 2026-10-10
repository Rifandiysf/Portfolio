'use client'
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <p className={`text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium ${className}`}>
        {children}
    </p>
)

const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-xs text-red-500 mt-2">{msg}</p> : null

const Hint = ({ children }: { children: React.ReactNode }) => (
    <p className="text-xs text-muted-foreground/70 mt-2">{children}</p>
)

const ghostInput =
    "border-0 border-b border-border/40 rounded-none bg-transparent px-0 shadow-none " +
    "focus-visible:ring-0 focus-visible:border-foreground transition-colors"

const ghostTextarea =
    "border border-border/40 rounded-xl bg-transparent px-5 py-4 shadow-none resize-y " +
    "text-base leading-[1.85] text-muted-foreground focus-visible:ring-0 focus-visible:border-foreground transition-colors"

const pillInput =
    "rounded-full border border-border bg-transparent px-6 h-10 text-sm shadow-none focus-visible:ring-0 focus-visible:border-foreground"

export function ProjectForm({ project }: { project?: Project }) {
    const router = useRouter()
    const qc = useQueryClient()

    const { register, control, handleSubmit, getValues, setValue, watch, formState: { errors } } =
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

    const cover = watch("image")

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
        <form onSubmit={handleSubmit((v) => mutation.mutate(v))}>
            <main className="min-h-screen px-8 pt-20 pb-32 max-w-6xl mx-auto">
                <BackButton />

                <div className="mb-[72px]">
                    <div
                        className="w-full rounded-xl aspect-[16/9] mb-4 border border-border/40 bg-accent flex items-center justify-center"
                        style={{
                            backgroundImage: cover ? `url("${cover}")` : undefined,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundColor: "hsl(var(--muted))",
                        }}
                    >
                        {!cover && <Eyebrow>Cover image · 16:9</Eyebrow>}
                    </div>
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
                    <FieldError msg={errors.image?.message} />
                </div>

                <div className="mb-20">
                    <div className="grid gap-6 sm:grid-cols-[1fr_140px] mb-6">
                        <div>
                            <Eyebrow className="mb-3">Categories</Eyebrow>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <TagInput
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Web Development, Productivity App, ..."
                                    />
                                )}
                            />
                            <FieldError msg={errors.status?.message} />
                        </div>
                        <div>
                            <Eyebrow className="mb-3">Year</Eyebrow>
                            <Input
                                type="number"
                                className={ghostInput}
                                {...register("year", { valueAsNumber: true })}
                            />
                            <FieldError msg={errors.year?.message} />
                        </div>
                    </div>

                    <Input
                        id="title"
                        placeholder="Project title"
                        aria-label="Title"
                        className={`${ghostInput} h-auto py-2 font-big-shoulders font-[900] leading-[1.05] tracking-tight placeholder:text-muted-foreground/30 md:text-[clamp(40px,6vw,72px)] text-[40px]`}
                        {...register("title", {
                            onBlur: () => {
                                if (!getValues("slug")) setValue("slug", slugify(getValues("title")))
                            },
                        })}
                    />
                    <FieldError msg={errors.title?.message} />

                    <div className="flex items-center gap-1 mt-4 mb-8 text-sm text-muted-foreground">
                        <span className="shrink-0">/project/</span>
                        <Input
                            aria-label="Slug"
                            className={`${ghostInput} h-8 max-w-xs text-sm`}
                            {...register("slug")}
                        />
                    </div>
                    <Hint>Dipakai sebagai URL. Mengubahnya akan memutus link lama.</Hint>
                    <FieldError msg={errors.slug?.message} />

                    <Textarea
                        rows={3}
                        placeholder="Deskripsi singkat project..."
                        aria-label="Description"
                        className={`${ghostTextarea} mt-8 max-w-2xl text-lg`}
                        {...register("description")}
                    />
                    <FieldError msg={errors.description?.message} />

                    <div className="grid gap-3 sm:grid-cols-2 max-w-2xl mt-10">
                        <div>
                            <Input
                                aria-label="Live URL"
                                placeholder="Live Demo ↗  https://..."
                                className={pillInput}
                                {...register("liveUrl")}
                            />
                            <FieldError msg={errors.liveUrl?.message} />
                        </div>
                        <div>
                            <Input
                                aria-label="GitHub URL"
                                placeholder="GitHub ↗  https://github.com/..."
                                className={pillInput}
                                {...register("githubUrl")}
                            />
                            <FieldError msg={errors.githubUrl?.message} />
                        </div>
                    </div>
                </div>

                <section className="mb-20">
                    <Eyebrow className="mb-6">01 — Objective</Eyebrow>
                    <h2 className="font-big-shoulders font-[900] text-3xl mb-5">The Problem</h2>
                    <Textarea
                        rows={8}
                        placeholder="Jelaskan masalah yang ingin diselesaikan. Pisahkan paragraf dengan baris kosong."
                        className={`${ghostTextarea} max-w-2xl`}
                        {...register("objective")}
                    />
                    <FieldError msg={errors.objective?.message} />
                </section>

                <section className="mb-20">
                    <Eyebrow className="mb-6">02 — Solution</Eyebrow>
                    <h2 className="font-big-shoulders font-[900] text-3xl mb-5">The Approach</h2>
                    <Textarea
                        rows={8}
                        placeholder="Jelaskan pendekatan / solusi yang dibuat. Pisahkan paragraf dengan baris kosong."
                        className={`${ghostTextarea} max-w-2xl`}
                        {...register("solution")}
                    />
                    <FieldError msg={errors.solution?.message} />
                </section>

                <section className="mb-20">
                    <Eyebrow className="mb-6">Gallery</Eyebrow>
                    <Controller
                        control={control}
                        name="images"
                        render={({ field }) => <ImageUploader value={field.value} onChange={field.onChange} />}
                    />
                    <Hint>
                        Gambar ke-1 tampil di bawah “The Problem”. Gambar ke-2 dan ke-3 tampil berdampingan di bawah
                        “The Approach” (perlu minimal 3 gambar).
                    </Hint>
                </section>

                <section className="grid grid-cols-2 gap-10 max-sm:grid-cols-1 mb-20">
                    <div>
                        <Eyebrow className="mb-5">Tech Stack</Eyebrow>
                        <Controller
                            control={control}
                            name="techStack"
                            render={({ field }) => (
                                <TagInput value={field.value} onChange={field.onChange} placeholder="Next.js, NestJS, ..." />
                            )}
                        />
                        <FieldError msg={errors.techStack?.message} />
                    </div>
                    <div>
                        <Eyebrow className="mb-5">Features</Eyebrow>
                        <Controller
                            control={control}
                            name="features"
                            render={({ field }) => (
                                <TagInput value={field.value} onChange={field.onChange} placeholder="Ketik fitur lalu tekan Enter" />
                            )}
                        />
                    </div>
                </section>

                <section className="border-t border-border/40 pt-12">
                    <Eyebrow className="mb-6">Visibility</Eyebrow>
                    <div className="flex items-center justify-between gap-6 px-7 py-6 rounded-xl border border-border/40 max-w-2xl">
                        <div>
                            <p className="font-big-shoulders font-[900] text-2xl mb-1">Published</p>
                            <p className="text-muted-foreground text-sm">
                                Draft (off) tidak akan tampil di website publik.
                            </p>
                        </div>
                        <Controller
                            control={control}
                            name="published"
                            render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                    </div>
                </section>
            </main>

            <div className="fixed inset-x-0 bottom-0 z-9 border-t border-border/40 bg-background/80 backdrop-blur">
                <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between gap-4">
                    <p className="text-sm text-red-500 truncate">
                        {mutation.isError ? mutation.error.message : ""}
                    </p>
                    <div className="flex gap-3 shrink-0">
                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-full px-6"
                            onClick={() => router.push("/admin/projects")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="rounded-full px-6" disabled={mutation.isPending}>
                            {mutation.isPending ? "Saving..." : project ? "Save changes" : "Create project"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}