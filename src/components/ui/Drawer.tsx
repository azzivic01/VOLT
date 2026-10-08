import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'right' | 'left';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  side = 'right',
  children,
}) => {
  const { isReducedMotion } = useMotionPreference();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  const slideInitial = side === 'right' ? { x: '100%' } : { x: '-100%' };
  const slideAnimate = { x: 0 };
  const slideExit = side === 'right' ? { x: '100%' } : { x: '-100%' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Menu lateral'}
          className="fixed inset-0 z-50 flex"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.1 : 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            ref={drawerRef}
            initial={isReducedMotion ? { opacity: 0 } : slideInitial}
            animate={isReducedMotion ? { opacity: 1 } : slideAnimate}
            exit={isReducedMotion ? { opacity: 0 } : slideExit}
            transition={{ duration: isReducedMotion ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              backgroundColor: 'var(--tema-color-surface)',
              borderColor: 'var(--tema-color-border)',
            }}
            className={`relative z-10 w-full max-w-md h-full flex flex-col border-${
              side === 'right' ? 'l' : 'r'
            } border-[var(--tema-color-border)] shadow-2xl p-6 ${
              side === 'right' ? 'ml-auto' : 'mr-auto'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[var(--tema-color-border)] mb-6">
              {title && (
                <h3
                  style={{ fontFamily: 'var(--tema-font-display)' }}
                  className="text-2xl font-bold uppercase tracking-tight text-[var(--tema-color-text)]"
                >
                  {title}
                </h3>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar painel"
                style={{ borderRadius: 'var(--tema-radius)' }}
                className="p-2 text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)] hover:bg-[var(--tema-color-border)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
