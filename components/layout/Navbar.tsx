'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems, socialItems } from '@/app/constants/navbar-constant';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

const getPanelOffset = () => {
    const width = window.innerWidth;
    if (width < 768) return 0;
    if (width < 1024) return 45;
    if (width < 1280) return 55;
    if (width < 1536) return 65;
    return 70;
};

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const menuTl = useRef<gsap.core.Timeline | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const { contextSafe } = useGSAP(() => {
        gsap.set(panelRef.current, { xPercent: 100 });
    }, { scope: rootRef });

    const openMenu = contextSafe(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const layers = gsap.utils.toArray<HTMLElement>('[data-layer]', panel);
        const letters = gsap.utils.toArray<HTMLElement>('[data-letter]', panel);
        const nums = gsap.utils.toArray<HTMLElement>('[data-num]', panel);
        const foot = gsap.utils.toArray<HTMLElement>('[data-foot]', panel);
        const offset = getPanelOffset();

        menuTl.current?.kill();

        if (prefersReducedMotion()) {
            gsap.set(panel, { visibility: 'visible', xPercent: offset });
            gsap.set(layers, { xPercent: 0 });
            gsap.set([letters, nums, foot], { clearProps: 'all' });
            return;
        }

        menuTl.current = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
            .set(panel, { visibility: 'visible' })
            .to(panel, { xPercent: offset, duration: 0.6 }, 0)
            .fromTo(layers, { xPercent: 100 }, { xPercent: 0, duration: 0.6, stagger: 0.08 }, 0)
            .fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.02 }, 0.4)
            .fromTo(nums, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none', stagger: 0.08 }, 0.7)
            .fromTo(foot, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, 0.75);
    });

    const closeMenu = contextSafe(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const layers = gsap.utils.toArray<HTMLElement>('[data-layer]', panel);

        menuTl.current?.kill();

        if (prefersReducedMotion()) {
            gsap.set(panel, { visibility: 'hidden', xPercent: 100 });
            return;
        }

        menuTl.current = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => { gsap.set(panel, { visibility: 'hidden' }); },
        })
            .to(layers, { xPercent: 100, duration: 0.45, stagger: { each: 0.06, from: 'end' } }, 0)
            .to(panel, { xPercent: 100, duration: 0.5 }, 0.1);
    });

    const toggle = () => {
        if (isOpen) closeMenu(); else openMenu();
        setIsOpen((v) => !v);
    };

    const close = () => {
        if (!isOpen) return;
        closeMenu();
        setIsOpen(false);
    };

    useGSAP(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (prefersReducedMotion()) return;
        gsap.fromTo('[data-btn-letter]',
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.03, ease: 'power3.out' }
        );
        gsap.fromTo(iconRef.current,
            { rotate: -90, scale: 0.6 },
            { rotate: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }
        );
    }, { scope: rootRef, dependencies: [isOpen] });

    return (
        <div ref={rootRef}>
            <header className={`fixed top-0 left-0 w-full z-50 transition-colors  ${isScrolled ? "bg-background" : "bg-transparent"}`}>
                <div className="flex items-center justify-between px-6 py-4">

                    <Link href='/' onClick={close} className="flex items-center space-x-2">
                        <div className="sm-logo flex items-center select-none pointer-events-auto" aria-label="Logo">
                            <Image
                                src={'/rifandiysf-logo.svg'}
                                alt="Logo"
                                className="sm-logo-img block h-8 w-auto object-contain"
                                draggable={false}
                                width={110}
                                height={24}
                            />
                        </div>
                        <h1 className="font-extrabold font-big-shoulders text-3xl text-foreground"><span className='font-[900]'>R</span>ysf</h1>
                    </Link>

                    <button
                        onClick={toggle}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        className="flex items-center space-x-2 px-4 py-2 text-foreground text-2xl rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                    >
                        <div className="flex overflow-hidden" aria-hidden="true">
                            {(isOpen ? "Close" : "Menu").split('').map((letter, index) => (
                                <span
                                    key={`${isOpen ? 'close' : 'menu'}-${index}`}
                                    data-btn-letter
                                    className="font-medium inline-block"
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>

                        <div ref={iconRef}>
                            {isOpen ? <X size={24} /> : <Plus size={24} />}
                        </div>
                    </button>
                </div>
            </header>

            <div
                ref={panelRef}
                className="fixed top-0 right-0 w-full h-full z-40 will-change-transform"
                style={{ visibility: 'hidden' }}
                aria-hidden={!isOpen}
            >
                <div data-layer className="absolute inset-0 bg-primary" />
                <div data-layer className="absolute inset-0 bg-[#fa0a5a]" />
                <div data-layer className="absolute inset-0 bg-[#0afaaa]" />
                <div data-layer className="absolute -inset-0.5 bg-background">
                    <div className="flex flex-col items-start h-full px-12 pt-24">
                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.id} className="relative">
                                    <Link
                                        href={item.href}
                                        onClick={close}
                                        className="flex gap-1.5 text-6xl font-bold text-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        <div className="flex overflow-hidden">
                                            {item.label.split('').map((letter, letterIndex) => (
                                                <span key={letterIndex} data-letter className="inline-block">
                                                    {letter}
                                                </span>
                                            ))}
                                        </div>
                                        <span data-num className='text-2xl font-light text-[#5227FF]'>
                                            {item.id}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        <div data-foot className="absolute bottom-16 left-12">
                            <h3 className="text-lg font-semibold text-primary mb-4">Socials</h3>
                            <div className="group/social flex space-x-6 font-semibold text-xl">
                                {socialItems.map((social) => (
                                    <a
                                        key={social.id}
                                        href={social.href}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className="text-foreground transition-colors duration-300 group-hover/social:text-muted-foreground hover:text-primary!"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div data-foot className='absolute bottom-5 left-12'>
                            <h4 className='text-sm font-semibold text-muted-foreground'>
                                Copyright © 2025 Rifandi Yusuf. All rights reserved.
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
