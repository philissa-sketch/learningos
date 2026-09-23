import { SHELF_ITEMS } from '../../data/rewards/petalCatalog.js';

// ---------------------------------------------------------------------------
// THE APOTHECARY SHELF — three real shelves, with the jars standing on them.
//
// Same rule as the greenhouse and the avatar: things she buys have to go
// SOMEWHERE. A grid of emoji cards labelled "on your shelf" is a list of
// receipts, not a shelf, and a nine-year-old can tell the difference instantly.
//
// Unowned items are drawn as dashed outlines standing in their own places, with
// their price underneath. The gaps are the point — an empty run of shelf asks to
// be filled, and she can see exactly what filling it costs.
// ---------------------------------------------------------------------------

const VB = { w: 660, h: 520 };
/** Three shelf boards. `y` is the top surface — where things stand. */
const ROWS = [150, 290, 430];

const C = {
  wood: '#B08A5A',
  woodDark: '#8A6A42',
  woodEdge: '#6E5334',
  wall: '#F4ECE1',
  ghost: 'rgba(122,92,58,.45)',
  glassBlue: '#9FC4DA',
  glassAmber: '#D9A356',
  brass: '#D9A82F',
  brassDark: '#A87C15',
  leaf: '#7FA87A',
  paper: '#F6F1E7',
  stone: '#CFC8C0'
};

/* Each drawn from (0,0) = where it stands on the shelf board. */
const ART = {
  'sh-seed-envelopes': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.paper)}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${i * 4 - 6} ${-i * 3})`}>
          <path d="M-18 0 L-18 -26 L18 -26 L18 0 Z" />
          <path d="M-18 -26 L0 -14 L18 -26" fill="none" strokeWidth="2" />
          {s.solid && <path d="M-11 -7 L7 -7" stroke="#8B7D86" strokeWidth="1.8" />}
        </g>
      ))}
    </g>
  ),
  'sh-recipe-box': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#C08A6A')}>
      <path d="M-28 0 L-28 -30 L28 -30 L28 0 Z" />
      <path d="M-24 -30 L-24 -46 L24 -46 L24 -30" fill={s.fill(C.paper)} />
      {s.solid && (
        <>
          <path d="M-24 -40 L24 -40 M-24 -35 L24 -35" stroke="#CBBFAE" strokeWidth="1.6" />
          <path d="M-6 -50 L-6 -30" stroke="#C96A8E" strokeWidth="4" />
        </>
      )}
      <path d="M-28 -14 L28 -14" fill="none" strokeWidth="1.8" />
    </g>
  ),
  'sh-oil-burner': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.stone)}>
      <path d="M-20 0 L-14 -18 L14 -18 L20 0 Z" />
      <path d="M-20 -18 q20 -12 40 0 q-8 10 -20 10 q-12 0 -20 -10 Z" fill={s.fill('#E4DED6')} />
      {s.solid && <ellipse cx="0" cy="-22" rx="11" ry="4" fill="#DCE9EC" />}
      {s.solid && (
        <path d="M0 -30 q-7 -10 0 -18 q7 8 0 18 Z" fill="#F0C05A" stroke="#D9A82F" strokeWidth="1.6" />
      )}
      <path d="M-9 -8 q9 8 18 0" fill="none" strokeWidth="2" />
    </g>
  ),
  'sh-herbarium': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#9C7645')}>
      <path d="M-26 0 L-26 -56 L26 -56 L26 0 Z" />
      <path d="M-21 -52 L21 -52 L21 -4 L-21 -4 Z" fill={s.fill(C.paper)} strokeWidth="2" />
      {s.solid && (
        <>
          <path d="M0 -12 L0 -40" stroke="#5E7A52" strokeWidth="2" />
          <ellipse cx="-8" cy="-34" rx="8" ry="5" fill={C.leaf} transform="rotate(-24 -8 -34)" />
          <ellipse cx="8" cy="-27" rx="8" ry="5" fill={C.leaf} transform="rotate(24 8 -27)" />
          <ellipse cx="0" cy="-44" rx="6" ry="6" fill="#E88AA0" />
          <path d="M-16 -8 L4 -8" stroke="#8B7D86" strokeWidth="1.6" />
        </>
      )}
      <path d="M-26 -56 L-26 0" strokeWidth="4" />
    </g>
  ),
  'sh-tincture-rack': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.wood)}>
      <path d="M-42 0 L-42 -8 L42 -8 L42 0 Z" />
      <path d="M-42 -8 L-42 -54 M42 -8 L42 -54" fill="none" strokeWidth="3" />
      <path d="M-42 -54 L42 -54" fill="none" strokeWidth="3" />
      {[-30, -15, 0, 15, 30].map((x, i) => (
        <g key={x}>
          <path
            d={`M${x - 5} -8 L${x - 5} -34 q0 -4 2 -5 L${x + 3} -39 q2 1 2 5 L${x + 5} -8 Z`}
            fill={s.fill(i % 2 ? '#C08A4A' : '#8FB8D8')}
            strokeWidth="2"
          />
          <rect x={x - 4} y="-45" width="8" height="6" rx="2" fill={s.fill(C.woodDark)} strokeWidth="1.6" />
        </g>
      ))}
    </g>
  ),
  'sh-still': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#C98F4F')}>
      <path d="M-30 0 L-26 -34 L26 -34 L30 0 Z" />
      <ellipse cx="0" cy="-34" rx="26" ry="8" fill={s.fill('#D9A356')} />
      <path d="M-14 -40 q14 -22 28 0 Z" fill={s.fill('#B87C3A')} />
      <path d="M0 -62 q0 -10 4 -14" fill="none" strokeWidth="3" />
      <path d="M4 -76 q22 -4 26 16 q4 20 -8 30" fill="none" strokeWidth="3.5" />
      <path d="M22 -30 L34 -30 L34 0 L22 0 Z" fill={s.fill('#9FC4DA')} strokeWidth="2" />
      {s.solid && <path d="M24 -14 L32 -14" stroke="#6E9BB8" strokeWidth="3" />}
      {s.solid && <ellipse cx="0" cy="-34" rx="18" ry="5" fill="#E6C089" opacity=".6" />}
      <path d="M-30 0 L-36 6 L36 6 L30 0" fill={s.fill(C.woodDark)} strokeWidth="2" />
    </g>
  ),
  'sh-jar-blue': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.glassBlue)}>
      <path d="M-20 0 L-20 -52 q0 -8 6 -10 L14 -62 q6 2 6 10 L20 0 Z" />
      <rect x="-15" y="-76" width="30" height="14" rx="3" fill={s.fill(C.woodDark)} />
      {s.solid && <path d="M-13 -46 L13 -46" stroke="#7FA8C4" strokeWidth="3" />}
      {s.solid && <path d="M-12 -30 q6 -6 12 0 q6 6 12 0" stroke="#4F7A4B" strokeWidth="2.5" fill="none" />}
    </g>
  ),
  'sh-jar-amber': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.glassAmber)}>
      <ellipse cx="0" cy="-30" rx="22" ry="32" />
      <rect x="-11" y="-72" width="22" height="14" rx="3" fill={s.fill(C.woodDark)} />
      {s.solid && <ellipse cx="-7" cy="-40" rx="5" ry="9" fill="#F0C784" opacity=".7" />}
    </g>
  ),
  'sh-labels': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.paper)}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 5 - 5} ${-i * 4})`}>
          <rect x="-24" y="-30" width="48" height="30" rx="3" />
          {s.solid && (
            <>
              <path d="M-17 -21 L11 -21" stroke="#8B7D86" strokeWidth="2" />
              <path d="M-17 -13 L5 -13" stroke="#C4BBC0" strokeWidth="2" />
            </>
          )}
        </g>
      ))}
    </g>
  ),
  'sh-journal': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#7FA87A')}>
      <path d="M-16 0 L-16 -58 L18 -58 L18 0 Z" />
      <path d="M-16 -58 L-10 -62 L24 -62 L18 -58" fill={s.fill('#4F7A4B')} />
      <path d="M18 0 L24 -4 L24 -62 L18 -58 Z" fill={s.fill('#4F7A4B')} />
      {s.solid && <path d="M-9 -50 L11 -50 M-9 -42 L6 -42" stroke={C.paper} strokeWidth="2.5" />}
    </g>
  ),
  'sh-mortar': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.stone || '#CFC8C0')}>
      <path d="M-30 -20 q0 26 30 26 q30 0 30 -26 Z" fill={s.fill('#CFC8C0')} />
      <ellipse cx="0" cy="-20" rx="30" ry="9" fill={s.fill('#BDB6AE')} />
      <path d="M14 -24 L34 -70" strokeWidth="8" strokeLinecap="round" stroke={s.solid ? '#BDB6AE' : s.stroke} />
      <circle cx="35" cy="-72" r="7" fill={s.fill('#CFC8C0')} />
    </g>
  ),
  'sh-scales': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.brass)}>
      <path d="M-16 0 L16 0 L10 -10 L-10 -10 Z" />
      <path d="M0 -10 L0 -66" strokeWidth="3.5" fill="none" />
      <path d="M-34 -66 L34 -66" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M-34 -66 L-34 -50 M34 -66 L34 -50" strokeWidth="2" fill="none" />
      <path d="M-46 -50 L-22 -50 L-34 -38 Z" />
      <path d="M22 -50 L46 -50 L34 -38 Z" />
      {s.solid && <circle cx="0" cy="-70" r="4.5" fill={C.brassDark} />}
    </g>
  ),
  'sh-microscope': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.brass)}>
      <path d="M-26 0 L26 0 L20 -10 L-20 -10 Z" />
      <path d="M-4 -10 L-4 -46 q0 -14 14 -18 L18 -30" fill="none" strokeWidth="5" />
      <rect x="10" y="-86" width="14" height="34" rx="5" />
      <path d="M-20 -34 L10 -34" strokeWidth="4" fill="none" />
      {s.solid && <circle cx="17" cy="-90" r="6" fill="#DFF0E4" stroke={C.brassDark} strokeWidth="2" />}
    </g>
  ),
  'sh-press': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.wood)}>
      <rect x="-34" y="-14" width="68" height="14" rx="2" />
      <rect x="-34" y="-34" width="68" height="12" rx="2" fill={s.fill(C.paper)} />
      <rect x="-34" y="-52" width="68" height="14" rx="2" />
      {[-26, 26].map((x) => (
        <g key={x}>
          <path d={`M${x} -56 L${x} 2`} strokeWidth="3.5" fill="none" stroke={s.solid ? C.brassDark : s.stroke} />
          <circle cx={x} cy={-58} r="5" fill={s.fill(C.brass)} />
        </g>
      ))}
      {s.solid && <path d="M-14 -28 q8 -8 16 0" stroke={C.leaf} strokeWidth="2.5" fill="none" />}
    </g>
  ),
  'sh-drying-rack': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill="none">
      <path d="M-40 0 L-40 -70 M40 0 L40 -70" strokeWidth="4" />
      <path d="M-46 -70 L46 -70" strokeWidth="4" strokeLinecap="round" />
      {[-28, -10, 8, 26].map((x, i) => (
        <g key={x}>
          <path d={`M${x} -70 L${x} ${-56 + (i % 2) * 4}`} strokeWidth="2" />
          {s.solid && (
            <g fill={i % 2 ? C.leaf : '#A78BD9'} stroke="rgba(58,48,56,.3)" strokeWidth="1">
              <ellipse cx={x} cy={-44 + (i % 2) * 4} rx="8" ry="15" />
            </g>
          )}
        </g>
      ))}
    </g>
  ),
  'sh-cabinet': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill(C.wood)}>
      <rect x="-46" y="-96" width="92" height="96" rx="3" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c2) => (
          <g key={`${r}-${c2}`}>
            <rect
              x={-42 + c2 * 21}
              y={-92 + r * 23}
              width="19"
              height="21"
              rx="2"
              fill={s.solid ? C.woodDark : 'none'}
              stroke={s.stroke}
              strokeWidth="1.5"
            />
            {s.solid && <circle cx={-32.5 + c2 * 21} cy={-81 + r * 23} r="2" fill={C.brass} />}
          </g>
        ))
      )}
    </g>
  )
};

function ShelfItem({ item, owned }) {
  const draw = ART[item.id];
  if (!draw || !item.shelf) return null;
  const s = {
    solid: owned,
    stroke: owned ? 'rgba(58,48,56,.55)' : C.ghost,
    fill: (colour) => (owned ? colour : 'none')
  };
  const y = ROWS[item.shelf.row];
  return (
    <g
      transform={`translate(${item.shelf.x} ${y})`}
      opacity={owned ? 1 : 0.8}
      strokeDasharray={owned ? undefined : '6 5'}
    >
      {draw(s)}
      {!owned && (
        <text
          x="0"
          y="20"
          textAnchor="middle"
          fontSize="15"
          fill={C.ghost}
          fontFamily="Quicksand, sans-serif"
          fontWeight="700"
          strokeDasharray="0"
          stroke="none"
        >
          🌸 {item.cost}
        </text>
      )}
    </g>
  );
}

export function ApothecaryShelf({ owned = [], showGhosts = true, className = '' }) {
  const has = (id) => owned.includes(id);
  const visible = SHELF_ITEMS.filter((i) => has(i.id) || showGhosts);

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className={className}
      role="img"
      aria-label="Your apothecary shelf"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <rect x="0" y="0" width={VB.w} height={VB.h} fill={C.wall} />
      {/* panelling behind, so the shelves read as being ON something */}
      <g stroke="rgba(122,92,58,.12)" strokeWidth="3">
        {[110, 230, 350, 470, 590].map((x) => (
          <path key={x} d={`M${x} 0 L${x} ${VB.h}`} />
        ))}
      </g>

      {/* the boards */}
      {ROWS.map((y) => (
        <g key={y}>
          <rect x="18" y={y} width={VB.w - 36} height="15" rx="2" fill={C.wood} />
          <rect x="18" y={y + 12} width={VB.w - 36} height="7" rx="2" fill={C.woodEdge} />
          {/* brackets */}
          {[40, VB.w - 62].map((x) => (
            <path key={x} d={`M${x} ${y + 19} L${x + 22} ${y + 19} L${x + 22} ${y + 44} Z`} fill={C.woodDark} />
          ))}
        </g>
      ))}

      {visible.map((item) => (
        <ShelfItem key={item.id} item={item} owned={has(item.id)} />
      ))}
    </svg>
  );
}
