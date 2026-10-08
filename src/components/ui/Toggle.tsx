import React, { useId } from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  helperText,
  className = '',
}) => {
  const { isReducedMotion } = useMotionPreference();
  const id = useId();

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <label htmlFor={id} className="cursor-pointer select-none">
        <span
          style={{ fontFamily: 'var(--tema-font-body)' }}
          className="text-sm font-semibold text-[var(--tema-color-text)] block"
        >
          {label}
        </span>
        {helperText && (
          <span className="text-xs text-[var(--tema-color-text-muted)] block mt-0.5">
            {helperText}
          </span>
        )}
      </label>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        style={{
          borderRadius: 'var(--tema-radius)',
          backgroundColor: checked ? 'var(--tema-color-accent)' : 'var(--tema-color-surface)',
          borderColor: checked ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
        }}
        className={`relative inline-flex h-7 w-12 shrink-0 items-center border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)] ${
          disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
        }`}
      >
        <motion.span
          animate={
            isReducedMotion
              ? undefined
              : {
                  x: checked ? 22 : 3,
                }
          }
          style={{
            borderRadius: '2px',
            backgroundColor: checked ? 'var(--tema-color-on-accent)' : 'var(--tema-color-text-muted)',
            transform: isReducedMotion ? (checked ? 'translateX(22px)' : 'translateX(3px)') : undefined,
          }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block h-5 w-5 pointer-events-none"
        />
      </button>
    </div>
  );
};
