import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  helperText?: string;
}

export interface RadioProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <fieldset className={`w-full ${className}`}>
      {label && (
        <legend
          style={{ fontFamily: 'var(--tema-font-label)' }}
          className="text-xs font-bold tracking-widest uppercase text-[var(--tema-color-text)] mb-3"
        >
          {label}
        </legend>
      )}

      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          const inputId = `${name}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              style={{
                borderRadius: 'var(--tema-radius)',
                backgroundColor: 'var(--tema-color-surface)',
                borderColor: isSelected ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
              }}
              className={`flex items-start gap-3 p-3.5 border transition-all cursor-pointer ${
                disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:border-[var(--tema-color-accent)]'
              }`}
            >
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="radio"
                  id={inputId}
                  name={name}
                  value={opt.value}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onChange(opt.value)}
                  className="peer sr-only"
                />
                <div
                  style={{
                    borderRadius: 'var(--tema-radius)',
                    borderColor: isSelected ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                  }}
                  className="w-5 h-5 border flex items-center justify-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--tema-color-accent-ink)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--tema-color-bg)]"
                >
                  {isSelected && (
                    <div
                      style={{
                        borderRadius: '1px',
                        backgroundColor: 'var(--tema-color-accent)',
                      }}
                      className="w-2.5 h-2.5"
                    />
                  )}
                </div>
              </div>

              <div>
                <span
                  style={{ fontFamily: 'var(--tema-font-body)' }}
                  className="text-sm font-semibold text-[var(--tema-color-text)]"
                >
                  {opt.label}
                </span>
                {opt.helperText && (
                  <p className="text-xs text-[var(--tema-color-text-muted)] mt-0.5">
                    {opt.helperText}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};
