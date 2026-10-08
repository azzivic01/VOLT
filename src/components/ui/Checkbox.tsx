import React, { useId } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  helperText?: string;
  forceChecked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  helperText,
  id,
  checked,
  forceChecked,
  disabled,
  onChange,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const isChecked = forceChecked !== undefined ? forceChecked : checked;

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-start gap-3 select-none cursor-pointer ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={checkboxId}
          checked={isChecked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <div
          style={{
            borderRadius: 'var(--tema-radius)',
            backgroundColor: isChecked ? 'var(--tema-color-accent)' : 'var(--tema-color-surface)',
            borderColor: isChecked ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
          }}
          className="w-5 h-5 border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--tema-color-accent-ink)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--tema-color-bg)]"
        >
          {isChecked && (
            <Check className="w-3.5 h-3.5 text-[var(--tema-color-on-accent)] stroke-[3]" />
          )}
        </div>
      </div>

      <div>
        <span
          style={{ fontFamily: 'var(--tema-font-body)' }}
          className="text-sm font-medium text-[var(--tema-color-text)]"
        >
          {label}
        </span>
        {helperText && (
          <p className="text-xs text-[var(--tema-color-text-muted)] mt-0.5">{helperText}</p>
        )}
      </div>
    </label>
  );
};
