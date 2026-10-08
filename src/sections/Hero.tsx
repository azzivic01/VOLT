import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { useMotionPreference } from '../context/MotionContext';

export interface HeroProps {
  content: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for Hero background / elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

  if (!content.enabled) return null;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden border-b border-[var(--tema-color-border)]"
    >
      {/* Subtle industrial grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(var(--tema-color-border)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text block: orchestrated entrance sequence */}
          <motion.div
            style={{ opacity: isReducedMotion ? 1 : textOpacity }}
            className="lg:col-span-7 flex flex-col justify-center z-10"
          >
            {/* 1. Kicker */}
            <div className="overflow-hidden mb-3">
              <motion.div
                initial={isReducedMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2"
              >
                <span
                  style={{
                    borderRadius: 'var(--tema-radius)',
                    backgroundColor: 'var(--tema-color-surface)',
                    borderColor: 'var(--tema-color-border)',
                    fontFamily: 'var(--tema-font-label)',
                  }}
                  className="px-3 py-1 text-xs font-bold tracking-widest uppercase text-[var(--tema-color-accent-ink)] border"
                >
                  {content.kicker}
                </span>
                <span
                  style={{ fontFamily: 'var(--tema-font-mono)' }}
                  className="text-xs text-[var(--tema-color-text-muted)] tracking-wider"
                >
                  {content.metadataNote}
                </span>
              </motion.div>
            </div>

            {/* 2. THE SINGLE H1 ON THE ENTIRE PAGE */}
            <div className="overflow-hidden my-2">
              <motion.h1
                initial={isReducedMotion ? { opacity: 0 } : { y: '100%' }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--tema-font-display)',
                  lineHeight: '0.88',
                }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[var(--tema-color-text)]"
              >
                <span>{content.title.leadingText} </span>
                <span className="text-[var(--tema-color-accent)] underline decoration-4 decoration-[var(--tema-color-border)]">
                  {content.title.highlightedWord}
                </span>{' '}
                <span>{content.title.trailingText}</span>
              </motion.h1>
            </div>

            {/* 3. Description */}
            <motion.p
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--tema-font-body)' }}
              className="mt-6 text-base sm:text-lg md:text-xl text-[var(--tema-color-text-muted)] max-w-xl leading-relaxed"
            >
              {content.description}
            </motion.p>

            {/* 4. Action buttons with Magnetic effect */}
            <motion.div
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                magnetic
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => {
                  const target = document.querySelector(content.primaryAction.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {content.primaryAction.label}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Compass className="w-4 h-4 text-[var(--tema-color-accent-ink)]" />}
                onClick={() => {
                  const target = document.querySelector(content.secondaryAction.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {content.secondaryAction.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* Cinematic Hero Image Container */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <motion.div
              initial={
                isReducedMotion
                  ? { opacity: 0 }
                  : { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 }
              }
              animate={
                isReducedMotion
                  ? { opacity: 1 }
                  : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }
              }
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 'var(--tema-radius-lg)',
                borderColor: 'var(--tema-color-border)',
              }}
              className="relative overflow-hidden border aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] shadow-2xl bg-[var(--tema-color-surface)]"
            >
              {/* Continuous subtle breathing float & scroll-parallax */}
              <motion.div
                style={{
                  y: isReducedMotion ? 0 : imageY,
                  scale: isReducedMotion ? 1 : imageScale,
                }}
                animate={
                  isReducedMotion
                    ? undefined
                    : {
                        scale: [1, 1.025, 1],
                      }
                }
                transition={
                  isReducedMotion
                    ? undefined
                    : {
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                }
                className="w-full h-full"
              >
                <img
                  src={content.image}
                  alt="Atleta com magnésio na barra de treino"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Harsh industrial gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--tema-color-bg)] via-transparent to-transparent opacity-70 pointer-events-none" />

              {/* Edge badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border-t border-[var(--tema-color-border)]/60 pt-3">
                <span
                  style={{ fontFamily: 'var(--tema-font-mono)' }}
                  className="text-xs text-[var(--tema-color-accent-ink)] uppercase font-semibold"
                >
                  PISTA 01 // PESO LIVRE
                </span>
                <span
                  style={{ fontFamily: 'var(--tema-font-mono)' }}
                  className="text-xs text-[var(--tema-color-text-muted)]"
                >
                  55HZ AMBIENT
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
