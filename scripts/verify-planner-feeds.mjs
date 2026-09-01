// ---------------------------------------------------------------------------
// SCHEDULED WORK CARRIES A DATE, AND THE GARDEN IS ON THE PLANNER.
// Run: node scripts/verify-planner-feeds.mjs
//
// ---- WHERE THIS CAME FROM (Aug 14, 2026) ----
//
// Three requests in one message, which turned out to be one fault:
//
//   "Add the garden to his planner."
//   "for projects that has a due date, add the time needed that leads to the
//    due date to start any pre-requisites."
//   "there are writing journals with projects that I do not see the due dates
//    for. If they aren't assigned, please assign them."
//
// **Forty-six pieces of real work carried no date.** Thirty were scheduled by
// SCHOOL WEEK NUMBER only — every writing prompt, three aerospace builds,
// thirteen science experiments — which made them invisible to every calendar in
// the app. The planner's own source file had named this in a comment and it had
// never been acted on. Sixteen more were in the app and scheduled nowhere at
// all: four Tinkercad projects, six robotics projects, six garden projects.
//
// The garden was the worst case, because it looked finished. It has 42 dated
// Fridays, five builds each with an opening and a closing brief, and three
// planting windows the app itself calls "the one deadline in this whole app
// that does not move." Three separate components import gardenProjects and
// search it by id — and not one of those searches could ever match, because no
// gd7-* id has ever appeared in weeklyWritingSchedule.
//
// And every due date in the app was a deadline with no run-up. A book report
// due Oct 9 needs the book read by Sep 18; that fact existed only inside a
// milestone list you had to open the assignment to see.
//
// THE SHAPE OF ALL THREE: the data was already there and complete. Nothing read
// it as a date.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pf = await import(REPO + '/src/lib/plannerFeeds.js');
const pc = await import(REPO + '/src/lib/plannerCalendar.js');
const ms = await import(REPO + '/src/academies/lamar/data/academicSuccessCenter/assignmentMilestones.js');
const { weeklyWritingSchedule } = await import(REPO + '/src/academies/lamar/data/writing/weeklySchedule.js');
const { gardenCalendar } = await import(REPO + '/src/academies/lamar/data/gardening/gardenCalendar.js');
const { isHoliday } = await import(REPO + '/src/academies/lamar/data/schedule/schoolHolidays.js');
const { roboticsProjects } = await import(REPO + '/src/academies/lamar/data/robotics/roboticsProjects.js');
const { technologyProjects } = await import(REPO + '/src/academies/lamar/data/technology/technologyProjects.js');
const { roboticsLessons7 } = await import(REPO + '/src/academies/lamar/data/lessons/robotics7.js');
const { technologyLessons7 } = await import(REPO + '/src/academies/lamar/data/lessons/technology7.js');
const { gardenBuildTrack } = await import(REPO + '/src/academies/lamar/data/gardening/gardenBuildTrack.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/**
 * The file with every comment removed.
 *
 * Six times now a check in this project has been satisfied by the comment
 * explaining the fix rather than by the fix. A presence check whose subject is
 * also named in prose — "Start by", "finish by" — has to be asserted against
 * the code, or it passes on the day the code is deleted and the comment stays.
 */
const codeOnly = (rel) =>
  read(rel)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '');

console.log('\n--- 1. week-numbered work now has a real date ---');
{
  ok('week 1 falls on Friday Aug 7 2026', pf.fridayOfSchoolWeek(1) === '2026-08-07',
    pf.fridayOfSchoolWeek(1));
  ok('...and every derived date IS a Friday, when the Friday is a school day',
    [1, 3, 9, 20, 36, 42].every((w) => new Date(pf.fridayOfSchoolWeek(w) + 'T12:00:00').getDay() === 5),
    "parent's decision: a week-numbered item is due the Friday of that week");

  /**
   * ---- THE TWO FRIDAYS THAT WERE NOT SCHOOL DAYS (Aug 16, 2026) ----
   *
   * Found while dating the Tinkercad and robotics projects. Two of the
   * forty-two week-Fridays fall on days the app's own holiday list already
   * calls closed, and the planner was dating real work to both:
   *
   *     week 21 -> Fri Dec 25 2026    week 22 -> Fri Jan 1 2027
   *
   * A science experiment and a writing piece were due on Christmas Day. The
   * app knew it was closed. Nothing asked.
   */
  ok('a deadline never lands on Christmas Day', pf.fridayOfSchoolWeek(21) === '2026-12-24',
    pf.fridayOfSchoolWeek(21));
  ok('...nor on New Year\'s Day', pf.fridayOfSchoolWeek(22) === '2026-12-31',
    pf.fridayOfSchoolWeek(22));
  ok('...and it walks BACK, never forward',
    pf.fridayOfSchoolWeek(21) < '2026-12-25',
    'moving a deadline later is a decision about his workload; this function does not get to make one');
  ok('NO scheduled item lands on a school holiday',
    pf.writingScheduleCalendarItems({ writingEntries: [] }).every((i) => !isHoliday(i.dueDate)),
    'the whole planner, not just the two weeks that prompted the fix');
  ok('week 0 and nonsense return null, they do not throw',
    pf.fridayOfSchoolWeek(0) === null && pf.fridayOfSchoolWeek(undefined) === null);

  const items = pf.writingScheduleCalendarItems({ writingEntries: [] });
  const scheduledIds = Object.values(weeklyWritingSchedule).flat();
  ok('every scheduled id resolves to a dated item', items.length === scheduledIds.length,
    `${items.length} dated vs ${scheduledIds.length} scheduled — a gap means an id resolves to nothing`);
  ok('every item carries a due date', items.every((i) => /^\d{4}-\d{2}-\d{2}$/.test(i.dueDate)));
  ok('hands-on builds are labelled differently from journal pieces',
    items.some((i) => i.typeLabel === 'Hands-on project') && items.some((i) => i.typeLabel === 'Writing Journal'));

  /**
   * DONE MEANS DONE THAT WEEK. The weekly pool repeats — "Mission Report" is
   * scheduled seven times — and an ever-check is precisely what made the home
   * screen report five weeks of writing as already finished.
   */
  const repeated = items.filter((i) => i.key.startsWith('writing::w7-mission-report'));
  ok('a repeating prompt gets one dated item per scheduled week', repeated.length > 1,
    `${repeated.length}`);
  const withEntry = pf.writingScheduleCalendarItems({
    writingEntries: [{ promptId: 'w7-mission-report', completedAt: '2026-08-14T15:00:00.000Z' }]
  });
  const doneCount = withEntry.filter((i) => i.key.startsWith('writing::w7-mission-report') && i.done).length;
  ok('...and writing it once marks exactly ONE of them done', doneCount === 1,
    `${doneCount} marked done — an ever-check would mark all of them`);
}

console.log('\n--- 1b. the ten projects that had no date anywhere ---');
{
  /**
   * ---- WHERE THIS CAME FROM (Aug 16, 2026) ----
   *
   * Four Tinkercad projects and six robotics projects were fully written —
   * objectives, materials, step-by-step procedure, a reflection prompt — and
   * carried no quarter, no week, and no date. Nothing in the app could reach
   * them. They had been sitting there since the content shipped.
   *
   * The parent: "Add them to the quarters that they are supposed to be in based
   * on the subject and what is being taught."
   *
   * No judgement call was needed, and that is the finding. Every one of the ten
   * already names the lesson it belongs to in `relatedLessonId`, and every one
   * of those lessons already carries a quarter and a sequenceInQuarter. **The
   * schedule was fully determined by data already in the repo.** What was
   * missing was the one line putting the id in the week.
   *
   * This suite therefore does not hardcode ten weeks — it re-derives the
   * placement from the lessons and fails if a project drifts away from the
   * lesson that teaches it.
   */
  const lessonsById = new Map([...roboticsLessons7, ...technologyLessons7].map((l) => [l.id, l]));
  const QUARTER_WEEKS = { Q1: [1, 13], Q2: [14, 21], Q3: [22, 34], Q4: [35, 42] };
  const items = pf.writingScheduleCalendarItems({ writingEntries: [] });
  const projects = [...roboticsProjects, ...technologyProjects];

  ok('all ten are on the calendar', projects.every((p) => items.some((i) => i.key.includes(p.id))),
    projects.filter((p) => !items.some((i) => i.key.includes(p.id))).map((p) => p.id).join(', ') || 'none missing');

  for (const proj of projects) {
    const item = items.find((i) => i.key.includes(proj.id));
    const lesson = lessonsById.get(proj.relatedLessonId);
    if (!item || !lesson) { ok(`${proj.id} resolves to a lesson and an item`, false); continue; }
    const q = lesson.quarter.split(' ')[0];
    const [from, to] = QUARTER_WEEKS[q] || [];
    ok(`${proj.id} sits in ${q}, the quarter its lesson is taught`,
      item.schoolWeek >= from && item.schoolWeek <= to,
      `week ${item.schoolWeek}, but ${lesson.id} is ${q} (weeks ${from}-${to})`);
  }

  ok('...and each is labelled a hands-on project, not a journal entry',
    projects.every((p) => items.find((i) => i.key.includes(p.id))?.typeLabel === 'Hands-on project'));
  ok('...under its own subject, so it reaches the right transcript line',
    projects.every((p) => items.find((i) => i.key.includes(p.id))?.subject === p.subject));

  /** The robotics run is a ladder: sensors, then thresholds, then motors... */
  const roboticWeeks = roboticsProjects
    .map((p) => ({ seq: lessonsById.get(p.relatedLessonId)?.sequenceInQuarter, w: items.find((i) => i.key.includes(p.id))?.schoolWeek }))
    .sort((a, b) => a.seq - b.seq);
  ok('the six robotics builds run in the order the lessons run',
    roboticWeeks.every((r, i) => i === 0 || r.w > roboticWeeks[i - 1].w),
    roboticWeeks.map((r) => `L${r.seq}=w${r.w}`).join(' '));
}

console.log('\n--- 2. the garden reaches the planner ---');
{
  const g = pf.gardenCalendarItems({ gardenLog: [], year: 2026 });
  const briefs = g.filter((i) => i.typeLabel === 'Garden (after school)');
  const builds = g.filter((i) => i.typeLabel === 'Garden build');
  const planting = g.filter((i) => i.immovable);

  ok('the Friday briefs are on the calendar', briefs.length > 40, `${briefs.length}`);
  ok('...and closed Fridays are excluded',
    briefs.length === gardenCalendar.filter((d) => !d.closed).length,
    'a holiday Friday is not a missed garden session');
  ok('...and every one falls on a Friday',
    briefs.every((i) => new Date(i.dueDate + 'T12:00:00').getDay() === 5));

  ok('all five builds are dated', builds.length === gardenBuildTrack.length, `${builds.length}`);
  ok('...each with a start date AND a due date',
    builds.every((b) => b.startBy && b.dueDate && b.startBy < b.dueDate),
    'both dates already existed in the briefs; nothing had ever read them as dates');

  ok('the planting windows are deadlines, not paragraphs', planting.length === 3, `${planting.length}`);
  ok('...and are marked immovable', planting.every((p) => p.immovable === true),
    'the app\'s own words: "the one deadline in this whole app that does not move"');
  ok('a planting logged just before the window counts',
    pf.gardenCalendarItems({ gardenLog: [{ kind: 'planting', date: '2026-08-14' }], year: 2026 })
      .find((i) => i.key === 'garden-planting::2026-08-15')?.done === true);
  ok('...and one logged long before does not',
    pf.gardenCalendarItems({ gardenLog: [{ kind: 'planting', date: '2026-07-01' }], year: 2026 })
      .find((i) => i.key === 'garden-planting::2026-08-15')?.done === false);

  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  ok('the garden has a row on his home screen', /label="Garden"/.test(dash),
    'no gd7-* id is in weeklyWritingSchedule, so the old path could never match');
  ok('...reading the garden calendar directly', /gardenForDate\(today, \{ gardenLog \}\)/.test(dash));
  ok('...and it opens the Garden screen', /onOpenGarden/.test(dash) && /onOpenGarden=\{\(\) => setView\('garden'\)\}/.test(read('src/App.jsx')));

  const friday = pf.gardenForDate('2026-08-14', { gardenLog: [] });
  const monday = pf.gardenForDate('2026-08-17', { gardenLog: [] });
  ok('a Friday returns that week\'s brief', Boolean(friday?.title), JSON.stringify(friday));
  ok('...and a Monday returns nothing', monday === null,
    'gardening is after school on Fridays — block-11 on the timetable');
}

console.log('\n--- 3. every planner view sees them ---');
{
  const items = pc.buildPlannerItems({
    assignments: [], academicAssignments: [], writingEntries: [], gardenLog: []
  });
  ok('buildPlannerItems includes the derived feeds',
    items.some((i) => i.source === 'writing-schedule') && items.some((i) => i.source === 'garden'),
    'this is what Daily, Weekly, Monthly and the Board all read');
  /**
   * Every source a planner item can carry. Updated Aug 29, 2026 for `fieldTrip`
   * and `mission`, the third and fourth dated sources.
   *
   * Worth noting how the omission surfaced: field trips were added on Aug 28
   * and this check did NOT fail, because the call above passes no field trips
   * so that source never appeared. Missions come from the QUARTER LIST rather
   * than from rows, so they show up whether or not anything is in the database
   * — and that is what finally exercised the list.
   *
   * The property is unchanged: an item must declare which source it came from,
   * so a derived item is never mistaken for a gradeable assignment record.
   */
  const KNOWN_SOURCES = ['writing-schedule', 'garden', 'academic', 'planner', 'milestone', 'fieldTrip', 'mission'];
  ok('...and they are still distinguishable from real assignments',
    items.every((i) => KNOWN_SOURCES.includes(i.source)),
    'a derived item has no assignment record, cannot be graded, and must never be mistaken for one: ' +
      [...new Set(items.map((i) => i.source))].filter((x) => !KNOWN_SOURCES.includes(x)).join(', '));
  ok('...and every item declares a source at all',
    items.every((i) => typeof i.source === 'string' && i.source.length > 0),
    'an item with no source cannot be told apart from anything');

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('Coming Up sees them too', /derivedPlannerItems\(\{ writingEntries, gardenLog \}\)/.test(parent));
}

console.log('\n--- 4. a due date now carries its run-up ---');
{
  // milestonesFor() needs a title as well as a due date, so a realistic row.
  const book = { title: 'Hatchet — book jacket redesign', type: 'Book Report', dueDate: '2026-10-09', status: 'not-started' };
  ok('a book report due Oct 9 must start Sep 18', ms.startByFor(book) === '2026-09-18',
    ms.startByFor(book));

  /**
   * The two routes to a start date MUST agree. When milestones exist, the start
   * date is the first one; when they do not, it is dueDate minus the lead days.
   * Those are separate calculations and nothing forces them to match — so this
   * checks that they do, for every type that has both. If someone adds a fifth
   * milestone to Book Report and forgets the lead-days table, this fails.
   */
  ok('...which is exactly the first milestone date',
    ms.startByFor(book) === ms.milestonesFor(book)[0].dueDate,
    'a milestone list and a lead-days table are two sources for one fact');
  for (const [type, days] of Object.entries(ms.LEAD_DAYS_BY_TYPE)) {
    if (!ms.hasMilestones(type)) continue;
    const row = { title: 'x', type, dueDate: '2026-10-09' };
    const steps = ms.milestonesFor(row);
    ok(`${type}: lead days match its milestone span`,
      (steps.length - 1) * 7 === days,
      `${days} lead days vs ${(steps.length - 1) * 7} from ${steps.length} milestones`);
  }

  ok('a type with no milestones still gets a lead time',
    ms.startByFor({ type: 'Reading Assignment', dueDate: '2026-08-28' }) === '2026-08-07',
    'a novel is not read the night before');
  ok('an unknown type falls back to a week, not to zero',
    ms.leadDaysFor('Something New') === ms.DEFAULT_LEAD_DAYS && ms.DEFAULT_LEAD_DAYS === 7);
  ok('no due date, no start date, no crash', ms.startByFor({ type: 'Book Report' }) === null);

  ok('too early reads as not-yet', ms.leadStatus(book, '2026-08-14') === 'not-yet');
  ok('the start day itself reads as start-now', ms.leadStatus(book, '2026-09-18') === 'start-now');
  ok('past the start day and untouched reads as BEHIND', ms.leadStatus(book, '2026-09-25') === 'behind',
    'not late yet, and already cannot be done properly in the time left — the state the app could not see');
  ok('...but not once he has started',
    ms.leadStatus({ ...book, status: 'in-progress' }, '2026-09-25') === 'underway');
  ok('...nor once it is finished',
    ms.leadStatus({ ...book, status: 'completed' }, '2026-09-25') === 'done');

  /**
   * ---- AND THE SAME FAULT ONE LEVEL DOWN (Aug 16, 2026) ----
   *
   * The parent, looking at a card headed "This week's step on longer work"
   * listing three books: "Why is it showing all these books to read when A Long
   * Walk to Water is the only book he should be reading right now?"
   *
   * Every milestone carried a finish-by date. None carried a begin date. So the
   * board asked for the first unticked step, which every assignment in the year
   * has, and printed three of them — one due in five weeks, one in eleven.
   *
   * The run-up fix above stopped at the assignment. This is inside it.
   */
  const report = { type: 'Book Report', dueDate: '2026-09-18', title: 'A Long Walk to Water', status: 'not-started' };
  ok('a step opens a lead time before its own deadline',
    ms.milestoneOpensOn(report, 0) === '2026-08-07',
    'read-by Aug 28 minus the 21 days the table already allows a Book Report');
  ok('...so mid-August the reading step is live', Boolean(ms.activeMilestone(report, '2026-08-16')));
  ok('...and in July it is not', ms.activeMilestone(report, '2026-07-20') === null);

  const later = { type: 'Book Report', dueDate: '2026-11-20', title: 'Red-Tail Angels', status: 'not-started' };
  ok('a book report due in November shows nothing in August',
    ms.activeMilestone(later, '2026-08-16') === null,
    'this is the row she reported: eleven weeks out, on his board, under a heading saying this week');

  ok('step 2 opens when step 1 is due', ms.milestoneOpensOn(report, 1) === '2026-08-28');
  ok('...or the moment step 1 is ticked, whichever is first',
    Boolean(ms.activeMilestone(
      { ...report, milestones: [
        { id: 'read', label: 'Read the book', dueDate: '2026-08-28', completedAt: '2026-08-20T12:00:00.000Z' },
        { id: 'notes', label: 'Notes', dueDate: '2026-09-04', completedAt: null }
      ] }, '2026-08-21')),
    'being ahead must never mean being told to wait');
  ok('everything ticked returns nothing, it does not loop',
    ms.activeMilestone({ ...report, milestones: [{ id: 'a', dueDate: '2026-08-01', completedAt: 'x' }] }, '2026-08-16') === null);

  const card = read('src/components/Dashboard/AcademicCenterCard.jsx');
  /**
   * CODE, NOT PROSE. The card's comment explains that it uses activeMilestone
   * and NOT currentMilestone — and an absence check run over the raw file is
   * failed by that explanation. This project has been caught by a guard reading
   * its own comment once before (the XP_PER_COIN check, Aug 12). Strip first.
   */
  const cardCode = card.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  ok('his board asks for the ACTIVE step, not the next unticked one',
    /activeMilestone\(a, today\)/.test(cardCode) && !/currentMilestone/.test(cardCode),
    'currentMilestone has an answer for every assignment in the school year');
  ok('...and the heading no longer claims a week it does not mean',
    /Working on now/.test(card) && !/This week's step/.test(card));
  ok('...and says so when it shows fewer than are open',
    /liveSteps\.length > thisWeeksSteps\.length/.test(card),
    'a silent top-3 reads as "that is all of it"');

  const parent = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('Coming Up says it out loud', /Should have started \{formatDate\(item\.startBy\)\}/.test(parent));

  /**
   * A ROW THAT NAMES A THING MUST OPEN THAT THING. (Aug 15, 2026.)
   *
   * The parent: "when book open is selected it takes him to all the book not
   * the specific one." The board named his book and Open landed him on a list
   * of every book in the year.
   *
   * This is the SECOND report of this exact fault — the Writing Journal row had
   * it in August, and its fix is recorded in these words: "Routing to the
   * journal list made him hunt for the assignment he had just been told to do."
   * Two instances is a pattern, so it gets a check rather than another comment.
   */
  const dash = read('src/components/Dashboard/MissionControlDashboard.jsx');
  /**
   * ---- IT OPENED A BOOK ID AS AN ASSIGNMENT (Aug 26, 2026) ----
   *
   * This asserted the literal `onOpenAcademicCenter(currentBook.id)` — and
   * that expression was itself the bug. `currentBook.id` is a BOOK id;
   * the parameter was read as an ASSIGNMENT id, from a different table with
   * its own auto-increment. In her live database "A Long Walk to Water" is
   * book 6, so Open sent him to the assignments tab pointed at assignment 6:
   * a different piece of work.
   *
   * The check now asserts the id is TYPED, which is the only version of this
   * property that can be right.
   */
  ok('the book row opens THAT book, as a book',
    /onOpenAcademicCenter\(\{ kind: 'book', id: currentBook\.id \}\)/.test(dash),
    'a bare id cannot say what it is an id of');
  ok('...and the journal row still opens THAT prompt',
    /onStartWeeklyProject\(nextJournalPrompt\)/.test(dash));
  ok('...and the daily drill opens THAT drill',
    /onStartWeeklyProject\(todaysDrill\)/.test(dash));

  const home = read('src/components/Academic/AcademicHome.jsx');
  const view = read('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('the Academic Center accepts a focus', /focus = null/.test(home));
  /**
   * The old form of this check was `focusAssignmentId ? 'assignments' :
   * 'books'` — it asserted that ANY focus lands on Assignments, which is
   * precisely what made a book focus wrong. The tab must follow the KIND.
   */
  ok('...and lands on the tab that matches what it was given',
    /useState\(focus\?\.kind === 'assignment' \? 'assignments' : 'books'\)/.test(home),
    'any-focus-means-assignments is how a book id ended up highlighting an assignment');
  ok('...routing a book focus to the book list and an assignment focus to the assignment list',
    /focusBookId=\{focus\?\.kind === 'book' \? focus\.id : null\}/.test(home)
      && /focusAssignmentId=\{focus\?\.kind === 'assignment' \? focus\.id : null\}/.test(home));

  const lib = read('src/components/Academic/BookLibraryView.jsx');
  ok('...and the book list can actually focus a book',
    /focusBookId = null/.test(lib) && /scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/.test(lib),
    'it had no focus support at all, so even a correctly typed book id arrived and did nothing');

  /**
   * ---- THE THIRD REPORT OF THE SAME RULE (Aug 26, 2026) ----
   *
   * The parent: **"there isn't a link to lead him to the assignment from his
   * mission page. Open leads to the Book library not the assignment."**
   *
   * The Writing Journal row had this fault, then the reading row on Aug 15,
   * and each was fixed where it stood. `AcademicCenterCard` — the card that
   * lists his book, his current step and everything due this week — never got
   * the rule: not one row was clickable, and Open was wired straight to the
   * handler so it received a click EVENT and fell through to the library.
   *
   * **Fixing one call site is not fixing a rule.** So the rule is asserted on
   * the whole card, not on one row of it.
   */
  const acCard = read('src/components/Dashboard/AcademicCenterCard.jsx');
  ok('the Academic Center card opens the work he is in the middle of',
    /primaryStep\s*$|primaryStep\s*\n?\s*\?\s*\{ kind: 'assignment'/m.test(acCard.replace(/\s+/g, ' '))
      || /primaryStep \? \{ kind: 'assignment', id: primaryStep\.assignment\.id \}/.test(acCard.replace(/\s+/g, ' ')),
    'Open used to receive a click event and land on a list of twenty books');
  ok('...its book rows open that book',
    /onOpenAcademicCenter\?\.\(\{ kind: 'book', id: book\.id \}\)/.test(acCard));
  ok('...its step rows open that assignment',
    /onOpenAcademicCenter\?\.\(\{ kind: 'assignment', id: assignment\.id \}\)/.test(acCard));
  ok('...and its due rows open theirs',
    /kind: 'assignment', id: assignmentFor\(item\)\.id/.test(acCard));

  /**
   * ---- TWO DATES ON ONE ROW (Aug 26, 2026) ----
   *
   * The parent: **"it has an assignment to build or draw a well that is due
   * Aug 28th but I don't see anything about that. I found the build or draw a
   * well but it states that it is due Sept 18th."**
   *
   * Both dates were real: the book report is due Sep 18, and step 1 of 4 of it
   * is due Aug 28. The row printed the PROJECT title beside the STEP date with
   * nothing saying which was which, so she read it as written and went looking
   * for a well due on the 28th.
   *
   * A row carrying two deadlines has to name both of them.
   */
  ok('a step row labels the step\'s deadline as the step\'s',
    /This step by \{shortDay\(step\.dueDate\)\}/.test(acCard));
  ok('...and names the whole project\'s separately',
    /whole project due \{shortDay\(assignment\.dueDate\)\}/.test(acCard),
    'the project title sat next to the step date with nothing distinguishing them');
  ok('...and only when the two actually differ',
    /assignment\.dueDate !== step\.dueDate/.test(acCard),
    'printing the same date twice would be noise on the last step of every project');
  /**
   * ---- ONE DATE, AND THE ROW DID NOT SAY WHICH END IT WAS (Aug 26, 2026) ----
   *
   * The parent, on "Hatchet — Gary Paulsen · Due Fri, Sep 18 · Weekly chapter
   * pacing": **"Why isn't this mentioned. Does this actually mean to start
   * Sept 18th?"**
   *
   * Two faults, one cause — the app knew and the screen never said.
   *
   *   1. Sep 18 is the FINISH date. `startByFor` has said since Aug 14 that a
   *      Reading Assignment needs 21 days of lead, making Hatchet's start date
   *      Aug 28. That reached the Parent Dashboard and nowhere else, so the
   *      row he reads showed one bare date on three weeks of reading.
   *   2. His board never mentioned it at all. The card asks only "what is due
   *      in seven days"; a Reading Assignment gets no milestones by design, so
   *      it had no step row either. He would have first heard of it on Sep 11.
   */
  const asgView = codeOnly('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('an assignment row names the start of the work, not only its deadline',
    /Start by \{formatDueDate\(startBy\)\}/.test(asgView),
    'one unlabelled date on three weeks of reading read as the day to begin');
  ok('...and relabels the deadline as the finish once both are shown',
    /startBy \? 'Finish by' : 'Due'/.test(asgView));
  ok('...and stays quiet once he has started it',
    /startState === 'not-yet' \|\| startState === 'start-now' \|\| startState === 'behind'/.test(asgView),
    "telling him to start what he started is how a board teaches him to stop reading it");
  ok('...and never prints the same date twice',
    /rawStartBy !== assignment\.dueDate/.test(asgView));

  const acCode = codeOnly('src/components/Dashboard/AcademicCenterCard.jsx');
  ok('the board catches work that has to START this week, not only work due',
    /startBy <= through/.test(acCode) && /startingSoon/.test(acCode),
    'a deadline first mentioned after the start date has passed is a surprise, not a deadline');
  ok('...and does not repeat what the due list already shows',
    /a\.dueDate <= through\) return false/.test(acCode));
  ok('...nor what "Working on now" already shows',
    /stepIds\.has\(a\.id\)\) return false/.test(acCode));
  ok('...and labels both ends of the row it prints',
    /Start by \{shortDay\(startBy\)\}/.test(acCode)
      && /finish by \{shortDay\(assignment\.dueDate\)\}/.test(acCode));
  ok('...and that row opens the assignment it names',
    /startingSoon\.map[\s\S]{0,400}?kind: 'assignment', id: assignment\.id/.test(acCode));

  /**
   * The behaviour, on her real Aug 23 export rather than on the shape of the
   * code: on Aug 26, Hatchet is the one thing that has to start this week.
   */
  {
    const hatchet = {
      id: 6, title: 'Hatchet — Gary Paulsen', subject: 'reading',
      type: 'Reading Assignment', dueDate: '2026-09-18', status: 'not-started'
    };
    const today = '2026-08-26';
    const through = '2026-09-02';
    ok('Hatchet has to be underway by Aug 28, three weeks before it is due',
      ms.startByFor(hatchet) === '2026-08-28',
      ms.startByFor(hatchet));
    ok('...so on Aug 26 it falls inside the start-this-week window',
      ms.startByFor(hatchet) <= through && hatchet.dueDate > through);
    ok('...and it is not yet late — the window opens before the nagging does',
      ms.leadStatus(hatchet, today) === 'not-yet');
    ok('...and once he starts it, the board stops asking',
      ms.leadStatus({ ...hatchet, status: 'in-progress' }, today) === 'underway');
  }

  ok('...scrolls the row into view', /scrollIntoView\(\{ behavior: 'smooth', block: 'center' \}\)/.test(view),
    "opening the right tab is not enough on a screen holding twenty rows");
  ok('...and says why it is highlighted', /Sent here from your board/.test(view));

  /**
   * TONIGHT'S READING, LOGGED FROM THE BOARD. (Aug 15, 2026.)
   *
   * Nova was reporting "No independent reading logged" while he was reading two
   * chapters a night. Both true: the Reading Log is a separate record, and
   * filling it meant leaving the board and typing four fields about a book the
   * app already knew he was reading. So the log stayed empty and his Georgia
   * record showed no independent reading at all.
   */
  const store2 = read('src/store/useAppStore.js');
  ok('the board can log tonight\'s reading', /async logBookReading\(assignment\)/.test(store2));
  ok('...and un-log it', /async unlogBookReading\(assignment\)/.test(store2));
  ok('...refusing to log the same book twice in one night',
    /r\.title === title && r\.date === date/.test(store2),
    'two taps in one evening must not become four chapters');
  ok('...removing only TODAY\'s row when undone',
    /r\.title === assignment\.title && r\.date === date/.test(store2));
  ok('the amount is the parent\'s stated pacing, not a guess',
    /Number\(assignment\.pacingAmount\) \|\| 2/.test(store2) && /assignment\.pacingUnit \|\| 'chapters'/.test(store2));
  ok('...and the row shows it before he taps',
    /tick to log \$\{currentBook\.pacingAmount \|\| 2\}/.test(dash),
    'a number that reaches a legal record must never be one nobody chose');
  /**
   * SCOPED TO THE FUNCTION, NOT TO A CHARACTER COUNT. (Fixed Aug 16, 2026.)
   *
   * This check used to be a regex requiring bumpTodayAttendance and the return
   * statement within 120 characters of each other. Adding four lines to
   * logBookReading broke it — and it would have broken exactly the same way for
   * a change that was entirely correct, which is the definition of a guard
   * that costs more than it protects.
   *
   * This project has now made this mistake twice: the field-trip guard used
   * `store.slice(i, i + 3200)` and silently dropped six checks when the
   * function it was reading grew. **A guard must bound itself by the thing it
   * is describing — the function body — never by how long that thing was on
   * the day it was written.**
   */
  const logFn = (() => {
    const i = store2.indexOf('async logBookReading');
    return i === -1 ? '' : store2.slice(i, store2.indexOf('\n  },', i));
  })();
  ok('reading counts as instruction for the day',
    /bumpTodayAttendance\('lessonsCompleted'\)/.test(logFn) && /return \{ ok: true, amount, unit \}/.test(logFn),
    'a day he read is a day taught — the garden log bumps the same counter');
  ok('...and distinguishes start-now from behind', /Start today — this one needs the run-up/.test(parent));
}

console.log('\n--- 5. he can write the report in the app ---');
{
  const store = read('src/store/useAppStore.js');
  const writer = read('src/components/Academic/AssignmentWriter.jsx');
  const view = read('src/components/Academic/AcademicAssignmentsView.jsx');

  ok('the store can save his notes and his draft', /async saveAssignmentWriting\(assignmentId, field, text\)/.test(store));
  /**
   * ASSERT THE PROPERTY, NOT THE PUNCTUATION. This check used to require the
   * literal `{ notes: 'notesText', draft: 'draftText' }` and broke the day a
   * third field was added — which is a guard failing on a correct change, the
   * most expensive kind. What matters is that the map is CLOSED and that every
   * field the writer saves is in it.
   */
  const allowedLine = (store.match(/const ALLOWED = \{[^}]*\};/) || [''])[0];
  ok('...to a whitelisted field, not an arbitrary key',
    /const ALLOWED = \{/.test(allowedLine) && /if \(!key\) return \{ ok: false, error: 'Unknown field\.' \};/.test(store),
    'this writes to a record that also holds his grade');
  for (const field of ['notes', 'draft', 'final']) {
    ok(`...and "${field}" is one of them`,
      new RegExp(`${field}: '\\w+Text'`).test(allowedLine),
      allowedLine);
  }
  ok('there are TWO boxes, not one',
    /Notes &amp; structure/.test(writer) && /Rough draft/.test(writer),
    'collapsing them would delete the planning week the milestone exists to protect');
  ok('the format outline can be loaded into the draft',
    /Start from the outline/.test(writer) && /outlineTemplate/.test(writer),
    'the outline existed as bullets he had to hold in his head while typing elsewhere');
  ok('...and it can never overwrite work in progress',
    /draft\.trim\(\) === ''/.test(writer));
  ok('the checklist is tickable on Edit & finish', /Edit &amp; finish/.test(writer) && /setChecked/.test(writer));
  ok('...and is not printed twice on the same card',
    !/Before you turn it in/.test(view),
    'the same list in two places gets ticked in neither');
  ok('the writer is mounted on real assignments', /<AssignmentWriter/.test(view));

  /**
   * ---- HOW LONG IS IT SUPPOSED TO BE (Aug 26, 2026) ----
   *
   * The parent: **"when it states 1 paragraph a day. There should be an amt of
   * paragraphs that is needed. Like how many paragraphs a 7th grader should
   * have for a book report."**
   *
   * The app gave him the PACE and never the SIZE. "One paragraph a day" with
   * no total is a treadmill with no off switch.
   */
  const rf = await import(REPO + '/src/academies/lamar/data/academicSuccessCenter/reportFormats.js');
  const everyFormat = [
    ...rf.BOOK_REPORT_FORMATS,
    ...rf.PRESENTATION_FORMATS,
    ...rf.RESEARCH_PAPER_FORMATS,
    ...rf.PORTFOLIO_ENTRY_FORMATS
  ];
  const noSize = everyFormat.filter((f) => !rf.sizeFor(f)).map((f) => f.id);
  ok(`every one of the ${everyFormat.length} formats says how long it is`, noSize.length === 0, noSize.join(', '));
  const noHeadline = everyFormat.filter((f) => !rf.sizeFor(f)?.headline || !rf.sizeFor(f)?.pace).map((f) => f.id);
  ok('...with both a target and a day-by-day pace', noHeadline.length === 0, noHeadline.join(', '));
  const orphanSizes = Object.keys(rf.FORMAT_SIZE).filter((id) => !everyFormat.some((f) => f.id === id));
  ok('...and no size belongs to a format that does not exist', orphanSizes.length === 0, orphanSizes.join(', '));

  /**
   * The number he sees on a book report is not rounded off a table — it is the
   * outline this app already gives him: an opening plus one paragraph per
   * section, across the five days of the drafting week.
   */
  const traditional = rf.findFormat('Book Report', 'traditional');
  ok('a 7th-grade book report asks for 5 paragraphs, one per drafting day',
    rf.sizeFor(traditional).paragraphs === traditional.sections.length + 1,
    String(rf.sizeFor(traditional).paragraphs));
  ok('...and a research paper is longer than a book report',
    rf.sizeFor(rf.findFormat('Research Paper', 'person-study')).words[0] >
      rf.sizeFor(traditional).words[0]);
  const prog = rf.wordProgress(rf.sizeFor(traditional), 400);
  ok('the counter says what it is counting toward',
    prog.label === '400 of 350–500 words' && prog.state === 'in-range', JSON.stringify(prog));
  ok('...and knows when he is short', rf.wordProgress(rf.sizeFor(traditional), 100).state === 'short');
  ok('...and says nothing at all on a format measured in minutes',
    rf.wordProgress(rf.sizeFor(rf.findFormat('Book Report', 'podcast')), 100) === null,
    'a word count on a podcast is a number that means nothing');

  const viewCode = codeOnly('src/components/Academic/AcademicAssignmentsView.jsx');
  ok('the assignment card prints the length beside the outline',
    /How long/.test(viewCode) && /\{size\.headline\}/.test(viewCode) && /\{size\.pace\}/.test(viewCode),
    'the outline said what must be IN it and never how much of it');
  const writerCode = codeOnly('src/components/Academic/AssignmentWriter.jsx');
  ok('...and the draft box paces it by the day',
    /size\?\.pace \|\|/.test(writerCode) && /Target: \{size\.headline\}/.test(writerCode));
  ok('...and the live counter counts toward the target',
    /draftProgress \? draftProgress\.label/.test(writerCode));

  /**
   * ---- SOMEWHERE TO ACTUALLY FINISH IT (Aug 26, 2026) ----
   *
   * The parent: **"there isn't a location for the edit and finish. Is he to
   * write this in Google Docs?"** The step had a proofreading checklist and
   * nothing to proofread INTO.
   */
  ok('Edit & finish has a box, not just a checklist',
    /save\('final', final\)/.test(writerCode) && /Save final copy/.test(writerCode),
    'the only honest reading of that screen was "polish it somewhere else"');
  ok('...and it says the finished copy belongs here',
    /not in another program/.test(writerCode));
  ok('...as a separate field, so the revision is still evidence',
    /finalText/.test(writerCode) && /setFinal\(draft\)/.test(writerCode),
    'editing the draft in place would leave one text and no proof he revised it');
  ok('...and it can never overwrite work already in it',
    /final\.trim\(\) === '' && draft\.trim\(\) !== ''/.test(writerCode));
  ok('...and it appears even before a format has been picked',
    /format\?\.checklist\?\.length > 0 \|\| assignment\.draftText \|\| draft\.trim\(\)/.test(writerCode),
    'a finished report needs somewhere to live whether or not the format is chosen');

  /** She was scoring "Evidence — specific examples from the source" blind. */
  const picker = codeOnly('src/components/Academic/AssignmentFormatPicker.jsx');
  ok('the parent can read the work she is grading',
    /const shown = assignment\.finalText/.test(picker)
      && /: assignment\.draftText/.test(picker)
      && /\{shown\.text\}/.test(picker),
    'the rubric asked her to score evidence with the text nowhere on the screen');
  ok('...and is told which version she is looking at',
    /His finished copy/.test(picker) && /rough draft/.test(picker),
    'grading a rough draft believing it is the finished one is worse than not showing it');
}

console.log("\n--- this week's build is in the day, not beside it ---");
{
  /**
   * The parent: **"This weeks projects should be added to his rest of the day
   * because he is ignoring it."**
   *
   * It was a tile under a heading reading "nothing here is due today" — next
   * to Spelling list and Messages. Third report of this exact fault; the
   * Writing Journal and his current book were moved out of that row for the
   * same reason on Aug 7.
   */
  const board = codeOnly('src/components/Dashboard/MissionControlDashboard.jsx');
  ok("this week's project carries its own subject",
    /const HANDS_ON_SOURCES = \[/.test(board)
      && /subject: 'aerospace'/.test(board)
      && /subject: 'science'/.test(board)
      && /const weeksHandsOn =/.test(board),
    'a build with no subject could only ever have been a tile');
  ok('...so it can be given a timetable block',
    /blockId=\{BLOCK_FOR_SUBJECT\[weeksHandsOn\.subject\]\}/.test(board),
    'TimetableOrder sorts on the block — no block, no place in the day');
  ok('...and it names the Friday it is due',
    /handsOnDueFriday/.test(board) && /fridayOfSchoolWeek\(getSchoolWeekNumber\(/.test(board));
  ok('...from plannerFeeds, not a second copy of the school calendar',
    /from '\.\.\/\.\.\/lib\/plannerFeeds\.js'/.test(board) && /fridayOfSchoolWeek/.test(board),
    'two copies of the week-to-Friday rule is a drift bug waiting to happen');
  ok('...and it is no longer ALSO a quiet tile',
    !/title="This Week's Project"/.test(board),
    'the same build in two places, one of them under "nothing here is due today"');

  // The behaviour: on Aug 26 2026 the scheduled build is the parachute drop,
  // it resolves to Aerospace, and Aerospace has a block.
  const { getThisWeeksScheduledIds } = await import(REPO + '/src/academies/lamar/data/writing/weeklySchedule.js');
  const { aerospaceProjects } = await import(REPO + '/src/academies/lamar/data/aerospace/aerospaceProjects.js');
  const { BLOCK_FOR_SUBJECT } = await import(REPO + '/src/lib/scheduledMinutes.js');
  const ids = getThisWeeksScheduledIds(new Date('2026-08-26T12:00:00'));
  const build = ids.map((id) => aerospaceProjects.find((p) => p.id === id)).filter(Boolean)[0];
  ok("the week of Aug 26 really does carry a build", Boolean(build), ids.join(', '));
  ok('...and its subject has a block on the timetable',
    Boolean(BLOCK_FOR_SUBJECT.aerospace), BLOCK_FOR_SUBJECT.aerospace);
  ok('...due the Friday of school week 4',
    pf.fridayOfSchoolWeek(pf.getSchoolWeekNumber(new Date('2026-08-26T12:00:00'))) === '2026-08-28');
}

console.log('\n--- 6. the journal says when things are due ---');
{
  /**
   * ---- WHERE THIS CAME FROM (Aug 17, 2026) ----
   *
   * The parent, looking at the Writing Journal: "Why doesn't it show where all
   * the journals are linked to and when they are due?"
   *
   * The dates had existed since Aug 14 — 93 dated writing items and 5 dated
   * garden builds. That screen grouped by CATEGORY and printed difficulty and
   * estimated minutes: the shape of the DATA, not the shape of the week.
   *
   * **The fourth time in this project the data was right and the screen was not
   * asking.** After the planner, the compliance packet and the HQ floor.
   */
  const journal = read('src/components/Writing/WritingJournal.jsx');
  const code = journal.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const order = read('src/lib/academicOrder.js');
  const orderCode = order.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

  ok('there is exactly ONE card renderer',
    (code.match(/<ScheduleLine /g) || []).length === 1
      && (code.match(/cards\.map\(/g) || []).length === 1,
    'seven near-identical blocks were seven chances for one of them to lose its date');
  ok('...reading BOTH feeds through one helper', /scheduleForItem\(/.test(code),
    'week-numbered work and garden builds are dated by different feeds; a screen that knew one would call six items unscheduled');
  ok('...and it looks the date up ONCE per card',
    /schedule: scheduleForItem\(/.test(code) && /<ScheduleLine schedule=/.test(code),
    'the date a card sorts on and the date it prints come off the same lookup, so they cannot disagree');

  /**
   * ---- THE SECOND ASK, SAME DAY ----
   *
   * "filter the cards so that its from the latest due to the last due."
   *
   * The dates landed and the grouping stayed, so the screen still read as six
   * source files. One run of cards, next-due first, undated at the foot.
   */
  ok('the catalogue is one date-ordered list, not seven category sections',
    /orderScheduledCards\(/.test(code)
      && !/renderExperimentSection/.test(code)
      && !/Hands-On Science Experiments/.test(code),
    'the section headings are gone; the kind survives as a chip on the card');
  ok('...the kind is still on every card', /\{kind\}/.test(code),
    'Robotics and Garden work look alike on a date alone');
  ok('...and the ordering decision lives in academicOrder, with the other three',
    /orderScheduledCards/.test(order) && /scheduleSortDate/.test(order),
    'books, assignments, portfolio and now this - one file owns what order a list comes in');
  ok('...undated items sort LAST, never first',
    /if \(!ad\) return 1;/.test(orderCode) && /if \(!bd\) return -1;/.test(orderCode),
    "an empty date string sorts above every real one, which is the bug being fixed");
  ok('...a card sorts on the date it PRINTS',
    /if \(schedule\.next\) return schedule\.next\.dueDate/.test(orderCode),
    'a repeating prompt prints its NEXT date, so that is the date it sorts on');
  ok('...month headings keep a 46-card run readable', /monthLabel\(/.test(code));
  ok('there is a "what is next" section above the catalogue', /Coming up/.test(journal));
  ok('...ordered by due date, not by category',
    /upcomingRows = cards\.filter/.test(code),
    'it slices the already-ordered list rather than sorting a second time');
  ok('...with anything missed shown first',
    /!c\.schedule\.next && c\.schedule\.missed > 0/.test(code));
  ok('...and it says the list below is the whole year',
    /Everything below is the full year/.test(journal),
    'so the catalogue does not read as a to-do list');

  ok('a repeating prompt shows how many times it runs', /times > 1/.test(code),
    'Mission Report comes round seven times; one date would be a lie for six of them');
  ok('an unscheduled item says so plainly rather than showing a blank',
    /Not on the schedule/.test(journal));
  ok('dates never go through new Date on a bare date string',
    /parseDateStr\(dateStr\)/.test(code) && !/new Date\(dateStr\)/.test(code),
    'the UTC-midnight bug this project has hit four times');
}

console.log('\n--- 7. every journal item is dated somewhere ---');
{
  const { writingPrompts } = await import(REPO + '/src/academies/lamar/data/writing/writingPrompts.js');
  const { scienceExperiments } = await import(REPO + '/src/academies/lamar/data/science/scienceExperiments.js');
  const { gardenProjects } = await import(REPO + '/src/academies/lamar/data/gardening/gardenProjects.js');
  const everything = [...writingPrompts, ...scienceExperiments, ...gardenProjects];
  const undated = everything.filter((i) => !pf.scheduleForItem(i.id, { today: '2026-08-17' })).map((i) => i.id);

  /**
   * ---- ONE KNOWN GAP, NAMED RATHER THAN HIDDEN (Aug 17, 2026) ----
   *
   * gd7-project-moisture-capstone — 'The Sensor That Knows' — is the sixth
   * garden project and gardenBuildTrack holds five. It has no opening or
   * closing brief, so there is no date to derive and none was invented: when a
   * capstone runs is a curriculum decision, not a gap to paper over.
   *
   * The card says 'Not on the schedule — do it any time', which is true. This
   * check exists so that if a SECOND item ever goes undated it fails loudly,
   * instead of the exception quietly becoming the rule.
   */
  const KNOWN_UNDATED = ['gd7-project-moisture-capstone'];
  ok('the only undated item is the garden capstone, which is a decision not a bug',
    undated.every((id) => KNOWN_UNDATED.includes(id)),
    undated.filter((id) => !KNOWN_UNDATED.includes(id)).join(', '));
  ok('...and it is still only one', undated.length <= 1, undated.join(', '));

  const garden = pf.scheduleForItem('gd7-project-sun-survey', { today: '2026-08-17' });
  ok('a garden build carries a school week like everything else',
    garden && Number.isFinite(garden.show.schoolWeek),
    'a dash beside one item reads as missing data, not as a different kind of scheduling');
  ok('...and its start-by date reaches the card', garden && garden.startBy === '2026-08-14');
}


console.log('\n--- the done-check gets the evidence it decides on ---');
{
  /**
   * The parent: **"Why is the rocket bottle still due? I already read and
   * graded it."**
   *
   * She had, weeks earlier. Two feeds computed the same fact and disagreed:
   * writingScheduleCalendarItems({ writingEntries }) said done; the planner
   * said overdue. Same function underneath — `derivedPlannerItems` passes its
   * sources straight through, and every caller of buildPlannerItems omitted
   * `writingEntries` and `gardenLog`. Both defaulted to [], so EVERY writing
   * journal item and EVERY garden task in the app was permanently unfinished,
   * on the board and on all three Scheduler views.
   *
   * A default of [] for "the evidence this was finished" reads as "nothing was
   * finished", and never errors.
   */
  const callers = [
    'src/components/Dashboard/MissionControlBoard.jsx',
    'src/components/Scheduler/DailyView.jsx',
    'src/components/Scheduler/MonthlyView.jsx',
    'src/components/Scheduler/WeeklyView.jsx'
  ];
  for (const file of callers) {
    const src = read(file);
    /**
     * Comments stripped first. The comment explaining this very fix quotes the
     * broken call — `buildPlannerItems({ assignments, academicAssignments })` —
     * so scanning the raw file finds a call site that does not exist. Fifth
     * time in this project a guard has been defeated by its own explanation.
     */
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/^\s*\/\/.*$/gm, '');
    const calls = code.match(/buildPlannerItems(?:ByDate)?\(\{[\s\S]{0,220}?\}\)/g) || [];
    ok(`${file.split('/').pop()} passes the evidence to the planner`,
      calls.length > 0 && calls.every((c) => /writingEntries/.test(c) && /gardenLog/.test(c)),
      `${calls.length} call site(s)`);
    ok(`...and subscribes to both, so they are not undefined at runtime`,
      /s\) => s\.writingEntries/.test(code) && /s\) => s\.gardenLog/.test(code),
      'an undefined identifier is a runtime error verify-parses cannot see');
  }

  // The behaviour itself, on real data rather than on the shape of the call.
  const { writingScheduleCalendarItems } = pf;
  /**
   * MIDDAY ON PURPOSE. The real entry is 2026-08-17T01:42Z, which is Aug 16 in
   * her timezone and Aug 17 in the container's — so a fixture built from it
   * passes in her browser and fails in CI, testing the clock instead of the
   * code. This project has been bitten by local-vs-UTC dates five times; a
   * guard written to prove it must not depend on it.
   */
  const graded = [{ promptId: 'ae7-bottle-rocket', completedAt: '2026-08-12T15:00:00.000Z' }];
  const withEvidence = writingScheduleCalendarItems({ writingEntries: graded })
    .filter((i) => i.key.includes('bottle-rocket'));
  const without = writingScheduleCalendarItems({})
    .filter((i) => i.key.includes('bottle-rocket'));
  ok('a finished entry marks its scheduled item done',
    withEvidence.length > 0 && withEvidence.every((i) => i.done));
  ok('...and with no evidence passed, the same item reads unfinished',
    without.length > 0 && without.every((i) => !i.done),
    'this is the failure, reproduced — which is why the call sites are checked above');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
