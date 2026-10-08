import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';
import { GaleriaItem } from '../../content';

export interface GaleriaGridProps {
  items: GaleriaItem[];
  className?: string;
}

export const GaleriaGrid: React.FC<GaleriaGridProps> = ({
  items,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const [selectedItem, setSelectedItem] = useState<GaleriaItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) {
        setSelectedItem(null);
      }
    };
    if (selectedItem) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  return (
    <div className={`w-full ${className}`}>
      {/* Grid of gallery cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layoutId={isReducedMotion ? undefined : `gallery-card-${item.id}`}
            whileHover={
              isReducedMotion
                ? undefined
                : {
                    y: -4,
                  }
            }
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedItem(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedItem(item);
              }
            }}
            aria-label={`Ver imagem ampliada: ${item.title}`}
            style={{
              backgroundColor: 'var(--tema-color-surface)',
              borderColor: 'var(--tema-color-border)',
              borderRadius: 'var(--tema-radius)',
            }}
            className="group relative cursor-pointer overflow-hidden border aspect-[4/3] focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
          >
            <motion.img
              layoutId={isReducedMotion ? undefined : `gallery-img-${item.id}`}
              src={item.image}
              alt={item.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-cinematic)] group-hover:scale-108"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--tema-color-bg)] via-[var(--tema-color-bg)]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-[var(--motion-duration-base)]" />

            {/* Top metadata category */}
            <div className="absolute top-3 left-3">
              <span
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-bg)',
                  borderColor: 'var(--tema-color-border)',
                }}
                className="px-2.5 py-1 text-[11px] font-bold tracking-widest uppercase text-[var(--tema-color-accent-ink)] border"
              >
                {item.category}
              </span>
            </div>

            {/* Expand icon hover indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-accent)',
                  color: 'var(--tema-color-on-accent)',
                }}
                className="w-8 h-8 flex items-center justify-center shadow-lg"
              >
                <Maximize2 className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>

            {/* Bottom title */}
            <div className="absolute bottom-4 left-4 right-4">
              <span
                style={{ fontFamily: 'var(--tema-font-mono)' }}
                className="text-[11px] text-[var(--tema-color-accent-ink)] block mb-1"
              >
                0{index + 1}
              </span>
              <h3
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-xl font-bold uppercase tracking-tight text-[var(--tema-color-text)] group-hover:text-[var(--tema-color-accent-ink)] transition-colors"
              >
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox with shared layoutId */}
      <AnimatePresence>
        {selectedItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização detalhada: ${selectedItem.title}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isReducedMotion ? 0.1 : 0.2 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Expanded Content Box */}
            <motion.div
              layoutId={isReducedMotion ? undefined : `gallery-card-${selectedItem.id}`}
              style={{
                backgroundColor: 'var(--tema-color-surface)',
                borderColor: 'var(--tema-color-border)',
                borderRadius: 'var(--tema-radius-lg)',
              }}
              className="relative z-10 w-full max-w-4xl border overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Fechar ampliação"
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-bg)',
                  borderColor: 'var(--tema-color-border)',
                }}
                className="absolute top-4 right-4 z-20 p-2.5 border text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] hover:border-[var(--tema-color-accent)] transition-all focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/10] bg-black overflow-hidden">
                <motion.img
                  layoutId={isReducedMotion ? undefined : `gallery-img-${selectedItem.id}`}
                  src={selectedItem.image}
                  alt={selectedItem.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--tema-color-surface)] border-t border-[var(--tema-color-border)]">
                <div>
                  <span
                    style={{ fontFamily: 'var(--tema-font-label)' }}
                    className="text-xs font-bold tracking-widest text-[var(--tema-color-accent-ink)] uppercase block mb-1"
                  >
                    {selectedItem.category}
                  </span>
                  <h4
                    style={{ fontFamily: 'var(--tema-font-display)' }}
                    className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[var(--tema-color-text)]"
                  >
                    {selectedItem.title}
                  </h4>
                  <p
                    style={{ fontFamily: 'var(--tema-font-body)' }}
                    className="text-sm text-[var(--tema-color-text-muted)] mt-1"
                  >
                    {selectedItem.alt}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    style={{
                      borderRadius: 'var(--tema-radius)',
                      fontFamily: 'var(--tema-font-label)',
                    }}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest border border-[var(--tema-color-border)] text-[var(--tema-color-text)] hover:border-[var(--tema-color-accent)] hover:text-[var(--tema-color-accent-ink)] transition-colors"
                  >
                    Voltar à Galeria
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
