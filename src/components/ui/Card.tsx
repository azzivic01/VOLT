import React from 'react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../../context/MotionContext';

export interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  kicker?: string;
  title: string;
  description?: string;
  badge?: string;
  cutCorner?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  forceHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  imageSrc,
  imageAlt = '',
  kicker,
  title,
  description,
  badge,
  cutCorner = true,
  clickable = false,
  onClick,
  children,
  className = '',
  forceHover = false,
}) => {
  const { isReducedMotion } = useMotionPreference();

  const cornerClip = cutCorner ? 'clip-corner-tr' : '';

  const hoverStyle = !isReducedMotion && clickable
    ? {
        y: -4,
        borderColor: 'var(--tema-color-accent)',
      }
    : undefined;

  const forcedHoverClass = forceHover
    ? 'border-[var(--tema-color-accent)] -translate-y-1'
    : 'hover:border-[var(--tema-color-accent)]';

  const CardWrapper = clickable ? motion.div : 'div';

  return (
    <CardWrapper
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } } : undefined}
      whileHover={hoverStyle}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: 'var(--tema-color-surface)',
        borderColor: forceHover ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
        borderRadius: cutCorner ? undefined : 'var(--tema-radius)',
      }}
      className={`group relative flex flex-col border overflow-hidden transition-all duration-[var(--motion-duration-base)] ${cornerClip} ${
        clickable ? `cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--tema-color-bg)] ${forcedHoverClass}` : ''
      } ${className}`}
    >
      {/* Visual Accent notch on top right cut */}
      {cutCorner && (
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-3.5 h-3.5 bg-[var(--tema-color-border)] group-hover:bg-[var(--tema-color-accent)] transition-colors pointer-events-none"
        />
      )}

      {imageSrc && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--tema-color-bg)]">
          <img
            src={imageSrc}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[var(--motion-duration-slow)] ease-[var(--motion-ease-cinematic)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tema-color-surface)] via-transparent to-transparent opacity-80" />
          {badge && (
            <div className="absolute top-3 left-3">
              <span
                style={{
                  fontFamily: 'var(--tema-font-label)',
                  borderRadius: 'var(--tema-radius)',
                }}
                className="px-2 py-0.5 text-[11px] font-bold tracking-widest uppercase bg-[var(--tema-color-bg)]/90 text-[var(--tema-color-accent-ink)] border border-[var(--tema-color-border)]"
              >
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {kicker && (
            <div
              style={{ fontFamily: 'var(--tema-font-label)' }}
              className="text-xs font-semibold tracking-widest text-[var(--tema-color-accent-ink)] uppercase mb-2"
            >
              {kicker}
            </div>
          )}

          <h3
            style={{ fontFamily: 'var(--tema-font-display)' }}
            className="text-2xl font-bold tracking-tight text-[var(--tema-color-text)] uppercase group-hover:text-[var(--tema-color-accent-ink)] transition-colors"
          >
            {title}
          </h3>

          {description && (
            <p
              style={{ fontFamily: 'var(--tema-font-body)' }}
              className="mt-3 text-sm leading-relaxed text-[var(--tema-color-text-muted)]"
            >
              {description}
            </p>
          )}
        </div>

        {children && <div className="mt-5 pt-4 border-t border-[var(--tema-color-border)]">{children}</div>}
      </div>
    </CardWrapper>
  );
};
