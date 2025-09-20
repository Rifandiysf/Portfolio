"use client";

import { HeroSectionPros } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";


const HeroSection = ({
    subtitle = "SUBTITLE",
    title = "YOUR NAME",
    subline = "SUBLINE",
    className
}: HeroSectionPros) => {
    const nameParts = title.split(" ");

    const slideUp: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const nameContainer: Variants = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    };

    const letterAnimation: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.08,
                duration: 0.3,
                ease: "easeOut",
            },
        }),
    };
    return (
        <section className={cn(`flex flex-col justify-center items-center h-screen w-full overflow-hidden`, className)}>
            <motion.p
                className="font-bold text-muted-foreground"
                variants={slideUp}
                initial="hidden"
                animate="visible"
            >
                {subtitle}
            </motion.p>

            <motion.h1
                className="flex flex-col text-primary text-center font-big-shoulders font-[900] leading-none tracking-[-5.2px]"
                variants={nameContainer}
                initial="hidden"
                animate="visible"
                aria-label={title}
            >
                {nameParts.map((part, wordIndex) => {
                    const offset = nameParts.slice(0, wordIndex).reduce((total, word) => total + word.length, 0);

                    return (
                        <span
                            key={wordIndex}
                            className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] overflow-hidden"
                        >
                            {part.split("").map((char, charIndex) => (
                                <motion.span
                                    key={charIndex}
                                    custom={offset + charIndex}
                                    variants={letterAnimation}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    );
                })}
            </motion.h1>

            <motion.p
                className="font-bold text-muted-foreground"
                variants={slideUp}
                initial="hidden"
                animate="visible"
            >
                {subline}
            </motion.p>
        </section>
    )
}

export default HeroSection