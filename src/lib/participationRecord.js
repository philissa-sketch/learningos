// ---------------------------------------------------------------------------
// HOW A PARTICIPATION SUBJECT DESCRIBES ITSELF.
//
// ---- WHY THIS EXISTS (Aug 15, 2026) ----
//
// Three subjects are recorded by participation rather than by grade — PE &
// Nutrition, Gardening, and Electric Guitar. Each produces its own counts from
// `getParticipationRecord`, and each set is completely different: PE counts
// workouts and weekly goals, the garden counts sessions and plantings and
// harvests, the guitar counts practice minutes and skills cleared.
//
// Three separate screens rendered those counts, and **all three had PE's field
// names hardcoded**:
//
//   compliancePacket.js   — the downloadable Georgia records packet
//   ParentDashboard.jsx   — the transcript download
//   ParentDashboard.jsx   — the on-screen report card
//
// Gardening and Guitar have none of PE's keys, so every one fell through the
// `|| 0`. The Georgia packet printed, for a boy who had worked in the garden all
// season:
//
//     Gardening & Applied Engineering: participation credit — 0 workouts
//     completed, 0 days tracked, 0 of 0 weekly goals met
//
// Not a crash, not a blank — a confident, specific, wrong sentence in a legal
// record, in a subject that has no workouts and no weekly goals to begin with.
// The report card added a fourth PE field and printed "0 meals logged" under
// Guitar.
//
// ---- WHY IT WENT WRONG, WHICH IS THE PART WORTH KEEPING ----
//
// PE was the first participation subject and, for a while, the only one. The
// render sites were written against it directly and read perfectly. When
// Gardening and Guitar were added months later they inherited `isParticipation:
// true` and got the whole rendering path for free — including a sentence about
// workouts.
//
// **A default that is correct for the only case is invisible until there is a
// second case.** And it failed silently in the worst place: nobody reads their
// own compliance packet line by line looking for a subject that reports zero.
//
// So the description now lives WITH the subject, in one place, and the three
// render sites ask for it instead of assembling it. A fourth participation
// subject added tomorrow either appears here or fails the guard.
// ---------------------------------------------------------------------------

/**
 * The fields each participation subject reports, in the order they should read,
 * with the wording used in a records packet a stranger will read.
 *
 * `always: true` means the line prints even at zero — "0 days in the garden" is
 * a real statement about the year. Everything else is omitted when it is zero,
 * because a packet padded with zeros is harder to read than a short one, and a
 * reviewer counting absent activities is not what the record is for.
 */
const PARTICIPATION_FIELDS = {
  pe: [
    { key: 'workouts', label: 'workouts completed', one: 'workout completed', always: true },
    { key: 'daysTracked', label: 'days tracked', one: 'day tracked', always: true },
    { key: 'mealsLogged', label: 'meals logged', one: 'meal logged' },
    { key: 'checkIns', label: 'body check-ins', one: 'body check-in' },
    { key: 'weeklyGoalsMet', label: 'weekly goals met', pairWith: 'weeklyGoalsSet' }
  ],
  gardening: [
    { key: 'sessions', label: 'garden sessions', one: 'garden session', always: true },
    { key: 'daysInTheGarden', label: 'days in the garden', one: 'day in the garden', always: true },
    { key: 'plantings', label: 'plantings', one: 'planting' },
    { key: 'harvests', label: 'harvests', one: 'harvest' },
    { key: 'sunReadings', label: 'sun readings', one: 'sun reading' },
    { key: 'waterings', label: 'waterings', one: 'watering' },
    { key: 'measurements', label: 'measurements', one: 'measurement' },
    { key: 'observations', label: 'observations', one: 'observation' },
    { key: 'seasonChangeovers', label: 'season changeovers', one: 'season changeover' },
    { key: 'entriesLogged', label: 'log entries in total', one: 'log entry in total', always: true }
  ],
  guitar: [
    { key: 'practiceSessions', label: 'practice sessions', one: 'practice session', always: true },
    { key: 'daysPractised', label: 'days practised', one: 'day practised', always: true },
    { key: 'minutesPractised', label: 'minutes practised', one: 'minute practised', always: true },
    { key: 'skillsCleared', label: 'skills cleared', one: 'skill cleared' },
    { key: 'theoryItemsRead', label: 'theory items read', one: 'theory item read' },
    { key: 'songsLearned', label: 'songs learned', one: 'song learned' },
    { key: 'songsChosen', label: 'songs chosen', one: 'song chosen' },
    { key: 'recordings', label: 'recordings made', one: 'recording made' }
  ]
};

/**
 * Singular where it matters. "1 season changeovers" and "1 songs learned" is
 * how a records packet stops reading like a person wrote it — and this document
 * is read by a stranger deciding whether the year was real. Only the labels
 * that can plausibly be 1 carry a `one` form; the rest are left alone rather
 * than mechanically de-pluralised, which is how "1 day practised" becomes
 * "1 minutes practised".
 */
function labelFor(field, value) {
  if (value === 1 && field.one) return field.one;
  return field.label;
}

/** Is this a subject recorded by participation rather than by grade? */
export function hasParticipationFields(subject) {
  return Boolean(PARTICIPATION_FIELDS[subject]);
}

/** The field spec, for guards and for anything that needs to enumerate them. */
export function participationFieldsFor(subject) {
  return PARTICIPATION_FIELDS[subject] || [];
}

/**
 * The counts as a list of readable phrases — "12 garden sessions", "3 of 4
 * weekly goals met". Returns [] for a subject that is not participation-based,
 * and never invents a field the subject does not have.
 */
export function participationPhrases(subject, record) {
  const fields = PARTICIPATION_FIELDS[subject];
  if (!fields || !record) return [];
  const out = [];
  for (const f of fields) {
    const value = Number(record[f.key]) || 0;
    if (!value && !f.always) continue;
    if (f.pairWith) {
      const total = Number(record[f.pairWith]) || 0;
      if (!total && !f.always) continue;
      out.push(`${value} of ${total} ${f.label}`);
    } else {
      out.push(`${value} ${labelFor(f, value)}`);
    }
  }
  return out;
}

/**
 * One sentence for a records packet or a transcript line.
 *
 * Deliberately returns an honest sentence when nothing has been logged rather
 * than a list of zeros — "no activity recorded yet" is what a reviewer needs to
 * see, and it is true, which "0 workouts completed" was not.
 */
export function participationSummary(subject, record) {
  const phrases = participationPhrases(subject, record);
  if (phrases.length === 0) return 'participation credit — no activity recorded yet';
  return `participation credit — ${phrases.join(', ')}`;
}
