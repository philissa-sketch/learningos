import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { useToday } from '../../lib/useToday.js';
import {
  wateringStats,
  formatAmounts,
  WEEKS_NEEDED_FOR_ZONE_RANKING
} from '../../lib/wateringLog.js';

const KINDS = [
  { id: 'watering', label: 'Watering', needsAmount: true },
  { id: 'planting', label: 'Planting', needsAmount: false },
  { id: 'observation', label: 'Observation', needsAmount: false },
  { id: 'measurement', label: 'Measurement', needsAmount: true },
  { id: 'harvest', label: 'Harvest', needsAmount: true },
  { id: 'changeover', label: 'Season changeover', needsAmount: false }
];
const ZONES = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'whole garden'];

/**
 * The garden's one record. Every kind lands in the same table (db.js v28), so
 * this is one form with a type picker rather than six separate trackers.
 *
 * The watering rows matter beyond today: they are the dataset the Q4
 * soil-moisture sensor gets built against, which is why the amount field is
 * here from day one rather than added in April.
 */
export function GardenLogView() {
  const gardenLog = useAppStore((s) => s.gardenLog);
  const recordGardenLogEntry = useAppStore((s) => s.recordGardenLogEntry);
  const today = useToday();

  const [kind, setKind] = useState('watering');
  const [zone, setZone] = useState('whole garden');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('cups');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const activeKind = KINDS.find((k) => k.id === kind);

  const handleSave = async () => {
    if (!notes.trim() && !amount.trim()) return;
    setSaving(true);
    await recordGardenLogEntry({
      kind,
      title: `${activeKind.label} — ${zone}`,
      notes: notes.trim(),
      data: {
        zone,
        amount: amount.trim() ? Number(amount) : null,
        unit: amount.trim() ? unit : null
      }
    });
    setAmount('');
    setNotes('');
    setSaving(false);
  };

  const recent = [...gardenLog].reverse().slice(0, 25);

  /**
   * ---- IS THE HABIT BEING KEPT? (Aug 24, 2026) ----
   *
   * This panel used to print one number: the total amount of water carried,
   * summed across cups and gallons as though they were the same unit. Two
   * things wrong with that. The unit mixing is arithmetic. The bigger one is
   * that a TOTAL cannot report a HABIT — twelve rows in one week and nothing
   * since reads identically to twelve weeks in a row, and it is the weekly
   * consistency, not the volume, that the September zone ranking and the
   * November bucket build and the April sensor all actually depend on.
   */
  const water = useMemo(() => wateringStats(gardenLog, today), [gardenLog, today]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Add to the log</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={
                'min-h-[36px] rounded-md px-3 py-1.5 text-xs font-display font-600 transition-colors ' +
                (kind === k.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
              }
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-display uppercase tracking-widest text-ink-500">Zone</span>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
            >
              {ZONES.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </label>

          {activeKind.needsAmount && (
            <label className="block">
              <span className="text-xs font-display uppercase tracking-widest text-ink-500">How much</span>
              <div className="mt-1 flex gap-2">
                <input
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
                />
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="rounded-lg border border-space-600 bg-space-900 px-2 py-2 text-sm text-ink-100"
                >
                  <option value="cups">cups</option>
                  <option value="gallons">gallons</option>
                  <option value="inches">inches</option>
                  <option value="pH">pH</option>
                  <option value="oz">oz</option>
                </select>
              </div>
            </label>
          )}
        </div>

        <label className="mt-3 block">
          <span className="text-xs font-display uppercase tracking-widest text-ink-500">What happened</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Kale in B2 is stretching toward the open edge. Mix was dry two inches down."
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || (!notes.trim() && !amount.trim())}
          className="mt-3 w-full rounded-lg bg-signal-cyan px-4 py-2.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-default disabled:bg-space-700 disabled:text-ink-500"
        >
          Save to the garden log
        </button>
      </div>

      <div className="rounded-xl border border-signal-amber/30 bg-signal-amber/5 p-4 shadow-panel">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">The watering log</p>
          <p className="flex-none font-display text-sm font-700 text-ink-100">
            {water.weeksCovered} of the last {water.weeksTracked} weeks
          </p>
        </div>

        {/* Four boxes, one per week. Present or absent — no other state. */}
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {water.weeks.map((w) => (
            <div
              key={w.weekStart}
              className={
                'rounded-lg border px-2 py-1.5 text-center ' +
                (w.logged
                  ? 'border-signal-green/40 bg-signal-green/10'
                  : w.isCurrent
                    ? 'border-signal-amber/40 bg-signal-amber/10'
                    : 'border-space-600 bg-space-900')
              }
            >
              <p className="font-display text-xs text-ink-500">
                {w.isCurrent ? 'this week' : `wk of ${w.label}`}
              </p>
              <p
                className={
                  'font-display text-sm font-700 ' +
                  (w.logged ? 'text-signal-green' : w.isCurrent ? 'text-signal-amber' : 'text-ink-500')
                }
              >
                {w.logged ? `${w.count}×` : '—'}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-2 text-xs text-ink-300">
          {water.totalRows === 0 ? (
            <>
              Nothing watered into the log yet. The Aug 28 brief starts it:{' '}
              <span className="text-ink-100">one row per watering — zone and amount carried</span>, every
              week from here to April.
            </>
          ) : (
            <>
              <span className="text-ink-100">{water.totalRows} waterings</span> logged
              {formatAmounts(water.totalsByUnit) && <> · {formatAmounts(water.totalsByUnit)} carried</>}
              {water.streak > 1 && (
                <span className="text-signal-green"> · {water.streak} weeks in a row</span>
              )}
              {water.daysSinceLast !== null && water.daysSinceLast >= 7 && (
                <span className="text-signal-amber"> · last one {water.daysSinceLast} days ago</span>
              )}
              .
            </>
          )}
        </p>

        {/* What the streak is FOR — the two builds that cannot happen without it. */}
        <p className="mt-2 rounded-lg border border-space-600 bg-space-900 p-2.5 text-xs text-ink-300">
          {water.canRankZones ? (
            <>
              <span className="text-signal-green">Four weeks of rows exist.</span> That is enough to rank the
              zones thirstiest-to-least — which is how the September brief picks the zone the November
              self-watering buckets go in.
            </>
          ) : (
            <>
              <span className="text-ink-100">
                {water.weeksUntilRanking} more {water.weeksUntilRanking === 1 ? 'week' : 'weeks'}
              </span>{' '}
              of rows and you can rank the zones thirstiest-to-least. That ranking is how the Sep 25 brief
              picks which zone the November self-watering buckets go in — {WEEKS_NEEDED_FOR_ZONE_RANKING}{' '}
              weeks of data is the whole precondition. Every row is also data for the Q4 soil-moisture
              sensor; nothing else knows how much water this garden actually uses.
            </>
          )}
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">
          Recent entries ({gardenLog.length} total)
        </p>
        {recent.length === 0 && (
          <p className="rounded-xl border border-space-700 bg-space-800 p-4 text-sm text-ink-500 shadow-panel">
            Nothing logged yet. The first entry is the changeover on August 14.
          </p>
        )}
        {recent.map((row) => (
          <div key={row.id} className="rounded-xl border border-space-700 bg-space-800 p-3 shadow-panel">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-sm font-700 text-ink-100">{row.title || row.kind}</p>
              <span className="flex-none text-xs text-ink-500">{row.date}</span>
            </div>
            {row.notes && <p className="mt-1 text-sm text-ink-300">{row.notes}</p>}
            {typeof row.data?.amount === 'number' && (
              <p className="mt-1 text-xs text-ink-500">
                {row.data.amount} {row.data.unit || ''} · {row.data.zone}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
