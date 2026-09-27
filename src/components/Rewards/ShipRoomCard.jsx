import { useEffect, useState } from 'react';
import { installedShelf } from '../../lib/shipRoom.js';

/**
 * =============================================================================
 * THE INSIDE OF A ROOM.
 * =============================================================================
 *
 * What you see once a hatch is open: what is already installed, what the next
 * piece is with a way to go and do it, and one job that can be done from in
 * here.
 *
 * ---- THIS FILE KNOWS NOTHING ABOUT ANY SCHOOL ----
 *
 * Every name it prints — units, books, entries, the next thing, what the job
 * writes to — arrives in `interior`, already assembled by the part of the app
 * that knows the Academy. The view a button opens arrives as data too. That is
 * why a subject can be renamed, or a whole elective dropped, without this file
 * changing.
 *
 * ---- A SEALED ROOM SHOWS ONE SENTENCE AND NOTHING ELSE ----
 *
 * No greyed-out list of what is coming, no counter, no bar. A hatch that
 * previews its contents turns the work into a price. The sentence says what
 * opens it; that is the whole contract.
 */

/** The hatch: one line, and no sight of what is behind it. */
function Sealed({ interior }) {
  return (
    <div className="rounded-lg border border-space-700 bg-space-950 px-3 py-3">
      <p className="font-display text-sm font-700 text-ink-400">Sealed hatch</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-500">{interior.sealHint}</p>
    </div>
  );
}

/** One field of a job. Text or number; a `rows` field becomes a textarea. */
function Field({ field, value, onChange, disabled }) {
  const common = {
    value: value ?? '',
    disabled,
    onChange: (e) => onChange(field.key, e.target.value),
    placeholder: field.placeholder || '',
    className:
      'mt-1 w-full rounded-md border border-space-600 bg-space-900 px-2 py-1.5 text-sm text-ink-100 '
      + 'placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none disabled:opacity-50'
  };
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wide text-ink-500">{field.label}</span>
      {field.rows ? (
        <textarea rows={field.rows} maxLength={field.maxLength} {...common} />
      ) : field.type === 'number' ? (
        <input type="number" inputMode="numeric" min={field.min} max={field.max} {...common} />
      ) : (
        <input type="text" maxLength={field.maxLength} {...common} />
      )}
    </label>
  );
}

/**
 * The job.
 *
 * Three states, and only one of them is a button:
 *   done     already run today, or nothing left to run — said plainly
 *   blocked  its prerequisite is missing, with the reason, and NO button
 *   ready    the form
 *
 * A blocked job is never a greyed-out button. A control that cannot work but
 * looks like it should is how a child concludes they did something wrong.
 */
function Job({ job, busy, result, onRun }) {
  const [values, setValues] = useState({});
  useEffect(() => { setValues({}); }, [job?.id]);

  if (!job) return null;

  if (job.state === 'done') {
    return <p className="mt-3 text-xs font-display font-700 text-signal-green">{job.label || job.reason}</p>;
  }
  if (job.state === 'blocked') {
    return <p className="mt-3 text-xs text-ink-500">{job.reason}</p>;
  }

  const fields = Array.isArray(job.fields) ? job.fields : [];
  const set = (key, v) => setValues((prev) => ({ ...prev, [key]: v }));

  return (
    <div className="mt-3 rounded-lg border border-space-700 bg-space-900/60 px-3 py-2.5">
      <p className="font-display text-xs font-700 uppercase tracking-widest text-signal-cyan">Station job</p>
      <p className="mt-0.5 font-display text-sm font-700 text-ink-100">{job.label}</p>
      {job.hint && <p className="mt-1 text-xs leading-relaxed text-ink-500">{job.hint}</p>}

      {fields.length > 0 && (
        <div className="mt-2 space-y-2">
          {fields.map((f) => (
            <Field key={f.key} field={f} value={values[f.key]} onChange={set} disabled={busy} />
          ))}
        </div>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={() => onRun?.(values)}
        className="mt-2.5 rounded-lg border border-signal-cyan px-3 py-1.5 font-display text-xs font-700 text-signal-cyan hover:bg-signal-cyan hover:text-space-950 disabled:opacity-50"
      >
        {busy ? 'Working…' : (job.verb || 'Do it')}
      </button>

      {result && (
        <p className={'mt-2 text-xs font-display font-700 ' + (result.ok ? 'text-signal-green' : 'text-signal-amber')}>
          {result.message}
        </p>
      )}
    </div>
  );
}

export function ShipRoomCard({ interior, onOpenNext = null, onRunJob = null, busy = false, result = null }) {
  if (!interior) {
    return (
      <div className="rounded-lg border border-space-700 bg-space-950 px-3 py-3">
        <p className="text-xs text-ink-500">Tap a room to go into it. The shaft on the right is the lift between decks.</p>
      </div>
    );
  }

  if (interior.sealed) return <Sealed interior={interior} />;

  const shelf = installedShelf(interior.installed);

  return (
    <div className="rounded-lg border border-space-700 bg-space-950 px-3 py-3">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <p className="font-display text-sm font-700 text-ink-100">{interior.name}</p>
        <p className="text-[11px] uppercase tracking-widest text-ink-500">{interior.tierName}</p>
        {interior.detail && <p className="text-xs text-ink-500">{interior.detail}</p>}
      </div>
      <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{interior.doing}</p>

      {/* ---- WHAT IS ALREADY IN HERE ---- */}
      {shelf.total > 0 && (
        <div className="mt-3">
          <p className="font-display text-xs font-700 uppercase tracking-widest text-ink-500">
            Installed · {shelf.total}
          </p>
          <ul className="mt-1 space-y-0.5">
            {shelf.shown.map((row) => (
              <li key={row.id} className="flex items-baseline justify-between gap-2 text-xs">
                <span className="text-ink-300">{row.title}</span>
                {row.when && <span className="shrink-0 text-[11px] text-ink-600">{row.when}</span>}
              </li>
            ))}
          </ul>
          {shelf.hidden > 0 && (
            <p className="mt-0.5 text-[11px] text-ink-600">and {shelf.hidden} more already fitted</p>
          )}
        </div>
      )}

      {/* ---- WHAT IS NEXT, AND THE WAY TO GO AND DO IT ---- */}
      {interior.next && (
        <div className="mt-3 border-t border-space-800 pt-2.5">
          <p className="font-display text-xs font-700 uppercase tracking-widest text-ink-500">Next</p>
          <p className="mt-0.5 text-xs text-ink-200">{interior.next.title}</p>
          {onOpenNext && (
            <button
              type="button"
              onClick={() => onOpenNext(interior.next)}
              className="mt-1.5 rounded-lg border border-space-600 px-3 py-1.5 font-display text-xs font-700 text-ink-200 hover:border-signal-cyan hover:text-signal-cyan"
            >
              {interior.next.cta || 'Go work on it'}
            </button>
          )}
        </div>
      )}

      {interior.nextStep && (
        <p className="mt-2 text-xs font-display font-700 text-signal-cyan">{interior.nextStep}</p>
      )}

      <Job job={interior.job} busy={busy} result={result} onRun={(values) => onRunJob?.(interior.job, values)} />
    </div>
  );
}
