import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import {
  getWeeklyChallenge, evaluateWeekly,
  getSeasonalOperation, evaluateSeasonal
} from '../../lib/challenges.js';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import { playAchievement, unlockAudio } from '../../lib/sfx.js';

// ---------------------------------------------------------------------------
// CHALLENGES — the weekly challenge and the quarter's operation.
// (Part 10, built Aug 8, 2026.)
//
// These are the two tiers that pay CREDITS, and that is the whole reason they
// exist. The Credit ladder in lib/economy.js was approved assuming this income:
// the 2,000-Credit Dream Reward sits at ~47% of a school year with it and ~65%
// without. Sixty-five percent means choosing the annual reward costs him nearly
// everything else all year, which is punishing rather than motivating.
//
// The daily loop deliberately pays Coins only — the everyday rhythm must never
// cost a parent real money, or the economy stops being sustainable by about
// October.
// ---------------------------------------------------------------------------

function Bar({ pct, done }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-space-800">
      <div
        className={'h-full rounded-full transition-all ' + (done ? 'bg-signal-green' : 'bg-signal-cyan')}
        style={{ width: `${Math.round((pct || 0) * 100)}%` }}
      />
    </div>
  );
}

function RewardChips({ reward }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px]">
      {reward.coin > 0 && <span className="text-signal-amber">🪙 {reward.coin}</span>}
      {reward.credit > 0 && <span className="text-signal-cyan">🎟️ {reward.credit}</span>}
    </span>
  );
}

/**
 * Claim is an explicit button, not an automatic payout.
 *
 * Automatic would be simpler and would silently work — but the moment of
 * finishing something and collecting it is most of the point at twelve. A
 * number that quietly changes in a header is not a moment.
 */
function ClaimRow({ complete, claimed, reward, onClaim }) {
  if (claimed) {
    return <p className="text-sm font-700 text-signal-green">Claimed ✓</p>;
  }
  if (!complete) {
    return (
      <p className="text-[11px] text-ink-500">
        Finish it to earn <RewardChips reward={reward} />
      </p>
    );
  }
  return (
    <button
      type="button"
      onClick={onClaim}
      className="rounded-lg bg-signal-cyan px-3 py-1.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
    >
      Claim <RewardChips reward={reward} />
    </button>
  );
}

export function ChallengesSection() {
  const getPeriodCounts = useAppStore((s) => s.getPeriodCounts);
  const getGamificationStats = useAppStore((s) => s.getGamificationStats);
  const claimChallenge = useAppStore((s) => s.claimChallenge);
  const ledger = useAppStore((s) => s.ledger);

  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const khanDailyLog = useAppStore((s) => s.khanDailyLog);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peMeals = useAppStore((s) => s.peMeals);
  const readingLog = useAppStore((s) => s.readingLog);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const portfolio = useAppStore((s) => s.portfolio);
  // The seasonal operation counts completed trips, so this recompute has to
  // watch them — subscribing to a value the memo reads is what keeps the card
  // from showing a stale figure until the next navigation.
  const fieldTrips = useAppStore((s) => s.fieldTrips);

  const [msg, setMsg] = useState(null);

  const periods = useMemo(
    () => getPeriodCounts(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getPeriodCounts, lessonProgress, khanDailyLog, writingEntries, peWorkoutLog,
     peMeals, readingLog, gardenLog, guitarLog, academicAssignments, academicBooks,
     portfolio, fieldTrips]
  );

  const stats = useMemo(
    () => getGamificationStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getGamificationStats, lessonProgress, writingEntries, peWorkoutLog, peMeals,
     academicBooks, portfolio, academicAssignments, ledger]
  );

  const active = useMemo(() => {
    const a = [];
    if ((gardenLog || []).length > 0) a.push('garden');
    if ((guitarLog || []).length > 0) a.push('guitar');
    return a;
  }, [gardenLog, guitarLog]);

  const weekly = useMemo(
    () => evaluateWeekly(getWeeklyChallenge(periods.todayStr, active), periods.week),
    [periods, active]
  );

  const quarter = useMemo(() => getCurrentQuarter(), []);
  const seasonal = useMemo(() => {
    const op = getSeasonalOperation(quarter.id);
    if (!op) return null;
    /**
     * QUARTER-SCOPED AS OF AUG 9, 2026 (go-live open item 2).
     *
     * This passed CUMULATIVE lifetime totals into a quarter-scale
     * challenge. The note that used to sit here was honest about it — right
     * by coincidence in Q1, because the operations launch in the same week
     * as the school year — and said plainly that it stops being true in Q2.
     * It would have stopped being true on 1 November: the Q2 operation
     * would have opened with most of its objectives already satisfied by
     * Q1's work and paid out its reward for nothing, which is the one thing
     * this economy exists not to do.
     *
     * `periods.quarter` runs the same counts builder over the current
     * quarter's own dates. Same fields, different window.
     */
    return evaluateSeasonal(op, quarter.batchLabel, {
      lessonsMastered: periods.quarter.lessonsMastered,
      workouts: periods.quarter.workouts,
      writingEntries: periods.quarter.writingEntries,
      portfolioEntries: periods.quarter.portfolioEntries,
      khanUnits: periods.quarter.khanUnits,
      booksCompleted: periods.quarter.booksCompleted,
      fieldTripsCompleted: periods.quarter.fieldTripsCompleted,
      meals: periods.quarter.meals,
      gardenSessions: periods.quarter.gardenSessions,
      assignmentsCompleted: periods.quarter.assignmentsCompleted
    });
  }, [quarter, periods]);

  const claimedKeys = useMemo(
    () => new Set((ledger || []).map((e) => e && e.source).filter(Boolean)),
    [ledger]
  );

  const doClaim = async (key, reward, label) => {
    unlockAudio();
    const res = await claimChallenge({ key, coin: reward.coin, credit: reward.credit, note: label });
    if (res.ok) {
      playAchievement();
      setMsg(`Claimed ${label} — ${reward.coin} coins${reward.credit ? ` and ${reward.credit} credits` : ''}.`);
    }
  };

  return (
    <div className="space-y-5">
      {msg && (
        <div className="rounded-lg border border-signal-green/40 bg-signal-green/10 px-3 py-2 text-sm text-ink-100">{msg}</div>
      )}

      {/* -------- Weekly -------- */}
      <div className="rounded-xl border border-space-700 bg-space-900 p-4 shadow-panel">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">This week</p>
          <span className="text-[11px] text-ink-600">{weekly.periodId}</span>
        </div>
        <p className="mt-2 flex items-center gap-2 font-display text-lg font-700 text-ink-100">
          <span>{weekly.icon}</span>{weekly.title}
        </p>
        <p className="text-sm text-ink-300">{weekly.desc}</p>
        <div className="mt-3">
          <Bar pct={weekly.pct} done={weekly.complete} />
          <p className="mt-1 text-[11px] tabular-nums text-ink-500">
            {weekly.current} of {weekly.need}
          </p>
        </div>
        <div className="mt-3 border-t border-space-700 pt-2">
          <ClaimRow
            complete={weekly.complete}
            claimed={claimedKeys.has(weekly.key)}
            reward={weekly.reward}
            onClaim={() => doClaim(weekly.key, weekly.reward, weekly.title)}
          />
        </div>
      </div>

      {/* -------- Seasonal -------- */}
      {seasonal ? (
        <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4 shadow-panel">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-xs uppercase tracking-widest text-signal-amber">This quarter</p>
            <span className="text-[11px] text-ink-600">{quarter.batchLabel}</span>
          </div>
          <p className="mt-2 flex items-center gap-2 font-display text-lg font-700 text-ink-100">
            <span>{seasonal.icon}</span>{seasonal.name}
          </p>
          {/* Nova's briefing — the reason the work exists, in her voice. */}
          <p className="mt-2 rounded-lg border border-space-700 bg-space-950/60 p-3 text-sm italic leading-relaxed text-ink-300">
            &ldquo;{seasonal.brief}&rdquo;
          </p>

          <div className="mt-3 space-y-2">
            {seasonal.tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2.5">
                <span
                  className={
                    'flex h-5 w-5 flex-none items-center justify-center rounded-full border text-[11px] ' +
                    (t.done ? 'border-signal-green/60 bg-signal-green/20 text-signal-green' : 'border-space-600 bg-space-950 text-ink-600')
                  }
                >
                  {t.done ? '✓' : ''}
                </span>
                <span className={'flex-1 text-sm ' + (t.done ? 'text-ink-500 line-through' : 'text-ink-200')}>
                  {t.label}
                </span>
                {!t.done && (
                  <span className="flex-none text-[11px] tabular-nums text-ink-500">{t.current}/{t.need}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3">
            <Bar pct={seasonal.pct} done={seasonal.complete} />
            <p className="mt-1 text-[11px] tabular-nums text-ink-500">
              {seasonal.doneCount} of {seasonal.total} objectives
            </p>
          </div>

          {seasonal.complete && (
            <p className="mt-3 rounded-lg border border-signal-green/40 bg-signal-green/10 p-3 text-sm italic leading-relaxed text-signal-green">
              &ldquo;{seasonal.debrief}&rdquo;
            </p>
          )}

          <div className="mt-3 border-t border-space-700 pt-2">
            <ClaimRow
              complete={seasonal.complete}
              claimed={claimedKeys.has(seasonal.key)}
              reward={seasonal.reward}
              onClaim={() => doClaim(seasonal.key, seasonal.reward, seasonal.name)}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-ink-500">
          No operation is running this period — the next one opens with the new quarter.
        </p>
      )}
    </div>
  );
}

/* ========================================================================
 * EARN HISTORY — where the money came from and went.
 *
 * The ledger already recorded every movement; nothing had ever shown it. This
 * is the financial-literacy half of Part 10 and it costs nothing to render,
 * because every figure is a fold of rows that already exist.
 * ===================================================================== */

const KIND_LABEL = {
  opening: 'Opening balance', spend: 'Purchase', refund: 'Refund',
  grant: 'Parent bonus', deduct: 'Parent adjustment',
  challenge: 'Challenge reward', crate: 'Supply crate', match: 'Dream Match'
};

/**
 * ---- COMPACT MODE (Aug 25, 2026) ----
 *
 * History lost its tab in the eleven-to-four cleanup. It was not deleted —
 * it moved to the bottom of Shop, which is where a receipt belongs: beside the
 * wallet it drains, not in a destination of its own.
 *
 * `compact` drops the two big balance tiles (the coin balance is already in
 * the page header, and was appearing in three places at once) and shows the
 * last eight lines rather than fifty, with a control to open the rest. The
 * full ledger is still reachable — a shorter page must not become a page that
 * has quietly lost something, which is the failure mode of every "simplify"
 * pass ever attempted on this app.
 */
export function HistorySection({ compact = false }) {
  const ledger = useAppStore((s) => s.ledger);
  const getGamificationStats = useAppStore((s) => s.getGamificationStats);
  const xp = useAppStore((s) => s.xp);
  const lessonProgress = useAppStore((s) => s.lessonProgress);

  const stats = useMemo(
    () => getGamificationStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getGamificationStats, ledger, xp, lessonProgress]
  );

  const [showAll, setShowAll] = useState(false);
  const allRows = useMemo(
    () => [...(ledger || [])].sort((a, b) => String(b.at).localeCompare(String(a.at))).slice(0, 50),
    [ledger]
  );
  const rows = compact && !showAll ? allRows.slice(0, 8) : allRows;

  const fmt = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <div>
      {!compact && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-3 shadow-panel">
            <p className="font-display text-[11px] uppercase tracking-widest text-signal-amber">Mission Coins</p>
            <p className="font-display text-2xl font-700 text-ink-100">{stats.coinBalance}</p>
            <p className="text-[11px] text-ink-500">{stats.coinsEarned} earned · {stats.coinsSpent} spent</p>
          </div>
          <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-3 shadow-panel">
            <p className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">Mission Credits</p>
            <p className="font-display text-2xl font-700 text-ink-100">{stats.creditBalance}</p>
            <p className="text-[11px] text-ink-500">{stats.creditsEarned} earned from work</p>
          </div>
        </div>
      )}

      <p className={(compact ? '' : 'mt-4 ') + 'mb-2 text-sm text-ink-300'}>
        {compact
          ? 'Where your coins went.'
          : 'Every coin and credit that moved, and why. Nothing here is ever deleted — a refund is added as its own line, so the story stays complete.'}
      </p>

      {rows.length === 0 ? (
        <p className="text-sm text-ink-500">
          Nothing recorded yet. Coins and credits from lessons appear as you earn them; bonuses,
          purchases and challenge rewards each get their own line here.
        </p>
      ) : (
        <div className="divide-y divide-space-800 rounded-xl border border-space-700 bg-space-900 shadow-panel">
          {rows.map((e) => (
            <div key={e.entryId} className="flex items-center gap-3 px-3 py-2">
              <span className="text-sm">{e.currency === 'credit' ? '🎟️' : '🪙'}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink-200">{e.note || KIND_LABEL[e.kind] || e.kind}</p>
                <p className="text-[11px] text-ink-600">{KIND_LABEL[e.kind] || e.kind} · {fmt(e.at)}</p>
              </div>
              <span
                className={
                  'flex-none font-display text-sm font-700 tabular-nums ' +
                  (e.amount >= 0 ? 'text-signal-green' : 'text-ink-400')
                }
              >
                {e.amount >= 0 ? '+' : ''}{e.amount}
              </span>
            </div>
          ))}
        </div>
      )}

      {compact && !showAll && allRows.length > rows.length && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-2 w-full rounded-lg border border-space-600 bg-space-800 px-3 py-1.5 text-xs font-display font-700 text-ink-300 transition hover:border-signal-cyan hover:text-ink-100"
        >
          Show all {allRows.length} · every coin that moved, and why
        </button>
      )}
    </div>
  );
}
