import { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { missionSubjects, missionGradeGap } from '../../lib/missionGrades.js';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import { EvidenceLinkEditor } from './EvidenceLink.jsx';
import { overlapNotice, missionTiming, missionTimingNote } from '../../lib/missionSchedule.js';
import { academyContent } from '../../content/academyContent.js';

const { RUBRIC_LEVELS } = academyContent().academicCenter;
const { MISSION_QUARTERS, MISSION_RUBRIC_CRITERIA, MISSION_STATUS_LABELS, draftMissionFeedback, findProposal, missionGrowth, missionScoreTotals, proposalsForQuarter } = academyContent().compliance;
const { aerospaceProjects, roboticsProjects, scienceExperiments, technologyProjects } = academyContent().projects;
const { ACTIVE_SUBJECTS, KHAN_TAUGHT_SUBJECTS, PARTICIPATION_SUBJECTS, SUBJECT_LABELS } = academyContent().subjects;

/**
 * Every hands-on project in the curriculum, for the duplicate check below.
 * Built from the pools themselves so a project added later is covered without
 * anyone remembering to update a list here.
 */
const ALL_PROJECTS = [
  ...aerospaceProjects,
  ...scienceExperiments,
  ...technologyProjects,
  ...roboticsProjects
];

/**
 * The subjects a mission can grade — everything that carries a letter grade.
 *
 * Participation subjects are excluded because they have no average for a
 * mission to move: PE, Gardening and Guitar are recorded by what he did, not
 * by a percentage. Offering them here would let her attach a mission to a
 * subject that will never show its score, which is the same silence this whole
 * change exists to end.
 */
const GRADEABLE_SUBJECTS = [
  ...ACTIVE_SUBJECTS.filter((s) => !PARTICIPATION_SUBJECTS.includes(s)),
  ...KHAN_TAUGHT_SUBJECTS
];

/**
 * Quarterly Mission Evaluations — PROJECT_PLAN.md Part 8.
 *
 * Project-based assessment in place of the recurring paid diagnostic
 * dropped in Part 0. One mission per quarter, picked by her from three
 * proposals, scored on a rubric, finalized only when she approves.
 *
 * ON THE FEEDBACK DRAFT: the plan asks for Claude to draft a score and
 * written feedback. The approval half is built as specified. The
 * drafting half is assembled from HER rubric choices, not generated —
 * this app has no live AI integration, and calling a lookup table "AI
 * feedback" would be a lie told about her son's record. The UI says so
 * where she reads it, not just in a comment.
 */
export function MissionEvaluationSection() {
  const [quarter, setQuarter] = useState(() => {
    const current = getCurrentQuarter().batchLabel;
    return MISSION_QUARTERS.includes(current) ? current : MISSION_QUARTERS[0];
  });

  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  const mission = missionEvaluations.find((m) => m.quarter === quarter) || null;
  const growth = missionGrowth(missionEvaluations);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Assessment</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Quarterly Mission Evaluations</h3>
        <p className="mt-2 text-sm text-ink-300">
          One real project per quarter instead of a test. A test tells you what he could recall on a Tuesday;
          a mission tells you whether he can plan something, build it, watch it fail, and fix it. For an
          aspiring engineer that second question is the one that matters.
        </p>

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {MISSION_QUARTERS.map((q) => {
            const row = missionEvaluations.find((m) => m.quarter === q);
            return (
              <button
                key={q}
                type="button"
                onClick={() => setQuarter(q)}
                className={
                  'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                  (quarter === q ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
                }
              >
                {q.slice(0, 2)}
                {row?.parentApproved ? ' ✓' : ''}
              </button>
            );
          })}
        </div>
      </div>

      {growth.points.length > 0 && <GrowthPanel growth={growth} />}

      {!mission?.projectId && !mission?.customTitle ? (
        <ProposalPicker quarter={quarter} mission={mission} />
      ) : (
        <ActiveMission quarter={quarter} mission={mission} />
      )}
    </div>
  );
}

/** The three options for a quarter, minus anything she already declined. */
function ProposalPicker({ quarter, mission }) {
  const acceptMissionProposal = useAppStore((s) => s.acceptMissionProposal);
  const declineMissionProposal = useAppStore((s) => s.declineMissionProposal);
  const setCustomMission = useAppStore((s) => s.setCustomMission);
  /**
   * The parent, Aug 29 2026: *"the water bottle rocket was scheduled for him
   * already or is that a different one?"* Both — and he had already built it.
   * A completion is a Writing Journal entry carrying the project's id.
   */
  const getProjectCompletions = useAppStore((s) => s.getProjectCompletions);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const completions = useMemo(
    () => getProjectCompletions(),
    [getProjectCompletions, writingEntries]
  );

  const [customTitle, setCustomTitle] = useState('');
  const [customSubjects, setCustomSubjects] = useState([]);
  const declined = new Set(mission?.declinedIds || []);
  const proposals = proposalsForQuarter(quarter).filter((p) => !declined.has(p.id));

  return (
    <div className="space-y-3">
      <p className="text-sm text-ink-300">
        Three options for {quarter.slice(0, 2)}, each built on lessons he’s actually doing this quarter. Pick
        one, or write your own.
      </p>

      {proposals.length === 0 && (
        <p className="rounded-xl border border-space-700 bg-space-800 p-5 text-sm text-ink-500 shadow-panel">
          You’ve passed on every suggestion for this quarter. Write your own below.
        </p>
      )}

      {proposals.map((proposal) => (
        <div key={proposal.id} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
                {proposal.kind} · {proposal.timeEstimate}
              </p>
              <h4 className="mt-1 font-display text-base font-700 text-ink-100">{proposal.title}</h4>
            </div>
          </div>

          <p className="mt-2 text-sm text-ink-300">{proposal.summary}</p>

          {/*
            HE MAY HAVE BUILT THIS ALREADY.

            Reported, never blocked — repeating a C with real method is good
            teaching. What is not acceptable is her choosing it in November
            without being told. Matched against the real project pools every
            render, so a future overlap announces itself.
          */}
          {(() => {
            const notice = overlapNotice(proposal, ALL_PROJECTS, completions);
            if (!notice) return null;
            return (
              <p
                className={
                  'mt-2 rounded-lg border px-3 py-2 text-xs ' +
                  (notice.alreadyDone
                    ? 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber'
                    : 'border-space-600 bg-space-900 text-ink-400')
                }
              >
                {notice.text}
              </p>
            );
          })()}
          <p className="mt-2 text-sm text-ink-500">
            <span className="text-ink-300">Why this one: </span>
            {proposal.why}
          </p>
          <p className="mt-2 text-xs text-ink-600">
            <span className="text-ink-500">Turns in: </span>
            {proposal.deliverable}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {proposal.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan"
              >
                {SUBJECT_LABELS[subject] || subject}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-600">Builds on: {proposal.builds_on.join(' · ')}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => acceptMissionProposal(quarter, proposal.id)}
              className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Choose this
            </button>
            <button
              type="button"
              onClick={() => declineMissionProposal(quarter, proposal.id)}
              className="text-xs text-ink-500 underline hover:text-ink-100"
            >
              Not this one
            </button>
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Your own</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="What is he building this quarter?"
            className="min-w-[14rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setCustomMission(quarter, customTitle, customSubjects);
              setCustomTitle('');
              setCustomSubjects([]);
            }}
            disabled={!customTitle.trim()}
            className="rounded-lg border border-space-600 px-4 py-2 text-sm font-display font-700 text-ink-100 transition hover:border-signal-cyan hover:text-signal-cyan disabled:cursor-not-allowed disabled:opacity-40"
          >
            Use this instead
          </button>
        </div>

        {/**
          * ---- WHICH SUBJECTS IT GRADES, ASKED UP FRONT (Aug 26, 2026) ----
          *
          * The twelve proposals name their own subjects. One she types in
          * names none — so before this, a custom mission could be chosen,
          * built over a whole quarter, scored, approved, and printed in the
          * compliance packet while grading absolutely nothing.
          *
          * It is asked here rather than warned about later because the answer
          * is obvious the moment she types the title and considerably less
          * obvious in December.
          */}
        <SubjectPicker selected={customSubjects} onToggle={(subject) =>
          setCustomSubjects((prev) =>
            prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
          )
        } />

        <p className="mt-2 text-xs text-ink-600">
          Scored on the same rubric either way. A mission counts for as much as the quarter it covers,
          in each subject you tick — so the ticks matter as much as the score.
        </p>
      </div>
    </div>
  );
}

/**
 * Which subjects a mission grades. Chips rather than a multi-select, because
 * three ticks at 9pm should not involve a dropdown.
 */
function SubjectPicker({ selected, onToggle, disabled = false }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {GRADEABLE_SUBJECTS.map((subject) => {
        const on = selected.includes(subject);
        return (
          <button
            key={subject}
            type="button"
            disabled={disabled}
            onClick={() => onToggle(subject)}
            className={
              'rounded-full border px-2.5 py-1 text-[11px] font-display font-600 transition disabled:cursor-not-allowed disabled:opacity-40 ' +
              (on
                ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                : 'border-space-600 text-ink-500 hover:text-ink-100')
            }
          >
            {SUBJECT_LABELS[subject] || subject}
          </button>
        );
      })}
    </div>
  );
}

function ActiveMission({ quarter, mission }) {
  const setMissionStatus = useAppStore((s) => s.setMissionStatus);
  const setMissionScore = useAppStore((s) => s.setMissionScore);
  const setMissionFeedback = useAppStore((s) => s.setMissionFeedback);
  const approveMissionEvaluation = useAppStore((s) => s.approveMissionEvaluation);
  const reopenMissionEvaluation = useAppStore((s) => s.reopenMissionEvaluation);
  const clearMissionEvaluation = useAppStore((s) => s.clearMissionEvaluation);
  const setMissionDriveUrl = useAppStore((s) => s.setMissionDriveUrl);

  const setMissionSubjects = useAppStore((s) => s.setMissionSubjects);

  const proposal = mission.projectId ? findProposal(mission.projectId) : null;
  const title = mission.customTitle || proposal?.title || 'Mission';
  const totals = missionScoreTotals(mission.scores);
  const locked = Boolean(mission.parentApproved);
  /**
   * WHAT THIS MISSION ACTUALLY GRADES, on the screen where she scores it.
   *
   * A rubric with no subjects behind it moves nothing, and there is no worse
   * moment to discover that than after a quarter of building and an evening of
   * scoring. `missionGradeGap` names the two ways a mission reaches no grade —
   * no subjects, or scored and not yet approved.
   */
  const gradesSubjects = missionSubjects(mission);
  const gap = missionGradeGap(mission);

  const [feedback, setFeedback] = useState(mission.feedback || '');
  const [error, setError] = useState(null);

  const handleApprove = async () => {
    const result = await approveMissionEvaluation(quarter);
    if (!result.ok) setError(result.error);
    else setError(null);
  };

  const draft = totals ? draftMissionFeedback(mission.scores, title) : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
              {quarter.slice(0, 2)} Mission · {MISSION_STATUS_LABELS[mission.status] || mission.status}
            </p>
            <h4 className="mt-1 font-display text-base font-700 text-ink-100">{title}</h4>
          </div>
          {!locked && (
            <button
              type="button"
              onClick={() => clearMissionEvaluation(quarter)}
              className="flex-none text-xs text-ink-500 hover:text-signal-red"
            >
              Pick a different one
            </button>
          )}
        </div>

        {gap && (
          <p className="mt-2 rounded-lg border border-signal-amber/40 bg-signal-amber/5 px-3 py-2 text-xs text-signal-amber">
            {gap}
          </p>
        )}

        <p className="mt-2 text-xs text-ink-500">
          {gradesSubjects.length > 0 ? (
            <>
              <span className="text-ink-600">Grades: </span>
              {gradesSubjects.map((s) => SUBJECT_LABELS[s] || s).join(' · ')} — counting for as much as
              the quarter, in each.
            </>
          ) : (
            <span className="text-ink-600">Grades no subject yet.</span>
          )}
        </p>

        {/**
          * Only a custom mission is re-pointable. A proposal's subjects are
          * part of the proposal — quietly editing them would make two installs
          * disagree about what 'Build and Test a Glider' assesses.
          */}
        {!proposal && (
          <SubjectPicker
            selected={gradesSubjects}
            disabled={locked}
            onToggle={(subject) =>
              setMissionSubjects(
                quarter,
                gradesSubjects.includes(subject)
                  ? gradesSubjects.filter((s) => s !== subject)
                  : [...gradesSubjects, subject]
              )
            }
          />
        )}

        {proposal && <p className="mt-2 text-sm text-ink-300">{proposal.summary}</p>}
        {proposal && (
          <p className="mt-2 text-xs text-ink-600">
            <span className="text-ink-500">Turns in: </span>
            {proposal.deliverable}
          </p>
        )}

        {!locked && (
          <div className="mt-3 flex flex-wrap gap-2">
            {['accepted', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setMissionStatus(quarter, status)}
                className={
                  'rounded-lg px-3 py-1.5 text-xs font-display font-700 transition ' +
                  (mission.status === status
                    ? 'bg-signal-cyan/15 text-signal-cyan'
                    : 'border border-space-600 text-ink-500 hover:text-ink-100')
                }
              >
                {MISSION_STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        )}

        <EvidenceLinkEditor url={mission.driveUrl} onSave={(url) => setMissionDriveUrl(quarter, url)} />
      </div>

      {/* The rubric. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Rubric</p>
          {totals && (
            <p className="font-display text-sm font-700 text-signal-cyan">
              {totals.total} / {totals.max}
            </p>
          )}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Same 1–4 scale used everywhere else in the app. Scored the same way all year, which is what makes
          the growth comparison mean anything.
        </p>

        <div className="mt-3 space-y-3">
          {MISSION_RUBRIC_CRITERIA.map((criterion) => (
            <div key={criterion.id} className="rounded-lg border border-space-700 bg-space-900 p-3">
              <p className="font-display text-sm font-700 text-ink-100">{criterion.label}</p>
              <p className="mt-0.5 text-xs text-ink-500">{criterion.lookFor}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {RUBRIC_LEVELS.map((level) => {
                  const selected = mission.scores?.[criterion.id] === level.score;
                  return (
                    <button
                      key={level.score}
                      type="button"
                      disabled={locked}
                      onClick={() => setMissionScore(quarter, criterion.id, level.score)}
                      title={level.hint}
                      className={
                        'rounded-md px-2.5 py-1 text-xs font-display font-600 transition ' +
                        (selected
                          ? 'bg-signal-cyan text-space-950'
                          : 'border border-space-600 text-ink-500 hover:text-ink-100 disabled:opacity-40')
                      }
                    >
                      {level.score} · {level.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback. */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Feedback</p>
        {!totals ? (
          <p className="mt-2 text-sm text-ink-500">Score every criterion and a draft appears here.</p>
        ) : (
          <>
            <p className="mt-2 text-xs text-ink-500">
              This draft is <strong className="text-ink-300">assembled from the scores you just picked</strong>
              , not written by AI — this app has no live AI connection, and it isn’t going to pretend
              otherwise. Edit it into your own words; what you save is what goes in the record.
            </p>
            {!locked && (
              <button
                type="button"
                onClick={() => setFeedback(draft)}
                className="mt-2 rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:border-signal-cyan hover:text-signal-cyan"
              >
                {feedback ? 'Replace with a fresh draft' : 'Start from the draft'}
              </button>
            )}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={locked}
              rows={7}
              placeholder="What he did well, and what to push on next quarter."
              className="mt-2 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none disabled:opacity-60"
            />
            {!locked && (
              <button
                type="button"
                onClick={() => setMissionFeedback(quarter, feedback)}
                className="mt-2 rounded-lg bg-space-700 px-3 py-1.5 text-xs font-display font-700 text-ink-100 hover:brightness-125"
              >
                Save feedback
              </button>
            )}
          </>
        )}
      </div>

      {/* Approval — nothing is final until she says so. */}
      <div
        className={
          'rounded-xl border p-5 shadow-panel ' +
          (locked ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-800')
        }
      >
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Approval</p>
        {locked ? (
          <>
            <p className="mt-1 font-display text-sm font-700 text-signal-green">
              Finalized{mission.approvedAt ? ` on ${mission.approvedAt}` : ''}.
            </p>
            <p className="mt-1 text-xs text-ink-500">This is in the report card and the compliance packet.</p>
            <button
              type="button"
              onClick={() => reopenMissionEvaluation(quarter)}
              className="mt-3 text-xs text-ink-500 underline hover:text-ink-100"
            >
              Reopen to change something
            </button>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-ink-300">
              Nothing is recorded as final until you approve it — the rubric suggests, you decide.
            </p>
            {error && <p className="mt-2 text-xs text-signal-amber">{error}</p>}
            <button
              type="button"
              onClick={handleApprove}
              disabled={!totals}
              className="mt-3 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Approve &amp; finalize
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Growth — the comparison the plan asked for.
 *
 * Per-criterion, not just a total, because the aggregate hides the
 * useful part: a boy whose total barely moves while Iteration goes 1 → 4
 * has had the most important year an engineer can have, and one number
 * would bury that.
 */
function GrowthPanel({ growth }) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Growth</p>
      <h4 className="mt-1 font-display text-base font-700 text-ink-100">Measured Against His Own Baseline</h4>

      <div className="mt-3 flex flex-wrap gap-2">
        {growth.points.map((point) => (
          <div key={point.quarter} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
              {point.quarter.slice(0, 2)}
            </p>
            <p className="font-display text-lg font-700 text-signal-cyan">
              {point.total}
              <span className="text-xs font-400 text-ink-500">/{point.max}</span>
            </p>
          </div>
        ))}
      </div>

      {growth.byCriterion.length > 0 ? (
        <div className="mt-4 space-y-1.5">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            {growth.baseline.quarter.slice(0, 2)} → {growth.latest.quarter.slice(0, 2)}, by criterion
          </p>
          {growth.byCriterion.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="text-ink-300">{row.label}</span>
              <span
                className={
                  'font-display font-700 ' +
                  (row.change > 0
                    ? 'text-signal-green'
                    : row.change < 0
                      ? 'text-signal-amber'
                      : 'text-ink-500')
                }
              >
                {row.from} → {row.to}
                {row.change > 0 ? ` (+${row.change})` : row.change < 0 ? ` (${row.change})` : ' (no change)'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-ink-500">
          One mission scored so far — this becomes his baseline. The comparison appears once a second quarter
          is scored.
        </p>
      )}
    </div>
  );
}
