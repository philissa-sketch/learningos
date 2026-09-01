import { useAppStore } from '../../store/useAppStore.js';
import { hasSchoolStarted, SCHOOL_YEAR_START_DATE, getCurrentQuarter, quarterOpensOn } from '../../lib/schoolQuarter.js';
import { isLessonOpen, subjectQuarterStatus } from '../../lib/quarterAvailability.js';
import { parseDateStr } from '../../lib/scheduler.js';
import { QuietQuarterNote } from './QuietQuarterNote.jsx';
import { StudyCycleTracker } from './StudyCycleTracker.jsx';
import { academyContent } from '../../content/academyContent.js';

const { allLessons } = academyContent().lessons;
const { journalFor, printoutFor } = academyContent().rewards;
const { SUBJECT_LABELS, subjectCardLabel } = academyContent().subjects;

// Nation Command and Launch Director both moved to their own dedicated
// Games tab (Aug 2026, parent feedback — the Lesson Roster and Mission
// Control dashboard had gotten cluttered). See GamesHome.jsx for the real
// mastery-gate logic; this file no longer renders either game inline.

export function LessonRoster({
  onStartLesson,
  onOpenStudyGuide,
  onOpenReviewGame,
  onOpenWeakSpotDrill,
  onOpenPrintout,
  onOpenJournal
}) {
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const reviewGameCompletions = useAppStore((s) => s.reviewGameCompletions);
  // Selected reactively, not read through a store getter — a getter's reference
  // never changes, so the note below would not update when he finishes a Khan
  // unit. Same trap academicPortfolio.js documents.
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const getLessonRosterSubjects = useAppStore((s) => s.getLessonRosterSubjects);
  // getLessonRosterSubjects, not getSubjects: English Language Arts has forty
  // Reading & Literature lessons and is not in ACTIVE_SUBJECTS, so this screen
  // never listed them. See LESSON_TRACK_SUBJECTS in config/subjects.js.
  const activeSubjects = getLessonRosterSubjects();

  if (!hasSchoolStarted()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Not Yet — School Hasn't Started</p>
          <p className="mt-2 font-display text-lg font-700 text-ink-100">
            School starts {SCHOOL_YEAR_START_DATE.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <p className="mt-2 text-sm text-ink-300">
            Lessons unlock on the real first day, not before — come back then!
          </p>
        </div>
      </div>
    );
  }

  const bySubject = {};
  for (const lesson of allLessons) {
    if (!activeSubjects.includes(lesson.subject)) continue; // archived subjects: Khan Academy owns this now, not browsable here
    bySubject[lesson.subject] ??= [];
    bySubject[lesson.subject].push(lesson);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Lesson Roster</p>
      {Object.entries(bySubject).map(([subject, lessons]) => (
        <div key={subject} className="space-y-3">
          <h3 className="font-display text-sm font-700 uppercase tracking-wide text-signal-cyan">
            {subjectCardLabel(subject)}
          </h3>
          {/* "Nothing here this quarter" and "this is broken" looked identical
              on this screen for two days. Now it says which. */}
          {journalFor(subject) && onOpenJournal && (
            /* The parent's own better idea: one booklet per subject, printed
               once at the start of a unit, instead of a sheet every morning. */
            <button
              type="button"
              onClick={() => onOpenJournal(subject)}
              className="rounded-lg border border-signal-amber/40 bg-signal-amber/5 px-3 py-1.5 text-left text-xs text-ink-300 transition hover:border-signal-amber"
            >
              <span className="font-display font-700 text-signal-amber">
                Print the {journalFor(subject).title}
              </span>{' '}
              — one booklet for the whole {subject === 'gardening' ? 'season' : 'year'}, printed once
            </button>
          )}
          <QuietQuarterNote
            subject={subject}
            status={subjectQuarterStatus(subject, {
              lessons: allLessons,
              khanAcademyAssignments,
              currentBatchLabel: getCurrentQuarter().batchLabel
            })}
          />
          {lessons.map((lesson, lessonIndex) => {
            const progress = lessonProgress[lesson.id];
            // Black STEM & Aerospace Trailblazers (PROJECT_PLAN.md Part 4):
            // a browsable library of 17 biographies, untagged by quarter and
            // never mastery-gated — show a one-time section label right
            // before the first one in this subject's list, so it doesn't
            // look like an unlabeled continuation of the quarter curriculum.
            const isFirstTrailblazer =
              lesson.isTrailblazerBio && !lessons[lessonIndex - 1]?.isTrailblazerBio;
            // Quarterly exams stay locked until every lesson they cover
            // is mastered — a real gate, not just a visual one, since
            // the exam is meant to test material the student has
            // actually been taught (same principle as the Cumulative
            // Review fix already queued elsewhere in the app).
            const isLocked =
              lesson.isQuarterlyExam &&
              Array.isArray(lesson.unlocksAfter) &&
              !lesson.unlocksAfter.every((id) => lessonProgress[id]?.mastered);
            /**
             * NOT YET THIS QUARTER. (Aug 16, 2026.)
             *
             * This screen never asked. The daily board has gated by quarter
             * since Aug 6 — getTodaysMission calls isQuarterAvailable — and
             * the roster walked every lesson in the year and put a live Start
             * on it. He could open a Q4 robotics lesson in August.
             *
             * Shown rather than hidden, deliberately, the same call the Book
             * Library makes about empty slots: the year's plan is worth seeing.
             * It just is not startable, and it now says when it opens.
             */
            const notYet = !isLessonOpen(lesson);
            const opensOn = notYet ? quarterOpensOn(lesson.quarter) : null;
            // Confirmed retake policy (PROJECT_PLAN.md Part 4): a Quarterly
            // Exam that hasn't been passed yet requires real re-practice —
            // the Study Guide or Term Blitz for that quarter — before a
            // retry unlocks, instead of an immediate blind re-attempt.
            // `mastered` is sticky-true once achieved, so this only ever
            // applies to a genuinely not-yet-passed exam, never to an
            // already-mastered student retrying just to improve a score.
            const lastReviewedAt = reviewGameCompletions[`${lesson.subject}::${lesson.quarter}`];
            const needsRepractice =
              lesson.isQuarterlyExam &&
              !isLocked &&
              Boolean(progress) &&
              !progress.mastered &&
              (!lastReviewedAt || lastReviewedAt < progress.lastCompletedDate);
            const examCard = (
              <div
                key={lesson.id}
                className={
                  'flex items-center justify-between rounded-xl border p-4 shadow-panel ' +
                  (lesson.isQuarterlyExam
                    ? 'border-signal-amber/50 bg-signal-amber/5'
                    : 'border-space-700 bg-space-800')
                }
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-base font-700 text-ink-100">{lesson.title}</p>
                    {lesson.isQuarterlyExam && (
                      <span className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-amber">
                        Quarterly Exam
                      </span>
                    )}
                    {lesson.isTrailblazerBio && (
                      <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                        Trailblazer Bio
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-500">{lesson.theme}</p>
                  {isLocked && (
                    <p className="mt-1 text-xs text-signal-amber">
                      Locked — complete every {lesson.quarter.split(' ')[0]} lesson first
                    </p>
                  )}
                  {notYet && !isLocked && (
                    <p className="mt-1 text-xs text-ink-500">
                      Opens in {lesson.quarter.split(' ')[0]}
                      {opensOn && ` — ${parseDateStr(opensOn).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`}
                    </p>
                  )}
                  {needsRepractice && (
                    <p className="mt-1 text-xs text-signal-amber">
                      Review required before retrying — do the Study Guide or Term Blitz below first
                    </p>
                  )}
                  {progress && (
                    <p className="mt-1 text-xs text-ink-500">
                      Best: {Math.round((progress.bestAccuracy || 0) * 100)}% · Attempts: {progress.attempts}
                    </p>
                  )}
                  {/* Only the lessons that earn one. Most do not — see
                      data/printouts.js for the parent's framework and the three
                      reasons a lesson is deliberately left without a sheet. */}
                  {printoutFor(lesson.id) && onOpenPrintout && !notYet && (
                    <button
                      type="button"
                      onClick={() => onOpenPrintout(lesson)}
                      className="mt-1.5 text-xs text-signal-cyan underline decoration-signal-cyan/40 underline-offset-2 hover:decoration-signal-cyan"
                    >
                      Print the {printoutFor(lesson.id).label.toLowerCase()} — {printoutFor(lesson.id).title}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {progress?.mastered && (
                    <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-1 text-xs font-display text-signal-green">
                      Mastered
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={isLocked || needsRepractice || notYet}
                    onClick={() => onStartLesson(lesson)}
                    className={
                      'rounded-lg px-3 py-1.5 text-sm font-display font-700 transition ' +
                      (isLocked || needsRepractice || notYet
                        ? 'cursor-not-allowed bg-space-700 text-ink-500'
                        : 'bg-signal-cyan text-space-950 hover:brightness-110')
                    }
                  >
                    {notYet
                      ? lesson.quarter.split(' ')[0]
                      : isLocked
                        ? 'Locked'
                        : needsRepractice
                          ? 'Review First'
                          : progress?.mastered
                            ? 'Retry'
                            : 'Start'}
                  </button>
                </div>
              </div>
            );

            // A Study Guide entry rides right alongside its quarter's
            // Quarterly Exam card — same scope (that quarter's lessons),
            // same purpose (get ready for the exam), always unlocked
            // even while the exam itself is still locked, since
            // reviewing should never be gated behind mastery.
            if (lesson.isQuarterlyExam && (onOpenStudyGuide || onOpenReviewGame)) {
              return (
                <div key={lesson.id + '-with-study-guide'} className="space-y-3">
                  {onOpenStudyGuide && (
                    <button
                      type="button"
                      onClick={() => onOpenStudyGuide(lesson.subject, lesson.quarter)}
                      className="flex w-full items-center justify-between rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 text-left shadow-panel transition hover:border-signal-cyan/70"
                    >
                      <div>
                        <p className="font-display text-sm font-700 text-signal-cyan">Study Guide</p>
                        <p className="text-xs text-ink-500">
                          Review {lesson.quarter}'s vocabulary and key concepts before the Quarterly Exam
                        </p>
                      </div>
                      <span className="text-signal-cyan" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )}
                  {onOpenReviewGame && (
                    <button
                      type="button"
                      onClick={() => onOpenReviewGame(lesson.subject, lesson.quarter)}
                      className="flex w-full items-center justify-between rounded-xl border border-signal-green/40 bg-signal-green/5 p-4 text-left shadow-panel transition hover:border-signal-green/70"
                    >
                      <div>
                        <p className="font-display text-sm font-700 text-signal-green">Term Blitz — Review Game</p>
                        <p className="text-xs text-ink-500">
                          Flashcard-style practice with {lesson.quarter}'s vocabulary — quick, low-stakes, earns bonus XP
                        </p>
                      </div>
                      <span className="text-signal-green" aria-hidden="true">
                        →
                      </span>
                    </button>
                  )}
                  {onOpenWeakSpotDrill && !isLocked && (
                    <StudyCycleTracker
                      subject={lesson.subject}
                      quarter={lesson.quarter}
                      onOpenStudyGuide={onOpenStudyGuide}
                      onOpenReviewGame={onOpenReviewGame}
                      onOpenWeakSpotDrill={onOpenWeakSpotDrill}
                    />
                  )}
                  {examCard}
                </div>
              );
            }

            if (isFirstTrailblazer) {
              return (
                <div key={lesson.id + '-with-header'} className="space-y-3">
                  <div className="rounded-xl border border-signal-cyan/30 bg-signal-cyan/5 px-4 py-3">
                    <p className="font-display text-sm font-700 text-signal-cyan">
                      Black STEM &amp; Aerospace Trailblazers
                    </p>
                    <p className="mt-1 text-xs text-ink-500">
                      17 real, fact-checked biographies — a browsable library, not part of the quarter
                      curriculum or gated by mastery. Read any of these any time.
                    </p>
                  </div>
                  {examCard}
                </div>
              );
            }
            return examCard;
          })}
        </div>
      ))}
    </div>
  );
}
