// ---------------------------------------------------------------------------
// A FIELD TRIP ROW OPENS SOMETHING. Run: ACADEMY=lamar node scripts/verify-field-trip-open.mjs
//
// The parent, Oct 6, 2026: "Lamar is unable to select his field trips from the
// Mission Control page. When hovering or when clicks on them nothing happens."
// His card made a row a button only when its title started with an assignment's
// title, so a trip was plain text — and he had no page of his own for a trip to
// open. Sixth report of the one rule: a row that names a thing must open it.
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
const codeOnly = (t) => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');

const { installAcademyContent } = await import('../src/content/academyContent.js');
installAcademyContent(await import('../src/academies/lamar/content.js'), 'lamar');
const { itemTarget } = await import('../src/lib/itemTarget.js');
const { buildCalendarItems } = await import('../src/lib/scheduler.js');

const items = buildCalendarItems({
  fieldTrips: [{ id: 7, destination: 'Delta Flight Museum', date: '2026-10-20', subjects: ['aerospace'], status: 'planned' }]
});
const trip = items.find((i) => i.source === 'fieldTrip');
ok('a dated field trip reaches the calendar feed', Boolean(trip));
ok('...and itemTarget names the trip it is, by id', JSON.stringify(itemTarget(trip)) === JSON.stringify({ kind: 'fieldTrip', id: 7 }), JSON.stringify(itemTarget(trip)));
ok('a trip with no id opens nothing rather than a dead button', itemTarget({ source: 'fieldTrip' }) === null);

const card = codeOnly(read('src/components/Dashboard/AcademicCenterCard.jsx'));
ok('his Mission Control card asks itemTarget what a row opens', /itemTarget\(item\)/.test(card));
ok('...for BOTH the past-due and the due-soon lists', (card.match(/onOpen=\{openFor\(item\)\}/g) || []).length === 2);
ok('...and no longer links a row only when its title starts with an assignment\'s',
  !/onOpen=\{assignmentFor\(item\) &&/.test(card));
ok('...while an assignment row still opens its assignment', /onOpenAcademicCenter\(\{ kind: 'assignment', id: a\.id \}\)/.test(card));

const dash = codeOnly(read('src/components/Dashboard/MissionControlDashboard.jsx'));
ok('the dashboard hands the card an opener', /<AcademicCenterCard[^>]*onOpenItem=\{onOpenItem\}/.test(dash));

const app = codeOnly(read('src/App.jsx'));
ok('the app gives the dashboard the shared opener', /<MissionControlDashboard\s+onOpenItem=\{openPlannerItem\}/.test(app));
ok('a trip target opens the trip page, not the monthly planner (which does not list trips)',
  /t\.kind === 'fieldTrip'\) setActiveFieldTrip\(t\.id\)/.test(app) && !/fieldTrip'\) \{ setScheduleMode/.test(app));
ok('the trip page is rendered when a trip is chosen', /activeFieldTrip !== null\) \{?\s*content = <FieldTripBrief/.test(app.replace(/\n/g, ' ').replace(/\s+/g, ' ').replace('{ content', 'content')) || /<FieldTripBrief tripId=\{activeFieldTrip\}/.test(app));

const page = codeOnly(read('src/components/Dashboard/FieldTripBrief.jsx'));
ok('the trip page shows where, when, subjects and notes', /trip\.destination/.test(page) && /formatTripDate\(trip\.date\)/.test(page) && /trip\.subjects/.test(page) && /trip\.notes/.test(page));
ok('...and the learning pack only when the parent has made one', /trip\.learningPack \?/.test(page) && /No learning pack for this trip yet/.test(page));
ok('...says so plainly when the trip has been removed', /no longer on the list/.test(page));
ok('...and is read-only: it writes nothing to the store', !/(addFieldTrip|updateFieldTrip|completeFieldTrip|deleteFieldTrip|set\()/.test(page));
ok('the trip page has a way back', /onClick=\{onExit\}/.test(page));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
