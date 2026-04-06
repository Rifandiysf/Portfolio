import { projectItems } from "@/lib/api"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Props = {
    params: { slug: string }
}

export default function ProjectDetailPage({ params }: Props) {
    const project = projectItems.find((p) => p.slug === params.slug)
    if (!project) notFound()

    const currentIndex = projectItems.findIndex((p) => p.slug === params.slug)
    const nextProject = projectItems[(currentIndex + 1) % projectItems.length]

    return (
        <main className="min-h-screen px-8 py-20 max-w-5xl mx-auto">

            {/* Back button */}
            <Link
                href="/#project"
                className="inline-flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-medium hover:text-primary transition-colors mb-16"
            >
                <ArrowLeft size={14} /> Back to Projects
            </Link>

            {/* Hero image */}
            <div
                className="w-full rounded-xl aspect-[16/9] mb-18"
                style={{
                    backgroundImage: `url("${project.image}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundColor: "hsl(var(--muted))",
                    marginBottom: "72px",
                }}
            />

            {/* Header */}
            <div className="mb-20">
                <div className="flex gap-2 flex-wrap mb-5">
                    {project.status.map((s, i) => (
                        <span
                            key={i}
                            className="bg-secondary border border-border/40 px-4 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-widest text-muted-foreground"
                        >
                            {s}
                        </span>
                    ))}
                </div>
                <h1
                    className="font-big-shoulders font-[900] leading-[1.05] tracking-tight mb-5"
                    style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
                >
                    {project.title}
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-10">
                    {project.description}
                </p>
                <div className="flex gap-3">
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                        >
                            Live Demo ↗
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-border px-6 py-2.5 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                        >
                            GitHub ↗
                        </a>
                    )}
                </div>
            </div >

            {/* Objective */}
            {
                project.objective && (
                    <div className="mb-20">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium mb-6">
                            01 — Objective
                        </p>
                        <h2 className="font-big-shoulders font-[900] text-3xl mb-5">
                            The Problem
                        </h2>
                        <div className="text-muted-foreground text-base leading-[1.85] max-w-2xl space-y-4">
                            {project.objective.split("\n\n").map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                        {project.images?.[0] && (
                            <div
                                className="w-full rounded-xl aspect-[16/9] mt-9 border border-border/40"
                                style={{
                                    backgroundImage: `url("${project.images[0]}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundColor: "hsl(var(--muted))",
                                }}
                            />
                        )}
                    </div>
                )
            }

            {/* Solution */}
            {
                project.solution && (
                    <div className="mb-20">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium mb-6">
                            02 — Solution
                        </p>
                        <h2 className="font-big-shoulders font-[900] text-3xl mb-5">
                            The Approach
                        </h2>
                        <div className="text-muted-foreground text-base leading-[1.85] max-w-2xl space-y-4">
                            {project.solution.split("\n\n").map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                        {project.images?.length >= 3 && (
                            <div className="grid grid-cols-2 gap-3 mt-9 max-sm:grid-cols-1">
                                {project.images.slice(1, 3).map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-video rounded-xl border border-border/40"
                                        style={{
                                            backgroundImage: `url("${img}")`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundColor: "hsl(var(--muted))",
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )
            }

            {/* Tech Stack & Features */}
            <div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1 mb-20">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium mb-5">
                        Tech Stack
                    </p>
                    <ul className="flex flex-col">
                        {project.techStack.map((tech, i) => (
                            <li
                                key={i}
                                className="text-muted-foreground text-sm py-3 border-b border-border/40 flex items-center gap-2.5 last:border-0"
                            >
                                <span className="w-1 h-1 rounded-full bg-muted-foreground/60 flex-shrink-0" />
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium mb-5">
                        Features
                    </p>
                    <ul className="flex flex-col">
                        {project.features.map((feat, i) => (
                            <li
                                key={i}
                                className="text-muted-foreground text-sm py-3 border-b border-border/40 flex items-center gap-2.5 last:border-0"
                            >
                                <span className="w-1 h-1 rounded-full bg-muted-foreground/60 flex-shrink-0" />
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Next Project */}
            {
                nextProject && nextProject.slug !== params.slug && (
                    <div className="border-t border-border/40 pt-12">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60 font-medium mb-8">
                            Next Project
                        </p>
                        <Link
                            href={`/project/${nextProject.slug}`}
                            className="flex items-center justify-between px-7 py-6 rounded-xl border border-border/40 hover:bg-secondary transition-colors group"
                        >
                            <div>
                                <p className="font-big-shoulders font-[900] text-2xl mb-1 group-hover:text-primary transition-colors">
                                    {nextProject.title}
                                </p>
                                <p className="text-muted-foreground text-sm">{nextProject.description}</p>
                            </div>
                            <ArrowLeft size={20} className="text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )
            }

        </main >
    )
}

export async function generateStaticParams() {
    return projectItems.map((p) => ({ slug: p.slug }))
}