'use client'

import { TransitionRouter } from 'next-transition-router'
import React, { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'

type Props = {
    children: ReactNode
}

const TransitionProvider = ({ children }: Props) => {
    const transitionOverlayRef = useRef<HTMLDivElement | null>(null)
    const svgPathRef = useRef<SVGPathElement | null>(null)

    useEffect(() => {
        const init = async () => {
            const { DrawSVGPlugin } = await import('gsap/DrawSVGPlugin')
            gsap.registerPlugin(DrawSVGPlugin)

            if (svgPathRef.current) {
                gsap.set(svgPathRef.current, {
                    drawSVG: "0%",
                    strokeWidth: 2,
                })
            }
        }

        init()
    }, [])

    return (
        <TransitionRouter
            auto
            leave={(next) => {
                if (!transitionOverlayRef.current || !svgPathRef.current) return

                const tl = gsap.timeline()

                tl.to(transitionOverlayRef.current, {
                    opacity: 1,
                    duration: .5,
                    ease: "power2.inOut",
                })
                    .to(svgPathRef.current, {
                        drawSVG: "100%",
                        strokeWidth: 300,
                        duration: 1.5,
                        ease: "power2.inOut",
                    }, 0)
                    .call(() => next())

                return () => tl.kill()
            }}

            enter={(next) => {
                if (!transitionOverlayRef.current || !svgPathRef.current) return

                const tl = gsap.timeline()

                tl.to(svgPathRef.current, {
                    drawSVG: "100% 100%",
                    strokeWidth: 2,
                    duration: 1.5,
                    ease: "power2.inOut",
                })
                    .to(transitionOverlayRef.current, {
                        opacity: 0,
                        duration: .5,
                        ease: "power2.inOut",
                    }, 1)
                    .set(svgPathRef.current, {
                        drawSVG: "0%",
                        strokeWidth: 2,
                    })
                    .call(() => next())

                return () => tl.kill()
            }}
        >
            <div
                ref={transitionOverlayRef}
                className='fixed inset-0 pointer-events-none z-[999] flex items-center justify-center opacity-0'
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1316 664"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full scale-125 h-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <path
                        ref={svgPathRef}
                        d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
                        stroke="#2b00ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {children}
        </TransitionRouter>
    )
}

export default TransitionProvider