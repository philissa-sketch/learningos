// ---------------------------------------------------------------------------
// GOALS. BLUEPRINT_A_LOCAL_FIRST §3.11. Added v3.58.
//
// ---- WHAT GIGI ASKED FOR ----
//
//   "Some of Azianna's skills are in the lower grade but I want her caught up
//    to 5th grade by the end of the school year."
//
// and then, which changed the answer:
//
//   "What if the goal is before the beginning of the next school year?"
//
// That second question is worth more than it looks. Moving the deadline from
// May 26 to Aug 1 adds the summer term — 26 school days — and takes FIVE of
// nine strands from "unrealistic" to "stretch". A structural decision she made
// in July is what makes a goal set in August answerable at all.
//
// ---- WHY THE APP HAD NO GOALS BEFORE THIS ----
//
// It had Dream Goals, and they work — she saves Seeds, Gigi matches them, she
// gets the reward. But a savings target is not a learning goal, and §3.11.2 is
// blunt about what an app without one reports:
//
//   "An app whose goals are all effort and coverage can report A PERFECT YEAR
//    IN WHICH NOTHING WAS LEARNED: full attendance, every unit finished, no
//    evidence anyone got better at anything."
//
// ---- WHY THESE ARE GROWTH GOALS AND WHY THAT IS HONEST ----
//
// §3.10.8: "Growth is a delta on ONE INSTRUMENT'S SCALE, and nothing else.
// Never report growth across different instruments, different scales, or
// different blueprints."
//
// This app has exactly one measuring instrument: the Check-In. Her baseline
// came off it and the year-end measure will come off it, so the delta is legal.
// The item bank was checked before any of this was written — every strand
// carries questions up to 6.0–6.5, so 5.0 is inside what the instrument can
// actually see. That was not guaranteed: Geometry and Measurement sat at 2.00
// for weeks because the bank had nothing EASIER.
//
// ---- THE ONE ASSUMPTION, SAID OUT LOUD ----
//
// A feasibility verdict needs an OBSERVED rate — §3.11.4 says to compute it
// over the trailing four weeks. She has three school days and no growth data,
// so there is nothing to observe yet. Until there is, the verdict is computed
// against a typical year's growth of +1.0 grade levels.
//
// THAT IS AN ASSUMPTION AND NOT A MEASUREMENT, and every verdict carries the
// fact on it. A caveat loses every argument with a number in this project, so
// the number itself has to say what it rests on.
// ---------------------------------------------------------------------------

import {
  END_OF_SUMMER,
  yearsOfInstructionLeft,
  schoolDaysRemaining
} from '../config/calendar.js';

/** §3.11.4, exactly. */
export const FEASIBILITY = {
  reachable: { maxMultiple: 1.25, label: 'Reachable', note: 'About the pace of a normal year.' },
  stretch: { maxMultiple: 2, label: 'Stretch', note: 'Faster than a normal year. Possible, and it will not happen by itself.' },
  unrealistic: { maxMultiple: Infinity, label: 'Out of reach', note: 'More than double a normal year’s growth. Saving it is allowed; the warning stays on the card.' }
};

/** Growth in grade levels a typical school year produces. The assumption. */
export const ASSUMED_YEARLY_GROWTH = 1.0;

/**
 * Where the goal engine is allowed to say anything at all.
 *
 * A strand that has been asked three questions has not been measured, it has
 * been sampled. Setting a target from it and reporting a miss against it a year
 * later would be reporting a failure the app invented — the same family as
 * anti-pattern 16, placement extrapolated above what was demonstrated.
 */
export const MIN_ASKED_FOR_A_GOAL = 6;

/**
 * The verdict, per §3.11.4.
 *
 * `observedRatePerYear` is what she has actually been doing, when that is
 * known. Passing null means "nothing observed yet" and the assumption is used
 * instead — reported on the result so nothing downstream can forget.
 */
export function feasibility({ gap, fromDayKey, byDayKey = END_OF_SUMMER, observedRatePerYear = null }) {
  const yearsLeft = yearsOfInstructionLeft(fromDayKey, byDayKey);
  const daysLeft = schoolDaysRemaining(fromDayKey, byDayKey);
  const observed = observedRatePerYear ?? ASSUMED_YEARLY_GROWTH;

  if (yearsLeft <= 0) {
    return { verdict: 'unrealistic', multiple: Infinity, yearsLeft: 0, daysLeft: 0, observed, assumed: observedRatePerYear == null };
  }

  const requiredRatePerYear = gap / yearsLeft;
  const multiple = requiredRatePerYear / observed;

  const verdict =
    multiple <= FEASIBILITY.reachable.maxMultiple
      ? 'reachable'
      : multiple <= FEASIBILITY.stretch.maxMultiple
        ? 'stretch'
        : 'unrealistic';

  return {
    verdict,
    multiple,
    requiredRatePerYear,
    observed,
    /** TRUE means the verdict rests on an assumption, not on her own record. */
    assumed: observedRatePerYear == null,
    yearsLeft,
    daysLeft
  };
}

/**
 * Propose one goal per strand toward a target level.
 *
 * ONE GOAL PER STRAND, NEVER ONE FOR EVERYTHING. The same target is reachable
 * in fractions (+1.11) and out of reach in grammar (+2.80), and a single
 * "5th grade in everything" hides exactly the difference a grown-up needs to
 * see. It would also produce one miss at the end of the year instead of eight
 * honest results.
 *
 * A strand already at or above the target is returned as `met` rather than
 * skipped, because "you are already there" is information too.
 */
export function proposeGrowthGoals({
  strands,
  targetLevel,
  fromDayKey,
  byDayKey = END_OF_SUMMER,
  instrumentId = 'diagnostic.check-in',
  observedRatePerYear = null
}) {
  return Object.values(strands || {})
    .filter((s) => s && s.strandId && typeof s.level === 'number')
    .map((s) => {
      const gap = Number((targetLevel - s.level).toFixed(2));
      const enoughEvidence = (s.asked || 0) >= MIN_ASKED_FOR_A_GOAL && !!s.settled;
      const f = feasibility({ gap, fromDayKey, byDayKey, observedRatePerYear });

      return {
        strandId: s.strandId,
        type: 'growth',
        metric: 'benchmarkScore',
        instrumentId,
        // §3.11.3 — creation FAILS without a baseline. Recorded, never inferred.
        baseline: { value: s.level, capturedOn: null, asked: s.asked || 0, settled: !!s.settled },
        target: { value: targetLevel, byDate: byDayKey },
        gap,
        feasibility: f,
        /**
         * A goal on a strand still being measured may be PROPOSED and may not
         * be ACTIVATED. Grammar's 2.20 rests on four questions; geometry moved
         * 2.00 → 2.70 the moment easier items existed. Setting a target from a
         * number like that and reporting a miss against it in July is not a
         * measurement, it is an accusation.
         */
        blockedReason: gap <= 0
          ? null
          : enoughEvidence
            ? null
            : `still being measured — ${s.asked || 0} of ${MIN_ASKED_FOR_A_GOAL} questions, ${s.settled ? 'settled' : 'not settled'}`,
        status: gap <= 0 ? 'met' : 'proposed'
      };
    })
    .sort((a, b) => b.gap - a.gap);
}

/** Where she is now against a saved goal. */
export function goalProgress(goal, strands) {
  const current = strands?.[goal.strandId]?.level;
  if (typeof current !== 'number' || !goal?.baseline) return null;
  const from = goal.baseline.value;
  const to = goal.target.value;
  const span = to - from;
  const moved = current - from;
  return {
    from,
    current,
    to,
    moved: Number(moved.toFixed(2)),
    remaining: Number((to - current).toFixed(2)),
    /** 0–1, clamped. Null when the goal was already met at baseline. */
    fraction: span <= 0 ? null : Math.max(0, Math.min(1, moved / span))
  };
}

export default proposeGrowthGoals;
