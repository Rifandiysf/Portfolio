'use client'
import { useState } from "react"
import { ArrowUpRight, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

const EMAILJS_SERVICE_ID = "service_ta7jdhb"
const EMAILJS_TEMPLATE_ID = "template_nipigip"
const EMAILJS_PUBLIC_KEY = "mf_ipwQ-g3ZLJgzwQ"

const services = [
    "Frontend Dev",
    "UI/UX Design",
    "Web App",
    "Collaboration",
]

const ContactPage = () => {
    const [selected, setSelected] = useState("Frontend Dev")
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("loading")

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    service: selected,
                    message: form.message,
                },
                EMAILJS_PUBLIC_KEY
            )
            setStatus("sent")
            setForm({ name: "", email: "", message: "" })
        } catch {
            setStatus("error")
        }
    }

    return (
        <main className="px-8 pt-20 pb-32 max-w-6xl mx-auto">

            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50 font-medium mb-5">
                Let&apos;s work together
            </p>
            <h1
                className="font-big-shoulders font-[900] leading-[0.92] tracking-[-0.04em] text-primary mb-16"
                style={{ fontSize: "clamp(56px, 10vw, 110px)" }}
            >
                <span className="block">CONTACT</span>
                <span className="block">WITH ME</span>
            </h1>

            <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start max-sm:grid-cols-1 max-sm:gap-12">

                {/* Info Column */}
                <div className="flex flex-col">
                    {[
                        {
                            label: "Availability",
                            content: (
                                <span className="text-muted-foreground leading-relaxed">
                                    Open for opportunities<br />
                                    Monday – Friday<br />
                                    9am – 5pm WIB
                                </span>
                            ),
                        },
                        {
                            label: "Email",
                            content: (
                                <a
                                    href="mailto:rifandiyusuf47@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary font-medium hover:opacity-70 transition-opacity"
                                >
                                    rifandiyusuf47@gmail.com
                                </a>
                            ),
                        },
                        {
                            label: "Location",
                            content: (
                                <span className="text-muted-foreground leading-relaxed">
                                    Bandung, West Java<br />Indonesia
                                </span>
                            ),
                        },
                        {
                            label: "Social",
                            content: (
                                <div className="flex gap-3 flex-wrap">
                                    {[
                                        { name: "GitHub", href: "https://github.com/Rifandiysf" },
                                        { name: "LinkedIn", href: "https://linkedin.com/in/rifandiyusuf" },
                                        { name: "Instagram", href: "https://instagram.com/rifandiysf" },
                                    ].map((s) => (
                                        <a
                                            key={s.name}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary font-medium hover:opacity-70 transition-opacity"
                                        >
                                            {s.name}
                                        </a>
                                    ))}
                                </div>
                            ),
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="border-b border-border/40 py-7 first:border-t first:border-border/40"
                        >
                            <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/40 font-medium mb-3">
                                {item.label}
                            </p>
                            <div className="text-[15px]">{item.content}</div>
                        </div>
                    ))}
                </div>

                {/* Form Column */}
                <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/40 font-medium mb-4">
                        I can help with
                    </p>
                    <div className="flex flex-wrap gap-2 mb-10">
                        {services.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setSelected(s)}
                                className={`text-[12px] uppercase tracking-[0.07em] font-medium px-4 py-2 rounded-full border transition-all duration-200
                                    ${selected === s
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "border-border/60 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Success */}
                    {status === "sent" ? (
                        <div className="border border-border/40 rounded-xl p-10 text-center">
                            <p className="font-big-shoulders font-[900] text-3xl text-primary mb-3">
                                Message Sent!
                            </p>
                            <p className="text-muted-foreground text-sm">
                                Thanks for reaching out — I&apos;ll get back to you soon.
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="self-start inline-flex items-center gap-2.5 mt-6 text-[12px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                Send another <ArrowUpRight size={15} />
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                            {[
                                { label: "Your Name", key: "name", type: "text", placeholder: "John Doe" },
                                { label: "Email Address", key: "email", type: "email", placeholder: "john@email.com" },
                            ].map((field) => (
                                <div key={field.key} className="flex flex-col gap-2">
                                    <label className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/40 font-medium">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        required
                                        value={form[field.key as keyof typeof form]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="bg-transparent border-b border-border/40 pb-3 text-[15px] text-primary placeholder:text-muted-foreground/30 outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                            ))}

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground/40 font-medium">
                                    Message
                                </label>
                                <textarea
                                    placeholder="Tell me about your project or idea..."
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className="bg-transparent border-b border-border/40 pb-3 text-[15px] text-primary placeholder:text-muted-foreground/30 outline-none focus:border-primary transition-colors resize-none"
                                />
                            </div>

                            {/* Error */}
                            {status === "error" && (
                                <p className="text-sm text-red-500">
                                    Something went wrong. Please try again or email me directly.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="self-start inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-[13px] font-medium uppercase tracking-[0.06em] hover:opacity-85 transition-opacity mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message <ArrowUpRight size={15} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

            </div >
        </main >
    )
}

export default ContactPage