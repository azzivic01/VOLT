import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useMotionPreference } from '../../context/MotionContext';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  magnetic?: boolean;
  forceHover?: boolean;
  forceFocus?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  magnetic = false,
  forceHover = false,
  forceFocus = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  const { isReducedMotion } = useMotionPreference();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || isReducedMotion || disabled || loading) return;
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;
    // Cap to 12px max offset
    const clampedX = Math.max(-12, Math.min(12, distanceX));
    const clampedY = Math.max(-12, Math.min(12, distanceY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'min-h-[44px] px-4 py-2 text-xs tracking-wider',
    md: 'min-h-[48px] px-6 py-3 text-sm tracking-widest',
    lg: 'min-h-[54px] px-8 py-4 text-base tracking-widest',
  }[size];

  // Base styling adhering to theme variables and zero-pill discipline
  let baseStyle: React.CSSProperties = {
    borderRadius: 'var(--tema-radius)',
    fontFamily: 'var(--tema-font-label)',
    fontWeight: 700,
    textTransform: 'uppercase',
  };

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = `relative overflow-hidden bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] border border-[var(--tema-color-accent)] ${
      forceHover ? 'brightness-110 shadow-lg' : ''
    }`;
  } else if (variant === 'secondary') {
    variantClasses = `relative overflow-hidden bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] border border-[var(--tema-color-border)] hover:border-[var(--tema-color-accent)] ${
      forceHover ? 'border-[var(--tema-color-accent)] bg-[var(--tema-color-border)]' : ''
    }`;
  } else {
    // ghost
    variantClasses = `relative overflow-hidden bg-transparent text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] border border-transparent ${
      forceHover ? 'text-[var(--tema-color-accent-ink)] bg-[rgba(198,244,50,0.08)]' : ''
    }`;
  }

  const focusRingClass = forceFocus
    ? 'ring-2 ring-[var(--tema-color-accent-ink)] ring-offset-2 ring-offset-[var(--tema-color-bg)]'
    : 'focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)]';

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isReducedMotion ? undefined : { x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      disabled={isDisabled}
      style={baseStyle}
      className={`group inline-flex items-center justify-center gap-2.5 select-none transition-all duration-[var(--motion-duration-fast)] ${sizeClasses} ${variantClasses} ${focusRingClass} ${
        isDisabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      } ${className}`}
      {...(props as any)}
    >
      {/* Sliding diagonal accent hover overlay for primary/secondary */}
      {variant === 'primary' && !isDisabled && (
        <span
          className={`absolute inset-0 bg-[var(--tema-color-text)] transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-cinematic)] -translate-x-full group-hover:translate-x-0 ${
            forceHover ? 'translate-x-0' : ''
          }`}
          style={{ mixBlendMode: 'difference' }}
          aria-hidden="true"
        />
      )}

      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>
      )}

      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {!loading && rightIcon && (
        <span className="relative z-10 shrink-0 transition-transform duration-[var(--motion-duration-fast)] group-hover:translate-x-1">
          {rightIcon}
        </span>
      )}
    </motion.button>
  );
};
