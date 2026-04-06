import Link from "next/link"
import { projectItems } from "@/lib/api"
import { ArrowUpRight } from "lucide-react"

const ProjectsPage = () => {
    return (
        <main className="px-8 pt-20 pb-32 max-w-5xl mx-auto">

            {/* Page Title */}
            <h1
                className="font-big-shoulders font-[900] leading-[0.92] tracking-[-0.04em] text-primary mb-20"
                style={{ fontSize: "clamp(56px, 10vw, 120px)" }}
            >
                SELECTED<br />WORKS
            </h1>

            {/* Project List */}
            <div className="flex flex-col">
                {projectItems.map((project, idx) => (
                    <div
                        key={project.slug}
                        className="border-t border-border/40 pt-10 last:border-b last:pb-10"
                    >
                        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-6">
                            <div className="flex items-baseline gap-5">
                                <span className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground/50 font-medium mt-0.5">
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                <h2
                                    className="font-big-shoulders font-[900] leading-none tracking-[-0.02em] text-primary"
                                    style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
                                >
                                    {project.title}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                                <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-medium">
                                    {project.status[0]}
                                </span>
                                <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/50">
                                    {project.year}
                                </span>
                                <Link
                                    href={`/project/${project.slug}`}
                                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground border border-border/60 px-4 py-2 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                >
                                    See Project <ArrowUpRight size={12} />
                                </Link>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-6">
                            {project.techStack.slice(0, 3).map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-[11px] uppercase tracking-[0.07em] font-medium px-3 py-1.5 rounded-full bg-secondary border border-border/40 text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Cover Image */}
                        <Link href={`/project/${project.slug}`} className="block group">
                            <div
                                className="w-full rounded-xl aspect-[16/9] mb-12 bg-muted border border-border/40 overflow-hidden transition-transform duration-500 group-hover:scale-[0.99]"
                                style={{
                                    backgroundImage: `url("${project.image}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                        </Link>
                    </div>
                ))}
            </div>

        </main>
    )
}

export default ProjectsPage