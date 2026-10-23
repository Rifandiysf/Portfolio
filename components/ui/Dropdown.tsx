"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Option = {
    label: string;
    href: string;
    download?: boolean;
};

type MotionDropdownButtonProps = {
    title?: string;
    options: Option[];
};

export default function Dropdown({
    title = "Download CV",
    options,
}: MotionDropdownButtonProps) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!open || !menuRef.current || prefersReducedMotion()) return;
        gsap.fromTo(
            menuRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.25, ease: "power3.out" }
        );
        gsap.from("[data-dropdown-item]", {
            opacity: 0,
            y: 6,
            duration: 0.25,
            stagger: 0.05,
            delay: 0.05,
            ease: "power2.out",
        });
    }, { scope: rootRef, dependencies: [open] });

    const { contextSafe } = useGSAP({ scope: rootRef });
    const toggle = contextSafe(() => {
        if (!open) return setOpen(true);
        if (prefersReducedMotion() || !menuRef.current) return setOpen(false);
        gsap.to(menuRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.18,
            ease: "power2.in",
            overwrite: true,
            onComplete: () => setOpen(false),
        });
    });

    return (
        <div ref={rootRef} className="relative mt-8 w-fit">
            <button
                onClick={toggle}
                aria-expanded={open}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] font-medium border border-border/60 px-5 py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 active:scale-[0.97] cursor-pointer transition-all duration-200"
            >
                {title} <ArrowUpRight size={13} />
            </button>

            {open && (
                <div
                    ref={menuRef}
                    className="absolute left-0 mt-3 w-44 rounded-xl border border-border/50 bg-background shadow-lg overflow-hidden"
                >
                    {options.map((item, index) => (
                        <a
                            key={index}
                            data-dropdown-item
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={item.download}
                            className="block px-4 py-2 text-sm hover:bg-muted transition"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
