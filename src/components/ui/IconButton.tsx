import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  forceHover?: boolean;
  forceFocus?: boolean;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  label,
  variant = 'secondary',
  forceHover = false,
  forceFocus = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = `bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] border border-[var(--tema-color-accent)] ${
      forceHover ? 'brightness-110 shadow-md' : 'hover:brightness-110'
    }`;
  } else if (variant === 'secondary') {
    variantClasses = `bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] border border-[var(--tema-color-border)] ${
      forceHover
        ? 'border-[var(--tema-color-accent)] text-[var(--tema-color-accent-ink)]'
        : 'hover:border-[var(--tema-color-accent)] hover:text-[var(--tema-color-accent-ink)]'
    }`;
  } else {
    variantClasses = `bg-transparent text-[var(--tema-color-text)] border border-transparent ${
      forceHover
        ? 'text-[var(--tema-color-accent-ink)] bg-[rgba(198,244,50,0.1)]'
        : 'hover:text-[var(--tema-color-accent-ink)] hover:bg-[rgba(198,244,50,0.06)]'
    }`;
  }

  const focusRingClass = forceFocus
    ? 'ring-2 ring-[var(--tema-color-accent-ink)] ring-offset-2 ring-offset-[var(--tema-color-bg)]'
    : 'focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)]';

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      style={{ borderRadius: 'var(--tema-radius)' }}
      className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 transition-colors duration-[var(--motion-duration-fast)] ${variantClasses} ${focusRingClass} ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
