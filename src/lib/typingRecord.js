/**
 * =============================================================================
 * WHAT HIS TYPING PRACTICE ADDS UP TO.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit item O-6, Aug 26 2026) ----
 *
 * Typing Practice is fifteen minutes a day on her printed timetable — block-5b,
 * five days a week, about 45 hours across a school year. Two things were true
 * about it until today, and the second is the one that mattered:
 *
 *   1. His speed was visible only on the practice screen itself, one passage at
 *      a time, and nowhere she could see it.
 *   2. **Neither typing table carried a date**, so no calendar could read them
 *      and `coveredBlockIds` had no branch for typing. Every one of those 45
 *      hours was structurally uncountable toward Georgia's 4.5-hour bar.
 *
 * `typingLog` (db.js v35) fixed the second. This file is the first: the dated
 * rows, read as a record — days, sessions, speed, accuracy, and whether the
 * speed is actually moving.
 *
 * ---- ACCURACY LEADS, SPEED FOLLOWS, HERE TOO ----
 *
 * TypingPractice.jsx made this decision first and wrote down why: until Aug 9
 * the result screen shouted WPM in 3xl and whispered accuracy underneath,
 * while Typing II taught him "accuracy before speed" — and a number that big IS
 * the instruction, whatever the lesson says. A summary that led with best-ever
 * WPM would undo that on the parent's screen, so `latest` and `accuracy` come
 * before `bestWpm`, and the trend is computed from RECENT work rather than from
 * a personal best that may be one lucky run in September.
 */

/** How many recent speed runs make up "recently". */
const RECENT_RUNS = 5;

const dated = (rows) => (rows || []).filter((r) => r && r.date);

function mean(values) {
  if (!values.length) return null;
  return Math.round(values.reduce((n, v) => n + v, 0) / values.length);
}

/**
 * The record.
 *
 * `sessions` counts ROWS and `days` counts DATES, and they are deliberately
 * different numbers: two passages in one sitting is two sessions and one school
 * day. Only the second is attendance evidence, and conflating them would
 * overstate the record in the one document that leaves this house.
 */
export function typingRecord(typingLog = [], { since = null, until = null } = {}) {
  const rows = dated(typingLog).filter(
    (r) => (!since || r.date >= since) && (!until || r.date <= until)
  );
  const speedRuns = rows
    .filter((r) => r.kind === 'speed' && Number.isFinite(r.wpm))
    .sort((a, b) => (a.date || '').localeCompare(b.date || '') || String(a.createdAt).localeCompare(String(b.createdAt)));

  const lessonRuns = rows.filter((r) => r.kind === 'lesson');
  const days = new Set(rows.map((r) => r.date));

  const recent = speedRuns.slice(-RECENT_RUNS);
  const earlier = speedRuns.slice(0, -RECENT_RUNS).slice(-RECENT_RUNS);
  const recentWpm = mean(recent.map((r) => r.wpm));
  const earlierWpm = mean(earlier.map((r) => r.wpm));

  const accuracies = speedRuns.map((r) => r.accuracy).filter((n) => Number.isFinite(n));

  return {
    sessions: rows.length,
    days: days.size,
    speedRuns: speedRuns.length,
    lessonRuns: lessonRuns.length,
    lastPractised: rows.length ? [...days].sort().pop() : null,
    bestWpm: speedRuns.length ? Math.max(...speedRuns.map((r) => r.wpm)) : null,
    latestWpm: speedRuns.length ? speedRuns[speedRuns.length - 1].wpm : null,
    recentWpm,
    /**
     * Null until there are two full windows to compare. A "trend" drawn from
     * three runs in one week is noise with an arrow on it, and an arrow is
     * believed.
     */
    trendWpm: recentWpm !== null && earlierWpm !== null ? recentWpm - earlierWpm : null,
    latestAccuracy: speedRuns.length ? speedRuns[speedRuns.length - 1].accuracy ?? null : null,
    averageAccuracy: mean(accuracies),
    /** The bar the practice screen itself sets before speed is worth building. */
    accurateEnough: accuracies.length ? accuracies.filter((a) => a >= 95).length : 0,
    accuracySamples: accuracies.length
  };
}

/**
 * One sentence, for a records packet or a card with room for a line.
 *
 * Says nothing it cannot evidence. "No typing practice recorded yet" is a true
 * statement about the year; "0 WPM" is not, and this project has already put a
 * confident wrong sentence into a compliance packet once — see
 * lib/participationRecord.js for that one.
 */
export function typingRecordSummary(record) {
  if (!record || record.sessions === 0) return 'No typing practice recorded yet.';
  const parts = [
    `${record.days} ${record.days === 1 ? 'day' : 'days'} practised`,
    `${record.sessions} ${record.sessions === 1 ? 'session' : 'sessions'}`
  ];
  if (record.averageAccuracy !== null) parts.push(`${record.averageAccuracy}% average accuracy`);
  if (record.latestWpm !== null) parts.push(`${record.latestWpm} WPM most recently`);
  if (record.bestWpm !== null && record.bestWpm !== record.latestWpm) parts.push(`best ${record.bestWpm}`);
  return parts.join(' · ');
}

/**
 * What the numbers mean, for her — the same rule every other panel in this app
 * follows. A figure with no sentence beside it is a figure somebody has to
 * interpret at the end of a long day.
 */
export function typingProgressNote(record) {
  if (!record || record.speedRuns === 0) {
    return record && record.lessonRuns > 0
      ? 'Typing lessons only so far — the speed passages are what produce a WPM.'
      : 'Nothing logged yet. Each finished passage records the day and credits the 11:15 block.';
  }
  if (record.averageAccuracy !== null && record.averageAccuracy < 95) {
    return `Accuracy is averaging ${record.averageAccuracy}%. The practice screen asks for 95% before speed is worth building — speed on the wrong fingers is far harder to undo later than it is to build.`;
  }
  if (record.trendWpm === null) {
    return `Accuracy is holding at ${record.averageAccuracy}%. A few more passages and this will show whether the speed is moving.`;
  }
  if (record.trendWpm > 0) {
    return `Up ${record.trendWpm} WPM on the last few passages, at ${record.averageAccuracy}% accuracy. That is the order it should happen in.`;
  }
  if (record.trendWpm < 0) {
    return `Down ${Math.abs(record.trendWpm)} WPM recently. Not a problem on its own — accuracy at ${record.averageAccuracy}% is the number that matters, and slowing down to keep it is the right trade.`;
  }
  return `Steady at about ${record.recentWpm} WPM and ${record.averageAccuracy}% accuracy.`;
}
