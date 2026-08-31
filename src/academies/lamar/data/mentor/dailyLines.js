// ---------------------------------------------------------------------------
// COMMANDER NOVA'S DAILY LINE.
// (Built Aug 9, 2026, at the parent's request for "a motivational quote each
// day" on the Progress screen.)
//
// ---- WHY MOST OF THESE ARE NOVA'S OWN WORDS ----
//
// Misattributed quotes are one of the most common forms of confident nonsense
// on the internet, and a homeschool platform is the last place to add to the
// pile. "Failure is not an option" is the standard example: Gene Kranz never
// said it during Apollo 13 — it was written for the film, and he used it later
// as a book title. A boy who grows up to be an engineer will eventually check,
// and finding that his own app told him something false is a bad way to learn
// scepticism.
//
// So the attributed quotes here are a short list of ones that are genuinely
// well documented, each named. Everything else is Nova speaking as herself,
// which is honest, on-brand, and cannot be wrong about who said it.
//
// ---- WHY THEY ARE ABOUT EFFORT AND METHOD, NOT TALENT ----
//
// Nothing here tells him he is smart or gifted. Praise aimed at ability makes a
// child protect the label by avoiding hard things; praise aimed at method and
// persistence does the opposite. Every line below points at something he can
// actually do tomorrow.
//
// ---- WHY IT IS DATE-SEEDED ----
//
// Same rule as everywhere else in this app: a line that reshuffles on every
// re-render is noise, and this project already lost Nova mid-sentence once when
// a random picker ran inside JSX. One line per day, the same all day.
// ---------------------------------------------------------------------------

/** Genuinely well-documented, and attributed. Kept deliberately short. */
export const QUOTED = [
  {
    text: 'Never be limited by other people’s limited imaginations.',
    who: 'Dr. Mae Jemison, first Black woman in space'
  },
  {
    text: 'Like what you do, and then you will do your best.',
    who: 'Katherine Johnson, NASA mathematician'
  },
  {
    text: 'Education is the key to unlock the golden door of freedom.',
    who: 'George Washington Carver'
  }
];

/** Nova, in her own voice. No attribution needed, and none invented. */
export const NOVA_LINES = [
  'Engineers are not people who never get it wrong. They are people who find out they are wrong early, on purpose.',
  'The hard part of any build is the part nobody sees. Today is usually that part.',
  'You do not have to feel ready. You have to start, and then you get ready.',
  'A small thing finished beats a big thing planned. Every single time.',
  'When something will not work, the answer is almost never to try harder at the same thing. Change one variable.',
  'Nobody remembers a good day of practice. They add up anyway.',
  'The lesson you find hardest is the one doing the most for you right now.',
  'Slow is fine. Stopped is the only real problem.',
  'Read the instructions twice and you will save yourself an hour. I have watched engineers learn this the expensive way.',
  'Ask the question. The five seconds of not knowing is cheaper than the week of guessing.',
  'If you can explain it to somebody else, you know it. If you cannot, you have only met it.',
  'Every system on your ship was built by somebody who was once exactly as new at it as you are.',
  'Being stuck is data. It tells you precisely where the gap is, and that is worth knowing.',
  'Write it down. Your future self is a stranger who will not remember any of this.',
  'The best engineers I know are the ones who check their own work before anybody asks.',
  'Do the thing you are avoiding first. It is almost never as bad as the avoiding.',
  'Progress is boring from the inside. Look at where you were a month ago instead.',
  'Precision is a habit, not a talent. You build it one careful measurement at a time.',
  'A mission is not won on the exciting days. It is won on the ordinary ones, by people who showed up.',
  'You are allowed to be bad at something new. That is what new means.',
  'Curiosity is a skill. The more questions you ask, the more you notice worth asking about.',
  'Fix the cause, not the symptom — otherwise you will meet it again next week wearing a different hat.',
  'Rest is part of the work. Tired people make mistakes that cost more than the break would have.',
  'The goal is not to be finished. The goal is to be further along than you were.'
];

/** FNV-1a — small, stable, and identical on both computers. */
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
 * ritual he learns to skip.
 */
export function getDailyLine(dateStr) {
  const pool = [
    ...NOVA_LINES.map((text) => ({ text, who: null })),
    ...QUOTED
  ];
  const key = String(dateStr || '').slice(0, 10);
  if (!key) return pool[0];
  return pool[hashString(key) % pool.length];
}

export const DAILY_LINE_COUNT = NOVA_LINES.length + QUOTED.length;
