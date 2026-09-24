// ---------------------------------------------------------------------------
// verify-help-and-build-evidence — Sept 24, 2026.
//
// Two reports, one card:
//   "There isn't a link for the writing or to upload the picture of the
//    project."  (the Science cell-model Portfolio Entry)
// and the decision to put the library's free tutoring in the app.
//
// Properties kept:
//   1. the writing box no longer requires milestones, so a Portfolio Entry
//      — thirteen of the forty-five scheduled assignments — has one
//   2. a build assignment can carry a photo, as a LINK (this app stores no
//      files; the daily export is hand-carried)
//   3. that link travels in the import merge, and never gets blanked
//   4. she can open the photo from the grading screen, text or no text
//   5. the help links are real http(s) addresses and carry the try-first order
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moduleUrl = (rel) => pathToFileURL(path.join(REPO, rel)).href;
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

let passed = 0;
const failures = [];
const ok = (label, cond, detail = '') => {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
};

console.log('\n--- 1. the writing box does not depend on milestones ---');
{
  const view = read('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('the writer renders on any real assignment with a format',
    /\{isReal && format && \(\s*<AssignmentWriter/.test(view),
    'it required steps.length > 0, which Portfolio Entries never have');
  const { hasMilestones } = await import(moduleUrl('src/academies/lamar/data/academicSuccessCenter/assignmentMilestones.js'));
  ok('a Portfolio Entry genuinely has no milestones — the condition was the bug',
    hasMilestones('Portfolio Entry') === false);
  const writer = read('src/components/Academic/AssignmentWriter.jsx');
  ok('the writer tolerates an empty step list', /\(steps \|\| \[\]\)\.some\(/.test(writer));
}

console.log('\n--- 2-3. the build photo, as a link that travels ---');
{
  const view = read('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('a visual format gets the photo field', /format\?\.rubricKind === 'visual' && onSavePhoto/.test(view));
  const store = read('src/store/useAppStore.js');
  ok('the store saves a photo LINK, validated', /async saveAssignmentPhoto\(assignmentId, url\)/.test(store)
    && /normalizeEvidenceUrl\(url\)/.test(store));
  ok('no file ever enters the record', !/readAsDataURL/.test(read('src/components/Academic/BuildPhotoLink.jsx')),
    'a photograph inside the hand-carried export would be too big to move');
  ok('the photo link merges on import', /function photoChanges\(local, incoming\)/.test(store));
  ok('it is applied in the assignment merge', /const photo = photoChanges\(local, incoming\);/.test(store));
  ok('an existing photo is never blanked by an import',
    /if \(!hasText\(incoming\?\.photoUrl\)\) return null;/.test(store));
  const { normalizeEvidenceUrl } = await import(moduleUrl('src/lib/driveLinks.js'));
  ok('a javascript: link is refused', normalizeEvidenceUrl('javascript:alert(1)').ok === false);
  ok('an empty value clears the link', normalizeEvidenceUrl('').ok === true && normalizeEvidenceUrl('').url === null);
}

console.log('\n--- 4. she can see it while grading ---');
{
  const picker = read('src/components/Academic/AssignmentFormatPicker.jsx');
  ok('the grading screen shows the photo', /His photo of the build/.test(picker));
  ok('...even when he typed nothing', /if \(!shown && !photo\) return null;/.test(picker));
}

console.log('\n--- 5. the library tutoring links ---');
{
  const help = await import(moduleUrl('src/lib/homeworkHelp.js'));
  const store = read('src/store/useAppStore.js');
  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  const suggested = /const SUGGESTED_HELP_URL = '(https:\/\/[^']+)'/.exec(parent);
  ok('the address is offered pre-filled, one press from live', Boolean(suggested), 'no suggestion found');
  ok('the suggested address is http(s)', Boolean(suggested) && help.normalizeHelpUrl(suggested[1]).ok);
  ok('no household link is seeded into every school',
    /helpNow: meta\?\.helpNow \?\? null,/.test(store),
    'one family’s library card must not be handed to another family');
  ok('the link is a setting she can change', /async setHelpNow\(\{ library, url \}\)/.test(store));
  ok('it travels to his computer in the export', /helpNow: state\.helpNow \?\? null,/.test(store));
  ok('a javascript: tutoring link is refused', help.normalizeHelpUrl('javascript:alert(1)').ok === false);
  ok('no door hardcodes an address', help.HELP_DOORS.every((d) => !d.url));
  ok('every door says which button to press', help.HELP_DOORS.every((d) => d.press && d.press.length > 5));
  ok('the try-it-yourself order is printed, not implied',
    help.HELP_ORDER.length === 3 && /yourself/i.test(help.HELP_ORDER[0]));
  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('the help card is mounted on his dashboard', /<HelpNowCard \/>/.test(dash),
    'a component nobody renders is this project’s oldest bug');
  const card = read('src/components/Dashboard/HelpNowCard.jsx');
  ok('links open in a new tab, safely', /target="_blank"/.test(card) && /rel="noreferrer"/.test(card));
  ok('no link set means no card, never a dead button', /if \(!helpNow\?\.url\) return null;/.test(card));
  ok('she can edit or clear it from the Parent Dashboard',
    /<HelpNowLinkSection \/>/.test(read('src/components/Dashboard/ParentDashboard.jsx')));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) { console.log(`\n${failures.length} CHECK(S) FAILED`); process.exit(1); }
console.log('\nALL CHECKS PASSED');
