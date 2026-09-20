// Field Trip Planner (Part 5, built Aug 6, 2026).
//
// The "Generate Learning Pack" button builds a structured, subject-aware
// TEMPLATE — before / during / after activities the parent reviews, edits, and
// prints. This app has no run-time AI, so the pack is deterministic scaffolding
// (not a live generation), which is exactly the control the parent asked for:
// she decides when to create it and reviews everything before it reaches her
// son. She can paste her own or AI-written content into the notes as well.

import { academyContent } from '../content/academyContent.js';

// Subjects a trip can support (multi-select). Uses the app's real subject ids
// so a completed trip's portfolio entry tags to a subject the records know.
export const FIELD_TRIP_SUBJECTS = ['aerospace', 'science', 'socialStudies', 'technology', 'math', 'reading', 'pe'];

/**
 * The label a school gives a subject id.
 *
 * ---- WHY THE READ IS IN HERE (Sept 20, 2026) ----
 *
 * This was `const { SUBJECT_LABELS = {} } = academyContent().subjects;` at
 * module scope, which is the thing GENERIC_CARRYOVER's rule names directly:
 * *"Content-pack destructures go inside the function that reads them, never at
 * module scope."*
 *
 * At module scope it runs the moment anything imports this file — including a
 * check script in plain Node, where no school is mounted and academyContent()
 * throws by design. The whole module became unimportable without a school
 * behind it, for one label lookup used by one function.
 *
 * It surfaced when the trip list moved into an Academy folder and a check went
 * to import this file to verify the move. The violation was already here; the
 * move is only what made it visible.
 */
export function tripSubjectLabel(id) {
  const { SUBJECT_LABELS = {} } = academyContent().subjects;
  return SUBJECT_LABELS[id] || id;
}

const SUBJECT_FLAVOR = {
  math: { objective: 'Spot numbers, measurements, shapes, or patterns — estimate a quantity you can see.', vocab: ['estimate', 'scale', 'measurement'] },
  reading: { objective: 'Read a sign, plaque, or exhibit and summarize it in your own words.', vocab: ['summary', 'main idea', 'context'] },
  science: { objective: 'Identify a scientific principle at work and explain why it happens.', vocab: ['hypothesis', 'observation', 'evidence'] },
  socialStudies: { objective: 'Connect what you see to a person, place, or event in history or your community.', vocab: ['primary source', 'timeline', 'community'] },
  aerospace: { objective: 'Find something related to flight, space, or engineering and explain how it works.', vocab: ['thrust', 'lift', 'engineering design'] },
  technology: { objective: 'Notice a machine or technology and describe the problem it solves.', vocab: ['system', 'input & output', 'innovation'] },
  pe: { objective: 'Track how much you walked or moved, and how your body felt.', vocab: ['endurance', 'hydration', 'active minutes'] }
};

/**
 * Build a full Learning Pack for a trip. Deterministic and subject-aware.
 * Returns { before, during, after } with plain arrays/strings the UI renders
 * as checklists and prompts, and the parent can print for the trip.
 */
export function generateLearningPack(trip) {
  const dest = (trip.destination || 'your destination').trim();
  const subjects = Array.isArray(trip.subjects) ? trip.subjects : [];
  const chosen = subjects.length ? subjects : ['aerospace'];

  const objectives = chosen.map((s) => `${tripSubjectLabel(s)}: ${SUBJECT_FLAVOR[s]?.objective || 'Connect what you see to what you are learning.'}`);
  objectives.push('Come back able to explain one new thing you learned.');

  const vocab = Array.from(new Set(chosen.flatMap((s) => SUBJECT_FLAVOR[s]?.vocab || [])));

  return {
    before: {
      background: `Spend 10–15 minutes learning about ${dest} before you go — a short video, its website, or a quick read.`,
      objectives,
      vocabulary: vocab,
      essentialQuestions: [
        `What is ${dest} best known for?`,
        'How does what you will see connect to becoming an engineer?',
        'What questions do you hope to answer on this trip?'
      ],
      safety: [
        'Stay with your group and within sight of an adult.',
        'Follow all posted rules and staff instructions.',
        'Know where to meet if you get separated.'
      ],
      packing: ['Water bottle', 'Snack', 'Notebook & pencil', 'Camera or phone for photos', 'Comfortable shoes']
    },
    during: {
      observation: [
        'Note 3 things that surprised you.',
        'Sketch or describe one thing in detail.',
        'Write down 2 questions to look up later.'
      ],
      photo: [...chosen.map((s) => `Photograph something related to ${tripSubjectLabel(s)}.`), 'Take one photo of yourself at the site for your portfolio.'],
      scavengerHunt: [
        'Find something older than you are.',
        'Find something with moving parts.',
        'Find a number bigger than 1,000.',
        'Find something an engineer helped design.'
      ],
      journalPrompts: [
        'What was the most interesting thing you saw, and why?',
        "What did you learn that you didn't know this morning?"
      ]
    },
    after: {
      reflection: [
        'What surprised you most?',
        'What would you want to explore more?',
        "How did this connect to what you're studying?"
      ],
      writingAssignment: `Write a short report (1–2 paragraphs) about your trip to ${dest}: what you saw, what you learned, and one thing that connects to engineering.`,
      discussion: [`Teach someone at home one thing you learned at ${dest}.`, 'Would you recommend this trip to another student? Why?'],
      portfolioPrompt: 'Add your best photo and 2–3 sentences to your Portfolio.',
      rubric: [
        'Completed the before / during / after activities',
        'Report shows real observations from the trip',
        'Made at least one connection to a subject or to engineering',
        'Neat, complete, and on time'
      ]
    }
  };
}

/**
 * The destination a trip should be filed under, with any rename resolved.
 *
 * ---- WHY THE MAP IS AN ARGUMENT (Sept 20, 2026) ----
 *
 * It used to be a constant in this file: one school's three renamed library
 * programmes, compiled into the platform. It moved to that school's own folder
 * with the trips themselves.
 *
 * The map had to become a PARAMETER rather than an import, because this
 * function is reached from the store during hydration and from the check
 * scripts in plain Node, and neither can assume a school is loaded.
 *
 * The default is `{}`, and that is the dangerous part worth naming: a caller
 * that forgets to pass the map gets a function that still works, still returns
 * a plausible destination, and silently stops resolving renames. For
 * `fieldTripSyncId` below that means a DIFFERENT MERGE KEY, which is how one
 * trip becomes two the next time the computers trade files.
 *
 * scripts/verify-field-trip-move.mjs asserts every call site passes it.
 */
export function canonicalTripDestination(destination, renames = {}) {
  const d = String(destination == null ? '' : destination).trim();
  return (renames && renames[d]) || d;
}

/**
 * The merge key for a field trip. Same trip, same id, on both computers.
 *
 * Returns null for a trip with no destination — an unidentifiable row is left
 * alone rather than given a made-up identity it could then collide on.
 */
export function fieldTripSyncId(destination, renames = {}) {
  const canon = canonicalTripDestination(destination, renames);
  const slug = canon
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug ? 'ft::' + slug : null;
}

/**
 * Which of two copies of the same trip to keep.
 *
 * Higher wins. Evidence of real work outranks everything: a completed trip, or
 * one carrying hours, a learning pack or a portfolio entry, is a record — the
 * other copy is the accident. **A duplicate cleanup that deletes the finished
 * copy is worse than the duplicates.**
 */
export function fieldTripKeepScore(trip) {
  if (!trip) return -1;
  let score = 0;
  if (trip.status === 'completed') score += 1000;
  if (trip.portfolioEntryId) score += 100;
  if (trip.learningPack) score += 50;
  if (Number(trip.hours) > 0) score += 25;
  if (trip.completedAt) score += 10;
  if ((trip.date || '').trim()) score += 5;
  if ((trip.notes || '').trim()) score += 1;
  return score;
}


/** Does this row hold real work? A row that does is a record, never deleted. */
export function fieldTripCarriesWork(trip) {
  if (!trip) return false;
  return (
    trip.status === 'completed' ||
    Boolean(trip.portfolioEntryId) ||
    Boolean(trip.learningPack) ||
    Number(trip.hours) > 0
  );
}

/**
 * ===========================================================================
 * THE DEDUPE THAT DID NOT DEDUPE. (Aug 29, 2026.)
 * ===========================================================================
 *
 * The parent, the day after the first attempt shipped:
 * *"the field trip planer is worse than before."*
 *
 * ---- WHY YESTERDAY'S FIX CHANGED NOTHING ----
 *
 * Yesterday's repair backfilled the canonical id onto any trip that had none,
 * then grouped by id and collapsed the groups. It carried this line:
 *
 *     if (t.syncId) continue;   // don't overwrite an id already set
 *
 * That reads as caution. On her database it was the whole bug. Her 85 rows do
 * not have a MISSING id — every one of them carries a STALE id: 21 in the old
 * `destination|date` fallback form, 63 as random UUIDs the import handed out.
 * So the backfill skipped all 85, the four copies of each trip landed in four
 * different groups, no group ever reached size 2, and nothing collapsed.
 *
 * **The rule: a derived key is not an identity.** `destination|date` and an
 * import's throwaway UUID were both computed by the app because it had nothing
 * better; neither is something to protect. Only an id already in canonical
 * `ft::` form is a real identity, and only that one is preserved.
 *
 * ---- AND THE THING THAT ALMOST GOT DESTROYED ----
 *
 * Normalizing every row of a destination to one id means two DELIBERATE visits
 * to the same place — she plans Chess Club "any Thursday", and it recurs
 * weekly — become one group, and the second one gets deleted as a duplicate.
 * A dedupe that eats a trip she planned on purpose is not a fix.
 *
 * So a losing row is only ever deleted when it is a genuine clone: same
 * canonical destination AND the same date (or no date at all) AND no work on
 * it. A row on a different date is a different visit — it is kept, and it
 * keeps an id of its own so no later import merges it into the winner either.
 *
 * Pure and returns a plan rather than writing, so this is testable against the
 * real shape of her export instead of against the store's punctuation.
 *
 * @param {Array} trips  every field trip row
 * @returns {{ idWrites: Array<{id:*, syncId:string}>, dropIds: Array }}
 */
/**
 * ===========================================================================
 * WHICH OF THE DELETED TRIPS TO BRING BACK — AND WHICH TO LEAVE DELETED.
 * ===========================================================================
 *
 * ---- WHY (Sept 5, 2026) ----
 *
 * `planFieldTripDedupe` counted a blank date as matching the winner's date, so
 * every undated repeat visit she had planned was soft-deleted. The rows are all
 * still in Dexie carrying a tombstone. This decides which ones go back.
 *
 * The parent, on being offered the restore: **"Make sure duplicates are not
 * added."** She is right to say so, because the tombstoned pile is not all one
 * thing. It holds BOTH:
 *
 *   - the undated repeat visits the bug took — plans, and
 *   - the genuine undated import copies the dedupe was built to remove.
 *
 * Restoring the pile wholesale would put the duplicates back and undo the Aug
 * 28 fix. Content cannot tell them apart: two undated rows to the same place
 * with the same empty notes are byte-identical whether she planned two visits
 * or an import cloned one.
 *
 * ---- WHAT DOES TELL THEM APART ----
 *
 * `createdAt`, and only `createdAt`. It is the one field that records a
 * separate ACT of creation rather than a property of the trip:
 *
 *   - `addFieldTrip` stamps `new Date().toISOString()` per trip, one at a
 *     time, so two visits she planned herself never share an instant.
 *   - `mergeBySyncId` copies the incoming row wholesale, `createdAt` included,
 *     so an import's copy carries the SAME instant as the row it duplicates —
 *     and that original is the row the dedupe kept, which is still visible.
 *   - the seeder stamps one `ftCreatedAt` across a whole batch, so seeded
 *     defaults share an instant too.
 *
 * So the rule is: a tombstoned row whose instant is already on screen is a
 * copy and stays deleted. A tombstoned row with an instant of its own was a
 * separate act, and comes back. Two tombstones sharing one instant are copies
 * of each other; one comes back, not both.
 *
 * A row with NO `createdAt` cannot be told from a copy at all, so it is left
 * deleted — the whole point of this function is that it may not add a
 * duplicate, and an unidentifiable row is exactly the case where it might.
 *
 * Deliberately narrow in three more ways, all matching the bug's own
 * signature: only undated rows (a dated one was never at risk), only rows
 * carrying no work (the dedupe never touched those), and only where the
 * destination still has a surviving row (the bug always left a winner). A
 * destination with nothing left is one she emptied herself.
 */
/**
 * ===========================================================================
 * BRING BACK A DESTINATION THAT HAS NOTHING LEFT.
 * ===========================================================================
 *
 * ---- WHY (Sept 6, 2026) ----
 *
 * `planFieldTripDedupe` let tombstones compete for "winner" and killed the
 * live row of every group, one hydrate at a time. The parent's planner reached
 * 348 rows with exactly one visible. The cause is fixed above; this recovers
 * what it took.
 *
 * ---- WHY IT IS NOT `planUndatedTripRestore` ----
 *
 * That one restores a repeat VISIT — an undated second trip to a place that
 * still has a surviving row. It deliberately refuses a destination with
 * nothing left, on the reasoning that an empty destination is one the parent
 * emptied herself. That reasoning was right for the bug it was written for and
 * wrong for this one: here the emptying was done by the app.
 *
 * ---- HOW IT CANNOT ADD A DUPLICATE ----
 *
 * The parent's instruction stands: **make sure duplicates are not added.** Her
 * 348 rows are roughly sixteen copies of twenty-one destinations, so restoring
 * by row would rebuild the pile that started this.
 *
 * So this restores **exactly one row per destination, and only where nothing
 * is visible**. A destination with any live row is left alone entirely. One in,
 * or none — there is no path through this function that makes two.
 *
 * The row chosen is the one the dedupe itself would have kept: highest
 * `fieldTripKeepScore`, oldest `createdAt` breaking the tie. So the recovered
 * trip is the copy carrying the most real work, not an arbitrary survivor.
 */
export function planDeletedTripRecovery(trips, renames = {}) {
  const rows = (Array.isArray(trips) ? trips : []).filter(Boolean);

  const visible = new Set();
  for (const t of rows) {
    if (t.deletedAt) continue;
    const base = fieldTripSyncId(t.destination, renames);
    if (base) visible.add(base);
  }

  const buried = new Map();
  for (const t of rows) {
    if (!t.deletedAt) continue;
    const base = fieldTripSyncId(t.destination, renames);
    if (!base || visible.has(base)) continue;   // something is on screen: leave it alone
    if (!buried.has(base)) buried.set(base, []);
    buried.get(base).push(t);
  }

  const restoreIds = [];
  for (const group of buried.values()) {
    const best = [...group].sort((a, b) => {
      const byScore = fieldTripKeepScore(b) - fieldTripKeepScore(a);
      if (byScore !== 0) return byScore;
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    })[0];
    if (best) restoreIds.push(best.id);
  }

  return { restoreIds };
}

export function planUndatedTripRestore(trips, renames = {}) {
  const rows = (Array.isArray(trips) ? trips : []).filter(Boolean);

  // Every instant already on screen, per destination.
  const visibleStamps = new Map();
  for (const t of rows) {
    if (t.deletedAt) continue;
    const base = fieldTripSyncId(t.destination, renames);
    if (!base) continue;
    if (!visibleStamps.has(base)) visibleStamps.set(base, new Set());
    visibleStamps.get(base).add(String(t.createdAt || ''));
  }

  const restoreIds = [];
  const claimed = new Map();
  for (const t of rows) {
    if (!t.deletedAt) continue;
    if (String(t.date || '').trim()) continue;
    if (fieldTripCarriesWork(t)) continue;

    const base = fieldTripSyncId(t.destination, renames);
    if (!base) continue;
    const onScreen = visibleStamps.get(base);
    if (!onScreen) continue;          // nothing survived here — she emptied it herself

    const stamp = String(t.createdAt || '');
    if (!stamp) continue;             // unidentifiable: cannot prove it is not a copy
    if (onScreen.has(stamp)) continue; // same instant as a visible row: a copy

    if (!claimed.has(base)) claimed.set(base, new Set());
    if (claimed.get(base).has(stamp)) continue; // two tombstones, one instant: copies
    claimed.get(base).add(stamp);
    restoreIds.push(t.id);
  }

  return { restoreIds };
}

export function planFieldTripDedupe(trips, renames = {}) {
  /**
   * A DELETED ROW IS NOT A CANDIDATE. (Sept 6, 2026.)
   *
   * The parent's planner emptied itself: 348 field trip rows, 347 tombstoned,
   * one survivor — and that survivor only lived because it was completed and
   * carried work, so `fieldTripCarriesWork` protected it.
   *
   * This function was handed EVERY row, tombstones included — the store passes
   * `[...fieldTripRows]`, and the `deletedAt` filter does not happen until the
   * state boundary far below. `fieldTripKeepScore` has never known about
   * `deletedAt` either. So a deleted row entered its group as a candidate,
   * tied with the live one on score (both dated, +5), and won the tie because
   * the tie-break is oldest `createdAt` and the deleted originals were older
   * than every re-imported copy. The live row then became an "other", matched
   * on date, and was deleted in its turn.
   *
   * Every hydrate, one more live row died to an older ghost. Imports kept
   * adding fresh copies and the loop kept killing them, which is why the row
   * count climbed to 348 while the visible count fell to one.
   *
   * A tombstone is a record of a deletion, not a trip. It cannot be kept and
   * it cannot be deleted again, so it has no business in the ranking at all.
   */
  const rows = (Array.isArray(trips) ? trips : []).filter((t) => t && !t.deletedAt);

  const byDestination = new Map();
  for (const t of rows) {
    const base = fieldTripSyncId(t.destination, renames);
    // A row with no destination cannot be identified, so it is never grouped,
    // never renamed and never deleted. Left alone is the safe answer.
    if (!base) continue;
    const bucket = byDestination.get(base);
    if (bucket) bucket.push(t);
    else byDestination.set(base, [t]);
  }

  const idWrites = [];
  const dropIds = [];

  for (const [base, group] of byDestination) {
    // Most evidence of real work wins; oldest wins a tie, so the same row wins
    // on both computers and the winner does not change between hydrates.
    const ranked = [...group].sort((a, b) => {
      const byScore = fieldTripKeepScore(b) - fieldTripKeepScore(a);
      if (byScore !== 0) return byScore;
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    });

    const winner = ranked[0];
    if (winner.syncId !== base) idWrites.push({ id: winner.id, syncId: base });
    const winnerDate = String(winner.date || '').trim();

    for (const other of ranked.slice(1)) {
      const otherDate = String(other.date || '').trim();
      /**
       * A BLANK DATE IS NOT A MATCHING DATE. (Sept 5, 2026.)
       *
       * The parent: *"There were field trips planned for the year and I no
       * longer see them."*
       *
       * This read `otherDate === '' || otherDate === winnerDate`. So a second
       * visit she had planned but not DATED yet counted as the same visit as
       * the first, carried no work, and was soft-deleted — on every hydrate,
       * not once. Planning a year means choosing the places first and the
       * dates later, and the repeat visit is the normal shape of it: a
       * library's monthly homeschool day, a museum in two different seasons.
       * Four visits to one library became one.
       *
       * Two rows are the same visit only when they SAY so — identical dates,
       * both actually set. An undated repeat now falls through to the keep
       * branch below and gets an id distinct from the winner's, so it shows
       * up again and she can delete it herself if it really was a duplicate.
       *
       * What this gives up: two undated copies of the same trip arriving
       * through an import no longer collapse on their own. That is the right
       * way round. The dedupe still catches what it was built for — an
       * import's copies carry the winner's date, which is why they grouped in
       * the first place — and this file already states the principle one step
       * short of here: *a duplicate cleanup that deletes the finished copy is
       * worse than the duplicates.* A cleanup that deletes a plan is too.
       */
      const sameVisit = otherDate !== '' && otherDate === winnerDate;
      if (sameVisit && !fieldTripCarriesWork(other)) {
        dropIds.push(other.id);
        continue;
      }
      // Kept: a second visit she planned, or a copy carrying work she can look
      // at herself. It needs an id that is NOT the winner's.
      const suffix = String(other.createdAt || other.id || dropIds.length)
        .replace(/[^a-zA-Z0-9]+/g, '')
        .slice(0, 24);
      const want = base + '#' + suffix;
      const keptIsCanonical = typeof other.syncId === 'string' && other.syncId.startsWith(base + '#');
      if (!keptIsCanonical && want !== base + '#') idWrites.push({ id: other.id, syncId: want });
    }
  }

  return { idWrites, dropIds };
}
