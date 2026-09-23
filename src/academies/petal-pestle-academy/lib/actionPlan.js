// ---------------------------------------------------------------------------
// Turns twelve measured levels into an ORDER OF WORK.
//
// A diagnostic that stops at "here are your levels" hands the parent a
// spreadsheet and the job of deciding what to do about it. IXL's diagnostic is
// useful because it ends in a list of what to work on next; this does the same
// thing, pointed at Khan Academy.
//
// THE RULE: lowest level first, but never more than three "start here" items at
// once. Twelve things to fix is a list nobody starts. Three is a week.
// ---------------------------------------------------------------------------

import { STRANDS, getStrand } from '../config/strands.js';
import { unitForStrand } from '../data/khan/khanMap.js';
import { confidenceFor, describeLevel } from '../engine/diagnosticEngine.js';

export const FOCUS_COUNT = 3;

/**
 * @param strands  the store's strand-state map
 * @param grades   her recorded Khan grades — REQUIRED for the unit to be right
 * @returns { focus, steady, stretch, unmeasured } — every measured strand
 *          appears in exactly one bucket, each already carrying its Khan link.
 *
 * ⚠️ `grades` WAS NOT A PARAMETER UNTIL v3.92, AND THAT WAS THE BUG. Without it
 * this file could only ask `khanFor`, whose unit is a static label from the
 * v3.20 era — so Home said "Measurement" while the Mathematics block opened
 * "Unit 5 · Money and time". Found by opening the live site and reading it.
 * `unitForStrand` is the one answer now, and it needs her grades to know how
 * far along her lane she is.
 */
export function buildActionPlan(strands, grades = []) {
  const measured = [];
  const unmeasured = [];

  for (const strand of STRANDS) {
    const state = strands[strand.id];
    if (!state || state.asked === 0) {
      unmeasured.push({ strand, state: state || null });
      continue;
    }
    measured.push({
      strand,
      state,
      level: state.level,
      confidence: confidenceFor(state),
      described: describeLevel(state.level),
      khan: unitForStrand(strand.id, state.level, grades),
      accuracy: state.asked > 0 ? state.correct / state.asked : 0
    });
  }

  // Lowest first. Ties broken by accuracy — of two strands sitting at 3.6, the
  // one she is getting fewer of right is the one to start with.
  measured.sort((a, b) => a.level - b.level || a.accuracy - b.accuracy);

  const focus = measured.slice(0, FOCUS_COUNT);
  const rest = measured.slice(FOCUS_COUNT);

  // "Stretch" is the top third of what remains, and it exists because a plan
  // made only of weaknesses is a demoralising document. She should be able to
  // see, on the same page, the things she is ahead on.
  const stretchCount = Math.max(1, Math.floor(rest.length / 3));
  const steady = rest.slice(0, rest.length - stretchCount);
  const stretch = rest.slice(rest.length - stretchCount);

  return { focus, steady, stretch, unmeasured, measuredCount: measured.length };
}

/** One plain sentence a parent can read in three seconds. */
export function planHeadline(plan) {
  if (plan.measuredCount === 0) {
    return 'No results yet — take the first sitting of the diagnostic to build a plan.';
  }
  if (plan.focus.length === 0) return 'Every strand is measured and on level.';
  const names = plan.focus.map((f) => f.strand.label);
  const list =
    names.length === 1
      ? names[0]
      : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
  return `Start with ${list}.`;
}

/**
 * The printable one-page version. Returned as plain data rather than markup so
 * the print view and any future export share one source.
 */
export function planRows(plan) {
  const rows = [];
  const push = (bucket, group) => {
    for (const entry of bucket) {
      rows.push({
        group,
        strandId: entry.strand.id,
        strand: entry.strand.label,
        subject: entry.strand.subject,
        level: Math.round(entry.level * 10) / 10,
        levelText: entry.described.text,
        confidence: entry.confidence,
        asked: entry.state.asked,
        correct: entry.state.correct,
        course: entry.khan?.courseLabel || '—',
        unit: entry.khan?.unit || '—',
        url: entry.khan?.courseUrl || null
      });
    }
  };
  push(plan.focus, 'Start here');
  push(plan.steady, 'Keep going');
  push(plan.stretch, 'Ready to stretch');
  for (const u of plan.unmeasured) {
    rows.push({
      group: 'Not measured yet',
      strandId: u.strand.id,
      strand: u.strand.label,
      subject: u.strand.subject,
      level: null,
      levelText: 'Not measured yet',
      confidence: 'none',
      asked: 0,
      correct: 0,
      course: '—',
      unit: '—',
      url: null
    });
  }
  return rows;
}

export function strandById(id) {
  return getStrand(id);
}
