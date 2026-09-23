// ---------------------------------------------------------------------------
// SHOULD THIS FILE BE LOADED? — THE DECISION, WHERE A CHECK CAN CALL IT.
//
// ---- WHY THIS FILE EXISTS ----
//
// §32.7, found by Gigi using the app on Aug 18: the green "Load her latest
// export" button "offered a stale file that would have overwritten four
// in-progress re-measures… the hazard stands — the button does not say how old
// its file is relative to her live data."
//
// The merge rule itself was fixed on Aug 19 (see pickStrand), so a stale file
// can no longer silently revert a re-measure. THAT IS NOT THE WHOLE OF IT. A
// grown-up standing in front of this screen still cannot tell what the offered
// file IS, and "do not load an older file" currently lives in a note she has to
// remember on the one morning she is already handling four half-finished
// measurements.
//
// Rule 6: A RULE I MUST ACT ON IS A CHECK, NOT A WARNING. This is that rule,
// turned into code.
//
// ---- WHY IT IS A PURE FUNCTION AND NOT AN `if` IN THE COMPONENT ----
//
// v3.56, in this project's own words: an assertion that greps a component for a
// substring was satisfied by the same string appearing two lines further down in
// a different expression. So the words and the verdict live here, `check-import`
// CALLS this on real fixtures, and the component's only job is to render what
// comes back. Same shape as lib/lessonFinish.js, for the same reason.
//
// ---- WHAT GIGI CHOSE, Aug 19 ----
//
// "Refuse the button, warn the picker." The green button offers ONE known file
// and there is no reason to offer one that can only take her backwards, so it
// refuses and says which strands it was protecting. The file picker is her
// deliberately choosing something, so it warns, names what it would keep, and
// makes her confirm — it never refuses, because a grown-up who has decided to
// restore an old file is allowed to.
//
// THE WAY BACK (rule 17): if the day comes that she needs to load an older file
// from the button, `blocked` is the one field to relax, and the reason it was
// blocked is already on the screen beside it.
// ---------------------------------------------------------------------------

/**
 * Read a previewImport() result and say what should happen.
 *
 * Takes the preview, never the raw file — so this cannot disagree with the diff
 * the grown-up is looking at. Same source, one interpretation.
 */
/**
 * How many rows this file would actually add, across EVERY table the preview
 * reports — never a named list of a few.
 *
 * previewImport returns one `{ incoming, new }` object per table, and the
 * Grown-Up Corner already derives its rows by walking them. This walks the same
 * shape for the same reason: at v3.56 three hand-maintained lists of tables
 * disagreed with each other, and the screen showed a grown-up less than half of
 * what the button was about to do.
 *
 * `strands` is counted on `willReplace` because a strand result is overwritten,
 * never appended — it has no `new`.
 */
export function countNewRows(preview) {
  if (!preview) return 0;
  let total = 0;
  for (const [key, v] of Object.entries(preview)) {
    if (!v || typeof v !== 'object') continue;
    if (key === 'strands') {
      total += v.willReplace || 0;
      continue;
    }
    if (typeof v.new === 'number') total += v.new;
  }
  return total;
}

export function importVerdict(preview) {
  const fresh = preview?.freshness || {};
  const newestInFile = fresh.newestInFile || 0;
  const newestHere = fresh.newestHere || 0;
  const newAnswers = fresh.newAnswers || 0;
  const kept = preview?.strands?.protectedInProgress || [];

  // "Older" is only meaningful when BOTH sides have work in them. A fresh
  // install has no newest answer, and on that machine an Aug 13 file is not
  // stale — it is everything she has.
  const comparable = newestInFile > 0 && newestHere > 0;
  const older = comparable && newestInFile < newestHere;

  // A file can be older AND still worth loading: a second machine may hold
  // answers this one has never seen. Date alone must not block it — only a file
  // that is both older and brings nothing is a file with no reason to load.
  //
  // ---- ⚠️ AND "NOTHING" MEANT "NO ANSWERS", WHICH REFUSED HER NOTES ----
  //
  // Gigi, Aug 19: "I left a message on her journals. Where would she see them?"
  // The answer was nowhere — the copying only ever ran one way, her laptop to
  // this machine. The mechanism for the other direction ALREADY WORKS: exportAll
  // ships messages, importBackup merges them, and a fresh note arrives on a
  // machine that lacks it.
  //
  // What blocked it was this line. A file Gigi exports from HER machine to send
  // Azianna a note is, from the laptop's point of view, older AND carries no new
  // answers — so it was called stale and REFUSED, with the note inside it.
  //
  // A file that adds ANYTHING is not stale. Counted across every table the
  // preview reports rather than a named few, so a table added tomorrow counts
  // tomorrow without an edit here.
  const addsNothing = countNewRows(preview) === 0;
  const stale = older && addsNothing;

  const protectsWork = kept.length > 0;
  const blocked = stale || protectsWork;

  return {
    blocked,
    stale,
    older,
    comparable,
    newAnswers,
    newestInFile,
    newestHere,
    protectedStrands: kept,

    // The button shows this INSTEAD of loading. The picker shows it and carries on.
    headline: headlineFor({ stale, protectsWork, older, newAnswers }),
    reason: reasonFor({ stale, protectsWork, older, newAnswers, kept }),

    // What the confirm button says when the picker is used anyway. Never
    // "OK" — the words have to describe the thing being agreed to.
    confirmLabel: protectsWork
      ? 'Load it anyway — keep her newer readings'
      : 'Load it anyway'
  };
}

function headlineFor({ stale, protectsWork, older, newAnswers }) {
  if (protectsWork) return 'This file is older than a measurement still being taken';
  if (stale) return 'This file is older than what is already on this computer';
  if (older && newAnswers > 0) return 'This file is older, but it holds answers this computer has not seen';
  return '';
}

function reasonFor({ stale, protectsWork, older, newAnswers, kept }) {
  if (protectsWork) {
    const names = kept.map((k) => k.strandId).join(', ');
    return (
      `A re-measure is part-finished here and this file holds the FINISHED older reading for: ` +
      `${names}. Those readings would be the ones going backwards, so they are kept as they are. ` +
      `Everything else in the file still merges normally.`
    );
  }
  if (stale) {
    return (
      'It adds nothing this computer has not already got — no answers, no notes, no journal ' +
      'entries, nothing — and its newest work is older than what is here. Loading it would ' +
      'change nothing and risk confusing which copy is current.'
    );
  }
  if (older && newAnswers > 0) {
    return `It is an older file, but ${newAnswers} answer${newAnswers === 1 ? '' : 's'} in it are new here.`;
  }
  if (older) {
    // Older, no new answers, but it still adds something — a note from Gigi is
    // the case this exists for.
    return 'It is an older file, but it carries something this computer has not got.';
  }
  return '';
}

/**
 * A date a person can read, or null when there is nothing to say.
 * Kept here so the button and the picker cannot word it differently.
 */
export function whenLabel(ms) {
  if (!ms) return null;
  return new Date(ms).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
}
