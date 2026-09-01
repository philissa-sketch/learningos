/**
 * skillsCatalog.js — Phase 1, FROZEN
 *
 * The skill layer. Skills — not lessons — are what get mastered, reviewed,
 * remediated and reported on (master plan §3.2).
 *
 * Derived Aug 19 2026 from the `words:` lists on the lessons (1,024 entries,
 * 801 unique). Cut Aug 23 2026 from 156 candidates to 20 committed + 3 held.
 *
 * THE CUT RULE — a term is a skill only if all three are true:
 *   1. It recurs across two or more lessons.
 *   2. She can be better or worse at it across different content.
 *      You can master `fair-test`. You cannot master `pollen`.
 *   3. A Georgia standards code does not already say it. The codes cover
 *      117 lessons in the terms Georgia asks in; a skill named `pollination`
 *      beside the code S4L1a is the same claim written twice, and the second
 *      copy has to be maintained by hand forever.
 *
 * IDS ARE FROZEN. Once an id ships it is never renamed — stored mastery rows
 * point at it. To retire a skill, move it to RETIRED with a reason. To rename
 * one, change `displayName` only.
 *
 * WHAT THIS FILE DOES NOT KNOW: it does not verify its own lessonCount values
 * against the lessons on disk. Those numbers came from the Aug 19 derivation
 * and are re-derived, not trusted, in Phase 2. Merged skills carry null.
 */

export const CATALOG_VERSION = 1;
export const FROZEN_ON = '2026-08-23';

export const GROUPS = {
  practice: 'How she works',
  measurement: 'Measurement and geometry',
};

export const STRANDS = ['measurement-data', 'geometry'];

/* ------------------------------------------------------------------ *
 * THE CATALOG — 20 committed skills
 * ------------------------------------------------------------------ */

export const SKILLS = [
  /* --- Group: practice — 11 -------------------------------------- */
  {
    id: 'fair-test',
    displayName: 'Fair test',
    group: 'practice',
    sourceTerms: ['fair test'],
    lessonCount: 4,
    courses: ['herbalism', 'sciencelab', 'humanbody'],
    strand: null,
  },
  {
    id: 'evidence',
    displayName: 'Evidence',
    group: 'practice',
    sourceTerms: ['evidence'],
    lessonCount: 7,
    courses: ['herbalism', 'sciencelab'],
    strand: null,
  },
  {
    id: 'prediction',
    displayName: 'Prediction',
    group: 'practice',
    sourceTerms: ['prediction', 'predict', 'forecast'],
    lessonCount: null,
    countPendingReason:
      'MERGE, count unverified. The three source terms carry 3 + 2 + 4 = 9 ' +
      'lesson slots, but they may sit on the same lessons. The true count is ' +
      'between 4 and 9 and is resolved in Phase 2 by re-deriving from disk. ' +
      'Do not print 9 anywhere until it is.',
    courses: ['herbalism', 'sciencelab'],
    strand: null,
  },
  {
    id: 'controlled-variable',
    displayName: 'Controlled variable',
    group: 'practice',
    sourceTerms: ['variable', 'control group'],
    lessonCount: null,
    countPendingReason:
      'MERGE, count unverified. 2 + 2 = 4 lesson slots, possibly overlapping. ' +
      'Re-derive in Phase 2.',
    courses: ['herbalism'],
    strand: null,
    note:
      'The bare term `control` was NOT merged in. It carries 3 lessons across ' +
      'herbalism and humanbody, and in the Human Body it means nerve control, ' +
      'not experimental control. Merging it would put nerve lessons into a ' +
      'fair-test remediation set. Renamed to `controlled-variable` so the ' +
      'collision cannot be made by accident later.',
  },
  {
    id: 'record',
    displayName: 'Recording what happened',
    group: 'practice',
    sourceTerms: ['record'],
    lessonCount: 5,
    courses: ['herbalism', 'humanbody'],
    strand: null,
  },
  {
    id: 'observation',
    displayName: 'Observation',
    group: 'practice',
    sourceTerms: ['observation'],
    lessonCount: 3,
    courses: ['herbalism'],
    strand: null,
  },
  {
    id: 'data',
    displayName: 'Data',
    group: 'practice',
    sourceTerms: ['data'],
    lessonCount: 3,
    courses: ['herbalism'],
    strand: null,
  },
  {
    id: 'pattern',
    displayName: 'Pattern',
    group: 'practice',
    sourceTerms: ['pattern'],
    lessonCount: 4,
    courses: ['herbalism'],
    strand: null,
  },
  {
    id: 'sample-size',
    displayName: 'Sample size',
    group: 'practice',
    sourceTerms: ['sample size'],
    lessonCount: 2,
    courses: ['herbalism'],
    strand: null,
  },
  {
    id: 'method',
    displayName: 'Method',
    group: 'practice',
    sourceTerms: ['method'],
    lessonCount: 2,
    courses: ['herbalism'],
    strand: null,
  },
  {
    id: 'claim',
    displayName: 'Claim',
    group: 'practice',
    sourceTerms: ['claim'],
    lessonCount: 2,
    courses: ['herbalism'],
    strand: null,
  },

  /* --- Group: measurement — 9 ------------------------------------ */
  {
    id: 'millilitre',
    displayName: 'Millilitres',
    group: 'measurement',
    sourceTerms: ['millilitre'],
    lessonCount: 4,
    courses: ['herbalism', 'humanbody'],
    strand: 'measurement-data',
  },
  {
    id: 'millimetre',
    displayName: 'Millimetres',
    group: 'measurement',
    sourceTerms: ['millimetre'],
    lessonCount: 2,
    courses: ['humanbody'],
    strand: 'measurement-data',
  },
  {
    id: 'measure',
    displayName: 'Measuring',
    group: 'measurement',
    sourceTerms: ['measure'],
    lessonCount: 2,
    courses: ['herbalism', 'humanbody'],
    strand: 'measurement-data',
  },
  {
    id: 'average',
    displayName: 'Average',
    group: 'measurement',
    sourceTerms: ['average'],
    lessonCount: 4,
    courses: ['herbalism'],
    strand: 'measurement-data',
  },
  {
    id: 'temperature',
    displayName: 'Temperature',
    group: 'measurement',
    sourceTerms: ['temperature'],
    lessonCount: 2,
    courses: ['herbalism'],
    strand: 'measurement-data',
  },
  {
    id: 'distance',
    displayName: 'Distance',
    group: 'measurement',
    sourceTerms: ['distance'],
    lessonCount: 4,
    courses: ['sciencelab'],
    strand: 'measurement-data',
  },
  {
    id: 'graph',
    displayName: 'Reading a graph',
    group: 'measurement',
    sourceTerms: ['graph'],
    lessonCount: 2,
    courses: ['herbalism', 'humanbody'],
    strand: 'measurement-data',
    note:
      'Promoted out of the cross-course vocabulary section. Reading a graph ' +
      'is Measurement & Data, and it is one of the few terms here that Khan ' +
      'also drills in the unit she is assigned.',
  },
  {
    id: 'weight',
    displayName: 'Mass and weight',
    group: 'measurement',
    sourceTerms: ['weight'],
    lessonCount: 3,
    courses: ['sciencelab'],
    strand: 'measurement-data',
    note:
      'CARRIED FORWARD UNCHANGED from the Aug 19 derivation, so it does not ' +
      'have to be worked out again. All three carrying lessons are Science ' +
      'Lab gravity lessons — sl-m2-01 "The pull that never switches off", ' +
      'sl-m2-04 "Heavy is not the same as how much stuff", sl-m2-05 "What ' +
      'she would weigh on the moon". ZERO Human Body lessons carry it. The ' +
      'term is clean in that context. The check banning weight language ' +
      'attached to a PERSON (check-assessment, since v3.53; banned outright ' +
      'in Human Body Module 14) keeps applying, unchanged, and this entry ' +
      'is not an exemption from it.',
  },
  {
    id: 'angle',
    displayName: 'Angle',
    group: 'measurement',
    sourceTerms: ['angle'],
    lessonCount: 2,
    courses: ['sciencelab'],
    strand: 'geometry',
    note:
      'THE ONLY SKILL IN THE CATALOG BRIDGING TO GEOMETRY. 2 lessons, 20 ' +
      'questions. A geometry-targeted game set built on this catalog has ' +
      'one skill and 20 items behind it. See PHASE_4_SCOPE below.',
  },
];

/* ------------------------------------------------------------------ *
 * HELD — 3 terms excluded pending Gigi's check
 *
 * These are NOT in the catalog. Each was tagged as a measurement skill in the
 * derivation, and each may be a homonym of something that is not measurement
 * at all. They are held rather than guessed in, because this group is what
 * Phase 4 aims score-targeted games with: if `volume` means loudness and a
 * Measurement & Data set is built on it, the set is aimed at the wrong child.
 *
 * The check for each is the one already run on `weight`: list the carrying
 * lessons, read the titles.
 * ------------------------------------------------------------------ */

export const EXCLUDED_PENDING = [
  {
    term: 'balance',
    proposedId: 'balance',
    assumedMeaning: 'a balance scale — measurement',
    risk:
      'Carries a SOCIAL STUDIES lesson. Social Studies has no balance scale ' +
      'in it; SS4CG is checks-and-balances territory. If the social lesson ' +
      'is balance-of-power, the term is two different skills wearing one name.',
    checkToRun:
      'List the 4 carrying lessons. Read the social one. If it is ' +
      'balance-of-power, either drop the term or split it into ' +
      '`balance-scale` and leave the social sense untagged.',
  },
  {
    term: 'volume',
    proposedId: 'volume',
    assumedMeaning: 'millilitres — measurement',
    risk:
      'The Herbalism sense is almost certainly millilitres and fine. The ' +
      'Human Body one is unverified, and the Human Body carries `sound`, ' +
      '`pitch` and `vibration` — where volume means loudness.',
    checkToRun:
      'Read the Human Body carrying lesson. If it is loudness, keep the ' +
      'Herbalism sense only and record the count as 1 — which then fails ' +
      'the recurs-twice rule and drops the term entirely.',
  },
  {
    term: 'shape',
    proposedId: 'shape',
    assumedMeaning: 'geometry',
    risk:
      'Both carriers are Science Lab, which is the moon-and-orbit course. ' +
      'Moon shape is phases, not geometry. If this is phases, geometry ' +
      'loses a skill it cannot spare — see PHASE_4_SCOPE.',
    checkToRun: 'Read both Science Lab carrying lessons.',
  },
];

/* ------------------------------------------------------------------ *
 * RETIRED — cut with the reason, so it is not re-proposed in six months
 * ------------------------------------------------------------------ */

export const RETIRED = [
  {
    term: 'scale',
    reason:
      'DECIDED, NOT HELD — evidenced against the Science Lab Q3 blueprint. ' +
      'Science Lab uses `scale` to mean SCALE MODEL, not a measuring scale: ' +
      'lesson 40 "A model where the DISTANCES are right" (video: Toilet ' +
      'Paper Scale) and lesson 41 "Why no model can do both at once" (video: ' +
      'To Scale: THE SOLAR SYSTEM). It was tagged as a measurement skill in ' +
      'the derivation. It is not one.',
  },
  {
    term: 'control',
    reason:
      'Collides with nerve control in the Human Body. The experimental sense ' +
      'is carried by `controlled-variable`.',
  },
  {
    term: 'model',
    reason:
      'A real idea — Science Lab lesson 41 is entirely about a model\'s ' +
      'limits — but 2 lessons in 1 course, which is the reach of a single ' +
      'standards code (S4E1d, 5 lessons). Cut under rule 3. THE STRONGEST ' +
      'CANDIDATE FOR REINSTATEMENT if Gigi disagrees.',
  },
  {
    term: 'result',
    reason: 'A noun inside `fair-test`, not a skill beside it.',
  },
  {
    term: 'compare',
    reason: 'Too vague to remediate against. 2 lessons, 1 course.',
  },
  {
    term: '__section_b_content_nouns__',
    reason:
      'Roughly 88 terms cut under rule 3 — pollen, siege, rhizome, orbit, ' +
      'petal, treaty, star, moon, planet and the rest. A Georgia standards ' +
      'code already says each of these, in the terms a report to Georgia ' +
      'asks in.',
  },
  {
    term: '__section_a_cross_course_nouns__',
    reason:
      'Roughly 40 terms cut under rule 2 — root, air, light, nerve, vein, ' +
      'heart, spine, bacteria, solid, gas, pull, wave, sound, signal, gap, ' +
      'barrier, route, branch, divide, pair. Appearing in two courses makes ' +
      'a word COMMON, not masterable. Herbalism and the Human Body both say ' +
      '`root` because plants and teeth both have them — that is a ' +
      'coincidence of English, and one tag over three meanings produces a ' +
      'remediation set that mixes all three.',
  },
];

/* ------------------------------------------------------------------ *
 * PHASE 4 SCOPE — what the measurement bridge can and cannot promise
 *
 * Recorded here, in the data layer, because it is easy to read "9 measurement
 * skills, 250 questions" and believe a score-targeted game will aim at her
 * weak strands. It will aim at part of one of them.
 *
 * Her Aug 13 Check-In named the holes precisely:
 *
 *   Units of measurement      0 of 3   ← covered: millilitre, millimetre,
 *                                        measure, temperature
 *   Perimeter                 0 of 3   ← NO SKILL
 *   Area                      0 of 2   ← NO SKILL
 *   Telling time              1 of 3   ← NO SKILL
 *   Elapsed time              0 of 1   ← NO SKILL
 *   Naming shapes and sides   2 of 3 ✓ (already fine)
 *
 * Four of her five actual blanks have no skill to hang a game on, because no
 * lesson in the app teaches them. This is the same shape as the Grammar 2.20
 * / Writing 2.70 warning: tagging cannot manufacture content that was never
 * written. Perimeter, area and time questions still have to be authored.
 *
 * Not a reason to stop. A reason not to promise it.
 * ------------------------------------------------------------------ */

export const PHASE_4_SCOPE = {
  'measurement-data': {
    covered: ['units of measurement'],
    notCovered: ['perimeter', 'area', 'telling time', 'elapsed time'],
  },
  geometry: {
    covered: ['angle'],
    notCovered: ['perimeter', 'area'],
    warning:
      'One skill, 2 lessons, 20 questions. If `shape` also fails its check, ' +
      'this is the entire geometry bridge.',
  },
};

export const SKILL_IDS = SKILLS.map((s) => s.id);

export function getSkill(id) {
  return SKILLS.find((s) => s.id === id) || null;
}

export function skillsForStrand(strand) {
  return SKILLS.filter((s) => s.strand === strand);
}

/** Maps a lesson `words:` entry to its skill id, or null if the word is not a skill. */
export function skillForTerm(term) {
  const t = String(term).trim().toLowerCase();
  const hit = SKILLS.find((s) => s.sourceTerms.includes(t));
  return hit ? hit.id : null;
}
