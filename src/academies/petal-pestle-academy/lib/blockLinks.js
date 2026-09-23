// ---------------------------------------------------------------------------
// WHAT A BLOCK ON HER DAY ACTUALLY OPENS.
//
// The grandmother asked whether the schedule connected to the lessons. It did
// not. Each block named a subject and carried a note saying "Khan Academy — the
// unit on My Plan", which means: leave this screen, go to My Plan, find the
// right row, read the unit name, open Khan, find that unit. Six steps to start
// a thirty-minute maths block.
//
// A nine-year-old does not do six steps. She does the first one and then asks
// somebody, or she does something else. A timetable that names a subject
// without opening it is a poster, not a tool.
//
// So a block now resolves to a destination, and the destination is computed
// from HER OWN measured level — the same lookup My Plan uses, so the two can
// never disagree.
//
// ---- WHICH UNIT, WHEN A SUBJECT HAS SEVERAL STRANDS ----
//
// "Mathematics" covers five strands. Sending her to all five is not an answer.
// It sends her to the LOWEST one — the same priority rule My Plan sorts by,
// because the point of measuring was to find where to start.
//
// ---- WHERE THIS DELIBERATELY REFUSES TO GUESS ----
//
// Social Studies has no entry in the Khan map, because I have not yet checked
// what Khan actually offers at 4th-grade level — that is an open item, written
// down and owed. So this returns nothing for it, and the button does not
// appear. Sending a nine-year-old to a history unit written for a
// seventh-grader is worse than sending her nowhere: she opens it, hits a wall,
// and learns that her schedule lies to her.
//
// Science has a Khan course but no measured level, because Science was cut
// from the Check-In on purpose. So it links to the COURSE and says so, rather
// than inventing a unit from a level nobody measured.
// ---------------------------------------------------------------------------

import { khanFor, KHAN_COURSES } from '../data/khan/khanMap.js';
import {
  nextUnitFor,
  nextUnitForStrand,
  courseChallengeUrl,
  KHAN_UNIT_COURSES
} from '../data/khan/khanUnits.js';
import { strandLabel } from '../config/strands.js';
import { ALL_LESSONS } from '../data/lessons/appCourses.js';
import {
  isRotatingBlock,
  courseForBlockOnDay,
  courseFinished,
  nextLessonFor,
  isoWeekday
} from './rotatingBlock.js';

/**
 * ONE LESSON, NOT A COURSE INDEX. v3.79.
 *
 * Gigi, Aug 25 2026: "her today prompt just sends her to the lesson she is to
 * complete and she doesn't see the other lessons."
 *
 * Every one of the four courses this app teaches used to return
 * `{ kind: 'view', view: 'lessons', course }` — the course index. The v2.0 note
 * at the top of this file is about removing six steps from starting a maths
 * block; this removes the last one from starting an app-course block, and it is
 * the SAME correction the Khan side got at v3.20 ("her schedule opened a course
 * index, not her unit"). The app's own courses had been sitting on that bug for
 * fifty-nine versions, on the other side of the same file.
 *
 * ⚠️ `lessonsRead` IS NOT OPTIONAL FOR THIS TO BE RIGHT, and it is already
 * optional in the signature — a caller that omits it gets "she has done
 * nothing" and lands her on lesson one of ninety-six, for ever. check-links
 * already asserts TodayView passes it, for the label; check-lesson-gate now
 * asserts it for the target, because the cost of omitting it changed from a
 * wrong word to a wrong lesson.
 *
 * Falls back to the course index rather than returning null when the course has
 * no next lesson to give. A block that opens nothing is the dead end this file
 * exists to prevent, and every caller that could reach this line has already
 * handled "finished" above it.
 */
function lessonTarget(courseId, label, detail, lessonsRead) {
  const next = nextLessonFor(courseId, lessonsRead || []);
  if (!next) {
    return { kind: 'view', label, view: 'lessons', course: courseId, detail };
  }
  const lesson = ALL_LESSONS.find((l) => l.id === next.lessonId);
  return {
    kind: 'lesson',
    label: lesson?.title ? `Open ${lesson.title}` : label,
    view: 'lessons',
    course: courseId,
    lessonId: next.lessonId,
    detail: `${detail} · Week ${next.week.n} · ${next.week.title}`
  };
}

/**
 * Which diagnostic strands feed which timetable subject.
 *
 * Only subjects the Check-In actually measures appear here. The rest are
 * handled explicitly below, where their limitations can be stated.
 */
export const SUBJECT_STRANDS = {
  math: ['numbers-operations', 'fractions-decimals', 'measurement-data', 'geometry', 'patterns-algebra'],
  reading: ['reading-comprehension', 'vocabulary'],
  writing: ['grammar-usage', 'writing-strategies']
};

/** Subjects a grown-up can attach to a block in the Grown-Up Corner. */
export const SUBJECT_OPTIONS = [
  ['', 'Nothing to open'],
  ['math', 'Mathematics (Khan)'],
  ['reading', 'Reading (Khan)'],
  ['writing', 'Language Arts & Writing (Khan)'],
  // v3.42: these two said "(Khan)". Khan teaches neither at her level and never
  // did — this app does, and has since v3.30 and v3.37. A label that names the
  // wrong teacher is how the wrong decision underneath it survived.
  ['science', 'The Science Lab'],
  ['social', 'Social Studies'],
  ['herbalism', 'Herbalism & Botany'],
  ['body', 'The Human Body'],
  ['journal', 'The Journal'],
  ['notes', 'Notes from Gigi and Mom']
];

/**
 * Where a block goes when its course has run out for the year.
 *
 * ⚠️ THE LABEL SAYS "Garden & Projects" AND ONLY THE GARDEN HAS A SCREEN.
 * A browsable projects area is still on the backlog (§4.1 remainder), so this
 * opens the greenhouse, which is where the garden lives, and the detail says
 * garden rather than promising a projects page that does not exist. Written
 * down here rather than papered over, because a button whose words overstate
 * where it goes is the same dead end as a button that goes nowhere.
 *
 * ⚠️ AND THIS PATH HAS STILL NEVER BEEN SEEN ON HER REAL DATA — the v3.31
 * caveat, unchanged. It needs 24 finished Social Studies weeks or 16 finished
 * Science Lab weeks to appear. Tested against made-up progress; every case
 * passes. NOT claimed to have been observed.
 */
function gardenTarget() {
  return {
    kind: 'view',
    label: 'Open my greenhouse',
    view: 'greenhouse',
    detail: 'Your garden'
  };
}

function socialTarget(lessonsRead) {
  return lessonTarget('social', 'Open my Social Studies lessons', 'Social Studies', lessonsRead);
}

/**
 * The Human Body — a notice while it is unwritten, a real link the moment it is not.
 *
 * ⚠️ THIS WAS HARD-CODED TO THE NOTICE UNTIL v3.46, AND THAT MADE A PROMISE
 * FALSE.
 *
 * At v3.42 the unlinked exemption in check-links was made DERIVED, and the
 * comment there said: *"it will fail itself the day The Human Body gets its
 * first week."* It did not. Module 1 landed with four lessons, forty questions
 * and two registered weeks — and her Tuesday block still read "still being
 * written", because the notice was returned unconditionally from here.
 *
 * The derived exemption was real; the thing it guarded was not reachable from
 * it. A promise a check makes in a comment is not a promise the check keeps.
 *
 * It is derived from the same fact now — DOES THE COURSE HAVE WRITTEN LESSONS —
 * so Tuesday and Thursday open the moment a lesson exists, with no edit here.
 */
function bodyTarget(lessonsRead) {
  const written = ALL_LESSONS.filter((l) => l.course === 'humanbody').length;
  if (written === 0) {
    return {
      kind: 'notice',
      label: 'The Human Body',
      detail: 'This course is still being written. There is nothing to open yet.'
    };
  }
  return lessonTarget('humanbody', 'Open my Human Body lessons', 'The Human Body', lessonsRead);
}

/**
 * Resolve a block to something she can press.
 *
 * Returns one of:
 *   { kind: 'khan',   label, url, detail }                     — opens Khan in a new tab
 *   { kind: 'lesson', label, view, course, lessonId, detail }  — opens ONE lesson (v3.79)
 *   { kind: 'view',   label, view, course, detail }            — moves to a tab in this app
 *   { kind: 'notice', label, detail }                          — words, no button
 *   null                                                       — no button, on purpose
 *
 * 'lesson' carries `view` and `course` as well as `lessonId`, so a caller that
 * only understands 'view' still lands on the right course rather than on
 * Herbalism. It degrades to the v3.42 behaviour instead of breaking — but
 * check-lesson-gate asserts TodayView passes the lesson on, because a target
 * that quietly loses the thing it exists to carry is the v3.42 bug again.
 *
 * `course` is optional and only meaningful for view 'lessons'. Without it,
 * LessonsView opens whatever course sits first in APP_COURSES — which is
 * Herbalism. That is why v3.42 carries it: linking the Social Studies block to
 * the lessons tab and letting it land on Herbalism is the v3.20 bug wearing a
 * new coat, "her schedule opened a course index, not her unit".
 *
 * ---- `lessonsRead` AND `date` ARE NOT DECORATION ----
 *
 * The 2:45 block rotates: Social Studies on Monday and Wednesday, The Human
 * Body on Tuesday and Thursday. Until v3.42 the LABEL knew that — it is built
 * by blockLabelOnDay(block, date, ..., lessonsRead) — and the TARGET did not,
 * because this function only ever received the block. So the block could say
 * "The Human Body" while the only thing that could decide what it opened was
 * looking at the string 'social'.
 *
 * A label and a link reading two different facts is how a screen tells a child
 * one thing and does another. Both now read the same two inputs, and
 * check-links asserts that TodayView passes them — because an optional
 * argument that must always be passed is a rule nobody enforces (v3.31, and it
 * fired again at v3.40).
 */
export function resolveBlockTarget(block, strands = {}, grades = [], lessonsRead = null, date = new Date()) {
  // ---- SINGING & MOVEMENT — MATCHED BY ID, DELIBERATELY ABOVE THE GUARD ----
  //
  // Azianna asked for the singing and yoga course on Aug 19. The block has sat
  // on her schedule since v3.2 with nothing behind it, because it carries no
  // `subject` and the guard below returns null for anything that does not.
  //
  // ⚠️ AND GIVING IT A SUBJECT WOULD HAVE BEEN THE WRONG FIX. `minutesOf()`
  // counts a block toward the Georgia instructional-minutes total ONLY when it
  // has a subject — so the one-word change that makes this button appear would
  // also have added fifteen minutes a day to a legal record, silently, and put
  // check-schedule's PROMISED_INSTRUCTIONAL_MINUTES out by 15.
  //
  // §9 is explicit that this is PARTICIPATION, NOT A GRADE. It is not
  // instruction and it must not be counted as instruction. So it is matched
  // here, by id, and the minutes arithmetic below never sees it.
  if (block?.id === 'blk-doing') {
    return {
      kind: 'view',
      label: 'Open Singing & Movement',
      view: 'movement',
      detail: 'Singing most days, yoga most days'
    };
  }

  const subject = block?.subject;
  if (!subject) return null;

  // ---- Khan subjects the Check-In measures ----
  const strandIds = SUBJECT_STRANDS[subject];
  if (strandIds) {
    // Lowest measured strand first — the same priority My Plan uses.
    const measured = strandIds
      .map((id) => ({ id, state: strands[id] }))
      .filter((s) => s.state && s.state.asked > 0)
      .sort((a, b) => a.state.level - b.state.level);

    if (measured.length === 0) {
      // Nothing measured yet. Send her to the grade-level course rather than
      // inventing a unit, and say plainly that the Check-In sharpens this.
      const fallback = { math: 'math4', reading: 'ela4', writing: 'grammar' }[subject];
      const course = KHAN_COURSES[fallback];
      if (!course) return null;
      return {
        kind: 'khan',
        label: course.label,
        url: course.url,
        detail: 'Finish the Check-In and this will point at your exact unit.'
      };
    }

    const lowest = measured[0];
    const khan = khanFor(lowest.id, lowest.state.level);
    if (!khan) return null;

    // ---- THE UNIT ITSELF, NOT THE COURSE FRONT PAGE ----
    //
    // Gigi, Aug 16 2026, on what was wrong with the v3.19 Khan work:
    // "Links to the course front page" - it should link to "the unit itself".
    //
    // This line used to hand back `khan.courseUrl`, which is an index of eight
    // to fourteen units. v2.0 removed six steps from starting a maths block and
    // left this one in: she still had to find her unit on a page of them.
    //
    // `unitUrl` is non-null only where the unit has been confirmed against
    // Khan's own rendered page and written into khanUnits.js. Everything else
    // falls back to the course, exactly as before - so a quarter whose links
    // are not confirmed yet degrades to the old behaviour instead of breaking.
    // ---- UNIT 1 FIRST, THEN 2, THEN 3 ----
    //
    // "Math just skips to unit 6 instead of starting at unit 1." It did, and
    // the cause was one rule doing two jobs: her lowest measured strand chose
    // the course AND the unit, so Measurement 2.00 landed her on Unit 6 with
    // Units 1-5 never opened and the Course Challenge unreachable.
    //
    // Her level still chooses the COURSE - that part of v2.0 is untouched and
    // right. The course now chooses the UNIT, in order, skipping only what she
    // already has a grade for.
    //
    // `nextUnitFor` returns null when every unit is graded, and that is when
    // the block offers the Course Challenge - the finish line she asked for.
    if (khan.unitCourse) {
      const course = KHAN_UNIT_COURSES[khan.unitCourse];
      // ---- v3.81 — HER STRAND WALKS ITS OWN LANE ----
      //
      // Gigi, Aug 25 2026, choosing between leaving the order alone and giving
      // each strand its own track: "B".
      //
      // `lowest.id` is the strand that CHOSE this course, and it is now also the
      // strand whose units she is given. Measurement & Data 2.50 opens Unit 5,
      // the first Measurement unit, instead of Unit 1 "Add and subtract within
      // 20" — which teaches Numbers & Operations, her 3.48 strand, and was
      // spending her weakest strand's half hour on her strongest.
      //
      // ⚠️ NOT the v3.20 bug. That was one strand choosing the course AND
      // jumping to Unit 6 with 1-5 never opened. Nothing is jumped here: each
      // lane starts at its own first unit and runs in order, every unit belongs
      // to exactly one lane, and the Course Challenge still needs all eight.
      //
      // `next.lane` is false when the strand has no lane — Patterns & Algebra,
      // which no 2nd Grade Math unit teaches, and both reading courses, whose
      // units are themes rather than strands. Then this is the whole course in
      // order, exactly as before, and the detail line says so rather than
      // claiming the unit is about her strand.
      const picked = nextUnitForStrand(khan.unitCourse, lowest.id, grades);
      const next = picked?.unit || null;
      const onHerLane = Boolean(picked?.lane);
      if (!next) {
        // ---- \u26a0\ufe0f FINISHING A LANE IS NOT FINISHING THE COURSE ----
        //
        // v3.81. Before lanes existed, "no next unit" could only mean every
        // unit of the course was graded, and offering the Course Challenge here
        // was right. It is not right now: the Geometry lane is ONE unit of
        // eight, so a child who grades it would have been handed the cumulative
        // final for a course she has done an eighth of.
        //
        // Gigi's own words at v3.76 are the rule: "the course challenge is the
        // test after all the units are completed." So the challenge asks the
        // WHOLE course, through nextUnitFor, which knows nothing about lanes.
        //
        // And when her lane is done but the course is not, she moves to the
        // rest of it in order rather than being told she has finished.
        const wholeCourseLeft = nextUnitFor(khan.unitCourse, grades);
        if (wholeCourseLeft) {
          return {
            kind: 'khan',
            label: wholeCourseLeft.name,
            url: `https://www.khanacademy.org${course.base}/${wholeCourseLeft.slug}`,
            detail: `${course.label} \u00b7 Unit ${wholeCourseLeft.n} of ${course.units.length}`,
            exact: true,
            courseId: khan.unitCourse,
            unitN: wholeCourseLeft.n
          };
        }
        const challenge = courseChallengeUrl(khan.unitCourse);
        if (challenge) {
          return {
            kind: 'khan',
            label: 'Course Challenge',
            url: challenge,
            detail: `${course.label} \u00b7 every unit done`,
            exact: true,
            // v3.74: carried out so the Grown-Up Corner can offer to record a
            // result for THE COURSE SHE IS ACTUALLY IN. A form that made Gigi
            // choose the course herself could disagree with the block, and a
            // grade filed against the wrong course advances nothing while
            // looking, on the record, exactly like one that did.
            courseId: khan.unitCourse,
            unitN: null,
            challenge: true
          };
        }
      } else {
        return {
          kind: 'khan',
          label: next.name,
          url: `https://www.khanacademy.org${course.base}/${next.slug}`,
          // On her lane the detail names the STRAND, because that is the claim
          // being made \u2014 "this unit is your Measurement work". Off a lane it
          // says unit N of M, the old wording, because that is all that is true.
          detail: onHerLane
            ? `${course.label} \u00b7 Unit ${next.n} \u00b7 your ${strandLabel(lowest.id)}`
            : `${course.label} \u00b7 Unit ${next.n} of ${course.units.length}`,
          exact: true,
          onHerLane,
          strandId: lowest.id,
          courseId: khan.unitCourse,
          unitN: next.n
        };
      }
    }

    const url = khan.unitUrl || khan.courseUrl;

    // `exact` is derived from the URL ACTUALLY RETURNED, not from whether a
    // unit link happened to exist. Its own negative test caught the difference:
    // with `exact: Boolean(khan.unitUrl)` it was possible to change the line
    // above to hand back the course front page and still have this flag say
    // "exact" - the check then had to catch the bug by a different route, and a
    // flag that can disagree with the thing it describes is a flag that will
    // eventually be believed. It now cannot lie about the url beside it.
    const exact = Boolean(khan.unitUrl) && url === khan.unitUrl;
    return {
      kind: 'khan',
      label: khan.unit,
      url,
      detail: exact ? `${khan.courseLabel} \u00b7 Unit ${khan.unitN}` : khan.courseLabel,
      exact
    };
  }

  // ---- Science: THE SCIENCE LAB, which this app teaches ----
  //
  // ⚠️ THIS RETURNED null UNTIL v3.42, AND GIGI FOUND IT ON SCREEN.
  //
  // The reason it returned null was true when it was written and stopped being
  // true two courses later. It said, in full: "Her science is taught by this
  // app - Herbalism carries ten of Georgia's twenty-five fourth-grade elements
  // and The Science Lab owns the other fifteen, AND THE SCIENCE LAB'S LESSONS
  // ARE STILL BEING WRITTEN."
  //
  // The Science Lab shipped all 48 lessons at v3.30. Nobody came back here.
  // check-links kept it green because 'science' was on a hand-maintained
  // DELIBERATELY_UNLINKED list whose stated reason was about KHAN not having
  // elementary science — which is still true, and was never the question. The
  // question is whether THIS APP teaches it. It does.
  //
  // An exemption fails once it is no longer needed (v3.24, fired at v3.26 and
  // v3.30). This one outlived its need by twelve versions because it was a
  // LIST. It is derived now — see check-links.
  //
  // The 2:10 block runs in Quarters 1 and 3 and §7.1 declares it open in 2 and
  // 4, when the half hour goes to the garden and her projects. There is no
  // calendar in this app and this did not grow one: when she has finished every
  // written Science Lab week, the block hands itself to the greenhouse, exactly
  // as the 2:45 block has since v3.31.
  if (subject === 'science') {
    if (courseFinished('sciencelab', lessonsRead || [])) return gardenTarget();
    return lessonTarget('sciencelab', 'Open my Science Lab lessons', 'The Science Lab', lessonsRead);
  }

  // ---- Social Studies, or The Human Body, depending on the day ----
  //
  // ⚠️ ALSO returned null until v3.42, for the same expired reason: Khan has no
  // elementary Social Studies. This app has taught it since v3.37 — 48 lessons,
  // Quarters 1 to 3, all 36 Georgia units it owns.
  //
  // This is the rotating block, so it must be answered per day or the link and
  // the label disagree. Mon and Wed are Social Studies. Tue and Thu are The
  // Human Body, WHICH HAS NO LESSONS YET — so it says so in words and offers
  // nothing to press. Gigi's call, and the honest one: unwritten is not
  // finished (v3.31), so it does not get to hand its half hour to the garden
  // the way a finished course does, and a button that opens an empty course is
  // the dead end this whole check exists to prevent.
  if (subject === 'social') {
    if (!isRotatingBlock(block?.id)) {
      // Not the timetable's rotating block — a grown-up attached "Social
      // Studies" to some other block by hand. Take them at their word.
      return socialTarget(lessonsRead);
    }
    const key = courseForBlockOnDay(block.id, date, lessonsRead);
    if (!key) {
      // Friday and the weekend have no new lesson in any subject; and since
      // v3.31 a course she has FINISHED lands here too. Same answer, two
      // honest reasons — so they are told apart before it is given.
      return isoWeekday(date) >= 5
        ? { kind: 'view', label: 'Open Friday catch-up', view: 'friday', detail: 'Catch-up' }
        : gardenTarget();
    }
    if (key === 'body') return bodyTarget(lessonsRead);
    return socialTarget(lessonsRead);
  }

  // ---- The app's own places ----
  if (subject === 'journal') {
    return { kind: 'view', label: 'Open the Journal', view: 'journal', detail: 'Write today’s entry' };
  }
  if (subject === 'notes') {
    return { kind: 'view', label: 'Read your notes', view: 'home', detail: 'From Gigi and Mom' };
  }
  if (subject === 'herbalism') {
    // Quarter 1 is written and readable, so this now opens the actual course
    // rather than the Herb Library. The block that says Herbalism opens the
    // lesson she is up to — which was the entire point of the linking work in
    // v2.0, and the one subject it could not yet do.
    // v3.42: carries its course id now. Without it this opened the lessons tab
    // and LessonsView defaulted to APP_COURSES[0] — which happens to be
    // Herbalism, so this one link was accidentally right while the two added
    // beside it would have been silently wrong. A link that works by accident
    // is not a working link.
    //
    // The detail no longer says "Quarter 1 · Meet the Plants". All 96 lessons
    // and all four quarters have been written since v3.9; the block was still
    // announcing the first fortnight.
    //
    // v3.79: and it now opens the lesson rather than the course. The comment
    // above has claimed since v2.0 that this block "opens the lesson she is up
    // to". It did not — it opened the index and let her pick. The sentence was
    // true about the INTENTION and false about the code for fifty-nine
    // versions, which is this project's oldest failure shape: a comment
    // describing what somebody meant to build.
    return lessonTarget('herbalism', 'Open my Herbalism lessons', 'Herbalism & Botany', lessonsRead);
  }
  if (subject === 'body') {
    // v3.42: this used to open the HERB LIBRARY and say the course is "built
    // after your Check-In". The Check-In was sat on Aug 13. Sending her to a
    // different subject's reference shelf is not an answer to "what am I doing
    // now" — it is the dead end with a friendly label on it. Same words as the
    // rotating block gives on a Tuesday, and for the same reason.
    //
    // ⚠️ v3.79 — AND THIS BRANCH WAS STILL SAYING "STILL BEING WRITTEN" FOR A
    // COURSE WITH SIXTY-FOUR LESSONS IN IT. bodyTarget() was made derived at
    // v3.46 precisely so this notice would disappear the moment a lesson
    // existed. It was made derived in ONE of the two places that returns it.
    // The rotating block (Tuesday and Thursday) got the fix; a grown-up who
    // attached "The Human Body" to any other block by hand kept the notice, on
    // a course finished months ago.
    //
    // That is the v3.46 bug surviving in its own sibling branch, and it is the
    // fifth time an exemption in this app has outlived its reason because it
    // was written down twice. One call now, to the derived one.
    return bodyTarget(lessonsRead);
  }

  return null;
}

/**
 * True when a block names a subject the app knows how to open.
 *
 * It takes `grades` and passes them on for the same reason every other caller
 * must: without them resolveBlockTarget answers as if she has done nothing.
 * check-khan-units reads every call site as text and fails the build on a
 * two-argument call, and this helper was the first thing it caught.
 */
export function blockHasTarget(block, strands, grades = []) {
  return resolveBlockTarget(block, strands, grades) !== null;
}
