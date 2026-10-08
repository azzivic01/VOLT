import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();

  return (
    <div
      role="tablist"
      style={{
        borderRadius: 'var(--tema-radius)',
        backgroundColor: 'var(--tema-color-surface)',
        borderColor: 'var(--tema-color-border)',
      }}
      className={`inline-flex p-1 border overflow-x-auto max-w-full ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            style={{
              borderRadius: 'var(--tema-radius)',
              fontFamily: 'var(--tema-font-label)',
            }}
            className={`relative min-h-[44px] px-4 py-2 text-xs md:text-sm font-bold tracking-wider uppercase transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] ${
              isActive
                ? 'text-[var(--tema-color-on-accent)]'
                : 'text-[var(--tema-color-text-muted)] hover:text-[var(--tema-color-text)]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={isReducedMotion ? undefined : 'active-tab-indicator'}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: 'var(--tema-color-accent)',
                }}
                className="absolute inset-0"
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] px-1 rounded ${
                    isActive ? 'bg-[var(--tema-color-bg)]/20 text-[var(--tema-color-on-accent)]' : 'bg-[var(--tema-color-border)] text-[var(--tema-color-text-muted)]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
