'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Image from 'next/image';

interface MenuItem {
    id: string;
    label: string;
    href: string;
}

const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
    const [isScreenSize, setIsScreenSize] = useState("desktop");
    const [isScrolled, setIsScrolled] = useState(false)

    // Check if mobile
    useEffect(() => {
        const checkScreen = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setIsScreenSize("mobile")
            } else if (width < 1024) {
                setIsScreenSize("tablet")
            } else if (width < 1280) {
                setIsScreenSize("laptop")
            } else if (width < 1536) {
                setIsScreenSize("desktop")
            } else {
                setIsScreenSize("xl")
            }
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const getSidebarPosition = () => {
        switch (isScreenSize) {
            case 'mobile': return '0%';
            case 'tablet': return '45%';
            case 'laptop': return '55%';
            case 'desktop': return '65%';
            case 'xl': return '70%';
            default: return "65%"
        }
    }

    const menuItems: MenuItem[] = [
        { id: '01', label: 'HOME', href: '/' },
        { id: '02', label: 'ABOUT', href: '/about' },
        { id: '03', label: 'SERVICES', href: '/services' },
        { id: '04', label: 'CONTACT', href: '/contact' },
    ];

    const socialItems = [
        { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/rifandiysf' },
        { id: 'github', label: 'GitHub', href: 'https://github.com/Rifandiysf' },
        { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/rifandiyusuf' },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sidebarVariants: Variants = {
        closed: {
            x: '100%',
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut'
            }
        },
        open: {
            x: getSidebarPosition(),
            transition: {
                type: 'tween',
                duration: 0.5,
                ease: 'easeInOut'
            }
        }
    };

    const menuItemVariants: Variants = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1 + 0.3,
                duration: 0.6,
                ease: 'easeOut'
            }
        })
    };

    const letterVariants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    const buttonTextVariants: Variants = {
        hidden: {
            y: 20,
            opacity: 0
        },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.03,
                duration: 0.2,
                ease: 'easeOut'
            }
        }),
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                duration: 0.1
            }
        }
    };

    const iconVariants: Variants = {
        menu: {
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        },
        close: {
            rotate: 180,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <>
            {/* HEADER COMPONENT */}
            <header className={`fixed top-0 left-0 w-full z-50 transition-colors  ${isScrolled ? "bg-background" : "bg-transparent"}`}>
                <div className="flex items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <div className="flex items-center space-x-2">
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
                    </div>

                    {/* MENU BUTTON */}
                    <motion.button
                        onClick={toggleSidebar}
                        className="flex items-center space-x-2 px-4 py-2 text-foreground text-2xl rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Animated Text */}
                        <div className="flex overflow-hidden">
                            <AnimatePresence mode="wait">
                                {(isSidebarOpen ? "Close" : "Menu").split('').map((letter, index) => (
                                    <motion.span
                                        key={`${isSidebarOpen ? 'close' : 'menu'}-${index}`}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={buttonTextVariants}
                                        className="font-medium inline-block"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Animated Icon */}
                        <motion.div
                            animate={isSidebarOpen ? 'close' : 'menu'}
                            variants={iconVariants}
                        >
                            {isSidebarOpen ? <X size={24} /> : <Plus size={24} />}
                        </motion.div>
                    </motion.button>
                </div>
            </header>

            {/* SIDEBAR COMPONENT */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        className="fixed top-0 right-0 w-full h-full z-40"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                    >

                        {/* LAYER 1 - Primary Color (Blue) */}
                        <motion.div
                            className="absolute inset-0 bg-primary"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                        />

                        {/* LAYER 2 - Secondary Color (Lighter Blue) */}
                        <motion.div
                            className="absolute inset-0 bg-[#5227FF]"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, delay: 0.1, ease: 'easeInOut' }}
                        />

                        {/* LAYER 3 - White Background (Content Area) */}
                        <motion.div
                            className="absolute -inset-0.5 bg-background"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, delay: 0.2, ease: 'easeInOut' }}
                        >
                            <div className="flex flex-col items-start h-full px-12 pt-24">
                                {/* Menu Items */}
                                <nav className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.id}
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            variants={menuItemVariants}
                                            className="relative"
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <a
                                                href={item.href}
                                                className={`flex gap-1.5 text-6xl font-bold transition-all duration-300 ${hoveredItem && hoveredItem !== item.id
                                                    ? 'text-foreground'
                                                    : hoveredItem === item.id
                                                        ? 'text-primary'
                                                        : 'text-foreground hover:text-primary'
                                                    }`}
                                            >
                                                <div className="flex">
                                                    {item.label.split('').map((letter, letterIndex) => (
                                                        <motion.span
                                                            key={letterIndex}
                                                            custom={letterIndex}
                                                            initial="hidden"
                                                            animate="visible"
                                                            variants={letterVariants}
                                                            className="inline-block"
                                                        >
                                                            {letter}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                                <motion.span
                                                    className='text-2xl font-light text-[#5227FF]'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.5 }}
                                                >
                                                    {item.id}
                                                </motion.span>
                                            </a>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Socials */}
                                <motion.div
                                    className="absolute bottom-16 left-12"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <h3 className="text-lg font-semibold text-primary mb-4">Socials</h3>
                                    <div className="flex space-x-6 font-semibold text-xl">
                                        {socialItems.map((social) => (
                                            <a
                                                key={social.id}
                                                href={social.href}
                                                target='_blank'
                                                className={`transition-colors duration-300 ${hoveredSocial && hoveredSocial !== social.id
                                                    ? 'text-muted-foreground' // Disabled color
                                                    : hoveredSocial === social.id
                                                        ? 'text-primary'
                                                        : 'text-foreground hover:text-primary'
                                                    }`}
                                                onMouseEnter={() => setHoveredSocial(social.id)}
                                                onMouseLeave={() => setHoveredSocial(null)}
                                            >
                                                {social.label}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div
                                    className='absolute bottom-5 left-12'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <h4 className='text-sm font-semibold text-muted-foreground'>
                                        Copyright © 2025 Rifandi Yusuf. All rights reserved.
                                    </h4>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;