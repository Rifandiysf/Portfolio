'use client'
import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Sparkle } from './ui/Sparkle';
import { ScrollVelocityProps } from '@/lib/types';

type VelocityTextProps = {
  texts: string[];
  baseVelocity: number;
  className: string;
  numCopies: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  separatorSvg: React.ReactNode;
};

const BOOST_PER_VELOCITY = 1 / 200;
const MAX_BOOST = 8;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function VelocityText({
  texts,
  baseVelocity,
  className,
  numCopies,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  separatorSvg,
}: VelocityTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    const scroller = scrollerRef.current;
    const copy = copyRef.current;
    if (!wrapper || !scroller || !copy) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const setX = gsap.quickSetter(scroller, 'x', 'px') as (v: number) => void;

      let copyWidth = copy.offsetWidth;
      let x = 0;
      let direction = 1;
      let boost = 0;
      let targetBoost = 0;
      let running = false;

      const tick = (_time: number, deltaTime: number) => {
        if (!copyWidth) return;
        const dt = Math.min(deltaTime, 50) / 1000;

        targetBoost *= Math.exp(-dt * 8);
        boost += (targetBoost - boost) * (1 - Math.exp(-dt * 6));

        x = wrap(-copyWidth, 0, x + direction * baseVelocity * dt * (1 + boost));
        setX(x);
      };

      const start = () => {
        if (running) return;
        running = true;
        gsap.ticker.add(tick);
      };
      const stop = () => {
        if (!running) return;
        running = false;
        gsap.ticker.remove(tick);
      };

      const trigger = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? start() : stop()),
        onUpdate: (self) => {
          if (self.direction !== 0) direction = self.direction;
          targetBoost = Math.min(Math.abs(self.getVelocity()) * BOOST_PER_VELOCITY, MAX_BOOST);
        },
      });
      if (trigger.isActive) start();

      const observer = new ResizeObserver(() => {
        copyWidth = copy.offsetWidth;
      });
      observer.observe(copy);

      return () => {
        stop();
        observer.disconnect();
        trigger.kill();
      };
    });
  }, { scope: wrapperRef });

  const contentWithSeparators: React.ReactNode[] = [];
  for (let i = 0; i < texts.length; i++) {
    contentWithSeparators.push(
      <span key={`text-${i}`} className={className}>
        {texts[i]}
      </span>
    );

    if (i < texts.length - 1) {
      contentWithSeparators.push(
        <span key={`separator-${i}`} className="flex-shrink-0">
          {separatorSvg}
        </span>
      );
    }
  }

  const spans: React.ReactNode[] = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span
        className="flex-shrink-0 flex items-center"
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {contentWithSeparators}
        <span className="flex-shrink-0">{separatorSvg}</span>
      </span>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`${parallaxClassName ?? ''} relative overflow-hidden`}
      style={parallaxStyle}
    >
      <div
        ref={scrollerRef}
        className={`${scrollerClassName ?? ''} flex whitespace-nowrap items-center text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow will-change-transform md:text-[5rem] md:leading-[5rem]`}
        style={scrollerStyle}
      >
        {spans}
      </div>
    </div>
  );
}

const DefaultSeparatorSvg = () => <Sparkle size={48} className="translate-y-2" />;

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts = [],
  velocity = 100,
  className = '',
  numCopies = 6,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  separatorSvg = <DefaultSeparatorSvg />,
}) => (
  <section>
    <VelocityText
      texts={texts}
      baseVelocity={velocity}
      className={className}
      numCopies={numCopies}
      parallaxClassName={parallaxClassName}
      scrollerClassName={scrollerClassName}
      parallaxStyle={parallaxStyle}
      scrollerStyle={scrollerStyle}
      separatorSvg={separatorSvg}
    />
  </section>
);

export default ScrollVelocity;
