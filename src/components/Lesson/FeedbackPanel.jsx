import { useEffect, useMemo, useRef } from 'react';
import { NovaMessage } from '../Mentor/NovaMessage.jsx';
import { getMasteryMessage, getReviewMessage, getEnrichmentSuggestion } from '../../lib/novaVoice.js';
import { playMastery } from '../../lib/sfx.js';
import { aerospaceProjects } from '../../academies/lamar/data/aerospace/aerospaceProjects.js';
import { scienceExperiments } from '../../academies/lamar/data/science/scienceExperiments.js';
import { technologyProjects } from '../../academies/lamar/data/technology/technologyProjects.js';
import { roboticsProjects } from '../../academies/lamar/data/robotics/roboticsProjects.js';
import { gardenProjects } from '../../academies/lamar/data/gardening/gardenProjects.js';

const allHandsOnProjects = [...aerospaceProjects, ...scienceExperiments, ...technologyProjects, ...roboticsProjects, ...gardenProjects];

export function FeedbackPanel({ attemptResult, lesson, onDone, onExitCheck, onOpenView }) {
  const pct = Math.round(attemptResult.accuracy * 100);
  const relatedProject = lesson.relatedProjectId
    ? allHandsOnProjects.find((p) => p.id === lesson.relatedProjectId)
    : null;

  /**
   * Nova's debrief lines, chosen ONCE per result.
   *
   * These come from `choice()` — they are random by design, so calling them
   * straight in the JSX meant Nova's message silently changed on every single
   * re-render. That was always slightly wrong (you could watch his words
   * rewrite themselves), and it became a real problem the moment he gained a
   * voice: NovaMessage re-speaks when its text changes, so a re-render would
   * have made him start the celebration over mid-sentence. Pinning the choice
   * to this attempt fixes both.
   */
  const novaLines = useMemo(
    () => ({
      main: attemptResult.mastered ? getMasteryMessage() : getReviewMessage(),
      enrichment: attemptResult.mastered ? getEnrichmentSuggestion() : null
    }),
    [lesson.id, attemptResult.mastered]
  );

  // The mastery chime — the single most-earned sound in the app, so it fires
  // once per mastered attempt and never on a miss. A failed attempt gets
  // silence rather than a sad noise: the written feedback already reframes it
  // as useful data, and a "wrong" sound would undercut that every time.
  const chimedFor = useRef(null);
  useEffect(() => {
    const key = `${lesson.id}:${attemptResult.mastered}`;
    if (chimedFor.current === key) return;
    chimedFor.current = key;
    if (attemptResult.mastered) playMastery();
  }, [lesson.id, attemptResult.mastered]);

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
    <div className="rounded-xl border border-space-700 bg-space-800 p-6 text-center shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Mission Debrief</p>
      <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">{lesson.title}</h2>

      <div className="mt-4 flex justify-center gap-8">
        <div>
          <p className="telemetry text-3xl font-700 text-ink-100">
            {attemptResult.correctCount}/{attemptResult.totalQuestions}
          </p>
          <p className="text-xs text-ink-500">Correct</p>
        </div>
        <div>
          <p className="telemetry text-3xl font-700 text-signal-amber">+{attemptResult.xpEarned}</p>
          <p className="text-xs text-ink-500">XP Earned</p>
        </div>
        <div>
          <p className="telemetry text-3xl font-700 text-ink-100">{pct}%</p>
          <p className="text-xs text-ink-500">Accuracy</p>
        </div>
      </div>

      <div
        className={
          'mx-auto mt-5 w-fit rounded-full border px-4 py-1.5 text-sm font-display font-700 ' +
          (attemptResult.mastered
            ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
            : 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber')
        }
      >
        {attemptResult.mastered ? 'Mission Mastered' : 'Try again to master this mission (90%+ needed)'}
      </div>

      {onExitCheck ? (
        <>
          <button
            type="button"
            onClick={onExitCheck}
            className="mt-6 rounded-lg bg-signal-cyan px-5 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Quick Exit Check (1-2 questions, not scored — makes sure it stuck)
          </button>
          <button
            type="button"
            onClick={onDone}
            className="mt-3 block w-full text-sm text-ink-500 underline hover:text-ink-100"
          >
            Skip — Return to Mission Control
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className="mt-6 rounded-lg bg-signal-cyan px-5 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Return to Mission Control
        </button>
      )}

      {lesson.recommendedBooks && lesson.recommendedBooks.length > 0 && (
        <div className="mt-6 rounded-lg border border-space-700 bg-space-900 p-4 text-left">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Want to Read More?</p>
          <ul className="mt-2 space-y-2">
            {lesson.recommendedBooks.map((book, i) => (
              <li key={i} className="text-sm">
                <span className="font-display font-700 text-ink-100">{book.title}</span>
                <span className="text-ink-500"> — {book.author}</span>
                {book.note && <p className="text-xs text-ink-500">{book.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PRACTICE HANDOFF — the one card on this screen that DOES something.
          relatedProject below is deliberately display-only (a hands-on project
          is not a screen you can open), but a lesson whose whole point is a
          skill has somewhere to send him, and telling him to go there without
          a way to go is the gap this closes.

          Only rendered when the host actually passed a navigator. A dead
          button would be worse than no button. */}
      {lesson.practiceLink && onOpenView && (
        <button
          type="button"
          onClick={() => onOpenView(lesson.practiceLink.view)}
          className="mt-6 block w-full rounded-lg border border-signal-cyan/50 bg-space-900 p-4 text-left transition hover:border-signal-cyan"
        >
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Now Go Do It</p>
          <p className="mt-2 font-display font-700 text-ink-100">{lesson.practiceLink.label} →</p>
          {lesson.practiceLink.detail && (
            <p className="mt-1 text-xs text-ink-500">{lesson.practiceLink.detail}</p>
          )}
        </button>
      )}

      {relatedProject && (
        <div className="mt-6 rounded-lg border border-space-700 bg-space-900 p-4 text-left">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Try It Hands-On</p>
          <p className="mt-2 text-sm">
            <span className="font-display font-700 text-ink-100">{relatedProject.title}</span>
            <span className="text-ink-500"> — {relatedProject.theme}</span>
          </p>
          <p className="mt-1 text-xs text-ink-500">
            {relatedProject.estMinutes} min · {relatedProject.difficulty}
          </p>
        </div>
      )}
    </div>

    {lesson.novaIntro && (
      <NovaMessage tone={attemptResult.mastered ? 'mastery' : 'review'}>
        <p>{novaLines.main}</p>
        {novaLines.enrichment && <p className="mt-2 text-ink-300">{novaLines.enrichment}</p>}
      </NovaMessage>
    )}
    </div>
  );
}
