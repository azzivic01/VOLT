import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ProgressBarProps {
  value: number; // 0 to 100
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = false,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-bold uppercase tracking-wider text-[var(--tema-color-text)]">
          {label && <span style={{ fontFamily: 'var(--tema-font-label)' }}>{label}</span>}
          {showValue && (
            <span style={{ fontFamily: 'var(--tema-font-mono)' }} className="text-[var(--tema-color-accent-ink)]">
              {clampedValue}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progresso'}
        style={{
          borderRadius: 'var(--tema-radius)',
          backgroundColor: 'var(--tema-color-surface)',
          borderColor: 'var(--tema-color-border)',
        }}
        className="w-full h-2.5 overflow-hidden border p-0.5"
      >
        <motion.div
          animate={{ width: `${clampedValue}%` }}
          transition={isReducedMotion ? { duration: 0.1 } : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            borderRadius: '1px',
            backgroundColor: 'var(--tema-color-accent)',
          }}
          className="h-full"
        />
      </div>
    </div>
  );
};
