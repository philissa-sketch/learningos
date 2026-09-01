
function Bar({ pct, tone = 'green' }) {
  const color = tone === 'cyan' ? 'bg-signal-cyan' : 'bg-signal-green';
  return (
    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-space-700">
      <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function ProgressRow({ subject, total, mastered }) {
  const pct = total > 0 ? Math.round((mastered / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-display font-600 text-ink-100">{subjectCardLabel(subject)}</span>
        <span className="telemetry text-ink-500">
          {mastered}/{total} mastered
        </span>
      </div>
      <Bar pct={pct} />
    </div>
  );
}

/**
 * An archived subject's row.
 *
 * WHY THIS IS NOT A ProgressRow. Math, Reading and Science were handed to Khan
 * Academy, and their Mission Control lessons — 204 of the app's 356 — are no
 * longer the work. Rendering them as a mastery bar meant three subjects sat at
 * "0/106 mastered" with an empty bar, permanently, while the Khan units he was
 * actually completing in those very subjects appeared nowhere on this screen.
 *
 * A number that cannot move is worse than no number: it reads as failure to the
 * only person looking at it, and it hid his real progress at the same time.
 *
 * So an archived subject now reports what he is actually doing — Khan units
 * completed — and says plainly that the old lessons are retired rather than
 * unfinished.
 */
function ArchivedRow({ subject, khan }) {
  const done = khan ? khan.completed : 0;
  const total = khan ? khan.total : 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-display font-600 text-ink-100">{subjectCardLabel(subject)}</span>
        <span className="telemetry text-ink-500">
          {total > 0 ? `${done}/${total} Khan units` : 'On Khan Academy'}
        </span>
      </div>
      {total > 0 && <Bar pct={pct} tone="cyan" />}
    </div>
  );
}

/**
 * `khanBySubject` is { subject -> { completed, total } }. Optional: when it is
 * absent the archived block still renders, it simply says where the work lives
 * instead of counting it.
 */
export function SubjectProgressOverview({ subjectProgress, khanBySubject = {} }) {
  const subjects = Object.entries(subjectProgress);
  const active = subjects.filter(([subject]) => !isKhanTaughtSubject(subject));
  const khanTaught = subjects.filter(([subject]) => isKhanTaughtSubject(subject));

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="mb-3 text-xs font-display uppercase tracking-widest text-ink-500">Subject Progress</p>
      <div className="space-y-3">
        {active.map(([subject, data]) => (
          <ProgressRow key={subject} subject={subject} {...data} />
        ))}
        {active.length === 0 && subjects.length === 0 && <p className="text-sm text-ink-500">No subjects loaded yet.</p>}
      </div>

      {khanTaught.length > 0 && (
        <div className="mt-5 border-t border-space-700 pt-4">
          <p className="mb-3 text-xs font-display uppercase tracking-widest text-ink-500">
            Now taught on Khan Academy
          </p>
          <div className="space-y-3">
            {khanTaught.map(([subject]) => (
              <ArchivedRow key={subject} subject={subject} khan={khanBySubject[subject]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import { academyContent } from '../../content/academyContent.js';

const { isKhanTaughtSubject = () => null, subjectCardLabel = () => null } = academyContent().subjects;
