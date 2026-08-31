/**
 * Simple inline SVG diagram (PROJECT_PLAN.md "Queued fix —
 * instructional-design audit," gap 4 — multimodal learning). Matches the
 * "Orbit Shapes, Periapsis, and Apoapsis" beat of ae7-orbital-mechanics:
 * an elliptical orbit around a central body (off-center, at one focus of
 * the ellipse — not the ellipse's geometric center, which is the real
 * detail that makes periapsis and apoapsis different distances), with
 * periapsis (closest, fastest) and apoapsis (farthest, slowest) both
 * labeled directly on the path.
 */
export function OrbitDiagram() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Diagram of an elliptical orbit around a central body, showing periapsis as the closest point and apoapsis as the farthest point">
      {/* elliptical orbit path */}
      <ellipse cx="220" cy="110" rx="150" ry="70" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" />
      {/* central body, at one focus of the ellipse (not the center) */}
      <circle cx="130" cy="110" r="16" fill="#22D3EE" />
      <text x="130" y="145" fill="#22D3EE" fontSize="12" fontFamily="monospace" textAnchor="middle">planet</text>
      {/* orbiting spacecraft marker */}
      <circle cx="70" cy="110" r="5" fill="#E8ECF4" />
      {/* periapsis — closest point, near the planet */}
      <line x1="130" y1="110" x2="70" y2="110" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="55" y="95" fill="#34D399" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">periapsis</text>
      <text x="55" y="140" fill="#34D399" fontSize="10" fontFamily="monospace" textAnchor="middle">fastest</text>
      {/* apoapsis — farthest point, opposite side */}
      <circle cx="370" cy="110" r="5" fill="#E8ECF4" />
      <line x1="130" y1="110" x2="370" y2="110" stroke="#F5A524" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="370" y="95" fill="#F5A524" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">apoapsis</text>
      <text x="370" y="140" fill="#F5A524" fontSize="10" fontFamily="monospace" textAnchor="middle">slowest</text>
    </svg>
  );
}
