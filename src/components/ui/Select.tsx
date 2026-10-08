import React, { useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  forceFocus?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  forceFocus = false,
  id,
  className = '',
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        style={{ fontFamily: 'var(--tema-font-label)' }}
        className="block text-xs font-bold tracking-widest uppercase text-[var(--tema-color-text)] mb-2"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          style={{
            borderRadius: 'var(--tema-radius)',
            backgroundColor: 'var(--tema-color-surface)',
            fontFamily: 'var(--tema-font-body)',
          }}
          className={`w-full min-h-[46px] px-4 py-2.5 pr-10 text-sm text-[var(--tema-color-text)] border transition-all appearance-none cursor-pointer focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-400'
              : forceFocus
              ? 'border-[var(--tema-color-accent)] ring-2 ring-[var(--tema-color-accent-ink)]'
              : 'border-[var(--tema-color-border)] focus:border-[var(--tema-color-accent)] focus:ring-1 focus:ring-[var(--tema-color-accent)]'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[var(--tema-color-surface)] text-[var(--tema-color-text)] py-2"
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 top-3.5 text-[var(--tema-color-text-muted)] pointer-events-none flex items-center gap-1.5">
          {error && <AlertCircle className="w-4 h-4 text-red-500" />}
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-[var(--tema-color-text-muted)]">{helperText}</p>
      ) : null}
    </div>
  );
};
