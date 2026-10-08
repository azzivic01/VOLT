import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { SiteContent } from '../content';
import { Button } from '../components/ui/Button';
import { Marquee } from '../components/ui/Marquee';
import { useMotionPreference } from '../context/MotionContext';

export interface CtaFinalProps {
  content: SiteContent['ctaFinal'];
}

export const CtaFinal: React.FC<CtaFinalProps> = ({ content }) => {
  const { isReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <section
      id="cta-final"
      className="relative pt-16 pb-24 md:pb-32 border-b border-[var(--tema-color-border)] bg-[var(--tema-color-bg)] overflow-hidden"
    >
      {/* Signature velocity Marquee banner right above CTA block */}
      <div className="mb-16 md:mb-24">
        <Marquee words={['VOLT', 'VELOCIDADE', 'IMPACTO', 'CONCRETO', 'CONDICIONAMENTO', 'POTÊNCIA']} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="overflow-hidden mb-3">
          <motion.span
            initial={isReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: 'var(--tema-font-label)' }}
            className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase inline-block"
          >
            {content.kicker}
          </motion.span>
        </div>

        <motion.h2
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--tema-font-display)',
            lineHeight: '0.92',
          }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[var(--tema-color-text)] max-w-4xl mx-auto"
        >
          {content.title}
        </motion.h2>

        <motion.p
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--tema-font-body)' }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[var(--tema-color-text-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
            leftIcon={<MessageSquare className="w-4 h-4 text-[var(--tema-color-accent-ink)]" />}
            onClick={() => {
              const target = document.querySelector(content.secondaryAction.href);
              target?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {content.secondaryAction.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
