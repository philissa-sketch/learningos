// ---------------------------------------------------------------------------
// THE YOUNG HERBALIST — drawn in SVG, so what she buys can actually be worn.
//
// The Petal Market was selling aprons, gloves and a straw hat into a shop with
// nowhere to put them. The grandmother caught it: "you didn't create the
// greenhouse, avatar, or shelves." She was right, and the reason it happened is
// the same one that bit her son's app first — an avatar made of ONE EMOJI is a
// glyph, and nothing can be layered onto a glyph. The gear was not badly
// labelled; it was unwearable by construction.
//
// So she is drawn the way the greenhouse is drawn, in layers. Every slot then
// becomes real: the apron replaces the dress front, gloves land on the hands,
// the hat sits on the head, the loupe hangs on its cord, the satchel crosses
// the body, and the boots replace the shoes.
//
// SKIN AND HAIR ARE DRAWN, NOT MODIFIED. An emoji skin-tone modifier is one
// take-it-or-leave-it byte and it cannot do hair at all. Drawing the figure
// means she simply IS a Black girl at every layer — face, hands, the natural
// puff she starts with — and no future item can accidentally revert her to
// somebody else's default. Her brother's cadet was built to the same rule.
// ---------------------------------------------------------------------------

const SKIN = '#7A4B2E';
const SKIN_SHADE = '#633B23';
const HAIR = '#1E1512';
const HAIR_HI = '#3A2A22';

/** Dress underneath. The apron and coat layer OVER this, so she is never naked
 *  and never wrong-looking with nothing equipped. */
const DRESS = '#A78BD9';
const DRESS_SHADE = '#8E6FC6';

/* --------------------------------------------------------------- *
 * Body layer — what the `body` slot replaces
 * --------------------------------------------------------------- */
function Body({ item }) {
  if (item === 'av-coat') {
    return (
      <>
        <path d="M-32 -72 q32 -13 64 0 L34 6 L-34 6 Z" fill="#F3F1EE" />
        <path d="M-32 -72 q10 24 6 78 L-16 6 L-34 6 Z" fill="#E4E0DA" />
        <path d="M0 -72 L-12 -40 L0 -30 L12 -40 Z" fill="#DAD5CE" />
        <path d="M0 -30 L0 6" stroke="#CFC8C0" strokeWidth="2" />
        {/* stethoscope — the doctor half of the plan */}
        <path d="M-14 -66 q-6 34 14 40 q20 -6 14 -40" stroke="#4F7A4B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="14" cy="-24" r="5.5" fill="#C9A227" stroke="#A87C15" strokeWidth="1.5" />
      </>
    );
  }
  if (item === 'av-cloak') {
    return (
      <>
        <path d="M-40 -70 q40 -14 80 0 L52 20 L-52 20 Z" fill="#2F5D3E" />
        <path d="M-40 -70 q40 -14 80 0 L34 -40 q-34 10 -68 0 Z" fill="#264C33" />
        <path d="M-14 -76 q14 -8 28 0 q-4 16 -14 20 q-10 -4 -14 -20 Z" fill="#1E3D29" />
        <path d="M-30 -20 L-26 20 M0 -24 L0 20 M30 -20 L26 20" stroke="#1E3D29" strokeWidth="2.5" fill="none" />
        <circle cx="-16" cy="-70" r="5" fill="#D9A82F" />
        <circle cx="16" cy="-70" r="5" fill="#D9A82F" />
      </>
    );
  }
  if (item === 'av-apron-canvas') {
    return (
      <>
        <path d="M-26 -68 q26 -10 52 0 L34 16 L-34 16 Z" fill="#C9A66B" />
        <path d="M-34 16 L34 16 L34 -6 L-34 -6 Z" fill="#B8945A" />
        <path d="M-20 -70 L-12 -84 M20 -70 L12 -84" stroke="#B8945A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="-20" y="-4" width="17" height="16" rx="2" fill="#A9834C" />
        <rect x="3" y="-4" width="17" height="16" rx="2" fill="#A9834C" />
      </>
    );
  }
  if (item === 'av-apron-linen' || item === 'av-apron-floral') {
    const floral = item === 'av-apron-floral';
    return (
      <>
        <path d="M-32 -72 q32 -13 64 0 L34 6 L-34 6 Z" fill={DRESS} />
        <path d="M-32 -72 q10 24 6 78 L-16 6 L-34 6 Z" fill={DRESS_SHADE} opacity=".55" />
        {/* the apron itself, sitting on top */}
        <path
          d="M-14 -68 L14 -68 L18 -50 q10 6 10 22 L28 6 L-28 6 L-28 -28 q0 -16 10 -22 Z"
          fill={floral ? '#FBEDF1' : '#F4EFE6'}
          stroke={floral ? '#E8AABB' : '#DFD5C4'}
          strokeWidth="2"
        />
        {/* apron strings over the shoulders */}
        <path d="M-14 -68 L-24 -74 M14 -68 L24 -74" stroke={floral ? '#E8AABB' : '#DFD5C4'} strokeWidth="3" strokeLinecap="round" />
        {/* pocket */}
        <path d="M-16 -14 L16 -14 L16 -2 L-16 -2 Z" fill="none" stroke={floral ? '#E8AABB' : '#DFD5C4'} strokeWidth="2" />
        {floral && (
          <g fill="#E88AA0" opacity=".85">
            {[[-18, -44], [-4, -56], [10, -42], [18, -26], [-10, -28], [4, -22]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="2.6" />
                <circle cx="3.4" cy="-1.6" r="2" opacity=".8" />
                <circle cx="-3.4" cy="-1.6" r="2" opacity=".8" />
              </g>
            ))}
          </g>
        )}
      </>
    );
  }
  // Default: the dress she starts in.
  return (
    <>
      <path d="M-32 -72 q32 -13 64 0 L34 6 L-34 6 Z" fill={DRESS} />
      <path d="M-32 -72 q10 24 6 78 L-16 6 L-34 6 Z" fill={DRESS_SHADE} opacity=".55" />
      <path d="M-30 -46 L30 -46" stroke={DRESS_SHADE} strokeWidth="3" />
    </>
  );
}

/* --------------------------------------------------------------- *
 * Hair — default is a natural puff. `av-braids` swaps it.
 *
 * ---- WHY THIS IS DRAWN IN TWO PASSES (v1.6) ----
 *
 * The grandmother, three separate times: the avatar's face still is not right.
 * She was right every time, and I kept fixing the wrong thing — adding lashes,
 * brows, a nose, lips, cheeks, all of which were going into the file correctly
 * and NONE of which she could see.
 *
 * The hair was painted last, over everything. SVG has no z-index; it paints in
 * document order, and <Hair> sat at the bottom of the file. The puff is a large
 * ellipse (ry 31, centred at -132), so it reached down to y = -101 — past the
 * brows at -124 and straight over the eyes at -113. A solid black dome with a
 * nose and a mouth peeking out below it.
 *
 * Real hair is not one shape, so this is no longer drawn as one. It is TWO:
 *
 *   layer="back"   the volume — drawn BEFORE the head, so it sits behind her
 *                  and frames the face the way a puff actually does.
 *   layer="front"  the hairline only — drawn AFTER the face, a cap that stops
 *                  at y = -132 in the centre and -124 at the temples, which is
 *                  above the brows with room to spare.
 *
 * The rule this establishes, and the reason it will not come back: anything
 * that goes ON the head is split at the hairline. Nothing full-size is ever
 * painted after the face again.
 * --------------------------------------------------------------- */

/** The hairline cap. Follows the top of the skull, stops above the brows.
 *  Shared by the puffs and the braids so neither can drift onto the face.
 *
 *  Geometry is tied to the head: cx 0, cy -114, r 30. If the head changes, the
 *  temple points (±27.5, -126) have to be recomputed or the cap will float off
 *  the skull. */
function HairCap() {
  return (
    <>
      <path d="M-27.5 -126 A30 30 0 0 1 27.5 -126 Q0 -142 -27.5 -126 Z" fill={HAIR} />
      <ellipse cx="-12" cy="-137" rx="8" ry="4" fill={HAIR_HI} opacity=".45" />
    </>
  );
}

function Hair({ item, underHat, layer }) {
  const braids = item === 'av-braids';

  /* ---- BEHIND the head: all the volume ---- */
  if (layer === 'back') {
    if (braids) {
      return (
        <>
          <ellipse cx="0" cy="-126" rx="31" ry="30" fill={HAIR} />
          {/* two braids down past the shoulders */}
          {[-30, 30].map((x) => (
            <g key={x}>
              <path
                d={`M${x} -116 q${x < 0 ? -8 : 8} 20 ${x < 0 ? -4 : 4} 44`}
                stroke={HAIR}
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={x + (x < 0 ? -6 : 6) * (0.4 + i * 0.25)}
                  cy={-102 + i * 15}
                  r="5.4"
                  fill={HAIR_HI}
                  opacity=".5"
                />
              ))}
              {/* the ribbon */}
              <path d={`M${x + (x < 0 ? -5 : 5)} -60 l${x < 0 ? -7 : 7} -5 l0 10 Z`} fill="#E88AA0" />
              <circle cx={x + (x < 0 ? -4 : 4)} cy={-60} r="3.4" fill="#E88AA0" />
            </g>
          ))}
        </>
      );
    }
    // TWO PUFFS — the default, and what a nine-year-old actually wears.
    //
    // The single large puff was one of the two things making her read as a grown
    // woman rather than a girl (the other was the face; see the head below).
    // Two puffs either side is a child's style, and it is unmistakable at
    // thumbnail size, which is where she is usually seen.
    //
    // Under a hat they do not just shrink — they sit LOWER. The straw brim is 58
    // wide, so puffs at head height hide behind it completely and she reads bald
    // in a hat. Dropping them to -116 puts them below the brim line, which is
    // where hair actually shows when someone is wearing one.
    // Under a hat the puffs have to clear TWO things, not one: the 58-wide brim
    // above them and her own ear beside them. Sitting at -116 they were eclipsed
    // by both and she read bald in a hat again, which is how the single puff
    // failed before. Out to 33 and down to -112 puts them below the brim line
    // and past the ear, which is where puffs actually sit under a sun hat.
    const r = underHat ? 15 : 16;
    const cy = underHat ? -112 : -132;
    const cx = underHat ? 33 : 31;
    return (
      <>
        {/* a little volume behind the crown, so the puffs are attached to
            something rather than floating beside her head */}
        <ellipse cx="0" cy={underHat ? -120 : -126} rx="30" ry={underHat ? 24 : 28} fill={HAIR} />
        {[-cx, cx].map((x) => (
          <g key={x}>
            <circle cx={x} cy={cy} r={r} fill={HAIR} />
            <circle cx={x + (x < 0 ? -3 : 3)} cy={cy - 5} r={r * 0.34} fill={HAIR_HI} opacity=".45" />
          </g>
        ))}
      </>
    );
  }

  /* ---- IN FRONT of the face: the hairline, and nothing else ---- */
  if (braids) {
    return (
      <>
        <HairCap />
        {/* a centre part, which is what makes braids read as braids */}
        <path d="M0 -142 L0 -132" stroke={SKIN_SHADE} strokeWidth="1.6" opacity=".45" />
      </>
    );
  }
  return (
    <>
      <HairCap />
      {/* centre part */}
      <path d="M0 -142 L0 -132" stroke={SKIN_SHADE} strokeWidth="1.6" opacity=".4" />
      {/* the bobbles holding the puffs. Sitting at y -132 they are clear of the
          brows at -126 and outside the skull at that height, so they read as
          fastened rather than painted on. */}
      {!underHat &&
        [-26, 26].map((x) => (
          <circle key={x} cx={x} cy="-132" r="4.2" fill="#E88AA0" stroke="#D2708A" strokeWidth="1.2" />
        ))}
    </>
  );
}

/* --------------------------------------------------------------- *
 * Hat slot
 * --------------------------------------------------------------- */
function HeadWrap() {
  return (
    <g>
      <path d="M-44 -128 q44 -34 88 0 q-12 12 -44 12 q-32 0 -44 -12 Z" fill="#C96A8E" />
      <path d="M-44 -128 q20 -10 40 -8 q-14 8 -18 20 Z" fill="#E08AA8" />
      <path d="M40 -136 q22 -12 26 4 q-14 -4 -22 8 Z" fill="#B85A7E" />
      <path d="M-36 -132 q36 -10 72 0" stroke="#A84E6E" strokeWidth="3" fill="none" />
    </g>
  );
}

function Hat({ item }) {
  if (item === 'av-hat') {
    return (
      <>
        <ellipse cx="0" cy="-128" rx="58" ry="15" fill="#E3C77E" />
        <ellipse cx="0" cy="-131" rx="58" ry="14" fill="#F0D897" />
        <path d="M-27 -132 q27 -34 54 0 Z" fill="#E8CD8A" />
        <path d="M-26 -134 q26 -12 52 0" stroke="#C9A227" strokeWidth="4" fill="none" />
      </>
    );
  }
  if (item === 'av-crown') {
    return (
      <g>
        <path d="M-32 -142 q32 -20 64 0" stroke="#7FA87A" strokeWidth="5" fill="none" strokeLinecap="round" />
        {[[-30, -142], [-18, -150], [-6, -154], [6, -154], [18, -150], [30, -142]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="4.6" fill={i % 2 ? '#F7C6D0' : '#F3DCA4'} />
            <circle cx="5.6" cy="-2.6" r="3.4" fill={i % 2 ? '#E88AA0' : '#E3C77E'} />
            <circle cx="-5.6" cy="-2.6" r="3.4" fill={i % 2 ? '#E88AA0' : '#E3C77E'} />
            <circle cx="0" cy="-6" r="3.4" fill={i % 2 ? '#F7C6D0' : '#F3DCA4'} />
            <circle r="2" fill="#D9A82F" />
          </g>
        ))}
      </g>
    );
  }
  return null;
}

/* --------------------------------------------------------------- *
 * The figure
 * --------------------------------------------------------------- */
export function HerbalistAvatar({ gear = {}, size = 190, className = '' }) {
  const gloved = gear.hands === 'av-gloves';
  const booted = gear.feet === 'av-boots';
  const clogged = gear.feet === 'av-clogs';
  const hasHat = !!gear.hat;

  return (
    <svg
      viewBox="-90 -180 180 210"
      width={size}
      height={(size * 210) / 180}
      className={className}
      role="img"
      aria-label="You, in your greenhouse"
    >
      {/* legs */}
      <rect x="-19" y="2" width="15" height="24" rx="6" fill={SKIN} />
      <rect x="4" y="2" width="15" height="24" rx="6" fill={SKIN} />

      {/* feet — boots replace the plain shoes */}
      {clogged ? (
        <>
          <path d="M-25 12 L-1 12 L-1 28 L-27 28 Z" fill="#C96A5A" />
          <path d="M1 12 L25 12 L27 28 L1 28 Z" fill="#C96A5A" />
          <path d="M-27 24 L-1 24 M1 24 L27 24" stroke="#9C4E42" strokeWidth="4" />
          <path d="M-22 12 q10 -6 20 0 M6 12 q10 -6 20 0" stroke="#E08A78" strokeWidth="2.5" fill="none" />
        </>
      ) : booted ? (
        <>
          <path d="M-23 6 L-1 6 L-1 28 L-25 28 Z" fill="#4F7A4B" />
          <path d="M1 6 L23 6 L25 28 L1 28 Z" fill="#4F7A4B" />
          <path d="M-25 24 L-1 24 M1 24 L25 24" stroke="#3C5F39" strokeWidth="4" />
          {/* never once been clean */}
          <path d="M-22 20 q4 -3 8 1 M6 18 q4 -3 8 1" stroke="#7A5C3A" strokeWidth="2.5" fill="none" opacity=".7" />
        </>
      ) : (
        <>
          <rect x="-24" y="22" width="22" height="8" rx="4" fill="#5C4F58" />
          <rect x="2" y="22" width="22" height="8" rx="4" fill="#5C4F58" />
        </>
      )}

      {/* body */}
      <Body item={gear.body} />

      {/* arms */}
      <path d="M-32 -68 L-46 -30" stroke={gear.body === 'av-coat' ? '#F3F1EE' : DRESS} strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M32 -68 L46 -30" stroke={gear.body === 'av-coat' ? '#F3F1EE' : DRESS} strokeWidth="13" strokeLinecap="round" fill="none" />

      {/* hands — gloves land here, which is the entire point of the slot */}
      <circle cx="-46" cy="-30" r="8" fill={gloved ? '#C3D8C0' : SKIN} stroke={gloved ? '#7FA87A' : SKIN_SHADE} strokeWidth="1.6" />
      <circle cx="46" cy="-30" r="8" fill={gloved ? '#C3D8C0' : SKIN} stroke={gloved ? '#7FA87A' : SKIN_SHADE} strokeWidth="1.6" />
      {gloved && (
        <>
          <path d="M-52 -38 L-40 -38" stroke="#7FA87A" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 -38 L52 -38" stroke="#7FA87A" strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* tool belt — round the waist, so it reads as worn and not carried */}
      {gear.bag === 'av-belt' && (
        <>
          <path d="M-36 -4 L36 -4 L36 6 L-36 6 Z" fill="#8A6A42" />
          <rect x="-7" y="-6" width="14" height="14" rx="3" fill="#D9A82F" stroke="#A9834C" strokeWidth="2" />
          <path d="M14 4 L30 4 L28 20 L16 20 Z" fill="#A9834C" stroke="#7A5C3A" strokeWidth="2" />
          <path d="M-30 4 L-16 4 L-18 18 L-28 18 Z" fill="#A9834C" stroke="#7A5C3A" strokeWidth="2" />
          <path d="M20 4 L20 -8 M24 4 L24 -6" stroke="#8B7D86" strokeWidth="2.5" fill="none" />
          <path d="M-24 4 q-3 -10 2 -14" stroke="#4F7A4B" strokeWidth="2" fill="none" />
        </>
      )}

      {/* satchel — crosses the body, so it reads as worn rather than held */}
      {gear.bag === 'av-satchel' && (
        <>
          <path d="M-26 -74 L30 -22" stroke="#B08A5A" strokeWidth="6" fill="none" />
          <path d="M22 -30 L48 -30 L48 -4 L22 -4 Z" rx="3" fill="#C89B62" stroke="#9C7645" strokeWidth="2" />
          <path d="M22 -30 L48 -30 L48 -20 L22 -20 Z" fill="#B08A5A" />
          <circle cx="35" cy="-18" r="2.6" fill="#7A5C3A" />
          {/* a sprig poking out, because it always is */}
          <path d="M40 -30 q3 -12 -2 -18" stroke="#4F7A4B" strokeWidth="2" fill="none" />
          <circle cx="38" cy="-49" r="3" fill="#7FA87A" />
        </>
      )}

      {/* stethoscope — the other half of the plan, worn round the neck */}
      {gear.neck === 'av-stethoscope' && (
        <>
          <path d="M-14 -78 q-8 26 6 34" stroke="#3A4A56" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M14 -78 q8 26 -6 34" stroke="#3A4A56" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M0 -44 q2 12 8 16" stroke="#3A4A56" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <circle cx="10" cy="-26" r="7.5" fill="#C6CDD2" stroke="#8A959C" strokeWidth="2" />
          <circle cx="10" cy="-26" r="3.4" fill="#8A959C" />
          <circle cx="-14" cy="-80" r="2.8" fill="#3A4A56" />
          <circle cx="14" cy="-80" r="2.8" fill="#3A4A56" />
        </>
      )}

      {/* loupe on its cord */}
      {gear.neck === 'av-glasses' && (
        <>
          <path d="M-16 -70 q16 22 32 0" stroke="#8B7D86" strokeWidth="2" fill="none" />
          <circle cx="0" cy="-46" r="8" fill="rgba(199,224,235,.55)" stroke="#C9A227" strokeWidth="2.6" />
          <path d="M-5 -50 q5 -3 10 2" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".8" />
        </>
      )}

      {/* HAIR, PASS 1 — the volume, behind the head. Must stay above this
          comment and below nothing that belongs on her face. */}
      <Hair item={gear.hair} underHat={hasHat} layer="back" />

      {/* neck + head
          A CHILD'S HEAD, not a small adult's. The single strongest cue for age
          in a simple drawing is head-to-body ratio, so the head is round (r 30
          rather than a 28×31 oval) and larger against a body that has not
          changed — which also means every piece of gear still fits exactly where
          it did. The face inside it does the rest: bigger eyes, higher brows,
          a smaller nose and mouth, all sitting lower on the skull. */}
      <rect x="-7" y="-86" width="14" height="16" fill={SKIN_SHADE} />
      <ellipse cx="0" cy="-114" rx="30" ry="30" fill={SKIN} />
      <circle cx="-30" cy="-112" r="6.5" fill={SKIN_SHADE} />
      <circle cx="30" cy="-112" r="6.5" fill={SKIN_SHADE} />

      {/*
        THE FACE — a nine-year-old's.

        Two rounds of history in this block. First it was two dots and two arcs,
        and the grandmother said so: "her avatar's face isn't full form." Then it
        was redrawn in detail — and drawn so well that it read as a grown woman,
        which is its own kind of wrong for a child's avatar of herself. Her
        instruction was to switch them, so the adult face moved to Dr. Marigold
        and this one was rebuilt as a girl.

        What makes a drawn face read as a child, in order of force:
          - head-to-body ratio (see the head above)
          - eye size relative to the face — nearly adult-sized in a smaller head
          - where the features sit: low on the skull, leaving a tall forehead
          - what is ABSENT: no nose bridge, no defined cheekbones, no full lips
        The last one matters most. Age creeps in through added detail, so the
        child's face is drawn with less, not with the same detail shrunk down.
      */}

      {/* round cheeks, set high and wide */}
      <ellipse cx="-17" cy="-103" rx="8.5" ry="6.5" fill="#95603D" opacity=".45" />
      <ellipse cx="17" cy="-103" rx="8.5" ry="6.5" fill="#95603D" opacity=".45" />

      {/* brows — thinner and softer than a grown woman's, set high */}
      <path d="M-21 -126 q8 -5 16 -1.5" stroke="#241A15" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M21 -126 q-8 -5 -16 -1.5" stroke="#241A15" strokeWidth="3.2" fill="none" strokeLinecap="round" />

      {/* eyes — big and round, set low on the skull */}
      {[-12, 12].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="-111" rx="8" ry="6.6" fill="#FBF7F2" />
          <circle cx={cx} cy="-111" r="5.4" fill="#3A2214" />
          <circle cx={cx} cy="-111" r="2.7" fill="#150F0C" />
          <circle cx={cx - 2} cy="-113.4" r="1.9" fill="#fff" />
          <circle cx={cx + 2.4} cy="-108.6" r="0.9" fill="#fff" opacity=".7" />
          <path
            d={`M${cx - 8.5} -112.5 q8.5 -7 17 0`}
            stroke="#1A1310"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path d={`M${cx + (cx < 0 ? -8 : 8)} -113.5 l${cx < 0 ? -3 : 3} -3`} stroke="#1A1310" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}

      {/* nose — small and soft. No bridge line: a drawn bridge ages a face
          instantly, which is what the grown version used it for. */}
      <path d="M-3.5 -99 q3.5 2.6 7 0" stroke={SKIN_SHADE} strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="-3.2" cy="-98.8" r="1" fill="#4E2C1A" opacity=".55" />
      <circle cx="3.2" cy="-98.8" r="1" fill="#4E2C1A" opacity=".55" />

      {/* philtrum */}
      <path d="M0 -97 L0 -94" stroke={SKIN_SHADE} strokeWidth="1.2" opacity=".4" />

      {/* mouth — small, and smiling. The upper lip once carried
          transform="translate(-5 0)", which slid the cupid's bow five units off
          the lower lip; it survived that long because the hair was covering it. */}
      <path
        d="M-7 -92 q3 -2.4 3.5 -0.4 q0.7 -2 3.5 -2 q2.8 0 3.5 2 q0.5 -2 3.5 0.4 q-7 2.6 -14 0 Z"
        fill="#8E4A45"
      />
      <path d="M-7 -92 q7 5.6 14 0 q-7 2.4 -14 0 Z" fill="#A8574F" />
      <path d="M-7 -92 q7 5.6 14 0" stroke="#6E362F" strokeWidth="1.1" fill="none" />

      {/* chin */}
      <path d="M-6 -86 q6 4 12 0" stroke={SKIN_SHADE} strokeWidth="1.6" fill="none" opacity=".4" />

      {/* HAIR, PASS 2 — the hairline only. Stops above the brows by design;
          see the note on the Hair component before changing these numbers. */}
      <Hair item={gear.hair} underHat={hasHat} layer="front" />
      {gear.hair === 'av-scarf' && <HeadWrap />}
      <Hat item={gear.hat} />
    </svg>
  );
}

/** The slots, in the order they are offered in the wardrobe. */
export const AVATAR_SLOTS = [
  { id: 'hair', label: 'Hair' },
  { id: 'hat', label: 'Hat' },
  { id: 'body', label: 'What you wear' },
  { id: 'hands', label: 'Hands' },
  { id: 'feet', label: 'Feet' },
  { id: 'bag', label: 'Bag' },
  { id: 'neck', label: 'Around your neck' }
];
