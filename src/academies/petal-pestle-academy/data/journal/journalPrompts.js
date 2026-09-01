// ---------------------------------------------------------------------------
// THE HERBALIST'S JOURNAL — what it asks her.
//
// This is where her actual writing happens. Khan Academy teaches grammar and
// mechanics; nothing on Khan asks a nine-year-old to write a paragraph about
// something she saw with her own eyes, and that is the part that makes a writer.
//
// ---- HOW THESE PROMPTS ARE WRITTEN, AND WHY IT MATTERS ----
//
// Every prompt below points at something she can OBSERVE, not something she has
// to invent. "Write about a time you felt brave" is a creative-writing prompt
// aimed at a feeling, and a child who cannot think of one just sits there. "Pick
// one leaf. Draw its edge. Is it smooth, toothed, or lobed?" has an answer in
// the garden, and she can go and get it.
//
// That is not a stylistic preference — it is the whole reason this is a
// herbalist's journal rather than a diary. A field journal is a real scientific
// instrument, keeping one is a real skill in her chosen field, and the writing
// comes free because she has something to say.
//
// The prompts also spiral: the same plant, the same pot, the same patch of
// ground, revisited weeks apart. Noticing that a thing has changed is the
// single most transferable skill in the whole app.
//
// ---- THE SAFETY LINE, IN THE PROMPTS THEMSELVES ----
//
// No prompt anywhere asks her what a plant is FOR, what it treats, or what to
// take. Identification, observation, growing, history, and how claims get
// tested. That rule is enforced by an automated check across the whole app, and
// it is respected here at the source rather than caught later.
// ---------------------------------------------------------------------------

/**
 * kind:
 *   'notice'   — what I noticed today (the everyday entry)
 *   'plant'    — a structured plant observation
 *   'pressed'  — the pressed-flower log
 *   'write'    — a longer piece of writing
 */
export const JOURNAL_KINDS = [
  {
    id: 'notice',
    label: 'What I noticed',
    icon: '👀',
    blurb: 'Anything you saw today. Two sentences is a real entry.',
    minWords: 8
  },
  {
    id: 'plant',
    label: 'A plant I looked at',
    icon: '🌿',
    blurb: 'Look closely at one plant and write down what is actually there.',
    minWords: 12
  },
  {
    id: 'pressed',
    label: 'Pressed flower log',
    icon: '🌼',
    blurb: 'Something you picked and pressed — where it came from, and when.',
    minWords: 8
  },
  {
    id: 'write',
    label: 'A longer piece',
    icon: '✍️',
    blurb: 'A whole paragraph or more. Take your time.',
    minWords: 40
  }
];

export const PROMPTS = {
  notice: [
    'What was the weather doing today? Write it the way a scientist would — not “nice”, but what you actually saw.',
    'Name one thing outside that was different from yesterday.',
    'What was the first living thing you saw today that was not a person?',
    'Something in the garden is growing. Something else is not. Which is which?',
    'What did you hear outside today with your eyes closed for ten seconds?',
    'Find something small enough to hold. Describe it so well that someone could pick it out of a pile.',
    'What is the tallest plant you can see from where you are sitting?',
    'Did anything smell like something today? What, and like what?',
    'What is one question you had today that nobody answered?',
    'Write down one thing you got wrong today and what you now think instead.',
    'Which plant near you would survive if nobody watered it for a week? Why do you think so?',
    'What colour is the sky right at the edge, where it meets the ground?'
  ],
  plant: [
    'Pick one leaf. Is the edge smooth, toothed, or lobed? Draw the edge in words.',
    'Look at where the leaves join the stem. Are they opposite each other, or do they take turns?',
    'How many petals? Count them. Do all the flowers on the plant have the same number?',
    'Is the stem round or square when you roll it between your fingers?',
    'Look underneath a leaf. Is it the same colour as the top? Is it hairy?',
    'What is this plant doing right now — growing, flowering, seeding, or resting?',
    'Find two plants that look alike. Write down one thing that tells them apart.',
    'Where is this plant growing — full sun, half shade, deep shade? How can you tell?',
    'Is anything else living on this plant? Insects, spots, holes, webs?',
    'Measure it. How tall, and what did you measure with?',
    'If you came back in two weeks, what do you predict will have changed?',
    'Draw it in words for someone who has never seen one: shape, height, colour, smell.'
  ],
  pressed: [
    'What did you press, and exactly where did it come from?',
    'What date did you pick it? What was the weather that day?',
    'Was the plant growing wild or did somebody plant it?',
    'What colour was it when you picked it? Come back in a month and write what colour it is then.',
    'Was it flowering, seeding, or just leaves?',
    'Who was with you when you found it?'
  ],
  write: [
    'Explain to somebody younger than you how a seed turns into a plant.',
    'Write about a plant you would like to grow and why that one.',
    'A doctor and a herbalist both want to help someone feel better. Write about how their work is alike and how it is different.',
    'Somebody says a plant can cure something. What questions should you ask before you believe them?',
    'Write the story of your garden from the garden’s point of view.',
    'Describe the smell of a herb to someone who has never smelled anything like it.',
    'What do you want to be able to do by the end of this year that you cannot do now?',
    'Write a set of instructions for drying a herb so clearly that someone could follow it without asking you anything.',
    'Willow bark was used for pain long before anyone knew why it worked. Write about what “knowing why” adds.',
    'Write about a day in the life of a doctor who also grows her own plants.',
    'What is the difference between something being natural and something being safe?',
    'Write about the best thing that grew this year and what you did to help it.'
  ]
};

/**
 * A prompt for the day, chosen so it does not change every render.
 *
 * Deterministic on (kind, dayKey, nudge): the same day gives the same prompt, so
 * she can close the app and come back to what she was answering. `nudge` lets
 * the "give me another" button move forward without randomness — the same button
 * pressed the same number of times on the same day always lands in the same
 * place, which makes it testable.
 */
export function promptFor(kind, dayKey, nudge = 0) {
  const list = PROMPTS[kind] || PROMPTS.notice;
  const key = String(dayKey || '');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return list[(hash + Math.max(0, nudge)) % list.length];
}

export function kindMeta(kind) {
  return JOURNAL_KINDS.find((k) => k.id === kind) || JOURNAL_KINDS[0];
}

/** Words, counted the way a child would count them. Used for the "this is a
 *  real entry now" threshold, never to grade her. */
export function wordCount(text) {
  return String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * WHICH KIND OF ENTRY SHE WRITES TODAY — ASSIGNED, NOT CHOSEN. Added v3.68.
 *
 * Gigi, Aug 19 2026: "I also don't want her to have a choice on what to
 * journal."
 *
 * The day decides. DERIVED from the weekday and the length of JOURNAL_KINDS,
 * never a hand-typed table — add a fifth kind tomorrow and the rotation widens
 * to five with no edit here. Rule 20.
 *
 * ---- WHY THE WEEKDAY AND NOT HER ENTRY COUNT ----
 *
 * A rotation driven by how many entries she has written moves only when she
 * writes, so a missed Tuesday shifts every following day. Keyed to the weekday,
 * Wednesday is always the same kind of writing whether or not she wrote on
 * Tuesday — which is what makes it a routine rather than a queue.
 *
 * ---- WHAT SHE STILL CHOOSES ----
 *
 * "Give me another" still moves through the PROMPTS within the assigned kind.
 * She cannot pick the kind; she can be handed a different question of that
 * kind, because a prompt she cannot get a purchase on is a blank page with
 * extra steps. §3.7 asks for real choices and anti-pattern 28 warns against a
 * learner with none — this is the one that survives, deliberately.
 */
export function assignedKindFor(dayKey) {
  const d = new Date(`${dayKey}T12:00:00`);
  const dow = Number.isNaN(d.getTime()) ? 0 : d.getDay();
  return JOURNAL_KINDS[dow % JOURNAL_KINDS.length].id;
}
