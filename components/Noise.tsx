"use client"
import { NoiseProps } from '@/lib/types';
import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

const CANVAS_SIZE = 1024;
const MARGIN = 96;

const Noise: React.FC<NoiseProps> = ({
  patternRefreshInterval = 6,
  patternAlpha = 15
}) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const imageData = ctx.createImageData(CANVAS_SIZE, CANVAS_SIZE);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = patternAlpha;
    }
    ctx.putImageData(imageData, 0, 0);

    if (prefersReducedMotion()) return;

    const interval = Math.max(1, patternRefreshInterval) / 60;
    const setX = gsap.quickSetter(canvas, 'x', 'px') as (v: number) => void;
    const setY = gsap.quickSetter(canvas, 'y', 'px') as (v: number) => void;
    const setScaleX = gsap.quickSetter(canvas, 'scaleX') as (v: number) => void;
    const setScaleY = gsap.quickSetter(canvas, 'scaleY') as (v: number) => void;

    let last = 0;
    const tick = (time: number) => {
      if (time - last < interval) return;
      last = time;
      setX(gsap.utils.random(-MARGIN, MARGIN, 1));
      setY(gsap.utils.random(-MARGIN, MARGIN, 1));
      setScaleX(Math.random() > 0.5 ? 1 : -1);
      setScaleY(Math.random() > 0.5 ? 1 : -1);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      aria-hidden="true"
      className="pointer-events-none absolute will-change-transform"
      style={{
        top: -MARGIN,
        left: -MARGIN,
        width: `calc(100% + ${MARGIN * 2}px)`,
        height: `calc(100% + ${MARGIN * 2}px)`,
        imageRendering: 'pixelated',
      }}
    />
  );
};

export default Noise;
