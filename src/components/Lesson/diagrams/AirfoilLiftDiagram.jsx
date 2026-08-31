/**
 * Simple inline SVG diagram (PROJECT_PLAN.md "Queued fix —
 * instructional-design audit," gap 4 — multimodal learning). Matches the
 * "Airfoils, Pressure, and Lift" beat of ae7-how-airplanes-fly: shows the
 * curved airfoil cross-section, faster/lower-pressure airflow over the
 * top vs. slower/higher-pressure airflow below, and the downward-
 * deflected air behind the trailing edge with the Newton's-third-law
 * reaction (lift) arrow — the same two explanations the teaching text
 * covers, shown side by side rather than only described in words.
 */
export function AirfoilLiftDiagram() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Diagram of an airfoil showing airflow over and under the wing, the resulting pressure difference, and the lift force reacting to downward-deflected air">
      {/* airfoil body */}
      <path
        d="M40 130 C 90 90, 220 88, 340 118 C 300 128, 200 134, 120 138 C 90 139, 60 136, 40 130 Z"
        fill="#2A3752"
        stroke="#E8ECF4"
        strokeWidth="2"
      />
      {/* top airflow — faster, longer curved path */}
      <path d="M20 100 C 90 60, 220 58, 360 92" fill="none" stroke="#22D3EE" strokeWidth="2" markerEnd="url(#arrowCyan)" />
      <text x="150" y="52" fill="#22D3EE" fontSize="12" fontFamily="monospace">faster air → lower pressure</text>
      {/* bottom airflow — slower, straighter path */}
      <path d="M20 145 C 100 150, 220 150, 360 128" fill="none" stroke="#F5A524" strokeWidth="2" markerEnd="url(#arrowAmber)" />
      <text x="150" y="175" fill="#F5A524" fontSize="12" fontFamily="monospace">slower air → higher pressure</text>
      {/* deflected air behind trailing edge, angled downward */}
      <path d="M340 118 L 385 150" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowGray)" />
      <text x="330" y="170" fill="#94A3B8" fontSize="11" fontFamily="monospace">air deflected down</text>
      {/* reaction lift arrow, Newton's third law */}
      <line x1="200" y1="112" x2="200" y2="60" stroke="#34D399" strokeWidth="3" markerEnd="url(#arrowGreen)" />
      <text x="206" y="70" fill="#34D399" fontSize="13" fontFamily="monospace" fontWeight="bold">Lift</text>
      <defs>
        <marker id="arrowCyan" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#22D3EE" />
        </marker>
        <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#F5A524" />
        </marker>
        <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#94A3B8" />
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#34D399" />
        </marker>
      </defs>
    </svg>
  );
}
