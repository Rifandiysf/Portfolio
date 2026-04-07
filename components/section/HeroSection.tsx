"use client";
import { HeroSectionPros } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const HeroSection = ({
    subtitle = "SUBTITLE",
    title = "YOUR NAME",
    subline = "SUBLINE",
    className,
}: HeroSectionPros) => {
    const nameParts = title.split(" ");

    const PRELOADER_DURATION = 2.8

    const slideUp: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: PRELOADER_DURATION + 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    const letterAnimation: Variants = {
        hidden: { y: "110%" },
        visible: (i: number) => ({
            y: 0,
            transition: {
                delay: PRELOADER_DURATION + 0.1 + i * 0.04,
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
            },
        }),
    };

    return (
        <section
            className={cn(
                "flex flex-col justify-center items-center h-screen w-full overflow-hidden",
                className
            )}
        >
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
                initial="hidden"
                animate="visible"
                aria-label={title}
            >
                {nameParts.map((part, wordIndex) => {
                    const offset = nameParts
                        .slice(0, wordIndex)
                        .reduce((total, word) => total + word.length, 0);

                    return (
                        <span
                            key={wordIndex}
                            className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[14rem] overflow-hidden"
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
    );
};

export default HeroSection;