import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { orderedBlocks, toClock, instructionalMinutes, KIND_STYLES } from '../../config/schedule.js';
import {
  bellSupported,
  bellReady,
  unlockBell,
  ringBell,
  nowMinutes,
  bellShouldBeOn,
  schoolDayEndsAt
} from '../../lib/bell.js';
import { resolveBlockTarget } from '../../lib/blockLinks.js';
import { blockLabelOnDay, blockIconOnDay, isRotatingBlock } from '../../lib/rotatingBlock.js';
import { currentReadingCheck } from '../../lib/readingCheck.js';
import { wordListFor } from '../../lib/wordStudy.js';
import { bookReportNow } from '../../lib/bookReportSchedule.js';

// ---------------------------------------------------------------------------
// TODAY — her school day, with a bell.
//
// Built like her brother's, which was the instruction. His app rings between
// blocks and it is the single thing that turns a homeschool morning into a
// school morning: a start, an end, and a sound that means "that subject is
// finished now" so a grown-up does not have to be the one who says it.
//
// ---- WHY THE BELL HAS AN ON SWITCH ----
//
// Browsers refuse to play sound until the user has interacted with the page.
// That restriction is the reason a tab left open overnight cannot start ringing
// at you, so it is not something to defeat — but it does mean a bell that just
// assumed it could ring would be silent on her machine and nobody could tell
// whether it was broken or simply not time yet.
//
// So the switch is explicit and it says what it does. Pressing it IS the
// interaction the browser requires, and it rings once so she knows the sound.
//
// ---- WHY THE TICK IS EVERY 15 SECONDS AND NOT EVERY SECOND ----
//
// A block boundary only needs to be noticed to the minute. Waking up four times
// a minute is enough to never miss one, and it keeps a laptop from spinning on
// a screen that is open all day.
//
// ---- WHAT THIS SCREEN REFUSES TO DO ----
//
// It never nags. A block she has not ticked is simply not ticked — there is no
// red, no "you are behind", no overdue count. The day is a plan, not a debt.
// ---------------------------------------------------------------------------

function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function TodayView({ onNavigate }) {
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const toggleBlock = useAppStore((s) => s.toggleScheduleBlock);
  const name = useAppStore((s) => s.learnerName);
  const strands = useAppStore((s) => s.strands);
  // Her Khan grades decide which unit a block opens next: the lowest one
  // with no grade yet, starting at Unit 1. Without this the block cannot
  // know she has finished anything and would offer Unit 1 forever.
  const khanGrades = useAppStore((s) => s.khanGrades);
  // v3.31: the rotating block needs her progress, not the date. Social Studies
  // runs Q1-Q3; when she has finished its last week, Monday and Wednesday read
  // "Garden & Projects" instead. Passing this is not optional decoration —
  // omitting it silently restores the pre-v3.31 behaviour, so
  // check-curriculum-volume asserts by reading this file that it is passed.
  const lessonReads = useAppStore((s) => s.lessonReads);
  const lessonsRead = Object.keys(lessonReads || {});
  // v3.91 — her sat spelling tests. The carry-over rule reads them to decide
  // what follows her into this week, so the button and the screen agree.
  const spellingResults = useAppStore((s) => s.spellingResults);
  // v3.82 — what she has already ticked wins over what the week suggests, so a
  // child who worked ahead is not dragged back to a step she has finished.
  const writingDrafts = useAppStore((s) => s.writingDrafts);
  const stepsBySlot = Object.fromEntries(
    Object.values(writingDrafts || {}).map((d) => [d.slotId, d.steps || []])
  );

  const day = todayKey();
  const done = useAppStore((s) => s.scheduleDays[day]?.done || {});

  const [now, setNow] = useState(() => nowMinutes());
  const [bellBlocked, setBellBlocked] = useState(false);

  // ---- THE BELL STAYS ON UNTIL THE END OF THE SCHOOL DAY — v3.43 ----
  //
  // Gigi: "it will not turn off until the end of the school day once it is
  // turned on."
  //
  // It was never turning off. `bellOn` was `useState(false)` right here, so it
  // reset to false every time she left the Today tab, and again on every
  // reload. Nothing remembered it and nothing had an opinion about how long it
  // should last, because nothing knew what "the school day" was.
  //
  // It lives in her saved data now, on the same day row the ticks live on, and
  // the RULE lives in bell.js where a check can call it with a made-up clock.
  const setBellOnForDay = useAppStore((s) => s.setBellOnForDay);
  const bellOnDayKey = useAppStore((s) => {
    const rows = Object.values(s.scheduleDays || {});
    const on = rows.filter((r) => r && r.bellOn).map((r) => r.dayKey).sort();
    return on.length ? on[on.length - 1] : null;
  });
  const bellOn = bellShouldBeOn({
    bellOnDayKey,
    todayKey: day,
    minutesNow: now,
    schedule: blocks
  });
  const dayEndsAt = schoolDayEndsAt(blocks);
  // Which block boundary we have already rung for today, so a re-render or a
  // tick inside the same minute cannot ring twice.
  const rungRef = useRef(new Set());

  const ordered = orderedBlocks(blocks);
  const current = ordered.find((b) => now >= b.startMin && now < b.endMin) || null;
  const next = ordered.find((b) => b.startMin > now) || null;
  const doneCount = ordered.filter((b) => done[b.id]).length;

  useEffect(() => {
    const t = setInterval(() => setNow(nowMinutes()), 15000);
    return () => clearInterval(t);
  }, []);

  // Ring on the minute a block starts. Guarded by rungRef so the 15-second tick
  // that lands inside the same minute does not ring a second time.
  useEffect(() => {
    if (!bellOn) return;
    for (const b of ordered) {
      const key = `${day}:${b.id}:${b.startMin}`;
      if (now === b.startMin && !rungRef.current.has(key)) {
        rungRef.current.add(key);
        ringBell();
      }
    }
  }, [now, bellOn, ordered, day]);

  // ---- WAKING THE SOUND AFTER A RELOAD ----
  //
  // A browser will not make a sound until the person has interacted with the
  // page, and that restriction is the reason a tab left open overnight cannot
  // start ringing at you. It is not defeated here and it must not be: what this
  // does is notice her NEXT REAL TAP, anywhere in the app, and use that gesture
  // to resume the audio context.
  //
  // Without it, "the bell stays on all day" would be true in her saved data and
  // false in the room — the flag would say on, the speaker would stay silent
  // after every reload, and that is a worse bug than the one being fixed
  // because the screen would be lying.
  //
  // One listener, removed the moment it succeeds.
  useEffect(() => {
    if (!bellOn || bellReady()) return undefined;
    let gone = false;
    const wake = async () => {
      const ok = await unlockBell();
      if (ok && !gone) {
        gone = true;
        window.removeEventListener('pointerdown', wake);
        window.removeEventListener('keydown', wake);
        setBellBlocked(false);
      }
    };
    window.addEventListener('pointerdown', wake);
    window.addEventListener('keydown', wake);
    return () => {
      window.removeEventListener('pointerdown', wake);
      window.removeEventListener('keydown', wake);
    };
  }, [bellOn]);

  async function turnBellOn() {
    const ok = await unlockBell();
    if (!ok) {
      setBellBlocked(true);
      return;
    }
    await setBellOnForDay(day);
    setBellBlocked(false);
    ringBell({ strikes: 1 });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-caps">{DAY_NAMES[new Date().getDay()]}</p>
          <h1 className="mt-1 font-display text-3xl text-ink-900">
            {name ? `${name}’s day` : 'Your day'}
          </h1>
        </div>
        <p className="tnum text-sm text-ink-500">
          {doneCount} of {ordered.length} done
        </p>
      </header>

      {/* The bell */}
      <section className="mt-5 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-display text-base text-ink-900">
              🔔 The bell {bellOn ? 'is on' : 'is off'}
            </p>
            {/* v3.43: this used to promise "for as long as this tab stays
                open", which was the honest description of a bug. The bell is
                remembered for the whole day now, so the sentence says the day
                it is on for and the time it will stop. */}
            <p className="mt-0.5 text-xs text-ink-700">
              {bellOn
                ? `It will ring at the start of every block until ${toClock(dayEndsAt)}, even if you close this tab. You do not need to turn it on again today.`
                : 'Turn it on once each morning. It stays on all day. Your browser will not let it ring until you press this.'}
            </p>
          </div>
          <div className="flex gap-2">
            {bellOn ? (
              <button
                type="button"
                onClick={() => ringBell({ strikes: 1 })}
                className="rounded-full border border-gold-700 bg-white px-4 py-2 text-sm font-700 text-gold-700"
              >
                Hear it
              </button>
            ) : (
              <button
                type="button"
                onClick={turnBellOn}
                disabled={!bellSupported()}
                className="rounded-full bg-gold-700 px-5 py-2 text-sm font-700 text-white hover:bg-gold-500 disabled:opacity-40"
              >
                Turn the bell on
              </button>
            )}
          </div>
        </div>
        {!bellSupported() && (
          <p className="mt-2 text-xs text-ink-500">
            This browser has no sound built in, so the day will run without a bell. Chrome or Edge
            both have it.
          </p>
        )}
        {bellBlocked && (
          <p className="mt-2 text-xs text-clay-500">
            The browser would not let the sound start. Click anywhere on the page first, then press
            it again.
          </p>
        )}
      </section>

      {/* What is happening right now */}
      <section className="mt-5">
        {current ? (
          <MarigoldMessage
            text={`Right now it is ${current.label}. ${current.note || ''}`.trim()}
            tone="start"
          />
        ) : next ? (
          <MarigoldMessage
            text={`Nothing is scheduled this minute. Next up is ${next.label} at ${toClock(next.startMin)}.`}
          />
        ) : (
          <MarigoldMessage
            text="School is finished for today. Go and look at something growing."
            tone="done"
          />
        )}
      </section>

      {/* The day */}
      <section className="mt-6 space-y-2">
        {ordered.length === 0 && (
          <p className="rounded-petal border border-dashed border-cream-300 px-4 py-8 text-center text-sm text-ink-500">
            There are no blocks in the day yet. A grown-up can add them in the Grown-Up Corner.
          </p>
        )}

        {ordered.map((b) => {
          const isDone = !!done[b.id];
          const isNow = current?.id === b.id;
          const style = KIND_STYLES[b.kind] || KIND_STYLES.open;
          // v3.42: lessonsRead and the date are passed for the same reason they
          // are passed to blockLabelOnDay two lines below — the 2:45 block
          // rotates, and until now the LABEL knew that and the LINK did not.
          // The block read "The Human Body" on a Tuesday while the only thing
          // deciding what it opened was the string 'social'.
          // check-links asserts this call carries both.
          const target = resolveBlockTarget(b, strands, khanGrades, lessonsRead, new Date());
          // v3.80 — is there a reading check for the Khan unit this block opens?
          // Asked only of a reading block, and it asks the SAME function the
          // block asked, so the two can never point at different units.
          const readingCheck =
            b.subject === 'reading' ? currentReadingCheck(strands, khanGrades) : null;
          // v3.91 — THIS WEEK'S WORD LIST, on the writing block.
          //
          // ⚠️ IT KNOCKS, AND THAT IS THE ENTIRE POINT. The book reports
          // existed from v3.38 with nothing that ever said it was time, and
          // her record still holds zero writing marks four months later. A
          // door nobody knocks on is the same as a door that is not there.
          //
          // Asked with the SAME function the screen asks, so the button and
          // the list it opens can never disagree about which week she is in.
          const wordStudy =
            b.subject === 'writing' ? wordListFor(lessonsRead, spellingResults) : null;
          // v3.82 — THIS WEEK'S BOOK REPORT STEP, on the writing block.
          //
          // Lamar's log, on why this sits here rather than only in the Journal:
          // "the Academic Center card now leads with THIS WEEK'S STEP rather
          // than 'a paper is due in five weeks', which invites doing nothing"
          // for four of them.
          //
          // Her book reports had no door at all — four a year, sitting at the
          // bottom of the Journal, with nothing that ever said it was time. This
          // is the knock.
          const bookStep =
            b.subject === 'writing' ? bookReportNow(lessonsRead, stepsBySlot) : null;
          return (
            <div
              key={b.id}
              className={`rounded-petal border px-4 py-3 transition ${
                isNow
                  ? 'border-blush-500 bg-blush-300/20 shadow-lift'
                  : isDone
                    ? 'border-cream-300 bg-cream-100'
                    : 'border-cream-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* The tick is its own control. It used to be the whole row,
                    which meant the only thing a block could do was be marked
                    done — pressing anywhere could never open the lesson. */}
                <button
                  type="button"
                  onClick={() => toggleBlock(day, b.id)}
                  aria-label={
                    isDone
                      ? `Un-tick ${blockLabelOnDay(b, new Date(), undefined, lessonsRead)}`
                      : `Tick off ${blockLabelOnDay(b, new Date(), undefined, lessonsRead)}`
                  }
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs ${
                    isDone
                      ? 'border-sage-700 bg-sage-700 text-white'
                      : 'border-cream-300 bg-white text-transparent hover:border-sage-500'
                  }`}
                >
                  ✓
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span
                      className={`font-display text-base ${isDone ? 'text-ink-500 line-through' : 'text-ink-900'}`}
                    >
                      {blockIconOnDay(b, new Date(), lessonsRead)} {blockLabelOnDay(b, new Date(), undefined, lessonsRead)}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-700 ${style.chip}`}>
                      {style.label}
                    </span>
                    {isNow && (
                      <span className="rounded-full bg-blush-500 px-2 py-0.5 text-[0.65rem] font-700 text-white">
                        now
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-500">
                    <span className="tnum">{toClock(b.startMin)}</span> ·{' '}
                    <span className="tnum">{b.minutes}</span> min
                    {b.note ? ` · ${b.note}` : ''}
                  </p>

                  {target && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {target.kind === 'khan' ? (
                        <>
                          <a
                            href={target.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-lavender-500 px-4 py-1.5 text-xs font-700 text-white hover:bg-lavender-700"
                          >
                            Open {target.label} ↗
                          </a>
                          {/* v3.80 — AND THE CHECK THAT KHAN DOES NOT BUILD.
                              Gigi: "There are no unit tests. How can we test
                              her." Khan's elementary ELA has ZERO assessments —
                              counted on the rendered page, 77 links, none of
                              them a test — so `ela2` carries graded: 'parent'
                              and the grade came from her by hand.

                              THE BUTTON ONLY APPEARS WHERE A CHECK IS WRITTEN.
                              One of the three ela2 units has one today.
                              `currentReadingCheck` returns null for the rest,
                              and a button with nothing behind it is the dead
                              end this app has built five times. */}
                          {readingCheck && (
                            <button
                              type="button"
                              onClick={() => onNavigate?.('reading')}
                              className="rounded-full border-2 border-sage-500 bg-sage-300/20 px-4 py-1.5 text-xs font-700 text-sage-700 hover:bg-sage-300/40"
                            >
                              Then: reading check
                            </button>
                          )}
                          {/* v3.91 — and her ten words. Only when there are
                              ten: a button opening an empty list is the dead
                              end this app has built five times. */}
                          {wordStudy && wordStudy.list.length > 0 && (
                            <button
                              type="button"
                              onClick={() => onNavigate?.('words')}
                              className="rounded-full border-2 border-sage-500 bg-sage-300/20 px-4 py-1.5 text-xs font-700 text-sage-700 hover:bg-sage-300/40"
                            >
                              Then: word study
                            </button>
                          )}
                        </>
                      ) : target.kind === 'notice' ? (
                        /* v3.42 — WORDS, AND DELIBERATELY NO BUTTON.
                           The Human Body has no lessons yet. Gigi's call was to
                           say so plainly rather than hand the half hour to the
                           garden, because unwritten is not finished (v3.31) and
                           a button opening an empty course is the dead end this
                           whole link check exists to prevent. It disappears by
                           itself the day the course has weeks. */
                        <span className="rounded-full border-2 border-dashed border-cream-300 bg-cream-100 px-4 py-1.5 text-xs font-700 text-ink-700">
                          {target.label} — being written
                        </span>
                      ) : (
                        /* v3.79 — THE LESSON ID IS PASSED ON, OR IT MIGHT AS
                           WELL NOT HAVE BEEN COMPUTED. `target.lessonId` is
                           undefined for every 'view' target, and navigate
                           treats undefined as "no lesson", so this one call
                           serves both kinds with no branch. check-lesson-gate
                           reads this call site as text and fails on a
                           two-argument call — the same guard check-khan-units
                           already keeps over resolveBlockTarget, and it caught
                           a real two-argument call the first time it ran. */
                        <button
                          type="button"
                          onClick={() => onNavigate?.(target.view, target.course, target.lessonId)}
                          className="rounded-full bg-sage-700 px-4 py-1.5 text-xs font-700 text-white hover:bg-sage-500"
                        >
                          {target.label}
                        </button>
                      )}
                      {target.detail && (
                        <span className="text-[0.7rem] text-ink-500">{target.detail}</span>
                      )}
                    </div>
                  )}

                  {/* v3.82 — THIS WEEK'S BOOK REPORT STEP.
                      It leads with the step, never with "a report is due" — a
                      thing due later is a thing to do later, and four a year
                      announced once is how her record ended up with zero.
                      Nothing here says she is behind: §32's rule. */}
                  {bookStep && bookStep.state === 'open' && !bookStep.allDone && (
                    <button
                      type="button"
                      onClick={() => onNavigate?.('journal')}
                      className="mt-2 block w-full rounded-petal border border-gold-300 bg-gold-300/15 px-3.5 py-2.5 text-left hover:bg-gold-300/30"
                    >
                      <span className="label-caps text-ink-500">
                        Book report · step {bookStep.stepNumber} of {bookStep.of}
                      </span>
                      <span className="mt-0.5 block text-sm font-700 text-ink-900">
                        {bookStep.step.step}
                      </span>
                      <span className="mt-0.5 block text-[0.7rem] text-ink-700">
                        {bookStep.step.ask}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <p className="mt-5 text-center text-xs text-ink-500">
        <span className="tnum">{instructionalMinutes(blocks)}</span> minutes of school today, not
        counting breaks. A grown-up can change any of it in the Grown-Up Corner.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate?.('journal')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-sage-500"
        >
          📓 Open the Journal
        </button>
        <button
          type="button"
          onClick={() => onNavigate?.('plan')}
          className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
        >
          🗺️ What Khan unit am I on?
        </button>
      </div>
    </main>
  );
}
