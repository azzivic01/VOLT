import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
  forceVisible?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
  forceVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isReducedMotion } = useMotionPreference();

  const show = forceVisible || isVisible;

  const positionClasses = position === 'top'
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2';

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 4 : -4 }}
            animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, y: position === 'top' ? 4 : -4 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: 'var(--tema-color-surface)',
              borderColor: 'var(--tema-color-accent)',
              borderRadius: 'var(--tema-radius)',
              fontFamily: 'var(--tema-font-label)',
            }}
            className={`absolute z-50 whitespace-nowrap px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--tema-color-accent-ink)] border shadow-xl pointer-events-none ${positionClasses}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
