// ---------------------------------------------------------------------------
// Shared plumbing for building diagnostic items.
//
// NO Math.random ANYWHERE IN THIS APP'S CONTENT. Every generated question is a
// pure function of (template, seed). That is not fussiness — it means the exact
// paper she sat can be reproduced from the stored item id when a parent asks
// "what was question 7?", and it means a bug in a generated question is
// reproducible instead of a ghost.
// ---------------------------------------------------------------------------

/** Tiny deterministic PRNG (Lehmer / MINSTD). Seeded so seed 0 is not a dead
 *  stream, which the textbook version is. */
export function rng(seed) {
  let s = ((seed + 1) * 48271) % 2147483647;
  return () => {
    s = (s * 48271) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function int(r, min, max) {
  return min + Math.floor(r() * (max - min + 1));
}

export function pick(r, arr) {
  return arr[Math.floor(r() * arr.length)];
}

/**
 * Turn one correct answer plus a set of WRONG answers that each have a named
 * cause into a multiple-choice question.
 *
 * The `why` string on each distractor is the whole point. Mission Control's
 * parent asked for this explicitly: when he gets something wrong it must say
 * why THAT answer was wrong, not print the same explanation regardless of the
 * mistake. A distractor without a `why` is a distractor nobody thought about,
 * so this throws rather than shipping one.
 */
export function choiceSet(r, correct, distractors) {
  const seen = new Set([String(correct)]);
  const entries = [{ v: correct, why: null }];
  for (const d of distractors) {
    const key = String(d.v);
    if (seen.has(key)) continue; // a distractor that collided with the answer
    if (!d.why) throw new Error(`Distractor "${key}" has no wrong-answer feedback`);
    seen.add(key);
    entries.push(d);
  }
  // Deterministic Fisher-Yates so the correct answer is not always in slot A.
  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }
  return {
    choices: entries.map((e) => String(e.v)),
    answer: entries.findIndex((e) => e.why === null),
    choiceFeedback: entries.map((e) => e.why)
  };
}

/** Herbs used as flavour across every generated question. All common, all
 *  well-known, none of them anything a child could be hurt by reading about.
 *  Names only here — the real information lives in data/herbs/herbLibrary.js
 *  with its safety line attached. */
export const HERBS = [
  'chamomile',
  'lavender',
  'peppermint',
  'calendula',
  'lemon balm',
  'rosemary',
  'thyme',
  'elderberry',
  'ginger',
  'dandelion',
  'nettle',
  'sage',
  'yarrow',
  'plantain',
  'mullein',
  'rose hips',
  'holy basil',
  'red clover',
  'hibiscus',
  'fennel'
];

export const HERB_PLURALS = {
  chamomile: 'chamomile flowers',
  lavender: 'lavender buds',
  peppermint: 'peppermint leaves',
  calendula: 'calendula petals',
  'lemon balm': 'lemon balm leaves',
  rosemary: 'rosemary sprigs',
  thyme: 'thyme sprigs',
  elderberry: 'elderberries',
  ginger: 'ginger slices',
  dandelion: 'dandelion greens',
  nettle: 'nettle leaves',
  sage: 'sage leaves',
  yarrow: 'yarrow flowers',
  plantain: 'plantain leaves',
  mullein: 'mullein leaves',
  'rose hips': 'rose hips',
  'holy basil': 'holy basil leaves',
  'red clover': 'red clover blossoms',
  hibiscus: 'hibiscus petals',
  fennel: 'fennel seeds'
};

export function herbPlural(name) {
  return HERB_PLURALS[name] || `${name} leaves`;
}

/** Capitalise the first letter without touching the rest. */
export function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Materialise a list of templates into real items.
 *
 * VARIANTS_PER_TEMPLATE is why the generated strands never run dry: seven
 * templates become twenty-one distinct items, so an eight-question strand can
 * be re-sat twice before anything repeats.
 */
export const VARIANTS_PER_TEMPLATE = 3;

export function materialise(templates, strandId) {
  const out = [];
  for (const t of templates) {
    for (let seed = 0; seed < VARIANTS_PER_TEMPLATE; seed++) {
      const body = t.make(rng(`${t.id}-${seed}`.length + seed * 7 + t.id.charCodeAt(t.id.length - 1)));
      out.push({
        id: `${t.id}-v${seed}`,
        templateId: t.id,
        strand: strandId,
        level: t.level,
        type: 'choice',
        ...body
      });
    }
  }
  return out;
}
