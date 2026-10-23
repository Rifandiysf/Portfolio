'use client'
import { useRef } from "react"
import { useGSAP, batchReveal } from "@/lib/gsap"
import FlipLink from "../ui/FlipLink"
import Dropdown from "../ui/Dropdown"
import { Experience } from "@/lib/schema/experience-schema";

const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => {
    const ref = useRef<HTMLElement>(null)

    useGSAP(() => {
        batchReveal("[data-reveal]", { y: 20, duration: 0.7, stagger: 0.1 })
    }, { scope: ref, dependencies: [experiences.length] })

    return (
        <section ref={ref} className="flex flex-col gap-14 my-24 px-8 w-full max-w-6xl mx-auto">
            <div className="flex items-baseline gap-1.5">
                <FlipLink href="#" lineHeight={0.85} className="text-primary text-3xl">
                    Experience
                </FlipLink>
                <p className="font-light text-muted-foreground text-sm">04</p>
            </div>

            <div className="flex flex-col">
                {experiences.map((data, idx) => (
                    <div
                        key={idx}
                        data-reveal
                        className="group grid grid-cols-1 gap-4 border-t border-border/40 py-8 last:border-b last:border-border/40 md:grid-cols-[1fr_2fr] md:gap-8 md:py-10"
                    >
                        <div className="flex flex-col gap-1 md:gap-2 md:pt-1">
                            <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground/40">
                                {data.date}
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground/60 md:mt-1">
                                {data.companyName}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3 md:gap-4">
                            <h2 className="text-base font-semibold leading-snug text-primary md:text-lg">
                                {data.role}
                            </h2>
                            <p className="text-sm leading-[1.85] text-muted-foreground">
                                {data.description}
                            </p>

                            {data.techStack && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {data.techStack.map((tech: string, i: number) => (
                                        <span
                                            key={i}
                                            className="rounded-full border border-border/40 bg-secondary px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Dropdown
                title="Get Resume"
                options={[
                    { label: "English", href: "/pdf/Rifandi-Yusuf-Resume-(English).pdf", download: true },
                    { label: "Indonesia", href: "/pdf/Rifandi-Yusuf-Resume-(Indonesia).pdf", download: true },
                ]}
            />

        </section>
    )
}

export default ExperienceSection