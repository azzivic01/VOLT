import React from 'react';
import { motion } from 'motion/react';
import { ServicoItem } from '../content';
import { Card } from '../components/ui/Card';
import { useMotionPreference } from '../context/MotionContext';

export interface ServicosProps {
  content: ServicoItem[];
}

export const Servicos: React.FC<ServicosProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  const enabledItems = content.filter((item) => item.enabled);
  if (enabledItems.length === 0) return null;

  return (
    <section
      id="servicos"
      className="py-24 md:py-32 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'var(--tema-font-label)' }}
              className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase"
            >
              MODALIDADES & FORMATOS
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
            SERVIÇOS DE PISTA
          </motion.h2>
        </div>

        {/* Cards Grid with stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {enabledItems.map((servico, index) => (
            <motion.div
              key={servico.id}
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.45,
                delay: isReducedMotion ? 0 : index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                imageSrc={servico.image}
                imageAlt={servico.alt}
                badge={servico.badge}
                kicker={servico.kicker}
                title={servico.title}
                description={servico.description}
                cutCorner
                clickable
                onClick={() => {
                  const target = document.querySelector('#visite');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--tema-color-accent-ink)] group-hover:translate-x-1 transition-transform">
                  <span>Consultar bateria</span>
                  <span>→</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
