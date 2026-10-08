import React from 'react';

export interface DivisorProps {
  label?: string;
  accent?: boolean;
  className?: string;
}

export const Divisor: React.FC<DivisorProps> = ({
  label,
  accent = false,
  className = '',
}) => {
  return (
    <div
      role="separator"
      className={`relative w-full flex items-center justify-center my-10 md:my-16 ${className}`}
    >
      <div
        className="w-full h-px"
        style={{
          backgroundColor: accent ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
        }}
      />
      {label && (
        <span
          style={{
            fontFamily: 'var(--tema-font-label)',
            borderRadius: 'var(--tema-radius)',
            backgroundColor: 'var(--tema-color-bg)',
            borderColor: 'var(--tema-color-border)',
          }}
          className="absolute px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--tema-color-text-muted)] border"
        >
          {label}
        </span>
      )}
    </div>
  );
};
