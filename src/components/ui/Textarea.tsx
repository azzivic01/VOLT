import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
  forceFocus?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  forceFocus = false,
  id,
  className = '',
  disabled,
  rows = 4,
  ...props
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="w-full">
      <label
        htmlFor={textareaId}
        style={{ fontFamily: 'var(--tema-font-label)' }}
        className="block text-xs font-bold tracking-widest uppercase text-[var(--tema-color-text)] mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <textarea
          id={textareaId}
          rows={rows}
          disabled={disabled}
          style={{
            borderRadius: 'var(--tema-radius)',
            backgroundColor: 'var(--tema-color-surface)',
            fontFamily: 'var(--tema-font-body)',
          }}
          className={`w-full p-4 text-sm text-[var(--tema-color-text)] border transition-all placeholder:text-[var(--tema-color-text-muted)]/50 focus:outline-none resize-y ${
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
        <p className="mt-1.5 text-xs text-red-400 font-medium">
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
