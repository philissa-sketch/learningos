/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Design tokens — see docs/PROJECT_LOG.md "Design Plan" entry.
         *
         * ---- WHY THESE ARE CSS VARIABLES NOW (Aug 25, 2026) ----
         *
         * The parent: **"Is there a way that he can change his mission board
         * color or format via purchase from the store?"**
         *
         * There was not. Every colour in the app was a literal hex compiled
         * into a class name, so nothing could repaint anything — there was no
         * theme state, no theme setting and no purchasable theme anywhere in
         * the codebase.
         *
         * Written as `rgb(var(--x) / <alpha-value>)`, one line of JS setting
         * `--accent` on `<html>` repaints every `bg-signal-cyan`,
         * `text-signal-cyan`, `border-signal-cyan/40` in the whole app at once
         * — no component changes, and opacity modifiers keep working, which is
         * the only reason the `<alpha-value>` form matters.
         *
         * THE BACKGROUND AND THE ACCENT ARE THEMED. amber, green and red are
         * NOT, on purpose: those three are not decoration. Green means
         * mastered, amber means XP and rank, red means wrong. A theme that
         * repainted them would make his screen prettier and stop it meaning
         * anything.
         */
        space: {
          950: 'rgb(var(--space-950) / <alpha-value>)', // deepest background
          900: 'rgb(var(--space-900) / <alpha-value>)', // page background
          800: 'rgb(var(--space-800) / <alpha-value>)', // panel background
          700: 'rgb(var(--space-700) / <alpha-value>)', // panel border / raised surface
          600: 'rgb(var(--space-600) / <alpha-value>)'  // hairline / divider
        },
        signal: {
          cyan: 'rgb(var(--accent) / <alpha-value>)', // telemetry / primary accent — THEMED
          amber: '#F5A524',  // XP / rank / energy accent — semantic, never themed
          green: '#34D399',  // mastery / success — semantic, never themed
          red: '#F0555A'     // incorrect / alert — semantic, never themed
        },
        ink: {
          100: '#E8ECF4', // primary text on dark
          300: '#AEB8CC', // secondary text
          500: '#7C8798'  // muted / captions
        }
      },
      fontFamily: {
        display: ['"Rajdhani"', '"Segoe UI"', 'sans-serif'],
        body: ['"Inter"', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(42,55,82,0.6), 0 8px 24px -8px rgba(0,0,0,0.5)',
        glow: '0 0 24px rgba(34,211,238,0.35)'
      }
    }
  },
  plugins: []
};
