import React from 'react';

export interface LinkAnimadoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  forceHover?: boolean;
  forceFocus?: boolean;
  accent?: boolean;
  children: React.ReactNode;
}

export const LinkAnimado: React.FC<LinkAnimadoProps> = ({
  href,
  forceHover = false,
  forceFocus = false,
  accent = false,
  children,
  className = '',
  ...props
}) => {
  const textColor = accent ? 'text-[var(--tema-color-accent-ink)]' : 'text-[var(--tema-color-text)]';
  const focusRingClass = forceFocus
    ? 'ring-2 ring-[var(--tema-color-accent-ink)] ring-offset-2 ring-offset-[var(--tema-color-bg)]'
    : 'focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)]';

  return (
    <a
      href={href}
      style={{ fontFamily: 'var(--tema-font-label)' }}
      className={`group relative inline-flex items-center gap-1.5 py-1 text-sm font-semibold tracking-wider uppercase transition-colors ${textColor} ${focusRingClass} ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full bg-[var(--tema-color-accent-ink)] transition-transform duration-[var(--motion-duration-base)] ease-[var(--motion-ease-cinematic)] origin-left ${
          forceHover ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </a>
  );
};
