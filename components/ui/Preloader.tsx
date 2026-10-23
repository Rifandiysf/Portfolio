'use client'
import { useRef } from "react"
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap"

type Props = {
    onReveal: () => void
    onComplete: () => void
}

const greetings = [
    { text: "Hello", lang: "English" },
    { text: "안녕하세요", lang: "한국어" },
    { text: "こんにちは", lang: "日本語" },
    { text: "Bonjour", lang: "Français" },
    { text: "Hola", lang: "Español" },
    { text: "Ciao", lang: "Italiano" },
    { text: "Hallo", lang: "Deutsch" },
    { text: "مرحبا", lang: "العربية" },
    { text: "Halo", lang: "Indonesia" },
]

const PROGRESS_DURATION = 1.6

const Preloader = ({ onReveal, onComplete }: Props) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<HTMLSpanElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const greetingRef = useRef<HTMLDivElement>(null)
    const langRef = useRef<HTMLSpanElement>(null)

    const callbacks = useRef({ onReveal, onComplete })
    callbacks.current = { onReveal, onComplete }

    useGSAP(() => {
        if (prefersReducedMotion()) {
            callbacks.current.onReveal()
            callbacks.current.onComplete()
            return
        }

        const counter = counterRef.current
        const greeting = greetingRef.current
        const lang = langRef.current
        if (!counter || !greeting || !lang) return

        const tl = gsap.timeline({ onComplete: () => callbacks.current.onComplete() })

        const progress = { value: 0 }
        tl.to(progress, {
            value: 100,
            duration: PROGRESS_DURATION,
            ease: "power2.inOut",
            onUpdate: () => {
                counter.textContent = `${Math.round(progress.value)}%`
            },
        }, 0)
        tl.fromTo(barRef.current, { scaleX: 0 }, {
            scaleX: 1,
            duration: PROGRESS_DURATION,
            ease: "power2.inOut",
        }, 0)

        const step = PROGRESS_DURATION / greetings.length
        for (let i = 1; i < greetings.length; i++) {
            const at = i * step
            tl.to(greeting, { y: -24, opacity: 0, duration: 0.07, ease: "power2.in" }, at)
                .call(() => {
                    greeting.textContent = greetings[i].text
                    lang.textContent = greetings[i].lang
                }, undefined, at + 0.07)
                .fromTo(greeting,
                    { y: 24, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.1, ease: "power2.out" },
                    at + 0.07
                )
        }

        tl.addLabel("exit", PROGRESS_DURATION + 0.15)
        tl.to(overlayRef.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "exit")
        tl.call(() => callbacks.current.onReveal(), undefined, "exit+=0.35")
    }, { scope: overlayRef })

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-background flex flex-col justify-between px-8 py-10 will-change-transform"
        >
            <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50 font-medium">
                    Portfolio
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50 font-medium">
                    Loading
                </span>
            </div>

            <div className="flex flex-col items-start gap-3 overflow-hidden">
                <span
                    ref={langRef}
                    className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/40 font-medium"
                >
                    {greetings[0].lang}
                </span>

                <div className="overflow-hidden">
                    <div
                        ref={greetingRef}
                        className="font-big-shoulders font-[900] leading-none tracking-[-0.04em] text-primary"
                        style={{ fontSize: "clamp(56px, 12vw, 130px)" }}
                    >
                        {greetings[0].text}
                    </div>
                </div>

                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/30 font-medium mt-1">
                    Junior Frontend Developer · Bandung, Indonesia
                </span>
            </div>

            <div className="flex flex-col gap-3">
                <span
                    ref={counterRef}
                    className="font-big-shoulders font-[900] text-4xl text-primary tabular-nums"
                >
                    0%
                </span>
                <div className="w-full h-[1px] bg-border/40 relative overflow-hidden rounded-full">
                    <div
                        ref={barRef}
                        className="absolute inset-0 bg-primary origin-left"
                        style={{ transform: "scaleX(0)" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Preloader
