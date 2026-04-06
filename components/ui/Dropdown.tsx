"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

    return (
        <div className="relative mt-8 w-fit">
            <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] font-medium border border-border/60 px-5 py-2.5 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
            >
                {title} <ArrowUpRight size={13} />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-3 w-44 rounded-xl border border-border/50 bg-background shadow-lg overflow-hidden"
                    >
                        {options.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                download={item.download}
                                className="block px-4 py-2 text-sm hover:bg-muted transition"
                            >
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}