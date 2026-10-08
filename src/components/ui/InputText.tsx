import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  forceFocus?: boolean;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  error,
  helperText,
  forceFocus = false,
  id,
  className = '',
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        style={{ fontFamily: 'var(--tema-font-label)' }}
        className="block text-xs font-bold tracking-widest uppercase text-[var(--tema-color-text)] mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          disabled={disabled}
          style={{
            borderRadius: 'var(--tema-radius)',
            backgroundColor: 'var(--tema-color-surface)',
            fontFamily: 'var(--tema-font-body)',
          }}
          className={`w-full min-h-[46px] px-4 py-2.5 text-sm text-[var(--tema-color-text)] border transition-all placeholder:text-[var(--tema-color-text-muted)]/50 focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-400'
              : forceFocus
              ? 'border-[var(--tema-color-accent)] ring-2 ring-[var(--tema-color-accent-ink)]'
              : 'border-[var(--tema-color-border)] focus:border-[var(--tema-color-accent)] focus:ring-1 focus:ring-[var(--tema-color-accent)]'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
          {...props}
        />
        {error && (
          <div className="absolute right-3 top-3.5 text-red-500 pointer-events-none">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[var(--tema-color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
