import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'outline' | 'subtle';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'outline',
  className = '',
}) => {
  let styleClasses = '';
  if (variant === 'accent') {
    styleClasses = 'bg-[var(--tema-color-accent)] text-[var(--tema-color-on-accent)] font-bold';
  } else if (variant === 'subtle') {
    styleClasses = 'bg-[var(--tema-color-border)] text-[var(--tema-color-text)] font-semibold';
  } else {
    // outline
    styleClasses = 'border border-[var(--tema-color-border)] text-[var(--tema-color-accent-ink)] font-semibold';
  }

  return (
    <span
      style={{
        borderRadius: 'var(--tema-radius)',
        fontFamily: 'var(--tema-font-label)',
      }}
      className={`inline-flex items-center px-2.5 py-1 text-xs tracking-widest uppercase select-none ${styleClasses} ${className}`}
    >
      {children}
    </span>
  );
};
