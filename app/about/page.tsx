import ScrollVelocity from "@/components/ScrollVelocity"
import Dropdown from "@/components/ui/Dropdown"
import { experiences, services } from "@/lib/api"

const techStack = [
    'TYPESCRIPT', 'JAVASCRIPT', 'TAILWIND CSS',
    'NEXT JS', 'REACT', 'FIGMA'
]

const AboutPage = () => {
    return (
        <main className="min-h-screen">

            {/* Hero */}
            <section className="px-8 pt-20 pb-0 max-w-5xl mx-auto">
                <div className="grid grid-cols-2 gap-10 mb-20 items-start max-sm:grid-cols-1">

                    {/* Year block */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/50 font-medium">
                            Since
                        </span>
                        <span
                            className="font-big-shoulders font-[900] leading-[0.9] tracking-[-0.04em] text-primary"
                            style={{ fontSize: "clamp(64px, 10vw, 96px)" }}
                        >
                            2023
                        </span>
                        <span className="text-sm uppercase tracking-[0.1em] text-muted-foreground font-medium mt-2">
                            Present
                        </span>
                    </div>

                    {/* Photo */}
                    <div
                        className="aspect-[3/4] h-64 rounded-xl bg-muted border border-border/40 flex items-center justify-center justify-self-end"
                        style={{
                            backgroundImage: `url("/images/ProfilePicture.jpg")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "hsl(var(--muted))",
                        }}
                    >
                    </div>
                </div>

                {/* Bio */}
                <div className="border-t border-border/40 pt-10 mb-20">
                    <p className="text-xl font-light italic text-muted-foreground leading-relaxed max-w-2xl">
                        <span className="not-italic font-medium text-primary">Fresh graduate & aspiring Frontend Developer</span>{" "}
                        based in Indonesia — recently completed high school with a focus in Software Development,
                        and already shipping real projects.
                    </p>
                    <p className="text-base font-medium text-muted-foreground leading-relaxed max-w-2xl mt-6">
                        I may be early in my career, but I&apos;ve spent the last few years building things that matter —
                        from a real-time counseling system used at my school, to a production leave management app
                        during a 5-month internship. I care deeply about clean UI, good UX, and writing code
                        that&apos;s easy to maintain and scale.
                    </p>
                    <Dropdown
                        title="Get Resume"
                        options={[
                            { label: "English", href: "/pdf/Rifandi-Yusuf-Resume-(English).pdf", download: true },
                            { label: "Indonesia", href: "/pdf/Rifandi-Yusuf-Resume-(Indonesia).pdf", download: true },
                        ]}
                    />
                </div>
            </section>

            {/* Services */}
            <section className="px-8 pb-20 max-w-5xl mx-auto">
                <h2
                    className="font-big-shoulders font-[900] leading-[0.95] tracking-[-0.03em] text-primary mb-10"
                    style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
                >
                    SERVICES
                </h2>
                <div className="grid grid-cols-2 max-sm:grid-cols-1">
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className={`border-t border-border/40 py-7 flex gap-5 items-start
                ${i % 2 === 0 ? "pr-6 border-r border-border/40 max-sm:border-r-0 max-sm:pr-0" : "pl-6 max-sm:pl-0"}
                ${i >= services.length - 2 ? "border-b border-border/40" : ""}
                `}
                        >
                            <span className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/40 font-medium min-w-[28px] mt-1">
                                {s.num}
                            </span>
                            <div>
                                <p className="text-base font-medium text-primary mb-2">{s.name}</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="px-8 pb-20 max-w-5xl mx-auto">
                <h2
                    className="font-big-shoulders font-[900] leading-[0.95] tracking-[-0.03em] text-primary mb-10"
                    style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
                >
                    EXPERIENCES
                </h2>
                <div className="flex flex-col">
                    {experiences.map((exp, i) => (
                        <div
                            key={i}
                            className="grid border-t border-border/40 py-7 last:border-b last:border-border/40 gap-6"
                            style={{ gridTemplateColumns: "80px 1fr" }}
                        >
                            <span className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground/50 font-medium pt-1">
                                {exp.year}
                            </span>
                            <div>
                                <p className="text-lg font-medium text-primary mb-1">{exp.role}</p>
                                <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-medium mb-4">
                                    {exp.company}
                                </p>
                                <p className="text-sm leading-[1.8] text-muted-foreground">{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tech Stack Scroll */}
            <ScrollVelocity
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
                parallaxClassName="pb-16 mask-x-from-80% mask-x-to-100%"
            />

        </main>
    )
}

export default AboutPage