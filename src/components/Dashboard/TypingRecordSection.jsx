import { useAppStore } from '../../store/useAppStore.js';
import { typingRecord, typingProgressNote } from '../../lib/typingRecord.js';
import { BLOCK_FOR_SUBJECT, blockMinutes } from '../../lib/scheduledMinutes.js';
import { defaultSchedule } from '../../academies/lamar/data/schedule/defaultSchedule.js';

/**
 * =============================================================================
 * TYPING — the second daily strand with no record anywhere. (O-6, Aug 26 2026.)
 * =============================================================================
 *
 * Spelling and Vocabulary was the first, and its section carries the note:
 * *"the one daily strand with no record anywhere."* It was not the one. Typing
 * Practice is fifteen minutes a day on her printed schedule and it had:
 *
 *   * a personal best per passage, visible only on the practice screen;
 *   * a mastery flag per lesson, visible only in the lesson list;
 *   * **no date on either**, so no calendar could read them, `coveredBlockIds`
 *     had no branch for typing, and about 45 hours a year could not be counted
 *     toward Georgia's 4.5-hour bar.
 *
 * This panel is the first half of that fixed — the record she can see. The
 * second half is `typingLog` (db.js v35), which is what it reads.
 */
export function TypingRecordSection() {
  const typingLog = useAppStore((s) => s.typingLog);
  const scheduleBlocks = useAppStore((s) => s.scheduleBlocks);

  const record = typingRecord(typingLog || []);

  /**
   * Her block, not a hardcoded fifteen. She can move it, and a panel that
   * quoted the default while her timetable said something else would be a
   * fourth copy of a number that already lives in one place.
   */
  const blocks = Array.isArray(scheduleBlocks) && scheduleBlocks.length ? scheduleBlocks : defaultSchedule;
  const block = blocks.find((b) => b.id === BLOCK_FOR_SUBJECT.typing);
  const minutes = block ? blockMinutes(block) : 0;
  const credited = record.days * minutes;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Records</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Typing</h3>
        <p className="mt-2 text-sm text-ink-300">
          {block?.label || 'Typing Practice'} runs {minutes} minutes a day
          {block?.startTime ? ` at ${block.startTime}` : ''}. Every finished passage and every completed
          typing lesson now writes a dated row — which is what lets those minutes count toward his
          Georgia hours. Until August 26 they could not: the app recorded his best speed and his lesson
          mastery, and neither of those carries a date a calendar can read.
        </p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Days practised" value={String(record.days)} />
          <Metric label="Sessions" value={String(record.sessions)} />
          <Metric
            label="Average accuracy"
            value={record.averageAccuracy === null ? '—' : `${record.averageAccuracy}%`}
          />
          {/* SPEED IS LAST ON PURPOSE — see lib/typingRecord.js. */}
          <Metric label="Latest speed" value={record.latestWpm === null ? '—' : `${record.latestWpm} WPM`} />
        </div>

        <p className="mt-3 text-xs text-ink-400">{typingProgressNote(record)}</p>

        {record.days > 0 && (
          <p className="mt-2 text-xs text-ink-600">
            {record.days} {record.days === 1 ? 'day' : 'days'} × {minutes} minutes ={' '}
            {Math.floor(credited / 60)}h {credited % 60}m credited to {block?.label || 'the typing block'} so
            far. A day with two passages on it still counts once — the block is fifteen minutes however many
            times he sits down.
          </p>
        )}

        {record.bestWpm !== null && record.bestWpm !== record.latestWpm && (
          <p className="mt-1 text-xs text-ink-600">Personal best across all passages: {record.bestWpm} WPM.</p>
        )}
        {record.lastPractised && (
          <p className="mt-1 text-xs text-ink-600">Last practised {record.lastPractised}.</p>
        )}
      </div>

      {record.sessions === 0 && (
        <div className="rounded-xl border border-space-700 bg-space-900 p-4">
          <p className="text-xs text-ink-500">
            Nothing here yet is not the same as nothing done. Rows only start from the day this shipped —
            typing he did before August 26 was recorded as a personal best with no date attached, and there
            is no honest way to spread those across days that were never written down.
          </p>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">{label}</p>
      <p className="mt-0.5 font-display text-lg font-700 text-ink-100">{value}</p>
    </div>
  );
}
