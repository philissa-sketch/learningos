// ---------------------------------------------------------------------------
// WHICH CARD A ROW IS DRAWN ON. Run: ACADEMY=lamar node scripts/verify-card-moves.mjs
//
// The parent, Oct 5, 2026: the Red-Tail Angels reading was on the Social Studies
// card under A Long Walk to Water and belongs on English Language Arts; and the
// Q1 writing portfolio, drawn inside the English card among the reading work,
// should have a card of its own.
//
// Two different mechanisms, deliberately:
//   * Red-Tail's SUBJECT moves (a correction, guarded, refused on touched work)
//     because the subject decides which course its grade counts toward.
//   * The portfolio only gets its own CARD (a drawing rule). It keeps its
//     subject, so its grade stays in English Language Arts.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

const { quarterlyAcademicPlaceholders: seed, ASSIGNMENT_CARD_SPLITS } =
  await import('../src/academies/lamar/data/academicSuccessCenter/placeholders.js');
const { ASSIGNMENT_CORRECTIONS } = await import('../src/academies/lamar/data/migrations/assignmentMigrations.js');

const Q1 = 'Q1 2026-2027';
const RT = 'asg::socialStudies::Q1::2';
const has = (subject, slotId) => (seed[subject]?.[Q1] || []).some((s) => s.slotId === slotId);

ok('Red-Tail is seeded under English Language Arts', has('reading', RT));
ok('...and no longer under Social Studies, so a new database cannot have it on both', !has('socialStudies', RT));
ok('A Long Walk to Water stays on Social Studies', has('socialStudies', 'asg::socialStudies::Q1::1') && has('socialStudies', 'asg::socialStudies::Q1::3'));
ok('the slot id is unchanged (it is the row\'s identity)', has('reading', RT));

const fix = ASSIGNMENT_CORRECTIONS[RT];
ok('an already-hydrated row is moved by a correction', fix && fix.subject === 'reading' && fix.fromSubject === 'socialStudies');
ok('...and the note correction on the same slot survived the merge', fix && Array.isArray(fix.fromNote) && /Read it for itself/.test(fix.note));
const keys = fs.readFileSync(path.join(REPO, 'src/academies/lamar/data/migrations/assignmentMigrations.js'), 'utf8')
  .split('\n').filter((l) => l.includes(`'${RT}':`));
ok('the slot has ONE entry in the table (a second would silently overwrite the first)', keys.length === 1, `${keys.length}`);

const store = read('src/store/useAppStore.js');
ok('the store applies a subject move only to a row still on the expected subject',
  /if \(fix\.subject && untouchedByHim && row\.subject === fix\.fromSubject\) changes\.subject = fix\.subject;/.test(store));
ok('...and the guard it uses refuses graded, started, completed and ticked rows',
  /const untouchedByHim =[\s\S]{0,400}!row\.grade[\s\S]{0,200}!row\.completedAt[\s\S]{0,200}!row\.startedAt/.test(store));
ok('the subject move sits after untouchedByHim is defined',
  store.indexOf('const untouchedByHim =') < store.indexOf('changes.subject = fix.subject'));

ok('the writing portfolio type is given its own card', ASSIGNMENT_CARD_SPLITS['Writing Portfolio Entry'] === 'Writing Portfolio');
ok('...and the split changes only the DRAWING: the portfolio slot is still seeded under English',
  has('reading', 'asg::writing::Q1::1'));

// academicUi reads the open school's content, so a school has to be installed
// first — the same thing AcademyShell does at boot.
const { installAcademyContent } = await import('../src/content/academyContent.js');
installAcademyContent(await import('../src/academies/lamar/content.js'), 'lamar');
const { assignmentCards } = await import('../src/components/Academic/academicUi.js');
const rows = [
  { id: 1, subject: 'reading', type: 'Reading Assignment', title: 'Hatchet' },
  { id: 2, subject: 'reading', type: 'Book Report', title: 'Hatchet jacket' },
  { id: 3, subject: 'reading', type: 'Reading Assignment', title: 'Red-Tail Angels' },
  { id: 4, subject: 'reading', type: 'Writing Portfolio Entry', title: 'Q1 writing portfolio' },
  { id: 5, subject: 'socialStudies', type: 'Reading Assignment', title: 'A Long Walk to Water' },
  { id: 6, subject: 'socialStudies', type: 'Portfolio Entry', title: 'Salva\'s well' }
];
const cards = assignmentCards(rows);
const byHeading = Object.fromEntries(cards.map((c) => [c.heading, c]));
const ela = cards.find((c) => c.subject === 'reading' && c.canAdd); // headed "English Language Arts (Khan Academy)" — the card keeps the school's own heading
const wp = byHeading['Writing Portfolio'];
ok('English Language Arts has Hatchet, its report and Red-Tail', ela && ela.rows.map((r) => r.id).sort().join() === '1,2,3');
ok('the portfolio is NOT on the English card', ela && !ela.rows.some((r) => r.type === 'Writing Portfolio Entry'));
ok('the portfolio has a card of its own, holding only the portfolio', wp && wp.rows.length === 1 && wp.rows[0].id === 4);
ok('its rows keep their subject (grades stay in English Language Arts)', wp && wp.rows[0].subject === 'reading' && wp.subject === 'reading');
ok('Social Studies no longer holds Red-Tail', cards.find((c) => c.subject === 'socialStudies').rows.every((r) => r.id !== 3));
ok('the split card sits right after its subject\'s card', cards.findIndex((c) => c === wp) === cards.findIndex((c) => c === ela) + 1);
ok('a split card does not offer "add another assignment"', wp && wp.canAdd === false && ela.canAdd === true);
ok('a subject with no split rows draws exactly one card', cards.filter((c) => c.subject === 'socialStudies').length === 1);
ok('no row is lost or drawn twice', cards.flatMap((c) => c.rows).length === rows.length);
ok('an empty portfolio card is not drawn', !assignmentCards(rows.filter((r) => r.id !== 4)).some((c) => c.heading === 'Writing Portfolio'));

for (const rel of ['src/components/Academic/AcademicAssignmentsView.jsx', 'src/components/Academic/AcademicParentSetupView.jsx']) {
  ok(`${path.basename(rel)} draws from assignmentCards`, /assignmentCards\(/.test(read(rel)));
}
ok('the platform names no school type: the split is read from the Academy', !/Writing Portfolio/.test(read('src/components/Academic/academicUi.js').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
