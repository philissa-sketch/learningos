/**
 * Simple inline SVG diagram (same pattern as the Aerospace/CSS diagrams —
 * PROJECT_PLAN.md "instructional-design audit," gap 4). Matches the
 * "Lists and Tables" / divs beats of tech7-html-2: a nested-box view of
 * <div> > <ul> > <li> elements, showing how HTML tags nest inside each
 * other like containers within containers.
 */
export function HtmlNestingDiagram() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Diagram of nested HTML tags: a div containing a ul, containing two li items">
      {/* outer div */}
      <rect x="10" y="10" width="380" height="200" fill="none" stroke="#22D3EE" strokeWidth="2" />
      <text x="18" y="28" fill="#22D3EE" fontSize="13" fontFamily="monospace">&lt;div&gt;</text>

      {/* ul inside div */}
      <rect x="35" y="45" width="330" height="140" fill="none" stroke="#F5A524" strokeWidth="1.5" />
      <text x="43" y="63" fill="#F5A524" fontSize="12" fontFamily="monospace">&lt;ul&gt;</text>

      {/* li item 1 */}
      <rect x="60" y="80" width="280" height="40" fill="#2A3752" stroke="#34D399" strokeWidth="1.5" />
      <text x="68" y="105" fill="#34D399" fontSize="12" fontFamily="monospace">&lt;li&gt;Milk&lt;/li&gt;</text>

      {/* li item 2 */}
      <rect x="60" y="130" width="280" height="40" fill="#2A3752" stroke="#34D399" strokeWidth="1.5" />
      <text x="68" y="155" fill="#34D399" fontSize="12" fontFamily="monospace">&lt;li&gt;Eggs&lt;/li&gt;</text>

      <text x="35" y="200" fill="#E8ECF4" fontSize="11" fontFamily="monospace">&lt;/ul&gt;</text>
      <text x="18" y="215" fill="#E8ECF4" fontSize="11" fontFamily="monospace" opacity="0">.</text>
    </svg>
  );
}
