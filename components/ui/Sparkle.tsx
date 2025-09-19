import React from "react";

type Props = {
    size?: number;
    color?: string;
    className?: string;
    title?: string;
};

export function Sparkle({
    size = 24,
    color = "#2B00FF",
    className,
    title,
}: Props) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={className}
            role={title ? "img" : "img"}
            aria-label={title}
            xmlns="http://www.w3.org/2000/svg"
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M12 3
                    C13 6 15 7.5 18 8.5
                    C15 9.5 13 11 12 15
                    C11 11 9 9.5 6 8.5
                    C9 7.5 11 6 12 3 Z"
                fill={color}
                stroke={color}
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}
