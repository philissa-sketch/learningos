// ---------------------------------------------------------------------------
// DR. MARIGOLD'S DAILY LINE.
//
// ---- WHY MOST OF THESE ARE HER OWN WORDS ----
//
// Misattributed quotes are one of the most common forms of confident nonsense
// on the internet, and a homeschool app is the last place to add to the pile.
// The attributed lines below are a short list of ones that are genuinely well
// documented, each named. Everything else is Dr. Marigold speaking as herself,
// which is honest, on-brand, and cannot be wrong about who said it.
//
// ---- WHY THEY ARE ABOUT EFFORT AND METHOD, NOT TALENT ----
//
// Nothing here tells her she is smart or gifted. Praise aimed at ABILITY makes a
// child protect the label by avoiding hard things — which is the exact behaviour
// that would wreck a diagnostic. Praise aimed at method and persistence does the
// opposite. Every line points at something she can actually do tomorrow.
//
// ---- WHY IT IS DATE-SEEDED ----
//
// One line per day, the same all day. A line that reshuffles on every re-render
// is noise, and this app has a standing rule against Math.random in content.
// ---------------------------------------------------------------------------

/** Genuinely well documented, and attributed. Deliberately short. */
export const QUOTED = [
  {
    text: 'I was taught that the way of progress was neither swift nor easy.',
    who: 'Marie Curie'
  },
  {
    text: 'Never be limited by other people’s limited imaginations.',
    who: 'Dr. Mae Jemison, physician and astronaut'
  },
  {
    text: 'Nothing in life is to be feared, it is only to be understood.',
    who: 'Marie Curie'
  },
  {
    text: 'Education is the key to unlock the golden door of freedom.',
    who: 'George Washington Carver, botanist'
  }
];

/** Dr. Marigold, in her own voice. No attribution needed, and none invented. */
export const MARIGOLD_LINES = [
  'A doctor and a gardener do the same thing, really. Both of them notice something small before it becomes something big.',
  'You do not have to know the answer. You have to know how to go and find it.',
  'Every plant in my cabinet was once a plant somebody did not recognise.',
  'Getting it wrong today is how you get it right in November. That is not a consolation — it is the actual mechanism.',
  'Write down what you observe before you decide what it means. Those are two different jobs and they should not share a pen.',
  'Slow is fine. Stopped is the only real problem.',
  'The question you are embarrassed to ask is usually the one half the room needs answered.',
  'A remedy that works for one person and not another is not a mystery. It is a reason to keep looking.',
  'Nobody remembers an ordinary day of practice. They add up anyway.',
  'If you can explain it to somebody else, you know it. If you cannot, you have only met it.',
  'Look at the whole plant. Leaf, stem, root, where it grows, what time of year. One clue is never enough.',
  'The subject you find hardest is the one doing the most for you right now.',
  'Careful is a habit, not a talent. You build it one measurement at a time.',
  'Curiosity is a skill. Ask more questions and you start noticing more things worth asking about.',
  'Being stuck tells you exactly where the gap is. That is worth knowing and it costs you nothing.',
  'Read it twice. Half an hour of confusion has been saved by fifteen seconds of rereading more times than I can count.',
  'You are allowed to be new at something. That is what new means.',
  'Rest is part of the work. Tired people make mistakes that cost more than the break would have.',
  'Progress is invisible from the inside. Look at where you were a month ago instead.',
  'Fix the cause, not the symptom, or you will meet it again next week wearing a different hat.',
  'Do the thing you are avoiding first. It is almost never as bad as the avoiding was.',
  'The best scientists I know are the ones who check their own work before anybody asks them to.',
  'Every plant on my shelf was named by somebody who was once exactly as new at this as you are.',
  'Ask what the evidence is. Then ask who gathered it, and how. Both questions are polite.',
  'The goal is not to be finished. The goal is to be further along than you were.'
];

/** FNV-1a — small, stable, and identical on every computer. */
function hashString(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * The line for one date. Same day in, same line out, forever.
 *
 * Attributed quotes are mixed into the same pool rather than given their own
 * slot, so they land as an occasional change of voice instead of a weekly
 * ritual she learns to skip.
 */
export function getDailyLine(dateStr) {
  const pool = [...MARIGOLD_LINES.map((text) => ({ text, who: null })), ...QUOTED];
  const key = String(dateStr || '').slice(0, 10);
  if (!key) return pool[0];
  return pool[hashString(key) % pool.length];
}

export const DAILY_LINE_COUNT = MARIGOLD_LINES.length + QUOTED.length;
