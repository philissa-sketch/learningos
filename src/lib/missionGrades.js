
/**
 * =============================================================================
 * A MISSION GRADES THE SUBJECTS IT NAMES.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (audit item O-6(a), Aug 26 2026) ----
 *
 * The audit said the Quarterly Mission Evaluation "reaches no subject average",
 * and my first read of that was that it was correct by design — a mission is
 * cross-subject, so of course it does not belong to one subject.
 *
 * That was wrong, and the file it was wrong about says so in its own words.
 * `data/admin/missionEvaluations.js`, above the proposals:
 *
 *   > *"Each is cross-subject on purpose. A mission that only touches Aerospace
 *   > **grades Aerospace**; a mission that needs the math to size it, the
 *   > writing to document it and the science to explain it **grades the
 *   > quarter**."*
 *
 * Every proposal carries a `subjects` array, written for exactly this, and
 * **nothing in the app had ever read it for grading.** This is the project's
 * recurring fault in its purest form: the design was written down, the data was
 * built to match, and the code never did the thing.
 *
 * It matters more than most, because `lib/compliancePacket.js` calls these
 * evaluations what they are:
 *
 *   > *"for a homeschool record this IS the assessment evidence — it stands in
 *   > for the standardized testing this family deliberately does not do."*
 *
 * So the app's own primary assessment counted for nothing on the transcript
 * that leaves the house, while a book report counted.
 *
 * ---- WHAT A MISSION WEIGHS ----
 *
 * The parent, asked directly with the arithmetic in front of her: **the same as
 * a quarterly exam.**
 *
 * That is the rule already in `getReportCardData` — an exam's weight is the
 * number of that quarter's ordinary lessons he actually sat, so an exam counts
 * for as much as the quarter it tests. A quarterly mission and a quarterly exam
 * are the two big assessments of a quarter, and giving the mission weight 1
 * would have repeated the exact failure she had already ruled on: at weight 1,
 * four whole projects are 3.9% of Aerospace, and he could fail every one of
 * them and finish with an A.
 *
 * ---- ONLY APPROVED MISSIONS GRADE ANYTHING ----
 *
 * Same rule the compliance packet applies, and for the same reason: a
 * scored-but-unapproved rubric is a draft. A draft that moves a letter grade is
 * a grade she never signed off on.
 */

/**
 * The subjects one evaluation grades.
 *
 * A CUSTOM MISSION HAS NO PROPOSAL AND THEREFORE NO SUBJECTS OF ITS OWN, which
 * is why `customSubjects` exists. Without it a mission she typed in herself
 * would be scored, approved, printed in the compliance packet — and quietly
 * grade nothing, which is the same silence this whole module exists to end.
 * The evaluation screen asks her for them.
 */
export function missionSubjects(mission) {
  if (!mission) return [];
  if (Array.isArray(mission.customSubjects) && mission.customSubjects.length) {
    return [...new Set(mission.customSubjects)];
  }
  const proposal = mission.projectId ? findProposal(mission.projectId) : null;
  return proposal?.subjects ? [...new Set(proposal.subjects)] : [];
}

/** Approved, fully scored, and pointed at at least one subject. */
export function missionCounts(mission) {
  return Boolean(
    mission &&
      mission.parentApproved &&
      missionScoreTotals(mission.scores) &&
      missionSubjects(mission).length > 0
  );
}

/**
 * A mission that will never reach a grade, and why — so the screen can say it
 * BEFORE she spends an evening scoring one.
 *
 * Returns null when the mission is fine. Deliberately does not treat "not
 * finished yet" as a problem: a mission in progress reaching no grade is not a
 * fault, it is Tuesday.
 */
export function missionGradeGap(mission) {
  if (!mission) return null;
  if (missionSubjects(mission).length === 0) {
    return 'This mission is not attached to any subject, so scoring it will not move a grade. Pick the subjects it covers below.';
  }
  if (missionScoreTotals(mission.scores) && !mission.parentApproved) {
    return 'Scored but not finalized. The rubric moves the subject grades when you approve it, not before.';
  }
  return null;
}

/**
 * The score rows this subject should carry from missions.
 *
 * @param subject            subject code
 * @param missionEvaluations every evaluation, approved or not
 * @param weightFor          (quarterLabel) => weight, normally the same
 *                           quarter-lesson count the quarterly exams use
 * @param inSchoolYear       (dateStr) => boolean, the same year filter every
 *                           other grade source in getReportCardData applies
 */
export function missionScoresForSubject(
  subject,
  missionEvaluations = [],
  { weightFor = () => 1, inSchoolYear = () => true } = {}
) {
  const out = [];
  for (const mission of missionEvaluations || []) {
    if (!missionCounts(mission)) continue;
    if (!missionSubjects(mission).includes(subject)) continue;
    /**
     * The date the assessment happened, in the order the record itself would
     * defend: when he finished it, else when she approved it. A mission with
     * neither is still counted rather than silently dropped — the school-year
     * filter exists to exclude LAST year's work, not to discard a row whose
     * timestamp is missing.
     */
    const when = (mission.completedAt || mission.approvedAt || '').slice(0, 10);
    if (when && !inSchoolYear(when)) continue;
    const totals = missionScoreTotals(mission.scores);
    out.push({
      quarter: mission.quarter,
      value: totals.pct,
      weight: weightFor(mission.quarter),
      total: totals.total,
      max: totals.max
    });
  }
  return out;
}

/** "2 missions, 85% average" — the evidence phrase for a transcript line. */
export function missionEvidencePhrase(rows) {
  if (!rows || rows.length === 0) return null;
  const avg = Math.round((rows.reduce((n, r) => n + r.value, 0) / rows.length) * 100);
  return `${rows.length} quarterly mission${rows.length === 1 ? '' : 's'} scored, ${avg}% average`;
}
import { academyContent } from '../content/academyContent.js';

const { findProposal = () => null, missionScoreTotals = () => null } = academyContent().compliance;
