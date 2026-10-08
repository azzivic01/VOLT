import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { SiteContent } from '../content';
import { LinkAnimado } from '../components/ui/LinkAnimado';
import { useMotionPreference } from '../context/MotionContext';

export interface RodapeProps {
  content: SiteContent['rodape'];
  brand: SiteContent['brand'];
}

export const Rodape: React.FC<RodapeProps> = ({ content, brand }) => {
  const { isReducedMotion, toggleReducedMotion } = useMotionPreference();

  if (!content.enabled) return null;

  return (
    <footer
      id="rodape"
      role="contentinfo"
      className="border-t border-[var(--tema-color-border)] bg-[var(--tema-color-surface)] py-16 md:py-20 text-[var(--tema-color-text)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between">
          {/* Brand zone in footer */}
          <div className="md:col-span-5">
            <span
              style={{ fontFamily: 'var(--tema-font-display)' }}
              className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[var(--tema-color-text)] block"
            >
              {brand.name}
            </span>
            <p
              style={{ fontFamily: 'var(--tema-font-body)' }}
              className="mt-3 text-sm text-[var(--tema-color-text-muted)] max-w-sm leading-relaxed"
            >
              {brand.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div className="md:col-span-4">
            <span
              style={{ fontFamily: 'var(--tema-font-label)' }}
              className="text-xs font-bold tracking-widest uppercase text-[var(--tema-color-accent-ink)] block mb-4"
            >
              NAVEGAÇÃO RÁPIDA
            </span>
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {content.links.map((link) => (
                <LinkAnimado key={link.href} href={link.href}>
                  {link.label}
                </LinkAnimado>
              ))}
            </nav>
          </div>

          {/* Reduced Motion Toggle Button */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
            <span
              style={{ fontFamily: 'var(--tema-font-label)' }}
              className="text-xs font-bold tracking-widest uppercase text-[var(--tema-color-text-muted)] block"
            >
              ACESSIBILIDADE
            </span>

            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={isReducedMotion}
              style={{
                borderRadius: 'var(--tema-radius)',
                backgroundColor: isReducedMotion ? 'rgba(198, 244, 50, 0.15)' : 'var(--tema-color-bg)',
                borderColor: isReducedMotion ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                fontFamily: 'var(--tema-font-label)',
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 border text-xs font-bold uppercase tracking-wider text-[var(--tema-color-text)] hover:border-[var(--tema-color-accent)] hover:text-[var(--tema-color-accent-ink)] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
            >
              {isReducedMotion ? (
                <>
                  <EyeOff className="w-4 h-4 text-[var(--tema-color-accent-ink)]" />
                  <span>{content.normalMotionLabel}</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-[var(--tema-color-text-muted)]" />
                  <span>{content.reducedMotionLabel}</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-[var(--tema-color-text-muted)]">
              {isReducedMotion ? 'Movimento reduzido ativo' : 'Animações completas ativas'}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--tema-color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--tema-color-text-muted)]">
          <p>{content.copyright}</p>
          <span style={{ fontFamily: 'var(--tema-font-mono)' }} className="text-[11px]">
            WCAG AA · 0 ERROS · 60/30/10 SYSTEM
          </span>
        </div>
      </div>
    </footer>
  );
};
