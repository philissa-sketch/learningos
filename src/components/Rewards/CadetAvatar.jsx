// ---------------------------------------------------------------------------
// THE CADET — drawn in SVG, so gear can actually be worn.
// (Part 10, built Aug 8, 2026.)
//
// WHY THIS EXISTS. Avatar Gear was incoherent, and the parent caught it: the
// catalogue listed hairstyles as whole-person emoji, "expressions" as face
// emoji, and "victory animations" that did not animate. None of it could ever
// have been worn, because the avatar was ONE EMOJI GLYPH and nothing can be
// layered onto a glyph. The gear was not badly labelled — it was unwearable by
// construction, and the honest note added earlier ("gear does not redraw the
// avatar") was describing a dead end rather than a missing feature.
//
// The room settled how to fix it. Draw the cadet the same way the furniture is
// drawn, in layers, and every slot becomes real: hair sits on the head, a visor
// sits over the eyes, a flight suit replaces the torso, gloves land on the
// hands, and a pose moves the arms.
//
// SKIN IS DRAWN, NOT MODIFIED. An emoji skin-tone modifier is a single
// take-it-or-leave-it byte. Drawing the figure means the cadet simply IS a
// Black boy at every layer — face, hands, the lot — and no future gear item can
// accidentally revert him to a default.
//
// ===========================================================================
// AND THE HALF THAT WAS NEVER FINISHED. (Aug 25, 2026.)
// ===========================================================================
//
// The parent: **"he stated that he purchased the robo helper from the store
// and nothing happened, it didn't go anywhere. The avatars look the same."**
//
// He was right, and his coin ledger proves it. He bought **Robo-Helper on
// Aug 17 for 150 coins** and equipped it. What that bought him was two emoji
// glyphs: one in the top bar and one beside the "Rewards" heading, both the
// size of a word of text.
//
// Because this file — the drawing of the person who represents him — took only
// `gear`. It never read `equippedAvatar` at all. The August 8 work replaced the
// emoji avatar with a drawn figure for GEAR purposes and left the six AVATARS
// in lib/rewards.js still being emoji, wired to nothing that draws. Two avatar
// systems in one app that were never introduced to each other, and the one he
// spends coins on is the one that cannot be seen.
//
// So an avatar now selects a FORM: the whole character changes. Robo-Helper is
// a robot. The Friendly Visitor is an alien. A form decides the head, the skin,
// the default suit and whether hair applies; the skeleton underneath stays the
// same in every form so that **every piece of gear he already owns keeps
// working on every character** — his Afro and Flight Suit do not stop existing
// because he equipped a different avatar.
//
// Non-human forms do not render hair (a robot has no hairline) but still take
// the body, pose and hands slots, so nothing he owns is ever silently dropped.
// ---------------------------------------------------------------------------

const HAIR = '#1c1414';

/** Torso colours per uniform. Default is the standard cadet jumpsuit. */
const BODY = {
  default: { suit: '#2E4A63', trim: '#22D3EE' },
  'av-uniform-flight': { suit: '#C2601C', trim: '#F5A524' },
  'av-uniform-eng': { suit: '#233648', trim: '#5d7c99' },
  'av-uniform-lab': { suit: '#DDE5EC', trim: '#9db6cb' },
  /**
   * ---- CAUGHT BY THE GUARD, NOT BY ME (Aug 25, 2026) ----
   *
   * `eq-suit-flight` — the Mission Equipment Flight Suit — was given the `body`
   * slot so it would conflict correctly with the Avatar Gear uniforms. It would
   * have equipped, shown "Worn", written to the database, synced between two
   * computers, and changed **nothing**, because this map is keyed by id and had
   * only the `av-uniform-*` ones in it.
   *
   * That is the identical failure being fixed today, arriving inside the fix
   * for it — which is exactly why the check asserts every wearable piece is
   * drawn rather than trusting that a slot implies a drawing.
   *
   * A white EVA suit rather than a second orange one: the gear Flight Suit is
   * already orange, and two items that equip to the same slot should not be
   * the same picture.
   */
  'eq-suit-flight': { suit: '#DDE5EC', trim: '#22D3EE' }
};

/**
 * Poses move the arms. This is what the old "victory animations" should have
 * been: a still frame that genuinely changes the drawing, rather than a promise
 * of motion the app cannot keep.
 */
const ARMS = {
  default: { left: 'M-30 -66 L-44 -34', right: 'M30 -66 L44 -34' },
  'av-pose-salute': { left: 'M-30 -66 L-46 -36', right: 'M30 -66 L16 -92' },
  'av-pose-liftoff': { left: 'M-30 -66 L-46 -98', right: 'M30 -66 L46 -98' },
  'av-pose-float': { left: 'M-30 -66 L-52 -60', right: 'M30 -66 L52 -60' }
};

/**
 * HAIR IS TWO LAYERS, AND THE FACE ALWAYS WINS.
 *
 * ---- WHY (Aug 16, 2026) ----
 *
 * The parent: "I put hair on the avatar and it covers the avatar face."
 *
 * Two faults compounding. `<Hair />` was drawn AFTER `<Face />`, so hair
 * painted over the eyes, brows and mouth by construction. And two of the four
 * styles were shaped to reach into the face anyway: the afro was a single disc
 * at cy -130 with r 34, reaching down to y -96 — the brows are at -121, the
 * eyes at -112 and the mouth at -98, so it covered all three. The locs hung
 * straight down the middle of the face.
 *
 * Real hair has volume BEHIND the head and a hairline ON it, so this is two
 * components and the order is: back, head, front, face.
 *
 *   HairBack   the mass — sits behind the skull, so a natural reads as a halo
 *              around the head instead of a disc in front of it, and locs fall
 *              at the SIDES of the face rather than across it
 *   HairFront  the hairline cap, on top of the skull and never below y -126,
 *              which is above the brows
 *
 * The face is drawn last regardless. **No hairstyle can ever cover his face
 * again, whatever shape a future one is** — a guard asserts the order.
 */
function HairBack({ style }) {
  if (style === 'av-hair-afro') {
    // The volume of a natural sits AROUND the head. Behind it, it reads right.
    return <circle cx="0" cy="-126" r="36" fill={HAIR} />;
  }
  if (style === 'av-hair-locs') {
    return (
      <>
        <circle cx="0" cy="-128" r="30" fill={HAIR} />
        {/* outside the head's rx of 27, so they frame the face, never cross it */}
        {[-39, -31, 31, 39].map((x, i) => (
          <rect
            key={x}
            x={x - 3.5}
            y={-132 + (i % 2) * 6}
            width="7"
            height={42 + (i % 3) * 10}
            rx="3.5"
            fill={HAIR}
          />
        ))}
      </>
    );
  }
  return null;
}

function HairFront({ style }) {
  if (style === 'av-hair-fade') {
    // Low fade: close at the sides, a little height on top.
    return (
      <>
        <path d="M-25 -126 q25 -18 50 0 q2 -24 -25 -24 q-27 0 -25 24 Z" fill={HAIR} />
        <path d="M-25 -126 q0 5 1 8 M25 -126 q0 5 -1 8" stroke={HAIR} strokeWidth="5" fill="none" />
      </>
    );
  }
  if (style === 'av-hair-afro') {
    return <path d="M-25 -130 q25 -14 50 0 q2 -18 -25 -18 q-27 0 -25 18 Z" fill={HAIR} />;
  }
  if (style === 'av-hair-locs') {
    return <path d="M-26 -130 q26 -16 52 0 q2 -20 -26 -20 q-28 0 -26 20 Z" fill={HAIR} />;
  }
  // Default: short natural hair.
  return <path d="M-26 -126 q26 -18 52 0 q2 -24 -26 -24 q-28 0 -26 24 Z" fill={HAIR} />;
}

function Face({ expression, eyewear, ink = '#12100f', mouthInk = '#2a1c16', browInk = '#1b1512' }) {
  const brow = expression === 'av-expr-focused';
  const smile = expression === 'av-expr-grin';

  return (
    <>
      {/* eyes */}
      {!eyewear && (
        <>
          <ellipse cx="-11" cy="-112" rx="4" ry={brow ? 2.6 : 4} fill={ink} />
          <ellipse cx="11" cy="-112" rx="4" ry={brow ? 2.6 : 4} fill={ink} />
        </>
      )}
      {/* brows */}
      <path
        d={brow ? 'M-18 -122 L-5 -119 M18 -122 L5 -119' : 'M-18 -121 L-5 -122 M18 -121 L5 -122'}
        stroke={browInk} strokeWidth="3" strokeLinecap="round" fill="none"
      />
      {/* mouth */}
      {smile
        ? <path d="M-10 -99 q10 9 20 0" stroke={mouthInk} strokeWidth="3" fill="none" strokeLinecap="round" />
        : <path d="M-8 -98 L8 -98" stroke={mouthInk} strokeWidth="3" strokeLinecap="round" />}

      {/* eyewear sits OVER the eyes — this is the layering the emoji could not do */}
      {eyewear === 'av-glasses' && (
        <g stroke="#9db6cb" strokeWidth="2.5" fill="rgba(180,220,235,.35)">
          <rect x="-22" y="-120" width="44" height="16" rx="7" />
          <path d="M-22 -112 L-30 -110 M22 -112 L30 -110" fill="none" />
        </g>
      )}
      {eyewear === 'av-glasses-cool' && (
        <g stroke="#2b3f53" strokeWidth="2.5" fill="#16222d">
          <path d="M-22 -118 L-2 -118 L-4 -104 L-18 -104 Z" />
          <path d="M22 -118 L2 -118 L4 -104 L18 -104 Z" />
          <path d="M-2 -116 L2 -116" />
        </g>
      )}
    </>
  );
}

/** A human head: neck, skull, ears — the shared base for every person form. */
function HumanHead({ skin, shade }) {
  return (
    <>
      <rect x="-7" y="-80" width="14" height="12" fill={shade} />
      <ellipse cx="0" cy="-110" rx="27" ry="30" fill={skin} />
      <path d="M-27 -110 q4 14 12 22" stroke={shade} strokeWidth="2" fill="none" opacity=".5" />
      <circle cx="-27" cy="-108" r="6" fill={shade} />
      <circle cx="27" cy="-108" r="6" fill={shade} />
    </>
  );
}

/* ===========================================================================
 * STANCES — what the body is doing, as opposed to what it is wearing.
 *
 * ---- WHY (Aug 25, 2026) ----
 *
 * The parent: **"Can he also have his Avatar move around the HQ to use items
 * in there. ex use the engineering work station, telescope, and the mission
 * computer. sit in the flight chair."**
 *
 * Poses already existed, but a pose is only an ARM PATH — the salute, the
 * liftoff, the zero-G float. None of them can sit down, because the legs were
 * a fixed pair of rectangles with one special case for floating.
 *
 * A stance replaces the legs AND the arms, so the figure can genuinely sit at
 * a console or lean over a bench. Stances are not purchases and never will be:
 * they are what he is DOING at a station, chosen by the station, not by a
 * shop.
 *
 * PRECEDENCE: a stance outranks an equipped pose while he is at a station, and
 * only there. Standing in the middle of his room he is back to his salute or
 * his liftoff — the pose he paid 400 coins for does not get overwritten by
 * furniture.
 * =========================================================================== */
export const STANCES = {
  stand: null, // the default legs and the equipped pose

  /**
   * ===========================================================================
   * WALKING — the one thing in this room that was still gliding.
   * ===========================================================================
   *
   * The parent, after Fallout Shelter: **"Can the animation also work the
   * same?"**
   *
   * Nearly all of it already did. That game's dwellers are 2D jointed figures
   * in a cutaway room — players describe them as puppets on wires — which is
   * exactly what this skeleton is, and Phase 1 gave every stance its own idle
   * loop. What was missing was the bit between two stations: a figure crossing
   * the floor was a STATIC pose sliding 900ms on a CSS transform, legs locked
   * together, like a chess piece being moved by an invisible hand.
   *
   * That single detail is what the eye reads as "not a person".
   *
   * ---- THE FIRST VERSION WAS A SIDE-ON WALK ON A FRONT-ON FIGURE ----
   *
   * Built first as counter-rotating legs pivoting about their hips: one leg
   * swings forward, the other back. That is how a walk cycle works, and it is
   * how the dwellers in the source game work — **because that game is a side-on
   * cutaway and you see its people in profile.**
   *
   * This room is one-point perspective and the figures FACE THE VIEWER. A
   * rotation in the picture plane does not swing a leg forward; it swings it
   * OUT. The rendered frame showed the cadet with his legs splayed into a V,
   * feet wide apart, looking like he was standing over a puddle. The guard was
   * green the whole time — it checked the pivot was the hip and the phases were
   * opposite, and both were true. It cannot check what a thing looks like.
   *
   * A front-facing walk reads from the legs ALTERNATELY LIFTING, not scissoring.
   * So each leg group translates up and down out of phase with the other, the
   * boot riding with it, and the arms keep a small opposite swing for life. All
   * of it is `<animateTransform>`, the same declarative SMIL every other stance
   * uses. No JavaScript drives a frame; Phase 1's rule is untouched.
   *
   * The motion goes through `<Motion on={moving} />` like everything else,
   * rather than being written into the leg shapes, so reduced motion is
   * honoured by the SAME gate as the rest of the figure. A second way to
   * animate would be a second thing to forget.
   *
   * 0.68s per stride against a 900ms crossing: a step and a half per journey,
   * which is what a short walk across a room actually looks like.
   */
  walk: {
    legParts: {
      left: (suit) => (
        <>
          <rect x="-21" y="-4" width="17" height="30" rx="7" fill={suit} />
          <rect x="-25" y="20" width="23" height="9" rx="4" fill="#1b2530" />
        </>
      ),
      right: (suit) => (
        <>
          <rect x="4" y="-4" width="17" height="30" rx="7" fill={suit} />
          <rect x="2" y="20" width="23" height="9" rx="4" fill="#1b2530" />
        </>
      )
    },
    arms: { left: 'M-30 -66 L-32 -30', right: 'M30 -66 L32 -30' },
    motion: {
      // One leg up while the other is down, always. Seven units is about a
      // quarter of the thigh — enough to read as a step at the size these
      // figures are drawn, small enough not to look like high knees.
      legL: { type: 'translate', values: '0 0; 0 -7; 0 0', dur: '0.68s' },
      legR: { type: 'translate', values: '0 -7; 0 0; 0 -7', dur: '0.68s' },
      // Arms keep a small opposite swing — this one IS in the picture plane and
      // reads fine, because arms hang at the sides where sideways is the way
      // they actually move. Nine degrees, not thirteen: front-on, a big swing
      // looks like the figure is being held up by the elbows.
      left: { type: 'rotate', values: '9 -30 -66; -9 -30 -66; 9 -30 -66', dur: '0.68s' },
      right: { type: 'rotate', values: '-9 30 -66; 9 30 -66; -9 30 -66', dur: '0.68s' }
    }
  },

  /** Seated: thighs forward, shins down, hands resting on a console. */
  sit: {
    legs: (suit) => (
      <>
        <rect x="-20" y="-6" width="40" height="15" rx="7" fill={suit} />
        <rect x="14" y="-6" width="15" height="30" rx="7" fill={suit} />
        <rect x="-4" y="-6" width="15" height="30" rx="7" fill={suit} />
        <rect x="10" y="20" width="24" height="9" rx="4" fill="#1b2530" />
        <rect x="-8" y="20" width="24" height="9" rx="4" fill="#1b2530" />
      </>
    ),
    arms: { left: 'M-30 -66 L-34 -30', right: 'M30 -66 L34 -30' },
    // Hands drift on the armrests. Slow, because a seated person at rest is
    // not doing anything — the motion is here so he reads as alive, not busy.
    motion: {
      right: { type: 'rotate', values: '0 30 -66; -2.5 30 -66; 0 30 -66', dur: '4.6s' },
      head: { type: 'rotate', values: '0 0 -80; 2 0 -80; 0 0 -80; -2 0 -80; 0 0 -80', dur: '9s' }
    }
  },

  /**
   * ===========================================================================
   * DRAFTING AT THE WORKSTATION — a job with a beginning and an end.
   * ===========================================================================
   *
   * The parent: **"The Avatar arms just moves a little. Its not doing anything
   * with the workstation."**
   *
   * What it used to be: the right arm rotated nine degrees and came back, over
   * 2.6 seconds, with the hands 65 pixels below the desk. Nine degrees on a
   * forearm forty units long moves the hand about six units. She described it
   * exactly — the arms moved a little, and nothing else happened.
   *
   * What a person actually does at a drafting desk is a LOOP WITH PHASES: set
   * the pencil down at the left of the sheet, draw across it, lift off, sit
   * back to look at what you drew, then go again. It is the sitting-back that
   * makes it read as work — continuous motion reads as fidgeting, and a pause
   * is what tells you the thing being done has parts.
   *
   * `keyTimes` is what buys that. Without it the four values are spread evenly
   * and the pause disappears into the sweep.
   *
   * The pencil is `holds`, so it rides inside the right-hand group and cannot
   * drift off the hand carrying it — the one way this kind of motion goes
   * visibly wrong. And it is the reason the whole thing reads at all: an empty
   * hand moving over a desk is ambiguous, a hand with a pencil in it is drawing.
   */
  work: {
    reaches: { lx: -34, rx: 30 },
    lean: -6,
    motion: {
      // Across the sheet, lift, and back to the start. 34 units of travel on a
      // ~60-unit-wide sheet: a real stroke, not a tremor.
      right: {
        type: 'translate',
        values: '0 0; 34 0; 34 -3; 34 -3; 0 -3; 0 0',
        keyTimes: '0; 0.34; 0.40; 0.62; 0.72; 1',
        dur: '4.4s'
      },
      // The left hand holds the sheet steady and shifts it once per pass.
      left: {
        type: 'translate',
        values: '0 0; 0 0; -3 1; -3 1; 0 0; 0 0',
        keyTimes: '0; 0.40; 0.46; 0.66; 0.74; 1',
        dur: '4.4s'
      },
      // Down at the work, then up to judge it, then down again.
      head: {
        type: 'rotate',
        values: '0 0 -80; 0 0 -80; -9 0 -80; -9 0 -80; 0 0 -80',
        keyTimes: '0; 0.40; 0.48; 0.66; 0.76',
        dur: '4.4s'
      }
    },
    holds: () => (
      <g>
        {/* A pencil, angled into the surface the way one is actually held. */}
        <path d="M2 4 L11 22" stroke="#E8B24C" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 20 L12 24" stroke="#2b333c" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  },

  /**
   * TYPING. Both hands, alternating, at the speed a twelve-year-old actually
   * types rather than the speed that looks impressive.
   *
   * (Aug 25, 2026.) The travel was 2.5 units — on a figure 165 units tall, a
   * quarter of the width of his own hand. It is 6 now, the hands sit ON the
   * keyboard because `reaches` puts them there, and the head lifts off the
   * screen every few seconds the way anyone's does while thinking.
   */
  type: {
    reaches: { lx: -20, rx: 20 },
    lean: -4,
    motion: {
      left: { type: 'translate', values: '0 0; 0 6; 0 0; 0 3; 0 0', dur: '0.62s' },
      right: { type: 'translate', values: '0 4; 0 0; 0 6; 0 0; 0 4', dur: '0.55s' },
      head: {
        type: 'rotate',
        values: '0 0 -80; 0 0 -80; -7 0 -80; -7 0 -80; 0 0 -80',
        keyTimes: '0; 0.55; 0.62; 0.8; 0.9',
        dur: '6.5s'
      }
    }
  },

  /** One hand up to an eyepiece, the other adjusting focus. */
  reach: {
    arms: { left: 'M-30 -66 L-38 -34', right: 'M30 -66 L20 -104' },
    lean: -3,
    motion: {
      left: { type: 'rotate', values: '0 -30 -66; -8 -30 -66; 0 -30 -66', dur: '2.2s' },
      right: { type: 'rotate', values: '0 30 -66; 1.5 30 -66; 0 30 -66', dur: '3.8s' }
    }
  },

  /** Standing and looking at something — a poster, the aquarium, the window. */
  gaze: {
    arms: { left: 'M-30 -66 L-38 -30', right: 'M30 -66 L38 -30' },
    // The head tracks slowly across, the way you read a poster or follow a
    // fish. This is the whole animation for the wall pieces she named.
    motion: {
      head: { type: 'rotate', values: '0 0 -80; -7 0 -80; -7 0 -80; 7 0 -80; 7 0 -80; 0 0 -80', dur: '8s' }
    }
  },

  /**
   * PICK IT UP AND PUT IT DOWN. The right arm lowers, closes on the thing,
   * lifts it to eye level, holds, and sets it back.
   *
   * `holds` is drawn INSIDE the right-hand group, so it inherits that group's
   * animation for free — the object cannot drift away from the hand carrying
   * it, which is the one way this kind of motion goes visibly wrong.
   */
  lift: {
    arms: { left: 'M-30 -66 L-38 -32', right: 'M30 -66 L30 -40' },
    motion: {
      right: {
        type: 'rotate',
        values: '0 30 -66; 0 30 -66; -46 30 -66; -46 30 -66; 0 30 -66; 0 30 -66',
        dur: '5.2s'
      },
      head: { type: 'rotate', values: '0 0 -80; 0 0 -80; 5 0 -80; 5 0 -80; 0 0 -80', dur: '5.2s' }
    },
    holds: () => (
      <g>
        <rect x="-9" y="-9" width="18" height="18" rx="3" fill="#8FA3B5" stroke="#5E7285" strokeWidth="2" />
        <path d="M-9 -3 L9 -3" stroke="#5E7285" strokeWidth="1.5" />
      </g>
    )
  },

  /** Crouched to the soil — the plant and the grow box. */
  tend: {
    legs: (suit) => (
      <>
        <rect x="-22" y="-6" width="18" height="24" rx="8" fill={suit} />
        <rect x="6" y="-6" width="16" height="30" rx="7" fill={suit} />
        <rect x="-26" y="14" width="24" height="9" rx="4" fill="#1b2530" />
        <rect x="2" y="20" width="24" height="9" rx="4" fill="#1b2530" />
      </>
    ),
    arms: { left: 'M-30 -66 L-34 -28', right: 'M30 -66 L26 -18' },
    lean: -8,
    motion: {
      right: { type: 'rotate', values: '0 30 -66; -6 30 -66; 4 30 -66; 0 30 -66', dur: '3.2s' }
    }
  }
};

/* ===========================================================================
 * MISSION EQUIPMENT, DRAWN ON THE BODY.
 *
 * The parent: **"Lamar wants to use the equipment he purchases not just have
 * it sitting in the equipment app."**
 *
 * Until today the twelve equipment pieces had no `slot`, and `equipGear`
 * refuses anything without one — so they could be bought, drawn on a rack, and
 * never worn. He owns three of them.
 *
 * Each drawing here is keyed by the item id and takes the same `{skin, shade,
 * suit, trim}` the figure is already using, so a helmet matches the suit it is
 * worn with rather than being a fixed grey shape stuck on top.
 * =========================================================================== */
const EQUIPMENT_ART = {
  // --- head: over the skull, under the visor ---
  'eq-helmet-basic': ({ trim }) => (
    <>
      <ellipse cx="0" cy="-114" rx="35" ry="36" fill="#DDE5EC" stroke="#9db6cb" strokeWidth="2.5" />
      <ellipse cx="0" cy="-112" rx="25" ry="25" fill="rgba(180,220,235,.22)" stroke="#9db6cb" strokeWidth="1.5" />
      <rect x="-38" y="-86" width="76" height="10" rx="5" fill="#C6D2DC" stroke="#9db6cb" strokeWidth="2" />
      <circle cx="-30" cy="-128" r="4" fill={trim} />
    </>
  ),

  // --- visor: comes DOWN over whatever is on his face, like a real EVA visor ---
  'eq-visor-gold': () => (
    <>
      <path d="M-31 -122 q31 -14 62 0 q2 26 -31 30 q-33 -4 -31 -30 Z" fill="#C08A18" stroke="#7d5a0e" strokeWidth="2" />
      <path d="M-18 -122 q12 -7 24 -3" stroke="#F0D48A" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".85" />
    </>
  ),

  // --- back: drawn BEHIND the torso, so it reads as a pack, not a bib ---
  'eq-jetpack': ({ trim }) => (
    <>
      <rect x="-34" y="-70" width="20" height="46" rx="7" fill="#8FA3B5" stroke="#5E7285" strokeWidth="2" />
      <rect x="14" y="-70" width="20" height="46" rx="7" fill="#8FA3B5" stroke="#5E7285" strokeWidth="2" />
      <path d="M-24 -24 l0 10 M24 -24 l0 10" stroke={trim} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  'eq-pack-life': ({ trim }) => (
    <>
      <rect x="-30" y="-74" width="60" height="52" rx="9" fill="#C6D2DC" stroke="#9db6cb" strokeWidth="2" />
      <rect x="-20" y="-66" width="40" height="12" rx="4" fill={trim} opacity=".55" />
      <circle cx="0" cy="-38" r="6" fill="#5E7285" />
    </>
  ),

  // --- feet: over the boots the suit already draws ---
  'eq-boots': ({ trim }) => (
    <>
      <rect x="-27" y="14" width="25" height="15" rx="5" fill="#DDE5EC" stroke="#9db6cb" strokeWidth="2" />
      <rect x="4" y="14" width="25" height="15" rx="5" fill="#DDE5EC" stroke="#9db6cb" strokeWidth="2" />
      <path d="M-27 22 L-2 22 M4 22 L29 22" stroke={trim} strokeWidth="2.5" />
    </>
  ),

  // --- belt ---
  'eq-tether': ({ trim }) => (
    <>
      <rect x="-31" y="-14" width="62" height="9" rx="4" fill="#4a5a6b" stroke="#2b3f53" strokeWidth="1.5" />
      <path d="M28 -10 q22 8 16 30" stroke={trim} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="22" r="4" fill="none" stroke={trim} strokeWidth="2.5" />
    </>
  ),

  // --- carried in a hand ---
  'eq-toolkit': () => (
    <>
      <rect x="34" y="-30" width="30" height="22" rx="4" fill="#C2601C" stroke="#7d3d0e" strokeWidth="2" />
      <path d="M42 -30 q7 -9 14 0" stroke="#7d3d0e" strokeWidth="2.5" fill="none" />
      <path d="M34 -21 L64 -21" stroke="#7d3d0e" strokeWidth="1.5" />
    </>
  )
};

/**
 * ===========================================================================
 * MOTION — SMIL, on purpose.
 *
 * The parent: **"is there a way there is animation like it is using the work
 * station or whatever item the avatar comes upon that is used. Ex looks at
 * items on the wall. pick up and put down certain items. type on computer."**
 *
 * `<animateTransform>` rather than JavaScript, for three reasons:
 *
 *   1. It is DECLARATIVE. No timer, no rAF loop, no state changing sixty times
 *      a second on a screen that also holds a drag interaction. Nothing here
 *      can leak a handler or re-render the room.
 *   2. It already works in this app. `RocketProgressMeter` has animated the
 *      rocket flame with a plain `<animate>` since it was written, so this is
 *      a proven path rather than a hopeful one — which matters because **no
 *      guard in this repo can render a component**, let alone watch it move.
 *   3. If a browser ignores it entirely, the figure is still correct. He holds
 *      the stance and simply does not breathe. The feature degrades to what
 *      shipped yesterday rather than to a broken screen.
 *
 * `additive="sum"` is load-bearing. Without it the animation REPLACES any
 * transform already on the group, and the arm would snap to the origin before
 * it moved — the classic SMIL mistake.
 */
function Motion({ spec, on }) {
  if (!spec || !on) return null;
  return (
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type={spec.type}
      values={spec.values}
      dur={spec.dur}
      repeatCount="indefinite"
      additive="sum"
      calcMode="spline"
      keySplines={spec.values
        .split(';')
        .slice(1)
        .map(() => '.4 0 .2 1')
        .join(';')}
      keyTimes={spec.values
        .split(';')
        .map((_, i, a) => (i / (a.length - 1)).toFixed(4))
        .join(';')}
    />
  );
}

/**
 * Does this machine want motion at all?
 *
 * Read once at module load. A person who has asked their operating system to
 * reduce motion has asked every app on it, and a room full of looping figures
 * is exactly what that setting exists to stop.
 */
const PREFERS_REDUCED_MOTION = (() => {
  try {
    return typeof window !== 'undefined'
      && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
})();

/** Which equipment slots draw BEHIND the figure rather than on top of it. */
const BEHIND_SLOTS = new Set(['back']);

/* ===========================================================================
 * THE FORMS.
 *
 * Each one is a whole character. `human: true` means the shared head, hair and
 * face are drawn and the gear slots for hair / eyes / expression apply.
 * `headwear` draws on top of the face (a helmet, a cap) and may hide it.
 *
 * Everything shares the same skeleton — legs at y 0..29, torso -70..-2, arms
 * from the shoulders — so a pose, a uniform and a pair of gloves land correctly
 * on every form. That is deliberate: gear he already paid for must not stop
 * working because he changed character.
 * =========================================================================== */
export const AVATAR_FORMS = {
  /* ---- the default: he is a Black American boy, and starts as himself ---- */
  'avatar-cadet': {
    human: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#2E4A63', trim: '#22D3EE' }
  },

  /* ---- suited for EVA: the visor is down, so the face is the visor ---- */
  'avatar-astronaut': {
    human: true,
    hideHair: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#DDE5EC', trim: '#22D3EE' },
    headwear: () => (
      <>
        <ellipse cx="0" cy="-112" rx="37" ry="38" fill="#EDF2F6" stroke="#9db6cb" strokeWidth="2.5" />
        <ellipse cx="0" cy="-112" rx="26" ry="26" fill="#C08A18" stroke="#7d5a0e" strokeWidth="2" />
        <path d="M-16 -126 q10 -8 22 -3" stroke="#F0D48A" strokeWidth="4" fill="none" strokeLinecap="round" opacity=".85" />
        <rect x="-40" y="-84" width="80" height="10" rx="5" fill="#C6D2DC" stroke="#9db6cb" strokeWidth="2" />
      </>
    )
  },

  /* ---------------------------------------------------------------------
   * ROBO-HELPER. The 150 coins he actually spent, on Aug 17, on a thing
   * that until today changed two emoji. It is a robot now.
   * ------------------------------------------------------------------- */
  'avatar-robot': {
    human: false,
    suit: { suit: '#3B4C5E', trim: '#34D399' },
    head: () => (
      <>
        {/* neck strut */}
        <rect x="-6" y="-80" width="12" height="12" fill="#6d7f91" />
        {/* antenna */}
        <path d="M0 -142 L0 -152" stroke="#9db6cb" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-155" r="5" fill="#34D399" />
        {/* skull */}
        <rect x="-30" y="-142" width="60" height="62" rx="14" fill="#8FA3B5" stroke="#5E7285" strokeWidth="2" />
        <rect x="-25" y="-136" width="50" height="34" rx="8" fill="#16222d" />
        {/* eyes — two lamps on a dark screen */}
        <circle cx="-11" cy="-119" r="6" fill="#34D399" />
        <circle cx="11" cy="-119" r="6" fill="#34D399" />
        {/* speaker grille for a mouth */}
        <g stroke="#5b6f82" strokeWidth="3" strokeLinecap="round">
          <path d="M-13 -93 L13 -93" />
          <path d="M-9 -87 L9 -87" />
        </g>
        {/* ear pods */}
        <rect x="-38" y="-124" width="8" height="20" rx="4" fill="#6d7f91" />
        <rect x="30" y="-124" width="8" height="20" rx="4" fill="#6d7f91" />
      </>
    )
  },

  /* ---- the Friendly Visitor ---- */
  'avatar-alien': {
    human: false,
    suit: { suit: '#2E4A63', trim: '#A78BFA' },
    head: () => (
      <>
        <rect x="-6" y="-80" width="12" height="12" fill="#5FA87A" />
        <ellipse cx="0" cy="-114" rx="31" ry="34" fill="#7FD8A0" />
        <ellipse cx="0" cy="-100" rx="22" ry="20" fill="#6BC98F" opacity=".5" />
        {/* the big dark eyes */}
        <ellipse cx="-12" cy="-116" rx="9" ry="12" fill="#101c18" transform="rotate(-14 -12 -116)" />
        <ellipse cx="12" cy="-116" rx="9" ry="12" fill="#101c18" transform="rotate(14 12 -116)" />
        <circle cx="-14" cy="-120" r="2.5" fill="#ffffff" opacity=".8" />
        <circle cx="10" cy="-120" r="2.5" fill="#ffffff" opacity=".8" />
        {/* a small friendly mouth */}
        <path d="M-7 -96 q7 6 14 0" stroke="#2f5c44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* antennae */}
        <path d="M-14 -144 q-4 -12 -12 -14" stroke="#5FA87A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M14 -144 q4 -12 12 -14" stroke="#5FA87A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="-27" cy="-159" r="4" fill="#A78BFA" />
        <circle cx="27" cy="-159" r="4" fill="#A78BFA" />
      </>
    )
  },

  /* ---- Satellite: a drone with a dish for a face and solar wings ---- */
  'avatar-satellite': {
    human: false,
    suit: { suit: '#4A5A6B', trim: '#22D3EE' },
    behind: () => (
      <>
        {/* solar arrays, behind the body so the torso reads in front */}
        <rect x="-78" y="-62" width="34" height="44" rx="3" fill="#1f3d5c" stroke="#22D3EE" strokeWidth="2" />
        <rect x="44" y="-62" width="34" height="44" rx="3" fill="#1f3d5c" stroke="#22D3EE" strokeWidth="2" />
        <g stroke="#22D3EE" strokeWidth="1" opacity=".55">
          <path d="M-67 -62 L-67 -18 M-56 -62 L-56 -18 M55 -62 L55 -18 M66 -62 L66 -18" />
        </g>
        <path d="M-44 -44 L-30 -44 M30 -44 L44 -44" stroke="#8FA3B5" strokeWidth="4" />
      </>
    ),
    head: () => (
      <>
        <rect x="-6" y="-80" width="12" height="12" fill="#6d7f91" />
        {/* the dish */}
        <ellipse cx="0" cy="-112" rx="32" ry="32" fill="#C6D2DC" />
        <ellipse cx="0" cy="-112" rx="24" ry="24" fill="#8FA3B5" />
        <ellipse cx="0" cy="-112" rx="14" ry="14" fill="#16222d" />
        {/* the feed horn reads as a nose, which is what makes it a face */}
        <path d="M0 -112 L0 -150" stroke="#9db6cb" strokeWidth="3" />
        <circle cx="0" cy="-152" r="5" fill="#22D3EE" />
        {/* status lamps for eyes */}
        <circle cx="-19" cy="-124" r="3.5" fill="#22D3EE" />
        <circle cx="19" cy="-124" r="3.5" fill="#F5A524" />
      </>
    )
  },

  /* ---------------------------------------------------------------------
   * STARGAZER — was "Ringed Planet". Renamed and redrawn Aug 25, 2026.
   *
   * A ringed planet is not a person, which is why it was an emoji and never
   * anything more. Nobody owns this one, so no coins are affected by the
   * change; the ringed planet survives as the emblem on the visor.
   * ------------------------------------------------------------------- */
  'avatar-planet': {
    human: true,
    hideHair: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#2B2350', trim: '#A78BFA' },
    headwear: () => (
      <>
        <ellipse cx="0" cy="-112" rx="37" ry="38" fill="#1A1430" stroke="#A78BFA" strokeWidth="2.5" />
        <ellipse cx="0" cy="-112" rx="26" ry="26" fill="#120E24" />
        {/* a starfield he is looking through */}
        <g fill="#DDE5EC">
          <circle cx="-14" cy="-120" r="1.6" /><circle cx="6" cy="-126" r="1.2" />
          <circle cx="14" cy="-108" r="1.6" /><circle cx="-8" cy="-104" r="1.2" />
          <circle cx="0" cy="-114" r="1" /><circle cx="-19" cy="-107" r="1" />
        </g>
        {/* the ringed planet, kept from the name it used to have */}
        <circle cx="9" cy="-116" r="6.5" fill="#F5A524" />
        <ellipse cx="9" cy="-116" rx="12" ry="3.6" fill="none" stroke="#F0D48A" strokeWidth="2" transform="rotate(-20 9 -116)" />
        <rect x="-40" y="-84" width="80" height="10" rx="5" fill="#3B3268" stroke="#A78BFA" strokeWidth="2" />
      </>
    )
  },

  /* ======================= NEW, Aug 25 2026 ========================= */

  /* ---- Flight Engineer — headset and goggles pushed up ---- */
  'avatar-engineer': {
    human: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#233648', trim: '#5d7c99' },
    headwear: () => (
      <>
        {/* goggles pushed up onto the forehead — he has been working */}
        <rect x="-26" y="-140" width="52" height="12" rx="6" fill="#2b3f53" stroke="#9db6cb" strokeWidth="2" />
        <circle cx="-13" cy="-134" r="5" fill="#7FD8E8" opacity=".7" />
        <circle cx="13" cy="-134" r="5" fill="#7FD8E8" opacity=".7" />
        {/* headset */}
        <path d="M-30 -116 q0 -30 30 -30 q30 0 30 30" stroke="#1b2530" strokeWidth="4" fill="none" />
        <rect x="-36" y="-119" width="10" height="18" rx="5" fill="#1b2530" />
        <rect x="26" y="-119" width="10" height="18" rx="5" fill="#1b2530" />
        <path d="M26 -108 q-12 4 -16 10" stroke="#1b2530" strokeWidth="2.5" fill="none" />
        <circle cx="9" cy="-97" r="3" fill="#34D399" />
      </>
    )
  },

  /* ---- Test Pilot — jacket, scarf, aviators ---- */
  'avatar-pilot': {
    human: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#6B4A2E', trim: '#F0D48A' },
    headwear: () => (
      <>
        {/* leather flight cap */}
        <path d="M-28 -112 q0 -32 28 -32 q28 0 28 32 q0 -6 -4 -8 L24 -128 q-8 -12 -24 -12 q-16 0 -24 12 L-24 -120 q-4 2 -4 8 Z" fill="#4a331f" />
        <path d="M-28 -114 q-8 4 -6 14 q2 8 10 6" fill="#4a331f" />
        <path d="M28 -114 q8 4 6 14 q-2 8 -10 6" fill="#4a331f" />
        {/* aviators over the eyes */}
        <g stroke="#C6D2DC" strokeWidth="2.5" fill="rgba(60,80,95,.75)">
          <ellipse cx="-12" cy="-112" rx="10" ry="9" />
          <ellipse cx="12" cy="-112" rx="10" ry="9" />
          <path d="M-2 -114 L2 -114" />
        </g>
      </>
    ),
    scarf: () => (
      <path d="M-22 -66 q22 10 44 0 q6 14 -4 18 q-18 6 -36 0 q-10 -4 -4 -18 Z" fill="#DDE5EC" opacity=".92" />
    )
  },

  /* ---- Mission Commander — dress cap and insignia ---- */
  'avatar-commander': {
    human: true,
    skin: '#6B4630',
    shade: '#573726',
    suit: { suit: '#1E2A45', trim: '#F5A524' },
    headwear: () => (
      <>
        <path d="M-30 -132 q30 -20 60 0 L30 -128 q-30 -14 -60 0 Z" fill="#0F1830" />
        <path d="M-31 -132 q31 -22 62 0 q2 -26 -31 -26 q-33 0 -31 26 Z" fill="#16223f" />
        <rect x="-31" y="-133" width="62" height="7" rx="3" fill="#0B1120" />
        <path d="M0 -152 l3 6 6 1 -4.5 4.5 1 6.5 -5.5 -3 -5.5 3 1 -6.5 -4.5 -4.5 6 -1 Z" fill="#F5A524" />
      </>
    ),
    insignia: () => (
      <>
        <rect x="-26" y="-46" width="14" height="4" rx="2" fill="#F5A524" />
        <rect x="-26" y="-39" width="14" height="4" rx="2" fill="#F5A524" />
        <rect x="-26" y="-32" width="14" height="4" rx="2" fill="#F5A524" />
      </>
    )
  },

  /* ---- Rover Bot — the one form with its own legs, because it has wheels ---- */
  'avatar-rover': {
    human: false,
    suit: { suit: '#5A6472', trim: '#F5A524' },
    legs: () => (
      <>
        <rect x="-40" y="-6" width="80" height="10" rx="5" fill="#3B4653" />
        {[-28, 0, 28].map((x) => (
          <g key={x}>
            <circle cx={x} cy="14" r="13" fill="#1b2530" stroke="#8FA3B5" strokeWidth="3" />
            <circle cx={x} cy="14" r="4" fill="#8FA3B5" />
          </g>
        ))}
      </>
    ),
    head: () => (
      <>
        {/* mast */}
        <rect x="-4" y="-116" width="8" height="48" fill="#8FA3B5" />
        <rect x="-26" y="-146" width="52" height="34" rx="7" fill="#6d7f91" />
        <rect x="-21" y="-141" width="42" height="24" rx="5" fill="#16222d" />
        {/* camera pair */}
        <circle cx="-10" cy="-129" r="7" fill="#22D3EE" />
        <circle cx="-10" cy="-129" r="3" fill="#0B1120" />
        <circle cx="10" cy="-129" r="7" fill="#22D3EE" />
        <circle cx="10" cy="-129" r="3" fill="#0B1120" />
        {/* dish on the mast */}
        <path d="M26 -140 q14 -6 16 6" stroke="#8FA3B5" strokeWidth="3" fill="none" />
        <ellipse cx="44" cy="-132" rx="7" ry="9" fill="#C6D2DC" transform="rotate(24 44 -132)" />
      </>
    )
  }
};

export const DEFAULT_FORM_ID = 'avatar-cadet';

/** Every avatar id the drawing knows how to render. */
export const DRAWN_AVATAR_IDS = Object.keys(AVATAR_FORMS);

/**
 * The cadet — or the robot, or the rover.
 *
 * `gear` is the equippedGear map (slot -> item id). Every slot is optional; the
 * figure is complete and correct with none of them, which matters because that
 * is how he starts.
 *
 * `avatar` is the equipped avatar id. An unknown id falls back to the cadet
 * rather than drawing nothing — a missing character is a blank screen, and a
 * blank screen is how the last version of this bug hid for seventeen days.
 */
/**
 * `raw` returns the figure as a bare <g> in its own coordinate space instead of
 * a self-contained <svg>. That is what lets him stand in the HQ room: nesting
 * an <svg> inside another one would give him a second coordinate system and a
 * viewport to be clipped by, and he would not scale with the perspective.
 *
 * Feet sit at y ≈ +29 in these coordinates. A caller placing him on a floor
 * translates by -29 to put them on it.
 */
export function CadetAvatar({
  avatar = DEFAULT_FORM_ID,
  gear = {},
  stance = 'stand',
  size = 160,
  className = '',
  raw = false,
  /** Idle motion for the current stance. Off for a still portrait. */
  animate = false,
  /**
   * ==========================================================================
   * WHERE THE SURFACE ACTUALLY IS, IN HIS OWN COORDINATES.
   * ==========================================================================
   *
   * The parent: **"The Avatar arms just moves a little. Its not doing anything
   * with the workstation."**
   *
   * She sent a screenshot, and measuring it against the room maths says she was
   * being generous. At the workstation he stood **82px to the LEFT of the desk
   * centre**, and his hands sat at room y 713 while the desk surface was at 648
   * — **65 pixels below the desk, at hip height, in front of a desk whose top
   * was level with his shoulders.** He was not working at the desk. He was
   * standing near it with his arms twitching.
   *
   * The stance told the arms what SHAPE to make and nothing told them what
   * HEIGHT to make it at, so every station got hands hanging in the same place
   * regardless of what he had walked up to. `reachY` is that missing number:
   * the room computes where the station's working surface really is — after
   * perspective, after the piece has been dragged somewhere new — and converts
   * it into this figure's own coordinate space. The arms are then built to
   * land there.
   *
   * Null for a portrait, and for any stance that is not at a surface.
   */
  reachY = null
}) {
  const form = AVATAR_FORMS[avatar] || AVATAR_FORMS[DEFAULT_FORM_ID];

  // Gear wins over the form's default suit — he chose the uniform and paid for
  // it, so it must survive a change of character.
  const body = BODY[gear.body] || form.suit || BODY.default;
  const gloved = gear.hands === 'av-gloves';

  /**
   * ---- STANCE OUTRANKS POSE, AND ONLY AT A STATION (Aug 25, 2026) ----
   *
   * A pose is a thing he bought — the salute, the liftoff. A stance is what he
   * is doing right now, chosen by the furniture he walked up to. While he is
   * sitting in the flight chair the stance wins, because a salute performed
   * while seated at a console is neither.
   *
   * The moment he stands up, `stance` is back to 'stand' and his pose returns.
   * Nothing he paid for is overwritten for longer than he is at the station.
   */
  const st = STANCES[stance] || null;
  const motion = st?.motion || null;
  const moving = animate && !PREFERS_REDUCED_MOTION;

  /**
   * ---- THE ARMS ARE BUILT TO THE SURFACE, NOT DRAWN AT A GUESS ----
   *
   * A stance that `reaches` supplies the horizontal spread of the two hands;
   * the HEIGHT comes from the room. Clamped so no arithmetic mistake anywhere
   * upstream can put his hands through his own head or below his knees — a
   * clamped figure looks wrong, an unclamped one looks broken.
   */
  const armsFor = () => {
    if (!st?.reaches || !Number.isFinite(reachY)) return st?.arms || ARMS[gear.pose] || ARMS.default;
    const y = Math.max(-104, Math.min(-14, reachY));
    const { lx, rx } = st.reaches;
    return { left: `M-30 -66 L${lx} ${y}`, right: `M30 -66 L${rx} ${y}` };
  };
  const arms = armsFor();
  const floating = !st && gear.pose === 'av-pose-float';

  /**
   * The equipment he is wearing, resolved slot by slot. Drawn with the SAME
   * suit and trim colours the figure is already using, so a helmet belongs to
   * the suit under it rather than being a grey shape parked on his head.
   */
  const paint = { skin: form.skin || '#8FA3B5', shade: form.shade || '#6d7f91', suit: body.suit, trim: body.trim };
  const wearing = (slot) => {
    const id = gear[slot];
    return id && EQUIPMENT_ART[id] ? EQUIPMENT_ART[id] : null;
  };
  const headGear = wearing('head');
  const visorGear = wearing('visor');
  const backGear = wearing('back');
  const feetGear = wearing('feet');
  const beltGear = wearing('belt');
  const carryGear = wearing('carry');
  const skin = form.skin || '#8FA3B5';
  const shade = form.shade || '#6d7f91';
  const showHair = form.human && !form.hideHair;

  const figure = (
    <>
      {/* anything that belongs behind the figure — solar arrays, wings */}
      {form.behind && form.behind()}

      {/* A back-worn pack is drawn BEFORE the torso, so it reads as a pack
          rather than a bib strapped to his chest. */}
      {backGear && backGear(paint)}

      {/* legs — a stance may seat them, and a form may bring its own wheels */}
      {/**
        * A stance that supplies `legParts` gets ONE GROUP PER LEG, so each can
        * swing about its own hip. Same reason the arms and hands were grouped:
        * a rotation applied to a bare `<rect>` sibling cannot carry the boot
        * with it, and the foot would stay behind while the thigh swung away.
        */}
      {st?.legParts ? (
        <>
          <g>
            <Motion spec={motion?.legL} on={moving} />
            {st.legParts.left(body.suit)}
          </g>
          <g>
            <Motion spec={motion?.legR} on={moving} />
            {st.legParts.right(body.suit)}
          </g>
        </>
      ) : st?.legs ? (
        st.legs(body.suit)
      ) : form.legs ? (
        form.legs()
      ) : floating ? (
        <>
          <path d="M-14 0 q-8 20 6 26" stroke={body.suit} strokeWidth="17" strokeLinecap="round" fill="none" />
          <path d="M14 0 q8 20 -6 26" stroke={body.suit} strokeWidth="17" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <rect x="-21" y="-4" width="17" height="30" rx="7" fill={body.suit} />
          <rect x="4" y="-4" width="17" height="30" rx="7" fill={body.suit} />
          <rect x="-25" y="20" width="23" height="9" rx="4" fill="#1b2530" />
          <rect x="2" y="20" width="23" height="9" rx="4" fill="#1b2530" />
        </>
      )}

      {/* torso */}
      <path d="M-30 -70 q30 -12 60 0 L30 -2 L-30 -2 Z" fill={body.suit} />
      <path d="M-30 -52 L30 -52" stroke={body.trim} strokeWidth="3" />
      <circle cx="-16" cy="-40" r="3.5" fill={body.trim} />
      {form.insignia && form.insignia()}

      {/**
        * ARMS AND HANDS SHARE A GROUP, one per side.
        *
        * They used to be four separate elements — two paths, then two circles
        * positioned by parsing the path strings. That is fine for a still
        * figure and impossible to animate: the hand would stay where the maths
        * put it while the arm swung away from it. Grouped, the hand is carried
        * by whatever moves the arm, for free, and so is anything he is holding.
        */}
      {(() => {
        const l = arms.left.split('L')[1].trim().split(' ').map(Number);
        const r = arms.right.split('L')[1].trim().split(' ').map(Number);
        const fill = gloved ? '#DDE5EC' : skin;
        const stroke = gloved ? '#9db6cb' : shade;
        return (
          <>
            <g>
              <Motion spec={motion?.left} on={moving} />
              <path d={arms.left} stroke={body.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
              <circle cx={l[0]} cy={l[1]} r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
            </g>
            <g>
              <Motion spec={motion?.right} on={moving} />
              <path d={arms.right} stroke={body.suit} strokeWidth="14" strokeLinecap="round" fill="none" />
              <circle cx={r[0]} cy={r[1]} r="8" fill={fill} stroke={stroke} strokeWidth="1.5" />
              {/* Whatever he has picked up rides in this group, so it cannot
                  drift away from the hand carrying it. */}
              {/* Drawn AT the hand, not at the figure's origin. The arms are
                  computed from the surface now, so where the hand IS can no
                  longer be written into the prop's own coordinates. */}
              {st?.holds && <g transform={`translate(${r[0]} ${r[1]})`}>{st.holds()}</g>}
            </g>
          </>
        );
      })()}

      {/* Boots go over whatever the legs drew — and only when he is standing,
          because the seated legs put his feet somewhere else entirely. */}
      {feetGear && !st?.legs && feetGear(paint)}
      {beltGear && beltGear(paint)}
      {carryGear && carryGear(paint)}

      {/* a scarf sits on the collar, over the torso, under the head */}
      {form.scarf && form.scarf()}

      {/**
        * EVERYTHING ABOVE THE NECK IN ONE GROUP, so the head can turn.
        *
        * Hair, skull, face, headwear and worn equipment all move together —
        * a head that rotated while its own hair stayed put would be worse than
        * no motion at all. The pivot is the neck at (0, -80), not the origin.
        */}
      <g>
        <Motion spec={motion?.head} on={moving} />
        {showHair && <HairBack style={gear.hair} />}
        {form.human ? <HumanHead skin={skin} shade={shade} /> : form.head()}

      {/*
        Hairline on the skull, then the face ON TOP of it — always, on every
        human form. Headwear (a helmet, a cap) is drawn last because it is the
        outermost layer, and a closed visor is allowed to cover the face: that
        IS the character.
      */}
        {showHair && <HairFront style={gear.hair} />}
        {form.human && <Face expression={gear.expression} eyewear={gear.eyes} />}
        {form.headwear && form.headwear()}

      {/**
        * Equipment worn on the head is the OUTERMOST layer, and the order
        * between these two is the real one: the helmet goes on, then the gold
        * visor comes down over it. Reversing them would draw a visor with a
        * helmet on top of it, which is not a thing.
        */}
        {headGear && headGear(paint)}
        {visorGear && visorGear(paint)}
      </g>
    </>
  );

  if (raw) return <g className={className}>{figure}</g>;

  return (
    <svg
      viewBox="-80 -170 160 190"
      width={size}
      height={(size * 190) / 160}
      className={className}
      role="img"
      aria-label="Your cadet"
    >
      {figure}
    </svg>
  );
}
