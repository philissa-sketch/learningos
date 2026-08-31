/**
 * Simple inline SVG diagram (PROJECT_PLAN.md "Queued fix —
 * instructional-design audit," gap 4 — multimodal learning). Matches the
 * "Rocket Staging and Structural Parts" beat of ae7-rocket-design: a
 * 3-stage rocket (payload fairing on top, then stage 3, stage 2, stage 1
 * at the base), with stage 1 shown separating and falling away — the
 * exact "dropping used, empty fuel tanks" mechanic the teaching text
 * describes, plus the Saturn V worked example right below it.
 */
export function RocketStagingDiagram() {
  return (
    <svg viewBox="0 0 400 240" className="w-full" role="img" aria-label="Diagram of a 3-stage rocket with the spent first stage separating and falling away">
      {/* payload fairing (nose cone) */}
      <path d="M180 10 L 220 10 L 210 45 L 190 45 Z" fill="#E8ECF4" />
      <text x="260" y="30" fill="#E8ECF4" fontSize="11" fontFamily="monospace">payload fairing</text>

      {/* stage 3 */}
      <rect x="182" y="45" width="36" height="35" fill="#2A3752" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="260" y="65" fill="#94A3B8" fontSize="11" fontFamily="monospace">stage 3</text>

      {/* stage 2 */}
      <rect x="182" y="80" width="36" height="40" fill="#2A3752" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="260" y="103" fill="#94A3B8" fontSize="11" fontFamily="monospace">stage 2</text>

      {/* stage 1, still attached */}
      <rect x="182" y="120" width="36" height="50" fill="#2A3752" stroke="#94A3B8" strokeWidth="1.5" />
      <text x="260" y="148" fill="#94A3B8" fontSize="11" fontFamily="monospace">stage 1</text>

      {/* stage 1, separating and falling away (spent, dropped) */}
      <g opacity="0.55">
        <rect x="150" y="195" width="36" height="30" fill="#2A3752" stroke="#F5A524" strokeWidth="1.5" transform="rotate(18 168 210)" />
      </g>
      <text x="105" y="230" fill="#F5A524" fontSize="11" fontFamily="monospace">stage 1 — spent, dropped</text>

      {/* separation arrow */}
      <line x1="200" y1="172" x2="185" y2="195" stroke="#F5A524" strokeWidth="2" markerEnd="url(#arrowFall)" />
      <defs>
        <marker id="arrowFall" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#F5A524" />
        </marker>
      </defs>
    </svg>
  );
}
