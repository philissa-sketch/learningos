import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { evaluateBadges } from '../../lib/badges.js';
import { AVATARS, ROCKETS, avatarIconFor, DEFAULT_AVATAR_ID, DEFAULT_ROCKET_ID } from '../../lib/rewards.js';
import { costForCosmetic } from '../../academies/lamar/data/rewardCatalog.js';
import { JourneySection, ShipSection } from './MissionJourney.jsx';
import { ChallengesSection, HistorySection } from './ChallengesSection.jsx';
import { SupplySection } from './SupplyStore.jsx';
import { InventorySection } from './InventorySection.jsx';
import { CadetAvatar } from './CadetAvatar.jsx';
import { THEMES, DEFAULT_THEME_ID, themeSwatch } from '../../lib/themes.js';
import { DreamGoalSection } from './DreamGoalSection.jsx';
import { NovaTabGuide } from './NovaTabGuide.jsx';
// getProgressToNextRank/getNextRank left with MissionsSection when it was
// deleted — the Journey computes its own from the same source.
import { RANKS } from '../../lib/ranks.js';
import { READINESS_SKILLS, LEVEL_STYLE, nextLevel, criteriaFor } from '../../lib/readiness.js';
import { STUDENT_NAME } from '../../lib/novaVoice.js';
import { playAchievement, playPurchase, unlockAudio } from '../../lib/sfx.js';
import { RocketSwatch } from './RocketSwatch.jsx';

// Gamification hub (Part 5, Aug 6, 2026): the student's Badges, Rewards Store,
// and printable Certificates, plus a live coin balance. Coins are earned from
// XP (verified completions only), so nothing here can be gamed. Real-world
// rewards are parent-defined and parent-approved; cosmetics unlock instantly.

/**
 * 'YYYY-MM-DD' -> 'March 14, 2028'.
 *
 * Built from parts rather than new Date(str): parsing a bare date string is
 * treated as UTC, which renders the previous day for anyone west of Greenwich —
 * the same class of bug that once misdated attendance in this app.
 */
function formatAwardDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = String(dateStr).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

function CoinChip({ balance }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-signal-amber/40 bg-signal-amber/10 px-3 py-1 font-display text-sm font-700 text-signal-amber">
      🪙 {balance}
    </span>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-md px-3 py-1.5 text-sm font-display font-700 transition-colors ' +
        (active ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
      }
    >
      {children}
    </button>
  );
}

/**
 * ===========================================================================
 * CERTIFICATES WERE SEVEN OF THESE BADGES WITH A PRINT BUTTON. (Aug 25, 2026.)
 * ===========================================================================
 *
 * The parent: **"I don't like the reward section. It is overwhelming. There
 * are 11 tabs."**
 *
 * Eleven tabs was the symptom. Underneath it, several tabs were the same
 * content twice — and Certificates was the clearest case. Its ids were
 * `rank-2` through `rank-8`, generated from RANKS with the same 🎖️ icon and
 * the same `stats.rankTier >= tier` test that `lib/badges.js:29` already uses
 * to generate seven badges. Same objects, same unlock rule, two tabs.
 *
 * The one thing a certificate had that a badge did not was PRINTING. So that
 * is what moved: the print lives on the badge, and the tab is gone. Nothing is
 * lost, and he stops opening a tab that until Tier 2 renders one grey sentence
 * and nothing else.
 *
 * Keyed by BADGE id on purpose. The mastery certificate was `mastery-100`
 * while its badge is `hundred-lessons` — matching on the certificate's own id
 * would have silently dropped it, which is the class of bug this whole month
 * has been about.
 */
function certificatesByBadgeId(stats, rankTierDates, masteryMilestoneDates) {
  const map = {};
  for (const r of RANKS) {
    if (r.tier < 2) continue;
    map[`rank-${r.tier}`] = {
      id: `rank-${r.tier}`,
      icon: '🎖️',
      title: r.name,
      subtitle: `Awarded for reaching Tier ${r.tier} of the Engineering rank system through real, mastered work.`,
      earned: stats.rankTier >= r.tier,
      // Milestones reached before dates were recorded simply print without
      // one, rather than inventing a date that would be wrong.
      awardedOn: formatAwardDate(rankTierDates[r.tier])
    };
  }
  map['hundred-lessons'] = {
    id: 'mastery-100',
    icon: '💯',
    title: '100 Lessons Mastered',
    subtitle: 'Awarded for mastering one hundred lessons across the curriculum.',
    earned: stats.totalMastered >= 100,
    awardedOn: formatAwardDate(masteryMilestoneDates[100])
  };
  return map;
}

function BadgesSection({ stats }) {
  const badges = useMemo(() => evaluateBadges(stats), [stats]);
  const earnedCount = badges.filter((b) => b.earned).length;
  const [openCert, setOpenCert] = useState(null);
  const getAchievementDates = useAppStore((s) => s.getAchievementDates);
  // Read once rather than subscribed: these change a handful of times in six
  // years and nothing needs to re-render when they do.
  const { rankTierDates, masteryMilestoneDates } = useMemo(
    () => getAchievementDates(),
    [getAchievementDates, stats.rankTier, stats.totalMastered]
  );
  const certs = useMemo(
    () => certificatesByBadgeId(stats, rankTierDates, masteryMilestoneDates),
    [stats, rankTierDates, masteryMilestoneDates]
  );
  const printable = badges.filter((b) => b.earned && certs[b.id]).length;

  return (
    <div>
      <p className="mb-3 text-sm text-ink-300">
        {earnedCount} of {badges.length} badges earned. Each one unlocks the moment the real work behind it is done.
        {printable > 0 && (
          <>
            {' '}
            <span className="text-signal-amber">
              {printable} of them {printable === 1 ? 'is' : 'are'} a certificate you can print.
            </span>
          </>
        )}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className={
              'rounded-xl border p-3 text-center shadow-panel ' +
              (b.earned ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-900')
            }
          >
            <div className={'text-3xl ' + (b.earned ? '' : 'opacity-30 grayscale')}>{b.icon}</div>
            <p className={'mt-1 font-display text-sm font-700 ' + (b.earned ? 'text-ink-100' : 'text-ink-500')}>
              {b.name}
            </p>
            <p className="mt-0.5 text-[11px] text-ink-500">{b.desc}</p>
            {/* A locked badge used to be a grey icon and nothing else — no way
                to tell whether it was one workout away or fifty. */}
            {!b.earned && b.progress ? (
              <div className="mt-1.5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-space-700">
                  <div
                    className="h-full rounded-full bg-signal-cyan/70"
                    style={{ width: `${Math.round(b.progress.pct * 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] font-display tracking-widest text-ink-500">
                  {b.progress.current} / {b.progress.target}
                </p>
              </div>
            ) : (
              <p className={'mt-1 text-[10px] font-display uppercase tracking-widest ' + (b.earned ? 'text-signal-green' : 'text-ink-500')}>
                {b.earned ? 'Earned' : 'Locked'}
              </p>
            )}

            {/* The Certificates tab, reduced to the one thing it did that a
                badge could not. Only on earned badges: a Print button on a
                locked badge is an invitation to print an empty page. */}
            {b.earned && certs[b.id] && (
              <button
                type="button"
                onClick={() => {
                  unlockAudio();
                  playAchievement();
                  setOpenCert(certs[b.id]);
                }}
                className="mt-2 w-full rounded-md border border-signal-amber/40 bg-signal-amber/10 px-2 py-1 text-[11px] font-display font-700 text-signal-amber transition hover:bg-signal-amber/20"
              >
                🖨 Print certificate
              </button>
            )}
          </div>
        ))}
      </div>
      {openCert && <CertificateModal cert={openCert} onClose={() => setOpenCert(null)} />}
    </div>
  );
}

/**
 * ===========================================================================
 * SHOW HIM WHAT HE IS BUYING. (Aug 25, 2026.)
 * ===========================================================================
 *
 * The parent: **"the rocket skin all look the same in the store."**
 *
 * They did. This card rendered `{item.icon}`, and the icon on all five rocket
 * skins is the same 🚀 — so the Rocket Skins grid was five identical rockets
 * with different names and prices. **The colour is the entire product, and the
 * card never showed it.** Every `ROCKETS` row has carried a `color` field since
 * the day it was written; nothing ever passed it to a pixel.
 *
 * He bought Deep-Space Violet for 275 coins on Aug 19 without being able to see
 * it. That is not a store, it is a raffle.
 *
 * Avatars had the same fault one step further back: six emoji, two of which are
 * the same glyph at this size. Both now draw the real thing — the actual rocket
 * in its actual colour, and the actual character.
 */
/* RocketSwatch moved to its own file — My Stuff needs it too, and importing
   it back from here would be a circular import. */

function CosmeticCard({ item, owned, equipped, canAfford, onBuy, onEquip }) {
  return (
    <div className={'rounded-xl border p-3 shadow-panel ' + (equipped ? 'border-signal-cyan/50 bg-signal-cyan/5' : 'border-space-700 bg-space-900')}>
      <div className="flex items-center gap-2">
        {/* The product itself, drawn — not a stand-in glyph for it. */}
        {item.type === 'rocket' ? (
          <RocketSwatch color={item.color} />
        ) : item.type === 'avatar' ? (
          <CadetAvatar avatar={item.id} size={44} />
        ) : (
          <span className="text-3xl">{item.icon}</span>
        )}
        <div className="min-w-0">
          <p className="font-display text-sm font-700 text-ink-100">{item.name}</p>
          <p className="text-[11px] text-ink-500">{item.cost === 0 ? 'Free' : `🪙 ${item.cost}`}</p>
        </div>
      </div>
      <div className="mt-2">
        {equipped ? (
          <span className="block rounded-md border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-1 text-center text-xs font-display font-700 text-signal-cyan">
            Equipped
          </span>
        ) : owned ? (
          <button
            type="button"
            onClick={() => onEquip(item)}
            className="w-full rounded-md border border-space-600 bg-space-800 px-2 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
          >
            Equip
          </button>
        ) : (
          <button
            type="button"
            disabled={!canAfford}
            onClick={() => onBuy(item)}
            className={
              'w-full rounded-md px-2 py-1 text-xs font-display font-700 transition ' +
              (canAfford
                ? 'bg-signal-amber text-space-950 hover:brightness-110'
                : 'cursor-not-allowed border border-space-700 bg-space-900 text-ink-600')
            }
          >
            {canAfford ? `Buy · 🪙 ${item.cost}` : `Need 🪙 ${item.cost}`}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * ===========================================================================
 * ONE COMPONENT, TWO WALLETS, TWO TABS. (Aug 25, 2026.)
 * ===========================================================================
 *
 * The store used to be a single scroll of about a hundred cards across eight
 * headed sections: avatars, themes, rockets, the supply crate, equipment,
 * gear, HQ, real-world rewards, dream rewards and his open requests. It was
 * the second-heaviest tab in a screen the parent called overwhelming.
 *
 * It splits along the line the app already teaches. Nova's own store guide is
 * about the TWO-CURRENCY RULE: **Coins buy cosmetics and unlock instantly.
 * Credits buy real things and need a parent.** Those are two different acts —
 * one is shopping, the other is asking — and they were stacked in one page
 * with nothing between them.
 *
 * Split by a PROP rather than by cutting the function in two, deliberately.
 * Every handler, every price lookup and the `msg` banner are shared, and
 * lifting ~350 lines into two components would have meant re-deriving all of
 * it twice. This codebase has been bitten four times by one fact living in two
 * places; a prop cannot drift from itself.
 */
function StoreSection({ coinBalance, creditBalance, half = 'both' }) {
  const showCoins = half !== 'credits';
  const showCredits = half !== 'coins';
  const unlocked = useAppStore((s) => s.unlockedCosmetics);
  const equippedAvatar = useAppStore((s) => s.equippedAvatar) || DEFAULT_AVATAR_ID;
  const equippedRocket = useAppStore((s) => s.equippedRocket) || DEFAULT_ROCKET_ID;
  const equippedTheme = useAppStore((s) => s.equippedTheme) || DEFAULT_THEME_ID;
  const rewards = useAppStore((s) => s.rewards);
  const redemptions = useAppStore((s) => s.rewardRedemptions);
  const redeemCosmetic = useAppStore((s) => s.redeemCosmetic);
  const equipCosmetic = useAppStore((s) => s.equipCosmetic);
  const redeemReward = useAppStore((s) => s.redeemReward);
  const [msg, setMsg] = useState(null);

  /**
   * COSMETIC PRICES ARE RE-PRICED AT THE POINT OF USE. (Aug 8, 2026.)
   *
   * Coins moved from 1-per-5-XP to 1-per-2-XP when the ledger shipped, so they
   * now arrive two and a half times faster. At the original prices (40-120) the
   * entire catalogue would be cleared in about a fortnight, and an empty store
   * is a dead store.
   *
   * The new costs live in `data/rewardCatalog.js` as an override map rather
   * than being edited into `lib/rewards.js`, because that file's definitions
   * are also the source of names, icons and rocket colours, and its
   * DEFAULT_REWARDS are already seeded into the parent's database — editing it
   * risks disturbing live rows for a change that is purely presentational here.
   *
   * Free defaults stay free: costForCosmetic returns 0 for the Cadet avatar and
   * Classic White rocket, so the student always has one of each.
   */
  const pricedAvatars = useMemo(
    () => AVATARS.map((a) => ({ ...a, cost: costForCosmetic(a.id, a.cost) })),
    []
  );
  const pricedRockets = useMemo(
    () => ROCKETS.map((r) => ({ ...r, cost: costForCosmetic(r.id, r.cost) })),
    []
  );

  const owns = (item) => item.cost === 0 || (unlocked || []).includes(item.id);

  // Sound fires only on a SUCCESSFUL spend. A failed purchase ("not enough
  // coins") stays silent on purpose — the message already says so, and a noise
  // on top of it turns a normal "not yet" into a buzzer.
  const buy = async (item) => {
    unlockAudio(); // this click is a user gesture; browsers need one before any audio
    const res = await redeemCosmetic(item);
    if (res.ok) playAchievement(); // unlocking something new is worth more than a click
    setMsg(res.ok ? `Unlocked ${item.name}! Tap Equip to wear it.` : 'Not enough coins yet — keep going!');
  };
  const equip = (item) => {
    unlockAudio();
    playPurchase();
    equipCosmetic(item);
  };
  const claim = async (reward) => {
    unlockAudio();
    const res = await redeemReward(reward);
    if (res.ok) playPurchase();
    if (!res.ok) {
      setMsg('Not enough Credits for that yet — keep going.');
      return;
    }
    // Say which of the two things just happened. "Waiting for a parent to
    // approve it" was shown for BOTH outcomes, including instant ones, so a
    // reward he had already earned outright read as though it were on hold.
    setMsg(
      res.auto
        ? `"${reward.name}" is yours — go and take it.`
        : `Requested "${reward.name}". ${res.reason || 'A parent approves this one.'} It goes with your next handoff.`
    );
  };

  const liveRewards = (rewards || []).filter((r) => r.active !== false && !r.deletedAt);
  const realWorldRewards = liveRewards.filter((r) => r.kind !== 'dream');
  const dreamRewards = liveRewards.filter((r) => r.kind === 'dream');
  const myRewardRedemptions = (redemptions || []).filter((r) => r.kind === 'reward');

  const STATUS_STYLE = {
    pending: 'border-signal-amber/40 bg-signal-amber/10 text-signal-amber',
    approved: 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan',
    fulfilled: 'border-signal-green/40 bg-signal-green/10 text-signal-green',
    denied: 'border-signal-red/40 bg-signal-red/10 text-signal-red'
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div className="rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-2 text-sm text-ink-100">{msg}</div>
      )}

      {showCoins && (
      <>
      {/**
        * ---- AVATARS ARE A COIN PURCHASE, SO THEY LIVE IN THE COIN HALF ----
        *
        * (Aug 25, 2026.) The parent: **"Why is it in both reward and my
        * stuff?"**
        *
        * This block used to sit ABOVE the `showCoins` wrapper, which meant it
        * rendered in both halves — so ten avatars priced in coins appeared in
        * the Rewards tab, which is the CREDITS wallet, next to the real-world
        * rewards Mom has to approve. Themes and Rocket Skins were moved inside
        * when the store was split two days ago. This one was already above the
        * line and nobody noticed it stayed there.
        *
        * The bug was invisible precisely because the section looked correct
        * wherever you happened to be standing: right in Shop, and plausible in
        * Rewards. Only opening both tabs shows the same thing twice.
        */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Avatars</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {pricedAvatars.map((item) => (
            <CosmeticCard
              key={item.id}
              item={item}
              owned={owns(item)}
              equipped={equippedAvatar === item.id}
              canAfford={coinBalance >= item.cost}
              onBuy={buy}
              onEquip={equip}
            />
          ))}
        </div>
      </div>

      {/**
        * ---- THEMES: THE ONE PURCHASE HE CANNOT MISS (Aug 25, 2026) ----
        *
        * The parent: **"Is there a way that he can change his mission board
        * color or format via purchase from the store?"** There was not — not
        * a setting, not a field, not a catalogue entry, and no mechanism for
        * one, because every colour was a literal hex baked into a class name.
        *
        * Put first in the store on purpose. She asked this in the same message
        * as three purchases he could not see, and a theme is the answer to
        * that: it repaints every screen he opens for the rest of the year.
        *
        * The card is a real preview — the page colour, a panel, and the accent
        * on it — because the whole lesson of the rocket skins below is that a
        * cosmetic you cannot see in the shop is a gamble, not a product.
        */}
      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Board Themes</p>
        <p className="text-[11px] text-ink-500">
          Repaints the Mission Control board, the nav bar and every screen in the app.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {THEMES.map((item) => {
            const sw = themeSwatch(item);
            const isOwned = owns(item);
            const isOn = (equippedTheme || DEFAULT_THEME_ID) === item.id;
            return (
              <div
                key={item.id}
                className={
                  'overflow-hidden rounded-xl border shadow-panel ' +
                  (isOn ? 'border-signal-cyan/50' : 'border-space-700')
                }
              >
                {/* the theme, actually painted */}
                <div className="p-3" style={{ background: sw.bg }}>
                  <div
                    className="rounded-lg border p-2"
                    style={{ background: sw.panel, borderColor: sw.edge }}
                  >
                    <div className="h-1.5 w-10 rounded-full" style={{ background: sw.accent }} />
                    <div className="mt-1.5 h-1.5 w-16 rounded-full" style={{ background: sw.edge }} />
                    <div className="mt-1 h-1.5 w-12 rounded-full" style={{ background: sw.edge }} />
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span
                      className="rounded px-1.5 py-0.5 text-[9px] font-display font-700"
                      style={{ background: sw.accent, color: sw.bg }}
                    >
                      GO
                    </span>
                    <span className="text-[9px]" style={{ color: sw.accent }}>
                      {item.icon} {item.name}
                    </span>
                  </div>
                </div>
                <div className="bg-space-900 p-2.5">
                  <p className="font-display text-sm font-700 text-ink-100">{item.name}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-ink-500">{item.blurb}</p>
                  <p className="mt-1 text-[11px] text-ink-500">
                    {item.cost === 0 ? 'Free' : `🪙 ${item.cost}`}
                  </p>
                  <div className="mt-2">
                    {isOn ? (
                      <span className="block rounded-md border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-1 text-center text-xs font-display font-700 text-signal-cyan">
                        In use
                      </span>
                    ) : isOwned ? (
                      <button
                        type="button"
                        onClick={() => equip(item)}
                        className="w-full rounded-md border border-space-600 bg-space-800 px-2 py-1 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan"
                      >
                        Use it
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={coinBalance < item.cost}
                        onClick={() => buy(item)}
                        className="w-full rounded-md bg-signal-cyan px-2 py-1 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:bg-space-700 disabled:text-ink-500"
                      >
                        {coinBalance >= item.cost ? 'Buy' : 'Not yet'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Rocket Skins</p>
        <p className="text-[11px] text-ink-500">
          The rocket on your Mission Control board and your Launch Progress meter.
        </p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {pricedRockets.map((item) => (
            <CosmeticCard
              key={item.id}
              item={item}
              owned={owns(item)}
              equipped={equippedRocket === item.id}
              canAfford={coinBalance >= item.cost}
              onBuy={buy}
              onEquip={equip}
            />
          ))}
        </div>
      </div>

      <SupplySection />
      </>
      )}

      {showCredits && (
      <>

      {/**
        * REAL-WORLD REWARDS ARE PRICED IN CREDITS, AND NOW SAY SO.
        *
        * Two things were wrong here until Aug 9, 2026 and they compounded.
        * The prices came from the Aug 6 coin-era seed rather than the
        * designed Credit ladder, so a museum day read 250 when it was meant
        * to read 1,500. And affordability was checked against the COIN
        * balance while `redeemReward` spent CREDITS — two different wallets —
        * so the button could sit enabled on something he could not buy, or
        * greyed out on something he could. Both now read the Credit balance,
        * and the tier is shown so the ladder is visible rather than implied.
        */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Real-World Rewards</p>
          <p className="text-[11px] text-ink-500">Paid for with 🎟️ Credits — you have {creditBalance}.</p>
        </div>
        {realWorldRewards.length === 0 ? (
          <p className="mt-2 text-sm text-ink-500">
            No real-world rewards yet — a parent can add them (like extra screen time) in the Parent Dashboard.
          </p>
        ) : (
          <div className="mt-2 space-y-2">
            {realWorldRewards.map((reward) => {
              const canAfford = creditBalance >= reward.cost;
              return (
                <div key={reward.id} className="flex items-center justify-between gap-3 rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                  <div className="min-w-0">
                    <p className="font-display text-sm font-700 text-ink-100">{reward.name}</p>
                    <p className="text-[11px] text-ink-500">
                      {reward.tier ? <span className="text-ink-300">{reward.tier}</span> : null}
                      {reward.tier && reward.requiresParent ? ' · ' : ''}
                      {reward.requiresParent ? 'A parent says yes to this one' : null}
                      {reward.note ? (reward.tier || reward.requiresParent ? ' · ' : '') + reward.note : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!canAfford}
                    onClick={() => claim(reward)}
                    className={
                      'flex-none rounded-md px-3 py-1.5 text-xs font-display font-700 transition ' +
                      (canAfford ? 'bg-signal-amber text-space-950 hover:brightness-110' : 'cursor-not-allowed border border-space-700 text-ink-600')
                    }
                  >
                    {canAfford ? `Redeem · 🎟️ ${reward.cost}` : `Need 🎟️ ${reward.cost}`}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/**
        * Dream Rewards were designed on Aug 8 and, like the rest of the
        * catalog, reached no screen. They are the year-long goal — 2,000
        * Credits, roughly half a school year — so they are shown even when
        * they are far out of reach. A goal you cannot see is not a goal.
        */}
      {dreamRewards.length > 0 && (
        <div>
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Dream Rewards · 🎟️ 2,000</p>
          <p className="text-[11px] text-ink-500">
            The big one. About half a school year of work — pick the one you are aiming at.
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {dreamRewards.map((reward) => {
              const canAfford = creditBalance >= reward.cost;
              const pct = Math.min(100, Math.round((creditBalance / Math.max(1, reward.cost)) * 100));
              return (
                <div key={reward.id} className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display text-sm font-700 text-ink-100">
                        {reward.icon ? reward.icon + ' ' : ''}{reward.name}
                      </p>
                      {reward.note && <p className="text-[11px] text-ink-500">{reward.note}</p>}
                    </div>
                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => claim(reward)}
                      className={
                        'flex-none rounded-md px-2.5 py-1 text-xs font-display font-700 transition ' +
                        (canAfford ? 'bg-signal-cyan text-space-950 hover:brightness-110' : 'cursor-not-allowed border border-space-700 text-ink-600')
                      }
                    >
                      {canAfford ? 'Redeem' : `${pct}%`}
                    </button>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-space-800">
                    <div className="h-full rounded-full bg-signal-cyan/70" style={{ width: pct + '%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {myRewardRedemptions.length > 0 && (
        <div>
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">My reward requests</p>
          <div className="mt-1 space-y-1">
            {myRewardRedemptions.slice(0, 8).map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="min-w-0 truncate text-ink-400">{r.rewardName} · 🎟️ {r.cost}</span>
                <span className={'flex-none rounded-full border px-2 py-0.5 font-display ' + (STATUS_STYLE[r.status] || 'text-ink-500')}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
          {myRewardRedemptions.some((r) => r.status === 'pending') && (
            <p className="mt-1 text-[11px] text-ink-500">
              Waiting on a parent? Send her your work from the Handoff card — a request travels with it,
              and her answer comes back the same way.
            </p>
          )}
        </div>
      )}
      </>
      )}
    </div>
  );
}

function CertificateModal({ cert, onClose }) {
  // Toggle a body class so the print stylesheet shows ONLY the certificate
  // (not the rest of the page), then clean it up once the print dialog is done.
  const handlePrint = () => {
    document.body.classList.add('printing-certificate');
    const cleanup = () => {
      document.body.classList.remove('printing-certificate');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-space-950/80 p-4">
      <div className="w-full max-w-2xl">
        <div className="certificate-print rounded-2xl border-4 border-signal-amber/60 bg-space-800 p-8 text-center shadow-glow">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-signal-cyan">Mission Control Homeschool Academy</p>
          <p className="mt-6 font-display text-sm uppercase tracking-widest text-ink-500">Certificate of Achievement</p>
          {/* Name and date added Aug 8, 2026. These print, they go in the
              binder, and they are part of a Georgia homeschool record — a
              certificate carrying neither is not evidence of anything. */}
          <p className="mt-4 text-[11px] font-display uppercase tracking-widest text-ink-500">Presented to</p>
          <p className="font-display text-xl font-700 text-signal-cyan">{STUDENT_NAME}</p>
          <p className="mt-4 text-4xl">{cert.icon}</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">{cert.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-300">{cert.subtitle}</p>
          {cert.awardedOn && (
            <p className="mt-4 text-xs text-ink-500">
              Awarded <span className="text-ink-300">{cert.awardedOn}</span>
            </p>
          )}
          <div className="mt-8 flex items-center justify-center gap-10">
            <div className="text-center">
              <div className="h-px w-32 bg-space-600" />
              <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-500">Commander Nova</p>
            </div>
            <div className="text-center">
              <div className="h-px w-32 bg-space-600" />
              <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-500">Parent / Guardian</p>
            </div>
          </div>
        </div>
        <div className="print-hide mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
          >
            Print / Save as PDF
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-space-600 px-4 py-2 text-sm font-display font-700 text-ink-100 transition hover:border-signal-cyan"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * `CertificatesSection` was deleted on Aug 25, 2026 and `MissionsSection` with
 * it. Neither was broken; both were a second copy of something already on the
 * screen.
 *
 *   - CERTIFICATES generated ids `rank-2`..`rank-8` from RANKS, with the same
 *     icon and the same unlock test as seven of the badges. Its only unique
 *     capability, printing, is now a button on the badge itself. Until Tier 2
 *     the whole tab rendered one grey sentence.
 *
 *   - MISSIONS listed the same eight RANKS the Journey already draws as eight
 *     destinations, computing the same percentage from the same
 *     `getProgressToNextRank`. `lib/journey.js` says in its own header that the
 *     journey was built to REPLACE the "Tier 6 of 8" presentation — and then
 *     nobody removed the thing it replaced. Both survived because each was
 *     individually correct.
 *
 * `CertificateModal` below is kept and still used: the print itself lives on.
 */
function ReadinessSection() {
  const readinessAwards = useAppStore((s) => s.readinessAwards);
  const awardedCount = Object.keys(readinessAwards || {}).length;
  return (
    <div>
      <p className="mb-3 text-sm text-ink-300">
        Engineer Readiness tracks real engineering skills that no test measures — awarded by your parent as you show
        them in projects, builds, and presentations. {awardedCount} of {READINESS_SKILLS.length} started.
      </p>
      {/* "What it takes" is the entire point of showing the rubric here. These
          eleven skills used to be awarded against criteria that existed
          nowhere, so there was no way to aim at one. */}
      <p className="mb-3 text-[11px] text-ink-500">
        Each card shows exactly what to demonstrate for your next level. Nothing here is a test — these are earned by
        doing real work and being seen doing it.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {READINESS_SKILLS.map((skill) => {
          const award = readinessAwards[skill.id];
          const style = award ? LEVEL_STYLE[award.level] : null;
          return (
            <div
              key={skill.id}
              className={'rounded-xl border p-3 text-center shadow-panel ' + (award ? `${style.ring} ${style.bg}` : 'border-space-700 bg-space-900')}
            >
              <div className={'text-3xl ' + (award ? '' : 'opacity-30 grayscale')}>{skill.icon}</div>
              <p className={'mt-1 font-display text-sm font-700 ' + (award ? 'text-ink-100' : 'text-ink-500')}>{skill.name}</p>
              <p className="mt-0.5 text-[11px] text-ink-500">{skill.desc}</p>
              <p className={'mt-1 text-[10px] font-display uppercase tracking-widest ' + (award ? style.text : 'text-ink-500')}>
                {award ? award.level : 'Not yet'}
              </p>
              {award?.updatedAt && (
                <p className="mt-0.5 text-[10px] text-ink-500">
                  {formatAwardDate(String(award.updatedAt).slice(0, 10))}
                </p>
              )}
              {(() => {
                const target = nextLevel(award?.level);
                if (!target) {
                  return (
                    <p className="mt-2 border-t border-space-700 pt-2 text-[10px] font-display uppercase tracking-widest text-signal-amber">
                      Gold — top level reached
                    </p>
                  );
                }
                const criteria = criteriaFor(skill.id, target);
                if (!criteria) return null;
                return (
                  <div className="mt-2 border-t border-space-700 pt-2 text-left">
                    <p className="text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                      To reach {target}
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-ink-300">{criteria}</p>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RewardsHome() {
  // Lands on Journey, not Missions: it is the screen that answers "where am I
  // and where am I going" in one look, and it reads well even at zero XP.
  /**
   * Opens on Shop, not on Journey.
   *
   * The old default was the tab furthest from anything he can do — eight
   * read-only destination cards. He comes to this screen having earned coins;
   * the first thing he should see is what they buy. Progress is one tap away
   * and is not going anywhere.
   */
  const [tab, setTab] = useState('shop');

  const equippedAvatar = useAppStore((s) => s.equippedAvatar);
  const currentRank = useAppStore((s) => s.currentRank);

  /**
   * THE SNAPSHOT COMES FROM THE STORE NOW. (Fixed Aug 8, 2026.)
   *
   * This component used to build its own `stats` object from eight slices. It
   * had drifted badly from `getGamificationStats()` and was breaking three
   * separate things at once:
   *
   *   1. TWENTY-EIGHT BADGES COULD NEVER BE EARNED. The Aug 8 expansion added
   *      gardening, guitar, field trips, books, meals and assignments — none of
   *      which existed in the local object. Every one of those badges read
   *      `undefined || 0` and sat permanently at zero, however much real work
   *      was behind it. The badges were fine; this screen could not see them.
   *
   *   2. THE STREAK FIX WAS SILENTLY UNDONE HERE. Badges test
   *      `(s.longestStreak ?? s.streak)`. With no `longestStreak` in the local
   *      object they fell through to the LIVE streak — reinstating, in this one
   *      screen, exactly the un-earning bug that was fixed that morning.
   *
   *   3. THE COIN BALANCE ON SCREEN WAS NOT THE ONE BEING SPENT. This computed
   *      `floor(xp / 5) - coinsSpent`: the pre-ledger model, at the old rate.
   *      Purchases go through `getCoinBalance()`, which folds the ledger at the
   *      current rate. The header showed one number while the store enforced
   *      another, and parent grants and challenge payouts were invisible
   *      entirely. A balance a child cannot trust is worse than showing none.
   *
   * One source of truth now. Subscribing to the slices and memoising is the
   * pattern Batch B established for the six ParentDashboard getters: a getter
   * called bare in a render body never re-subscribes, so the panel would only
   * refresh by luck.
   */
  const xp = useAppStore((s) => s.xp);
  const ledger = useAppStore((s) => s.ledger);
  const streak = useAppStore((s) => s.streak);
  const longestStreak = useAppStore((s) => s.longestStreak);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const khanAcademyAssignments = useAppStore((s) => s.khanAcademyAssignments);
  const writingEntries = useAppStore((s) => s.writingEntries);
  const peWorkoutLog = useAppStore((s) => s.peWorkoutLog);
  const peMeals = useAppStore((s) => s.peMeals);
  const portfolio = useAppStore((s) => s.portfolio);
  const gardenLog = useAppStore((s) => s.gardenLog);
  const guitarLog = useAppStore((s) => s.guitarLog);
  const fieldTrips = useAppStore((s) => s.fieldTrips);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const getGamificationStats = useAppStore((s) => s.getGamificationStats);

  const stats = useMemo(
    () => getGamificationStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      getGamificationStats, xp, ledger, streak, longestStreak, lessonProgress,
      khanAcademyAssignments, writingEntries, peWorkoutLog, peMeals, portfolio,
      gardenLog, guitarLog, fieldTrips, academicBooks, academicAssignments, currentRank
    ]
  );

  const totalMastered = stats.totalMastered;
  const coinsEarned = stats.coinsEarned;
  const coinsSpent = stats.coinsSpent;
  const coinBalance = stats.coinBalance;
  // Two wallets, and the store needs both: Coins buy cosmetics and Supply
  // items instantly, Credits buy real-world rewards. Passing only the coin
  // balance is what let the Real-World list check the wrong one.
  const creditBalance = stats.creditBalance;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{avatarIconFor(equippedAvatar)}</span>
          <div>
            <h1 className="font-display text-xl font-700 text-ink-100">Rewards</h1>
            <p className="text-xs text-ink-500">Earn coins by doing real work — spend them here.</p>
          </div>
        </div>
        <div className="text-right">
          <CoinChip balance={coinBalance} />
          <p className="mt-1 text-[10px] text-ink-600">{coinsEarned} earned · {coinsSpent || 0} spent</p>
        </div>
      </div>

      {/**
        * ===================================================================
        * ELEVEN TABS BECAME FOUR. (Aug 25, 2026.)
        * ===================================================================
        *
        * The parent: **"I don't like the reward section. It is overwhelming.
        * There are 11 tabs. Can we clean this up?"**
        *
        * Eleven was the symptom. The cause was that several tabs held the same
        * content twice, and each had been added on its own day for a good
        * reason to a screen that was already full — the same way the Mission
        * Control board reached 25 tappable things before she asked for that one
        * to be rebuilt on Aug 9. Nothing was ever subtracted.
        *
        * WHAT WAS ACTUALLY DUPLICATED:
        *   - Journey and Missions drew the same eight RANKS, from the same
        *     array, with the same percentage. Deleted Missions.
        *   - Certificates were seven of the fifty-one badges plus a print
        *     button. Deleted the tab, moved the print onto the badge.
        *   - Dream Rewards were cards in the Store AND a whole Dream Goal tab.
        *     Now one place: they sit together in Rewards.
        *   - The coin balance appeared three times — the header, the store and
        *     the History hero. The header keeps it.
        *   - Inventory told him to "change these in the Store tab"; the HQ room
        *     inside Inventory showed unowned items with prices, so the
        *     inventory was partly a store. Buying is in Shop now; My Stuff
        *     shows what he owns.
        *
        * THE FOUR ARE VERBS, NOT CATEGORIES. Shop (spend coins), My Stuff (what
        * I own), Progress (how I am doing), Rewards (spend credits — the half
        * that needs a parent). The Shop/Rewards line is the two-currency rule
        * Nova already teaches, made structural instead of explained.
        *
        * NOTHING WAS DELETED THAT HE COULD NOT ALREADY SEE SOMEWHERE ELSE.
        */}
      <div className="mt-4 inline-flex flex-wrap gap-1 rounded-lg bg-space-800 p-1 shadow-panel">
        <TabButton active={tab === 'shop'} onClick={() => setTab('shop')}>Shop</TabButton>
        <TabButton active={tab === 'mine'} onClick={() => setTab('mine')}>My Stuff</TabButton>
        <TabButton active={tab === 'progress'} onClick={() => setTab('progress')}>Progress</TabButton>
        <TabButton active={tab === 'rewards'} onClick={() => setTab('rewards')}>Rewards</TabButton>
      </div>

      <div className="mt-5">
        <NovaTabGuide tab={tab} />

        {/* ---- SHOP — coins, instant, no parent involved ---- */}
        {tab === 'shop' && (
          <div className="space-y-6">
            <StoreSection coinBalance={coinBalance} creditBalance={creditBalance} half="coins" />
            {/* The receipt belongs with the wallet it drains, not in a tab of
                its own. Compact: he needs the last few rows, not fifty. */}
            <HistorySection compact />
          </div>
        )}

        {/* ---- MY STUFF — everything he owns, and nothing he can buy ---- */}
        {tab === 'mine' && (
          <div className="space-y-6">
            <InventorySection />
            <ShipSection stats={stats} />
          </div>
        )}

        {/* ---- PROGRESS — what is live now, then the record of what is done ---- */}
        {tab === 'progress' && (
          <div className="space-y-6">
            {/* Challenges first: the only two buttons in this whole screen that
                EARN him anything. Everything below is a record of the past. */}
            <ChallengesSection />
            <JourneySection xp={xp || 0} totalMastered={totalMastered} currentRank={currentRank} />
            <BadgesSection stats={stats} />
            <ReadinessSection />
          </div>
        )}

        {/* ---- REWARDS — credits, real things, and Mom has to say yes ---- */}
        {tab === 'rewards' && (
          <div className="space-y-6">
            <StoreSection coinBalance={coinBalance} creditBalance={creditBalance} half="credits" />
            <DreamGoalSection />
          </div>
        )}
      </div>
    </div>
  );
}
