// ---------------------------------------------------------------------------
// THERE IS A PLACE TO SAVE, AND THE MATCH IS HONEST.
// Run: node scripts/verify-dream-goals.mjs
//
// ---- WHERE THIS CAME FROM (Aug 16, 2026) ----
//
// The parent: "He's banking something he can't spend."
//
// Half right, and the half she had wrong is the important one. SPENDING
// already worked — redeemReward has taken Credits and raised a parent approval
// since Aug 9, and the parent approve/deny UI has been on her dashboard just as
// long. What did not exist, in any file, was SAVING.
//
// `dreamMatchFor()` had been sitting in lib/economy.js since the economy
// shipped: exported, documented, tested by nothing, called by nothing. The
// third time this project has found reasoning that was written down and never
// wired to a screen — after hasLaterQuarterLessons and the offline-instruction
// note.
//
// The consequence was not cosmetic. The Credit ladder runs to a 2,000-Credit
// Dream Reward, and a boy earning ~50-95 Credits a week with nowhere to hold
// money still has a 50-Credit privilege in front of him at all times.
// **Without a savings account, every economy collapses to its cheapest item.**
// The top four rungs of a ladder the parent approved were unreachable in
// practice, and nothing said so.
// ---------------------------------------------------------------------------
import './lib/academy-under-test.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ec = await import(REPO + '/src/lib/economy.js');

let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

/**
 * Source with comments removed.
 *
 * An ABSENCE check must never be run against a file's prose. This project has
 * now been caught by that three times in one day: the XP_PER_COIN guard matched
 * a comment quoting the line it was asserting had gone; the milestone guard
 * matched a comment explaining which function was deliberately NOT used; and
 * the crate's no-countdown guard matched the words "No countdown, per D10."
 *
 * The rule, stated once so it stops recurring: **assert presence against the
 * file, assert absence against the code.**
 */
const codeOnly = (rel) => read(rel).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
const store = read('src/store/useAppStore.js');
const fnBody = (name) => {
  const i = store.indexOf(name);
  return i === -1 ? '' : store.slice(i, store.indexOf('\n  },', i));
};

console.log('\n--- 1. the match, arithmetically ---');
{
  ok('one in four', ec.DREAM_MATCH_RATE === 0.25);
  ok('save 4, get 1', ec.dreamMatchFor(4) === 1);
  ok('save 1,600 toward a 2,000 goal and the parent covers 400',
    ec.dreamMatchFor(1600) === 400,
    'the exact worked example in the design brief');
  ok('it rounds DOWN, never up', ec.dreamMatchFor(7) === 1 && ec.dreamMatchFor(3) === 0,
    'a match that rounds up pays for saving that did not happen');
  ok('nothing saved, nothing matched', ec.dreamMatchFor(0) === 0);
  ok('negative input cannot mint Credits', ec.dreamMatchFor(-500) === 0);
}

console.log('\n--- 2. the ladder is reachable now ---');
{
  const top = ec.CREDIT_LADDER[ec.CREDIT_LADDER.length - 1];
  ok('the top rung is the 2,000-Credit Dream Reward', top.credits === 2000 && /Dream/.test(top.tier));
  ok('...and with the match he needs to save 1,600 of it',
    1600 + ec.dreamMatchFor(1600) >= top.credits,
    'before this existed there was no way to hold 1,600 Credits still');
}

console.log('\n--- 3. saving takes the money out of his hand ---');
{
  const reserve = fnBody('async reserveToDreamGoal');
  ok('reserving writes a real ledger entry', /addLedgerEntry\(\{[\s\S]*?amount: -n/.test(reserve),
    'the money leaves his spendable balance the moment he saves it');
  ok('...and refuses what he cannot afford', /getCreditBalance\(\) < n/.test(reserve));
  ok('...and is NOT counted against the weekly instant-purchase cap',
    /source: 'dream-reserve'/.test(reserve) && !/source: 'auto'/.test(reserve),
    "only source:'auto' counts against the cap — saving must never use up his ability to buy something small");
  ok('the goal row never holds the money itself',
    !/balance/.test(fnBody('  dreamGoalProgress(goal)')),
    'one account of where his Credits are, and it is the ledger');
}

console.log('\n--- 4. taking it back is allowed, and costs the match ---');
{
  const un = fnBody('async unreserveFromDreamGoal');
  ok('he gets back exactly what he put in', /amount: n,\s*\n\s*kind: 'refund'/.test(un),
    'never a penalty — he is never worse off than if he had not saved');
  ok('...and no match is paid on it', !/dreamMatchFor/.test(un),
    'the match pays for saving that was committed; this is the moment it stops being');
  ok('...and he cannot withdraw more than he saved', /n > reserved/.test(un));

  const abandon = fnBody('async abandonDreamGoal');
  ok('cancelling the goal returns everything', /amount: reserved/.test(abandon));
  ok('...with no match, for the same reason', !/dreamMatchFor/.test(abandon));

  const ui = read('src/components/Rewards/DreamGoalSection.jsx');
  ok('the screen states the cost BEFORE he taps, not after',
    /The match only\s*\n?\s*pays on Credits you leave in/.test(ui) || /match only pays on Credits you leave in/.test(ui.replace(/\s+/g, ' ')),
    'a rule discovered afterwards is a trick, not a lesson');
  ok('...and "take some back" is offered plainly, not hidden',
    /Take some back/.test(ui));
}

console.log('\n--- 5. claiming ---');
{
  const claim = fnBody('async claimDreamGoal');
  ok('a goal below target cannot be claimed', /if \(!progress\.ready\)/.test(claim));
  ok('the Credits are not taken a second time',
    !/amount: -progress\.total/.test(claim),
    'they left his balance as he reserved them');
  ok('the match is written to the ledger so he can SEE her contribution',
    /kind: 'match'/.test(claim));
  ok('a Dream Reward ALWAYS waits for a parent',
    /status: 'pending'/.test(claim) && !/creditPurchaseApproval/.test(claim),
    'whatever the arithmetic says — it is a museum day or a telescope');
  ok('...and the goal is closed, so it cannot be claimed twice',
    /status: 'achieved'/.test(claim));
  ok('claiming raises an ordinary redemption, into the queue she already has',
    /addRewardRedemptionRecord\(redemption\)/.test(claim),
    'no second approval system');
}

console.log('\n--- 6. one goal, and it travels between the two computers ---');
{
  ok('a second goal cannot be opened while one is running',
    /if \(get\(\)\.getActiveDreamGoal\(\)\) return \{ ok: false, reason: 'already-active' \}/.test(fnBody('async createDreamGoal')),
    'choosing is the lesson; two goals is a wish list');

  ok('dreamGoals is in the EXPORT', /dreamGoals: state\.dreamGoals/.test(store),
    'rewardRedemptions was missing from the export until Aug 9 and approvals were impossible — same round trip');
  ok('...and merges by syncId on import', /const dreamGoalMerge = mergeBySyncId\(/.test(store));
  ok('...and the merge does NOT sum reservedCredits across machines',
    /reservedCredits is NOT summed/.test(store),
    'the reserve is a ledger entry and the ledger merges by union — summing here would double every saved Credit');
  ok('the reset path clears goals too', /dreamGoals: \[\],/.test(store));

  const db = read('src/db/db.js');
  ok('the table is additive, keyed by syncId', /dreamGoals: 'syncId, status, createdAt'/.test(db));
}

console.log('\n--- 7. it is reachable from his screen ---');
{
  /**
   * ---- REACHABLE, NOT NECESSARILY A TAB (Aug 25, 2026) ----
   *
   * This asserted `setTab('dream')` until the Rewards screen went from eleven
   * tabs to four and the dream goal moved in beside the real-world rewards it
   * saves toward. The heading on this very section says what is being
   * protected — **it is reachable from his screen** — and it still is. The tab
   * was the punctuation; reachability is the property.
   *
   * So: the section must be RENDERED somewhere in the Rewards screen, and Nova
   * must still explain the savings match wherever it now lives.
   */
  const home = read('src/components/Rewards/RewardsHome.jsx');
  ok('the dream goal is rendered on the Rewards screen',
    /<DreamGoalSection \/>/.test(home),
    'if this is ever built and mounted nowhere it joins the four other components that were');

  const nova = read('src/components/Rewards/NovaTabGuide.jsx');
  const guides = nova.slice(nova.indexOf('const GUIDES = {'));
  ok('Nova explains the savings match on whichever tab it lives on',
    /dream goal/i.test(guides) && /match/i.test(guides));

  /**
   * D12: Nova has zero purchase-prompting lines. Checked across EVERY guide
   * now rather than only the dream one — the tabs merged, so a prompt could
   * arrive from any of the four and land next to the savings pitch.
   */
  const prompts = [...guides.matchAll(/\b(buy it|purchase|go and spend|spend it)\b/gi)].map((m) => m[0]);
  ok('...without once prompting him to buy anything',
    prompts.length === 0,
    'design decision D12 — enforced across all of Nova\'s guides: ' + prompts.join(', '));
}

console.log('\n--- 8. the monthly crate is a surprise, not a gamble ---');
{
  const sc = await import(REPO + '/src/lib/supplyCrate.js');
  const { COIN_CATALOG } = await import(REPO + '/src/academies/lamar/data/rewardCatalog.js');

  /**
   * D11, approved months ago and never built. Every clause of it is doing
   * safety work on a product aimed at a twelve-year-old.
   */
  const a = sc.crateOfferFor('2026-09', []);
  const b = sc.crateOfferFor('2026-09', []);
  ok('the month decides the item, so there is nothing to re-roll', a.id === b.id,
    'Math.random() here would have been a re-roll button nobody built — the getMasteryMessage bug again');
  ok('...and a different month is a different crate',
    sc.crateOfferFor('2026-10', []).id !== a.id);

  const floorBreaches = [];
  for (const mk of ['2026-08','2026-09','2026-10','2026-11','2026-12','2027-01','2027-02','2027-03']) {
    const item = sc.crateOfferFor(mk, []);
    if (!item || item.cost < sc.CRATE_COST) floorBreaches.push(mk);
  }
  ok('EVERY month pays out at least what the crate costs', floorBreaches.length === 0,
    'the guaranteed floor is the single line separating a surprise from a gamble: which one, never whether');
  ok('...and the eligible pool really is filtered, not just lucky',
    COIN_CATALOG.filter((i) => i.cost >= sc.CRATE_COST).length < COIN_CATALOG.length,
    'half the catalogue is below the floor, so an unfiltered pick would have lost him Coins');

  ok('it never offers something he already owns',
    sc.crateOfferFor('2026-09', [a.id]).id !== a.id);
  ok('...and when he owns everything, it sells him nothing',
    sc.crateOfferFor('2026-09', COIN_CATALOG.map((i) => i.id)) === null,
    'taking his Coins for an empty crate is the worst version of this feature');

  ok('a month can only be opened once, tracked in the LEDGER not a flag',
    sc.crateOpenedIn('2026-09', [{ source: sc.crateSourceKey('2026-09') }]) === true &&
    sc.crateOpenedIn('2026-10', [{ source: sc.crateSourceKey('2026-09') }]) === false,
    'a flag can fall out of step with the money; a ledger entry cannot');

  const open = fnBody('async openSupplyCrate');
  ok('Coins only — a crate can never touch Credits', /currency: 'coin'/.test(open) && !/'credit'/.test(open),
    'real money is never on the other side of a random outcome');
  ok('...it refuses when already opened, sold out, unaffordable or switched off',
    /'already-opened'/.test(open) && /'nothing-left'/.test(open) &&
    /'insufficient'/.test(open) && /'disabled'/.test(open));

  const card = read('src/components/Rewards/SupplyStore.jsx');
  ok('the floor is stated to him BEFORE he opens it',
    /always worth at least the {crate.cost} Coins/.test(card.replace(/\s+/g, ' ')),
    'a fairness guarantee he only learns afterwards is not a guarantee');
  ok('...and there is no countdown anywhere on it',
    !/countdown|days left|hours left|expires/i.test(codeOnly('src/components/Rewards/SupplyStore.jsx')),
    'design decision D10 — a ticking clock is pressure, and "next month" is just a fact');

  const parent = read('src/components/Dashboard/CurrencyControlsSection.jsx');
  ok('she can switch it off', /setSupplyCrateEnabled/.test(parent));
  const store2 = read('src/store/useAppStore.js');
  ok('...and it is ON by default', /supplyCrateEnabled: meta\?\.supplyCrateEnabled !== false/.test(store2));
}

console.log('\n--- 9. the parent controls exist as a screen, not just an action ---');
{
  const parent = read('src/components/Dashboard/CurrencyControlsSection.jsx');
  ok('adjustCurrency finally has a caller', /adjustCurrency\(\{/.test(parent),
    'it shipped with the ledger and no screen ever called it');
  ok('a reason is REQUIRED, not optional',
    /note\.trim\(\)\.length > 0/.test(parent),
    'money with no reason attached reads as arbitrary on his history and teaches nothing');
  ok('...and deducting is offered plainly, for corrections', /Remove/.test(parent));
  ok('the section is registered on her dashboard',
    /\{ id: 'currency', label: 'Currency Controls' \}/.test(read('src/components/Dashboard/ParentDashboard.jsx')));

  const pd = read('src/components/Dashboard/ParentDashboard.jsx');
  ok('the approval row shows the currency it was actually requested in',
    /r\.currency === 'credit' \? '🎟️' : '🪙'/.test(pd),
    'it drew a coin on every row, including Credit requests — the two are deliberately not interchangeable');
  ok('...and the stale "1 coin for every 5 XP" copy is gone',
    !/1 coin for every 5 XP/.test(pd),
    'coins are 1 per 2 XP; that line had been wrong since the dual currency shipped');
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) {
  console.log(`\n${failures.length} CHECK(S) FAILED`);
  process.exitCode = 1;
} else {
  console.log('\nALL CHECKS PASSED');
}
