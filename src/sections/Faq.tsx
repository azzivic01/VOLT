import React from 'react';
import { motion } from 'motion/react';
import { FaqItem } from '../content';
import { Accordion } from '../components/ui/Accordion';
import { useMotionPreference } from '../context/MotionContext';

export interface FaqProps {
  content: FaqItem[];
}

export const Faq: React.FC<FaqProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  const enabledItems = content.filter((item) => item.enabled);
  if (enabledItems.length === 0) return null;

  const accordionItems = enabledItems.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section
      id="faq"
      className="py-24 md:py-32 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-surface)]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'var(--tema-font-label)' }}
              className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase inline-block"
            >
              DÚVIDAS FREQUENTES
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
            PERGUNTAS & RESPOSTAS
          </motion.h2>

          <p
            style={{ fontFamily: 'var(--tema-font-body)' }}
            className="mt-4 text-base text-[var(--tema-color-text-muted)] max-w-lg mx-auto"
          >
            Tudo o que você precisa saber antes de calçar o tênis e pisar na pista de treino da VOLT.
          </p>
        </div>

        <Accordion items={accordionItems} defaultOpenId={accordionItems[0]?.id} />
      </div>
    </section>
  );
};
