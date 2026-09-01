// ---------------------------------------------------------------------------
// WHERE A PIECE OF EVIDENCE CAME FROM, AND WHETHER IT COUNTS.
//
// ---- THE PROBLEM THIS EXISTS FOR ----
//
// BLUEPRINT_A_LOCAL_FIRST anti-pattern 15: "Diagnostic answers scored into the
// same mastery number as taught practice." And §3.10.6, which is the sentence
// that matters:
//
//   "skillMastery is computed from instruction, practice, review only.
//    A WRONG ANSWER ON UNTAUGHT MATERIAL IS INFORMATION, NOT A GRADE."
//
// The Check-In deliberately asks Azianna things nobody has taught her — that is
// how a placement test finds a ceiling. Nine of those answers were wrong on
// purpose. If they ever land in the same number as a lesson she has actually
// been taught, the app reports a deficit IT CREATED.
//
// Until v3.56 there was no field anywhere in this app saying which was which.
// Every answer row looked the same. The separation existed only in the fact
// that diagnostic answers happened to live in their own table — an accident of
// storage, not a rule, and accidents stop being true the moment somebody adds
// a table.
//
// ---- THE ONE EXTENSION, DECLARED ----
//
// The standard's list is six: instruction · practice · review · diagnostic ·
// benchmark · external. This app has a seventh surface it does not describe —
// the Thursday unit test and the quarter exam, which are SUMMATIVE (§3.10.1)
// and mastery-bearing, and which are none of "instruction", "practice" or
// "review" in any honest reading.
//
// Rather than squeeze them into a word that does not fit, `test` is added and
// said out loud here. §7.2: record a new entry WITH ITS STRUCTURAL FIX, not as
// a quiet edit. §3.2 uses the same instruction for beat types — "extend, never
// replace".
//
// ⚠️ IF GIGI DISAGREES, this is the file to change and the check reads it. The
// alternative reading is that a unit test is `practice` (graded practice,
// threshold-gated to advance) and only the quarter exam is summative. Both are
// defensible. This one is written down, which the other was not.
// ---------------------------------------------------------------------------

/**
 * Every place an answer in this app can come from.
 *
 * `countsTowardMastery` is the §3.10.6 rule, in data, so a check can test it
 * rather than a comment describing it.
 */
export const EVIDENCE_SOURCES = {
  instruction: {
    label: 'In the lesson',
    countsTowardMastery: true,
    note: 'The Quick check at the bottom of a lesson, answered while the teaching is still on screen.'
  },
  practice: {
    label: 'Extra practice',
    countsTowardMastery: true,
    note: 'The practice gate’s extra round, served after more than one miss on the Quick check.'
  },
  review: {
    label: 'Warm-up',
    countsTowardMastery: true,
    note: 'The morning three. Spaced retrieval, days after the lesson — the strongest evidence in the app.'
  },
  test: {
    label: 'Test',
    countsTowardMastery: true,
    note: 'Thursday unit tests and quarter exams. A DECLARED EXTENSION to the standard’s six — see the header.'
  },
  diagnostic: {
    label: 'Check-In',
    countsTowardMastery: false,
    note: 'The placement instrument. It asks her things nobody has taught her, on purpose. A miss here is information, not a grade.'
  },
  benchmark: {
    label: 'Benchmark',
    countsTowardMastery: false,
    note: 'A growth instrument on a fixed form. Nothing in this app is one yet; the word is reserved so it cannot be misused later.'
  },
  external: {
    label: 'Outside this app',
    countsTowardMastery: false,
    note: 'A result a grown-up typed in — Khan, a paper test. Evidence for placement and growth only (§3.10.5).'
  }
};

/** The ids, in the order a person would read them. */
export const EVIDENCE_SOURCE_IDS = Object.keys(EVIDENCE_SOURCES);

/** §3.10.6, derived rather than typed: which sources may move a mastery number. */
export const MASTERY_EVIDENCE = EVIDENCE_SOURCE_IDS.filter(
  (id) => EVIDENCE_SOURCES[id].countsTowardMastery
);

export function isEvidenceSource(id) {
  return Object.prototype.hasOwnProperty.call(EVIDENCE_SOURCES, id);
}

export function countsTowardMastery(id) {
  return !!EVIDENCE_SOURCES[id]?.countsTowardMastery;
}

// ---------------------------------------------------------------------------
// ATTEMPT STATE — anti-pattern 19.
//
//   "An abandoned attempt is not a failed assessment."
//   §3.10.6: "Only attemptState: 'complete' counts as evidence."
//
// This is not hypothetical here. HER OWN BACKUP HOLDS THREE ABANDONED SITTINGS
// — rows with endedAt: null and answered: 0, from Aug 13 and 14. The app opened
// a sitting, she did not answer anything, and the row sat there with no word
// for what it was. Three rows that mean "nothing happened" and look exactly
// like three rows that mean "she sat down and got nothing right".
// ---------------------------------------------------------------------------

export const ATTEMPT_STATES = {
  complete: 'She finished it. This is the only state that counts as evidence.',
  abandoned: 'She opened it and left without finishing. Not a fail — a thing that did not happen.',
  expired: 'It was still open when the day ended, so the app closed it.'
};

export const ATTEMPT_STATE_IDS = Object.keys(ATTEMPT_STATES);

export function isAttemptState(id) {
  return Object.prototype.hasOwnProperty.call(ATTEMPT_STATES, id);
}

/**
 * What a sitting row actually was, worked out from the row itself.
 *
 * Derived rather than stored for rows written before v3.56, so her three
 * existing abandoned sittings get the right word without anybody guessing at
 * them or back-filling a field with a number that was never measured.
 */
export function attemptStateOf(sitting) {
  if (!sitting) return null;
  if (sitting.attemptState) return sitting.attemptState;
  if (sitting.endedAt) return 'complete';
  return (sitting.answered || 0) === 0 ? 'abandoned' : 'expired';
}

export default EVIDENCE_SOURCES;
