import { useState } from 'react';
import { HELP_DOORS, HELP_ORDER } from '../../lib/homeworkHelp.js';
import { useAppStore } from '../../store/useAppStore.js';

/**
 * "Stuck? Get help." — the family's library tutoring, on the student's own
 * board. The address is a setting (`helpNow`), not code; see
 * lib/homeworkHelp.js for why, and for why the try-it-yourself order is
 * printed beside the buttons rather than left unsaid.
 *
 * No link set — no card. An empty card offering help that goes nowhere is
 * worse than no card at all.
 */
export function HelpNowCard() {
  const helpNow = useAppStore((s) => s.helpNow);
  const [open, setOpen] = useState(false);

  if (!helpNow?.url) return null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span>
          <span className="block text-xs font-display uppercase tracking-widest text-signal-cyan">
            Stuck on something?
          </span>
          <span className="mt-1 block font-display text-base font-700 text-ink-100">
            Free tutoring from the library
          </span>
        </span>
        <span className="text-[11px] text-ink-500">{open ? 'Hide' : 'Open'}</span>
      </button>

      <ol className="mt-3 space-y-1">
        {HELP_ORDER.map((line, i) => (
          <li key={line} className="text-xs text-ink-300">
            <span className="font-display font-700 text-ink-500">{i + 1}.</span> {line}
          </li>
        ))}
      </ol>

      {open && (
        <div className="mt-3 space-y-2">
          {HELP_DOORS.map((door) => (
            <a
              key={door.id}
              href={helpNow.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg border border-space-600 bg-space-950 p-3 transition hover:border-signal-cyan"
            >
              <p className="font-display text-sm font-700 text-ink-100">{door.label} ↗</p>
              <p className="mt-0.5 text-xs text-ink-400">{door.blurb}</p>
              <p className="mt-1 text-[11px] text-ink-600">{door.press}</p>
            </a>
          ))}
          {helpNow.library && (
            <p className="text-[11px] text-ink-600">
              Paid for by the {helpNow.library} — it is free, and it is yours to use.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
