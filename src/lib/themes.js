/**
 * ============================================================================
 * THEMES — THE ONE THING IN THE STORE THAT REPAINTS THE WHOLE APP.
 * ============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 25, 2026) ----
 *
 * The parent: **"Is there a way that he can change his mission board color or
 * format via purchase from the store?"**
 *
 * No — and not "not yet" in the way a half-built feature is not yet. There was
 * no theme state in the store, no theme field in the database, no theme in any
 * catalogue, and no way for one to exist: every colour in the app was a literal
 * hex compiled into a Tailwind class. The only user-controllable colour
 * anywhere was the fill on one rocket-shaped path.
 *
 * She asked in the same message as three purchases that did nothing, and the
 * common thread is worth naming: **the store sold him things that could not be
 * seen.** A theme is the opposite of that — it is the one purchase he cannot
 * miss, because it changes every screen he opens for the rest of the year.
 *
 * ---- WHAT A THEME IS ALLOWED TO CHANGE ----
 *
 * The four background steps and the primary accent. That is all.
 *
 * amber, green and red stay fixed in tailwind.config.js on purpose. They are
 * not decoration: green means mastered, amber means XP and rank, red means
 * wrong. A theme that repainted those would make his screen prettier and stop
 * it meaning anything — and this app puts a legal attendance record on the
 * same screens.
 *
 * ---- WHY THE CHANNELS ARE WRITTEN AS "34 211 238" ----
 *
 * Tailwind reads them as `rgb(var(--accent) / <alpha-value>)`, which is what
 * keeps `bg-signal-cyan/10` and `border-signal-cyan/40` working. Hex here would
 * break every opacity modifier in the app, silently, everywhere at once.
 */

export const THEMES = [
  {
    id: 'theme-telemetry',
    type: 'theme',
    name: 'Telemetry',
    icon: '🛰️',
    cost: 0, // the default everyone starts with — free, like the Cadet
    blurb: 'Mission-control cyan on deep navy. The way it has always looked.',
    vars: {
      '--space-950': '7 11 20',
      '--space-900': '11 17 32',
      '--space-800': '19 27 46',
      '--space-700': '28 39 61',
      '--space-600': '42 55 82',
      '--accent': '34 211 238',
      '--accent-glow': 'rgba(34, 211, 238, 0.06)'
    }
  },
  {
    id: 'theme-deep-space',
    type: 'theme',
    name: 'Deep Space',
    icon: '🌌',
    cost: 200,
    blurb: 'Violet on near-black. What the sky looks like with no city in it.',
    vars: {
      '--space-950': '8 6 18',
      '--space-900': '14 11 30',
      '--space-800': '24 19 46',
      '--space-700': '36 29 64',
      '--space-600': '55 45 90',
      '--accent': '167 139 250',
      '--accent-glow': 'rgba(167, 139, 250, 0.07)'
    }
  },
  {
    id: 'theme-mars',
    type: 'theme',
    name: 'Mars Surface',
    icon: '🔴',
    cost: 250,
    blurb: 'Rust on warm dark. The colour Perseverance sends home every day.',
    vars: {
      '--space-950': '18 9 6',
      '--space-900': '28 15 11',
      '--space-800': '43 25 19',
      '--space-700': '60 36 27',
      '--space-600': '86 53 40',
      '--accent': '244 137 87',
      '--accent-glow': 'rgba(244, 137, 87, 0.07)'
    }
  },
  {
    id: 'theme-launch-pad',
    type: 'theme',
    name: 'Launch Pad',
    icon: '🌅',
    cost: 300,
    blurb: 'Sunrise gold on graphite. Every crewed launch goes at dawn for a reason.',
    vars: {
      '--space-950': '13 12 14',
      '--space-900': '21 20 24',
      '--space-800': '32 30 36',
      '--space-700': '46 43 51',
      '--space-600': '68 63 74',
      '--accent': '246 196 84',
      '--accent-glow': 'rgba(246, 196, 84, 0.07)'
    }
  },
  {
    id: 'theme-ocean-recovery',
    type: 'theme',
    name: 'Splashdown',
    icon: '🌊',
    cost: 350,
    blurb: 'Sea green on slate. Where every capsule comes home.',
    vars: {
      '--space-950': '5 16 18',
      '--space-900': '9 24 28',
      '--space-800': '15 36 42',
      '--space-700': '23 51 59',
      '--space-600': '36 74 85',
      '--accent': '94 234 212',
      '--accent-glow': 'rgba(94, 234, 212, 0.07)'
    }
  },
  {
    id: 'theme-blueprint',
    type: 'theme',
    name: 'Blueprint',
    icon: '📐',
    cost: 400,
    blurb: 'Drafting blue. Every one of these builds started as a drawing.',
    vars: {
      '--space-950': '5 14 30',
      '--space-900': '8 22 46',
      '--space-800': '13 33 66',
      '--space-700': '20 47 90',
      '--space-600': '33 70 128',
      '--accent': '125 185 255',
      '--accent-glow': 'rgba(125, 185, 255, 0.08)'
    }
  }
];

export const DEFAULT_THEME_ID = 'theme-telemetry';

/** The theme record for an id, falling back to the default rather than null. */
export function themeById(id) {
  return THEMES.find((t) => t.id === id) || THEMES.find((t) => t.id === DEFAULT_THEME_ID);
}

/**
 * Paint a theme onto the document.
 *
 * Writes to `documentElement` rather than `body` so the variables are in scope
 * for everything, including the `body` background rule itself.
 *
 * Guarded for a missing `document` because this module is imported by the node
 * guard scripts, which have no DOM — the same trap the build stamp hit today.
 */
export function applyTheme(themeId) {
  if (typeof document === 'undefined') return null;
  const theme = themeById(themeId);
  const root = document.documentElement;
  for (const [name, value] of Object.entries(theme.vars)) {
    root.style.setProperty(name, value);
  }
  return theme;
}

/**
 * A preview swatch's colours, for the store card — so the theme is visible
 * BEFORE it is bought.
 *
 * This is the whole lesson from the rocket skins, which shipped five identical
 * 🚀 cards for five different colours and left him buying blind. A cosmetic
 * that cannot be seen in the shop is not a product, it is a gamble.
 */
export function themeSwatch(theme) {
  return {
    bg: `rgb(${theme.vars['--space-900']})`,
    panel: `rgb(${theme.vars['--space-800']})`,
    edge: `rgb(${theme.vars['--space-600']})`,
    accent: `rgb(${theme.vars['--accent']})`
  };
}
