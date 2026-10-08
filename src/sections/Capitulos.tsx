import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CapituloItem, SiteContent } from '../content';
import { useMotionPreference } from '../context/MotionContext';

export interface CapitulosProps {
  content: CapituloItem[];
  intro?: SiteContent['intro'];
}

export const Capitulos: React.FC<CapitulosProps> = ({ content, intro }) => {
  const { isReducedMotion } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for reading progress line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const enabledItems = content.filter((item) => item.enabled);
  if (enabledItems.length === 0) return null;

  return (
    <section
      id="capitulos"
      ref={sectionRef}
      className="relative py-24 md:py-36 border-b border-[var(--tema-color-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro statement block */}
        {intro && intro.enabled && (
          <div className="mb-20 md:mb-28 max-w-3xl">
            <div className="overflow-hidden mb-3">
              <motion.span
                initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--tema-font-label)' }}
                className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase"
              >
                {intro.kicker}
              </motion.span>
            </div>

            <motion.h2
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--tema-font-display)' }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[var(--tema-color-text)] leading-tight"
            >
              {intro.text}
            </motion.h2>
          </div>
        )}

        {/* Narrative chapters list */}
        <div className="relative">
          {/* Vertical progress line for scroll-linked reading state */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--tema-color-border)] -translate-x-1/2"
          >
            <motion.div
              style={{ height: isReducedMotion ? '100%' : progressHeight }}
              className="w-full bg-[var(--tema-color-accent)] origin-top"
            />
          </div>

          <div className="flex flex-col gap-24 md:gap-36">
            {enabledItems.map((capitulo, index) => {
              const isEven = index % 2 === 1;

              return (
                <div
                  key={capitulo.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    isEven ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image container with clip-path mask reveal */}
                  <motion.div
                    initial={
                      isReducedMotion
                        ? { opacity: 0 }
                        : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 }
                    }
                    whileInView={
                      isReducedMotion
                        ? { opacity: 1 }
                        : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }
                    }
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative overflow-hidden border border-[var(--tema-color-border)] ${
                      isEven ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-6'
                    }`}
                    style={{
                      borderRadius: 'var(--tema-radius-lg)',
                      backgroundColor: 'var(--tema-color-surface)',
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <motion.img
                        initial={isReducedMotion ? undefined : { scale: 1.08 }}
                        whileInView={isReducedMotion ? undefined : { scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        src={capitulo.image}
                        alt={capitulo.alt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tema-color-bg)]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Monospace numeral watermark index badge */}
                      <div className="absolute top-4 left-4">
                        <span
                          style={{
                            fontFamily: 'var(--tema-font-mono)',
                            borderRadius: 'var(--tema-radius)',
                            backgroundColor: 'var(--tema-color-bg)',
                            borderColor: 'var(--tema-color-border)',
                          }}
                          className="px-3 py-1 text-xs font-semibold text-[var(--tema-color-accent-ink)] border"
                        >
                          FASE {capitulo.number}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Text block */}
                  <motion.div
                    initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col justify-center ${
                      isEven ? 'lg:col-span-6 lg:col-start-1' : 'lg:col-span-6'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        style={{ fontFamily: 'var(--tema-font-mono)' }}
                        className="text-lg md:text-xl font-bold text-[var(--tema-color-accent-ink)]"
                      >
                        {capitulo.number}
                      </span>
                      <span className="w-8 h-px bg-[var(--tema-color-border)]" />
                      <span
                        style={{ fontFamily: 'var(--tema-font-label)' }}
                        className="text-xs font-bold tracking-widest text-[var(--tema-color-text-muted)] uppercase"
                      >
                        {capitulo.kicker}
                      </span>
                    </div>

                    <h3
                      style={{ fontFamily: 'var(--tema-font-display)' }}
                      className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--tema-color-text)] leading-none"
                    >
                      {capitulo.title}
                    </h3>

                    <p
                      style={{ fontFamily: 'var(--tema-font-body)' }}
                      className="mt-6 text-base sm:text-lg text-[var(--tema-color-text-muted)] leading-relaxed max-w-lg"
                    >
                      {capitulo.description}
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="h-1 w-12 bg-[var(--tema-color-accent)]" />
                      <span
                        style={{ fontFamily: 'var(--tema-font-mono)' }}
                        className="text-xs text-[var(--tema-color-text-muted)] uppercase tracking-wider"
                      >
                        ROTINA DE CONDICIONAMENTO
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
