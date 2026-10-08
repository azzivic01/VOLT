import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface MarqueeProps {
  words?: string[];
  className?: string;
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  words = ['VOLT', 'VELOCIDADE', 'IMPACTO', 'CONDICIONAMENTO', 'CONCRETO', 'POTÊNCIA', 'CADÊNCIA'],
  className = '',
  speed = 1.2,
}) => {
  const { isReducedMotion } = useMotionPreference();
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Skew reacts to scroll speed (clamped up to 6 degrees max)
  const skew = useTransform(smoothVelocity, [-1200, 0, 1200], [-6, 0, 6], {
    clamp: true,
  });

  // Calculate velocity factor to speed up marquee during fast scroll
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useAnimationFrame((_, delta) => {
    if (isReducedMotion) return;

    let moveBy = -speed * (delta / 16);
    const extraSpeed = velocityFactor.get();
    moveBy += -extraSpeed * 0.4;

    let newX = baseX.get() + moveBy;
    // Loop smoothly within bounds
    if (newX <= -50) {
      newX = 0;
    }
    baseX.set(newX);
  });

  const transformX = useTransform(baseX, (v) => `${v}%`);

  // Repeat sequence so it never cuts off
  const repeated = [...words, ...words, ...words, ...words];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 select-none border-y border-[var(--tema-color-border)] bg-[var(--tema-color-surface)] ${className}`}
    >
      <motion.div
        style={{
          x: isReducedMotion ? 0 : transformX,
          skewX: isReducedMotion ? 0 : skew,
        }}
        className="flex whitespace-nowrap items-center will-change-transform"
      >
        {repeated.map((word, idx) => {
          const isAccent = idx % 2 === 1;
          return (
            <div
              key={`${word}-${idx}`}
              className="inline-flex items-center gap-6 px-4 shrink-0"
            >
              <span
                style={{
                  fontFamily: 'var(--tema-font-display)',
                }}
                className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight ${
                  isAccent
                    ? 'text-[var(--tema-color-accent)]'
                    : 'text-stroke-text text-transparent opacity-85'
                }`}
              >
                {word}
              </span>
              <span
                aria-hidden="true"
                className="w-2.5 h-2.5 bg-[var(--tema-color-accent)] rotate-45 shrink-0 opacity-75"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
