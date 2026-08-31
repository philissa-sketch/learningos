import { parseDateStr } from '../../lib/scheduler.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';

/**
 * "THERE IS NOTHING HERE THIS QUARTER" — SAID OUT LOUD.
 *
 * ---- WHY THIS EXISTS (Aug 16, 2026) ----
 *
 * The parent, Aug 14: "Social studies isn't opened on Lamar's app."
 *
 * Zero of Social Studies' 29 Mission Control lessons are tagged Q1 — her
 * decision, and the right one: Q1 Social Studies is World History on Khan.
 * What no screen ever said was that this was on purpose. A twelve-year-old
 * opening a subject with nothing in it cannot tell "not this quarter" from
 * "broken," and he should not have to ask.
 *
 * Two things this deliberately does NOT do:
 *
 * **It does not say "you finished Social Studies."** The store has carried
 * `hasLaterQuarterLessons` since Aug 6 precisely to prevent that sentence, with
 * a comment saying so — and it had never been called from anywhere. Telling a
 * boy in August that he is done with a subject for the year is the failure that
 * function was written to avoid, two months before this component existed.
 *
 * **It does not name Khan from a constant.** KHAN_TAUGHT_SUBJECTS is math,
 * reading and science; Social Studies is not in it, and Social Studies is
 * nonetheless being taught on Khan right now because she assigned World History
 * units. What he is actually doing lives in his assignments. So the Khan line
 * appears when there are real Khan rows for this subject this quarter, and it
 * counts them.
 */
export function QuietQuarterNote({ subject, status }) {
  if (!status?.quietThisQuarter) return null;

  const label = SUBJECT_LABELS[subject] || subject;
  const quarter = status.nextQuarter ? status.nextQuarter.split(' ')[0] : null;
  const opens = status.nextQuarterOpensOn
    ? parseDateStr(status.nextQuarterOpensOn).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
    : null;

  return (
    <div className="rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 px-4 py-3">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
        Nothing to start here this quarter — on purpose
      </p>

      {status.khanUnitsThisQuarter > 0 ? (
        <p className="mt-1 text-sm text-ink-200">
          {label} is on Khan Academy this quarter.{' '}
          {status.khanUnitsLeft > 0
            ? `${status.khanUnitsLeft} unit${status.khanUnitsLeft === 1 ? '' : 's'} left — the row on your board is the one to work from.`
            : 'Every unit assigned for this quarter is done.'}
        </p>
      ) : (
        <p className="mt-1 text-sm text-ink-200">
          {label} has no Mission Control lessons scheduled for this quarter.
        </p>
      )}

      {quarter && (
        <p className="mt-1 text-sm text-ink-300">
          The {status.laterCount} {label} lesson{status.laterCount === 1 ? '' : 's'} below open in{' '}
          <span className="font-display font-700 text-ink-100">{quarter}</span>
          {opens ? ` — ${opens}` : ''}. They are listed so you can see what is coming, not because they are late.
        </p>
      )}
    </div>
  );
}
