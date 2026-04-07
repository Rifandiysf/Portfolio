'use client'
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { experienceItem } from "@/lib/api"
import FlipLink from "../ui/FlipLink"
import Dropdown from "../ui/Dropdown"

const ExperienceSection = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section ref={ref} className="flex flex-col gap-14 my-24 px-8 w-full max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-baseline gap-1.5">
                <FlipLink href="#" lineHeight={0.85} className="text-primary text-3xl">
                    Experience
                </FlipLink>
                <p className="font-light text-muted-foreground text-sm">04</p>
            </div>

            <div className="flex flex-col">
                {experienceItem.map((data, idx) => (
                    <motion.div
                        key={idx}
                        className="grid border-t border-border/40 py-10 last:border-b last:border-border/40 gap-8 group"
                        style={{ gridTemplateColumns: "1fr 2fr" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                    >
                        {/* meta */}
                        <div className="flex flex-col gap-2 pt-1">
                            <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/40 font-medium">
                                {data.date}
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/60 font-medium mt-1">
                                {data.companyName}
                            </span>
                        </div>

                        {/* content */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold text-primary leading-snug">
                                {data.role}
                            </h2>
                            <p className="text-sm leading-[1.85] text-muted-foreground">
                                {data.description}
                            </p>

                            {/* Tags*/}
                            {data.techStack && (
                                <div className="flex gap-2 flex-wrap pt-2">
                                    {data.techStack.map((tech: string, i: number) => (
                                        <span
                                            key={i}
                                            className="text-[11px] uppercase tracking-[0.07em] font-medium px-3 py-1.5 rounded-full bg-secondary border border-border/40 text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* CTA */}
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