// ---------------------------------------------------------------------------
// LANGUAGE ARTS SEQUENCE GUARD. Run: node scripts/verify-ela-sequence.mjs
//
// ---- WHY THIS EXISTS ----
//
// The parent, Aug 9 2026: "language arts isnt starting at the beginning of the
// units. it is starting at unit 3 instead of unit 1."
//
// She was right. Q1 Language Arts is Khan Academy's general Grammar course,
// ten units, chosen from the IXL diagnostic because Grammar & Mechanics is his
// weakest strand. The app had all ten — nine seeded together and numbered 1-9,
// and the tenth (Khan's UNIT 2, `parts-of-speech-the-verb`) seeded separately
// and much earlier under the name IXL gave it, then appended at slot 10.
//
// So the quarter ran unit 1 -> unit 3 -> unit 4, with the verb arriving after
// syntax and usage-and-style, both of which assume it.
//
// Nothing caught it, and nothing could have: the order was set in THREE
// different maps in useAppStore (`q1RestructureMap`, `elaSequenceMap`,
// `elaPlacementMap`), each overriding the last, and none of them was checked
// against the course they describe.
//
// ---- WHAT THIS GUARD CHECKS ----
//
// 1. All three maps agree with data/khan/grammarCourseOrder.js.
// 2. The three maps agree with EACH OTHER. Two maps that disagree do not
//    produce a wrong order — they produce an order that flips on every
//    startup, rewriting the database each time, which is worse and much
//    harder to see.
// 3. Every seeded Q1 grammar row points at the Khan unit its position claims.
//    This is the check that would have caught the original bug: it compares
//    position against the URL, and the URL cannot lie about which page opens.
// 4. Sequences are unique and contiguous, so no two units share "today".
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  KHAN_GRAMMAR_UNITS,
  Q1_ELA_ORDER,
  Q1_NON_GRAMMAR_TAIL,
  LEGACY_GRAMMAR_TITLES,
  khanGrammarUnitForUrl
} from '../src/academies/lamar/data/khan/grammarCourseOrder.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};

const storeSrc = fs.readFileSync(path.join(REPO, 'src/store/useAppStore.js'), 'utf8');

/** Q1 entries from one named map literal in the store: title -> sequence. */
function q1EntriesFrom(mapName) {
  const start = storeSrc.indexOf(`const ${mapName} = {`);
  if (start === -1) return null;
  const open = storeSrc.indexOf('{', start);
  let depth = 0;
  let end = open;
  for (let i = open; i < storeSrc.length; i++) {
    if (storeSrc[i] === '{') depth++;
    else if (storeSrc[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  const block = storeSrc.slice(open, end);
  const out = new Map();
  // Matches both key orders used in the file:
  //   'Title': { batchLabel: 'Q1 …', sequenceInQuarter: N }
  //   'Title': { sequenceInQuarter: N, batchLabel: 'Q1 …' }
  const re = /'((?:[^'\\]|\\.)+)':\s*\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(block))) {
    const title = m[1].replace(/\\'/g, "'");
    const body = m[2];
    if (!/batchLabel:\s*'Q1 2026-2027'/.test(body)) continue;
    const seq = body.match(/sequenceInQuarter:\s*(\d+)/);
    if (seq) out.set(title, Number(seq[1]));
  }
  return out;
}

// ===========================================================================
console.log('\n--- 1. the course order file itself ---');
// ===========================================================================
ok(KHAN_GRAMMAR_UNITS.length === 10, `Khan's Grammar course has 10 units (${KHAN_GRAMMAR_UNITS.length})`);
ok(
  KHAN_GRAMMAR_UNITS.every((u, i) => u.unit === i + 1),
  'unit numbers run 1..10 with no gaps'
);
ok(
  new Set(KHAN_GRAMMAR_UNITS.map((u) => u.slug)).size === 10,
  'every unit has a distinct URL slug'
);
ok(
  KHAN_GRAMMAR_UNITS[0].slug === 'parts-of-speech-the-noun',
  'unit 1 is the noun'
);
ok(
  KHAN_GRAMMAR_UNITS[1].slug === 'parts-of-speech-the-verb',
  'unit 2 is THE VERB — the unit that was stranded at slot 10',
  `found: ${KHAN_GRAMMAR_UNITS[1].slug}`
);
ok(Q1_ELA_ORDER.length === 11, `Q1 holds 11 units (${Q1_ELA_ORDER.length}) — the plan's figure`);

// ===========================================================================
console.log('\n--- 2. the store agrees with the course order ---');
// ===========================================================================
const expected = new Map(Q1_ELA_ORDER.map((title, i) => [title, i + 1]));

// The placement map moved to module scope on Aug 9, 2026 so the two earlier
// passes can defer to it — hence the SHOUTY name here.
const MAPS = ['q1RestructureMap', 'elaSequenceMap', 'ELA_PLACEMENT_MAP'];
const parsed = {};
for (const name of MAPS) {
  const entries = q1EntriesFrom(name);
  ok(entries !== null, `${name} found in useAppStore`);
  parsed[name] = entries || new Map();
}

for (const name of MAPS) {
  const entries = parsed[name];
  const wrong = [];
  for (const [title, seq] of entries) {
    if (!expected.has(title)) continue; // the map may legitimately hold other rows
    if (expected.get(title) !== seq) wrong.push(`${title}: map says ${seq}, course order says ${expected.get(title)}`);
  }
  ok(wrong.length === 0, `${name} matches the Khan course order`, wrong.join('\n      '));
}

// The whole order, present and complete, in the map that has final say.
const placement = parsed.ELA_PLACEMENT_MAP;
const missing = Q1_ELA_ORDER.filter((t) => !placement.has(t));
ok(
  missing.length === 0,
  'ELA_PLACEMENT_MAP places every one of the 11 Q1 units',
  missing.join(', ')
);

// ===========================================================================
console.log('\n--- 3. the maps agree with each other ---');
// ===========================================================================
/**
 * Two maps that disagree about a row do not produce a wrong order. They
 * produce an order that FLIPS on every startup — each map rewriting the row
 * the other just wrote — which is invisible on screen and writes to the
 * database on every app open.
 */
const conflicts = [];
for (let i = 0; i < MAPS.length; i++) {
  for (let j = i + 1; j < MAPS.length; j++) {
    for (const [title, seq] of parsed[MAPS[i]]) {
      const other = parsed[MAPS[j]].get(title);
      if (other !== undefined && other !== seq) {
        conflicts.push(`${title}: ${MAPS[i]}=${seq} vs ${MAPS[j]}=${other}`);
      }
    }
  }
}
ok(conflicts.length === 0, 'no two maps give the same Q1 row different sequences', conflicts.join('\n      '));

/**
 * The structural fix behind that check: both earlier passes must DEFER to the
 * placement map rather than race it. Without this, a disagreement is not a
 * wrong order — it is a row rewritten two or three times on every app start,
 * which never shows on screen and so is never noticed.
 */
ok(
  /if \(canonicalSubject\(a\.subject\) === 'reading' && ELA_PLACEMENT_MAP\[a\.skillTitle\]\) return a;/.test(storeSrc),
  'the Q1 restructure pass defers to the placement map'
);
ok(
  (storeSrc.match(/if \(ELA_PLACEMENT_MAP\[a\.skillTitle\]\) return a;/g) || []).length >= 1,
  'the sequence-repair pass defers to the placement map'
);
ok(
  /^const ELA_PLACEMENT_MAP = \{/m.test(storeSrc),
  'the placement map is hoisted to module scope so the earlier passes can see it'
);

// ===========================================================================
console.log('\n--- 4. position matches the page that actually opens ---');
// ===========================================================================
/**
 * The check that would have caught this from the start. Everything above
 * compares numbers to numbers; this compares a row's POSITION to the Khan URL
 * it links to, and a URL cannot be wrong about which page it opens.
 */
const seededUrls = new Map();
for (const m of storeSrc.matchAll(
  /skillTitle:\s*'((?:[^'\\]|\\.)+)',[^}]*?khanAcademyUrl:\s*'([^']+)'/g
)) {
  const title = m[1].replace(/\\'/g, "'");
  if (!seededUrls.has(title)) seededUrls.set(title, m[2]);
}

const mismatched = [];
for (const unit of KHAN_GRAMMAR_UNITS) {
  // The SEED still writes the legacy name for the verb; the row is renamed to
  // Khan's title at hydrate. Look under both.
  const url = seededUrls.get(unit.khanTitle) || seededUrls.get(unit.appTitle);
  if (!url) { mismatched.push(`${unit.khanTitle}: no seeded row found`); continue; }
  const linkedUnit = khanGrammarUnitForUrl(url);
  if (linkedUnit !== unit.unit) {
    mismatched.push(`"${unit.khanTitle}" is placed as Khan unit ${unit.unit} but links to unit ${linkedUnit ?? '(not a grammar unit)'}`);
  }
  const placedAt = placement.get(unit.khanTitle) ?? placement.get(unit.appTitle);
  if (placedAt !== unit.unit) {
    mismatched.push(`"${unit.khanTitle}" is Khan unit ${unit.unit} but sits at Q1 slot ${placedAt}`);
  }
}
ok(mismatched.length === 0, 'every grammar row sits at the slot its Khan URL says it should', mismatched.join('\n      '));

for (const title of Q1_NON_GRAMMAR_TAIL) {
  const url = seededUrls.get(title);
  ok(
    Boolean(url) && khanGrammarUnitForUrl(url) === null,
    `"${title}" is correctly NOT a Grammar-course unit`,
    url || 'no seeded row'
  );
  ok(
    placement.get(title) > KHAN_GRAMMAR_UNITS.length,
    `"${title}" follows all ten grammar units`,
    `at slot ${placement.get(title)}`
  );
}

// ===========================================================================
console.log('\n--- 5. one unit per slot ---');
// ===========================================================================
const q1Seqs = Q1_ELA_ORDER.map((t) => placement.get(t)).filter((n) => typeof n === 'number');
ok(new Set(q1Seqs).size === q1Seqs.length, 'no two Q1 units share a sequence number');
ok(
  q1Seqs.slice().sort((a, b) => a - b).every((n, i) => n === i + 1),
  'Q1 sequences run 1..11 with no gaps',
  q1Seqs.slice().sort((a, b) => a - b).join(', ')
);

// ===========================================================================
console.log('\n--- 6. placement survives a renamed row ---');
// ===========================================================================
/**
 * The parent, right after the order fix shipped: "it looks like it was already
 * renamed." Nothing in the code renamed it — but if a row in a real database
 * IS wearing a different name, a title-keyed map skips it silently and the fix
 * reports success while changing nothing. These checks make sure the placement
 * does not depend on the title at all.
 */
// The property under test is "keyed on the URL, not the title" — NOT the name
// of the function that reads it. This asserted the literal `khanGrammarUnitByUrl`
// and so failed on Aug 28 when the matcher was correctly narrowed to
// `generalGrammarUnitByUrl`. Sixth stale-literal failure on this project: assert
// the property, not the punctuation.
ok(
  /[gG]rammarUnitByUrl\(a\.khanAcademyUrl\)/.test(storeSrc),
  'hydrate places grammar rows by their Khan URL, not their title'
);
/**
 * And it must be the GENERAL-course matcher specifically.
 *
 * This pass hardcodes `batchLabel: 'Q1 2026-2027'`. That is only ever true for
 * the ten units of /humanities/grammar. On Aug 25 the wide matcher was handed
 * to it, and every grade 7-8 row was dragged out of Q2-Q4 into Q1 on each app
 * start — the parent found it when her son's 12:30 link opened 7th-grade Nouns.
 */
ok(
  /generalGrammarUnitByUrl\(a\.khanAcademyUrl\)/.test(storeSrc),
  'and it uses the general-course-only matcher, so it cannot move other courses into Q1'
);
ok(
  /skillTitle: unit\.khanTitle/.test(storeSrc),
  "and renames each one to Khan's own title, so the row and the page agree"
);
for (const [legacy, khan] of Object.entries(LEGACY_GRAMMAR_TITLES)) {
  const inPlacement = placement.has(legacy);
  ok(inPlacement, `the legacy title "${legacy}" is still recognised as ${khan}`);
  ok(
    placement.get(legacy) === placement.get(khan),
    `"${legacy}" and "${khan}" resolve to the same slot`,
    `${placement.get(legacy)} vs ${placement.get(khan)}`
  );
}
ok(
  seededUrls.has('Parts of speech: the verb') || seededUrls.has('Verb tenses, including the perfect tenses'),
  'the verb unit is seeded under one of its two names'
);

/**
 * A rename changes a row's identity for the two-computer merge, because
 * `skillTitle` is part of the natural key. Both machines rename in hydrate so
 * they converge — but an OLD backup, or an export taken before the rename,
 * still carries the legacy name. Without normalisation the merge would add a
 * SECOND copy of a unit he may already have finished, splitting his record.
 */
ok(
  /const khanKey = \(a\) => \{[\s\S]{0,220}LEGACY_GRAMMAR_TITLES\[a\.skillTitle\]/.test(storeSrc),
  'the import merge normalises a legacy grammar title before matching'
);
ok(
  /LEGACY_GRAMMAR_TITLES\[a\.skillTitle\] \|\| a\.skillTitle;\n\s*const key = `\$\{a\.subject\}\|\$\{title\}\|\$\{a\.batchLabel\}`/.test(storeSrc),
  'and so does the de-duplication pass'
);

// ===========================================================================
const label = failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`;
console.log(`\n${label}\n`);
process.exit(failures === 0 ? 0 : 1);
