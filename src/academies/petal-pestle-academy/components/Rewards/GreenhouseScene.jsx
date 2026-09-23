import { GREENHOUSE_ITEMS } from '../../data/rewards/petalCatalog.js';
import {
  VB,
  BACK,
  place,
  wallQuad,
  LEFT_BENCH,
  RIGHT_SHELF,
  SHELF_BOARD_GAP,
  BACK_SILL
} from '../../config/room.js';

// ---------------------------------------------------------------------------
// THE GREENHOUSE — drawn, not arranged.
//
// Her brother's HQ took three attempts to get here and the notes in his version
// say why: a grid of cards is not a room, and emoji moved to coordinates over a
// gradient is not a room either. Emoji are glyphs sitting in FRONT of a
// background; no amount of positioning turns a glyph into furniture.
//
// So this is geometry. One-point perspective with a real vanishing box: a glass
// back wall, two side walls and a roof running to it, a floor plane, and every
// object drawn as SVG shapes standing on that floor.
//
// UNOWNED THINGS ARE DRAWN AS OUTLINES WHERE THEY WOULD GO. The empty
// greenhouse shows its own plan — the stool has a dashed stool-shape waiting for
// it. A half-built greenhouse asks to be finished in a way a locked shop card
// never does, and she can see what her Petals are FOR before she has any.
// ---------------------------------------------------------------------------

const C = {
  glass: '#DFF0E4',
  glassDeep: '#C9E3D2',
  frame: '#A9BFAE',
  frameDark: '#8AA290',
  wallSide: '#EFE6D9',
  wallSideDark: '#E4D6C4',
  floor: '#D9C3AE',
  floorFar: '#E4D2C0',
  grout: 'rgba(122,92,58,.18)',
  wood: '#B08A5A',
  woodDark: '#8A6A42',
  leaf: '#7FA87A',
  leafDark: '#4F7A4B',
  petal: '#E88AA0',
  gold: '#D9A82F',
  stone: '#CFC8C0',
  ghost: 'rgba(90,120,95,.42)'
};

/* ------------------------------------------------------------------ *
 * The furniture. Each is drawn from its own base point — (0,0) is
 * where it meets the floor, horizontally centred — so placing it is
 * just a translate and a scale.
 *
 * `s.solid` is false for a thing she does not own yet: stroke only,
 * dashed, no fill.
 * ------------------------------------------------------------------ */
const ART = {
  // ---- mounted on the walls ----------------------------------------------
  // (0,0) is the point on the wall the thing is fixed to.
  'gh-thermometer': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <rect x="-13" y="-72" width="26" height="76" rx="5" fill={s.fill('#EFE3D2')} />
      <path d="M0 -62 L0 -14" strokeWidth="5" stroke={s.solid ? '#C0403A' : s.stroke} fill="none" />
      <circle cx="0" cy="-6" r="9" fill={s.fill('#C0403A')} />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M4 ${-60 + i * 11} L10 ${-60 + i * 11}`} strokeWidth="1.6" fill="none" />
      ))}
    </g>
  ),
  'gh-pegboard': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <rect x="-46" y="-64" width="92" height="72" rx="4" fill={s.fill('#C8A16A')} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c2) => (
          <circle key={`${r}-${c2}`} cx={-34 + c2 * 17} cy={-52 + r * 20} r="2.4" fill={s.solid ? '#8A6A42' : 'none'} strokeWidth="1.2" />
        ))
      )}
      {s.solid && (
        <g stroke="#6E5334" strokeWidth="3" fill="none">
          <path d="M-30 -50 L-30 -20" />
          <path d="M-36 -20 L-24 -20" strokeWidth="6" />
          <path d="M0 -50 L0 -26" />
          <path d="M-7 -26 q7 9 14 0" strokeWidth="4" />
          <path d="M30 -50 L30 -30" />
          <circle cx="30" cy="-22" r="8" strokeWidth="3" />
        </g>
      )}
    </g>
  ),
  'gh-drying-bunches': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M-40 0 L40 0" strokeWidth="3.5" fill="none" />
      {[-26, 0, 26].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 0 L${x} ${16 + i * 4}`} strokeWidth="2" fill="none" />
          <path
            d={`M${x - 13} ${16 + i * 4} L${x + 13} ${16 + i * 4} L${x} ${62 + i * 8} Z`}
            fill={s.fill(i % 2 ? '#8FA86E' : '#A88C5E')}
          />
          {s.solid && (
            <path d={`M${x - 6} ${26 + i * 4} L${x + 6} ${34 + i * 4} M${x + 6} ${26 + i * 4} L${x - 4} ${38 + i * 4}`} stroke="#6E7F4E" strokeWidth="1.6" fill="none" />
          )}
          <path d={`M${x - 8} ${18 + i * 4} L${x + 8} ${18 + i * 4}`} stroke={s.solid ? '#C96A8E' : s.stroke} strokeWidth="3" fill="none" />
        </g>
      ))}
    </g>
  ),
  'gh-wreath': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5">
      <circle cx="0" cy="-4" r="38" fill="none" strokeWidth="14" stroke={s.solid ? '#7F8F5E' : s.stroke} />
      <circle cx="0" cy="-4" r="38" fill="none" strokeWidth="2" />
      {s.solid &&
        [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          const cx = Math.cos(a) * 38;
          const cy = -4 + Math.sin(a) * 38;
          return (
            <circle key={i} cx={cx} cy={cy} r={i % 2 ? 6 : 4.5} fill={i % 3 === 0 ? C.petal : i % 3 === 1 ? C.gold : '#C99FD0'} stroke="none" />
          );
        })}
      <path d="M-9 -46 q9 -12 18 0" fill="none" strokeWidth="3" stroke={s.solid ? '#C96A8E' : s.stroke} />
    </g>
  ),

  // ---- hanging from the roof ---------------------------------------------
  // (0,0) is where it is tied to the beam; these draw DOWNWARD, like the lantern.
  'gh-wind-chime': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M0 0 L0 20" strokeWidth="2" fill="none" />
      <ellipse cx="0" cy="26" rx="26" ry="6" fill={s.fill(C.wood)} />
      {[-18, -6, 6, 18].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 30 L${x} ${46 + i * 9}`} strokeWidth="1.6" fill="none" />
          <path
            d={`M${x - 7} ${46 + i * 9} q7 ${16} 14 0 q-7 -6 -14 0 Z`}
            fill={s.fill(i % 2 ? '#EBD9C4' : '#D9C0D8')}
            strokeWidth="1.8"
          />
        </g>
      ))}
    </g>
  ),
  'gh-hanging-baskets': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      {[{ x: -30, d: 0 }, { x: 30, d: 22 }].map((b) => (
        <g key={b.x}>
          <path d={`M${b.x} 0 L${b.x - 16} ${26 + b.d} M${b.x} 0 L${b.x + 16} ${26 + b.d} M${b.x} 0 L${b.x} ${26 + b.d}`} strokeWidth="1.8" fill="none" />
          <path
            d={`M${b.x - 22} ${26 + b.d} L${b.x + 22} ${26 + b.d} q-4 26 -22 26 q-18 0 -22 -26 Z`}
            fill={s.fill('#A98253')}
          />
          {s.solid && (
            <>
              <path d={`M${b.x - 16} ${44 + b.d} q16 -8 32 0`} stroke="#7A5C3A" strokeWidth="1.6" fill="none" />
              <path d={`M${b.x - 18} ${32 + b.d} q-8 22 -2 34`} stroke={C.leafDark} strokeWidth="2.5" fill="none" />
              <path d={`M${b.x + 18} ${32 + b.d} q10 20 2 30`} stroke={C.leafDark} strokeWidth="2.5" fill="none" />
              <ellipse cx={b.x - 22} cy={70 + b.d} rx="7" ry="4.5" fill={C.leaf} stroke="none" />
              <ellipse cx={b.x + 22} cy={64 + b.d} rx="7" ry="4.5" fill={C.leaf} stroke="none" />
              <circle cx={b.x - 2} cy={22 + b.d} r="4.5" fill={C.petal} stroke="none" />
            </>
          )}
        </g>
      ))}
    </g>
  ),
  'gh-string-lights': (s) => (
    <g stroke={s.stroke} strokeWidth="2" strokeLinecap="round" fill="none">
      <path d="M-96 0 Q-48 34 0 16 Q48 -2 96 26" strokeWidth="2.4" />
      {[-80, -52, -24, 6, 34, 62, 88].map((x, i) => {
        const y = [14, 30, 32, 22, 12, 12, 26][i];
        return (
          <g key={x}>
            <path d={`M${x} ${y - 6} L${x} ${y}`} strokeWidth="1.4" />
            <circle cx={x} cy={y + 6} r="6" fill={s.fill(i % 2 ? '#F3DCA4' : '#F7C6D0')} strokeWidth="1.8" />
          </g>
        );
      })}
    </g>
  ),
  'gh-drying-rail': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M-56 0 L-56 14 M56 0 L56 14" strokeWidth="2" fill="none" />
      <path d="M-62 14 L62 14" strokeWidth="6" stroke={s.solid ? C.woodDark : s.stroke} fill="none" />
      {[-42, -20, 2, 24, 46].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 14 L${x} ${24 + (i % 2) * 6}`} strokeWidth="1.6" fill="none" />
          <path
            d={`M${x - 11} ${24 + (i % 2) * 6} L${x + 11} ${24 + (i % 2) * 6} L${x} ${72 + (i % 2) * 10} Z`}
            fill={s.fill(i % 3 === 0 ? '#8FA86E' : i % 3 === 1 ? '#B0925E' : '#9BA87E')}
          />
          <path d={`M${x - 7} ${27 + (i % 2) * 6} L${x + 7} ${27 + (i % 2) * 6}`} stroke={s.solid ? '#C96A8E' : s.stroke} strokeWidth="2.6" fill="none" />
        </g>
      ))}
    </g>
  ),
  // ---- on the window sill ------------------------------------------------
  'gh-sill-seedlings': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#C98F4F')} strokeLinecap="round">
      {[-46, -28, -10, 8, 26, 44].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 8} -18 L${x + 8} -18 L${x + 6} 0 L${x - 6} 0 Z`} />
          <path d={`M${x} -18 L${x} ${-24 - (i % 3) * 6}`} stroke={C.leafDark} fill="none" strokeWidth="2" />
          <ellipse cx={x - 3} cy={-27 - (i % 3) * 6} rx="5" ry="3.5" fill={s.fill(C.leaf)} stroke="none" />
          <ellipse cx={x + 4} cy={-24 - (i % 3) * 6} rx="4.5" ry="3" fill={s.fill(C.leaf)} stroke="none" />
        </g>
      ))}
    </g>
  ),
  'gh-sill-bottles': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      {[
        { x: -26, h: 46, c: '#7FA87A' },
        { x: 0, h: 60, c: '#8FB8D8' },
        { x: 24, h: 38, c: '#D9A82F' }
      ].map((b) => (
        <g key={b.x}>
          <path d={`M${b.x - 9} 0 L${b.x - 9} ${-b.h + 12} L${b.x - 3} ${-b.h} L${b.x + 3} ${-b.h} L${b.x + 9} ${-b.h + 12} L${b.x + 9} 0 Z`} fill={s.fill(b.c)} />
          <path d={`M${b.x - 3} ${-b.h} L${b.x + 3} ${-b.h}`} strokeWidth="4" />
        </g>
      ))}
    </g>
  ),
  'gh-sill-orchid': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M-16 0 L-13 -26 L13 -26 L16 0 Z" fill={s.fill('#E4DED6')} />
      <path d="M-2 -26 q-4 -30 6 -46" fill="none" strokeWidth="3" stroke={s.solid ? C.leafDark : s.stroke} />
      {[[6, -74], [16, -62], [-4, -58]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill={s.fill(C.petal)} />
          <circle cx={cx} cy={cy} r="3" fill={s.fill(C.gold)} stroke="none" />
        </g>
      ))}
      <ellipse cx="-13" cy="-30" rx="12" ry="5" fill={s.fill(C.leaf)} />
      <ellipse cx="13" cy="-32" rx="11" ry="5" fill={s.fill(C.leaf)} />
    </g>
  ),
  'gh-stained-glass': (s) => (
    <g stroke={s.stroke} strokeWidth="3" strokeLinejoin="round">
      <rect x="-58" y="-150" width="116" height="150" rx="6" fill={s.fill('#EFE3D2')} />
      <path d="M-58 -100 L58 -100 M-58 -50 L58 -50 M0 -150 L0 0" strokeWidth="2.5" fill="none" />
      <path d="M-58 -150 L0 -100 L-58 -50 Z" fill={s.fill('#C98FB8')} strokeWidth="2" />
      <path d="M58 -150 L0 -100 L58 -50 Z" fill={s.fill('#8FB8D8')} strokeWidth="2" />
      <path d="M-58 -50 L0 -20 L-58 0 Z" fill={s.fill(C.leaf)} strokeWidth="2" />
      <path d="M58 -50 L0 -20 L58 0 Z" fill={s.fill(C.gold)} strokeWidth="2" />
      <circle cx="0" cy="-100" r="14" fill={s.fill('#E88AA0')} strokeWidth="2.5" />
    </g>
  ),

  // ---- on the lower wall shelf -------------------------------------------
  'gh-shelf-baskets': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" fill={s.fill('#C8A16A')} strokeLinecap="round">
      <path d="M-30 -20 L30 -20 L24 0 L-24 0 Z" />
      <path d="M-26 -38 L26 -38 L22 -21 L-22 -21 Z" />
      <path d="M-20 -52 L20 -52 L17 -39 L-17 -39 Z" />
      <path d="M-24 -13 L24 -13 M-22 -31 L22 -31" fill="none" strokeWidth="1.8" />
    </g>
  ),
  'gh-shelf-tins': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      {[-24, 0, 24].map((x, i) => (
        <g key={x}>
          <rect x={x - 11} y={-30 - (i === 1 ? 6 : 0)} width="22" height={30 + (i === 1 ? 6 : 0)} rx="3" fill={s.fill(i % 2 ? '#9FC0B4' : '#D8B48A')} />
          <rect x={x - 12} y={-34 - (i === 1 ? 6 : 0)} width="24" height="5" rx="2" fill={s.fill(C.woodDark)} />
          <path d={`M${x - 7} -16 L${x + 7} -16`} strokeWidth="1.6" fill="none" />
        </g>
      ))}
    </g>
  ),
  'gh-shelf-clock': (s) => (
    <g stroke={s.stroke} strokeWidth="3" strokeLinecap="round">
      <circle cx="0" cy="-30" r="28" fill={s.fill('#F3E7D2')} />
      <circle cx="0" cy="-30" r="22" fill="none" strokeWidth="1.8" />
      <path d="M0 -30 L0 -46 M0 -30 L11 -24" fill="none" strokeWidth="3" />
      <path d="M-16 -3 L16 -3 L12 0 L-12 0 Z" fill={s.fill(C.woodDark)} />
    </g>
  ),

  // ---- on the potting bench ----------------------------------------------
  'gh-bench-sieve': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M-26 -22 L26 -22 L22 0 L-22 0 Z" fill={s.fill('#B9BDBE')} />
      <ellipse cx="0" cy="-22" rx="26" ry="7" fill={s.fill('#D3D7D8')} />
      <path d="M-16 -22 L-13 0 M0 -22 L0 0 M16 -22 L13 0" fill="none" strokeWidth="1.5" />
      <path d="M26 -20 L36 -16" fill="none" />
    </g>
  ),
  'gh-bench-propagator': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <path d="M-34 0 L-34 -14 L34 -14 L34 0 Z" fill={s.fill('#9C7645')} />
      <path d="M-32 -14 q32 -44 64 0 Z" fill={s.fill('#DFF0E4')} opacity={s.solid ? 0.85 : 1} />
      <path d="M0 -14 L0 -44" fill="none" strokeWidth="1.6" />
      {[-18, 0, 18].map((x) => (
        <ellipse key={x} cx={x} cy="-20" rx="6" ry="4" fill={s.fill(C.leaf)} stroke="none" />
      ))}
    </g>
  ),
  'gh-bench-terrarium': (s) => (
    <g stroke={s.stroke} strokeWidth="2.5" strokeLinecap="round">
      <circle cx="0" cy="-38" r="36" fill={s.fill('#DFF0E4')} opacity={s.solid ? 0.7 : 1} />
      <path d="M-14 -74 L14 -74 L11 -66 L-11 -66 Z" fill={s.fill(C.frame)} />
      <path d="M-30 -22 q30 14 60 0 q-6 16 -30 16 q-24 0 -30 -16 Z" fill={s.fill('#8A6A42')} stroke="none" />
      <path d="M-8 -22 q-4 -22 4 -32" fill="none" stroke={s.solid ? C.leafDark : s.stroke} strokeWidth="2.5" />
      <ellipse cx="-14" cy="-52" rx="9" ry="6" fill={s.fill(C.leaf)} stroke="none" />
      <ellipse cx="4" cy="-58" rx="8" ry="5" fill={s.fill(C.leaf)} stroke="none" />
      <ellipse cx="14" cy="-40" rx="10" ry="6" fill={s.fill(C.leaf)} stroke="none" />
    </g>
  ),
  'gh-stool': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill(C.wood)} strokeLinecap="round">
      <ellipse cx="0" cy="-46" rx="34" ry="10" />
      <path d="M-26 -42 L-32 0 M26 -42 L32 0 M0 -40 L0 0" fill="none" />
      <path d="M-24 -22 L24 -22" fill="none" strokeWidth="2.5" />
    </g>
  ),
  'gh-watering-can': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill('#C98F4F')} strokeLinecap="round">
      <path d="M-22 -44 L22 -44 L18 0 L-18 0 Z" />
      <path d="M22 -38 L46 -20 L44 -12" fill="none" />
      <path d="M40 -16 L52 -10 L44 -6 Z" />
      <path d="M-22 -40 q-16 -10 -4 -22" fill="none" />
      <ellipse cx="0" cy="-44" rx="22" ry="6" />
    </g>
  ),
  'gh-window-box': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill(C.wood)}>
      <path d="M-70 -26 L70 -26 L62 0 L-62 0 Z" />
      <path d="M-70 -20 L70 -20" strokeWidth="2" fill="none" />
      {[-52, -30, -8, 14, 36, 56].map((x, i) => (
        <g key={x}>
          <path d={`M${x} -26 q${i % 2 ? 6 : -6} -22 ${i % 2 ? 2 : -2} -34`} stroke={s.solid ? C.leafDark : s.stroke} strokeWidth="3" fill="none" />
          <circle cx={x + (i % 2 ? 2 : -2)} cy={-62} r="8" fill={s.fill(i % 2 ? C.petal : C.leaf)} stroke={s.stroke} strokeWidth="2" />
        </g>
      ))}
    </g>
  ),
  // Hangs from the roof: drawn DOWNWARD from its anchor instead of up from a floor.
  'gh-lantern': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill('#F7C6D0')}>
      <path d="M0 0 L0 26" fill="none" strokeWidth="2" />
      <ellipse cx="0" cy="56" rx="30" ry="30" />
      <path d="M-30 56 L30 56" strokeWidth="2" fill="none" opacity=".6" />
      <path d="M0 26 L0 86" strokeWidth="1.5" fill="none" opacity=".5" />
      <path d="M-8 88 L8 88 L4 100 L-4 100 Z" fill={s.fill(C.gold)} />
      {s.solid && <ellipse cx="0" cy="56" rx="30" ry="30" fill="#F3DCA4" opacity=".35" />}
    </g>
  ),
  'gh-cat': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill('#8B7D86')} strokeLinejoin="round">
      <ellipse cx="0" cy="-16" rx="38" ry="17" />
      <circle cx="-28" cy="-26" r="15" />
      <path d="M-38 -36 L-34 -48 L-26 -38 Z" />
      <path d="M-22 -38 L-18 -48 L-12 -36 Z" />
      <path d="M30 -22 q22 -6 14 -20" fill="none" strokeWidth="6" strokeLinecap="round" />
      {s.solid && (
        <>
          <path d="M-34 -26 q3 2 6 0" stroke="#3A3038" strokeWidth="2" fill="none" />
          <path d="M-24 -26 q3 2 6 0" stroke="#3A3038" strokeWidth="2" fill="none" />
        </>
      )}
    </g>
  ),
  'gh-bee-hotel': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill(C.wood)}>
      <path d="M-4 0 L-4 -46 L4 -46 L4 0 Z" />
      <path d="M-40 -46 L40 -46 L40 -104 L-40 -104 Z" />
      <path d="M-48 -104 L48 -104 L0 -134 Z" fill={s.fill(C.woodDark)} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c2) => (
          <circle key={`${r}-${c2}`} cx={-28 + c2 * 14} cy={-92 + r * 16} r="5" fill={s.solid ? '#6E5334' : 'none'} stroke={s.stroke} strokeWidth="1.5" />
        ))
      )}
      {s.solid && (
        <g fill={C.gold} stroke="#3A3038" strokeWidth="1">
          <ellipse cx="46" cy="-118" rx="5" ry="3.6" />
          <ellipse cx="-52" cy="-96" rx="5" ry="3.6" />
        </g>
      )}
    </g>
  ),
  // Lies flat on the floor, so it is an ellipse rather than a standing shape.
  'gh-rug': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill('#E8B9C4')}>
      <ellipse cx="0" cy="0" rx="150" ry="46" />
      <ellipse cx="0" cy="0" rx="112" ry="33" fill={s.fill('#F4E3D2')} />
      <ellipse cx="0" cy="0" rx="72" ry="20" fill={s.fill('#E8B9C4')} />
      {s.solid && <ellipse cx="0" cy="0" rx="36" ry="9" fill="#F4E3D2" />}
    </g>
  ),
  'gh-bookshelf': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill(C.wood)}>
      <path d="M-52 0 L-52 -150 L52 -150 L52 0 Z" />
      <path d="M-52 -50 L52 -50 M-52 -100 L52 -100" fill="none" />
      {s.solid &&
        [0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5].map((b) => (
            <rect
              key={`${row}-${b}`}
              x={-46 + b * 15}
              y={-46 - row * 50 - (b % 3) * 4}
              width="11"
              height={40 + (b % 3) * 4}
              rx="1.5"
              fill={['#7FA87A', '#E88AA0', '#D9A82F', '#A78BD9', '#4F7A4B', '#C97B5A'][b]}
              stroke="rgba(58,48,56,.35)"
              strokeWidth="1"
            />
          ))
        )}
    </g>
  ),
  'gh-birdbath': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill(C.stone)}>
      <ellipse cx="0" cy="0" rx="30" ry="10" />
      <path d="M-12 -4 L-8 -70 L8 -70 L12 -4 Z" />
      <ellipse cx="0" cy="-74" rx="44" ry="14" />
      <ellipse cx="0" cy="-77" rx="36" ry="10" fill={s.solid ? '#BFDCE8' : 'none'} stroke={s.stroke} strokeWidth="2" />
      {s.solid && (
        <g fill="#8B7D86">
          <ellipse cx="24" cy="-86" rx="9" ry="7" />
          <circle cx="32" cy="-92" r="5" />
          <path d="M36 -93 L42 -91 L36 -89 Z" fill={C.gold} />
        </g>
      )}
    </g>
  ),
  'gh-arch': (s) => (
    <g stroke={s.stroke} strokeWidth="4" fill="none">
      <path d="M-70 0 L-70 -110 q70 -74 140 0 L70 0" />
      <path d="M-58 0 L-58 -108 q58 -62 116 0 L58 0" strokeWidth="2.5" opacity=".7" />
      {s.solid && (
        <g>
          <path d="M-70 -20 q-10 -40 6 -70 q14 -32 40 -46" stroke={C.leafDark} strokeWidth="4" fill="none" />
          <path d="M70 -20 q10 -40 -6 -70 q-14 -32 -40 -46" stroke={C.leafDark} strokeWidth="4" fill="none" />
          {[[-66, -60], [-52, -104], [-20, -142], [20, -142], [52, -104], [66, -60], [-38, -126], [38, -126]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="8" fill={C.petal} />
              <circle r="4.4" fill="#F7C6D0" />
            </g>
          ))}
        </g>
      )}
    </g>
  ),
  'gh-pond': (s) => (
    <g stroke={s.stroke} strokeWidth="3" fill={s.fill('#BFDCE8')}>
      <ellipse cx="0" cy="0" rx="96" ry="34" />
      {s.solid && (
        <>
          <ellipse cx="0" cy="-4" rx="80" ry="25" fill="#A8CEDE" opacity=".7" />
          {[[-40, -6], [18, 4], [46, -10]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <ellipse rx="22" ry="8" fill={C.leaf} />
              <path d="M0 0 L18 -3" stroke="#F4E3D2" strokeWidth="2" />
            </g>
          ))}
          <g transform="translate(-40 -12)">
            <circle r="7" fill="#F7C6D0" />
            <circle r="3.4" fill={C.gold} />
          </g>
          <ellipse cx="60" cy="6" rx="12" ry="8" fill={C.leafDark} />
        </>
      )}
    </g>
  ),
  /**
   * Not furniture — this one relights the whole roof.
   *
   * IT USED TO DRAW NOTHING WHEN UNOWNED, which made it the one item in the shop
   * with no dotted outline anywhere in the room. Twelve things for sale, eleven
   * of them visibly waiting, and the most expensive one simply absent. Now the
   * unowned state draws the empty roof panel it would fill.
   */
  'gh-glasshouse': (s) =>
    s.solid ? (
      <g opacity=".5">
        <path d="M-240 0 L-90 480 L150 480 L60 0 Z" fill="url(#sunbeam)" />
      </g>
    ) : (
      <g stroke={C.ghost} strokeWidth="4" fill="none">
        <path d="M-150 -8 L150 -8 L96 96 L-96 96 Z" />
        <path d="M-50 -8 L-32 96 M50 -8 L32 96" strokeWidth="2.5" />
        <path d="M-124 42 L124 42" strokeWidth="2.5" />
      </g>
    )
};


/* ------------------------------------------------------------------ *
 * THE ROOM'S OWN FURNITURE — not for sale, always there.
 *
 * "There's nothing on the walls" was a fact about the ROOM, not about
 * what she had bought. An empty greenhouse should still look like a
 * greenhouse before a single Petal is spent, and the things she buys
 * need somewhere to go that is not the middle of the floor.
 *
 * All of it is built from wallQuad(), so every board runs to the same
 * vanishing box as the walls and the floor tiles.
 * ------------------------------------------------------------------ */
function RoomFurniture({ P = C }) {
  const B = LEFT_BENCH;
  const R = RIGHT_SHELF;

  // Bench: a top, a lower slatted shelf, and legs at each end.
  const benchAt = (lift, inset = 0) =>
    wallQuad({
      from: B.from, to: B.to, uNear: B.uInner - inset, uFar: B.uOuter,
      liftFrom: lift, liftTo: lift
    });
  const benchTop = benchAt(B.height);
  const benchUnder = benchAt(B.height - 14);
  const benchLow = benchAt(42, 0.02);

  const shelfBoard = (lift) =>
    wallQuad({
      from: R.from, to: R.to, uNear: R.uInner, uFar: R.uOuter,
      liftFrom: lift, liftTo: lift
    });

  const sill = wallQuad({
    from: BACK_SILL.from, to: BACK_SILL.to, uNear: 0.94, uFar: 0.06,
    liftFrom: BACK_SILL.height, liftTo: BACK_SILL.height
  });

  return (
    <g>
      {/* ---- back sill, under the glass ---- */}
      <polygon points={sill} fill={P.wood} opacity=".9" />
      <polygon points={sill} fill="none" stroke={P.woodDark} strokeWidth="2" />

      {/* ---- left wall: the potting bench ---- */}
      {[B.from, B.to].map((t) => {
        const top = place({ u: B.uInner - 0.012, t, lift: B.height });
        const foot = place({ u: B.uInner - 0.012, t, lift: 0 });
        const topIn = place({ u: B.uOuter + 0.018, t, lift: B.height });
        const footIn = place({ u: B.uOuter + 0.018, t, lift: 0 });
        return (
          <g key={`leg${t}`} stroke={P.woodDark} strokeWidth={9 * (0.55 + 0.45 * t)} strokeLinecap="round">
            <path d={`M${top.x} ${top.y} L${foot.x} ${foot.y}`} />
            <path d={`M${topIn.x} ${topIn.y} L${footIn.x} ${footIn.y}`} />
          </g>
        );
      })}
      <polygon points={benchLow} fill={P.woodDark} opacity=".55" />
      <polygon points={benchUnder} fill={P.woodDark} />
      <polygon points={benchTop} fill={P.wood} />
      <polygon points={benchTop} fill="none" stroke={P.woodDark} strokeWidth="2" />

      {/* One pot at the far end of the bench, not four.
          The bench decoration used to run the whole length of the top. From v3.15
          the bench is somewhere SHE puts things, so the room’s own clutter steps
          back to the far end and leaves her the rest of it. An empty greenhouse
          still reads as a greenhouse — legs, boards, brackets, sill, hanging
          tools — which is all that decoration was ever for. */}
      {[0.16].map((t, i) => {
        const p = place({ u: (LEFT_BENCH.uOuter + LEFT_BENCH.uInner) / 2, t, lift: LEFT_BENCH.height });
        const r = 17 * p.s;
        return i % 2 === 0 ? (
          <g key={`pot${t}`}>
            <path
              d={`M${p.x - r} ${p.y - r * 1.5} L${p.x + r} ${p.y - r * 1.5} L${p.x + r * 0.72} ${p.y} L${p.x - r * 0.72} ${p.y} Z`}
              fill="#C98F4F"
              stroke={P.woodDark}
              strokeWidth="2"
            />
            <ellipse cx={p.x} cy={p.y - r * 1.5} rx={r} ry={r * 0.34} fill="#B07C42" />
            <path
              d={`M${p.x} ${p.y - r * 1.6} q${-r * 0.7} ${-r * 1.1} ${-r * 0.25} ${-r * 1.9}`}
              stroke={P.leafDark}
              strokeWidth="3"
              fill="none"
            />
            <ellipse cx={p.x - r * 0.3} cy={p.y - r * 3.4} rx={r * 0.55} ry={r * 0.4} fill={P.leaf} />
            <ellipse cx={p.x + r * 0.45} cy={p.y - r * 2.6} rx={r * 0.5} ry={r * 0.36} fill={P.leaf} />
          </g>
        ) : (
          <g key={`tray${t}`}>
            <rect
              x={p.x - r * 1.5}
              y={p.y - r * 0.9}
              width={r * 3}
              height={r * 0.9}
              fill="#9C7645"
              stroke={P.woodDark}
              strokeWidth="2"
            />
            {[0, 1, 2, 3].map((c2) => (
              <circle
                key={c2}
                cx={p.x - r * 1.1 + c2 * r * 0.72}
                cy={p.y - r * 1.05}
                r={r * 0.26}
                fill={P.leaf}
              />
            ))}
          </g>
        );
      })}

      {/* ---- right wall: two shelf boards and a row of hanging tools ---- */}
      {/* Brackets first, so the boards sit ON them. Without these the boards
          read as two planks floating in mid-air rather than shelves fixed to a
          wall — the same "nothing is attached to anything" problem the whole
          room had. */}
      {[R.from + 0.03, (R.from + R.to) / 2, R.to - 0.03].map((t) =>
        [R.height, R.height - SHELF_BOARD_GAP].map((lift, i) => {
          const outer = place({ u: R.uOuter, t, lift });
          const inner = place({ u: R.uInner, t, lift });
          const down = place({ u: R.uOuter, t, lift: lift - 46 });
          return (
            <path
              key={`brk${t}-${i}`}
              d={`M${outer.x} ${outer.y} L${inner.x} ${inner.y} L${down.x} ${down.y} Z`}
              fill={P.woodDark}
              opacity=".75"
            />
          );
        })
      )}
      {[R.height, R.height - SHELF_BOARD_GAP].map((lift, i) => (
        <g key={`shelf${i}`}>
          <polygon points={shelfBoard(lift - 11)} fill={P.woodDark} opacity=".8" />
          <polygon points={shelfBoard(lift)} fill={P.wood} />
          <polygon points={shelfBoard(lift)} fill="none" stroke={P.woodDark} strokeWidth="2" />
        </g>
      ))}
      {/* Same reason: one jar at the far end of the upper board, not four. */}
      {[0.13].map((t, i) => {
        const p = place({ u: (R.uOuter + R.uInner) / 2, t, lift: R.height });
        const r = 15 * p.s;
        return (
          <g key={`jar${t}`}>
            <rect
              x={p.x - r}
              y={p.y - r * 2.1}
              width={r * 2}
              height={r * 2.1}
              rx={r * 0.3}
              fill={i % 2 ? '#DFF0E4' : '#F3DCA4'}
              stroke={P.frameDark}
              strokeWidth="2"
              opacity=".95"
            />
            <rect x={p.x - r * 1.1} y={p.y - r * 2.5} width={r * 2.2} height={r * 0.5} rx={r * 0.2} fill={P.gold} />
          </g>
        );
      })}
      {/* tools hanging off the underside of the lower board */}
      {[0.18, 0.28, 0.38].map((t, i) => {
        const p = place({ u: (R.uOuter + R.uInner) / 2 + 0.02, t, lift: R.height - 129 });
        const L = 78 * p.s;
        return (
          <g key={`tool${t}`} stroke={P.woodDark} strokeWidth={5 * p.s} strokeLinecap="round" fill="none">
            <path d={`M${p.x} ${p.y} L${p.x} ${p.y + L}`} />
            {i === 0 && <path d={`M${p.x - 13 * p.s} ${p.y + L} L${p.x + 13 * p.s} ${p.y + L}`} strokeWidth={9 * p.s} />}
            {i === 1 && (
              <path
                d={`M${p.x - 11 * p.s} ${p.y + L} q${11 * p.s} ${14 * p.s} ${22 * p.s} 0`}
                strokeWidth={7 * p.s}
              />
            )}
            {i === 2 && (
              <circle cx={p.x} cy={p.y + L + 9 * p.s} r={11 * p.s} strokeWidth={5 * p.s} />
            )}
          </g>
        );
      })}
    </g>
  );
}

function Item({ item, owned }) {
  const draw = ART[item.id];
  if (!draw || !item.spot) return null;
  // x, y and scale all come from (u, t). Scale is never set by hand, so it can
  // never drift out of agreement with depth — which is what made the old room
  // read as scattered.
  const at = place(item.spot);
  const s = {
    solid: owned,
    stroke: owned ? 'rgba(58,48,56,.55)' : C.ghost,
    fill: (colour) => (owned ? colour : 'none')
  };
  return (
    <g
      transform={`translate(${at.x.toFixed(1)} ${at.y.toFixed(1)}) scale(${at.s.toFixed(3)})`}
      opacity={owned ? 1 : 0.75}
      strokeDasharray={owned ? undefined : '7 6'}
    >
      {draw(s)}
      {!owned && (
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontSize="19"
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

/**
 * @param owned      array of owned item ids
 * @param showGhosts draw the not-yet-bought things as outlines in place
 */
export function GreenhouseScene({ owned = [], showGhosts = true, look = null, className = '' }) {
  // ---- THE ROOM LOOK ----
  //
  // A "background" in this app is a PALETTE, not a picture, and it is merged in
  // here rather than baked into the art. That is what lets her keep the room she
  // spent a year building: the bench stays where it is, the terrarium stays on
  // it, and only the light over all of it changes. A picture background would
  // have meant redrawing all fifty-eight things once per season.
  //
  // Deliberately applied to the SHELL only — glass, frames, walls, floor. The
  // things she bought keep their own colours, because a copper watering can is
  // copper at dawn and copper at midnight.
  const P = { ...C, ...(look || {}) };
  const has = (id) => owned.includes(id);
  const lit = has('gh-glasshouse');

  /**
   * PAINT ORDER, and the bug it fixes.
   *
   * Sorting by base Y alone looked right and was wrong: the rug sits at y=826
   * and the cat at y=812, so the rug — a thing lying flat on the FLOOR — was
   * painted on top of the cat and the watering can and hid both of them
   * completely. Two items bought, two items invisible, and the placement check
   * passed the whole time because each one did have a spot and a renderer.
   *
   * Layers fix it properly. Floor coverings go down first, in their own pass.
   * Standing things then sort among themselves by base Y, which is what that
   * rule was ever meant to do. Hanging things go last so a lantern is never
   * behind the roof beam it hangs from.
   */
  const LAYER_ORDER = { floor: 0, stand: 1, hang: 2, roof: 3 };
  const visible = GREENHOUSE_ITEMS.filter((i) => has(i.id) || showGhosts).sort((a, b) => {
    const la = LAYER_ORDER[a.layer || 'stand'];
    const lb = LAYER_ORDER[b.layer || 'stand'];
    if (la !== lb) return la - lb;
    return (a.spot?.y || 0) - (b.spot?.y || 0);
  });

  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      className={className}
      role="img"
      aria-label="Your greenhouse"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="roofGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lit ? '#FFFDF6' : '#E7F1E9'} />
          <stop offset="100%" stopColor={lit ? '#F2F8EC' : '#D6E6DB'} />
        </linearGradient>
        <linearGradient id="backGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lit ? '#F6FBF2' : P.glass} />
          <stop offset="100%" stopColor={P.glassDeep} />
        </linearGradient>
        <linearGradient id="sunbeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6D8" stopOpacity=".85" />
          <stop offset="100%" stopColor="#FFF6D8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={P.floorFar} />
          <stop offset="100%" stopColor={P.floor} />
        </linearGradient>
      </defs>

      {/* ---- the shell ---- */}
      {/* roof */}
      <path d={`M0 0 L${VB.w} 0 L${BACK.x2} ${BACK.y1} L${BACK.x1} ${BACK.y1} Z`} fill="url(#roofGlass)" />
      {/* side walls */}
      <path d={`M0 0 L${BACK.x1} ${BACK.y1} L${BACK.x1} ${BACK.y2} L0 ${VB.h} Z`} fill={P.wallSide} />
      <path d={`M${VB.w} 0 L${BACK.x2} ${BACK.y1} L${BACK.x2} ${BACK.y2} L${VB.w} ${VB.h} Z`} fill={P.wallSideDark} />
      {/* floor */}
      <path d={`M0 ${VB.h} L${BACK.x1} ${BACK.y2} L${BACK.x2} ${BACK.y2} L${VB.w} ${VB.h} Z`} fill="url(#floorGrad)" />
      {/* back glass */}
      <rect x={BACK.x1} y={BACK.y1} width={BACK.x2 - BACK.x1} height={BACK.y2 - BACK.y1} fill="url(#backGlass)" />

      {/* glazing bars on the back wall */}
      <g stroke={P.frame} strokeWidth="6" fill="none">
        {[0, 1, 2, 3, 4].map((i) => {
          const x = BACK.x1 + ((BACK.x2 - BACK.x1) / 4) * i;
          return <path key={`v${i}`} d={`M${x} ${BACK.y1} L${x} ${BACK.y2}`} />;
        })}
        {[0, 1, 2].map((i) => {
          const y = BACK.y1 + ((BACK.y2 - BACK.y1) / 2) * i;
          return <path key={`h${i}`} d={`M${BACK.x1} ${y} L${BACK.x2} ${y}`} />;
        })}
      </g>

      {/* rafters running to the vanishing box */}
      <g stroke={P.frame} strokeWidth="7" fill="none" opacity=".9">
        <path d={`M0 0 L${BACK.x1} ${BACK.y1}`} />
        <path d={`M${VB.w} 0 L${BACK.x2} ${BACK.y1}`} />
        <path d={`M0 ${VB.h} L${BACK.x1} ${BACK.y2}`} />
        <path d={`M${VB.w} ${VB.h} L${BACK.x2} ${BACK.y2}`} />
        {[0.28, 0.55, 0.82].map((t, i) => (
          <path
            key={i}
            d={`M${BACK.x1 * (1 - t)} ${BACK.y1 * t} L${BACK.x1 + (BACK.x2 - BACK.x1) * 0} ${BACK.y1}`}
            opacity="0"
          />
        ))}
      </g>
      {/* roof glazing bars, fanning to the back wall */}
      <g stroke={P.frameDark} strokeWidth="4" fill="none" opacity=".55">
        {[0.2, 0.4, 0.6, 0.8].map((t) => (
          <path key={t} d={`M${VB.w * t} 0 L${BACK.x1 + (BACK.x2 - BACK.x1) * t} ${BACK.y1}`} />
        ))}
      </g>

      {/* floor tiles */}
      <g stroke={P.grout} strokeWidth="3" fill="none">
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((t) => (
          <path key={t} d={`M${VB.w * t} ${VB.h} L${BACK.x1 + (BACK.x2 - BACK.x1) * t} ${BACK.y2}`} />
        ))}
        {[0.18, 0.4, 0.66, 1].map((t) => {
          const y = BACK.y2 + (VB.h - BACK.y2) * t;
          const spread = (t * (VB.w - (BACK.x2 - BACK.x1))) / 2;
          return <path key={`r${t}`} d={`M${BACK.x1 - spread} ${y} L${BACK.x2 + spread} ${y}`} />;
        })}
      </g>

      {/* ---- the greenhouse itself: bench, shelves, sill ---- */}
      <RoomFurniture P={P} />

      {/* the sunbeam sits behind the furniture when the roof is upgraded */}
      {lit && <g transform="translate(800 170)">{ART['gh-glasshouse']({ solid: true })}</g>}

      {/* ---- her things ---- */}
      {visible.map((item) => (
        <Item key={item.id} item={item} owned={has(item.id)} />
      ))}
    </svg>
  );
}
