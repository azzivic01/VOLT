import React from 'react';
import { motion } from 'motion/react';
import { GaleriaItem } from '../content';
import { GaleriaGrid } from '../components/ui/GaleriaGrid';
import { useMotionPreference } from '../context/MotionContext';

export interface GaleriaProps {
  content: GaleriaItem[];
}

export const Galeria: React.FC<GaleriaProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  const enabledItems = content.filter((item) => item.enabled);
  if (enabledItems.length === 0) return null;

  return (
    <section
      id="galeria"
      className="py-24 md:py-32 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="overflow-hidden mb-2">
              <motion.span
                initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
                style={{ fontFamily: 'var(--tema-font-label)' }}
                className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase"
              >
                REGISTROS VISUAIS
              </motion.span>
            </div>

            <motion.h2
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--tema-font-display)' }}
              className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[var(--tema-color-text)]"
            >
              ATMOSFERA DO ESTÚDIO
            </motion.h2>
          </div>

          <p
            style={{ fontFamily: 'var(--tema-font-body)' }}
            className="text-sm text-[var(--tema-color-text-muted)] max-w-sm"
          >
            Selecione qualquer registro para visualização detalhada em alta resolução.
          </p>
        </div>

        <GaleriaGrid items={enabledItems} />
      </div>
    </section>
  );
};
