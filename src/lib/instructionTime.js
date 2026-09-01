/**
 * =============================================================================
 * HOW MANY MINUTES OF INSTRUCTION A DAY'S RECORD REPRESENTS.
 * =============================================================================
 *
 * ---- WHY THIS IS THE PLATFORM'S AND NOT A SCHOOL'S (Sept 1, 2026) ----
 *
 * Arrived here from a curriculum folder in §3c Step 1, slice 1. It had been
 * sitting beside one state's legal thresholds, which made it look like part of
 * them. It is not: how many hours a state requires is that state's answer, and
 * how many hours a day's record adds up to is the same arithmetic everywhere.
 *
 * Leaving it in a curriculum folder meant every Academy enrolled after the
 * first would have had to write this again, and a family in a state with a
 * different requirement would have inherited the reasoning below by copying it
 * rather than by using it.
 *
 * The thresholds stay with the school. The counting is here.
 */

/**
 * Total instruction minutes for one attendance row.
 *
 * ---- THREE SOURCES, AND WHY THEY ARE NOT ALL ADDED ----
 *
 *   activeMinutes     MEASURED   every minute this tab was visible
 *   scheduledMinutes  SCHEDULED  the timetable blocks the completed work covers
 *   offlineMinutes    ENTERED    time a parent records for work away from a screen
 *
 * A record that only counted screen time would understate a real school day and
 * could make a compliant family look deficient. The app cannot see what happens
 * in another tab or at a kitchen table, but it does know what was scheduled,
 * because somebody said so.
 *
 * **The measured and the scheduled minutes are two views of the SAME hours, so
 * this takes the larger of the two rather than the sum.** A learner works in
 * another tab through a 60-minute block: measured says 5, scheduled says 60,
 * and the truth is 60 — not 65. They spend 90 minutes in this app during a
 * 60-minute block: measured says 90, and adding the scheduled 60 on top would
 * invent half an hour.
 *
 * `offlineMinutes` IS added, because it is the one source that is disjoint by
 * definition — it exists precisely to record instruction that happened where
 * neither the tab nor the timetable was watching.
 */
export function instructionMinutes(row = {}, scheduledMinutes = 0) {
  const onScreen = row.activeMinutes || 0;
  const scheduled = scheduledMinutes || row.scheduledMinutes || 0;
  return Math.max(onScreen, scheduled) + (row.offlineMinutes || 0);
}
