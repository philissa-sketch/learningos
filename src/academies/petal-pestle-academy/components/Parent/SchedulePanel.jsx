import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  orderedBlocks,
  toClock,
  toMinutes,
  instructionalMinutes,
  KIND_STYLES,
  DEFAULT_SCHEDULE
} from '../../config/schedule.js';
import { SUBJECT_OPTIONS, resolveBlockTarget } from '../../lib/blockLinks.js';

// ---------------------------------------------------------------------------
// EDITING HER DAY.
//
// The default schedule is a starting point, not a prescription. Everything here
// is editable: rename a block, move it, lengthen it, delete it, add your own.
//
// ---- WHY THE OVERLAP WARNING IS A WARNING AND NOT A BLOCK ----
//
// Two blocks at the same time is usually a mistake, so it is flagged. It is not
// forbidden, because sometimes it is not a mistake — singing while the bread
// proves, a walk that is also the science lesson. Software that refuses to save
// a timetable a parent deliberately wrote is software that gets abandoned for a
// paper one.
//
// ---- WHY BREAKS ARE COUNTED SEPARATELY ----
//
// The minutes total at the bottom excludes breaks. If this number is ever going
// to be copied onto a form for the state, it has to mean instructional time.
// A total that quietly includes lunch is not a number anyone should file.
// ---------------------------------------------------------------------------

const KINDS = [
  ['core', 'Khan subject'],
  ['signature', 'Her course'],
  ['doing', 'Doing'],
  ['open', 'Open'],
  ['break', 'Break']
];

function newBlockId() {
  return `blk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}


/**
 * Shows the grown-up EXACTLY where a block will send her, resolved from her
 * real measured levels — not a promise that it will send her somewhere.
 *
 * Social Studies is the case this exists for. It is a Khan subject on the plan
 * and it has no entry in the Khan map yet, because I have not checked what Khan
 * offers at 4th-grade level. Rather than hide that, the row says so.
 */
function BlockTargetNote({ block, strands, khanGrades }) {
  const target = resolveBlockTarget(block, strands, khanGrades);
  if (!block.subject) return null;
  if (!target) {
    return (
      <span className="text-[0.7rem] text-clay-500">
        no link yet — Khan’s 4th-grade coverage for this still needs checking
      </span>
    );
  }
  return (
    <span className="text-[0.7rem] text-sage-700">
      → {target.label}
      {target.detail ? ` (${target.detail})` : ''}
      {/* v3.74 — WHY IT IS STILL THE SAME UNIT AS LAST WEEK.
          Gigi expected a new week to bring a new unit. It does not: the unit
          moves when a result is recorded in Khan grades, and nothing said so.
          Only on Khan rows, and only while she is still mid-course. */}
      {target.kind === 'khan' && target.unitN ? (
        <span className="block text-ink-500">
          stays here until you record a result in Khan grades
        </span>
      ) : null}
    </span>
  );
}

export function SchedulePanel() {
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const strands = useAppStore((s) => s.strands);
  const khanGrades = useAppStore((s) => s.khanGrades);
  const save = useAppStore((s) => s.saveScheduleBlocks);
  const resetSchedule = useAppStore((s) => s.resetScheduleBlocks);

  const [draft, setDraft] = useState(() => blocks.map((b) => ({ ...b })));
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(i, patch) {
    setDraft((d) => d.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
    setDirty(true);
    setSaved(false);
  }

  function removeAt(i) {
    setDraft((d) => d.filter((_, idx) => idx !== i));
    setDirty(true);
    setSaved(false);
  }

  function add() {
    const last = orderedBlocks(draft).slice(-1)[0];
    const startMin = last ? last.endMin : 9 * 60;
    const hh = String(Math.floor(startMin / 60) % 24).padStart(2, '0');
    const mm = String(startMin % 60).padStart(2, '0');
    setDraft((d) => [
      ...d,
      {
        id: newBlockId(),
        label: 'New block',
        icon: '⭐',
        start: `${hh}:${mm}`,
        minutes: 20,
        kind: 'open',
        note: ''
      }
    ]);
    setDirty(true);
    setSaved(false);
  }

  async function commit() {
    await save(draft);
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function restoreDefault() {
    await resetSchedule();
    setDraft(DEFAULT_SCHEDULE.map((b) => ({ ...b })));
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // Overlaps, computed on the ordered view so the message names real neighbours.
  const ord = orderedBlocks(draft);
  const overlaps = [];
  for (let i = 1; i < ord.length; i++) {
    if (ord[i].startMin < ord[i - 1].endMin) {
      overlaps.push(`${ord[i - 1].label} runs into ${ord[i].label}`);
    }
  }
  const badTimes = draft.filter((b) => toMinutes(b.start) == null);

  return (
    <div className="space-y-5">
      <section className="panel px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg text-ink-900">Her school day</h2>
            <p className="mt-1 text-xs text-ink-700">
              Four days a week, four hours a day. Change anything — this is a starting point, not a
              rule.
            </p>
          </div>
          <button
            type="button"
            onClick={restoreDefault}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-xs font-700 text-ink-700 hover:border-lavender-500"
          >
            Back to the default day
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {draft.map((b, i) => {
            const style = KIND_STYLES[b.kind] || KIND_STYLES.open;
            const timeOk = toMinutes(b.start) != null;
            return (
              <div
                key={b.id}
                className="rounded-petal border border-cream-300 bg-white px-3 py-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    value={b.icon}
                    onChange={(e) => update(i, { icon: e.target.value.slice(0, 2) })}
                    className="w-12 rounded-full border border-cream-300 px-2 py-1.5 text-center text-lg outline-none focus:border-lavender-500"
                    aria-label="Icon"
                  />
                  <input
                    value={b.label}
                    onChange={(e) => update(i, { label: e.target.value })}
                    className="min-w-[9rem] flex-1 rounded-full border border-cream-300 px-3 py-1.5 text-sm font-700 outline-none focus:border-lavender-500"
                    aria-label="Block name"
                  />
                  <input
                    value={b.start}
                    onChange={(e) => update(i, { start: e.target.value })}
                    placeholder="09:15"
                    className={`w-20 rounded-full border px-3 py-1.5 text-center text-sm tnum outline-none focus:border-lavender-500 ${
                      timeOk ? 'border-cream-300' : 'border-clay-500 bg-clay-500/10'
                    }`}
                    aria-label="Start time, 24 hour"
                  />
                  <input
                    type="number"
                    min="1"
                    max="240"
                    value={b.minutes}
                    onChange={(e) => update(i, { minutes: Number(e.target.value) })}
                    className="w-20 rounded-full border border-cream-300 px-3 py-1.5 text-center text-sm tnum outline-none focus:border-lavender-500"
                    aria-label="Minutes"
                  />
                  <select
                    value={b.kind}
                    onChange={(e) => update(i, { kind: e.target.value })}
                    className={`rounded-full border border-cream-300 px-3 py-1.5 text-xs font-700 outline-none focus:border-lavender-500 ${style.chip}`}
                    aria-label="Kind"
                  >
                    {KINDS.map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    className="rounded-full px-2 py-1 text-xs text-ink-500 hover:text-clay-500"
                    aria-label={`Delete ${b.label}`}
                  >
                    ✕
                  </button>
                </div>
                <input
                  value={b.note || ''}
                  onChange={(e) => update(i, { note: e.target.value })}
                  placeholder="What happens in this block (she sees this)"
                  className="mt-2 w-full rounded-full border border-cream-300 px-3 py-1.5 text-xs outline-none focus:border-lavender-500"
                  aria-label="Note"
                />

                {/* WHAT THE BLOCK OPENS. Without this a block is a label and
                    she has to go and find the lesson herself — six steps a
                    nine-year-old will not take. */}
                <div className="mt-2 flex flex-wrap items-center gap-2 pl-1">
                  <span className="text-[0.7rem] text-ink-500">Opens:</span>
                  <select
                    value={b.subject || ''}
                    onChange={(e) => update(i, { subject: e.target.value || undefined })}
                    className="rounded-full border border-cream-300 px-3 py-1 text-xs outline-none focus:border-lavender-500"
                    aria-label="What this block opens"
                  >
                    {SUBJECT_OPTIONS.map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <BlockTargetNote block={b} strands={strands} khanGrades={khanGrades} />
                </div>

                {timeOk && (
                  <p className="mt-1 pl-3 text-[0.7rem] text-ink-500">
                    {toClock(toMinutes(b.start))} – {toClock(toMinutes(b.start) + Number(b.minutes || 0))}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={add}
          className="mt-3 rounded-full border border-dashed border-cream-300 px-4 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
        >
          + Add a block
        </button>

        {badTimes.length > 0 && (
          <p className="mt-3 rounded-petal bg-clay-500/10 px-3 py-2 text-xs text-clay-500">
            {badTimes.length} block{badTimes.length === 1 ? ' has' : 's have'} a time the app cannot
            read. Use 24-hour form, like <span className="font-mono">09:15</span> or{' '}
            <span className="font-mono">13:00</span>. Those blocks will not show on her day until
            this is fixed.
          </p>
        )}

        {overlaps.length > 0 && (
          <div className="mt-3 rounded-petal bg-gold-300/25 px-3 py-2 text-xs text-ink-700">
            <p className="font-700">Two things are booked at once:</p>
            <ul className="mt-1 list-disc pl-4">
              {overlaps.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p className="mt-1 text-ink-500">
              Saving anyway is fine if you meant it — some things genuinely happen together.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-500">
            <span className="tnum font-700 text-ink-700">{instructionalMinutes(draft)}</span> minutes
            of instruction, breaks excluded ·{' '}
            <span className="tnum">{(instructionalMinutes(draft) / 60).toFixed(1)}</span> hours
          </p>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs font-700 text-sage-700">Saved ✓</span>}
            <button
              type="button"
              onClick={commit}
              disabled={!dirty}
              className="rounded-full bg-lavender-500 px-6 py-2.5 text-sm font-700 text-white hover:bg-lavender-700 disabled:opacity-40"
            >
              Save the day
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
