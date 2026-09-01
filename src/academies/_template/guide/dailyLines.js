// ---------------------------------------------------------------------------
// THE GUIDE'S DAILY LINE — the neutral set every Academy inherits.
//
// ---- WHY THIS EXISTS BEFORE ANYONE HAS WRITTEN A CUSTOM ONE ----
//
// Spec §3b: "A new Academy must have a guide who doesn't repeat, before anyone
// writes a custom line for it." A guide with three lines is a screensaver —
// date-seeded selection means the same line every third day, and over 180
// school days a child reads each one sixty times.
//
// An Academy created at the front door on a Tuesday evening has no lines of its
// own and will not have any for weeks. These are what it speaks with until then.
//
// ---- THE RULES THESE HAD TO PASS (§3b) ----
//
//   · Never praise ability. Every line points at method or effort — something
//     the learner can actually do tomorrow. Nothing here calls anyone clever,
//     gifted or a natural, because praise aimed at ability makes a child
//     protect the label by avoiding hard things.
//   · Never tell a learner their level.
//   · No learner in mind. Written for a band, not for anyone who exists — no
//     name, no age, no reading level.
//   · No subject, career or world. Those are flavor and belong in an Academy's
//     own folder. Nothing here mentions a rocket, a garden, or a lab.
//   · Plain language. A line that reads easily works at every level; a
//     complicated one does not.
//   · Date-seeded, never Math.random() — a random pick re-rolls on every React
//     render and rewrites the line mid-screen. That was a real bug once.
//
// ---- WHY NO ATTRIBUTED QUOTES ----
//
// Misattributed quotes are among the most common forms of confident nonsense
// online, and a homeschool platform is the last place to add to the pile. An
// Academy's own folder may add attributed lines it has actually checked. The
// shared set says nothing it would have to defend.
// ---------------------------------------------------------------------------

/**
 * The neutral pool.
 *
 * Thirty-one lines: enough that a date-seeded pick does not visibly cycle
 * within a term. §3b's target for a complete set is higher, and an Academy adds
 * its own on top — but this is already past the point where a child notices
 * repetition, which is what makes it safe to ship and grow.
 */
export const TEMPLATE_DAILY_LINES = [
  'Start with the thing you are avoiding. The rest of the day gets easier.',
  'You do not have to feel ready. You have to start.',
  'Slow and finished beats fast and abandoned.',
  'If you are stuck, say out loud what you are trying to do. It usually helps.',
  'Hard is not the same as wrong. Hard usually means new.',
  'The work you do when nobody is watching is the work that counts.',
  'Getting it wrong on purpose, to see what happens, is a real method.',
  'Read the question twice. Most mistakes are made before the thinking starts.',
  'A short session you actually finish is worth more than a long one you dread.',
  'When it stops making sense, go back one step, not ten.',
  'Write down what you tried. Future you will want to know.',
  'You are allowed to need a break. Take it on purpose, not by drifting.',
  'Ask the question. Sitting confused is the expensive option.',
  'Neat notes are not the point. Notes you can use are the point.',
  'If it worked, work out why. That is the part that transfers.',
  'One more attempt is usually the cheapest thing you can try.',
  'Check your own answer before you check the book.',
  'Finish the sentence you are on before you stop. It makes coming back easier.',
  'Being confused is what learning feels like from the inside.',
  'Do the boring first bit. It is short and it unlocks the rest.',
  'You cannot revise what you did not write down.',
  'Small and daily beats big and occasional.',
  'If you have read it three times and it is still fog, the problem is the text, not you.',
  'Explain it to someone. The gaps show up immediately.',
  'Guessing is fine. Guessing and then checking is better.',
  'Tidy the desk, then start. Two minutes, not twenty.',
  'The second attempt is almost always faster than the first.',
  'Do not save the hard question for when you are tired.',
  'Progress you cannot see today is still progress.',
  'Stop at a good place, not at a hard one. Tomorrow will thank you.',
  'Come back to it. That is a strategy, not a surrender.'
];

/**
 * A stable number from a string.
 *
 * The same date must give the same line all day, on every machine, without
 * storing anything. Deterministic hashing is what makes that true.
 */
function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/**
 * The line for a given day.
 *
 * Shape matches what the school reads: `{ text, who }`. `who` is null because
 * nothing here is attributed — an Academy that adds checked quotes fills it.
 */
export function getDailyLine(dateStr) {
  const key = String(dateStr || '').slice(0, 10);
  const pool = TEMPLATE_DAILY_LINES.map((text) => ({ text, who: null }));
  if (!key) return pool[0];
  return pool[hashString(key) % pool.length];
}

export const DAILY_LINE_COUNT = TEMPLATE_DAILY_LINES.length;
