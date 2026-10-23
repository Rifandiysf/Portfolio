"use client";
import { useRef } from "react";
import { HeroSectionPros } from "@/lib/types";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { usePreloader } from "@/lib/provider/PreloaderProvider";

const HeroSection = ({
    subtitle = "SUBTITLE",
    title = "YOUR NAME",
    subline = "SUBLINE",
    className,
}: HeroSectionPros) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { ready } = usePreloader();
    const nameParts = title.split(" ");

    useGSAP(() => {
        if (prefersReducedMotion()) return;
        gsap.set("[data-hero-letter]", { yPercent: 110 });
        gsap.set("[data-hero-fade]", { opacity: 0, y: 20 });
    }, { scope: sectionRef });

    useGSAP(() => {
        if (!ready || prefersReducedMotion()) return;

        const tl = gsap.timeline({ delay: 0.05 });
        tl.to("[data-hero-letter]", {
            yPercent: 0,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.04,
            clearProps: "transform",
        }, 0).to("[data-hero-fade]", {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "opacity,transform",
        }, 0.35);
    }, { scope: sectionRef, dependencies: [ready] });

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
            gsap.to(titleRef.current, {
                yPercent: -12,
                opacity: 0.15,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className={cn(
                "flex flex-col justify-center items-center h-screen w-full overflow-hidden",
                className
            )}
        >
            <p data-hero-fade className="font-bold text-muted-foreground">
                {subtitle}
            </p>

            <h1
                ref={titleRef}
                className="flex flex-col text-primary text-center font-big-shoulders font-[900] leading-none tracking-[-5.2px]"
                aria-label={title}
            >
                {nameParts.map((part, wordIndex) => (
                    <span
                        key={wordIndex}
                        aria-hidden="true"
                        className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[14rem] overflow-hidden"
                    >
                        {part.split("").map((char, charIndex) => (
                            <span
                                key={charIndex}
                                data-hero-letter
                                className="inline-block"
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                ))}
            </h1>

            <p data-hero-fade className="font-bold text-muted-foreground">
                {subline}
            </p>
        </section>
    );
};

export default HeroSection;
