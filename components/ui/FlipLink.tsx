'use client'
import { useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsap";

const DURATION = 0.25
const STAGGER = 0.025

export default function FlipLink({ children, href, className, lineHeight = 0.75 }: { children: string, href: string, className?: string, lineHeight?: number }) {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const letters = children.split("")

    useGSAP(() => {
        const link = linkRef.current
        if (!link) return

        const mm = gsap.matchMedia()
        mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
            const top = link.querySelectorAll("[data-flip-top] > span")
            const bottomGroup = link.querySelector("[data-flip-bottom]")
            const bottom = link.querySelectorAll("[data-flip-bottom] > span")

            gsap.set(bottomGroup, { visibility: "visible" })
            gsap.set(bottom, { yPercent: 100 })

            const tl = gsap.timeline({
                paused: true,
                defaults: { duration: DURATION, ease: "power2.inOut" },
            })
            tl.to(top, { yPercent: -100, stagger: STAGGER }, 0)
                .to(bottom, { yPercent: 0, stagger: STAGGER }, 0)

            const onEnter = () => tl.play()
            const onLeave = () => tl.reverse()
            link.addEventListener("mouseenter", onEnter)
            link.addEventListener("mouseleave", onLeave)
            link.addEventListener("focus", onEnter)
            link.addEventListener("blur", onLeave)

            return () => {
                link.removeEventListener("mouseenter", onEnter)
                link.removeEventListener("mouseleave", onLeave)
                link.removeEventListener("focus", onEnter)
                link.removeEventListener("blur", onLeave)
                tl.kill()
            }
        })
    }, { scope: linkRef })

    return (
        <Link
            ref={linkRef}
            href={href}
            className={cn("relative block overflow-hidden whitespace-nowrap text-lg font-black text-foreground uppercase", className)}
            style={{ lineHeight }}
        >
            <div data-flip-top>
                {letters.map((letter, idx) => (
                    <span key={idx} className="inline-block">{letter}</span>
                ))}
            </div>
            <div data-flip-bottom aria-hidden="true" className="invisible absolute inset-0">
                {letters.map((letter, idx) => (
                    <span key={idx} className="inline-block">{letter}</span>
                ))}
            </div>
        </Link>
    )
}
