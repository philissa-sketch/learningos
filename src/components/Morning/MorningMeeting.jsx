import { useState, useMemo, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr, formatShortDate, parseDateStr, addDays, toDateStr } from '../../lib/scheduler.js';
import { buildPlannerItems, splitPlannerItems } from '../../lib/plannerCalendar.js';
import { localDayOf } from '../../lib/academicOrder.js';
import { writingPrompts } from '../../academies/lamar/data/writing/writingPrompts.js';
import { drillById } from '../../lib/dailyWriting.js';
import { allLessons } from '../../academies/lamar/data/lessons/index.js';
import { resolveBlockLabel } from '../../lib/rotatingBlock.js';
import { NON_INSTRUCTIONAL_BLOCKS, blockMinutes } from '../../lib/scheduledMinutes.js';

/**
 * ============================================================================
 * THE MORNING MEETING — block-1, 08:30-09:00.
 * ============================================================================
 *
 * ---- WHY THIS EXISTS (Aug 20, 2026) ----
 *
 * The parent: **"Lamar logs in at 8:30 every morning and is working on his
 * school work until he completes everything. It has to be longer than 4 1/2
 * hrs."**
 *
 * She was right and the record disagreed with her, partly because
 * "Morning Meeting, Goals & Calendar" existed in exactly ONE file — the
 * timetable — and nowhere else in the app. No screen, no content, no
 * completion record, no entry in BLOCK_FOR_SUBJECT. Thirty minutes a day
 * across 180 days is **ninety hours a year that were structurally impossible
 * to count**, because nothing anywhere could say the meeting had happened.
 *
 * Offered a checkbox or a real screen, she chose the screen and said what
 * belongs on it:
 *
 *   > "In there it can mention to check his email for downloads, export to
 *   > import, view what will be worked on for the day, talk to mom regarding
 *   > anything that he is confused about, etc."
 *
 * That list is not a wish list. It is, in order, the four things that go wrong
 * on this project when nobody does them:
 *
 *   1. HE RUNS A STALE BUILD. Progress syncs between the two computers; code
 *      does not. This has already caused "when my son opens the link it has
 *      the coding not the reading" — same app, two versions, no way to tell.
 *      The stamp is on this screen so the check has a place to happen.
 *      **RESOLVED Aug 24, 2026 — see the note above step 1.** The app moved to
 *      Netlify; both computers load the same address and cannot be on
 *      different builds. The step it earned has been removed rather than
 *      reworded, and the version now lives only in the top bar.
 *   2. HIS WORK NEVER REACHES HER. Export/import is a manual daily round trip
 *      and the day it is skipped is the day a grade goes missing.
 *   3. HE DOES NOT KNOW WHAT TODAY HOLDS until he stumbles into it, which is
 *      how the Rotating Block went eight school days without being opened.
 *   4. HE SITS ON A QUESTION. Asking at 8:30 costs a sentence. Discovering at
 *      2pm that he never understood the assignment costs the afternoon.
 *
 * ---- WHAT THIS SCREEN WILL NOT DO ----
 *
 * It does not gate the day. There is no "you cannot start school until you
 * finish the meeting" — a boy locked out of Mathematics because a text box is
 * empty learns to type anything into the box. He can leave at any point, and
 * the steps he did are kept.
 *
 * It also does not require every step to book the block. He ticks what he did.
 * The record is what happened, not what was asked for.
 */

/** 08:30 -> "8:30 AM" */
function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

/**
 * `formatShortDate` takes a Date; every date on this screen is a
 * 'YYYY-MM-DD' string. Passing the string through raised
 * `date.toLocaleDateString is not a function` and the whole screen fell to the
 * error boundary — caught by opening it, not by any guard, because a wrong
 * argument type parses perfectly.
 *
 * parseDateStr, not `new Date(str)`: the bare constructor reads 'YYYY-MM-DD'
 * as UTC midnight, which prints as the PREVIOUS day west of Greenwich.
 */
function shortDate(dateStr) {
  if (!dateStr) return '';
  return formatShortDate(parseDateStr(dateStr));
}

/**
 * NAME THE WORK, NOT THE TABLE IT LIVES IN.
 *
 * The first version of the progress step printed the label of the SOURCE —
 * three graded pieces in a row all read "B+ Writing", and an unfinished lesson
 * read "0% m7-fractions-1". Neither tells a twelve-year-old which thing it is,
 * and the lesson id is not even English.
 *
 * A writing entry is either a weekly journal prompt or a daily drill; both are
 * resolved here from the same catalogues the Journal itself uses, so a title
 * shown on this screen can never be one the rest of the app disagrees with.
 */
const WRITING_TITLES = (() => {
  const map = new Map();
  for (const p of writingPrompts) map.set(p.id, p.title);
  return map;
})();

function writingTitle(promptId) {
  return WRITING_TITLES.get(promptId) || drillById(promptId)?.title || 'Writing';
}

const LESSON_TITLES = (() => {
  const map = new Map();
  for (const l of allLessons) map.set(l.id, l.title);
  return map;
})();

function Step({ n, title, children, done }) {
  return (
    <section className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <div className="flex items-start gap-3">
        <span
          className={
            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-sm font-700 ' +
            (done ? 'bg-signal-green text-space-950' : 'bg-space-700 text-ink-300')
          }
          aria-hidden="true"
        >
          {done ? '✓' : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-sm font-700 uppercase tracking-widest text-signal-cyan">{title}</h2>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function MorningMeeting({ onExit, onOpenSchedule, onOpenPlanner, onOpenProgress }) {
  const today = todayDateStr();

  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const morningMeetings = useAppStore((s) => s.morningMeetings);
  const messages = useAppStore((s) => s.messages);
  // Progress step — where he actually stands, not what is due.
  const currentRank = useAppStore((s) => s.currentRank);
  const streak = useAppStore((s) => s.streak);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const selfExplanations = useAppStore((s) => s.selfExplanations);

  const completeMorningMeeting = useAppStore((s) => s.completeMorningMeeting);
  const exportProgressData = useAppStore((s) => s.exportProgressData);
  const importProgressData = useAppStore((s) => s.importProgressData);
  const sendMessage = useAppStore((s) => s.sendMessage);

  const existing = morningMeetings[today] || null;

  const [checkedPlanner, setCheckedPlanner] = useState(Boolean(existing?.checkedPlanner));
  const [checkedProgress, setCheckedProgress] = useState(Boolean(existing?.checkedProgress));
  const [syncedWork, setSyncedWork] = useState(Boolean(existing?.syncedWork));
  const [goal, setGoal] = useState(existing?.goal || '');
  /**
   * SEEDED FROM THE DAY'S ROW, LIKE EVERY OTHER FIELD HERE. (Aug 23, 2026.)
   *
   * This one line started as `useState('')` while the five above it rehydrated
   * from `existing`. `handleFinish` then wrote `question: ''` over the saved
   * row — so re-opening the meeting later in the day and pressing Finish
   * ERASED the question he wrote that morning. The action's own docstring
   * promises the opposite: "he can also come back and add a question he only
   * thought of at ten o'clock."
   */
  const [question, setQuestion] = useState(existing?.question || '');
  const [syncResult, setSyncResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);
  const fileRef = useRef(null);

  /**
   * TODAY'S BLOCKS, in timetable order, with the rotating block resolved to
   * the subject that actually owns today. Break and Lunch are shown — he
   * should see when lunch is — but marked as not counting toward the day's
   * instruction, using the same NON_INSTRUCTIONAL_BLOCKS set the Georgia
   * counter uses rather than a second list that can drift from it.
   */
  const todaysBlocks = useMemo(() => {
    const now = new Date();
    const weekday = now.getDay();
    return (scheduleBlocks || [])
      .filter((b) => !Array.isArray(b.days) || b.days.includes(weekday))
      .map((b) => ({
        ...b,
        resolvedLabel: resolveBlockLabel(b, now, khanAcademyAssignments),
        minutes: blockMinutes(b),
        instructional: !NON_INSTRUCTIONAL_BLOCKS.has(b.id)
      }));
  }, [scheduleBlocks, khanAcademyAssignments]);

  const instructionalMinutes = todaysBlocks
    .filter((b) => b.instructional)
    .reduce((n, b) => n + b.minutes, 0);

  /** What is actually due today or already late. Same feed the planner uses. */
  const { dueToday, overdue } = useMemo(() => {
    const items = buildPlannerItems({ assignments, academicAssignments, writingEntries, gardenLog });
    const { due } = splitPlannerItems(items);
    return {
      dueToday: due.filter((i) => !i.done && i.dueDate === today),
      overdue: due.filter((i) => !i.done && i.dueDate < today)
    };
  }, [assignments, academicAssignments, writingEntries, gardenLog, today]);

  /**
   * WHAT IS COMING, NOT JUST WHAT IS DUE.
   *
   * The parent: **"in the morning meeting section add for him to look at his
   * weekly and monthly planner so that he can see what will be due."**
   *
   * Everything above this point is about TODAY. A twelve-year-old who only
   * ever sees today meets a four-step project on the morning it is due, and
   * this project has the receipts: a rocket build "set up too late", a
   * paragraph-writing piece that went a week overdue without anyone noticing.
   *
   * The two windows are the two planners she named, and nothing wider:
   *
   *     soon   the next 7 days   -> the WEEKLY planner
   *     later  the rest of this  -> the MONTHLY planner
   *            calendar month
   *
   * THE MONTH IS A REAL BOUNDARY, NOT A TIDY ONE. The first version ran
   * `later` to the end of the data and the panel said **"and 186 more"** — the
   * whole school year, on a screen whose job is to show him what is coming
   * this month. A number that large is not information, it is wallpaper, and
   * it makes the button under it look pointless.
   *
   * Today itself is excluded: it has its own section three inches up, and
   * repeating it here would read as noise.
   */
  const { soon, later } = useMemo(() => {
    const items = buildPlannerItems({ assignments, academicAssignments, writingEntries, gardenLog });
    const { due } = splitPlannerItems(items);
    const weekEnd = toDateStr(addDays(parseDateStr(today), 7));
    // Last day of the month `today` falls in — day 0 of the next month.
    const d = parseDateStr(today);
    const monthEnd = toDateStr(new Date(d.getFullYear(), d.getMonth() + 1, 0));
    const open = due.filter((i) => !i.done && i.dueDate > today);
    return {
      soon: open.filter((i) => i.dueDate <= weekEnd).sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
      later: open
        .filter((i) => i.dueDate > weekEnd && i.dueDate <= monthEnd)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    };
  }, [assignments, academicAssignments, writingEntries, gardenLog, today]);

  /**
   * WHERE HE ACTUALLY STANDS.
   *
   * The parent: **"Add to the morning meeting to have Lamar check his
   * progress."**
   *
   * Every other step on this screen is about work — what is due, what is
   * coming, what he will do today. None of them ever tells him he is getting
   * BETTER at anything. A boy who only ever sees the list sees a list that
   * never ends; the thing that makes it bearable is watching a number move.
   *
   * It sits directly after the file trade ON PURPOSE. He has just loaded Mom's
   * file, so anything she graded last night arrived thirty seconds ago. That
   * is the moment it is worth putting in front of him — not on a screen he has
   * to remember to go and open.
   *
   * SEVEN DAYS, NOT SINCE-HIS-LAST-MEETING. A window anchored to the last
   * meeting shows nothing on a day he runs two, and a flood after a weekend,
   * which makes the panel feel arbitrary. A rolling week asks the same
   * question every morning.
   */
  const progress = useMemo(() => {
    const since = toDateStr(addDays(parseDateStr(today), -7));

    const masteredThisWeek = Object.values(lessonProgress || {})
      .filter((p) => p?.mastered && p.lastCompletedDate && p.lastCompletedDate >= since).length;
    const masteredTotal = Object.values(lessonProgress || {}).filter((p) => p?.mastered).length;

    /**
     * Newly graded work, from all three places a grade can live. `gradedAt` is
     * a UTC timestamp, so it goes through localDayOf — a grade she entered at
     * 9pm Eastern belongs to that evening, not to the next morning.
     */
    const recent = [];
    for (const e of writingEntries || []) {
      if (e?.grade && e.gradedAt && localDayOf(e.gradedAt) >= since) {
        recent.push({ key: 'w' + e.id, label: writingTitle(e.promptId), grade: e.grade, at: e.gradedAt });
      }
    }
    for (const e of selfExplanations || []) {
      if (e?.grade && e.gradedAt && localDayOf(e.gradedAt) >= since) {
        recent.push({
          key: 's' + e.id,
          label: LESSON_TITLES.get(e.lessonId) || 'In your own words',
          grade: e.grade,
          at: e.gradedAt
        });
      }
    }
    for (const a of khanAcademyAssignments || []) {
      if (a?.grade && a.gradedAt && localDayOf(a.gradedAt) >= since) {
        recent.push({ key: 'k' + a.id, label: a.skillTitle || 'Khan unit', grade: a.grade, at: a.gradedAt });
      }
    }
    recent.sort((a, b) => String(b.at).localeCompare(String(a.at)));

    /**
     * Lessons he opened and did not clear. Mastery is 90%, so a lesson sitting
     * at 80% looks identical to one he never opened — this is the only place
     * on his screens that offers a second go at a SPECIFIC lesson rather than
     * the next one in the queue.
     */
    const retry = Object.entries(lessonProgress || {})
      .filter(([, p]) => p && !p.mastered && (p.attempts || 0) > 0)
      .map(([id, p]) => ({
        id,
        title: LESSON_TITLES.get(id) || id,
        best: Math.round((p.bestAccuracy || 0) * 100)
      }))
      .sort((a, b) => b.best - a.best)
      .slice(0, 3);

    return { masteredThisWeek, masteredTotal, recent, retry };
  }, [lessonProgress, writingEntries, selfExplanations, khanAcademyAssignments, today]);

  /** Anything Mom has said since yesterday that he may not have opened. */
  const unreadFromMom = (messages || []).filter((m) => m.sender === 'parent' && !m.readByStudent);

  const handleSend = () => {
    exportProgressData();
    setSyncedWork(true);
    setSyncResult({ ok: true, message: 'Saved to your downloads. Send that file to Mom.' });
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // so the same filename can be chosen again tomorrow
    if (!file) return;
    setBusy(true);
    setSyncResult(null);
    try {
      const parsed = JSON.parse(await file.text());
      await importProgressData(parsed);
      setSyncedWork(true);
      setSyncResult({ ok: true, message: 'Loaded. Your grades and anything new from Mom are in.' });
    } catch (err) {
      setSyncResult({
        ok: false,
        message:
          'That file did not load — ' +
          (err.message || 'it may not be the right file.') +
          ' Nothing was changed. Ask Mom to send it again.'
      });
    } finally {
      setBusy(false);
    }
  };

  /**
   * The question goes to Mission Comms as a real message, not into a field
   * she has to remember to go and read. If he wrote one and it fails to send,
   * the meeting is still saved with the text on the row — the words are not
   * lost because a write failed.
   */
  const handleFinish = async () => {
    const text = question.trim();
    if (text && !questionSent) {
      try {
        await sendMessage({ sender: 'student', body: text });
        setQuestionSent(true);
      } catch {
        /* saved on the meeting row below regardless */
      }
    }
    // `checkedForUpdate` is gone with the step that set it (Aug 24, 2026).
    // The FIELD is left in the row shape — old meetings still carry it, and
    // the two-computer merge is field-wise, so removing it from the write is
    // enough. Deleting it from the schema would rewrite history that actually
    // happened on the days he really did check his email.
    await completeMorningMeeting({
      goal, question: text, syncedWork, checkedPlanner, checkedProgress
    });
    setSaved(true);
  };

  /**
   * THE FOOTER COUNT IS DERIVED, NEVER TYPED.
   *
   * It read "of 4 steps", then "of 5", then "of 6", each hand-edited when a
   * step was added — and by the time the progress step went in there were
   * SEVEN steps on screen and the footer still said six. Nothing failed; the
   * number was simply wrong, which is the worst kind of wrong on a screen
   * whose whole job is telling a twelve-year-old where he is.
   *
   * THE LAST STEP IS DELIBERATELY NOT IN HERE. "Anything you are stuck on" is
   * optional — blank is a perfectly good answer — and counting it would mean a
   * boy with no question can never finish the list. So the total is the length
   * of THIS array, not the number of Steps rendered, and the two are allowed
   * to differ by exactly that one.
   */
  const stepChecks = [
    syncedWork, checkedProgress, true, checkedPlanner, goal.trim().length > 0
  ];
  const stepsDone = stepChecks.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-5">
        <p className="font-display text-xs uppercase tracking-widest text-ink-500">
          {shortDate(today)} · 8:30–9:00 AM
        </p>
        <h1 className="mt-1 font-display text-2xl font-700 text-ink-100">Morning Meeting</h1>
        <p className="mt-1 text-sm text-ink-400">
          Thirty minutes before the day starts. Get set up, see what is coming, and say what you are
          unsure about — while there is still all day to fix it.
        </p>
        {existing?.completedAt && (
          <p className="mt-2 rounded-lg border border-signal-green/40 bg-signal-green/10 px-3 py-2 text-xs text-signal-green">
            You already ran the meeting today. You can add to it — nothing gets counted twice.
          </p>
        )}
      </header>

      <div className="space-y-3">
        {/**
          * ---- THE STEP THAT STOPPED BEING TRUE (Aug 24, 2026) ----
          *
          * Step 1 used to read "Check your email for a new version", and told
          * him: *the app itself does not sync — when Mom changes something she
          * has to send you a new file.* That was exactly right for six weeks.
          *
          * Then the app moved to Netlify. She pushes to GitHub, Netlify builds,
          * and he opens a web address that is always the current version. There
          * is no email. There is no file to unzip. There is no build to compare
          * against, because both computers load the same one.
          *
          * So the step was asking a twelve-year-old to perform a check that
          * cannot be performed, every single morning, and to tick a box saying
          * he had done it. **A step that cannot be completed honestly teaches
          * him to tick boxes without reading them** — and four steps below this
          * one, the boxes are load-bearing for his attendance record.
          *
          * Removed rather than reworded. The job it did is now done by the
          * deployment, and inventing a new job to keep the slot warm would be
          * make-work. The steps renumber 1..6; `stepChecks` loses its first
          * entry and the footer count follows it automatically, which is the
          * whole reason that count is derived and never typed.
          *
          * WHAT REPLACED IT: nothing on this screen. The version is still
          * printed in the top bar on every page — and it is now stamped by the
          * Netlify build itself (see config/buildStamp.js), so for the first
          * time it moves on its own.
          *
          * Trading files with Mom, below, is UNAFFECTED and still required.
          * Netlify serves the same code to both machines; it does not merge
          * their databases. His progress still travels by file.
          */}

        {/* ---- 1 · trade files ------------------------------------------ */}
        <Step n={1} title="Trade files with Mom" done={syncedWork}>
          <p className="text-sm text-ink-400">
            Load her file first so you get yesterday&apos;s grades and any new assignments. Send yours
            at the end of the day.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="rounded-lg bg-signal-cyan px-4 py-2.5 text-left font-display text-sm font-700 text-space-950 transition hover:brightness-110 disabled:opacity-50"
            >
              {busy ? 'Loading…' : 'Get my graded work back'}
              <span className="mt-0.5 block text-xs font-400 opacity-80">Pick the file Mom sent</span>
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="rounded-lg border border-signal-cyan/40 px-4 py-2.5 text-left font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10"
            >
              Send my work to Mom
              <span className="mt-0.5 block text-xs font-400 text-ink-500">Saves a file to downloads</span>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFile}
            className="hidden"
          />
          {syncResult && (
            <p
              className={
                'mt-3 rounded-lg border px-3 py-2 text-xs ' +
                (syncResult.ok
                  ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                  : 'border-signal-red/40 bg-signal-red/10 text-signal-red')
              }
            >
              {syncResult.message}
            </p>
          )}
          <p className="mt-2 text-xs text-ink-500">
            Loading the same file twice is safe — the second time does nothing.
          </p>
        </Step>

        {/* ---- 2 · progress --------------------------------------------- */}
        <Step n={2} title="Check your progress" done={checkedProgress}>
          <p className="text-sm text-ink-400">
            Everything else here is what you owe. This is what you have already done.
          </p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-space-600 bg-space-900 px-3 py-2">
              <p className="font-display text-[10px] uppercase tracking-widest text-ink-600">Rank</p>
              <p className="mt-0.5 font-display text-sm font-700 text-ink-100">
                {currentRank?.name || '—'}
              </p>
            </div>
            <div className="rounded-lg border border-space-600 bg-space-900 px-3 py-2">
              <p className="font-display text-[10px] uppercase tracking-widest text-ink-600">Streak</p>
              <p className="mt-0.5 font-display text-sm font-700 text-signal-amber">
                {streak} day{streak === 1 ? '' : 's'}
              </p>
            </div>
            <div className="rounded-lg border border-space-600 bg-space-900 px-3 py-2">
              <p className="font-display text-[10px] uppercase tracking-widest text-ink-600">Mastered</p>
              <p className="mt-0.5 font-display text-sm font-700 text-signal-green">
                {progress.masteredTotal}
              </p>
            </div>
          </div>

          {/**
            * THE ONE LINE THAT ANSWERS "AM I GETTING ANYWHERE". A running total
            * only ever goes up, so on its own it cannot tell him whether this
            * week went well. The seven-day figure can, and it says so honestly
            * when the answer is none — a zero he can see is worth more than a
            * total that hides it.
            */}
          <p className="mt-2 text-sm text-ink-300">
            {progress.masteredThisWeek > 0 ? (
              <>
                <span className="font-display font-700 text-signal-green">
                  {progress.masteredThisWeek}
                </span>{' '}
                lesson{progress.masteredThisWeek === 1 ? '' : 's'} mastered in the last 7 days.
              </>
            ) : (
              'No lessons mastered in the last 7 days — one today would change that.'
            )}
          </p>

          {progress.recent.length > 0 && (
            <div className="mt-3 rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 p-3">
              <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">
                Mom graded this week
              </p>
              <ul className="mt-1.5 space-y-1">
                {progress.recent.slice(0, 4).map((r) => (
                  <li key={r.key} className="flex items-baseline gap-2 text-sm">
                    <span className="w-10 shrink-0 font-display font-700 text-ink-100">{r.grade}</span>
                    <span className="min-w-0 flex-1 truncate text-ink-300">{r.label}</span>
                  </li>
                ))}
              </ul>
              {progress.recent.length > 4 && (
                <p className="mt-1.5 text-xs text-ink-500">
                  and {progress.recent.length - 4} more on your progress page.
                </p>
              )}
            </div>
          )}

          {progress.retry.length > 0 && (
            <div className="mt-2 rounded-lg border border-signal-amber/40 bg-signal-amber/10 p-3">
              <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-amber">
                Started, not mastered yet
              </p>
              {/**
                * Mastery is 90%. A lesson sitting at 80% looks exactly like one
                * he never opened, everywhere else in the app — so these are
                * named with the number, because "you got 80%" is a reason to go
                * back and "try again" is not.
                */}
              <ul className="mt-1.5 space-y-1">
                {progress.retry.map((r) => (
                  <li key={r.id} className="flex items-baseline gap-2 text-sm">
                    <span className="w-10 shrink-0 font-display font-700 text-ink-100">{r.best}%</span>
                    <span className="min-w-0 flex-1 truncate text-ink-300">{r.title}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-1.5 text-xs text-ink-500">90% masters a lesson.</p>
            </div>
          )}

          {onOpenProgress && (
            <button
              type="button"
              onClick={onOpenProgress}
              className="mt-3 w-full rounded-lg border border-signal-cyan/40 px-4 py-2.5 text-left font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10"
            >
              Open my progress
              <span className="mt-0.5 block text-xs font-400 text-ink-500">
                Every subject, your rank, and the ship you are building
              </span>
            </button>
          )}

          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink-300">
            <input
              type="checkbox"
              checked={checkedProgress}
              onChange={(e) => setCheckedProgress(e.target.checked)}
              className="h-4 w-4 accent-signal-cyan"
            />
            I checked my progress.
          </label>
        </Step>

        {/* ---- 4 · today ----------------------------------------------- */}
        <Step n={3} title="What today looks like" done>
          {overdue.length > 0 && (
            <div className="mb-3 rounded-lg border border-signal-amber/40 bg-signal-amber/10 p-3">
              <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-amber">
                Late — do these first
              </p>
              <ul className="mt-1.5 space-y-1">
                {overdue.slice(0, 6).map((i) => (
                  <li key={i.id ?? `${i.title}-${i.dueDate}`} className="text-sm text-ink-200">
                    {i.title}{' '}
                    <span className="text-xs text-ink-500">— was due {shortDate(i.dueDate)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dueToday.length > 0 && (
            <div className="mb-3 rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 p-3">
              <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">
                Due today
              </p>
              <ul className="mt-1.5 space-y-1">
                {dueToday.map((i) => (
                  <li key={i.id ?? i.title} className="text-sm text-ink-200">
                    {i.title}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ol className="space-y-1">
            {todaysBlocks.map((b) => (
              <li
                key={b.id}
                className={
                  'flex items-baseline gap-3 rounded-lg px-3 py-1.5 text-sm ' +
                  (b.instructional ? 'bg-space-900 text-ink-200' : 'text-ink-500')
                }
              >
                <span className="w-32 shrink-0 font-mono text-xs text-ink-500">
                  {formatTime(b.startTime)}
                </span>
                <span className="min-w-0 flex-1">{b.resolvedLabel}</span>
                <span className="shrink-0 text-xs text-ink-500">
                  {b.instructional ? `${b.minutes} min` : 'break'}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-ink-500">
            {Math.floor(instructionalMinutes / 60)}h {instructionalMinutes % 60}m of school today if you
            finish everything.{' '}
            {onOpenSchedule && (
              <button
                type="button"
                onClick={onOpenSchedule}
                className="text-signal-cyan underline decoration-dotted underline-offset-2"
              >
                Open the full schedule
              </button>
            )}
          </p>
        </Step>

        {/* ---- 5 · the week and the month ------------------------------- */}
        <Step n={4} title="Look at your week and your month" done={checkedPlanner}>
          <p className="text-sm text-ink-400">
            Nothing here is due today. This is so a project due Friday does not surprise you on
            Friday.
          </p>

          <div className="mt-3 rounded-lg border border-space-600 bg-space-900 p-3">
            <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">
              Next 7 days
            </p>
            {soon.length === 0 ? (
              <p className="mt-1 text-sm text-ink-500">Nothing due in the next week.</p>
            ) : (
              <ul className="mt-1.5 space-y-1">
                {soon.map((i) => (
                  <li key={i.id ?? `${i.title}-${i.dueDate}`} className="flex gap-2 text-sm">
                    <span className="w-24 shrink-0 font-mono text-xs text-ink-500">
                      {shortDate(i.dueDate)}
                    </span>
                    <span className="min-w-0 flex-1 text-ink-200">{i.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-2 rounded-lg border border-space-600 bg-space-900 p-3">
            <p className="font-display text-xs font-700 uppercase tracking-widest text-ink-500">
              Rest of this month
            </p>
            {later.length === 0 ? (
              <p className="mt-1 text-sm text-ink-500">Nothing else due this month.</p>
            ) : (
              <>
                <ul className="mt-1.5 space-y-1">
                  {/**
                    * THREE, THEN A COUNT. The point of this panel is to make him
                    * open the monthly view, not to reproduce it — a list of
                    * fifteen dated items here is a wall he scrolls past, and it
                    * would make the button below pointless.
                    */}
                  {later.slice(0, 3).map((i) => (
                    <li key={i.id ?? `${i.title}-${i.dueDate}`} className="flex gap-2 text-sm">
                      <span className="w-24 shrink-0 font-mono text-xs text-ink-500">
                        {shortDate(i.dueDate)}
                      </span>
                      <span className="min-w-0 flex-1 text-ink-300">{i.title}</span>
                    </li>
                  ))}
                </ul>
                {later.length > 3 && (
                  <p className="mt-1.5 text-xs text-ink-500">
                    and {later.length - 3} more — open the monthly planner to see them all.
                  </p>
                )}
              </>
            )}
          </div>

          {onOpenPlanner && (
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {/**
                * These open the Scheduler ON the view they name. Landing him on
                * the Daily view and leaving him to find the Weekly tab is most
                * of the instruction, and the missing part is the part that gets
                * skipped.
                */}
              <button
                type="button"
                onClick={() => onOpenPlanner('weekly')}
                className="rounded-lg border border-signal-cyan/40 px-4 py-2.5 text-left font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10"
              >
                Open the weekly planner
                <span className="mt-0.5 block text-xs font-400 text-ink-500">This week, day by day</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenPlanner('monthly')}
                className="rounded-lg border border-signal-cyan/40 px-4 py-2.5 text-left font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10"
              >
                Open the monthly planner
                <span className="mt-0.5 block text-xs font-400 text-ink-500">The whole month at once</span>
              </button>
            </div>
          )}

          <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-ink-300">
            <input
              type="checkbox"
              checked={checkedPlanner}
              onChange={(e) => setCheckedPlanner(e.target.checked)}
              className="h-4 w-4 accent-signal-cyan"
            />
            I looked at the week and the month.
          </label>
        </Step>

        {/* ---- 6 · goal ------------------------------------------------ */}
        <Step n={5} title="Pick one thing to get done today" done={goal.trim().length > 0}>
          <p className="text-sm text-ink-400">
            Not the whole list — one thing you want finished by the time you shut the laptop.
          </p>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Today I am going to…"
            className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
          />
        </Step>

        {/* ---- 7 · ask Mom --------------------------------------------- */}
        <Step n={6} title="Anything you are stuck or confused about?" done={questionSent}>
          {unreadFromMom.length > 0 && (
            <p className="mb-2 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-3 py-2 text-xs text-signal-amber">
              Mom has {unreadFromMom.length} message{unreadFromMom.length === 1 ? '' : 's'} you have not
              opened yet — check Mission Comms.
            </p>
          )}
          <p className="text-sm text-ink-400">
            Ask now, not at 2 o&apos;clock. This goes straight to Mom in Mission Comms. Leave it blank
            if there is nothing.
          </p>
          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setQuestionSent(false);
            }}
            rows={3}
            placeholder="I do not understand…"
            className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
          />
          {questionSent && <p className="mt-1 text-xs text-signal-green">Sent to Mom.</p>}
        </Step>
      </div>

      {/* ---- finish ---------------------------------------------------- */}
      <div className="mt-5 rounded-xl border border-space-700 bg-space-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm font-700 text-ink-100">
              {saved ? 'Meeting logged. Have a good day.' : 'Ready to start?'}
            </p>
            <p className="mt-0.5 text-xs text-ink-500">
              {saved
                ? 'Thirty minutes of school is on your record for today.'
                : `${stepsDone} of ${stepChecks.length} steps done — you can start with any of them unfinished.`}
            </p>
          </div>
          <div className="flex gap-2">
            {!saved && (
              <button
                type="button"
                onClick={handleFinish}
                className="rounded-lg bg-signal-green px-5 py-2.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
              >
                Start my day
              </button>
            )}
            {saved && onExit && (
              <button
                type="button"
                onClick={onExit}
                className="rounded-lg bg-signal-cyan px-5 py-2.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
              >
                Go to Mission Control
              </button>
            )}
            {!saved && onExit && (
              <button
                type="button"
                onClick={onExit}
                className="rounded-lg border border-space-600 px-4 py-2.5 font-display text-sm font-700 text-ink-400 transition hover:bg-space-700"
              >
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
