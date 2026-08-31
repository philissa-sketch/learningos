/**
 * Simple inline SVG diagram (same pattern as the Aerospace diagrams —
 * PROJECT_PLAN.md "instructional-design audit," gap 4). Matches the
 * "The Box Model" beat of tech7-css-2: four nested rectangles showing
 * margin (outermost), border, padding, and content (innermost) — the
 * exact margin/border/padding/content stack the teaching text describes.
 */
export function CssBoxModelDiagram() {
  return (
    <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="Diagram of the CSS box model: margin, border, padding, and content nested rectangles">
      {/* margin (outermost) */}
      <rect x="10" y="10" width="380" height="240" fill="none" stroke="#F5A524" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="16" y="26" fill="#F5A524" fontSize="12" fontFamily="monospace">margin</text>

      {/* border */}
      <rect x="55" y="45" width="290" height="170" fill="#2A3752" stroke="#E8ECF4" strokeWidth="3" />
      <text x="61" y="60" fill="#E8ECF4" fontSize="12" fontFamily="monospace">border</text>

      {/* padding */}
      <rect x="85" y="75" width="230" height="110" fill="#131B2E" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="91" y="90" fill="#34D399" fontSize="12" fontFamily="monospace">padding</text>

      {/* content (innermost) */}
      <rect x="130" y="105" width="140" height="50" fill="#22D3EE" opacity="0.85" />
      <text x="150" y="135" fill="#0B1120" fontSize="13" fontFamily="monospace" fontWeight="bold">content</text>
    </svg>
  );
}
