'use client'
import { useRef } from "react"
import Link from "next/link"
import FlipLink from "../ui/FlipLink"
import { Project } from "@/lib/schema/project-schema";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap"

const ProjectSection = ({ projects }: { projects: Project[] }) => {
    const ref = useRef<HTMLElement>(null)

    useGSAP(() => {
        if (prefersReducedMotion()) return

        const cards = gsap.utils.toArray<HTMLElement>("[data-card]")
        if (!cards.length) return

        gsap.set(cards, { opacity: 0, y: 40 })
        gsap.set("[data-card-img]", { scale: 1.15 })

        ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                    overwrite: true,
                    clearProps: "opacity,transform",
                })
                gsap.to(
                    batch.map((card) => card.querySelector("[data-card-img]")),
                    {
                        scale: 1,
                        duration: 1.3,
                        stagger: 0.12,
                        ease: "power3.out",
                        overwrite: true,
                        clearProps: "transform",
                    }
                )
            },
        })
    }, { scope: ref, dependencies: [projects.length] })

    return (
        <section ref={ref} className="flex flex-col gap-16 my-24 px-8 w-full max-w-6xl mx-auto">
            <div className='flex gap-0.5 w-full'>
                <FlipLink
                    href="/project"
                    lineHeight={0.85}
                    className="text-primary text-3xl"
                >
                    Projects
                </FlipLink>
                <p className='font-light text-muted-foreground'>03</p>
            </div>

            <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                {projects.map((data, idx) => (
                    <Link
                        href={`/project/${data.slug}`}
                        key={idx}
                        data-card
                        className="group flex flex-col gap-2"
                    >
                        <div className="relative w-full overflow-hidden rounded-lg bg-muted-foreground/60 aspect-[16/9]">
                            <div data-card-img className="absolute inset-0">
                                <div
                                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url("${data.image}")`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <h2 className="font-big-shoulders font-[900] text-xl">{data.title}</h2>
                                <h3 className="text-muted-foreground font-medium">{data.description}</h3>
                                <div className="flex gap-2">
                                    <h3
                                        className="bg-secondary py-2 px-4 rounded-full text-sm font-medium"
                                    >
                                        {data.status[0]}
                                    </h3>
                                    {data.status[1] && (
                                        <h3
                                            className="bg-secondary py-2 px-4 rounded-full text-sm font-medium"
                                        >
                                            {data.status[1]}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ProjectSection