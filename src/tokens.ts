/**
 * Design tokens espelhando exatamente as variáveis CSS declaradas em :root
 */
export const tokens = {
  colors: {
    bg: '#0B0F0D',
    surface: '#131A16',
    border: '#26302A',
    text: '#F4F7F2',
    textMuted: '#9AA59D',
    accent: '#C6F432',
    accentInk: '#C6F432',
    onAccent: '#0B0F0D',
  },
  fonts: {
    display: '"Barlow Condensed", sans-serif',
    body: '"Barlow", sans-serif',
    label: '"Barlow Condensed", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  radii: {
    default: '4px',
    lg: '10px',
  },
  motion: {
    durationFast: '150ms',
    durationBase: '300ms',
    durationSlow: '700ms',
    durationCinematic: '1000ms',
    easeBase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeCinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    stagger: '80ms',
  },
} as const;

export type Tokens = typeof tokens;
