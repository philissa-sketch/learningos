/**
 * The rocket, drawn in its own colour.
 *
 * ---- WHY IT LIVES IN ITS OWN FILE (Aug 25, 2026) ----
 *
 * The parent: **"the rocket skin all look the same in the store."** They did —
 * every one was the same 🚀 glyph, so five paid skins were indistinguishable
 * until after he had bought one. That is a raffle, not a store. This was the
 * fix, and it lived inside `RewardsHome.jsx`.
 *
 * It has to be here now because **My Stuff needs it too** — see below. Leaving
 * it in RewardsHome and importing it back would make a circular import, since
 * RewardsHome is what renders My Stuff in the first place.
 */
export function RocketSwatch({ color, size = 40 }) {
  return (
    <svg
      viewBox="-26 -34 52 68"
      width={size}
      height={(size * 68) / 52}
      role="img"
      aria-label="Rocket"
    >
      <path d="M0 -30 q13 15 13 30 L-13 0 q0 -15 13 -30 Z" fill={color} stroke="#0B1120" strokeWidth="1.5" />
      <path d="M-13 0 L-13 18 L-22 26 L-22 8 Z" fill={color} stroke="#0B1120" strokeWidth="1.5" opacity=".75" />
      <path d="M13 0 L13 18 L22 26 L22 8 Z" fill={color} stroke="#0B1120" strokeWidth="1.5" opacity=".75" />
      <rect x="-13" y="0" width="26" height="20" fill={color} stroke="#0B1120" strokeWidth="1.5" />
      <circle cx="0" cy="-8" r="5.5" fill="#0B1120" opacity=".55" />
      <path d="M-8 20 q8 14 16 0 Z" fill="#F5A524" />
    </svg>
  );
}
