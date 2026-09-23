/**
 * DR. MARIGOLD — the app's mentor, and the counterpart to her brother's
 * Commander Nova.
 *
 * She is a Black American woman, drawn rather than picked from an emoji set.
 * That was the grandmother's instruction and it is the same decision made for
 * Nova in the other app, for the same reason: an emoji gives you one
 * take-it-or-leave-it skin-tone byte and no control over hair at all. Drawing
 * her means she simply IS who she is at every layer — face, hair, hands — and no
 * later change can quietly revert her to somebody else's default.
 *
 * She is a doctor AND a herbalist, which is exactly what the girl says she wants
 * to be. Locs, laughter lines, a white coat with a sprig in the pocket, and a
 * stethoscope. Warm rather than stern — she is a mentor, not an examiner.
 *
 * ---- WHY SHE WAS REDRAWN (v1.7) ----
 *
 * The grandmother, after seeing the two of them: "switch the avatar and Dr.
 * Marigold." She was reading something real. The girl's avatar had been drawn
 * with a careful, detailed face and Marigold had not — so the CHILD looked like
 * a grown woman and the DOCTOR looked younger and rougher than the child she is
 * supposed to be mentoring. The care had gone to the wrong character.
 *
 * So they were swapped, as asked. The adult face — weighted brows, lashes, a
 * nose with a bridge, full lips with a cupid's bow — belongs here, on the
 * grown woman. The girl's avatar was rebuilt as an actual nine-year-old.
 *
 * The locs were rebuilt too. They had been six flat rectangles stuck to the
 * sides of her head, which at badge size read as earmuffs rather than hair.
 * They are now strands that hang and layer, with the gathered bun on top.
 *
 * PAINT ORDER MATTERS HERE TOO. Her hair is drawn in two passes for the same
 * reason the girl's is — see scripts/check-avatar.mjs for the half-hour that
 * rule cost. Volume behind the head; only the hairline in front, stopping above
 * the brows at y=40.
 */
const SKIN = '#7A4B2E';
const SKIN_SHADE = '#5F3921';
const HAIR = '#221713';
const HAIR_HI = '#402C22';

/** Head: cx 60, cy 50, rx 24, ry 26. Every face number below is derived from
 *  it, so if the head moves they all have to move together. */
export function MarigoldAvatar({ size = 96, className = '' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Dr. Marigold"
    >
      {/* badge ring */}
      <circle cx="60" cy="60" r="58" fill="#FDF6EF" stroke="#D9A82F" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="52" fill="#F6EADF" />

      {/* shoulders — the white coat */}
      <path d="M22 110 C22 89 39 79 60 79 C81 79 98 89 98 110 L98 114 L22 114 Z" fill="#F6F3EF" />
      <path d="M46 82 L60 98 L74 82 L68 79 L60 88 L52 79 Z" fill="#E4E0DA" />
      {/* collar */}
      <path d="M47 81 L60 95 L53 99 L44 86 Z" fill="#EDE8E1" />
      <path d="M73 81 L60 95 L67 99 L76 86 Z" fill="#EDE8E1" />
      {/* stethoscope */}
      <path d="M44 84 q-5 24 16 27 q21 -3 16 -27" stroke="#4F7A4B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="76" cy="111" r="5" fill="#D9A82F" stroke="#A87C15" strokeWidth="1.4" />
      {/* a sprig in the breast pocket, because she is a herbalist too */}
      <path d="M40 96 l0 12" stroke="#4F7A4B" strokeWidth="1.6" />
      <path d="M40 99 q-4 -3 -6 -7 M40 103 q4 -3 6 -7" stroke="#7FA87A" strokeWidth="1.6" fill="none" />
      <circle cx="40" cy="93" r="2.6" fill="#D9A82F" />

      {/* neck */}
      <rect x="52" y="66" width="16" height="16" rx="4" fill={SKIN_SHADE} />

      {/* ---- LOCS, PASS 1: the volume, BEHIND the head ---- */}
      {/* The crown. Kept modest — an oversized mass here shrinks her face and
          makes the whole badge read as hair with a person behind it. */}
      <ellipse cx="60" cy="32" rx="26" ry="18" fill={HAIR} />

      {/* The fall of locs either side.
          These were four narrow rectangles and they read as STICKS standing
          beside her head — separate objects, not hair. The problem was width:
          anything much thinner than the ear it passes stops looking attached.
          One wide rounded shape per side reads as a fall of hair, and the
          grooves inside it do the work of showing individual locs. */}
      {[27, 78].map((x) => (
        <rect key={x} x={x} y="30" width="15" height="48" rx="7.5" fill={HAIR} />
      ))}
      {[31, 34.5, 85.5, 89].map((x, i) => (
        <path
          key={x}
          d={`M${x} 42 L${x} ${i % 2 ? 70 : 74}`}
          stroke={HAIR_HI}
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".8"
        />
      ))}

      {/* head */}
      <ellipse cx="60" cy="50" rx="24" ry="26" fill={SKIN} />
      {/* ears */}
      {/* Smaller and tucked in from the silhouette edge. At the edge they sat
          exactly where the hair meets the head and cut it in two, so the fall of
          locs read as a separate object floating beside her. */}
      <ellipse cx="37" cy="53" rx="3.4" ry="5.4" fill={SKIN_SHADE} />
      <ellipse cx="83" cy="53" rx="3.4" ry="5.4" fill={SKIN_SHADE} />
      {/* small gold hoop — a person, not a uniform */}
      <circle cx="37" cy="60" r="3" fill="none" stroke="#D9A82F" strokeWidth="1.5" />
      <circle cx="83" cy="60" r="3" fill="none" stroke="#D9A82F" strokeWidth="1.5" />

      {/* ---- THE FACE — a grown woman's ----
          What separates this from the girl's face, deliberately: the brows carry
          weight, the eyes are SMALLER against the head and sit on the midline
          rather than below it, the nose has a drawn bridge, the lips are full
          with a cupid's bow, and the cheekbones and laughter lines are stated
          rather than left out. Every one of those adds age. */}

      {/* cheeks */}
      <ellipse cx="46.5" cy="56.5" rx="7.5" ry="3.6" fill="#95603D" opacity=".28" />
      <ellipse cx="73.5" cy="56.5" rx="7.5" ry="3.6" fill="#95603D" opacity=".28" />

      {/* brows — weighted and level, the way an adult's read */}
      <path d="M42 40 q7 -4.2 14 -1.2" stroke="#2B1F19" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M78 40 q-7 -4.2 -14 -1.2" stroke="#2B1F19" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* eyes — white, iris, pupil, highlight, lash line */}
      {[50.5, 69.5].map((cx) => {
        const left = cx < 60;
        return (
          <g key={cx}>
            <ellipse cx={cx} cy="48" rx="5" ry="3.9" fill="#F8F2EA" />
            <circle cx={cx} cy="48" r="3.3" fill="#3A2214" />
            <circle cx={cx} cy="48" r="1.65" fill="#150F0C" />
            <circle cx={cx - 1.2} cy="46.8" r="1" fill="#fff" />
            <path
              d={`M${cx - 5.4} 46.9 q5.4 -4.2 10.8 0`}
              stroke="#1A1310"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M${left ? cx - 5.5 : cx + 5.5} 45.8 l${left ? -2.4 : 2.4} -2.4`}
              stroke="#1A1310"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* laughter lines — she is not twenty-five and should not look it */}
      <path d="M41.5 55 q2.6 1.8 4.4 0.9" stroke={SKIN_SHADE} strokeWidth="1.1" fill="none" opacity=".5" />
      <path d="M78.5 55 q-2.6 1.8 -4.4 0.9" stroke={SKIN_SHADE} strokeWidth="1.1" fill="none" opacity=".5" />

      {/* nose — bridge, tip, nostrils */}
      <path d="M59.4 53 L57.9 58.2" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".45" />
      <path d="M56.5 59.2 q3.5 2.6 7 0" stroke={SKIN_SHADE} strokeWidth="1.9" fill="none" strokeLinecap="round" />
      <circle cx="56.8" cy="59.5" r="0.95" fill="#4E2C1A" opacity=".6" />
      <circle cx="63.2" cy="59.5" r="0.95" fill="#4E2C1A" opacity=".6" />

      {/* philtrum */}
      <path d="M60 61 L60 63.4" stroke={SKIN_SHADE} strokeWidth="1.1" opacity=".45" />

      {/* lips — full, with a cupid's bow, smiling */}
      <path
        d="M51.5 64.6 q3.4 -2.9 4.3 -0.5 q0.9 -2.4 4.2 -2.4 q3.4 0 4.3 2.4 q0.9 -2.4 4.3 0.5 q-8.5 3.1 -17.1 0 Z"
        fill="#8E4A45"
      />
      <path d="M51.5 64.6 q8.5 6.4 17.1 0 q-8.5 2.7 -17.1 0 Z" fill="#A8574F" />
      <path d="M51.5 64.6 q8.5 6.4 17.1 0" stroke="#6E362F" strokeWidth="1" fill="none" />

      {/* chin */}
      <path d="M55 71 q5 3.2 10 0" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" opacity=".35" />

      {/* ---- LOCS, PASS 2: the hairline only, stopping above the brows ---- */}
      <path d="M39.8 36 A24 26 0 0 1 80.2 36 Q60 24 39.8 36 Z" fill={HAIR} />
      <ellipse cx="50" cy="29" rx="7" ry="2.8" fill={HAIR_HI} opacity=".4" />
      {/* the gathered bun on top. Safe to paint last: it sits at y 11–33, well
          clear of the brows at 40. */}
      <ellipse cx="60" cy="18" rx="14" ry="9" fill={HAIR} />
      <ellipse cx="55" cy="15.8" rx="5.2" ry="3" fill={HAIR_HI} opacity=".5" />
      {/* the gather itself — the line where the locs are drawn up. Without it
          the bun and the crown merge into one dark shape and read as a cap. */}
      <path d="M46 25 q14 -6.5 28 0" stroke={HAIR_HI} strokeWidth="1.8" fill="none" opacity=".7" />
    </svg>
  );
}
