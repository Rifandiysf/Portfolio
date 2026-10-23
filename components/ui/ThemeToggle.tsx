'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

const BRAND = '#2b00ff'
const BACKGROUND = { light: '#ffffff', dark: '#121212' } as const

export default function ThemeToggle({ className }: { className?: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const iconRef = useRef<HTMLSpanElement>(null)
    const isAnimating = useRef(false)
    const previousTheme = useRef<string | undefined>(undefined)

    useEffect(() => setMounted(true), [])

    const isDark = mounted && resolvedTheme === 'dark'

    const { contextSafe } = useGSAP({ scope: buttonRef })

    const toggle = contextSafe(() => {
        if (isAnimating.current) return

        const next = isDark ? 'light' : 'dark'
        const overlay = overlayRef.current
        const button = buttonRef.current

        if (!overlay || !button || prefersReducedMotion()) {
            setTheme(next)
            return
        }

        isAnimating.current = true

        const rect = button.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        const radius =
            Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            ) + 2

        gsap
            .timeline({
                onComplete: () => {
                    gsap.set(overlay, { visibility: 'hidden' })
                    isAnimating.current = false
                },
            })
            .set(overlay, {
                visibility: 'visible',
                opacity: 1,
                backgroundColor: BRAND,
                clipPath: `circle(0px at ${x}px ${y}px)`,
            })
            .to(overlay, {
                clipPath: `circle(${radius}px at ${x}px ${y}px)`,
                duration: 0.55,
                ease: 'power3.inOut',
            })
            .call(() => setTheme(next))
            .to(overlay, {
                backgroundColor: BACKGROUND[next],
                duration: 0.3,
                ease: 'power1.inOut',
            })
            .to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.out' })
    })

    useGSAP(
        () => {
            if (!resolvedTheme) return
            const first = previousTheme.current === undefined
            previousTheme.current = resolvedTheme
            if (first || prefersReducedMotion()) return
            gsap.fromTo(
                iconRef.current,
                { rotate: -90, scale: 0.5, opacity: 0 },
                { rotate: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
            )
        },
        { scope: buttonRef, dependencies: [resolvedTheme] }
    )

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                onClick={toggle}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={cn(
                    'flex size-10 items-center justify-center rounded-full border border-border/60 text-foreground cursor-pointer transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                    className
                )}
            >
                <span ref={iconRef} className="flex">
                    {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
                </span>
            </button>

            {mounted &&
                createPortal(
                    <div
                        ref={overlayRef}
                        aria-hidden="true"
                        className="pointer-events-none fixed inset-0 z-[1000]"
                        style={{ visibility: 'hidden' }}
                    />,
                    document.body
                )}
        </>
    )
}