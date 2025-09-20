import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DURATION = 0.25
const STAGGER = 0.025

export default function FlipLink({ children, href, className, lineHeight = 0.75 }: { children: string, href: string, className?: string, lineHeight?: number }) {
    return (
        <motion.a
            initial="initial"
            whileHover="hovered"
            href={href}
            className={cn("relative block overflow-hidden whitespace-nowrap text-lg font-black text-foreground uppercase", className)}
            style={{
                lineHeight: lineHeight,
            }}
        >
            <div
            >
                {children.split("").map((letter, idx) => {
                    return <motion.span
                        key={idx}
                        variants={{
                            initial: {
                                y: 0
                            },
                            hovered: {
                                y: "-100%"
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * idx
                        }}
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                })}
            </div>
            <div
                className="absolute inset-0"
            >
                {children.split("").map((letter, idx) => {
                    return <motion.span
                        key={idx}
                        variants={{
                            initial: {
                                y: "100%"
                            },
                            hovered: {
                                y: 0
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * idx
                        }}
                        className="inline-block"
                    >
                        {letter}
                    </motion.span>
                })}
            </div>
        </motion.a>
    )
}