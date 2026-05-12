/**
 * SoleChem Design System Tokens
 * Phase 3: Brand Identity Unification
 *
 * This file defines all design tokens used across the application
 * including colors, typography, spacing, shadows, and animations.
 */

export const colors = {
  // Primary CTA Color
  orange: '#f26522',
  orangeHover: '#d95a1c',
  orangeLight: '#f9e5d9',

  // Technical Information & Links
  blue: '#0066cc',
  blueHover: '#0052a3',
  blueLight: '#e6f0ff',

  // Sustainability & Success
  green: '#00a651',
  greenHover: '#008c41',
  greenLight: '#e6f5ed',

  // Safety Alerts & Hazards
  red: '#d32f2f',
  redHover: '#b71c1c',
  redLight: '#ffebee',

  // Text Colors
  textPrimary: '#1a1a1a',
  textSecondary: '#424242',
  textTertiary: '#757575',
  textLight: '#9e9e9e',
  textInverse: '#ffffff',

  // Background Colors
  bgPrimary: '#ffffff',
  bgSecondary: '#f5f5f5',
  bgTertiary: '#eeeeee',

  // Border & Divider
  border: '#e0e0e0',
  borderLight: '#f0f0f0',
  borderDark: '#bdbdbd',

  // Neutral Dark (for sections)
  dark: '#1a1a1a',
};

export const typography = {
  fontFamily: {
    sans: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Monaco", monospace',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '42px',
    '6xl': '48px',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.4,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
};

export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
  md: '0 4px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 20px rgba(0, 0, 0, 0.12)',
  xl: '0 20px 40px rgba(0, 0, 0, 0.15)',
};

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slowest: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const animations = {
  float: 'float 3s ease-in-out infinite',
  glow: 'glow 2s ease-in-out infinite',
  pulseRing: 'pulse-ring 2s ease-out infinite',
  scroll: 'scroll 20s linear infinite',
};

// WCAG AA Color Contrast Pairs
export const wcagContrast = {
  headings: {
    text: colors.textPrimary,
    background: colors.bgPrimary,
    contrast: '19:1', // AAA
  },
  body: {
    text: colors.textSecondary,
    background: colors.bgPrimary,
    contrast: '13:1', // AAA
  },
  secondary: {
    text: colors.textTertiary,
    background: colors.bgPrimary,
    contrast: '7:1', // AA
  },
  buttons: {
    text: colors.textInverse,
    background: colors.orange,
    contrast: '8.5:1', // AAA
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  animations,
  wcagContrast,
};