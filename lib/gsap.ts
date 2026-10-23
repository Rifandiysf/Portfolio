import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin)

gsap.defaults({ overwrite: "auto" })

ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
})

if (typeof window !== "undefined" && "fonts" in document) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
}

export { gsap, ScrollTrigger, useGSAP }

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

type BatchRevealOptions = {
    y?: number
    duration?: number
    stagger?: number
    start?: string
}

export function batchReveal(
    targets: gsap.TweenTarget,
    { y = 24, duration = 0.8, stagger = 0.1, start = "top 88%" }: BatchRevealOptions = {}
) {
    const elements = gsap.utils.toArray<HTMLElement>(targets)
    if (!elements.length || prefersReducedMotion()) return

    gsap.set(elements, { opacity: 0, y })

    ScrollTrigger.batch(elements, {
        start,
        once: true,
        onEnter: (batch) =>
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease: "power3.out",
                overwrite: true,
                clearProps: "opacity,transform",
            }),
    })
}
