import React, { useState } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Button } from './Button';
import { LinkAnimado } from './LinkAnimado';
import { Drawer } from './Drawer';
import { NavItem, ActionLink, SoundConfig } from '../../content';

export interface MenuNavProps {
  brandName: string;
  navItems: NavItem[];
  primaryAction: ActionLink;
  sound: SoundConfig;
  isSoundPlaying?: boolean;
  onToggleSound?: () => void;
  className?: string;
}

export const MenuNav: React.FC<MenuNavProps> = ({
  brandName,
  navItems,
  primaryAction,
  sound,
  isSoundPlaying = false,
  onToggleSound,
  className = '',
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header
        role="banner"
        style={{
          backgroundColor: 'rgba(11, 15, 13, 0.85)',
          borderColor: 'var(--tema-color-border)',
        }}
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b transition-colors ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element Brand mark */}
          <a
            href="#"
            style={{ fontFamily: 'var(--tema-font-display)' }}
            className="text-3xl font-extrabold tracking-tighter text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
          >
            {brandName}
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav role="navigation" aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <LinkAnimado key={item.href} href={item.href}>
                {item.label}
              </LinkAnimado>
            ))}
          </nav>

          {/* Zone 3: Actions + Sound Toggle */}
          <div className="flex items-center gap-3">
            {onToggleSound && (
              <button
                type="button"
                onClick={onToggleSound}
                aria-pressed={isSoundPlaying}
                title={isSoundPlaying ? sound.labelOn : sound.labelOff}
                aria-label={isSoundPlaying ? sound.labelOn : sound.labelOff}
                style={{
                  borderRadius: 'var(--tema-radius)',
                  backgroundColor: isSoundPlaying ? 'rgba(198, 244, 50, 0.15)' : 'var(--tema-color-surface)',
                  borderColor: isSoundPlaying ? 'var(--tema-color-accent)' : 'var(--tema-color-border)',
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 border text-xs font-bold uppercase tracking-wider text-[var(--tema-color-text)] hover:border-[var(--tema-color-accent)] hover:text-[var(--tema-color-accent-ink)] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
              >
                {isSoundPlaying ? (
                  <Volume2 className="w-4 h-4 text-[var(--tema-color-accent-ink)]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-[var(--tema-color-text-muted)]" />
                )}
                <span className="sr-only">
                  {isSoundPlaying ? sound.labelOn : sound.labelOff}
                </span>
              </button>
            )}

            <div className="hidden sm:block">
              <Button
                variant="primary"
                size="sm"
                magnetic
                onClick={() => {
                  const target = document.querySelector(primaryAction.href);
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {primaryAction.label}
              </Button>
            </div>

            {/* Mobile menu hamburger button */}
            <button
              type="button"
              aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
              style={{
                borderRadius: 'var(--tema-radius)',
                backgroundColor: 'var(--tema-color-surface)',
                borderColor: 'var(--tema-color-border)',
              }}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 border text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] focus-visible:ring-2 focus-visible:ring-[var(--tema-color-accent-ink)]"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Menu"
        side="right"
      >
        <div className="flex flex-col gap-6 py-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                style={{ fontFamily: 'var(--tema-font-display)' }}
                className="text-2xl font-bold uppercase tracking-tight text-[var(--tema-color-text)] hover:text-[var(--tema-color-accent-ink)] transition-colors py-2 border-b border-[var(--tema-color-border)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-6">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setIsMobileOpen(false);
                const target = document.querySelector(primaryAction.href);
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {primaryAction.label}
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
