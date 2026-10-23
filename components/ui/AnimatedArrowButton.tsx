'use client'
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { gsap, useGSAP } from "@/lib/gsap"

const DURATION = 0.35

const AnimatedArrowButton = ({ title, className }: { title: string, className?: string }) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useGSAP(() => {
        const button = buttonRef.current
        if (!button) return

        const mm = gsap.matchMedia()
        mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
            gsap.set("[data-arrow-in]", { xPercent: -75, yPercent: 75 })

            const tl = gsap.timeline({ paused: true, defaults: { duration: DURATION, ease: "power2.inOut" } })
            tl.to("[data-arrow-out]", { xPercent: 75, yPercent: -75 }, 0)
                .to("[data-arrow-in]", { xPercent: 0, yPercent: 0 }, 0)
                .to(button, { scale: 1.05, duration: 0.25 }, 0)

            const onEnter = () => tl.play()
            const onLeave = () => tl.reverse()
            const onDown = () => gsap.to(button, { scale: 0.95, duration: 0.12, overwrite: "auto" })
            const onUp = () => gsap.to(button, { scale: tl.progress() > 0 ? 1.05 : 1, duration: 0.25, ease: "back.out(3)", overwrite: "auto" })

            button.addEventListener("mouseenter", onEnter)
            button.addEventListener("mouseleave", onLeave)
            button.addEventListener("pointerdown", onDown)
            button.addEventListener("pointerup", onUp)

            return () => {
                button.removeEventListener("mouseenter", onEnter)
                button.removeEventListener("mouseleave", onLeave)
                button.removeEventListener("pointerdown", onDown)
                button.removeEventListener("pointerup", onUp)
                tl.kill()
            }
        })
    }, { scope: buttonRef })

    return (
        <button
            ref={buttonRef}
            className={cn("relative flex justify-center items-center gap-1 bg-primary w-44 px-4 py-1.5 font-bold text-lg rounded-full cursor-pointer overflow-hidden", className)}
        >
            <span className="text-primary-foreground">{title}</span>

            <div className="relative w-6 h-6 overflow-hidden rounded-full">
                <span data-arrow-out className="absolute inset-0 flex items-center justify-center">
                    <ArrowUpRight size={24} color="#fff" />
                </span>
                <span data-arrow-in aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                    <ArrowUpRight size={24} color="#fff" />
                </span>
            </div>
        </button>
    )
}

export default AnimatedArrowButton
