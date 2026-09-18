/**
 * =============================================================================
 * THE LEARNER PROFILE — what a family says about their child.
 * =============================================================================
 *
 * ---- THE GAP THIS FILLS (audit finding 5, Sept 15 2026) ----
 *
 * *"No learner profile, and nowhere to put one."*
 *
 * Forty tables, and not one of them could hold a questionnaire answer, a
 * reading level, a career pathway or a parent's priority. The front door
 * promised setup questions that did not exist, and `placement` was a declared
 * content slot nothing read.
 *
 * That is not a missing screen. It is a missing INPUT. The commercial plan
 * (docs/MASTER_PLAN_COMMERCIAL.md) says the engine reads a profile and builds a
 * curriculum from it — so with nowhere to put a profile, the only way to give a
 * child a curriculum was to hand-author a folder and ship a build. One family
 * per deploy.
 *
 * ---- THE RULE IT KEEPS ----
 *
 *     The profile is the ENGINE'S INPUT. It is never curriculum.
 *
 * A child who decides he wants to be a marine biologist instead should be an
 * EDIT HERE that regenerates a curriculum — never a rebuild of a school. So
 * this file holds answers and nothing else: no lessons, no subjects, no
 * schedule, no recommendation. Whatever reads the profile makes those; the
 * profile only remembers what the family said.
 *
 * ---- WHY IT IS STORED BY SECTION AND NOT AS ONE ROW ----
 *
 * Two computers. She fills in what he is interested in on hers; a week later
 * she corrects his reading level on his. One row for the whole profile means
 * the older file wins the lot and one of those edits is gone. One row per
 * SECTION means the merge is per section, and only a section edited on both
 * machines has to pick a winner.
 *
 * It also means a new section can be added without a migration: an absent
 * section is an unanswered section, which is exactly what it is on day one.
 *
 * ---- WHY A WRITE REFUSES OUT LOUD ----
 *
 * Reads here are forgiving in the usual way — a missing profile reads as an
 * empty one, and nothing throws at a rendering screen. WRITES are not, and
 * deliberately so: a parent typed those answers. Quietly dropping a write
 * because a section id had a typo is how an hour of onboarding disappears with
 * nothing on screen to say it did. So a write returns a refusal with a sentence
 * in it, the same shape `planBookSwap` already uses.
 *
 * ---- WHAT IT DOES NOT DO ----
 *
 * It does not infer. A stated reading level is stored as stated; it does not
 * become a grade, and a grade does not become an age. Every inference this
 * platform has ever made about a child from a neighbouring field has been
 * wrong at least once, and a profile that quietly enriches itself is a profile
 * a parent cannot correct.
 */

/**
 * The sections a family answers, in the order they are asked.
 *
 * Ids are stable and are what the database is keyed by. Labels are a starting
 * point for whatever asks the questions; nothing here decides how they look.
 */
/**
 * The sections a family answers, in the order they are asked, and the questions
 * inside each one.
 *
 * ---- WHY THE QUESTIONS LIVE HERE AND NOT ON THE SCREEN ----
 *
 * A question's id is the key its answer is stored under. Put the questions on
 * the screen and the two drift: a field renamed in a form silently orphans
 * every answer already given to it, and nothing fails, because an orphaned
 * answer is indistinguishable from an unanswered question. Declared here, the
 * guard can hold the screen to them.
 *
 * `type` is what the screen should offer, not how it should look:
 *
 *     text    one line
 *     long    a paragraph
 *     choice  exactly one of `options`
 *     multi   any number of `options`
 *
 * Every question is optional. A family part-way through onboarding has a
 * part-filled profile, which is a real state and not an error — and a section
 * is only refused when EVERY box in it was left blank.
 */
export const PROFILE_SECTIONS = Object.freeze([
  Object.freeze({
    id: 'about',
    label: 'About the learner',
    blurb: 'Enough to pitch the work at the right level.',
    questions: Object.freeze([
      Object.freeze({ id: 'age', type: 'text', label: 'How old are they?' }),
      Object.freeze({
        id: 'stage',
        type: 'choice',
        label: 'Where are they in school?',
        options: Object.freeze(['Elementary', 'Middle school', 'High school', 'Between stages'])
      }),
      Object.freeze({
        id: 'history',
        type: 'long',
        label: 'Anything about how school has gone so far?',
        hint: 'Where they have come from, what changed, why you are doing this.'
      })
    ])
  }),
  Object.freeze({
    id: 'academics',
    label: 'Where they are academically',
    blurb: 'What to build on, and what to shore up.',
    questions: Object.freeze([
      Object.freeze({ id: 'strengths', type: 'long', label: 'What are they good at?' }),
      Object.freeze({ id: 'challenges', type: 'long', label: 'What do they find hard?' }),
      Object.freeze({
        id: 'readingLevel',
        type: 'text',
        label: 'Roughly what reading level are they at?',
        hint: 'A grade, a range, or just "about where you would expect".'
      }),
      Object.freeze({
        id: 'assessments',
        type: 'long',
        label: 'Any test or assessment results you want on record?',
        hint: 'Stored as you write them. Nothing is inferred from them.'
      })
    ])
  }),
  Object.freeze({
    id: 'interests',
    label: 'What they are interested in',
    blurb: 'The hook for projects, reading and writing topics.',
    questions: Object.freeze([
      Object.freeze({ id: 'interests', type: 'long', label: 'What are they genuinely interested in?' }),
      Object.freeze({ id: 'hobbies', type: 'long', label: 'What do they do when nobody is asking them to?' }),
      Object.freeze({
        id: 'activities',
        type: 'long',
        label: 'Anything outside the house?',
        hint: 'Clubs, sport, lessons, volunteering, a job.'
      })
    ])
  }),
  Object.freeze({
    id: 'pathway',
    label: 'Where they want to go',
    blurb: 'A direction to point the work in. It is expected to change.',
    questions: Object.freeze([
      Object.freeze({ id: 'goal', type: 'long', label: 'What do they say they want to be or do?' }),
      Object.freeze({ id: 'draw', type: 'long', label: 'What draws them to it?' }),
      Object.freeze({
        id: 'settled',
        type: 'choice',
        label: 'How settled is that?',
        options: Object.freeze([
          'Very settled', 'Fairly settled', 'Changes often', 'Too early to say'
        ]),
        hint: 'Answering "changes often" is not a problem. This is meant to be edited.'
      })
    ])
  }),
  Object.freeze({
    id: 'learning',
    label: 'How they learn best',
    blurb: 'How to shape a day, not what to put in it.',
    questions: Object.freeze([
      Object.freeze({
        id: 'worksBest',
        type: 'multi',
        label: 'What actually works for them?',
        options: Object.freeze([
          'Reading it', 'Watching it', 'Being shown, then doing it', 'Hands-on building',
          'Talking it through', 'Working alone', 'Working alongside someone'
        ])
      }),
      Object.freeze({
        id: 'attention',
        type: 'choice',
        label: 'How long can they work before they need a break?',
        options: Object.freeze([
          '10 to 15 minutes', '20 to 30 minutes', 'About 45 minutes', 'An hour or more', 'It varies a lot'
        ])
      }),
      Object.freeze({ id: 'notes', type: 'long', label: 'Anything else about how they learn?' })
    ])
  }),
  Object.freeze({
    id: 'priorities',
    label: 'What matters most to you',
    blurb: 'Yours, not theirs. This is the one that settles trade-offs.',
    questions: Object.freeze([
      Object.freeze({ id: 'priorities', type: 'long', label: 'What do you most want this year to do for them?' }),
      Object.freeze({ id: 'worries', type: 'long', label: 'What are you most worried about?' }),
      Object.freeze({
        id: 'hoursPerDay',
        type: 'text',
        label: 'Roughly how many hours a day should school take?'
      }),
      Object.freeze({
        id: 'nonNegotiables',
        type: 'long',
        label: 'Anything that has to be in the week, whatever else changes?'
      })
    ])
  })
]);

/** Every question type a section may ask for. A screen handles all of them. */
export const QUESTION_TYPES = Object.freeze(['text', 'long', 'choice', 'multi']);

/** One section, or null. */
export function profileSection(id) {
  return PROFILE_SECTIONS.find((s) => s.id === id) || null;
}

/** The questions in one section, or an empty list. Never throws. */
export function questionsFor(id) {
  return profileSection(id)?.questions || EMPTY_LIST;
}

const EMPTY_LIST = Object.freeze([]);

export const PROFILE_SECTION_IDS = Object.freeze(PROFILE_SECTIONS.map((s) => s.id));

/** Why a write was refused. Every one is a sentence, not a code. */
export const PROFILE_REFUSALS = Object.freeze({
  'unknown-section': 'That is not one of the profile sections, so there is nowhere to keep it.',
  'no-answers': 'There was nothing to save — every answer in that section was left blank.'
});

/** Frozen, and the same object every time, so no caller can write into it. */
const EMPTY = Object.freeze({});

export function isProfileSection(id) {
  return typeof id === 'string' && PROFILE_SECTION_IDS.includes(id);
}

/**
 * Answers, cleaned but never enriched.
 *
 * Strings are trimmed and blank ones dropped, because a form posts empty boxes
 * for questions nobody answered and an empty box is not an answer. Lists drop
 * their blanks the same way. Everything else is stored exactly as given.
 *
 * Nothing here adds a field, renames one, or derives one from another.
 */
export function cleanAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return EMPTY;
  const out = {};
  for (const [key, value] of Object.entries(answers)) {
    if (!key) continue;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) out[key] = trimmed;
    } else if (Array.isArray(value)) {
      const kept = value
        .map((v) => (typeof v === 'string' ? v.trim() : v))
        .filter((v) => v !== '' && v !== null && v !== undefined);
      if (kept.length) out[key] = kept;
    } else if (value !== null && value !== undefined) {
      out[key] = value;
    }
  }
  return out;
}

/**
 * The row to store for one section, or a refusal to show the parent.
 *
 * @returns {{ok: true, record: object} | {ok: false, reason: string, message: string}}
 */
export function sectionRecord(section, answers, now = new Date()) {
  if (!isProfileSection(section)) {
    return { ok: false, reason: 'unknown-section', message: PROFILE_REFUSALS['unknown-section'] };
  }
  const clean = cleanAnswers(answers);
  if (Object.keys(clean).length === 0) {
    return { ok: false, reason: 'no-answers', message: PROFILE_REFUSALS['no-answers'] };
  }
  return {
    ok: true,
    record: { section, answers: clean, updatedAt: new Date(now).toISOString() }
  };
}

/**
 * The stored rows, read as a profile. Never throws.
 *
 * A row for a section this build does not know is dropped rather than kept:
 * an older file from a machine running a newer build would otherwise put a
 * section here that nothing can show, edit or delete.
 */
export function profileFromRows(rows) {
  const out = {};
  if (!Array.isArray(rows)) return out;
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    if (!isProfileSection(row.section)) continue;
    const answers = cleanAnswers(row.answers);
    if (Object.keys(answers).length === 0) continue;
    out[row.section] = {
      section: row.section,
      answers,
      updatedAt: typeof row.updatedAt === 'string' ? row.updatedAt : ''
    };
  }
  return out;
}

/** One section's answers, or an empty object. Never throws, never null. */
export function profileAnswers(profile, section) {
  if (!profile || typeof profile !== 'object') return EMPTY;
  const held = profile[section];
  if (!held || typeof held !== 'object') return EMPTY;
  const answers = held.answers;
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return EMPTY;
  return answers;
}

/** True when this section has been answered at all. */
export function hasProfileSection(profile, section) {
  return Object.keys(profileAnswers(profile, section)).length > 0;
}

/**
 * How far through onboarding a family is.
 *
 * `missing` is in the asking order, so a screen can offer the next unanswered
 * section without deciding an order of its own.
 */
export function profileCompleteness(profile) {
  const answered = PROFILE_SECTION_IDS.filter((id) => hasProfileSection(profile, id));
  const missing = PROFILE_SECTION_IDS.filter((id) => !hasProfileSection(profile, id));
  return {
    answered: answered.length,
    total: PROFILE_SECTION_IDS.length,
    complete: missing.length === 0,
    missing
  };
}

/**
 * Two machines' profiles, merged SECTION BY SECTION.
 *
 * The newer `updatedAt` wins a section, and a section only one side has is
 * kept whole. A section with no timestamp loses to one that has a timestamp
 * and loses to nothing else, so an old row written before this field existed
 * can never silently beat a real edit.
 *
 * Whole-profile replacement is exactly what this avoids: an import that
 * carried "her interests edit" over "his reading-level correction" would lose
 * one of them with nothing on screen to say so.
 */
export function mergeProfiles(mine, incoming) {
  const out = {};
  for (const id of PROFILE_SECTION_IDS) {
    const a = mine?.[id];
    const b = incoming?.[id];
    if (!a && !b) continue;
    if (!a) { out[id] = b; continue; }
    if (!b) { out[id] = a; continue; }
    out[id] = (b.updatedAt || '') > (a.updatedAt || '') ? b : a;
  }
  return out;
}
