import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-[var(--tema-color-border)] border-y border-[var(--tema-color-border)] ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="group">
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-btn-${item.id}`}
              className="w-full flex items-center justify-between py-5 px-2 text-left text-[var(--tema-color-text)] transition-colors duration-[var(--motion-duration-fast)] hover:text-[var(--tema-color-accent-ink)] focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)]"
            >
              <span
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-lg md:text-xl font-bold uppercase tracking-tight"
              >
                {item.title}
              </span>
              <motion.span
                animate={isReducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-1 rounded text-[var(--tema-color-accent-ink)] shrink-0 ml-4"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  initial={isReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={isReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={isReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: isReducedMotion ? 0.1 : 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div
                    style={{ fontFamily: 'var(--tema-font-body)' }}
                    className="pb-5 px-2 text-sm leading-relaxed text-[var(--tema-color-text-muted)] max-w-3xl"
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
