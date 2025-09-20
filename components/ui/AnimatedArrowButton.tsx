'use client'
import { ArrowUpRight } from "lucide-react"
import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DURATION = 0.35;
const STAGGER = 0.05;

const AnimatedArrowButton = ({ title, className }: { title: string, className?: string }) => {
    const controls = useAnimationControls();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = async () => {
        await controls.start("clicked");
        await controls.start(isHovered ? "hovered" : "initial");
    };

    return (
        <motion.button
            initial="initial"
            animate={controls}
            whileHover="hovered"
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            variants={{
                initial: { scale: 1 },
                hovered: { scale: 1.05 },
                clicked: { scale: 1.1 }, // kecil tambahan efek click
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className={cn("relative flex justify-center items-center gap-1 bg-primary w-44 px-4 py-1.5 font-bold text-lg rounded-full cursor-pointer overflow-hidden", className)}
        >
            <span className="text-primary-foreground">{title}</span>

            <div className="relative w-6 h-6 overflow-hidden rounded-full">
                <motion.span
                    variants={{
                        initial: { x: 0, y: 0 },
                        hovered: { x: 18, y: -18 },
                        clicked: { x: 24, y: -24 },
                    }}
                    transition={{
                        duration: DURATION,
                        ease: "easeInOut",
                        delay: STAGGER,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <ArrowUpRight size={24} color="#fff" />
                </motion.span>

                <motion.span
                    variants={{
                        initial: { x: -18, y: 18 },
                        hovered: { x: 0, y: 0 },
                        clicked: { x: 24, y: -24 },
                    }}
                    transition={{
                        duration: DURATION,
                        ease: "easeInOut",
                        delay: STAGGER,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <ArrowUpRight size={24} color="#fff" />
                </motion.span>
            </div>
        </motion.button>
    );
};

export default AnimatedArrowButton;
