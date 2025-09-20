// Sparkle Component Type
export type SparkleProps = {
    size?: number;
    color?: string;
    className?: string;
    title?: string;
};

// Noise Components Type
export type NoiseProps = {
    patternSize?: number;
    patternScaleX?: number;
    patternScaleY?: number;
    patternRefreshInterval?: number;
    patternAlpha?: number;
}

// HeroSection Component Type
export type HeroSectionPros = {
    subtitle?: string;
    title?: string;
    subline?: string;
    className?: string;
}

// ScrollVelocity Componnet Type
export interface VelocityMapping {
    input: [number, number];
    output: [number, number];
}

export interface VelocityTextProps {
    children: React.ReactNode;
    baseVelocity: number;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: VelocityMapping;
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
}

export interface ScrollVelocityProps {
    scrollContainerRef?: React.RefObject<HTMLElement>;
    texts: string[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: VelocityMapping;
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
    separatorSvg?: React.ReactNode;
}