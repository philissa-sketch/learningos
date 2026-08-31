import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getGardenBriefById } from '../../academies/lamar/data/gardening/gardenBriefs.js';
import { gardenProjects } from '../../academies/lamar/data/gardening/gardenProjects.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';

/**
 * One Friday in the garden.
 *
 * An OPEN Friday is rendered as a real thing with a suggestion, not as an
 * empty state — a Friday with nothing on it still counts toward Georgia's 180
 * days if real activity is recorded on it, so the log button is here too.
 */
export function GardenBriefView({ day, onOpenProject }) {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const recordGardenLogEntry = useAppStore((s) => s.recordGardenLogEntry);
  const [saving, setSaving] = useState(false);

  if (!day) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="font-display text-base font-700 text-ink-100">No garden day this week</p>
        <p className="mt-1 text-sm text-ink-300">
          Q1 runs Aug 14 through Oct 30. Outside that window the Season tab shows what is scheduled.
        </p>
      </div>
    );
  }

  // A CLOSED Friday is not an open one. Without this branch Nov 27 and Dec 25
  // rendered as "Open Friday" with a null suggestion beneath it — an empty card
  // that looks like a garden day nobody bothered to fill in.
  if (day.closed) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-900 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">
          {new Date(day.date + 'T12:00:00').toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <h3 className="mt-1 font-display text-xl font-700 text-ink-300">School closed</h3>
        <p className="mt-1 text-sm text-ink-500">{day.closedReason}</p>
        <p className="mt-3 text-sm text-ink-300">
          The garden does not know it is a holiday. If it is cold, the covers still go on — and anything
          you do out there can still go in the log.
        </p>
      </div>
    );
  }

  const brief = day.briefId ? getGardenBriefById(day.briefId) : null;
  const alreadyLogged = gardenLog.some((r) => r.date === day.date && r.kind === 'session');
  const project = brief?.opensProjectId
    ? gardenProjects.find((p) => p.id === brief.opensProjectId)
    : brief?.closesProjectId
      ? gardenProjects.find((p) => p.id === brief.closesProjectId)
      : null;

  const handleLogSession = async () => {
    setSaving(true);
    await recordGardenLogEntry({
      kind: 'session',
      briefId: day.briefId,
      title: brief ? brief.title : 'Open Friday in the garden',
      date: day.date
    });
    setSaving(false);
  };

  const prettyDate = new Date(day.date + 'T12:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{prettyDate}</p>
        <h3 className="mt-1 font-display text-xl font-700 text-ink-100">
          {brief ? brief.title : 'Open Friday'}
        </h3>
        <p className="mt-1 text-sm text-ink-300">{brief ? brief.theme : day.suggestion}</p>
        {brief && (
          <p className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3 text-sm text-ink-300">
            <span className="font-display font-600 text-signal-amber">Why today: </span>
            {brief.whyToday}
          </p>
        )}
      </div>

      {brief?.teaching.map((block, i) => (
        <div key={i} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <h4 className="font-display text-base font-700 text-ink-100">{block.heading}</h4>
          {block.text.split('\n\n').map((para, j) => (
            <p key={j} className="mt-2 text-sm leading-relaxed text-ink-300">
              {para}
            </p>
          ))}
        </div>
      ))}

      {brief && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">In the garden</p>
          <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-ink-300">
            {brief.doInTheGarden.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      {brief && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Log this</p>
          <ul className="mt-2 space-y-2 text-sm text-ink-300">
            {brief.logThis.map((item, i) => (
              <li key={i}>
                <span className="rounded-full border border-signal-cyan/30 bg-signal-cyan/10 px-2 py-0.5 font-display text-xs text-signal-cyan">
                  {item.kind}
                </span>{' '}
                {item.what}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project && (
        <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            {brief.opensProjectId ? 'This opens a project' : 'This closes a project'}
          </p>
          <h4 className="mt-1 font-display text-base font-700 text-ink-100">{project.title}</h4>
          <p className="mt-1 text-sm text-ink-300">{project.objectives}</p>
          {brief.closesProjectId && (
            <p className="mt-2 text-sm text-ink-300">
              The write-up is graded — it goes in the Writing Journal like every other hands-on project.
            </p>
          )}
          {onOpenProject && (
            <button
              type="button"
              onClick={() => onOpenProject(project)}
              className="mt-3 rounded-lg bg-signal-cyan px-3 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
            >
              {brief.closesProjectId ? 'Write it up' : 'Open the project'}
            </button>
          )}
        </div>
      )}

      {brief?.connectsTo?.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Connects to</p>
          <ul className="mt-2 space-y-2 text-sm text-ink-300">
            {brief.connectsTo.map((c, i) => (
              <li key={i}>
                <span className="font-display font-600 text-ink-100">
                  {SUBJECT_LABELS[c.subject] || c.subject} — {c.label}.{' '}
                </span>
                {c.detail}
              </li>
            ))}
          </ul>
        </div>
      )}

      {brief?.sources?.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Where this comes from</p>
          <ul className="mt-2 space-y-1">
            {brief.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-display text-signal-cyan underline underline-offset-2 hover:brightness-125"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={handleLogSession}
        disabled={alreadyLogged || saving}
        className={
          'w-full rounded-lg px-4 py-3 text-sm font-display font-700 transition ' +
          (alreadyLogged
            ? 'cursor-default bg-space-700 text-ink-500'
            : 'bg-signal-green text-space-950 hover:brightness-110')
        }
      >
        {alreadyLogged ? 'Garden day recorded' : "Record today's garden work"}
      </button>
    </div>
  );
}
