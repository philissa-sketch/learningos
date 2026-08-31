// ---------------------------------------------------------------------------
// A FIELD TRIP REACHES THE GEORGIA RECORD. Run: node scripts/verify-field-trip-records.mjs
//
// ---- WHAT SHE ASKED (Aug 13, 2026) ----
//
// The parent, the day after taking her son on a field trip: "where does the
// info for the field trip go when completed?"
//
// Tracing it end to end turned up three faults, and the shape they share is
// worth naming: EVERY ONE OF THEM FAILED QUIETLY AND PLAUSIBLY. None threw,
// none logged, and each produced output that looked like a parent who had not
// finished filling something in.
//
//   1. Every portfolio line in the downloadable records packet printed
//      "no date". The packet read `item.completedAt`; portfolio rows have
//      always stored `dateCompleted`. formatDate's graceful fallback for a
//      missing date is the string 'no date', so a packet full of them read as
//      incomplete data entry rather than as a bug.
//
//   2. Completed trips never appeared under the packet's own "Field Trips"
//      heading. That section read `adminRecords`, which she types by hand in
//      Records; the Field Trip Planner wrote to `fieldTrips`, a table the
//      packet did not look at. So the heading sat empty while the trip showed
//      up further down as a generic portfolio line.
//
//   3. The hours she typed were read in exactly one place — the trip card that
//      displayed them back to her. Not summed, not in the packet, and not in
//      the 180-day count, which reads `allAttendance` alone. Meanwhile the
//      Mission Control Board told her: "A logged trip is a real school day
//      toward the 180." A false compliance promise is the worst kind.
//
// So this file does not check that the code says the right words. It BUILDS A
// PACKET from fixtures and reads the text that comes out, because the only
// thing that matters here is what a Georgia reviewer would see on the page.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { buildCompliancePacket } = await import(REPO + '/src/lib/compliancePacket.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

// A portfolio row exactly as addPortfolioEntry writes one, and a completed
// trip exactly as completeFieldTrip leaves one.
const PORTFOLIO = [
  {
    id: 1,
    title: 'Field Trip: Delta Flight Museum',
    reflection: 'Walked the 747 and the wind tunnel exhibit.',
    dateCompleted: '2026-08-12',
    subject: 'aerospace',
    driveUrl: null
  }
];
const TRIPS = [
  {
    id: 1,
    destination: 'Delta Flight Museum',
    date: '2026-08-12',
    status: 'completed',
    completedAt: '2026-08-12T23:10:00.000Z',
    hours: 4,
    notes: 'Walked the 747 and the wind tunnel exhibit.',
    subjects: ['aerospace']
  },
  { id: 2, destination: 'Tellus Science Museum', date: '2026-09-04', status: 'planned', hours: 0 }
];
const packetWith = (extra = {}) =>
  buildCompliancePacket({
    studentName: 'Student',
    generatedOn: '2026-08-13',
    allAttendance: {},
    reportCard: [],
    readingLog: [],
    portfolio: PORTFOLIO,
    adminRecords: [],
    fieldTrips: TRIPS,
    courseDescriptions: {},
    complianceChecks: {},
    evidenceLinks: {},
    missionEvaluations: [],
    ...extra
  });

console.log('\n--- 1. the packet dates the portfolio ---');
{
  const text = packetWith();
  ok('no portfolio line prints "no date"', !/no date — /.test(text),
    'the field is dateCompleted; reading completedAt silently produced this on EVERY entry');
  ok('the real date is printed instead', /Aug 12, 2026 — Field Trip: Delta Flight Museum/.test(text));
  ok('the subject tag survives', /\[Aerospace Engineering\]/.test(text));
  ok('the reflection survives', /Reflection: Walked the 747/.test(text));

  // A row that arrives from the other computer or an older build may carry
  // completedAt instead. It must still date.
  const legacy = packetWith({
    portfolio: [{ id: 9, title: 'Older entry', completedAt: '2026-07-01', subject: null }]
  });
  ok('a legacy row carrying completedAt still dates', /Jul 1, 2026 — Older entry/.test(legacy));

  const undated = packetWith({ portfolio: [{ id: 9, title: 'Genuinely undated' }] });
  ok('...and a row with neither still degrades gracefully', /no date — Genuinely undated/.test(undated),
    'the fallback was never the bug — reading the wrong field was');
}

console.log('\n--- 2. a completed trip reaches the FIELD TRIPS section ---');
{
  const text = packetWith();
  const section6 = text.slice(text.indexOf('6. ACTIVITY AND TEST RECORDS'));
  ok('the Field Trips heading appears', /Field Trips/.test(section6));
  ok('the completed trip is listed under it', /Aug 12, 2026 — Delta Flight Museum/.test(section6),
    'it used to reach the record only as a generic portfolio line');
  ok('its hours are on the line', /Delta Flight Museum — 4 hours/.test(section6),
    'a reviewer asking "how much instruction" should not have to guess');
  ok('the hours are totalled', /Total hours: 4/.test(section6));
  ok('the notes are carried as detail', /Walked the 747/.test(section6));
  ok('a PLANNED trip is not reported as completed', !/Tellus Science Museum/.test(section6),
    'a records packet must never claim a trip that has not happened');
}

console.log('\n--- 3. it is not reported twice when she also typed it in ---');
{
  // The exact duplicate she would create by recording the same trip in Records.
  const hand = [{
    id: 5, kind: 'field-trip', date: '2026-08-12',
    title: 'Delta Flight Museum', hours: 4, detail: 'Typed by hand.'
  }];
  const text = packetWith({ adminRecords: hand });
  const section6 = text.slice(text.indexOf('6. ACTIVITY AND TEST RECORDS'));
  const hits = (section6.match(/Delta Flight Museum/g) || []).length;
  ok('the trip appears exactly once', hits === 1, `appeared ${hits} times`);
  ok('...and her own typed detail is the one kept', /Typed by hand\./.test(section6),
    'when both exist, what she wrote by hand wins — the planner copy stands down');
  ok('...so the total is not doubled either', /Total hours: 4/.test(section6));

  // Same destination, different day, is a different trip and must both show.
  const twice = packetWith({
    adminRecords: [{ id: 5, kind: 'field-trip', date: '2026-05-02', title: 'Delta Flight Museum', hours: 3 }]
  });
  const s6 = twice.slice(twice.indexOf('6. ACTIVITY AND TEST RECORDS'));
  ok('two visits to one place on different days both count',
    (s6.match(/Delta Flight Museum/g) || []).length === 2 && /Total hours: 7/.test(s6));
  ok('...and the section is in date order', s6.indexOf('May 2, 2026') < s6.indexOf('Aug 12, 2026'));
}

console.log('\n--- 4. the hours become a real school day ---');
{
  const store = read('src/store/useAppStore.js');
  const i = store.indexOf('async completeFieldTrip(');
  // The slice has to cover the WHOLE function; it grew past 3200 chars the
  // first time it was edited and quietly took six checks down with it.
  const fn = store.slice(i, store.indexOf('\n  },', i));

  ok('completing a trip writes offline instruction minutes',
    /setOfflineInstructionMinutes\(tripDate, tripMinutes\)/.test(fn),
    'this is the ONLY path from a trip to the 180-day count — daysLogged reads allAttendance alone');
  ok('...against the day of the TRIP, not the day she ticked it off',
    /const tripDate = \(trip\.date \|\| completedAt\)\.slice\(0, 10\);/.test(fn),
    'instruction happened when they went');
  ok('...converted from hours',
    /const tripMinutes = Math\.round\(loggedHours \* 60\);/.test(fn));
  ok('it never lowers a number she typed herself',
    /if \(tripMinutes > already\)/.test(fn),
    'she may have logged the trip plus an evening of work; this must not eat the difference');
  ok('it writes rather than adds',
    !/already \+ tripMinutes/.test(fn),
    'adding would double-count the moment she records the same trip in both places');
  ok('a zero-hour trip writes nothing at all', /if \(tripMinutes > 0\)/.test(fn));
  ok('what was written is recorded on the trip itself',
    /instructionMinutes: instructionMinutesWritten/.test(fn) && /instructionDate: instructionMinutesWritten \? tripDate : null/.test(fn),
    'a number in a legal record must be traceable to the thing that wrote it');

  /**
   * The unit trap, found on her own record minutes after this shipped: the
   * Victory Creek Waterfall trip carried `hours: 160` — the trip's length in
   * MINUTES, typed into a box whose entire label was the placeholder "hrs".
   * Unchecked, that becomes 9,600 minutes, the validator rejects it, and the
   * trip books nothing at all while appearing to have worked.
   */
  ok('an implausible hours figure is caught and named, not silently dropped',
    /const IMPLAUSIBLE_HOURS = 12;/.test(fn) && /instructionSkipped = 'implausible-hours';/.test(fn),
    '160 hours is six days; it is minutes, and the app should say so');
  ok('every skip records WHY', /instructionSkipped\b/.test(fn) &&
    /'already-higher'/.test(fn) && /'rejected'/.test(fn));

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('and the trip card says so on screen',
    /Counted as \{trip\.instructionMinutes\} minutes of instruction on/.test(parent));
  ok('...and says where to change it', /edit it under Compliance/.test(parent));
  ok('...and says so when it deliberately wrote nothing',
    /that day already had at least this many minutes of instruction on it/.test(parent),
    'silence there reads as a bug, which is how this whole area went wrong in the first place');
  ok('...and says which of the three reasons it was',
    /instructionSkipped === 'implausible-hours'/.test(parent) &&
    /instructionSkipped === 'already-higher'/.test(parent) &&
    /instructionSkipped === 'rejected'/.test(parent));
  ok('the hours box is LABELLED, not just placeholdered',
    /<span>Hours<\/span>/.test(parent),
    '"hrs" in a 16px box is how a 160-minute trip became 160 hours');
  ok('...and warns while she is typing', /That is hours, not minutes/.test(parent));

  // The promise that was false until today.
  const board = read('src/components/Dashboard/MissionControlBoard.jsx');
  ok('the board\'s promise to her is now true',
    /a real school day toward the 180/i.test(board) && /setOfflineInstructionMinutes\(tripDate/.test(fn),
    'this copy shipped for a week before anything implemented it');
}

console.log('\n--- 5. a completed trip can be corrected ---');
{
  /**
   * The parent: "i dont see an edit button on the completed field trip."
   *
   * There wasn't one. A completed card offered Regenerate Learning Pack and
   * Delete — and delete-and-recreate is not an edit: it throws away the notes,
   * the portfolio entry built from them, and the learning pack.
   *
   * She wanted it because her Victory Creek trip is stored as 160 HOURS. The
   * build an hour earlier stopped that mistake going IN and did nothing for
   * the one already sitting there.
   */
  const store = read('src/store/useAppStore.js');
  const j = store.indexOf('async updateCompletedFieldTrip(');
  ok('the store can correct a completed trip', j > -1);
  const fn = store.slice(j, store.indexOf('\n  },', j));

  ok('it refuses on a trip that is not complete',
    /trip\.status !== 'completed'/.test(fn));
  ok('it re-books the instruction time', /setOfflineInstructionMinutes\(nextDate, minutes\)/.test(fn));

  /**
   * The one rule that matters. A correction MUST be able to lower a number —
   * that is what makes it a correction — without eating minutes she logged for
   * something else that day. The test is whether the day's current figure is
   * the one this trip put there.
   */
  ok('it may lower ONLY the figure this trip itself wrote',
    /const mayReplace = oldDate === nextDate && prior === oldMinutes;/.test(fn) &&
    /if \(mayReplace \|\| minutes > prior\)/.test(fn),
    'otherwise correcting a trip silently eats an evening of work she logged by hand');

  ok('moving the date clears the trip\'s minutes off the OLD day first',
    /if \(oldDate && oldDate !== nextDate && oldMinutes > 0\)/.test(fn) &&
    /setOfflineInstructionMinutes\(oldDate, 0\)/.test(fn),
    'a mistyped date would otherwise leave a phantom school day in the 180-day count');
  ok('...and only when the old day still holds the trip\'s own number',
    /priorOld === oldMinutes/.test(fn));
  ok('the implausible-hours guard applies to edits too',
    /nextHours > IMPLAUSIBLE_HOURS/.test(fn));
  ok('a trip with no date cannot be booked at all',
    /This trip needs a date before it can count as a school day/.test(fn));

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('a completed card offers an edit control', /Edit hours or date/.test(parent));
  ok('...pre-filled with what the record currently says',
    /setEditHours\(trip\.hours \? String\(trip\.hours\) : ''\)/.test(parent));
  ok('...and it edits rather than deleting and recreating',
    /updateCompletedFieldTrip/.test(parent),
    'delete-and-recreate would throw away her notes, the portfolio entry and the learning pack');
}

console.log('\n--- 6. the packet is actually given the trips ---');
{
  const section = read('src/components/Dashboard/ComplianceSection.jsx');
  ok('ComplianceSection subscribes to fieldTrips', /useAppStore\(\(s\) => s\.fieldTrips\)/.test(section));
  ok('...and passes them to buildCompliancePacket', /\n\s*fieldTrips,\n/.test(section),
    'the merge above is dead code if the only caller never sends the table');

  // Nothing else builds a packet; if that changes, this check should too.
  const callers = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.jsx?$/.test(e.name) && read(path.relative(REPO, full).split(path.sep).join('/')).includes('buildCompliancePacket(')) {
        callers.push(path.relative(REPO, full).split(path.sep).join('/'));
      }
    }
  };
  walk(path.join(REPO, 'src'));
  const outside = callers.filter((c) => c !== 'src/lib/compliancePacket.js' && c !== 'src/components/Dashboard/ComplianceSection.jsx');
  ok('no other screen builds a packet without the trips', outside.length === 0, outside.join(', '));
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
