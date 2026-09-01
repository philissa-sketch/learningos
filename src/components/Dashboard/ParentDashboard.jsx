import { useState, useEffect, useMemo } from 'react';
import { useAppStore, totalMasteredCount } from '../../store/useAppStore.js';
import { XP_PER_COIN, XP_PER_CREDIT, CREDIT_AUTO_APPROVE_MAX } from '../../lib/economy.js';
import { CurrencyControlsSection } from './CurrencyControlsSection.jsx';
import { GRADE_SCALE_SUMMARY, gradeColor } from '../../lib/gradeScale.js';
import { PercentGradeInput } from './GradeControls.jsx';
import { groupByQuarter, getCurrentQuarter, quarterRank } from '../../lib/schoolQuarter.js';
import { SUGGESTED_PARENT_REWARDS } from '../../lib/rewards.js';
import { READINESS_SKILLS, READINESS_LEVELS, LEVEL_STYLE, criteriaFor } from '../../lib/readiness.js';
import { FIELD_TRIP_SUBJECTS, tripSubjectLabel } from '../../lib/fieldTrips.js';
import { planBookSwap, isUnstarted, SWAP_REFUSAL_TEXT } from '../../lib/bookSwap.js';
import { ComplianceSection } from './ComplianceSection.jsx';
import { AdminRecordsSection, CourseDescriptionsSection } from './AdminRecordsSection.jsx';
import { EvidenceLinkInput, EvidenceLinkEditor } from './EvidenceLink.jsx';
import { ParentPasscodeSection } from './ParentGate.jsx';
import { MissionEvaluationSection } from './MissionEvaluationSection.jsx';
import { LearningAnalyticsSection } from './LearningAnalyticsSection.jsx';
import { YearPlanSection } from './YearPlanSection.jsx';
import { MissionControlBoard } from './MissionControlBoard.jsx';
import { BackupStatusCard } from './BackupStatusCard.jsx';
import { WordStudyRecordSection } from './WordStudyRecordSection.jsx';
import { TypingRecordSection } from './TypingRecordSection.jsx';
import { ScienceCourseMapSection } from './ScienceCourseMapSection.jsx';
import { NovaParentGuide } from './NovaParentGuide.jsx';
import { VoiceSettingsPanel } from '../Mentor/VoiceSettingsPanel.jsx';
import {
  buildCalendarItems,
  getUpcomingCalendarItems,
  getOverdueCalendarItems,
  todayDateStr,
  toDateStr,
  addDays,
  parseDateStr,
  getNextCalendarItemsBeyond
} from '../../lib/scheduler.js';
import { derivedPlannerItems } from '../../lib/plannerFeeds.js';
import { participationSummary, participationPhrases } from '../../lib/participationRecord.js';
import { ExerciseVideoManager } from '../PE/ExerciseVideoManager.jsx';
import { REFERENCE_LINK_TYPES } from '../../lib/driveLinks.js';
import { academyContent } from '../../content/academyContent.js';

const { QUIZ_PLATFORMS } = academyContent().games;
const { SUBJECT_LABELS } = academyContent().subjects;
const { writingPrompts } = academyContent().writing;

const CONFIRM_PHRASE = 'RESET';
const GEORGIA_DAYS_TARGET = 180;
const GEORGIA_DAILY_MINUTES_TARGET = 270; // 4.5 hours/day

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateTime(isoStr) {
  return new Date(isoStr).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * The Parent Dashboard's 26 sections, grouped by WHEN SHE USES THEM.
 *
 * The parent, Aug 7 2026: "there is multiple selections in the Parent Dashboard
 * and I am overwhelmed by them. Is there a way we can unclutter and organize
 * the parent dashboard as well?"
 *
 * She was looking at twenty-six equally-weighted pills in one wrapped row —
 * Attendance beside Danger Zone, Passcode beside Report Card — with no signal
 * about which she needs today and which she needs once a year. Twenty-six
 * choices with no hierarchy is not a menu, it is a search problem.
 *
 * Nothing is removed and nothing is renamed. The grouping is the whole change,
 * and it is by CADENCE rather than by topic, because cadence is what she
 * actually navigates by: "every day" is a different errand from "end of
 * quarter," and a topic grouping would have put Attendance (daily) next to
 * Compliance (yearly) purely because both are recordkeeping.
 */
const SECTION_GROUPS = [
  {
    id: 'board',
    label: 'This Week',
    hint: 'What needs you right now, read from your real records.',
    sections: [{ id: 'mission-control-board', label: 'Mission Control Board' }]
  },
  {
    id: 'daily',
    label: 'Every Day',
    hint: 'The few minutes of recordkeeping that keep the year honest.',
    sections: [
      { id: 'attendance', label: 'Attendance' },
      { id: 'coming-up', label: 'Coming Up' },
      { id: 'mission-comms', label: 'Mission Comms' }
    ]
  },
  {
    id: 'grading',
    label: 'Grading',
    hint: 'Everything that takes a score. Khan percentages live here.',
    sections: [
      { id: 'khan-academy', label: 'Khan Academy Grades' },
      { id: 'gradebook', label: 'Gradebook' },
      { id: 'writing-journal', label: 'Writing Journal Review' },
      { id: 'academic-success-center', label: 'Academic Success Center' },
      { id: 'mission-evaluations', label: 'Mission Evaluations' }
    ]
  },
  {
    id: 'planning',
    label: 'Planning',
    hint: 'What is coming — assignments, trips, fitness, motivation.',
    sections: [
      { id: 'planner', label: 'Planner' },
      { id: 'year-plan', label: 'Year Plan' },
      { id: 'field-trips', label: 'Field Trips' },
      { id: 'pe-fitness-nutrition', label: 'PE & Nutrition' },
      { id: 'readiness', label: 'Engineer Readiness' },
      // Aug 20, 2026 — the parent: "add blooket, kahoot, and gimkit to Lamar
      // game section". She hosts the games, so the link she pastes here is
      // the only thing that gets him in. See data/games/quizPlatforms.js.
      { id: 'quiz-games', label: 'Blooket / Kahoot / Gimkit' },
      { id: 'rewards-manager', label: 'Rewards & Coins' },
      { id: 'currency', label: 'Currency Controls' }
    ]
  },
  {
    id: 'records',
    label: 'Records & Reports',
    hint: 'What you print, file, or hand to someone else.',
    sections: [
      { id: 'report-card', label: 'Report Card' },
      { id: 'weekly-report', label: 'Weekly Report' },
      { id: 'analytics', label: 'Learning Analytics' },
      { id: 'compliance', label: 'Compliance (GA)' },
      { id: 'records', label: 'Records' },
      { id: 'course-descriptions', label: 'Course Descriptions' },
      { id: 'reading-log', label: 'Reading Log' },
      // Added Aug 9, 2026. Word study was the one daily strand with no record
      // anywhere — see WordStudyRecordSection for what that cost.
      { id: 'word-study', label: 'Spelling & Vocabulary' },
      /**
       * Added Aug 26, 2026, and the note above it is now wrong by one: word
       * study was not "the one daily strand with no record anywhere." Typing
       * was the other, and it was worse — fifteen minutes a day that no
       * calendar could read, because neither typing table carried a date.
       */
      { id: 'typing', label: 'Typing' },
      // Added Aug 9, 2026. Science runs four Khan courses at once, and there
      // was no way to check the plan against them without counting units on
      // Khan's own pages — which is how the parent found that its headline
      // unit count includes two units that are not student work.
      { id: 'science-courses', label: 'Science Course Map' },
      { id: 'portfolio', label: 'Portfolio' },
      { id: 'notes', label: 'Notes & Observations' }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    hint: 'Rarely. Two of these are permanent.',
    sections: [
      { id: 'voice', label: "Nova's Voice & Sounds" },
      { id: 'passcode', label: 'Passcode' },
      { id: 'signout', label: 'Sign Out' },
      { id: 'sync', label: 'Export / Import' },
      { id: 'danger', label: 'Danger Zone' }
    ]
  }
];

const GROUP_OF_SECTION = Object.fromEntries(
  SECTION_GROUPS.flatMap((g) => g.sections.map((s) => [s.id, g.id]))
);

/**
 * Rewards & Coins (Part 5 gamification, Aug 6, 2026). The parent controls the
 * real-world side of the coin economy: define rewards, approve or deny the
 * requests the student makes with his coins (denying refunds them). Cosmetic
 * unlocks in the student's Rewards store are automatic and never appear here.
 */
function RewardsManagerSection() {
  const rewards = useAppStore((s) => s.rewards);
  const redemptions = useAppStore((s) => s.rewardRedemptions);
  const addReward = useAppStore((s) => s.addReward);
  const deleteReward = useAppStore((s) => s.deleteReward);
  const resolveRedemption = useAppStore((s) => s.resolveRedemption);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [note, setNote] = useState('');

  const pending = redemptions.filter((r) => r.kind === 'reward' && r.status === 'pending');
  const resolved = redemptions.filter((r) => r.kind === 'reward' && r.status !== 'pending');

  const submit = (e) => {
    e.preventDefault();
    const c = Number(cost);
    if (!name.trim() || !Number.isFinite(c) || c <= 0) return;
    addReward({ name: name.trim(), cost: c, note: note.trim() });
    setName('');
    setCost('');
    setNote('');
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Rewards &amp; Coins</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Real-World Rewards</h3>
        <p className="mt-2 text-sm text-ink-300">
          Two currencies, both earned only from real completed work. <strong>Coins</strong> ({XP_PER_COIN} XP each)
          buy things that cost you nothing &mdash; gear, his HQ, cosmetics &mdash; and clear instantly.
          <strong> Credits</strong> ({XP_PER_CREDIT} XP each) stand for real things. Anything over{' '}
          {CREDIT_AUTO_APPROVE_MAX} Credits, or any reward that costs real time or money whatever its price, waits
          here for you. Denying refunds him in full.
        </p>

        {pending.length > 0 && (
          <div className="mt-4">
            <p className="text-[10px] font-display uppercase tracking-widest text-signal-amber">Waiting for your approval</p>
            <div className="mt-2 space-y-2">
              {pending.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-3 py-2">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-700 text-ink-100">{r.rewardName}</p>
                    {/* The currency the request was actually made in. This said
                        "coin" for every row, including Credit requests — the two
                        are deliberately not interchangeable and the approval
                        screen is the worst place to blur them. */}
                    <p className="text-[11px] text-ink-500">
                      {r.currency === 'credit' ? '🎟️' : '🪙'} {r.cost}{' '}
                      {r.currency === 'credit' ? 'Credits' : 'Coins'} · requested {formatDateTime(r.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-none gap-2">
                    <button
                      type="button"
                      onClick={() => resolveRedemption(r.id, 'fulfilled')}
                      className="rounded-md bg-signal-green px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => resolveRedemption(r.id, 'denied')}
                      className="rounded-md border border-signal-red/50 px-3 py-1 text-xs font-display font-700 text-signal-red transition hover:bg-signal-red/10"
                    >
                      Deny &amp; refund
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Add a Reward</p>
        <form onSubmit={submit} className="mt-3 space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Reward (e.g. 30 min extra screen time)"
            className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600"
          />
          <div className="flex gap-2">
            <input
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              inputMode="numeric"
              placeholder="Coin cost"
              className="w-32 rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600"
            />
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)"
              className="flex-1 rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600"
            />
          </div>
          <button type="submit" className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110">
            Add reward
          </button>
        </form>
        <div className="mt-3">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">Quick add</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {SUGGESTED_PARENT_REWARDS.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => addReward({ name: s.name, cost: s.cost, note: '' })}
                className="rounded-full border border-space-600 bg-space-900 px-2.5 py-1 text-xs text-ink-300 transition hover:border-signal-cyan hover:text-ink-100"
              >
                {s.name} · 🪙 {s.cost}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Current Rewards</p>
        {rewards.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No rewards yet — add one above or use a quick-add chip.</p>
        ) : (
          <div className="mt-2 space-y-1.5">
            {rewards.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                <div className="min-w-0">
                  <p className="font-display text-sm font-600 text-ink-100">{r.name}</p>
                  <p className="text-[11px] text-ink-500">🪙 {r.cost}{r.note ? ` · ${r.note}` : ''}</p>
                </div>
                <button type="button" onClick={() => deleteReward(r.id)} className="flex-none text-xs text-ink-500 underline hover:text-signal-red">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Redemption History</p>
          <div className="mt-2 space-y-1">
            {resolved.slice(0, 15).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 truncate text-ink-400">{r.rewardName} · 🪙 {r.cost}</span>
                <span className="flex-none text-ink-500">{r.status}{r.resolvedAt ? ` · ${formatDateTime(r.resolvedAt)}` : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Engineer Readiness (Part 5, Aug 6, 2026). The parent-awarded soft-skill
 * track — the engineering skills no academic test measures. She sets each to
 * Bronze/Silver/Gold as he demonstrates it; he sees the track under
 * Rewards → Readiness. Stored as a parent record (survives a progress reset).
 */
function ReadinessManagerSection() {
  const readinessAwards = useAppStore((s) => s.readinessAwards);
  const setReadinessAward = useAppStore((s) => s.setReadinessAward);
  const awardedCount = Object.keys(readinessAwards || {}).length;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Engineer Readiness</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Soft &amp; Practical Skills</h3>
      <p className="mt-2 text-sm text-ink-300">
        The engineering skills no academic test measures. Set each to Bronze, Silver, or Gold as he demonstrates it in
        real projects, builds, and presentations — he sees them in his Rewards &rarr; Readiness track.{' '}
        {awardedCount} of {READINESS_SKILLS.length} awarded.
      </p>
      {/* The rubric is printed next to the buttons so the standard is the same
          in March as it was in September. Before it existed, these were awarded
          on gut feel with nothing written down to stay consistent against. */}
      <p className="mt-1 text-[11px] text-ink-500">
        Each level lists what to look for. The ladder is <span className="text-ink-300">independence</span>, not volume:
        Bronze is doing it when prompted, Silver is doing it unprompted and explaining the choice, Gold is doing it in
        open-ended situations and making others better at it.
      </p>
      <div className="mt-4 space-y-2">
        {READINESS_SKILLS.map((skill) => {
          const award = readinessAwards[skill.id];
          return (
            <div key={skill.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
              <p className="font-display text-sm font-700 text-ink-100">
                {skill.icon} {skill.name}
              </p>
              <p className="text-[11px] text-ink-500">{skill.desc}</p>
              <dl className="mt-2 space-y-1">
                {READINESS_LEVELS.map((lvl) => {
                  const criteria = criteriaFor(skill.id, lvl);
                  if (!criteria) return null;
                  const reached = award && READINESS_LEVELS.indexOf(award.level) >= READINESS_LEVELS.indexOf(lvl);
                  return (
                    <div key={lvl} className="flex gap-2 text-[11px] leading-snug">
                      <dt
                        className={
                          'w-12 flex-none font-display uppercase tracking-widest ' +
                          (reached ? 'text-signal-green' : 'text-ink-500')
                        }
                      >
                        {reached ? '✓ ' : ''}
                        {lvl}
                      </dt>
                      <dd className={reached ? 'text-ink-300' : 'text-ink-500'}>{criteria}</dd>
                    </div>
                  );
                })}
              </dl>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {['None', ...READINESS_LEVELS].map((lvl) => {
                  const active = (award?.level || 'None') === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setReadinessAward(skill.id, lvl === 'None' ? null : lvl, award?.note || '')}
                      className={
                        'rounded-md border px-2.5 py-1 text-xs font-display font-700 transition ' +
                        (active
                          ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                          : 'border-space-600 bg-space-900 text-ink-400 hover:text-ink-100')
                      }
                    >
                      {lvl}
                    </button>
                  );
                })}
                {award && (
                  <input
                    defaultValue={award.note || ''}
                    onBlur={(e) => setReadinessAward(skill.id, award.level, e.target.value)}
                    placeholder="Note (optional)"
                    className="ml-1 min-w-0 flex-1 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-xs text-ink-100 placeholder:text-ink-600"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- Field Trip Planner (Part 5, Aug 6, 2026) ----

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(`${dateStr}T00:00:00`);
  return Math.round((d - today) / 86400000);
}

function LearningPackView({ pack }) {
  const printPack = () => {
    document.body.classList.add('printing-fieldtrip');
    const cleanup = () => {
      document.body.classList.remove('printing-fieldtrip');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  };
  const List = ({ items }) => (
    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink-300">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
  const Block = ({ title, children }) => (
    <div className="mt-3">
      <p className="text-[11px] font-display uppercase tracking-widest text-ink-500">{title}</p>
      {children}
    </div>
  );
  return (
    <div className="mt-3">
      <div className="fieldtrip-print rounded-lg border border-space-700 bg-space-950 p-4">
        <p className="font-display text-sm font-700 text-signal-cyan">Before You Go</p>
        <p className="mt-1 text-sm text-ink-300">{pack.before.background}</p>
        <Block title="Objectives"><List items={pack.before.objectives} /></Block>
        {pack.before.vocabulary.length > 0 && (
          <Block title="Vocabulary">
            <div className="mt-1 flex flex-wrap gap-1.5">
              {pack.before.vocabulary.map((v, i) => (
                <span key={i} className="rounded-full border border-space-600 px-2 py-0.5 text-xs text-ink-300">{v}</span>
              ))}
            </div>
          </Block>
        )}
        <Block title="Essential Questions"><List items={pack.before.essentialQuestions} /></Block>
        <Block title="Safety"><List items={pack.before.safety} /></Block>
        <Block title="Packing List"><List items={pack.before.packing} /></Block>

        <p className="mt-5 font-display text-sm font-700 text-signal-cyan">During the Trip</p>
        <Block title="Observe"><List items={pack.during.observation} /></Block>
        <Block title="Photos"><List items={pack.during.photo} /></Block>
        <Block title="Scavenger Hunt"><List items={pack.during.scavengerHunt} /></Block>
        <Block title="Journal Prompts"><List items={pack.during.journalPrompts} /></Block>

        <p className="mt-5 font-display text-sm font-700 text-signal-cyan">After the Trip</p>
        <Block title="Reflection"><List items={pack.after.reflection} /></Block>
        <Block title="Writing Assignment"><p className="mt-1 text-sm text-ink-300">{pack.after.writingAssignment}</p></Block>
        <Block title="Discussion"><List items={pack.after.discussion} /></Block>
        <Block title="Portfolio"><p className="mt-1 text-sm text-ink-300">{pack.after.portfolioPrompt}</p></Block>
        <Block title="Rubric"><List items={pack.after.rubric} /></Block>
      </div>
      <button type="button" onClick={printPack} className="print-hide mt-2 rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan">
        Print pack
      </button>
    </div>
  );
}

function TripCard({ trip }) {
  const generate = useAppStore((s) => s.generateFieldTripLearningPack);
  const complete = useAppStore((s) => s.completeFieldTrip);
  const update = useAppStore((s) => s.updateFieldTrip);
  const remove = useAppStore((s) => s.deleteFieldTrip);
  const editCompleted = useAppStore((s) => s.updateCompletedFieldTrip);
  const [openPack, setOpenPack] = useState(false);
  const [hours, setHours] = useState('');
  const [newDate, setNewDate] = useState('');
  // Correcting a trip that is already marked complete. Separate state from the
  // "mark complete" inputs above, because these are pre-filled with what the
  // record currently says rather than starting blank.
  const [editing, setEditing] = useState(false);
  const [editHours, setEditHours] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editMsg, setEditMsg] = useState(null);
  const done = trip.status === 'completed';
  const d = daysUntil(trip.date);

  return (
    <div className={'rounded-xl border p-4 shadow-panel ' + (done ? 'border-space-700 bg-space-900' : 'border-signal-cyan/30 bg-space-900')}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-sm font-700 text-ink-100">{trip.destination || 'Untitled trip'}</p>
          <p className="text-xs text-ink-500">
            {trip.date ? formatDate(trip.date) : 'No date'}
            {trip.time ? ` · ${trip.time}` : ''}
            {!done && d !== null && (d >= 0 ? ` · in ${d} day${d === 1 ? '' : 's'}` : ` · ${Math.abs(d)} day${Math.abs(d) === 1 ? '' : 's'} ago`)}
            {done && ' · Completed'}
          </p>
          {trip.subjects.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {trip.subjects.map((s) => (
                <span key={s} className="rounded-full bg-space-800 px-2 py-0.5 text-[10px] text-ink-400">{tripSubjectLabel(s)}</span>
              ))}
            </div>
          )}
          <p className="mt-1 text-[11px] text-ink-600">
            {trip.gradeLevel ? `${trip.gradeLevel} · ` : ''}
            {trip.cost ? `$${trip.cost} · ` : ''}
            {trip.travelTimeMin ? `${trip.travelTimeMin} min travel` : ''}
            {done && trip.hours ? ` · ${trip.hours} learning hrs` : ''}
          </p>
          {trip.notes && <p className="mt-1 text-xs text-ink-400">{trip.notes}</p>}
          {/**
            * WHAT THE TRIP PUT IN HER LEGAL RECORD, SAID OUT LOUD.
            *
            * completeFieldTrip now books the hours as offline instruction
            * minutes against the trip's date, which is what finally makes a
            * logged trip count toward Georgia's 180 days. A number that
            * appears in a compliance record should never be one she cannot
            * trace back to the thing that wrote it — so the card names the
            * minutes and the day, and points at where to change them.
            */}
          {done && trip.instructionMinutes ? (
            <p className="mt-1 text-[11px] font-display text-signal-green">
              Counted as {trip.instructionMinutes} minutes of instruction on{' '}
              {parseDateStr(trip.instructionDate).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
              <span className="text-ink-600"> · edit it under Compliance</span>
            </p>
          ) : done && trip.instructionSkipped === 'implausible-hours' ? (
            <p className="mt-1 text-[11px] font-display text-signal-amber">
              {trip.hours} hours looks like minutes typed into an hours box, so nothing was added to the
              attendance record. If the trip really was {trip.hours} hours, add the time by hand under
              Compliance.
            </p>
          ) : done && trip.instructionSkipped === 'already-higher' ? (
            <p className="mt-1 text-[11px] text-ink-500">
              Not added — that day already had at least this many minutes of instruction on it.
            </p>
          ) : done && trip.instructionSkipped === 'rejected' ? (
            <p className="mt-1 text-[11px] font-display text-signal-amber">
              Those hours were refused as a day's instruction. Add the time by hand under Compliance.
            </p>
          ) : null}
        </div>
        <button type="button" onClick={() => remove(trip.id)} className="flex-none text-xs text-ink-500 underline hover:text-signal-red">{done ? 'Delete' : 'Cancel'}</button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            generate(trip.id);
            setOpenPack(true);
          }}
          className="rounded-md bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {trip.learningPack ? 'Regenerate Learning Pack' : 'Generate Learning Pack'}
        </button>
        {trip.learningPack && (
          <button type="button" onClick={() => setOpenPack((o) => !o)} className="rounded-md border border-space-600 px-3 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan">
            {openPack ? 'Hide pack' : 'View pack'}
          </button>
        )}
        {/**
          * EDIT, ON A TRIP THAT IS ALREADY DONE. (Aug 13, 2026.)
          *
          * The parent: "i dont see an edit button on the completed field trip."
          * There wasn't one. A completed card offered Regenerate Learning Pack
          * and Delete, and delete-and-recreate would have thrown away her
          * notes, the portfolio entry built from them, and the pack.
          *
          * Hours and date are the two fields that reach her Georgia record, so
          * they are the two this corrects.
          */}
        {done && (
          <button
            type="button"
            onClick={() => {
              setEditing((o) => !o);
              setEditMsg(null);
              setEditHours(trip.hours ? String(trip.hours) : '');
              setEditDate((trip.date || '').slice(0, 10));
            }}
            className="rounded-md border border-space-600 px-3 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
          >
            {editing ? 'Cancel' : 'Edit hours or date'}
          </button>
        )}
        {!done && (
          <>
            <input value={newDate} onChange={(e) => setNewDate(e.target.value)} type="date" className="rounded-md border border-space-600 bg-space-900 px-2 py-1 text-xs text-ink-100" />
            <button
              type="button"
              disabled={!newDate}
              onClick={() => {
                update(trip.id, { date: newDate });
                setNewDate('');
              }}
              className="rounded-md border border-space-600 px-2 py-1 text-xs font-display text-ink-300 transition hover:text-ink-100 disabled:opacity-40"
            >
              Reschedule
            </button>
            {/* Labelled, not just placeholdered. "hrs" in a 16px box is how
                a 160-minute trip got recorded as 160 hours. */}
            <label className="flex items-center gap-1 text-[11px] text-ink-500">
              <span>Hours</span>
              <input
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                inputMode="decimal"
                placeholder="2.5"
                title="How long the trip took, in HOURS — 2.5 for two and a half hours. This is booked as instruction time toward the 180 days."
                className="w-14 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-xs text-ink-100 placeholder:text-ink-600"
              />
            </label>
            {Number(hours) > 12 && (
              <span className="text-[11px] font-display text-signal-amber">
                That is hours, not minutes — {Number(hours)} hours is {(Number(hours) / 24).toFixed(1)} days.
              </span>
            )}
            <button type="button" onClick={() => complete(trip.id, hours)} className="rounded-md bg-signal-green px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110">
              Mark complete
            </button>
          </>
        )}
      </div>

      {done && editing && (
        <div className="mt-3 rounded-lg border border-space-700 bg-space-950 p-3">
          <p className="text-[11px] text-ink-500">
            These two are what reach your Georgia record. Changing them re-books the instruction time —
            it can correct its own figure up or down, and never overwrites minutes you typed under
            Compliance for something else that day.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1 text-[11px] text-ink-500">
              <span>Hours</span>
              <input
                value={editHours}
                onChange={(e) => setEditHours(e.target.value)}
                inputMode="decimal"
                placeholder="2.5"
                className="w-16 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-xs text-ink-100 placeholder:text-ink-600"
              />
            </label>
            <label className="flex items-center gap-1 text-[11px] text-ink-500">
              <span>Date</span>
              <input
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                type="date"
                className="rounded-md border border-space-600 bg-space-900 px-2 py-1 text-xs text-ink-100"
              />
            </label>
            <button
              type="button"
              onClick={async () => {
                const res = await editCompleted(trip.id, { hours: editHours, date: editDate });
                if (!res || !res.ok) setEditMsg(res?.error || 'That did not save.');
                else {
                  setEditMsg(
                    res.instructionMinutes
                      ? `Saved — ${res.instructionMinutes} minutes booked.`
                      : 'Saved. See the note on the card for why no time was booked.'
                  );
                  setEditing(false);
                }
              }}
              className="rounded-md bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Save
            </button>
          </div>
          {Number(editHours) > 12 && (
            <p className="mt-2 text-[11px] font-display text-signal-amber">
              That is hours, not minutes — {Number(editHours)} hours is {(Number(editHours) / 24).toFixed(1)} days.
              {' '}A 160-minute trip is about 2.7 hours.
            </p>
          )}
        </div>
      )}
      {editMsg && <p className="mt-2 text-[11px] font-display text-signal-green">{editMsg}</p>}

      {openPack && trip.learningPack && <LearningPackView pack={trip.learningPack} />}
    </div>
  );
}

function FieldTripsSection() {
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  const addFieldTrip = useAppStore((s) => s.addFieldTrip);
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [cost, setCost] = useState('');
  const [travelTimeMin, setTravel] = useState('');
  const [gradeLevel, setGradeLevel] = useState('7th');
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleSubject = (s) => setSubjects((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  const submit = (e) => {
    e.preventDefault();
    if (!destination.trim()) return;
    addFieldTrip({ destination, date, cost, travelTimeMin, gradeLevel, subjects, notes });
    setDestination('');
    setDate('');
    setCost('');
    setTravel('');
    setSubjects([]);
    setNotes('');
  };

  const upcoming = fieldTrips.filter((t) => t.status !== 'completed').sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const completed = fieldTrips.filter((t) => t.status === 'completed').sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Field Trips</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Upcoming Learning Experiences</h3>
        <p className="mt-2 text-sm text-ink-300">
          Plan a trip, then generate a Learning Pack (before / during / after activities you review and print). Marking a
          trip complete records the hours and adds it to his Portfolio automatically.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-2 rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Plan a Trip</p>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination (e.g. Delta Flight Museum)" className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600" />
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs text-ink-500">
            Date{' '}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="ml-1 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100" />
          </label>
          <input value={cost} onChange={(e) => setCost(e.target.value)} inputMode="numeric" placeholder="Cost $" className="w-24 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100 placeholder:text-ink-600" />
          <input value={travelTimeMin} onChange={(e) => setTravel(e.target.value)} inputMode="numeric" placeholder="Travel min" className="w-28 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100 placeholder:text-ink-600" />
          <input value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)} placeholder="Grade" className="w-20 rounded-md border border-space-600 bg-space-900 px-2 py-1 text-sm text-ink-100 placeholder:text-ink-600" />
        </div>
        <div>
          <p className="text-[11px] text-ink-500">Subjects</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {FIELD_TRIP_SUBJECTS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSubject(s)}
                className={'rounded-full border px-2.5 py-1 text-xs transition ' + (subjects.includes(s) ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan' : 'border-space-600 text-ink-400 hover:text-ink-100')}
              >
                {tripSubjectLabel(s)}
              </button>
            ))}
          </div>
        </div>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" rows={2} className="w-full rounded-md border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600" />
        <button type="submit" className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110">Add trip</button>
      </form>

      <div>
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Upcoming ({upcoming.length})</p>
        {upcoming.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No upcoming trips planned.</p>
        ) : (
          <div className="mt-2 space-y-3">{upcoming.map((t) => <TripCard key={t.id} trip={t} />)}</div>
        )}
      </div>

      {completed.length > 0 && (
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Completed ({completed.length})</p>
          <div className="mt-2 space-y-3">{completed.map((t) => <TripCard key={t.id} trip={t} />)}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Hands the machine back to the LearningOS front door.
 *
 * It lives in the Parent Dashboard, behind the passcode, on purpose: signing
 * out is a grown-up action. A Sign Out button on the school side is a button a
 * twelve-year-old presses by accident in the middle of a lesson, and then
 * cannot get back in without finding her.
 */
function SignOutSection({ onSignOut }) {
  if (!onSignOut) {
    return (
      <p className="text-sm text-ink-500">
        Sign out isn&apos;t available in this window.
      </p>
    );
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-300">
        Closes this Academy and returns to the LearningOS sign-in screen. Nothing is deleted and
        nothing is uploaded — every record stays on this computer exactly as it is.
      </p>
      <p className="text-sm text-ink-500">
        Use this to hand the computer to a different learner, or to lock the app when you step away
        from it.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        className="rounded-lg border border-ink-700 px-4 py-2 font-display text-sm uppercase tracking-widest text-ink-200 hover:border-signal-amber hover:text-signal-amber"
      >
        Sign out
      </button>
    </div>
  );
}

export function ParentDashboard({ academyName = null, onSignOut }) {
  const [section, setSection] = useState('mission-control-board');
  const [openGroup, setOpenGroup] = useState('board');
  const activeGroup = SECTION_GROUPS.find((g) => g.id === openGroup) || null;
  const messages = useAppStore((s) => s.messages);
  const commsUnread = messages.filter((m) => m.sender === 'student' && !m.readByParent).length;

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
      <div className="print-hide">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Parent Dashboard</p>
        <h2 className="mt-1 font-display text-2xl font-700 text-ink-100">Parent Dashboard</h2>
        <p className="mt-2 text-sm text-ink-300">
          Grouped by how often you need them — daily recordkeeping first, settings last. Nothing was removed.
        </p>
      </div>

      {/* Two levels instead of twenty-six pills in one row: pick the errand,
          then the screen. The group row is always visible so she can see where
          she is; only the active group's sections are listed. */}
      <div className="print-hide space-y-2">
        <div className="flex flex-wrap gap-1 rounded-lg bg-space-800 p-1 shadow-panel">
          {SECTION_GROUPS.map((g) => {
            const active = g.id === openGroup;
            const groupUnread = g.sections.some((s) => s.id === 'mission-comms') ? commsUnread : 0;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => {
                  setOpenGroup(g.id);
                  // Jumping to a group lands on its first screen unless the
                  // current one already belongs to it — otherwise the content
                  // below would not match the tab that is now highlighted.
                  if (GROUP_OF_SECTION[section] !== g.id) setSection(g.sections[0].id);
                }}
                className={
                  'rounded-md px-3 py-1.5 text-sm font-display font-700 transition-colors ' +
                  (active ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
                }
              >
                {g.label}
                {groupUnread > 0 && !active && (
                  <span className="ml-1.5 rounded-full bg-signal-red px-1.5 py-0.5 text-[10px] font-700 text-space-950">
                    {groupUnread}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeGroup && (
          <div className="rounded-lg border border-space-700 bg-space-900 p-2">
            <p className="px-1 pb-1.5 text-[11px] text-ink-500">{activeGroup.hint}</p>
            <div className="flex flex-wrap gap-1">
              {activeGroup.sections.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSection(s.id)}
                  className={
                    'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors ' +
                    (section === s.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
                  }
                >
                  {s.label}
                  {s.id === 'mission-comms' && commsUnread > 0 && (
                    <span className="ml-1.5 rounded-full bg-signal-red px-1.5 py-0.5 text-[10px] font-700 text-space-950">
                      {commsUnread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <NovaParentGuide section={section} />

      {section === 'mission-control-board' && (
        <MissionControlBoard
          onGoTo={(target) => {
            setSection(target);
            const group = SECTION_GROUPS.find((g) => g.sections.some((s) => s.id === target));
            if (group) setOpenGroup(group.id);
          }}
        />
      )}
      {section === 'attendance' && <AttendanceSection />}
      {section === 'coming-up' && <ComingUpSection />}
      {section === 'gradebook' && <GradebookSection />}
      {section === 'khan-academy' && <KhanAcademyGradesSection />}
      {section === 'rewards-manager' && <RewardsManagerSection />}
      {section === 'currency' && <CurrencyControlsSection />}
      {section === 'readiness' && <ReadinessManagerSection />}
      {section === 'field-trips' && <FieldTripsSection />}
      {section === 'writing-journal' && <WritingJournalReviewSection />}
      {section === 'academic-success-center' && <AcademicSuccessCenterSection />}
      {section === 'pe-fitness-nutrition' && <PEFitnessNutritionSection />}
      {section === 'mission-comms' && <MissionCommsParentSection />}
      {section === 'weekly-report' && <WeeklyReportSection />}
      {section === 'report-card' && <ReportCardSection />}
      {section === 'mission-evaluations' && <MissionEvaluationSection />}
      {section === 'analytics' && <LearningAnalyticsSection />}
      {section === 'year-plan' && <YearPlanSection />}
      {section === 'planner' && <PlannerSection />}
      {section === 'compliance' && <ComplianceSection />}
      {section === 'records' && <AdminRecordsSection />}
      {section === 'course-descriptions' && <CourseDescriptionsSection />}
      {section === 'reading-log' && <ReadingLogSection />}
      {section === 'word-study' && <WordStudyRecordSection />}
      {section === 'typing' && <TypingRecordSection />}
      {section === 'science-courses' && <ScienceCourseMapSection />}
      {section === 'portfolio' && <PortfolioSection />}
      {section === 'notes' && <NotesSection />}
      {section === 'quiz-games' && <QuizGameLinksSection />}
      {section === 'voice' && <VoiceSettingsPanel />}
      {section === 'passcode' && <ParentPasscodeSection />}
      {section === 'signout' && <SignOutSection onSignOut={onSignOut} />}
      {section === 'sync' && <SyncSection />}
      {section === 'danger' && <DangerZoneSection />}
    </div>
  );
}

const COMING_UP_DAYS = 14;

/**
 * Coming Up — one look-ahead across BOTH real sources of dated work:
 * the Planner (`assignments`) and the Academic Success Center
 * (`academicAssignments`).
 *
 * This closes the biggest miss the Part 9 completion audit found in the
 * spec's "Parent Dashboard Integration" section, which asks for Upcoming
 * Book Reports, Research Papers, Presentations, and Projects. Before
 * this, the only way to see what was coming was to page through the
 * Scheduler month by month, or open the Academic Center and check each
 * quarter by hand.
 *
 * Confirmed decision (Aug 2026): the Planner and the Academic Success
 * Center BOTH stay. They overlap on Book Report / Presentation /
 * Portfolio Entry, and that's accepted — the fix was to make both feed
 * every view that matters (this section, the student Dashboard card, and
 * all three Scheduler views) rather than to merge or delete either one.
 * A future session should NOT "clean up" that duplication; it's a
 * deliberate choice, not an oversight.
 *
 * Deliberately excludes completed work and untitled placeholder slots —
 * this answers "what needs attention," not "what exists."
 */
function ComingUpSection() {
  const assignments = useAppStore((s) => s.assignments);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  /**
   * THE PANEL THAT SHOULD HAVE TOLD HER, AND DID NOT. (Aug 28, 2026.)
   *
   * The parent: *"the field trip planner didnt notify me of a field trip due."*
   * A trip dated that very day — FAB STEM Friday, Aug 28 — sat in the Field
   * Trip Planner's own list twenty-one rows deep and appeared here, on the
   * panel whose entire job is "what needs attention," not at all.
   *
   * This section's own comment says it "answers what needs attention." A dated
   * commitment that costs money, travel time and a Georgia attendance hour is
   * the most attention-needing thing the app holds.
   */
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  /**
   * And the fourth dated thing. A quarterly mission is weighted like an exam
   * and carried no date at all — five weeks into Q1, Q1's had not been begun
   * because nothing ever said it was owed.
   */
  const missionEvaluations = useAppStore((s) => s.missionEvaluations);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const gardenLog = useAppStore((s) => s.gardenLog);

  const today = todayDateStr();
  const through = toDateStr(addDays(parseDateStr(today), COMING_UP_DAYS));

  // Plus the work that carries no assignment record: the week-numbered writing
  // journal and hands-on projects, and the garden's own calendar. Both were
  // scheduled and undated until Aug 14 2026, which made them invisible here.
  const items = [
    ...buildCalendarItems({ assignments, academicAssignments, fieldTrips, missionEvaluations }),
    ...derivedPlannerItems({ writingEntries, gardenLog })
  ];
  const upcoming = getUpcomingCalendarItems(items, today, through).filter((i) => !i.done);
  const overdue = getOverdueCalendarItems(items, today);
  // What sits just past the horizon. See getNextCalendarItemsBeyond — an empty
  // panel that does not say "the next one is in 15 days" reads as broken.
  const beyond = getNextCalendarItemsBeyond(items, through, 3);

  // Grouped by due date so the shape of the next two weeks is readable
  // at a glance — three things landing on the same Friday is exactly what
  // a parent needs to see before it happens.
  const byDate = {};
  for (const item of upcoming) {
    byDate[item.dueDate] ??= [];
    byDate[item.dueDate].push(item);
  }
  const dates = Object.keys(byDate).sort();
  const heaviest = dates.reduce((max, d) => Math.max(max, byDate[d].length), 0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Coming Up</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">The Next {COMING_UP_DAYS} Days</h3>
        <p className="mt-2 text-sm text-ink-300">
          Everything with a real due date, from both the Planner and the Academic Center, in one place.
          Completed work and unscheduled slots are left out — this is what still needs attention.
        </p>
        {heaviest > 1 && (
          <p className="mt-2 text-xs text-signal-amber">
            Heaviest day in this window has {heaviest} items due. Worth spreading out if that's a lot for one day.
          </p>
        )}
      </div>

      {overdue.length > 0 && (
        <div className="rounded-xl border border-signal-red/40 bg-signal-red/5 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-red">Past Due</p>
          <div className="mt-3 space-y-1.5">
            {overdue.map((item) => (
              <ComingUpRow key={item.key} item={item} tone="overdue" />
            ))}
          </div>
        </div>
      )}

      {dates.length === 0 ? (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-sm text-ink-300">
            Nothing due in the next {COMING_UP_DAYS} days.
          </p>
          {/**
            * ---- AND THEN WHAT IS DUE (Aug 13, 2026) ----
            *
            * The parent: "there is a things due for the week and its not showing
            * me whats due... Lamar has a rocket project due and it didnt show
            * up." The panel was right — her nearest item was Aug 28, one day
            * outside a fourteen-day window, and the bottle rocket is Sept 16.
            *
            * But "Nothing due" with nine real projects on the calendar reads as
            * a broken screen, and she was right to report it. A window that
            * cannot see past its own edge should at least say what is over it.
            */}
          {beyond.length > 0 ? (
            <>
              <p className="mt-3 text-[10px] font-display uppercase tracking-widest text-ink-600">
                Further out — nothing to do about these yet
              </p>
              <div className="mt-2 space-y-1.5">
                {beyond.map((item) => {
                  const away = daysUntil(item.dueDate);
                  return (
                    <p key={item.key} className="text-sm text-ink-400">
                      <span className="text-ink-200">{item.title}</span>
                      <span className="text-ink-600">
                        {' · '}
                        {item.typeLabel}
                        {' · '}
                        {parseDateStr(item.dueDate).toLocaleDateString(undefined, {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                        {` · ${away} days away`}
                      </span>
                    </p>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-ink-500">
              Nothing dated further out either. Add due dates in the Planner below, or schedule
              assignments on the Academic Center tab.
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <div className="space-y-4">
            {dates.map((dateStr) => (
              <div key={dateStr}>
                <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
                  {parseDateStr(dateStr).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                  {dateStr === today ? ' · Today' : ''}
                </p>
                <div className="mt-1.5 space-y-1.5">
                  {byDate[dateStr].map((item) => (
                    <ComingUpRow key={item.key} item={item} tone={dateStr === today ? 'today' : 'upcoming'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ComingUpRow({ item, tone }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
      <div className="min-w-0">
        <p className={'truncate text-sm ' + (tone === 'overdue' ? 'text-signal-red' : 'text-ink-100')}>
          {item.title}
        </p>
        <p className="text-xs text-ink-500">
          {item.typeLabel}
          {item.subject ? ` · ${SUBJECT_LABELS[item.subject] || item.subject}` : ''}
        </p>
        {/**
          * THE LINE THAT WAS MISSING. A due date on its own cannot distinguish
          * a worksheet from a four-week book report until the week it is due.
          * 'behind' is the state worth having: not late yet, and already
          * cannot be done properly in the time that is left.
          */}
        {item.startBy && item.leadStatus === 'behind' && (
          <p className="mt-0.5 text-[11px] font-display text-signal-amber">
            Should have started {formatDate(item.startBy)} — not started yet
          </p>
        )}
        {item.startBy && item.leadStatus === 'start-now' && (
          <p className="mt-0.5 text-[11px] font-display text-signal-cyan">
            Start today — this one needs the run-up
          </p>
        )}
        {item.startBy && item.leadStatus === 'not-yet' && (
          <p className="mt-0.5 text-[11px] text-ink-600">Start by {formatDate(item.startBy)}</p>
        )}
        {item.leadStatus === 'underway' && (
          <p className="mt-0.5 text-[11px] text-signal-green">Underway</p>
        )}
      </div>
      <span
        className={
          'flex-none rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
          (item.source === 'academic'
            ? 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan'
            : 'border-ink-600/40 bg-ink-900/20 text-ink-500')
        }
      >
        {item.source === 'academic' ? 'Academic Center' : 'Planner'}
      </span>
    </div>
  );
}

function AttendanceSection() {
  const getAttendanceSummary = useAppStore((s) => s.getAttendanceSummary);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  const allAttendance = useAppStore((s) => s.allAttendance);
  const attendance = useMemo(() => getAttendanceSummary(), [getAttendanceSummary, allAttendance]);

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Attendance</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Recordkeeping</h3>
      <p className="mt-2 text-sm text-ink-300">
        Georgia's homeschool requirement is 180 instructional days per year at 4.5 hours/day. This
        tracks real, verifiable activity — completed lessons, writing entries, and typing
        sessions — plus foreground time actually spent in the app, as supporting documentation.
        Treat this as a helpful record to reference, not a certified attendance log.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Days Logged</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">
            {attendance.totalDaysLogged}
            <span className="text-base font-400 text-ink-500"> / {GEORGIA_DAYS_TARGET}</span>
          </p>
          <p className="mt-1 text-xs text-ink-500">Days with at least one real recorded activity</p>
        </div>
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Today's Active Time</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-amber">
            {Math.floor(attendance.todayActiveMinutes / 60)}h {attendance.todayActiveMinutes % 60}m
          </p>
          <p className="mt-1 text-xs text-ink-500">
            Toward the {GEORGIA_DAILY_MINUTES_TARGET / 60}-hour/day target ·{' '}
            {attendance.todayActivitiesCount} activities completed today
          </p>
        </div>
      </div>

      {attendance.recentDays.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Recent Days</p>
          <div className="mt-2 space-y-1.5">
            {attendance.recentDays.map((day) => (
              <div
                key={day.date}
                className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <span className="text-ink-300">{formatDate(day.date)}</span>
                {/**
                  * Credited minutes first — that is what the compliance packet
                  * counts. App time in brackets only when it differs, because
                  * when the two disagree the useful fact is which is bigger.
                  */}
                <span className="text-ink-500">
                  {Math.floor(day.creditedMinutes / 60)}h {day.creditedMinutes % 60}m
                  {day.creditedMinutes !== day.activeMinutes && (
                    <span className="text-ink-600">
                      {' '}({Math.floor(day.activeMinutes / 60)}h {day.activeMinutes % 60}m in the app)
                    </span>
                  )}
                  {' · '}
                  {day.lessonsCompleted + day.writingEntries + day.typingSessions} activities
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GradebookSection() {
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  const getGradebookData = useAppStore((s) => s.getGradebookData);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  // Khan units are rows in this gradebook as of Aug 10 2026, so this has to
  // watch them as well or a grade she just entered will not appear until the
  // app is reloaded.
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  // getAllSubjectsForRecordkeeping reads only module constants (no store state), so no slice subscription is needed
  const subjects = useMemo(() => getAllSubjectsForRecordkeeping(), [getAllSubjectsForRecordkeeping]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const rows = useMemo(
    () => getGradebookData(selectedSubject),
    [getGradebookData, lessonProgress, khanAcademyAssignments, selectedSubject]
  );
  const attemptedRows = rows.filter((r) => r.attempted);
  const notStartedCount = rows.length - attemptedRows.length;
  const khanAwaiting = rows.filter((r) => r.kind === 'khan' && !r.attempted).length;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Gradebook</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Lesson-by-Lesson Record</h3>
      <p className="mt-2 text-sm text-ink-300">
        Every piece of graded work in the selected subject — Mission Control lessons and Khan Academy
        units together, with the score behind each one.
      </p>

      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className="mt-4 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
      >
        {subjects.map((subj) => (
          <option key={subj} value={subj}>
            {SUBJECT_LABELS[subj] || subj}
          </option>
        ))}
      </select>

      {attemptedRows.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">
          Nothing graded yet in this subject.
          {khanAwaiting > 0 &&
            ` ${khanAwaiting} Khan Academy unit${khanAwaiting === 1 ? '' : 's'} are waiting for a score — enter them under Khan Academy Grades.`}
        </p>
      ) : (
        <div className="mt-4 space-y-1.5">
          {attemptedRows.map((row) => (
            <div
              key={row.lessonId}
              className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2 pr-2">
                {/* WHICH KIND OF EVIDENCE THIS IS. A reviewer looking at a
                    transcript should not have to guess whether a row is an
                    app lesson or a Khan unit test — they are graded
                    differently and mean different things. */}
                <span
                  className={
                    'flex-none rounded px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide ' +
                    (row.kind === 'khan'
                      ? 'bg-signal-cyan/15 text-signal-cyan'
                      : 'bg-space-700 text-ink-500')
                  }
                >
                  {row.kind === 'khan' ? (row.isCourseChallenge ? 'Challenge' : 'Khan') : 'Lesson'}
                </span>
                <span className="min-w-0 truncate text-ink-300">{row.title}</span>
              </span>
              <div className="flex flex-none items-center gap-3">
                {row.kind === 'khan' ? (
                  <>
                    {row.quarter && <span className="hidden text-xs text-ink-600 sm:inline">{row.quarter}</span>}
                    {/* The fraction she typed, kept beside the percentage it
                        became — it is what can be checked against Khan itself. */}
                    <span className="text-xs text-ink-500">
                      {row.gradeRaw
                        ? row.gradeRaw
                        : row.bestAccuracy != null
                          ? '—'
                          : 'not scored'}
                    </span>
                    <span className="text-xs text-ink-500">
                      {row.bestAccuracy != null ? `${Math.round(row.bestAccuracy * 100)}%` : '—'}
                    </span>
                    <span className={'w-7 text-center font-display text-sm font-700 ' + (row.letterGrade ? gradeColor(row.letterGrade) : 'text-ink-700')}>
                      {row.letterGrade || '—'}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-ink-500">
                      {row.attempts} {row.attempts === 1 ? 'attempt' : 'attempts'}
                    </span>
                    <span className="text-xs text-ink-500">
                      Best: {row.bestAccuracy != null ? `${Math.round(row.bestAccuracy * 100)}%` : '—'}
                    </span>
                    <span
                      className={
                        'rounded-full border px-2 py-0.5 text-xs font-display ' +
                        (row.mastered
                          ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                          : 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber')
                      }
                    >
                      {row.mastered ? 'Mastered' : 'In Progress'}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {notStartedCount > 0 && (
        <p className="mt-3 text-xs text-ink-500">
          {notStartedCount} more {notStartedCount === 1 ? 'item' : 'items'} in this subject not started
          yet
          {khanAwaiting > 0 &&
            ` — including ${khanAwaiting} Khan unit${khanAwaiting === 1 ? '' : 's'} with no score entered`}
          .
        </p>
      )}
    </div>
  );
}

/**
 * One Khan Academy unit in the parent's grading list.
 *
 * REWRITTEN Aug 7, 2026. The parent: "I will like to enter in the percentage
 * of the Unit and Course Challenge... I will like both the percentage and
 * letter grade to be shown side by side. Also, is there an easier way to enter
 * Khan Academy grades. There is a list and I will have to scroll to find the
 * correct lesson to grade."
 *
 * What was here before: a "Set grade" button that revealed seven letter
 * buttons. Three clicks per unit, and the letter was her own mental conversion
 * of Khan's mastery wording — the same performance could earn a B in October
 * and a C in March.
 *
 * What replaced it: one always-visible number box. Type the percentage Khan
 * shows, press Tab, done. The letter appears beside it as she types, before
 * she commits, so she can see 89 land on B+ and decide whether that is right.
 * Tab moves to the next unit's box, so a whole quarter is a typing run rather
 * than a click-reveal-click-click cycle.
 */
function KhanGradeRow({ row, onGraded }) {
  const setPercent = useAppStore((s) => s.setKhanAcademyAssignmentPercent);
  const markNotDone = useAppStore((s) => s.markKhanAcademyAssignmentNotDone);
  const [confirmUndo, setConfirmUndo] = useState(false);
  const stored = row.gradePercent ?? null;
  // Draft state, validation and the live letter now live in the shared
  // PercentGradeInput — the board renders the same control, and two copies
  // would drift.

  // Legacy rows graded before percentages existed keep their letter and have
  // no number. Showing "—%" would imply a score she never entered.
  const legacyLetterOnly = stored === null && row.grade;

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {row.isCourseChallenge && (
              <span className="flex-none rounded bg-signal-amber/15 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-wide text-signal-amber">
                Course Challenge
              </span>
            )}
            <span className="min-w-0 truncate text-ink-200">{row.skillTitle}</span>
          </div>
          {/**
            * MARKED FINISHED BUT NEVER SCORED — the shape of a wrong tick.
            *
            * Every unit he really finished on Khan has a grade, because she
            * types it in off Khan's own screen. A completed row with NO grade
            * is the signature of the "Unit done" button having marked the
            * wrong row, and it is invisible everywhere else: the grades screen
            * shows nothing amiss precisely because there is no grade to show.
            * It still pushes his Mission Control row past work he has not done.
            */}
          {row.completed && !row.grade && (
            <p className="mt-1 text-[11px] font-display text-signal-amber">
              Marked finished, never scored — check this one against Khan
            </p>
          )}
          {/**
            * THE CONFIRM NAMES THE UNIT IT IS ABOUT TO UNDO. (Aug 12, 2026.)
            *
            * Found while testing this button on her live records: the grades
            * screen shows every graded unit at once, so there are eight or more
            * "Not done" buttons on screen, all with identical labels, and the
            * armed state said only "Clear grade too?" — a question with no
            * subject. Arm the wrong row and nothing on the screen tells you.
            * Decimal Place Value was un-finished that way, and its B- (82%,
            * 9/11, scored Aug 10) had to be restored from a snapshot.
            *
            * Same principle the finish button used and this one was missing:
            * a confirm that asks nothing specific catches nothing specific.
            */}
          {confirmUndo && (
            <p className="mt-1 text-[11px] font-display text-signal-amber">
              Putting <span className="font-700">{row.skillTitle}</span> back on his list
              {row.gradePercent != null
                ? ` and clearing ${row.gradePercent}%`
                : row.grade
                  ? ` and clearing the ${row.grade}`
                  : ''}
              . Tap again to confirm.
            </p>
          )}
          <p className="mt-0.5 text-xs text-ink-600">
            {row.gradeLevel}
            {row.batchLabel ? ` · ${row.batchLabel}` : ''}
            {row.khanAcademyUrl && (
              <>
                {' · '}
                <a
                  href={row.khanAcademyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-signal-cyan underline hover:brightness-110"
                >
                  open on Khan ↗
                </a>
              </>
            )}
          </p>
        </div>

        <div className="flex flex-none items-center gap-2">
          {/**
            * The only way to put a unit back. There was none before, and the
            * import cannot do it by design — it takes local.completed ||
            * row.completed so a stale file can never un-finish real work.
            * Asks twice, because it clears the grade with it.
            */}
          {row.completed && (
            <button
              type="button"
              onClick={() => {
                if (confirmUndo) { markNotDone(row.id); setConfirmUndo(false); }
                else setConfirmUndo(true);
              }}
              onBlur={() => setConfirmUndo(false)}
              title="He has not actually finished this unit on Khan Academy — put it back on his list."
              className={
                'flex-none rounded-md border px-2 py-1 text-[11px] font-display transition ' +
                (confirmUndo
                  ? 'border-signal-amber bg-signal-amber/15 text-signal-amber'
                  : 'border-space-600 text-ink-500 hover:border-signal-amber/50 hover:text-signal-amber')
              }
            >
              {confirmUndo ? 'Clear grade too?' : 'Not done'}
            </button>
          )}
          {legacyLetterOnly ? (
            <span className={'font-display text-lg font-700 ' + gradeColor(row.grade)} title="Graded before percentages were recorded">
              {row.grade}
            </span>
          ) : null}

          <PercentGradeInput
            id={`khan-pct-${row.id}`}
            label={`${row.skillTitle} score`}
            percent={stored}
            raw={row.gradeRaw ?? null}
            onCommit={(value, raw) => {
              setPercent(row.id, value, raw);
              if (onGraded) onGraded(row.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Every Khan subject the parent actually grades.
 *
 * 'writing' retired into 'reading' when the subject merged (Aug 6, 2026).
 * socialStudies and technology were ADDED Aug 7: both had real Khan rows —
 * Social Studies has all nine World History units plus the Course Challenge —
 * and neither appeared here, so thirty units were ungradeable while the
 * heading above them read "Every Skill, All Four Subjects."
 */
const KHAN_ACADEMY_SUBJECTS = ['math', 'reading', 'science', 'socialStudies', 'technology'];

/** Technology rows split: some units are Khan unit tests, most are graded off
 *  a built project instead. Only the unit-test ones belong in a percentage
 *  entry list — there is no Khan percentage for a Tinkercad build. */
function isKhanGradeable(row) {
  return row.gradedBy !== 'project';
}

const GRADE_FILTERS = [
  { id: 'ungraded', label: 'Needs grading' },
  { id: 'graded', label: 'Graded' },
  { id: 'all', label: 'All' }
];

/**
 * Khan Academy Grades — rebuilt Aug 7, 2026 around one complaint: "There is a
 * list and I will have to scroll to find the correct lesson to grade."
 *
 * She was describing 151 rows rendered in one flat column, sorted by the date
 * the row was created — an order that corresponds to nothing she or Lamar
 * experiences. Finding "Decimal Place Value" meant scrolling past four
 * subjects and five quarters of work, most of it months away.
 *
 * Four changes, in order of how much each one helps:
 *
 *   1. DEFAULT TO WHAT IS ACTUALLY GRADEABLE. Current quarter, not yet graded.
 *      That is the list she opens this screen to work through; everything else
 *      is one click away and nothing is hidden.
 *   2. SEARCH. Typing "decimal" beats any amount of scrolling, and it searches
 *      across every subject and quarter regardless of the filters.
 *   3. SORT BY SEQUENCE, not creation date — the order he works them.
 *   4. COUNTS ON EVERY FILTER, so she can see there are eleven ELA units left
 *      without switching to ELA to find out.
 */
function KhanAcademyGradesSection() {
  // Select the raw reactive array, not a store getter (a stable function
  // reference would not re-render when the underlying rows change).
  const allKhanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);

  const currentQuarter = getCurrentQuarter().batchLabel;
  const [query, setQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('ungraded');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [quarterFilter, setQuarterFilter] = useState(currentQuarter);

  /**
   * Rows graded during THIS sitting, held in the list even though the default
   * "Needs grading" filter would now exclude them.
   *
   * Found by actually grading three units in the running app and watching two
   * land: saving a grade removed the row from the filtered list, every row
   * below it jumped up a slot, and the Tab key — which had been the whole
   * point of the redesign — landed in whichever input had slid into that
   * position. One of the three scores went into the void.
   *
   * A list that rearranges itself while you type in it is unusable no matter
   * how good the entry box is. So the visible set is frozen against her own
   * saves and only re-evaluates when SHE changes something: a filter, the
   * quarter, the subject, or the search text. The counts below stay truthful
   * (they always describe the real data), and a line explains the difference.
   */
  const [justGraded, setJustGraded] = useState(() => new Set());
  const pin = (id) => setJustGraded((prev) => new Set(prev).add(id));

  const gradeable = useMemo(
    () =>
      allKhanAcademyAssignments
        .filter((a) => KHAN_ACADEMY_SUBJECTS.includes(a.subject) && isKhanGradeable(a))
        .sort(
          (a, b) =>
            (a.sequenceInQuarter ?? 999) - (b.sequenceInQuarter ?? 999) ||
            String(a.skillTitle).localeCompare(String(b.skillTitle))
        ),
    [allKhanAcademyAssignments]
  );

  const quarters = useMemo(() => {
    const seen = Array.from(new Set(gradeable.map((a) => a.batchLabel).filter(Boolean)));
    return seen.sort((a, b) => quarterRank(a) - quarterRank(b));
  }, [gradeable]);

  const searching = query.trim().length > 0;
  const needle = query.trim().toLowerCase();

  // Search deliberately ignores the subject and quarter filters. If she knows
  // the unit's name she should not also have to know which quarter it lives in
  // — that is the thing she was scrolling to find out.
  // Any change she makes to the view is a fresh start; her own saves are not.
  useEffect(() => {
    setJustGraded(new Set());
  }, [gradeFilter, subjectFilter, quarterFilter, needle]);

  const visible = useMemo(() => {
    if (searching) return gradeable.filter((a) => String(a.skillTitle).toLowerCase().includes(needle));
    return gradeable.filter((a) => {
      if (subjectFilter !== 'all' && a.subject !== subjectFilter) return false;
      if (quarterFilter !== 'all' && a.batchLabel !== quarterFilter) return false;
      if (gradeFilter === 'ungraded' && a.grade && !justGraded.has(a.id)) return false;
      if (gradeFilter === 'graded' && !a.grade) return false;
      return true;
    });
  }, [gradeable, searching, needle, subjectFilter, quarterFilter, gradeFilter, justGraded]);

  const countIn = (pred) =>
    gradeable.filter(
      (a) =>
        pred(a) &&
        (quarterFilter === 'all' || a.batchLabel === quarterFilter) &&
        (gradeFilter === 'all' || (gradeFilter === 'graded' ? Boolean(a.grade) : !a.grade))
    ).length;

  const gradedTotal = gradeable.filter((a) => a.grade).length;

  /**
   * Completed, ungraded, and NOT visible under the quarter currently selected.
   * Counted against the whole record rather than the filtered view, because a
   * count computed inside the filter can only ever report zero.
   */
  const hiddenUngraded = gradeable.filter(
    (a) => a.completed && !a.grade && quarterFilter !== 'all' && a.batchLabel !== quarterFilter
  ).length;

  const bySubject = useMemo(() => {
    const groups = new Map();
    for (const row of visible) {
      const list = groups.get(row.subject);
      if (list) list.push(row);
      else groups.set(row.subject, [row]);
    }
    return Array.from(groups.entries()).sort(
      (a, b) => KHAN_ACADEMY_SUBJECTS.indexOf(a[0]) - KHAN_ACADEMY_SUBJECTS.indexOf(b[0])
    );
  }, [visible]);

  const chip = (active) =>
    'rounded-full border px-2.5 py-1 text-xs font-display transition ' +
    (active
      ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
      : 'border-space-600 text-ink-400 hover:text-ink-100');

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Khan Academy Grades</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Enter the percentage — the letter is worked out for you</h3>
      <p className="mt-2 text-sm text-ink-300">
        Type the percentage Khan Academy shows for the{' '}
        <span className="text-ink-100">Unit Test</span> or{' '}
        <span className="text-signal-amber">Course Challenge</span>, then press Tab. The letter grade appears
        beside it and both are saved together. Quizzes are his practice and aren&rsquo;t scored here.
      </p>
      <p className="mt-2 rounded-lg border border-space-700 bg-space-950 px-3 py-2 text-[11px] leading-relaxed text-ink-500">
        <span className="font-display uppercase tracking-widest text-ink-400">Scale</span>{' '}
        {GRADE_SCALE_SUMMARY}
      </p>

      {gradeable.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">No Khan Academy units yet.</p>
      ) : (
        <>
          <div className="mt-4 space-y-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search all ${gradeable.length} units by name…`}
              className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 outline-none transition focus:border-signal-cyan"
            />

            {searching ? (
              <p className="text-xs text-ink-500">
                Searching every subject and quarter · {visible.length}{' '}
                {visible.length === 1 ? 'match' : 'matches'}
                {'  '}
                <button type="button" onClick={() => setQuery('')} className="underline hover:text-ink-100">
                  clear
                </button>
              </p>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-1.5">
                  {GRADE_FILTERS.map((f) => (
                    <button key={f.id} type="button" onClick={() => setGradeFilter(f.id)} className={chip(gradeFilter === f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
                {/**
                  * UNGRADED WORK HIDING BEHIND THE QUARTER CHIP.
                  *
                  * This filter defaults to the current quarter, which is right
                  * for browsing and wrong for the one question this screen
                  * exists to answer. On Aug 18 2026 a reading unit he finished
                  * on Aug 6, tagged Q2, sat completed and ungraded where
                  * neither this screen nor the Mission Control queue would show
                  * it. She found it by noticing her records disagreed.
                  *
                  * A filter may hide work. It may not hide the FACT of work.
                  */}
                {hiddenUngraded > 0 && (
                  <button
                    type="button"
                    onClick={() => { setQuarterFilter('all'); setGradeFilter('ungraded'); }}
                    className="w-full rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-3 py-2 text-left text-xs text-signal-amber transition hover:bg-signal-amber/20"
                  >
                    {hiddenUngraded} finished unit{hiddenUngraded === 1 ? '' : 's'} in another quarter
                    {hiddenUngraded === 1 ? ' is' : ' are'} still ungraded — show {hiddenUngraded === 1 ? 'it' : 'them'}
                  </button>
                )}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button type="button" onClick={() => setQuarterFilter('all')} className={chip(quarterFilter === 'all')}>
                    All quarters
                  </button>
                  {quarters.map((q) => (
                    <button key={q} type="button" onClick={() => setQuarterFilter(q)} className={chip(quarterFilter === q)}>
                      {q.replace(' 2026-2027', '')}
                      {q === currentQuarter ? ' · now' : ''}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button type="button" onClick={() => setSubjectFilter('all')} className={chip(subjectFilter === 'all')}>
                    All subjects ({countIn(() => true)})
                  </button>
                  {KHAN_ACADEMY_SUBJECTS.map((s) => {
                    const n = countIn((a) => a.subject === s);
                    if (n === 0) return null;
                    return (
                      <button key={s} type="button" onClick={() => setSubjectFilter(s)} className={chip(subjectFilter === s)}>
                        {SUBJECT_LABELS[s] || s} ({n})
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <p className="mt-3 text-xs text-ink-500">
            {gradedTotal} of {gradeable.length} units graded for the whole year · showing {visible.length}
            {justGraded.size > 0 && gradeFilter === 'ungraded' && (
              <span className="text-signal-green">
                {' · '}
                {justGraded.size} just graded, held in place so the list doesn&rsquo;t move while you type
              </span>
            )}
          </p>

          {visible.length === 0 ? (
            <p className="mt-4 rounded-lg border border-space-700 bg-space-900 px-3 py-4 text-center text-sm text-ink-400">
              {gradeFilter === 'ungraded'
                ? 'Nothing left to grade here. Try another quarter, or switch to “All”.'
                : 'Nothing matches these filters.'}
            </p>
          ) : (
            <div className="mt-4 space-y-5">
              {bySubject.map(([subject, rows]) => (
                <div key={subject}>
                  <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                    {SUBJECT_LABELS[subject] || subject}{' '}
                    <span className="text-ink-600">· {rows.length}</span>
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {rows.map((row) => (
                      <KhanGradeRow key={row.id} row={row} onGraded={pin} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// WRITING_GRADE_OPTIONS is gone. It was the seven letters this screen offered
// before the rubric replaced them — and it disagreed with the Mission Control
// Board's own picker, which offers thirteen. Two lists of "the grades you can
// give" is how a B+ becomes available on one screen and not the other.
const WRITING_GRADE_COLOR = {
  A: 'text-signal-green',
  'A-': 'text-signal-green',
  'B+': 'text-signal-cyan',
  B: 'text-signal-cyan',
  C: 'text-amber-400',
  D: 'text-orange-400',
  F: 'text-signal-red'
};

/**
 * THE FOUR THINGS TO LOOK FOR, AND A LINE HE CAN READ. (Aug 13, 2026.)
 *
 * The parent: "He needs assistance building ELA... to begin to create
 * structural sentences and paragraphs."
 *
 * A letter tells him how he did. It does not tell him what to fix, and what to
 * fix is the entire mechanism by which the next piece gets better. These are
 * the same four criteria the Academic Success Center already uses for book
 * reports and research papers, so a daily drill and a research paper are
 * judged on the same axes all year.
 *
 * `lookFor` is written for HER, in the two seconds she has per criterion. The
 * drill's own `checkFor` line is written for HIM. They are deliberately the
 * same idea in two voices.
 */
const WRITING_RUBRIC = [
  { id: 'structure', label: 'Structure', lookFor: 'Did he build the thing the drill asked for — the topic sentence, the compound sentence, the varied openers?' },
  { id: 'clarity', label: 'Clarity', lookFor: 'Can you follow it on one read, without going back?' },
  { id: 'detail', label: 'Detail', lookFor: 'Specific — a number, a name, something you could picture. Not "it was good".' },
  { id: 'mechanics', label: 'Mechanics', lookFor: 'Capitals, end punctuation, spelling. Was it read back at all before turning in?' }
];
const RUBRIC_SCORES = [
  { score: 1, label: 'Not yet' },
  { score: 2, label: 'Getting there' },
  { score: 3, label: 'Solid' },
  { score: 4, label: 'Excellent' }
];

function WritingEntryRow({ entry, promptTitle }) {
  const gradeWritingEntryRubric = useAppStore((s) => s.gradeWritingEntryRubric);
  const [expanded, setExpanded] = useState(false);
  const [picking, setPicking] = useState(false);
  const [scores, setScores] = useState(entry.rubric || {});
  const [note, setNote] = useState(entry.gradeNote || '');
  const [saveMsg, setSaveMsg] = useState(null);
  const allScored = WRITING_RUBRIC.every((c) => scores[c.id]);

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display font-600 text-ink-100">{promptTitle}</p>
          <p className="mt-0.5 text-xs text-ink-500">
            {formatDateTime(entry.completedAt)} · {entry.wordCount} words
          </p>
          {/*
            ---- WHETHER HE READ THE CHECK BEFORE SAVING. (Aug 25, 2026.) ----

            The parent: **"He received D minuses because he rushed, didn't use
            punctuation marks, capitalization, or complete sentences."**

            The writing screen now shows him what is wrong before he saves and
            lets him save regardless. This is the other end of that: what he
            saw and chose to leave. It is a fact about the submission, never a
            grade — the Mechanics row of the rubric is still hers to score,
            and this is the evidence she was previously having to reconstruct
            from the prose.

            Silent when null. Entries written before this shipped have no
            answer, and printing "0 left" for them would be inventing one.
          */}
          {Number.isFinite(entry.checkIssues) && (
            <p
              className={
                'mt-0.5 text-xs ' + (entry.checkIssues > 0 ? 'text-signal-amber' : 'text-ink-600')
              }
            >
              {entry.checkIssues > 0
                ? `Saved with ${entry.checkIssues} check ${entry.checkIssues === 1 ? 'problem' : 'problems'} left unfixed`
                : 'Passed the writing check'}
            </p>
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs text-signal-cyan underline hover:brightness-110"
          >
            {expanded ? 'Hide entry' : 'Read entry'}
          </button>
        </div>
        {entry.grade ? (
          <span className={'shrink-0 font-display text-lg font-700 ' + (WRITING_GRADE_COLOR[entry.grade] || 'text-ink-100')}>
            {entry.grade}
          </span>
        ) : (
          !picking && (
            <button
              type="button"
              onClick={() => setPicking(true)}
              className="shrink-0 rounded-lg bg-signal-cyan px-3 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Grade Entry
            </button>
          )
        )}
      </div>

      {expanded && (
        <p className="mt-2 whitespace-pre-wrap rounded-md border border-space-700 bg-space-950 p-3 text-xs text-ink-300">
          {entry.text}
        </p>
      )}

      {/* What she already recorded, so a graded row still teaches on re-read. */}
      {entry.rubric && (
        <p className="mt-1 text-[11px] text-ink-500">
          {WRITING_RUBRIC.map((c) => `${c.label} ${entry.rubric[c.id]}`).join(' · ')}
          {entry.gradePercent != null ? ` · ${entry.gradePercent}%` : ''}
        </p>
      )}
      {entry.gradeNote && (
        <p className="mt-1 rounded-md border border-signal-cyan/25 bg-signal-cyan/5 px-2 py-1 text-[11px] text-ink-300">
          <span className="font-display text-signal-cyan">You told him: </span>
          {entry.gradeNote}
        </p>
      )}

      {picking && (
        <div className="mt-3 space-y-2 rounded-lg border border-space-700 bg-space-950 p-3">
          <p className="text-[11px] text-ink-500">
            Score the four, then tell him the one thing to fix. The letter is worked out for you, and it
            counts toward his English Language Arts grade.
          </p>
          {WRITING_RUBRIC.map((c) => (
            <div key={c.id} className="flex flex-wrap items-center gap-2">
              <span className="w-20 flex-none font-display text-xs text-ink-200" title={c.lookFor}>
                {c.label}
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px] text-ink-600">{c.lookFor}</span>
              <span className="flex flex-none gap-1">
                {RUBRIC_SCORES.map((r) => (
                  <button
                    key={r.score}
                    type="button"
                    title={r.label}
                    onClick={() => setScores((cur) => ({ ...cur, [c.id]: r.score }))}
                    className={
                      'h-7 w-7 rounded-md border text-xs font-display transition ' +
                      (scores[c.id] === r.score
                        ? 'border-signal-cyan bg-signal-cyan/20 text-signal-cyan'
                        : 'border-space-600 text-ink-500 hover:border-signal-cyan/50')
                    }
                  >
                    {r.score}
                  </button>
                ))}
              </span>
            </div>
          ))}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="One thing to fix next time — he reads this."
            className="w-full resize-none rounded-md border border-space-600 bg-space-900 px-2 py-1.5 text-xs text-ink-100 placeholder:text-ink-600 focus:border-signal-cyan focus:outline-none"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={!allScored}
              onClick={async () => {
                const res = await gradeWritingEntryRubric(entry.id, scores, note);
                if (res?.ok) { setSaveMsg(`Saved — ${res.grade} (${res.gradePercent}%)`); setPicking(false); }
                else setSaveMsg(res?.error || 'That did not save.');
              }}
              className={
                'rounded-md px-3 py-1 text-xs font-display font-700 transition ' +
                (allScored ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'border border-space-700 text-ink-600')
              }
            >
              Save grade
            </button>
            <span className="text-[11px] text-ink-600">1 Not yet · 2 Getting there · 3 Solid · 4 Excellent</span>
          </div>
        </div>
      )}
      {saveMsg && <p className="mt-1 text-[11px] font-display text-signal-green">{saveMsg}</p>}

      {/* The one-letter picker that used to live here is gone. It is still in
          the store (gradeWritingEntry) and still on the Mission Control Board,
          where one tap is the point — but on the screen built for READING his
          writing, a letter with no reason attached was the whole problem. */}
    </div>
  );
}

/**
 * Writing Journal Review — lets the parent actually read each writing
 * entry and assign an A-F grade, closing the gap the master plan flagged
 * as "not decided yet": the Writing Journal/Prompt system was live and
 * saving entries, but had no grading and no way for the parent to see
 * what was written beyond a weekly count. Confirmed with the parent:
 * runs ALONGSIDE Khan Academy Language Arts content, not a replacement —
 * both count together.
 */
function WritingJournalReviewSection() {
  const writingEntries = useAppStore((s) => s.writingEntries);

  const promptTitleById = Object.fromEntries(writingPrompts.map((p) => [p.id, p.title]));
  const sorted = [...writingEntries].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const gradedCount = sorted.filter((e) => e.grade).length;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Writing Journal Review</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Read &amp; Grade Every Entry</h3>
      <p className="mt-2 text-sm text-ink-300">
        Runs alongside Khan Academy Language Arts, not instead of it — both count together. Nothing can score real
        composition automatically, so you read it and score four things: structure, clarity, detail, mechanics. The
        letter is worked out from those, and a note you leave is what he reads. These grades now count toward his
        English Language Arts average — until Aug 13, 2026 the letter assigned here reached the Portfolio and stopped.
      </p>

      {sorted.length === 0 ? (
        <p className="mt-4 text-sm text-ink-500">No writing journal entries yet.</p>
      ) : (
        <>
          <p className="mt-3 text-xs text-ink-500">
            {gradedCount} of {sorted.length} entries graded.
          </p>
          <div className="mt-4 space-y-2">
            {sorted.map((entry) => (
              <WritingEntryRow key={entry.id} entry={entry} promptTitle={promptTitleById[entry.promptId] || entry.promptId} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Academic Success Center — parent-facing grades and recordkeeping.
 *
 * This section used to be a read-only PREVIEW of the placeholder slots,
 * built before the Center existed. The Center is now real (Part 9 v1 —
 * Books, Assignments, Portfolio) and lives on its own "Academic Center"
 * tab under Plan, where both setup and student use happen. What stays
 * here is the part that belongs in the Parent Dashboard specifically:
 * the graded record of completed academic work.
 *
 * Deliberately NOT folded into the Report Card. That view averages
 * auto-scored lesson accuracy into a percentage; book reports and
 * research papers get a manual letter grade with no percentage behind
 * it. Blending the two would produce a number that looks precise and
 * isn't — the same reason Khan Academy grades get their own section
 * rather than being averaged in.
 */
/**
 * ==========================================================================
 * CHANGE THE BOOK ON A READING ASSIGNMENT. (Aug 28, 2026.)
 * ==========================================================================
 *
 * The parent: *"There is a book report and the book is Hatchet. Can I change
 * that book to another book that is in his book list?"*
 *
 * Before today: no. Assignments were seeded slots and nothing in the app could
 * retitle one. Nineteen books are scheduled across the year, so the honest
 * alternative was her asking me to edit code nineteen times.
 *
 * Two things this deliberately does:
 *
 *  1. **Shows the plan before it writes.** `planBookSwap` returns every title
 *     it would change, so she reads the actual before-and-after — including the
 *     book report she may not have realised moves with it — and then decides.
 *     No control in this app should surprise her with its second effect.
 *
 *  2. **Refuses rather than half-applies.** If he has started either slot, the
 *     whole swap is declined with a sentence saying why. Rewriting the title of
 *     work he has already done is how a record stops being true.
 */
function BookPicker() {
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const changeAssignmentBook = useAppStore((s) => s.changeAssignmentBook);

  const [openId, setOpenId] = useState(null);
  const [choice, setChoice] = useState('');
  const [result, setResult] = useState(null);

  // Only slots that actually name a book. A Portfolio Entry or a Research Paper
  // has no book to swap, and offering the control there would be noise.
  const readingSlots = academicAssignments
    .filter((a) => a.title && a.slotId && a.type === 'Reading Assignment')
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));

  const library = academicBooks.filter((b) => b.title);
  const chosenBook = library.find((b) => String(b.id) === String(choice)) || null;

  const preview =
    openId != null && chosenBook
      ? planBookSwap({
          assignmentId: openId,
          newBook: chosenBook,
          assignments: academicAssignments,
          library
        })
      : null;

  async function apply() {
    if (!chosenBook || openId == null) return;
    const plan = await changeAssignmentBook(openId, chosenBook);
    setResult(plan);
    if (plan.ok) { setOpenId(null); setChoice(''); }
  }

  if (readingSlots.length === 0) return null;

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Reading Books</p>
      <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Change the book on an assignment</h3>
      <p className="mt-2 text-sm text-ink-300">
        Pick a different book from his library. The book report or presentation that goes with it changes
        too — you'll see exactly what moves before anything is saved. Anything he has already started is
        left alone.
      </p>

      {result && !result.ok && (
        <p className="mt-3 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-3 py-2 text-sm text-signal-amber">
          {SWAP_REFUSAL_TEXT[result.reason] || 'That change could not be made.'}
        </p>
      )}
      {result && result.ok && (
        <p className="mt-3 rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-2 text-sm text-signal-cyan">
          Changed {result.changes.length === 1 ? '1 assignment' : `${result.changes.length} assignments`}.
        </p>
      )}

      <ul className="mt-4 space-y-2">
        {readingSlots.map((a) => {
          const started = !isUnstarted(a);
          const isOpen = openId === a.id;
          return (
            <li key={a.id} className="rounded-lg border border-space-700 bg-space-900 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-600 text-ink-100">{a.title}</p>
                  <p className="text-xs text-ink-500">
                    {a.quarter || '—'} · due {a.dueDate || 'no date'}
                    {started ? ' · started' : ''}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={started}
                  onClick={() => {
                    setResult(null);
                    setChoice('');
                    setOpenId(isOpen ? null : a.id);
                  }}
                  className={
                    started
                      ? 'rounded-lg border border-space-700 px-3 py-1.5 text-xs text-ink-500'
                      : 'rounded-lg border border-signal-cyan/50 px-3 py-1.5 text-xs text-signal-cyan hover:bg-signal-cyan/10'
                  }
                >
                  {started ? 'In progress' : isOpen ? 'Cancel' : 'Change book'}
                </button>
              </div>

              {isOpen && (
                <div className="mt-3 border-t border-space-700 pt-3">
                  <label className="text-xs font-display uppercase tracking-widest text-ink-500">
                    Replace with
                  </label>
                  <select
                    value={choice}
                    onChange={(e) => { setChoice(e.target.value); setResult(null); }}
                    className={FIELD_CLASS + ' mt-1'}
                  >
                    <option value="">Choose a book from his library…</option>
                    {library.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title}{b.author ? ' — ' + b.author : ''}
                      </option>
                    ))}
                  </select>

                  {preview && preview.ok && (
                    <div className="mt-3 rounded-lg border border-space-700 bg-space-800 p-3">
                      <p className="text-xs font-display uppercase tracking-widest text-ink-500">
                        What changes
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {preview.changes.map((c) => (
                          <li key={c.id} className="text-sm">
                            <span className="text-xs text-ink-500">{c.type}</span>
                            <br />
                            <span className="text-ink-500 line-through">{c.from}</span>
                            <br />
                            <span className="text-ink-100">{c.to}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {preview && !preview.ok && (
                    <p className="mt-3 text-sm text-signal-amber">
                      {SWAP_REFUSAL_TEXT[preview.reason] || 'That change cannot be made.'}
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={!preview || !preview.ok}
                    onClick={apply}
                    className={
                      preview && preview.ok
                        ? 'mt-3 rounded-lg bg-signal-cyan px-4 py-2 text-sm font-600 text-space-900'
                        : 'mt-3 rounded-lg border border-space-700 px-4 py-2 text-sm text-ink-500'
                    }
                  >
                    Save this change
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function AcademicSuccessCenterSection() {
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);

  const scheduled = academicAssignments.filter((a) => a.title);
  const completed = scheduled.filter((a) => a.status === 'completed');
  const graded = completed.filter((a) => a.grade);
  const quarterGroups = groupByQuarter(
    completed.map((a) => ({ ...a, batchLabel: a.quarter }))
  );

  const realBooks = academicBooks.filter((b) => b.title);
  const finishedBooks = realBooks.filter((b) => b.status === 'completed').length;

  return (
    <div className="space-y-4">
      <BookPicker />
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Academic Success Center</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Completed Academic Work</h3>
        <p className="mt-2 text-sm text-ink-300">
          Book reports, research papers, presentations, and portfolio entries Lamar has finished. Setting up
          books and assignments, and grading finished work, both happen on the <strong>Academic Center</strong>{' '}
          tab (under Plan) — this is the record view.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Assignments Scheduled</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">{scheduled.length}</p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Completed / Graded</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-amber">
              {completed.length}
              <span className="text-base font-400 text-ink-500"> / {graded.length}</span>
            </p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Books Finished</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">
              {finishedBooks}
              <span className="text-base font-400 text-ink-500"> / {realBooks.length}</span>
            </p>
          </div>
        </div>
      </div>

      {completed.length === 0 ? (
        <p className="text-sm text-ink-500">
          Nothing completed yet. Schedule assignments on the Academic Center tab and they'll show up here as
          Lamar finishes them.
        </p>
      ) : (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">By Quarter</p>
          <div className="mt-3 space-y-4">
            {quarterGroups.map(([quarterLabel, rows]) => (
              <div key={quarterLabel}>
                <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">{quarterLabel}</p>
                <div className="mt-1.5 space-y-1.5">
                  {rows.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-ink-100">{row.title}</p>
                        <p className="text-xs text-ink-500">
                          {SUBJECT_LABELS[row.subject] || row.subject} · {row.type}
                        </p>
                      </div>
                      <span
                        className={
                          'shrink-0 rounded-full border px-2 py-0.5 text-xs font-display ' +
                          (row.grade
                            ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                            : 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber')
                        }
                      >
                        {row.grade ? `Grade: ${row.grade}` : 'Not graded yet'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NotesSection() {
  const parentNotes = useAppStore((s) => s.parentNotes);
  const addParentNote = useAppStore((s) => s.addParentNote);
  const removeParentNote = useAppStore((s) => s.removeParentNote);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  // (this getter reads only module constants, no store state — memoized for referential stability)
  const subjects = useMemo(() => getAllSubjectsForRecordkeeping(), [getAllSubjectsForRecordkeeping]);

  const [text, setText] = useState('');
  const [subject, setSubject] = useState('');

  const handleSave = async () => {
    if (!text.trim()) return;
    await addParentNote(text, subject || null);
    setText('');
    setSubject('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Notes &amp; Observations</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Add a Note</h3>
        <p className="mt-2 text-sm text-ink-300">
          A running, dated record of observations — progress, behavior, anything worth remembering
          later. These are never cleared by Reset All Progress.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="What did you notice today?"
          className="mt-3 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          >
            <option value="">General (no subject)</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {SUBJECT_LABELS[subj] || subj}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSave}
            disabled={!text.trim()}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save Note
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {parentNotes.length === 0 && <p className="text-sm text-ink-500">No notes yet.</p>}
        {parentNotes.map((note) => (
          <div key={note.id} className="rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-500">{formatDateTime(note.createdAt)}</span>
                {note.subject && (
                  <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-xs text-signal-cyan">
                    {SUBJECT_LABELS[note.subject] || note.subject}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeParentNote(note.id)}
                className="text-xs text-ink-500 hover:text-signal-red"
              >
                Delete
              </button>
            </div>
            <p className="mt-2 text-sm text-ink-100">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyReportSection() {
  const getWeeklyReport = useAppStore((s) => s.getWeeklyReport);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const allAttendance = useAppStore((s) => s.allAttendance);
  const report = useMemo(
    () => getWeeklyReport(),
    [getWeeklyReport, lessonProgress, writingEntries, allAttendance]
  );
  const totalLessonsMastered = report.lessonsMasteredThisWeek.length;

  return (
    <div className="print-content rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="print-hide mb-3 flex items-center justify-between">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Weekly Report</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg border border-space-600 px-3 py-1.5 text-sm font-display text-ink-300 transition hover:text-ink-100"
        >
          Print Weekly Report
        </button>
      </div>
      <h3 className="font-display text-lg font-700 text-ink-100">Week of {report.periodLabel}</h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Lessons Mastered</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-green">{totalLessonsMastered}</p>
        </div>
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Days Active</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">{report.daysActiveThisWeek} / 7</p>
        </div>
        <div className="rounded-lg border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Active Time</p>
          <p className="mt-1 font-display text-3xl font-700 text-signal-amber">
            {Math.floor(report.totalActiveMinutes / 60)}h {report.totalActiveMinutes % 60}m
          </p>
        </div>
      </div>

      {totalLessonsMastered > 0 && (
        <div className="mt-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Lessons Mastered This Week</p>
          <ul className="mt-2 space-y-1">
            {report.lessonsMasteredThisWeek.map((lesson) => (
              <li key={lesson.id} className="text-sm text-ink-300">
                {lesson.title} <span className="text-ink-500">({SUBJECT_LABELS[lesson.subject] || lesson.subject})</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-ink-500">
        {report.writingEntriesThisWeek.length} writing {report.writingEntriesThisWeek.length === 1 ? 'entry' : 'entries'} ·{' '}
        {report.totalTypingSessions} typing {report.totalTypingSessions === 1 ? 'session' : 'sessions'} this week
      </p>
    </div>
  );
}

const GRADE_COLORS = {
  A: 'text-signal-green border-signal-green/40 bg-signal-green/10',
  B: 'text-signal-cyan border-signal-cyan/40 bg-signal-cyan/10',
  C: 'text-signal-amber border-signal-amber/40 bg-signal-amber/10',
  D: 'text-signal-amber border-signal-amber/40 bg-signal-amber/10',
  F: 'text-signal-red border-signal-red/40 bg-signal-red/10'
};

function ReportCardSection() {
  const getReportCardData = useAppStore((s) => s.getReportCardData);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  // Khan grades are part of the subject grade as of Aug 10 2026, so this memo
  // has to watch them too. Without this line she would enter a percentage,
  // watch the letter appear beside the box, and the report card two sections
  // down would not move until she reloaded the app -- which reads exactly like
  // "the grades from Khan Academy aren't being saved anywhere."
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const data = useMemo(
    () => getReportCardData(),
    [getReportCardData, lessonProgress, khanAcademyAssignments]
  );
  /**
   * Engineer Readiness rides ALONGSIDE the grades, never inside them.
   *
   * It comes from its own getter for exactly that reason — see
   * `getReadinessRecord` in the store. `data` above is the array every average
   * is computed from, and readiness is deliberately not in it.
   */
  const getReadinessRecord = useAppStore((s) => s.getReadinessRecord);
  const readinessAwards = useAppStore((s) => s.readinessAwards);
  const readiness = useMemo(
    () => getReadinessRecord(),
    [getReadinessRecord, readinessAwards]
  );

  const handleDownloadTranscript = () => {
    const lines = [
      /*
        ---- A TRANSCRIPT MUST CARRY THE RIGHT SCHOOL'S NAME ----

        This was the literal string 'MISSION CONTROL HOMESCHOOL ACADEMY', so
        every transcript this platform produced was headed with one school's
        name no matter whose record it was. That is worse than the same mistake
        anywhere else on screen: a transcript is kept for years, handed to a
        college, and cannot be corrected after it is filed.

        The Academy's own display name, uppercased for a document header, and
        LearningOS only as the fallback when an Academy has not been named yet.
      */
      `${(academyName || 'LearningOS').toUpperCase()} — TRANSCRIPT`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      ...data.map((row) => {
        // A participation subject has no lessons and no grade by design.
        // Printing "0/0 lessons mastered" against it would read as a failure
        // on a transcript rather than as what it is — a subject recorded by
        // what he did. See PARTICIPATION_SUBJECTS in config/subjects.js.
        if (row.isParticipation) {
          const r = row.participation || {};
          // Same fix as the compliance packet: PE's field names were hardcoded
          // here too, so Gardening and Guitar transcribed as all zeros.
          return `${SUBJECT_LABELS[row.subject] || row.subject} — ${participationSummary(row.subject, r)}`;
        }
        const gradeText = row.letterGrade ? `Grade: ${row.letterGrade} (${Math.round(row.averageAccuracy * 100)}% avg accuracy)` : 'Grade: Not yet graded';
        // A transcript reviewer has to be able to see WHAT the grade was
        // computed from. "B, 84%" with no denominator is not a record.
        /**
         * ALL SIX SOURCES, NOT TWO. (Aug 23, 2026.)
         *
         * This line was built from lessons and Khan units alone, while the
         * grade beside it was computed from six things. A subject graded
         * entirely by book reports and journal work — English Language Arts is
         * the realistic case — transcribed as:
         *
         *   English Language Arts — Grade: B (85% avg accuracy) —
         *   Curriculum: No graded work recorded
         *
         * A self-contradicting sentence, in the one document that leaves this
         * house. Every source that moved the grade now names itself.
         */
        const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
        const evidence = [
          /**
           * MISSIONS LEAD THE EVIDENCE LINE. (Aug 26, 2026, O-6(a).)
           *
           * Not for emphasis — because of weight. A quarterly mission now
           * counts for as much as the quarter it belongs to, which makes it
           * the single heaviest item in this list. Burying the heaviest
           * assessment at the end, under six lighter ones, is how a reader
           * mis-weighs a transcript.
           *
           * It appeared nowhere at all until today, while the compliance
           * packet was calling these evaluations "the assessment evidence"
           * that stands in for standardized testing.
           */
          row.missionEvidence,
          row.attemptedCount > 0
            ? `${row.mastered}/${row.totalLessons} lessons mastered (${row.attemptedCount} attempted)`
            : null,
          row.khanGradedCount > 0
            ? `${row.khanGradedCount} Khan Academy unit${row.khanGradedCount === 1 ? '' : 's'} graded, ${Math.round(row.khanAverage * 100)}% average`
            : null,
          row.assignmentGradedCount > 0
            ? `${plural(row.assignmentGradedCount, 'graded assignment')}, ${Math.round(row.assignmentAverage * 100)}% average`
            : null,
          (row.wordStudyQuarters || []).length > 0
            ? `${plural(row.wordStudyQuarters.length, 'quarter')} of weekly word tests`
            : null,
          row.writingGradedCount > 0
            ? `${row.writingGradedCount} graded writing ${row.writingGradedCount === 1 ? 'entry' : 'entries'}`
            : null,
          (row.reflectionQuarters || []).length > 0
            ? `${plural(row.reflectionGradedCount, 'written reflection')} across ${plural(row.reflectionQuarters.length, 'quarter')}`
            : null
        ].filter(Boolean).join(' · ') || 'No graded work recorded';
        return `${SUBJECT_LABELS[row.subject] || row.subject} — ${gradeText} — Curriculum: ${evidence}`;
      }),
      /**
       * ---- AND THE SKILLS NO SUBJECT LINE CAN CARRY. (Aug 28, 2026.) ----
       *
       * Printed AFTER every graded subject and under its own heading, so a
       * reader can never mistake a Bronze for a grade. `readiness.js` makes the
       * case: a homeschool transcript struggles to evidence soft skills, and
       * dated levels against a written standard are exactly that evidence.
       *
       * An unawarded skill prints as not yet awarded. It does not print a dash,
       * a zero, or a Bronze.
       */
      '',
      'ENGINEER READINESS (not graded, not part of any subject average)',
      ...(readiness.awardedCount === 0
        ? [`None awarded yet. ${readiness.totalCount} skills are tracked.`]
        : readiness.skills
            .filter((skill) => skill.level)
            .map((skill) => {
              const ladder = skill.history.length
                ? skill.history
                    .map((step) => `${step.level} ${new Date(step.at).toLocaleDateString()}`)
                    .join(' → ')
                : skill.level;
              return `${skill.name} — ${ladder}${skill.note ? ` — ${skill.note}` : ''}`;
            }))
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${todayStrLocal()}.txt`;
    // Firefox ignores a click on an anchor that is not in the document, so the
    // button does nothing and says nothing. `exportProgressData` has always
    // appended first; the two LEGAL-record downloads — this and the records
    // packet — were the two that did not. (Aug 23, 2026.)
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="print-content rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="print-hide mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Report Card</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDownloadTranscript}
            className="rounded-lg border border-space-600 px-3 py-1.5 text-sm font-display text-ink-300 transition hover:text-ink-100"
          >
            Download Transcript
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-space-600 px-3 py-1.5 text-sm font-display text-ink-300 transition hover:text-ink-100"
          >
            Print Report Card
          </button>
        </div>
      </div>
      <h3 className="font-display text-lg font-700 text-ink-100">Grades by Subject</h3>
      <p className="mt-1 text-xs text-ink-500">
        {/**
          * ---- THIS SENTENCE WAS TWO SOURCES AND FOUR MONTHS OUT OF DATE ----
          *
          * It said "Mission Control lessons and graded Khan Academy units,
          * equally weighted" long after the grade was built from seven sources
          * with three different weights. A stale explanation under a number is
          * worse than no explanation: she checked her son's grade against a
          * rule the app had stopped following.
          */}
        As of {new Date().toLocaleDateString()} · Grade is the average of every assessment actually
        taken — lessons, Khan units, assignments, word tests, writing, reflections and the quarterly
        mission — not how much of the curriculum exists yet. A quarterly exam and a quarterly mission
        each count for as much as the quarter they cover; everything else counts once.
      </p>

      <div className="mt-4 space-y-3">
        {data.map((row) => (
          <div key={row.subject} className="rounded-lg border border-space-700 bg-space-900 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display font-700 text-ink-100">{SUBJECT_LABELS[row.subject] || row.subject}</span>
              {row.isParticipation ? (
                <span className="rounded-lg border border-signal-green/40 bg-signal-green/10 px-3 py-1 font-display text-sm font-700 text-signal-green">
                  Participation
                </span>
              ) : row.letterGrade ? (
                <div className="flex items-center gap-2">
                  <span className={'rounded-lg border px-3 py-1 font-display text-lg font-700 ' + GRADE_COLORS[row.letterGrade]}>
                    {row.letterGrade}
                  </span>
                  <span className="text-sm text-ink-300">{Math.round(row.averageAccuracy * 100)}% avg</span>
                </div>
              ) : (
                <span className="rounded-lg border border-space-600 px-3 py-1 text-sm text-ink-500">Not yet graded</span>
              )}
            </div>

            {row.isParticipation ? (
              <p className="mt-2 text-xs text-ink-500">
                Recorded by participation — this subject has no graded assessments.
                {/* Third site with PE's fields hardcoded. This one printed
                    "0 meals logged" under Electric Guitar. */}
                {participationPhrases(row.subject, row.participation).length > 0
                  ? ' ' + participationPhrases(row.subject, row.participation).join(' · ')
                  : ' Nothing logged yet.'}
              </p>
            ) : (
              <p className="mt-2 text-xs text-ink-500">
                Curriculum coverage: {row.mastered}/{row.totalLessons} lessons mastered
                {row.totalLessons > 0 && ` (${Math.round((row.attemptedCount / row.totalLessons) * 100)}% of available lessons attempted)`}
                {row.khanGradedCount > 0 && (
                  <span className="mt-0.5 block text-signal-cyan">
                    + {row.khanGradedCount} Khan Academy unit{row.khanGradedCount === 1 ? '' : 's'} graded,{' '}
                    {Math.round(row.khanAverage * 100)}% average
                    {row.lessonAverage !== null && ` · lessons ${Math.round(row.lessonAverage * 100)}%`}
                  </span>
                )}
              </p>
            )}

            {/*
              Strand breakdown — one grade on the transcript, two numbers
              where teaching decisions get made. An 80% that is 95/65 and
              an 80% that is 80/80 are identical above this line and mean
              completely different things about Tuesday morning.
            */}
            {row.strands.length > 0 && (
              <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3">
                <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
                  Inside this grade
                </p>
                <div className="mt-1.5 space-y-1">
                  {row.strands.map((strand) => (
                    <div key={strand.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-ink-300">
                        {strand.label}
                        <span className="ml-2 text-xs text-ink-600">
                          {strand.mastered}/{strand.totalLessons} mastered
                        </span>
                      </span>
                      {strand.letterGrade ? (
                        <span
                          className={
                            'font-display font-700 ' +
                            (strand.averageAccuracy >= 0.8
                              ? 'text-signal-green'
                              : strand.averageAccuracy >= 0.7
                                ? 'text-signal-amber'
                                : 'text-signal-red')
                          }
                        >
                          {strand.letterGrade} · {Math.round(strand.averageAccuracy * 100)}%
                        </span>
                      ) : (
                        <span className="text-xs text-ink-600">Nothing graded yet</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-600">
                  One grade goes on the transcript. These two are what tell you where to spend the time.
                </p>
              </div>
            )}

            {row.needsAttention.length > 0 && (
              <div className="mt-3 rounded-lg border border-signal-red/30 bg-signal-red/5 p-3">
                <p className="text-xs font-display uppercase tracking-widest text-signal-red">Needs Attention</p>
                <ul className="mt-1 space-y-1">
                  {row.needsAttention.map((l) => (
                    <li key={l.lessonId} className="flex items-center justify-between text-sm">
                      <span className="text-ink-300">{l.title}</span>
                      <span className="text-signal-red">{Math.round(l.bestAccuracy * 100)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/*
        ENGINEER READINESS — BESIDE THE GRADES, NEVER AMONG THEM.

        The parent, Aug 28 2026: "how to use the engineer readiness in the
        parent dashboard. that isn't connected to anything." It was not: eleven
        skills with a written rubric and a dated history, read by her awarding
        screen and a counter on his rewards page, and by no record.

        Rendered AFTER every graded subject, under its own heading, in its own
        colour, from its own getter. A reader must not be able to mistake a
        Bronze for a grade — and the store makes that structural rather than
        visual: `readiness` never enters `data`, which is the array averages
        come from.
      */}
      <div className="mt-6 border-t border-space-700 pt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
            Engineer Readiness
          </p>
          <p className="text-xs text-ink-500">
            {readiness.awardedCount} of {readiness.totalCount} awarded · not graded
          </p>
        </div>
        <p className="mt-1 text-xs text-ink-500">
          Practical skills you award by watching him work, against a written standard. Bronze is with a
          prompt, Silver is unprompted and explained, Gold is open-ended and taught to someone else.
          Deliberately kept out of every subject average.
        </p>

        {readiness.awardedCount === 0 ? (
          <p className="mt-3 text-sm text-ink-500">
            None awarded yet. Award them from Planning → Engineer Readiness as you see him demonstrate
            each one; the date is what makes it evidence.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {readiness.skills
              .filter((skill) => skill.level)
              .map((skill) => (
                <li key={skill.id} className="rounded-lg border border-space-700 bg-space-900 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-ink-100">
                      <span className="mr-2">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className={'font-display text-sm font-700 ' + (LEVEL_STYLE[skill.level]?.text || 'text-ink-300')}>
                      {skill.level}
                    </span>
                  </div>
                  {skill.history.length > 0 && (
                    <p className="mt-1 text-xs text-ink-500">
                      {skill.history
                        .map((step) => step.level + ' ' + new Date(step.at).toLocaleDateString())
                        .join(' → ')}
                    </p>
                  )}
                  {skill.criteria && <p className="mt-1 text-xs text-ink-600">{skill.criteria}</p>}
                  {skill.note && <p className="mt-1 text-xs text-ink-400">Evidence: {skill.note}</p>}
                </li>
              ))}
          </ul>
        )}
        {readiness.awardedCount > 0 && readiness.awardedCount < readiness.totalCount && (
          <p className="mt-2 text-xs text-ink-600">
            Not yet awarded:{' '}
            {readiness.skills.filter((s) => !s.level).map((s) => s.name).join(', ')}.
          </p>
        )}
      </div>
    </div>
  );
}

// Custom Assignment Creator (Part 5) — V1 scope, confirmed simple:
// Assignment Title, Assignment Type, Subject, Due Date, Estimated Time,
// Instructions/Notes, Reference Link (optional), Upload File (optional).
// The Assignment Type dropdown changes which fields are relevant rather
// than showing every possible field always — "Field Trip" is a real
// scope exception, not fully implemented: the dedicated Field Trip
// Planner (destination/cost/travel-time fields, auto-generated Learning
// Pack) is a separate, larger queued item that hasn't been built yet, so
// selecting it here just surfaces an honest note instead of pretending
// those fields exist.
const ASSIGNMENT_TYPES = [
  'Assignment',
  'Field Trip',
  'Project',
  'Book Report',
  'Presentation',
  'Lab',
  'Practice Session',
  'Gardening Activity',
  'Volunteer Service',
  'Competition/Event',
  'Portfolio Entry',
  'Other'
];

const ESTIMATED_TIME_OPTIONS = ['15 min', '30 min', '45 min', '1 hour', 'Custom'];

// Reference Material type drives which secondary input appears: link-type
// references get a URL field, file-type references get a real file
// picker (stored as a Blob in IndexedDB — Dexie supports this natively),
// and "Book" gets a plain citation field since a physical book is neither
// a link nor a file.
const REFERENCE_TYPES = ['None', 'Khan Academy Lesson', 'YouTube Video', 'Website', 'PDF', 'Book', 'Local File'];
// REFERENCE_LINK_TYPES now lives in lib/driveLinks.js — see the note there.
const REFERENCE_FILE_TYPES = ['PDF', 'Local File'];

const FIELD_CLASS =
  'w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none';

function downloadAssignmentFile(a) {
  if (!a.uploadFile) return;
  const url = URL.createObjectURL(a.uploadFile);
  const link = document.createElement('a');
  link.href = url;
  link.download = a.uploadFileName || 'attachment';
  link.click();
  URL.revokeObjectURL(url);
}

function PlannerSection() {
  const getSubjects = useAppStore((s) => s.getSubjects);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  const getTodaysMission = useAppStore((s) => s.getTodaysMission);
  const assignments = useAppStore((s) => s.assignments);
  const addAssignment = useAppStore((s) => s.addAssignment);
  const toggleAssignmentComplete = useAppStore((s) => s.toggleAssignmentComplete);
  const removeAssignment = useAppStore((s) => s.removeAssignment);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  // getSubjects / getAllSubjectsForRecordkeeping read only module constants (no store state) — memoized for referential stability
  const subjects = useMemo(() => getSubjects(), [getSubjects]); // active only — upcoming-lesson preview below
  const assignmentSubjects = useMemo(() => getAllSubjectsForRecordkeeping(), [getAllSubjectsForRecordkeeping]); // custom assignments can reference any subject
  // getTodaysMission reads lessonProgress — compute the per-subject upcoming lessons here, not inside the JSX loop
  const upcomingBySubject = useMemo(
    () => subjects.map((subj) => ({ subj, next: getTodaysMission(subj) })),
    [getTodaysMission, lessonProgress, subjects]
  );

  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState('');
  const [assignmentType, setAssignmentType] = useState('Assignment');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedTimeCustom, setEstimatedTimeCustom] = useState('');
  const [referenceType, setReferenceType] = useState('None');
  const [referenceDetails, setReferenceDetails] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  const showLinkField = REFERENCE_LINK_TYPES.includes(referenceType);
  const showBookField = referenceType === 'Book';
  const showFileField = REFERENCE_FILE_TYPES.includes(referenceType);

  const handleReferenceTypeChange = (value) => {
    setReferenceType(value);
    setReferenceDetails('');
    setUploadFile(null);
  };

  const resetForm = () => {
    setTitle('');
    setInstructions('');
    setDueDate('');
    setSubject('');
    setAssignmentType('Assignment');
    setEstimatedTime('');
    setEstimatedTimeCustom('');
    setReferenceType('None');
    setReferenceDetails('');
    setUploadFile(null);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    const resolvedTime = estimatedTime === 'Custom' ? estimatedTimeCustom.trim() : estimatedTime;
    await addAssignment({
      title,
      instructions,
      dueDate,
      subject: subject || null,
      assignmentType,
      estimatedTime: resolvedTime || null,
      referenceType,
      referenceDetails: referenceType === 'None' ? '' : referenceDetails,
      uploadFile: showFileField ? uploadFile : null,
      uploadFileName: showFileField && uploadFile ? uploadFile.name : null
    });
    resetForm();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Upcoming Lessons</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">What's Next, by Subject</h3>
        <div className="mt-3 space-y-1.5">
          {upcomingBySubject.map(({ subj, next }) => (
            <div key={subj} className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
              <span className="text-ink-500">{SUBJECT_LABELS[subj] || subj}</span>
              <span className="text-ink-300">{next ? next.title : 'All lessons mastered'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Custom Assignments</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Add an Assignment</h3>
        <p className="mt-2 text-sm text-ink-300">
          For anything outside the built-in curriculum — a field trip write-up, a project, extra
          practice you want to assign directly.
        </p>
        <p className="mt-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-xs text-ink-500">
          <span className="font-display uppercase tracking-widest text-ink-600">Planner or Academic Center? </span>
          Both exist on purpose and both show up on the calendar, the Coming Up view, and Lamar's dashboard —
          so nothing gets lost either way. Rule of thumb: use the <strong>Academic Center</strong> for book
          reports, research papers, presentations, and portfolio work tied to a subject and quarter (it tracks
          reading status and grades those). Use the <strong>Planner</strong> here for one-off work — field trips,
          labs, volunteering, competitions, extra practice.
        </p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Assignment title"
          className={FIELD_CLASS + ' mt-3'}
        />

        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <select value={assignmentType} onChange={(e) => setAssignmentType(e.target.value)} className={FIELD_CLASS}>
            {ASSIGNMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={FIELD_CLASS}>
            <option value="">No subject</option>
            {assignmentSubjects.map((subj) => (
              <option key={subj} value={subj}>
                {SUBJECT_LABELS[subj] || subj}
              </option>
            ))}
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={FIELD_CLASS} />
          <select value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} className={FIELD_CLASS}>
            <option value="">No time estimate</option>
            {ESTIMATED_TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {estimatedTime === 'Custom' && (
          <input
            type="text"
            value={estimatedTimeCustom}
            onChange={(e) => setEstimatedTimeCustom(e.target.value)}
            placeholder="Custom time (e.g. 2 hours, 20 min)"
            className={FIELD_CLASS + ' mt-2'}
          />
        )}

        {assignmentType === 'Field Trip' && (
          <div className="mt-2 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-3 text-xs text-signal-amber">
            The full Field Trip Planner (destination, cost, travel time, and an auto-generated
            Learning Pack) hasn't been built yet — see PROJECT_PLAN.md Part 5. For now, capture
            trip details in Instructions / Notes below.
          </div>
        )}

        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={2}
          placeholder="Instructions / Notes (optional)"
          className={FIELD_CLASS + ' mt-2 resize-none'}
        />

        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <select value={referenceType} onChange={(e) => handleReferenceTypeChange(e.target.value)} className={FIELD_CLASS}>
            {REFERENCE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'None' ? 'Reference material: none' : t}
              </option>
            ))}
          </select>
          {showLinkField && (
            <input
              type="url"
              value={referenceDetails}
              onChange={(e) => setReferenceDetails(e.target.value)}
              placeholder="https://..."
              className={FIELD_CLASS}
            />
          )}
          {showBookField && (
            <input
              type="text"
              value={referenceDetails}
              onChange={(e) => setReferenceDetails(e.target.value)}
              placeholder="Book title / author"
              className={FIELD_CLASS}
            />
          )}
          {showFileField && (
            <input
              type="file"
              onChange={(e) => setUploadFile(e.target.files[0] || null)}
              className="w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-xs text-ink-300 file:mr-3 file:rounded-md file:border-0 file:bg-signal-cyan file:px-3 file:py-1.5 file:text-xs file:font-display file:font-700 file:text-space-950"
            />
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!title.trim()}
          className="mt-3 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Assignment
        </button>
      </div>

      <div className="space-y-2">
        {assignments.length === 0 && <p className="text-sm text-ink-500">No custom assignments yet.</p>}
        {assignments.map((a) => {
          const notes = a.instructions ?? a.description ?? ''; // `description` = pre-Assignment-Creator rows
          const referenceIsLink = a.referenceType && REFERENCE_LINK_TYPES.includes(a.referenceType);
          return (
            <div key={a.id} className="flex items-start justify-between gap-3 rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={a.completed}
                  onChange={() => toggleAssignmentComplete(a.id)}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={'font-display font-700 ' + (a.completed ? 'text-ink-500 line-through' : 'text-ink-100')}>{a.title}</p>
                    {a.assignmentType && a.assignmentType !== 'Assignment' && (
                      <span className="rounded border border-space-600 px-1.5 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                        {a.assignmentType}
                      </span>
                    )}
                  </div>
                  {notes && <p className="text-sm text-ink-300">{notes}</p>}
                  <p className="mt-1 text-xs text-ink-500">
                    {a.dueDate ? `Due ${a.dueDate}` : 'No due date'}
                    {a.subject && ` · ${SUBJECT_LABELS[a.subject] || a.subject}`}
                    {a.estimatedTime && ` · ~${a.estimatedTime}`}
                  </p>
                  {a.referenceType && a.referenceType !== 'None' && (a.referenceDetails || a.uploadFile) && (
                    <p className="mt-1 text-xs">
                      {referenceIsLink ? (
                        <a href={a.referenceDetails} target="_blank" rel="noreferrer" className="text-signal-cyan underline">
                          {a.referenceType}: {a.referenceDetails}
                        </a>
                      ) : a.uploadFile ? (
                        <button type="button" onClick={() => downloadAssignmentFile(a)} className="text-signal-cyan underline">
                          {a.referenceType}: {a.uploadFileName || 'download file'}
                        </button>
                      ) : (
                        <span className="text-ink-500">
                          {a.referenceType}: {a.referenceDetails}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <button type="button" onClick={() => removeAssignment(a.id)} className="flex-none text-xs text-ink-500 hover:text-signal-red">
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CATEGORY_LABELS_LOCAL = {
  upperBody: 'Upper Body',
  lowerBody: 'Lower Body',
  cardioStretch: 'Cardio + Stretching',
  core: 'Core',
  fullBody: 'Full Body',
  outdoorSports: 'Outdoor / Sports',
  recovery: 'Recovery / Mobility'
};

/**
 * Parent-facing view of the PE & Nutrition trackers (PROJECT_PLAN.md
 * Part 4). Framed entirely around health and consistency — workout
 * completion, real daily habits (water/protein/sleep/activity/mood),
 * and growth check-ins over time — never weight-loss or appearance
 * language, matching the hard framing requirement this whole subject
 * was built under.
 */
/**
 * Mission Comms (Part 5) — parent side of the two-way thread. Same conversation
 * the student sees; the parent sends as 'parent'. Opening the section marks the
 * student's messages read (clears the tab badge).
 */
function MissionCommsParentSection() {
  const messages = useAppStore((s) => s.messages);
  const sendMessage = useAppStore((s) => s.sendMessage);
  const markMessagesRead = useAppStore((s) => s.markMessagesRead);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    markMessagesRead('parent');
  }, [markMessagesRead, messages.length]);

  const send = async () => {
    if (!draft.trim()) return;
    await sendMessage({ sender: 'parent', body: draft });
    setDraft('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Mission Comms</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Messages with Lamar</h3>
        <p className="mt-2 text-sm text-ink-300">
          A private two-way channel — leave encouragement, reminders, or answer his questions. He sees these on
          his dashboard with an unread badge, and can reply here.
        </p>

        <div className="mt-4 max-h-[24rem] space-y-3 overflow-y-auto rounded-lg border border-space-700 bg-space-900 p-4">
          {messages.length === 0 ? (
            <p className="text-sm text-ink-500">No messages yet. Send the first one below.</p>
          ) : (
            messages.map((m) => {
              const mine = m.sender === 'parent';
              return (
                <div key={m.id} className={'flex ' + (mine ? 'justify-end' : 'justify-start')}>
                  <div
                    className={
                      'max-w-[80%] rounded-2xl px-4 py-2 ' +
                      (mine
                        ? 'rounded-br-sm border border-signal-cyan/30 bg-signal-cyan/15'
                        : 'rounded-bl-sm border border-space-700 bg-space-800')
                    }
                  >
                    <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
                      {mine ? 'You' : 'Lamar'} · {formatDateTime(m.createdAt)}
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm text-ink-100">{m.body}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-3 flex items-end gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            placeholder="Write a message to Lamar…"
            className="flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            className="flex-none rounded-lg bg-signal-cyan px-4 py-2.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110 disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function PEFitnessNutritionSection() {
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peDailyLog = useAppStore((s) => s.peDailyLog);
  const peBodyMetrics = useAppStore((s) => s.peBodyMetrics);
  const peWeeklyGoals = useAppStore((s) => s.peWeeklyGoals);
  const peMeals = useAppStore((s) => s.peMeals);

  const last14Workouts = [...peWorkoutLog].slice(-14).reverse();
  const dailyLogDates = Object.keys(peDailyLog).sort((a, b) => new Date(b) - new Date(a)).slice(0, 14);
  const recentMetrics = [...peBodyMetrics].slice(-8).reverse();
  const goalWeeks = Object.entries(peWeeklyGoals).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
  const workoutsThisWeek = peWorkoutLog.filter((w) => new Date(w.date) >= sevenDaysAgo).length;

  // Meal log (Part 5): most recent meals across days, plus a 7-day count.
  const recentMeals = [...peMeals]
    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
    .slice(0, 20);
  const mealsThisWeek = peMeals.filter((m) => new Date(`${m.date}T00:00:00`) >= sevenDaysAgo).length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">PE &amp; Nutrition</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Fitness &amp; Nutrition Progress</h3>
        <p className="mt-2 text-sm text-ink-300">
          Consistency and real habits over time — workouts completed, daily water/protein/sleep/activity/
          mood logs, and periodic growth check-ins. This view is intentionally built around health,
          strength, and consistency, never weight loss or appearance.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Workouts (Last 7 Days)</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-cyan">{workoutsThisWeek} / 7</p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Total Workouts Logged</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-green">{peWorkoutLog.length}</p>
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-4">
            <p className="text-xs font-display uppercase tracking-widest text-ink-500">Daily Logs Recorded</p>
            <p className="mt-1 font-display text-3xl font-700 text-signal-amber">{Object.keys(peDailyLog).length}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Recent Workouts</p>
        {last14Workouts.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No workouts logged yet.</p>
        ) : (
          <div className="mt-2 space-y-1.5">
            {last14Workouts.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <span className="text-ink-300">{w.date}</span>
                <span className="text-ink-500">
                  {CATEGORY_LABELS_LOCAL[w.category] || w.category} · {w.exerciseIds?.length ?? 0} exercises
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Daily Habit Log</p>
        {dailyLogDates.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No daily logs recorded yet.</p>
        ) : (
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-display uppercase tracking-widest text-ink-500">
                  <th className="pb-2 pr-3">Date</th>
                  <th className="pb-2 pr-3">Water (oz)</th>
                  <th className="pb-2 pr-3">Protein (g)</th>
                  <th className="pb-2 pr-3">Sleep (hrs)</th>
                  <th className="pb-2 pr-3">Activity (min)</th>
                  <th className="pb-2">Mood</th>
                </tr>
              </thead>
              <tbody>
                {dailyLogDates.map((date) => {
                  const row = peDailyLog[date];
                  return (
                    <tr key={date} className="border-t border-space-700 text-ink-300">
                      <td className="py-2 pr-3">{date}</td>
                      <td className="py-2 pr-3">{row.waterOz ?? '—'}</td>
                      <td className="py-2 pr-3">{row.proteinG ?? '—'}</td>
                      <td className="py-2 pr-3">{row.sleepHours ?? '—'}</td>
                      <td className="py-2 pr-3">{row.activityMinutes ?? '—'}</td>
                      <td className="py-2">{row.mood ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-3 text-xs text-ink-500">
          General population reference points shown to the student in-app (not personalized targets):
          roughly up to 24 fl oz of plain water/day and about 34g of protein/day for ages 9-13, per the
          USDA and AAP. Any individualized target belongs with Lamar's pediatrician or a registered
          dietitian.
        </p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">Meal Log</p>
          <span className="text-xs text-ink-500">
            {mealsThisWeek} logged in last 7 days · {peMeals.length} in the last 120 days
          </span>
        </div>
        {recentMeals.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No meals logged yet.</p>
        ) : (
          <div className="mt-2 space-y-1.5">
            {recentMeals.map((m) => (
              <div
                key={m.id}
                className="flex items-start justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <span className="text-ink-500">{m.date}</span>
                  <span className="text-ink-300">
                    {' '}· <span className="font-display font-600 text-signal-amber">{m.mealType}</span> — {m.description}
                  </span>
                </div>
                {m.proteinG ? <span className="flex-none text-ink-500">{m.proteinG}g</span> : null}
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-ink-500">
          What the student logged eating, for awareness and records — framed around fuel and energy, not
          restriction. Protein grams are optional and self-estimated.
        </p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Growth Check-Ins</p>
        {recentMetrics.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No growth check-ins logged yet.</p>
        ) : (
          <div className="mt-2 space-y-1.5">
            {recentMetrics.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm"
              >
                <span className="text-ink-300">{m.date}</span>
                <span className="text-ink-500">
                  {m.heightIn ? `${m.heightIn} in` : '—'} · {m.weightLb ? `${m.weightLb} lb` : '—'}
                  {m.note ? ` · ${m.note}` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-xs text-ink-500">
          A real growth record, tracked the same way a pediatrician would — never framed as a goal
          weight or appearance target.
        </p>
      </div>

      {/**
        * EXERCISE DEMO VIDEOS — MOUNTED AT LAST. (Aug 10, 2026.)
        *
        * ExerciseVideoManager was built Aug 8, rewritten Aug 10 when the
        * default links turned out to open empty pages, and guarded by 39
        * checks in verify-pe-videos.mjs. NOTHING IMPORTED IT. Not one file.
        *
        * So every sentence written about it — "she can watch and replace any
        * of them from PE > Exercise Videos", "press Hide to show him nothing"
        * — described a screen that could not be opened. The tests passed
        * because they read the source, and the source was fine; the component
        * simply was not on any page.
        *
        * Found by verify-khan-unit-completion.mjs, which walks the import
        * graph from App.jsx and fails when a store action's only caller is
        * unreachable. setExerciseVideo was the second thing it caught, one
        * minute after the first.
        *
        * It belongs here: this whole section is already parent-gated, and it
        * sits with the rest of PE rather than in a settings screen, because
        * choosing a demo video is a teaching decision, not a preference.
        */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Exercise Demo Videos</p>
        <div className="mt-3">
          <ExerciseVideoManager />
        </div>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Weekly Goals</p>
        {goalWeeks.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">No weekly goals set yet.</p>
        ) : (
          <div className="mt-2 space-y-1.5">
            {goalWeeks.map(([weekKey, goal]) => (
              <div key={weekKey} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display font-600 text-ink-100">{weekKey}</span>
                  {goal.achieved && (
                    <span className="rounded-full border border-signal-green/40 bg-signal-green/10 px-2 py-0.5 text-xs text-signal-green">
                      Achieved
                    </span>
                  )}
                </div>
                <p className="mt-1 text-ink-300">{goal.goalText}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReadingLogSection() {
  const readingLog = useAppStore((s) => s.readingLog);
  const addReadingLogEntry = useAppStore((s) => s.addReadingLogEntry);
  const removeReadingLogEntry = useAppStore((s) => s.removeReadingLogEntry);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('minutes');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addReadingLogEntry(title, author, amount, unit);
    setTitle('');
    setAuthor('');
    setAmount('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Reading Log</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Log Independent Reading</h3>
        <p className="mt-2 text-sm text-ink-300">
          Books read outside the Reading subject's own lessons — free reading, read-alouds, anything
          worth tracking.
        </p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          className="mt-3 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author (optional)"
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-24 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          >
            <option value="minutes">minutes</option>
            <option value="pages">pages</option>
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!title.trim()}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Log Entry
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {readingLog.length === 0 && <p className="text-sm text-ink-500">No reading logged yet.</p>}
        {readingLog.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
            <div>
              <p className="font-display font-700 text-ink-100">{entry.title}</p>
              <p className="text-xs text-ink-500">
                {entry.author && `${entry.author} · `}
                {entry.amount} {entry.unit} · {entry.date}
              </p>
            </div>
            <button type="button" onClick={() => removeReadingLogEntry(entry.id)} className="text-xs text-ink-500 hover:text-signal-red">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection() {
  const portfolio = useAppStore((s) => s.portfolio);
  const addPortfolioEntry = useAppStore((s) => s.addPortfolioEntry);
  const removePortfolioEntry = useAppStore((s) => s.removePortfolioEntry);
  const setPortfolioDriveUrl = useAppStore((s) => s.setPortfolioDriveUrl);
  const getAllSubjectsForRecordkeeping = useAppStore((s) => s.getAllSubjectsForRecordkeeping);
  // subscribe to the data the getter reads — stable getter refs never trigger re-renders on their own (Batch B, Aug 2026)
  // (this getter reads only module constants, no store state — memoized for referential stability)
  const subjects = useMemo(() => getAllSubjectsForRecordkeeping(), [getAllSubjectsForRecordkeeping]);

  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [subject, setSubject] = useState('');
  const [driveUrl, setDriveUrl] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addPortfolioEntry(title, reflection, subject || null, driveUrl);
    setTitle('');
    setReflection('');
    setSubject('');
    setDriveUrl('');
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Project Portfolio</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Log a Completed Project</h3>
        <p className="mt-2 text-sm text-ink-300">
          Hands-on STEM projects actually built — bottle rockets, egg drops, gardening projects,
          anything real and completed.
        </p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="mt-3 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="What happened, what was learned, what he'd try differently"
          className="mt-2 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <div className="mt-2">
          <EvidenceLinkInput
            value={driveUrl}
            onChange={setDriveUrl}
            folderKey="portfolio"
            placeholder="Drive link to photos or video of the build (optional)"
          />
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          >
            <option value="">No subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {SUBJECT_LABELS[subj] || subj}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!title.trim()}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Portfolio
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {portfolio.length === 0 && <p className="text-sm text-ink-500">No projects logged yet.</p>}
        {portfolio.map((entry) => (
          <div key={entry.id} className="rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-display font-700 text-ink-100">{entry.title}</span>
                {entry.subject && (
                  <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-xs text-signal-cyan">
                    {SUBJECT_LABELS[entry.subject] || entry.subject}
                  </span>
                )}
              </div>
              <button type="button" onClick={() => removePortfolioEntry(entry.id)} className="text-xs text-ink-500 hover:text-signal-red">
                Delete
              </button>
            </div>
            {entry.reflection && <p className="mt-2 text-sm text-ink-300">{entry.reflection}</p>}
            <p className="mt-1 text-xs text-ink-500">{entry.dateCompleted}</p>
            <EvidenceLinkEditor url={entry.driveUrl} onSave={(value) => setPortfolioDriveUrl(entry.id, value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Named 'Local' and returning UTC since it was written. See the note in
// MissionControlDashboard.jsx — after ~8pm Eastern this was tomorrow.
function todayStrLocal() {
  return todayDateStr();
}

/**
 * Manual, two-computer progress sync. This app has no cloud sync yet
 * (see PROJECT_PLAN.md Part 6 — "v2 deferred") — everything lives in
 * this browser's local storage only. When the student does lessons on
 * a different computer than the one the parent uses for grading, this
 * section is the bridge: export a file from his computer, send it over
 * (Drive, email, USB — however files already move between the two of
 * you), then import it here. Not real-time — a deliberate, practical
 * tradeoff over building full cloud sync, see PROJECT_LOG.md for the
 * reasoning the parent confirmed.
 */
/** "Aug 10, 10:03 PM" — a stamp read at a glance, not an ISO string. */
function formatSyncStamp(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Unknown';
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * WHERE SHE PUTS THIS WEEK'S BLOOKET, KAHOOT AND GIMKIT.
 *
 * The parent asked for the three platforms on his Games screen, and — asked
 * how he should get into a game that is hosted by her — chose to paste the
 * link herself.
 *
 * Nothing is hard-coded, on purpose. All three are teacher-hosted: the address
 * that actually opens a game changes every time she sets one up, so a link in
 * the code would be wrong by the second week. His card shows what is here, and
 * says "ask Mom" when it is empty rather than sending him to a code box he
 * cannot fill.
 */
function QuizGameLinksSection() {
  const quizLinks = useAppStore((s) => s.quizLinks);
  const setQuizLink = useAppStore((s) => s.setQuizLink);
  const [drafts, setDrafts] = useState({});
  const [errors, setErrors] = useState({});
  const [savedId, setSavedId] = useState(null);

  const valueFor = (id) => (drafts[id] !== undefined ? drafts[id] : (quizLinks || {})[id] || '');

  const save = async (id) => {
    const res = await setQuizLink(id, valueFor(id));
    if (!res?.ok) {
      setErrors((e) => ({
        ...e,
        [id]: res?.reason === 'bad-url'
          ? 'That needs to start with http:// or https://'
          : 'That did not save.'
      }));
      return;
    }
    setErrors((e) => ({ ...e, [id]: null }));
    setDrafts((d) => ({ ...d, [id]: undefined }));
    setSavedId(id);
    setTimeout(() => setSavedId((cur) => (cur === id ? null : cur)), 1800);
  };

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">
        🎯 Blooket / Kahoot / Gimkit
      </p>
      <p className="mt-1 text-sm text-ink-300">
        You host these, so the link changes every time. Paste this week&apos;s and it appears on his
        Games screen. Clear the box to take it down — his card goes back to &ldquo;ask Mom&rdquo;
        rather than keeping a dead link.
      </p>
      <p className="mt-1 text-xs text-ink-500">
        The link travels to his computer on the next export, like everything else.
      </p>

      <div className="mt-3 space-y-3">
        {QUIZ_PLATFORMS.map((platform) => {
          const live = (quizLinks || {})[platform.id];
          return (
            <div key={platform.id} className="rounded-lg border border-space-600 bg-space-900 p-3">
              <p className="font-display text-sm font-700 text-ink-100">
                {platform.emoji} {platform.label}
              </p>
              <p className="mt-0.5 text-xs text-ink-500">{platform.parentHint}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <input
                  type="url"
                  inputMode="url"
                  value={valueFor(platform.id)}
                  onChange={(e) => setDrafts((d) => ({ ...d, [platform.id]: e.target.value }))}
                  placeholder="https://…"
                  className="min-w-0 flex-1 rounded-lg border border-space-600 bg-space-800 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-600"
                />
                <button
                  type="button"
                  onClick={() => save(platform.id)}
                  className="rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
                >
                  Save
                </button>
              </div>
              {errors[platform.id] && (
                <p className="mt-1.5 text-xs text-signal-red">{errors[platform.id]}</p>
              )}
              {savedId === platform.id && !errors[platform.id] && (
                <p className="mt-1.5 text-xs text-signal-green">Saved — it is on his Games screen now.</p>
              )}
              {!live && !errors[platform.id] && savedId !== platform.id && (
                <p className="mt-1.5 text-xs text-ink-600">
                  Nothing set — his card asks him to come and find you.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SyncSection() {
  const exportProgressData = useAppStore((s) => s.exportProgressData);
  const importProgressData = useAppStore((s) => s.importProgressData);
  const lastImportedExportAt = useAppStore((s) => s.lastImportedExportAt);
  const xp = useAppStore((s) => s.xp);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const lastImportAt = useAppStore((s) => s.lastImportAt);
  const lastExportAt = useAppStore((s) => s.lastExportAt);

  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null); // { type: 'success' | 'error', message }

  const totalMastered = totalMasteredCount(useAppStore((s) => s));

  const handleExport = () => {
    exportProgressData();
    setResult({ type: 'success', message: 'Progress file downloaded. Send it to the other computer, then use Import there.' });
  };

  const handleFileChosen = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-choosing the same file name later
    if (!file) return;
    setImporting(true);
    setResult(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      /**
       * IS THIS FILE OLDER THAN THE ONE YOU ALREADY IMPORTED?
       *
       * ---- WHERE THIS CAME FROM (Aug 20, 2026) ----
       *
       * She spent an evening certain the app had lost his work: two days of
       * Khan ticks, his Tuesday and Wednesday spelling, his typing speed
       * tests. He insisted he had done them. He had.
       *
       * Her Downloads folder held three export files with almost the same
       * name — `...2026-08-17.json`, `...2026-08-17 (1).json` and
       * `...2026-08-19.json`. She picked an August 17 one. Every table in her
       * database matched that file exactly, so the import was working
       * perfectly and had nothing new to add.
       *
       * The app knew both dates and said neither. It reported "Imported"
       * and a list of things that changed, which was empty — and an empty
       * list of changes reads exactly like a quiet success.
       *
       * The file carries the moment it was exported. So does the record of
       * the last import. Comparing them is one line and it turns an evening of
       * doubt into a question with an obvious answer.
       */
      const fileExportedAt = typeof parsed?.exportedAt === 'string' ? parsed.exportedAt : null;
      if (fileExportedAt && lastImportedExportAt && fileExportedAt <= lastImportedExportAt) {
        const when = (iso) => new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
        const proceed = window.confirm(
          [
            'This file is not newer than the one you last imported.',
            '',
            `This file was exported:      ${when(fileExportedAt)}`,
            `You already imported one from: ${when(lastImportedExportAt)}`,
            '',
            'If you meant to bring across his newest work, cancel and pick the file with the later date.',
            'Importing this one is safe — it just will not add anything new.'
          ].join('\n')
        );
        if (!proceed) { setImporting(false); return; }
      }

      const summary = await importProgressData(parsed);
      const parts = [];
      if (summary.lessonsUpdated) parts.push(`${summary.lessonsUpdated} lesson${summary.lessonsUpdated === 1 ? '' : 's'} updated`);
      if (summary.writingEntriesAdded) parts.push(`${summary.writingEntriesAdded} new writing entr${summary.writingEntriesAdded === 1 ? 'y' : 'ies'}`);
      if (summary.khanAcademyAdded) parts.push(`${summary.khanAcademyAdded} new Khan Academy assignment${summary.khanAcademyAdded === 1 ? '' : 's'}`);
      if (summary.readingLogAdded) parts.push(`${summary.readingLogAdded} new reading log entr${summary.readingLogAdded === 1 ? 'y' : 'ies'}`);
      if (summary.portfolioAdded) parts.push(`${summary.portfolioAdded} new portfolio entr${summary.portfolioAdded === 1 ? 'y' : 'ies'}`);
      if (summary.academicUpdated) parts.push(`${summary.academicUpdated} book/assignment update${summary.academicUpdated === 1 ? '' : 's'}`);
      if (summary.peEntriesAdded) parts.push(`${summary.peEntriesAdded} PE & nutrition entr${summary.peEntriesAdded === 1 ? 'y' : 'ies'}`);
      /**
       * The eight tables that started travelling on Aug 9, 2026 report
       * themselves too. Naming them matters more than it looks: for months
       * these were silently not arriving, and "Imported: 4 lessons updated"
       * read exactly the same whether his written work had come across or
       * had been dropped on the floor. Now the screen says which.
       */
      if (summary.explanationsAdded) parts.push(`${summary.explanationsAdded} written answer${summary.explanationsAdded === 1 ? '' : 's'} to read`);
      if (summary.explanationGradesReceived) parts.push(`${summary.explanationGradesReceived} reflection grade${summary.explanationGradesReceived === 1 ? '' : 's'}`);
      if (summary.redemptionsResolved) parts.push(`${summary.redemptionsResolved} reward decision${summary.redemptionsResolved === 1 ? '' : 's'}`);
      if (summary.plannerItemsAdded) parts.push(`${summary.plannerItemsAdded} planner item${summary.plannerItemsAdded === 1 ? '' : 's'}`);
      if (summary.wordStudyWeeksMerged) parts.push('spelling & vocabulary progress');
      if (summary.khanDaysMerged) parts.push(`${summary.khanDaysMerged} day${summary.khanDaysMerged === 1 ? '' : 's'} of Khan check-offs`);
      const message = parts.length > 0 ? `Imported: ${parts.join(', ')}.` : 'Import complete — nothing new to add (this computer already had everything in that file).';
      setResult({ type: 'success', message });
    } catch (err) {
      setResult({ type: 'error', message: `Couldn't import that file — ${err.message || 'it may not be a valid progress export.'}` });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {result && (
        <div
          className={
            'rounded-lg border p-3 text-sm ' +
            (result.type === 'success'
              ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
              : 'border-signal-red/40 bg-signal-red/10 text-signal-red')
          }
        >
          {result.message}
        </div>
      )}

      {/* Go-live open item 1. First thing on the screen, because "when was
          the last copy made" is the question this screen exists to answer
          and it was the one thing it could not tell her. */}
      <BackupStatusCard tone="parent" onExport={handleExport} />

      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Export / Import</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Progress Sync Between Computers</h3>
        <p className="mt-2 text-sm text-ink-300">
          If Lamar does his lessons on a different computer than the one you use to grade and view the
          Parent Dashboard, progress won't appear here automatically — each computer keeps its own local
          copy. Export a file from his computer, send it to yours the way you already move files, then
          import it here. This is a manual, periodic sync, not real-time.
        </p>
        <p className="mt-2 text-sm text-ink-300">
          Importing never overwrites a grade you've already entered — a Khan Academy assignment or
          Writing Journal entry that's already graded on this computer stays exactly as you graded it,
          even if you re-import the same or a newer file later.
        </p>

        <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3 text-sm text-ink-300">
          Currently on this computer: <span className="font-display font-700 text-ink-100">{xp} XP</span>,{' '}
          <span className="font-display font-700 text-ink-100">{totalMastered} lessons mastered</span>
        </div>

        {/**
          * WHEN DID THESE TWO COMPUTERS LAST AGREE? (Aug 11, 2026.)
          *
          * The parent: "I uploaded this and do not see anything new on my
          * side." Her database said the import had never run — no lastImportAt,
          * XP untouched, none of his rows present. His file was still just a
          * file on her disk.
          *
          * Nothing on this screen could have told her that. The import result
          * is one line that appears after a click and is gone on the next
          * render, so "did it work?" was unanswerable five minutes later, and
          * the honest answer — NEVER — looked identical to the answer "an hour
          * ago." Both values were already being stored. Neither was shown.
          */}
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div
            className={
              'rounded-lg border p-3 text-sm ' +
              (lastImportAt ? 'border-space-700 bg-space-900 text-ink-300' : 'border-signal-amber/40 bg-signal-amber/5 text-signal-amber')
            }
          >
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Last import from his computer</p>
            <p className="mt-0.5 font-display font-700">
              {lastImportAt ? formatSyncStamp(lastImportAt) : 'Never — his work has not arrived here yet'}
            </p>
            {/**
              * THE DATE THAT ACTUALLY ANSWERS THE QUESTION.
              *
              * "When did I last import" is not the same as "how current is
              * what I imported", and the gap between them cost an evening: she
              * imported an Aug 17 file on Aug 19 and concluded two days of his
              * work had been lost by the app. Both numbers were already known.
              * Only one was shown.
              */}
            {lastImportedExportAt && (
              <p className="mt-0.5 text-xs text-ink-500">
                that file was his work as of {formatSyncStamp(lastImportedExportAt)}
              </p>
            )}
          </div>
          <div className="rounded-lg border border-space-700 bg-space-900 p-3 text-sm text-ink-300">
            <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Last export from this computer</p>
            <p className="mt-0.5 font-display font-700 text-ink-100">
              {lastExportAt ? formatSyncStamp(lastExportAt) : 'Never'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Export Progress
          </button>

          <label className="cursor-pointer rounded-lg border border-signal-cyan/50 bg-signal-cyan/10 px-4 py-2 font-display font-700 text-signal-cyan transition hover:bg-signal-cyan/20">
            {importing ? 'Importing…' : 'Import Progress'}
            <input type="file" accept="application/json,.json" onChange={handleFileChosen} disabled={importing} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}

function DangerZoneSection() {
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const resetAllProgress = useAppStore((s) => s.resetAllProgress);

  const [confirmText, setConfirmText] = useState('');
  const [resetting, setResetting] = useState(false);
  const [justReset, setJustReset] = useState(false);

  const totalMastered = totalMasteredCount(useAppStore((s) => s));
  const canReset = confirmText.trim().toUpperCase() === CONFIRM_PHRASE;

  const handleReset = async () => {
    if (!canReset || resetting) return;
    setResetting(true);
    await resetAllProgress();
    setResetting(false);
    setConfirmText('');
    setJustReset(true);
  };

  return (
    <div className="space-y-4">
      {justReset && (
        <div className="rounded-lg border border-signal-green/40 bg-signal-green/10 p-3 text-sm text-signal-green">
          Progress has been reset. XP, streak, and every subject's mastery are back to zero. The
          daily schedule and your notes were left untouched.
        </div>
      )}

      <div className="rounded-xl border border-signal-red/40 bg-signal-red/5 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-red">Danger Zone</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Reset All Progress</h3>
        <p className="mt-2 text-sm text-ink-300">
          This permanently clears XP, streak, every subject's lesson mastery, the writing journal,
          typing scores and typing lesson mastery, and attendance records. It cannot be undone. The
          daily schedule and your Notes &amp; Observations are not affected.
        </p>

        <div className="mt-3 rounded-lg border border-space-700 bg-space-900 p-3 text-sm text-ink-300">
          Currently recorded: <span className="font-display font-700 text-ink-100">{xp} XP</span>,{' '}
          <span className="font-display font-700 text-ink-100">{streak}-day streak</span>,{' '}
          <span className="font-display font-700 text-ink-100">{totalMastered} lessons mastered</span>
        </div>

        <label className="mt-4 block text-sm text-ink-300">
          Type <span className="font-display font-700 text-signal-red">RESET</span> to confirm:
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Type RESET here"
          className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-ink-100 placeholder:text-ink-500 focus:border-signal-red focus:outline-none"
        />

        <button
          type="button"
          onClick={handleReset}
          disabled={!canReset || resetting}
          className="mt-3 rounded-lg bg-signal-red px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {resetting ? 'Resetting…' : 'Reset All Progress'}
        </button>
      </div>
    </div>
  );
}
