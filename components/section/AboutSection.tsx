'use client'
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ScrollVelocity from "../ScrollVelocity"
import FlipLink from "../ui/FlipLink"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Dropdown from "../ui/Dropdown"

const techStack = [
    'TYPESCRIPT', 'JAVASCRIPT', 'TAILWIND CSS',
    'NEXT JS', 'REACT', 'FIGMA'
]

const AboutSection = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <>
            <section ref={ref} className="flex flex-col gap-14 my-24 px-8 w-full max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-baseline gap-1.5">
                    <FlipLink href="/about" lineHeight={0.85} className="text-primary text-3xl">
                        About
                    </FlipLink>
                    <p className="font-light text-muted-foreground text-sm">02</p>
                </div>

                <div className="grid grid-cols-2 gap-16 items-start max-sm:grid-cols-1 max-sm:gap-10">
                    {/* tagline */}
                    <motion.p
                        className="font-medium text-xl leading-relaxed text-muted-foreground"
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        Fresh graduate passionate about the intersection of{" "}
                        <span className="text-primary font-semibold">creativity & technology</span>
                        {" "}— crafting engaging, user-friendly digital experiences that work and feel good.
                    </motion.p>

                    {/* bio and links */}
                    <motion.div
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
                    >
                        <p className="text-base leading-[1.85] text-muted-foreground">
                            Recently graduated from a vocational high school in Software Development.
                            I&apos;ve already shipped real projects — from a real-time counseling system
                            for my school, to a production leave management app during a 5-month internship
                            at PT. Walden Global Service.
                        </p>

                        <div className="flex gap-3 flex-wrap pt-2">
                            <div className="relative mt-8 w-fit">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] font-medium border border-border/60 px-5 py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                                >
                                    More about me <ArrowUpRight size={12} />
                                </Link>
                            </div>
                            <Dropdown
                                title="Get Resume"
                                options={[
                                    { label: "English", href: "/pdf/Rifandi-Yusuf-Resume-(English).pdf", download: true },
                                    { label: "Indonesia", href: "/pdf/Rifandi-Yusuf-Resume-(Indonesia).pdf", download: true },
                                ]}
                            />
                        </div>
                    </motion.div>
                </div >

                <motion.div
                    className="grid grid-cols-3 gap-0 border-t border-border/40 pt-10 max-sm:grid-cols-1"
                    initial={{ opacity: 0, y: 20 }
                    }
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.24 }}
                >
                    {
                        [
                            { num: "2+", label: "Projects Shipped" },
                            { num: "5mo", label: "Internship Experience" },
                            { num: "6+", label: "Tech Stack Mastered" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-1 pr-10 max-sm:py-6 max-sm:border-b max-sm:border-border/40 max-sm:pr-0 last:max-sm:border-0"
                            >
                                <span className="font-big-shoulders font-[900] text-4xl text-primary tracking-tight">
                                    {stat.num}
                                </span>
                                <span className="text-[12px] uppercase tracking-[0.1em] text-muted-foreground/60 font-medium">
                                    {stat.label}
                                </span>
                            </div>
                        ))
                    }
                </motion.div>
            </section >

            {/* Scroll velocity */}
            < ScrollVelocity
                texts={techStack}
                velocity={50}
                damping={70}
                numCopies={2}
                className="text-foreground font-big-shoulders"
                parallaxClassName="pt-8 mask-x-from-80% mask-x-to-100%"
            />
            <ScrollVelocity
                texts={techStack}
                velocity={-50}
                damping={70}
                numCopies={2}
                className="text-foreground font-big-shoulders"
                parallaxClassName="pb-8 mask-x-from-80% mask-x-to-100%"
            />
        </>
    )
}

export default AboutSection