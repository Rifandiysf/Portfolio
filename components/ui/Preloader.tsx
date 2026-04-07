'use client'
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

type Props = {
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

const Preloader = ({ onComplete }: Props) => {
    const overlayRef = useRef<HTMLDivElement>(null)
    const counterRef = useRef<HTMLSpanElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const greetingRef = useRef<HTMLDivElement>(null)
    const langRef = useRef<HTMLSpanElement>(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete })

            // Counter + bar (1.8s)
            tl.to(counterRef.current, {
                duration: 1.8,
                ease: "power2.inOut",
                innerText: 100,
                snap: { innerText: 1 },
                onUpdate() {
                    if (counterRef.current) {
                        counterRef.current.textContent =
                            Math.round(Number(counterRef.current.textContent)) + "%"
                    }
                },
            })

            tl.to(barRef.current, {
                width: "100%",
                duration: 1.8,
                ease: "power2.inOut",
            }, "<")

            // Slide up overlay keluar
            tl.to(overlayRef.current, {
                yPercent: -100,
                duration: 0.9,
                ease: "power4.inOut",
                delay: 0.3,
            })
        })

        return () => ctx.revert()
    }, [onComplete])

    // Cycle greetings setiap 200ms — flip animasi per kata
    useEffect(() => {
        let i = 0
        const INTERVAL = 200

        const cycle = () => {
            const el = greetingRef.current
            const lang = langRef.current
            if (!el || !lang) return

            // Slide current keluar ke atas
            gsap.to(el, {
                y: -24,
                opacity: 0,
                duration: 0.15,
                ease: "power2.in",
                onComplete: () => {
                    i = (i + 1) % greetings.length
                    setIndex(i)
                    el.textContent = greetings[i].text
                    lang.textContent = greetings[i].lang
                    // Slide masuk dari bawah
                    gsap.fromTo(el,
                        { y: 24, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" }
                    )
                },
            })
        }

        const timer = setInterval(cycle, INTERVAL)
        // Stop setelah semua greeting tampil + sedikit buffer
        const stop = setTimeout(() => clearInterval(timer), INTERVAL * greetings.length + 400)

        return () => {
            clearInterval(timer)
            clearTimeout(stop)
        }
    }, [])

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-background flex flex-col justify-between px-8 py-10"
        >
            {/* Top */}
            <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50 font-medium">
                    Portfolio
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/50 font-medium">
                    Loading
                </span>
            </div>

            {/* Center — cycling greetings */}
            <div className="flex flex-col items-start gap-3 overflow-hidden">

                {/* Language label */}
                <span
                    ref={langRef}
                    className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/40 font-medium"
                >
                    {greetings[0].lang}
                </span>

                {/* Greeting word */}
                <div className="overflow-hidden">
                    <div
                        ref={greetingRef}
                        className="font-big-shoulders font-[900] leading-none tracking-[-0.04em] text-primary"
                        style={{ fontSize: "clamp(56px, 12vw, 130px)" }}
                    >
                        {greetings[0].text}
                    </div>
                </div>

                {/* Subline tetap */}
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground/30 font-medium mt-1">
                    Junior Frontend Developer · Bandung, Indonesia
                </span>
            </div>

            {/* Bottom — counter + bar */}
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
                        className="absolute left-0 top-0 h-full bg-primary"
                        style={{ width: "0%" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Preloader