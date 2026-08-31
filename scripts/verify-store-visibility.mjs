// ---------------------------------------------------------------------------
// EVERY PURCHASE HAS TO CHANGE SOMETHING HE CAN SEE.
// Run with: node scripts/verify-store-visibility.mjs
//
// ---- WHY THIS EXISTS (Aug 25, 2026) ----
//
// The parent: **"he stated that he purchased the robo helper from the store and
// nothing happened, it didn't go anywhere. The avatars look the same... where
// does the mission equipment go after purchasing from the store. And the rocket
// skin all look the same in the store."**
//
// Four complaints, one fault underneath all of them. His coin ledger says he
// spent 1,575 coins across seven purchases between Aug 16 and Aug 19, and
// **1,175 of those coins bought something that could not be seen**:
//
//   Robo-Helper           150   an avatar, and the drawn figure ignored avatars
//   Deep-Space Violet     275   one path, on a screen he had to go and find
//   Gold Visor            400 \
//   Mission Boots         200  |  drawn correctly — under copy that told him
//   Flight Helmet         150 /   the screen showing them was "still being built"
//
// A store that takes real earned currency for an invisible change is worse than
// a store with fewer items in it. So this file asserts the property that makes
// the store honest: **for every purchasable id, something in the app renders
// differently because of that id.**
//
// ASSERT THE PROPERTY, NOT THE PUNCTUATION. Where a check must read source
// text, it asserts a real wiring (a prop being passed, a field reaching a fill)
// and absence is asserted against comment-stripped code — the notes on these
// fixes quote the old broken lines on purpose.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { AVATARS, ROCKETS, rocketColorFor, avatarIconFor } from '../src/lib/rewards.js';
import { MISSION_EQUIPMENT, AVATAR_GEAR, HQ_ITEMS, COSMETIC_REPRICE, costForCosmetic } from '../src/academies/lamar/data/rewardCatalog.js';
import { THEMES, DEFAULT_THEME_ID, themeById, themeSwatch, applyTheme } from '../src/lib/themes.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');
const codeOnly = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let failures = 0;
const ok = (cond, msg, detail) => {
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!cond) { failures++; if (detail) console.log('      ' + detail); }
};

const avatarSrc = read('src/components/Rewards/CadetAvatar.jsx');
const inventorySrc = read('src/components/Rewards/InventorySection.jsx');
const hqSrc = read('src/components/Rewards/HQRoom.jsx');
const storeSrc = read('src/components/Rewards/RewardsHome.jsx');
const meterSrc = read('src/components/Dashboard/RocketProgressMeter.jsx');
const boardSrc = read('src/components/Dashboard/MissionControlDashboard.jsx');
const appStoreSrc = read('src/store/useAppStore.js');

// ===========================================================================
console.log('\n--- 1. avatars are drawn characters, not glyphs ---');
// ===========================================================================
{
  /**
   * Read from source rather than imported. `AVATAR_FORMS` holds JSX render
   * functions, and node cannot import a .jsx file — the same reason every other
   * component check in this repo reads text. So the block for each form is
   * pulled out and compared as a unit, which still asserts the property that
   * matters: each id must have its own drawing, and no two may share one.
   */
  const formsBlock = (avatarSrc.match(/export const AVATAR_FORMS = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const formIds = [...formsBlock.matchAll(/^  '(avatar-[a-z-]+)': \{/gm)].map((m) => m[1]);
  const formBlocks = {};
  for (let i = 0; i < formIds.length; i += 1) {
    const start = formsBlock.indexOf(`  '${formIds[i]}': {`);
    const end = i + 1 < formIds.length ? formsBlock.indexOf(`  '${formIds[i + 1]}': {`) : formsBlock.length;
    formBlocks[formIds[i]] = formsBlock.slice(start, end);
  }
  const AVATAR_FORMS = Object.fromEntries(formIds.map((id) => [id, formBlocks[id]]));
  const DRAWN_AVATAR_IDS = formIds;

  /**
   * THE LOAD-BEARING CHECK. Every avatar in the shop must have a drawing, or
   * it is the Robo-Helper bug again: bought, saved, synced, never rendered.
   */
  const undrawn = AVATARS.filter((a) => !AVATAR_FORMS[a.id]);
  ok(undrawn.length === 0,
    'every avatar in the catalogue has a drawn form',
    undrawn.map((a) => `${a.id} (${a.name})`).join(', ')
      + '  <- an avatar with no form is a purchase that changes nothing');

  const orphanForms = DRAWN_AVATAR_IDS.filter((id) => !AVATARS.some((a) => a.id === id));
  ok(orphanForms.length === 0, 'no drawn form exists for an avatar nobody can buy', orphanForms.join(', '));

  /**
   * Distinctness. Six emoji where two were the same glyph is how "the avatars
   * look the same" happened; a form map where two ids share a drawing would be
   * the same failure one layer down.
   */
  const rendered = AVATARS.map((a) => (AVATAR_FORMS[a.id] || '').replace(/'[a-z-]+': \{/, ''));
  ok(new Set(rendered).size === rendered.length && rendered.every((r) => r.length > 40),
    `all ${AVATARS.length} avatar forms are visually distinct from each other`);

  ok(AVATARS.length >= 8, `the shop offers ${AVATARS.length} characters`, 'she asked for more options');

  // Non-human forms must bring their own head, or they render headless.
  const headless = Object.entries(AVATAR_FORMS)
    .filter(([, block]) => /human: false/.test(block) && !/\n    head: \(\) =>/.test(block));
  ok(headless.length === 0, 'every non-human form draws its own head', headless.map(([id]) => id).join(', '));

  // ---- and the screen must actually pass the avatar in ----
  ok(/<CadetAvatar avatar=\{equippedAvatar\}/.test(inventorySrc),
    'the Inventory screen passes the equipped avatar to the drawing',
    'this call took only `gear` for seventeen days — that omission IS the reported bug');
  ok(/avatar = DEFAULT_FORM_ID/.test(avatarSrc) && /AVATAR_FORMS\[avatar\] \|\| AVATAR_FORMS\[DEFAULT_FORM_ID\]/.test(avatarSrc),
    '...and an unknown avatar id falls back to the cadet rather than drawing nothing');

  /**
   * Gear must survive a change of character. He owns an Afro and a Flight Suit;
   * if equipping Robo-Helper silently dropped them, the fix would have taken
   * away two things he paid for while adding one.
   */
  ok(/const body = BODY\[gear\.body\] \|\| form\.suit/.test(avatarSrc),
    'gear he bought outranks the form default, so a uniform survives a character change');
  /**
   * ---- A POSE STILL WORKS, AND ONLY LOSES TO A STANCE (Aug 25, 2026) ----
   *
   * This asserted the exact expression `ARMS[gear.pose] || ARMS.default`. Then
   * stances arrived so the cadet could sit at a console, and the line became
   * `st?.arms || ARMS[gear.pose] || ARMS.default` — the property was still
   * true and the check failed on punctuation.
   *
   * Rewritten to assert what actually has to hold, which is stricter than what
   * was there before: an equipped pose IS consulted, and a stance may only
   * outrank it — never replace the lookup. The order in that chain is the whole
   * rule. `av-pose-liftoff` costs 500 coins; a chair must not delete it.
   */
  ok(/st\?\.arms \|\| ARMS\[gear\.pose\] \|\| ARMS\.default/.test(avatarSrc),
    '...and so does a pose, unless a station stance is overriding it',
    'the ORDER is the rule: stance first, then his paid-for pose, then the default');
  ok(/const st = STANCES\[stance\] \|\| null;/.test(avatarSrc)
      && /stance = 'stand'/.test(avatarSrc),
    '...and with no stance passed, the pose is what shows',
    'standing in the middle of the room he must be back to the pose he bought');

  // The Aug 16 rule must still hold on every human form.
  const faceIdx = avatarSrc.indexOf('{form.human && <Face');
  const hairFrontIdx = avatarSrc.indexOf('{showHair && <HairFront');
  ok(hairFrontIdx > 0 && faceIdx > hairFrontIdx,
    'the face is still drawn after the hairline — no hairstyle can cover his face',
    'the parent reported this one on Aug 16; the rebuild must not undo it');
}

// ===========================================================================
console.log('\n--- 2. rocket skins are visible before AND after buying ---');
// ===========================================================================
{
  const colors = ROCKETS.map((r) => r.color);
  ok(new Set(colors).size === colors.length, 'every rocket skin is a different colour');
  ok(ROCKETS.every((r) => rocketColorFor(r.id) === r.color), 'each id resolves to its own colour');

  /**
   * The reported bug: five identical cards. The card rendered `item.icon`, and
   * every rocket's icon is the same 🚀 — the colour, which IS the product, was
   * never passed to a pixel.
   */
  const icons = ROCKETS.map((r) => r.icon);
  ok(new Set(icons).size === 1,
    'the rocket icons really are all identical (this is why the card cannot use them)');
  ok(/<RocketSwatch color=\{item\.color\} \/>/.test(storeSrc),
    'the store card draws the rocket in its actual colour',
    'without this the shop shows five identical rockets at five different prices');
  ok(/item\.type === 'avatar' \? \(\s*<CadetAvatar avatar=\{item\.id\}/.test(storeSrc.replace(/\n\s*/g, '\n')) || /<CadetAvatar avatar=\{item\.id\}/.test(storeSrc),
    '...and the avatar card draws the actual character');

  // After buying: more of the rocket than one path, and on the screen he opens.
  const finFills = (meterSrc.match(/L-14 18[\s\S]{0,80}?fill=\{rocketColor\}/) || []).length;
  ok(finFills > 0, 'the skin colours the fins too, not only the body tube');
  ok(/<RocketProgressMeter xp=\{xp\} totalMastered=\{totalMastered\} currentRank=\{currentRank\} \/>/.test(boardSrc),
    'the rocket meter is on the Mission Control board, not only the Progress screen',
    'a skin drawn on one screen he has to go looking for is a skin he never sees');
}

// ===========================================================================
console.log('\n--- 3. mission equipment reaches the rack and the ship ---');
// ===========================================================================
{
  const SHIP_PARTS = ['eq-booster', 'eq-heatshield', 'eq-antenna', 'eq-solar'];
  const kitItems = MISSION_EQUIPMENT.filter((i) => !SHIP_PARTS.includes(i.id));

  const kitOrder = (hqSrc.match(/const KIT_ORDER = \[([\s\S]*?)\];/) || [, ''])[1]
    .split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean);

  /**
   * THE TEST THE COMMENT CLAIMED ALREADY EXISTED.
   *
   * HQRoom said "A test asserts the two lists match." It did not, and the list
   * carried `eq-gloves`, an id that has never been in MISSION_EQUIPMENT — so
   * the rack drew eight items across nine slots with a permanent hole in it.
   * A claimed test is worse than no test: it is the reason nobody looked.
   */
  const ghosts = kitOrder.filter((id) => !MISSION_EQUIPMENT.some((i) => i.id === id));
  ok(ghosts.length === 0, 'the rack hangs no item that does not exist in the catalogue', ghosts.join(', '));

  const missing = kitItems.filter((i) => !kitOrder.includes(i.id));
  ok(missing.length === 0,
    'every suit item in the catalogue has a place on the rack',
    missing.map((i) => i.id).join(', ') + '  <- purchasable but invisible');

  ok(kitOrder.length === kitItems.length,
    `the rack reserves exactly ${kitItems.length} slots for ${kitItems.length} items`,
    `KIT_ORDER has ${kitOrder.length} — a spare slot is a visible hole`);

  const kitArt = (hqSrc.match(/const KIT_ART = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const artIds = [...kitArt.matchAll(/'(eq-[a-z-]+)':/g)].map((m) => m[1]);
  const artGhosts = artIds.filter((id) => !MISSION_EQUIPMENT.some((i) => i.id === id));
  ok(artGhosts.length === 0, 'no drawing exists for an item nobody can buy', artGhosts.join(', '));

  /**
   * ---- THE COPY THAT ANSWERED HER QUESTION WITH "NOWHERE" ----
   *
   * Both of these described features that had already shipped. Absence checked
   * against code with comments stripped: the notes explaining the fix quote the
   * old sentences deliberately.
   */
  ok(!/still to come/.test(codeOnly(hqSrc)),
    'the ship-parts panel no longer says mounting them is "still to come"',
    'ShipDiagram has mounted them since the day it was written');
  ok(!/still\s*\n?\s*being built/.test(codeOnly(inventorySrc)),
    'the HQ list no longer says the room view is "still being built"',
    'the room is rendered fifty lines above that sentence');
  /**
   * The property is that the screen SAYS where a bought piece of equipment
   * ends up. It used to say "the Equipment Rack"; since equipment became
   * wearable it says it shows on his cadet, with the ship parts still pointed
   * at My Ship. Both are true answers to her question — the wording moved, the
   * obligation did not.
   */
  ok(/shows on your cadet/.test(inventorySrc) && /My Ship/.test(inventorySrc),
    'the Inventory screen tells him where his equipment actually went');
}

// ===========================================================================
console.log('\n--- 4. themes repaint the app, and are visible in the shop ---');
// ===========================================================================
{
  ok(THEMES.length >= 5, `${THEMES.length} themes exist`, 'there were none at all before today');
  ok(THEMES.filter((t) => t.cost === 0).length === 1, 'exactly one theme is free, like the Cadet and Classic White');
  ok(themeById(DEFAULT_THEME_ID).cost === 0, 'the default theme is the free one');
  ok(themeById('not-a-theme').id === DEFAULT_THEME_ID, 'an unknown theme id falls back rather than crashing');

  const accents = THEMES.map((t) => t.vars['--accent']);
  ok(new Set(accents).size === accents.length, 'every theme has a different accent colour');
  const bgs = THEMES.map((t) => t.vars['--space-900']);
  ok(new Set(bgs).size === bgs.length, '...and a different page colour');

  const REQUIRED = ['--space-950', '--space-900', '--space-800', '--space-700', '--space-600', '--accent', '--accent-glow'];
  const short = THEMES.filter((t) => REQUIRED.some((v) => !t.vars[v]));
  ok(short.length === 0,
    'every theme sets every variable',
    short.map((t) => t.id).join(', ') + '  <- a missing variable leaves the previous theme half-painted');

  // Channels, not hex — the whole opacity system depends on it.
  const badFormat = THEMES.filter((t) => REQUIRED.filter((v) => v !== '--accent-glow')
    .some((v) => !/^\d{1,3} \d{1,3} \d{1,3}$/.test(t.vars[v])));
  ok(badFormat.length === 0,
    'colours are space-separated RGB channels, not hex',
    badFormat.map((t) => t.id).join(', ')
      + '  <- hex here silently breaks every bg-signal-cyan/10 in the app');

  const tw = read('tailwind.config.js');
  ok(/cyan: 'rgb\(var\(--accent\) \/ <alpha-value>\)'/.test(tw),
    'the accent is wired to the variable, so one assignment repaints everything');
  ok(/900: 'rgb\(var\(--space-900\) \/ <alpha-value>\)'/.test(tw),
    '...and so is the page background');

  /**
   * The three semantic colours must NOT be themed. Green means mastered, amber
   * means XP, red means wrong — a theme that repainted them would make his
   * screen prettier and stop it meaning anything, on screens that carry a legal
   * attendance record.
   */
  ok(/amber: '#F5A524'/.test(tw) && /green: '#34D399'/.test(tw) && /red: '#F0555A'/.test(tw),
    'amber, green and red stay fixed — they mean something, they are not decoration');

  ok(applyTheme('theme-mars') === null || true, 'applyTheme is safe to call with no DOM');
  const sw = themeSwatch(themeById('theme-mars'));
  ok(/^rgb\(/.test(sw.accent) && /^rgb\(/.test(sw.bg),
    'the store swatch resolves real colours, so a theme is visible before it is bought');
  ok(/themeSwatch\(item\)/.test(storeSrc) && /Board Themes/.test(storeSrc),
    'the store shows a painted preview of each theme');
}

// ===========================================================================
console.log('\n--- 5. the choices persist, sync, and equip to the right field ---');
// ===========================================================================
{
  const code = codeOnly(appStoreSrc);

  ok(/equippedTheme: meta\?\.equippedTheme \?\? null/.test(code), 'the equipped theme is read back on load');
  ok(/equippedTheme: state\.equippedTheme/.test(code), '...travels in the export to the other computer');
  ok(/const equippedTheme = state\.equippedTheme \|\| importedData\.equippedTheme/.test(code), '...and merges on import');
  ok(/boardDensity: meta\?\.boardDensity === 'compact'/.test(code), 'the board density is read back on load');
  ok(/boardDensity: state\.boardDensity/.test(code), '...and travels too');

  /**
   * The old equipCosmetic was `item.type === 'avatar' ? avatar : rocket` — a
   * two-branch form where ANYTHING not an avatar became a rocket. Adding themes
   * to that would have equipped a theme as a rocket skin and lost both.
   */
  ok(/const FIELD = \{ avatar: 'equippedAvatar', rocket: 'equippedRocket', theme: 'equippedTheme' \};/.test(code),
    'equipping dispatches on type explicitly rather than falling through to rocket');
  ok(/if \(!field\) return \{ ok: false, reason: 'unknown-type' \}/.test(code),
    '...and an unrecognised type is refused instead of silently absorbed');

  ok(/applyTheme\(equippedTheme\)/.test(read('src/App.jsx')),
    'the theme is painted from one watched value, not at each place it can change',
    'equip, hydrate and an arriving import are three chances to forget the fourth');
}

// ===========================================================================
console.log('\n--- 6. against what he actually owns ---');
// ===========================================================================
{
  /**
   * Not a hypothetical. These seven ids are from the coin ledger in her Aug 23
   * export — every purchase he has made. The point of pinning them is that the
   * next person to touch this store finds out immediately if they have broken
   * something he already paid for.
   */
  const HIS = [
    'avatar-robot', 'rocket-violet', 'eq-visor-gold', 'eq-boots',
    'eq-helmet-basic', 'av-hair-afro', 'av-uniform-flight'
  ];
  const formIdsAgain = [...avatarSrc.matchAll(/^  '(avatar-[a-z-]+)': \{/gm)].map((m) => m[1]);
  const known = new Set([
    ...AVATARS.map((a) => a.id), ...ROCKETS.map((r) => r.id),
    ...MISSION_EQUIPMENT.map((i) => i.id), ...AVATAR_GEAR.map((g) => g.id),
    ...HQ_ITEMS.map((h) => h.id), ...THEMES.map((t) => t.id)
  ]);
  const lost = HIS.filter((id) => !known.has(id));
  ok(lost.length === 0, 'every item he has bought still exists in the catalogue', lost.join(', '));

  const robotBlock = (avatarSrc.match(/'avatar-robot': \{([\s\S]*?)\n  \},/) || [, ''])[1];
  ok(formIdsAgain.includes('avatar-robot') && /human: false/.test(robotBlock) && /head: \(\) =>/.test(robotBlock),
    'Robo-Helper — the 150 coins he spent on Aug 17 — is now a drawn robot');
  ok(rocketColorFor('rocket-violet') === '#A78BFA',
    'Deep-Space Violet still resolves to violet');
  ok(costForCosmetic('avatar-cadet', 0) === 0 && costForCosmetic('rocket-classic', 0) === 0,
    'the two free defaults stay free, so he always has an avatar and a rocket');

  const repriced = Object.keys(COSMETIC_REPRICE);
  const unpriced = [...AVATARS, ...ROCKETS].filter((c) => c.cost !== 0 && !repriced.includes(c.id));
  ok(unpriced.length === 0,
    'every paid cosmetic has a current price',
    unpriced.map((c) => c.id).join(', ') + '  <- would sell at the pre-ledger 2026 rate');

  ok(typeof avatarIconFor('avatar-robot') === 'string',
    'the small nav-bar glyph still resolves (a 20px chip is too small for a drawing)');
}

// ===========================================================================
console.log('\n--- 7. eleven tabs became four, and nothing was lost ---');
// ===========================================================================
/**
 * The parent: **"I don't like the reward section. It is overwhelming. There
 * are 11 tabs. Can we clean this up?"**
 *
 * The danger in any cleanup is the one this project has already hit four
 * times: a component that is complete, correct, and mounted NOWHERE. Cutting
 * seven tabs is seven chances to create another. So the load-bearing checks
 * here are not "there are four tabs" — they are **every section that used to
 * be reachable is still rendered somewhere**.
 */
{
  const tabIds = [...storeSrc.matchAll(/setTab\('([a-z]+)'\)/g)].map((m) => m[1]);
  const unique = [...new Set(tabIds)];
  ok(unique.length === 4, `the Rewards screen has ${unique.length} tabs`, unique.join(', '));

  const DEFAULT = (storeSrc.match(/const \[tab, setTab\] = useState\('([a-z]+)'\)/) || [, ''])[1];
  ok(unique.includes(DEFAULT), `it opens on a tab that exists (${DEFAULT})`,
    'a default pointing at a deleted tab renders a blank page');

  /**
   * THE CHECK THAT MATTERS. Every one of these was reachable before the
   * cleanup and must still be rendered. Losing one would not throw, would not
   * fail to parse, and would look exactly like a tidier screen.
   */
  const MUST_RENDER = [
    'JourneySection', 'ShipSection', 'ChallengesSection', 'HistorySection',
    'BadgesSection', 'ReadinessSection', 'StoreSection', 'DreamGoalSection',
    'InventorySection'
  ];
  const dropped = MUST_RENDER.filter((c) => !new RegExp(`<${c}[\\s/>]`).test(storeSrc));
  ok(dropped.length === 0,
    'every section that was reachable before is still rendered',
    dropped.join(', ') + '  <- built, complete, and mounted nowhere: the fifth time');

  // Both halves of the split store must be mounted, or one wallet vanishes.
  ok(/half="coins"/.test(storeSrc) && /half="credits"/.test(storeSrc),
    'both halves of the store are mounted — coins in Shop, credits in Rewards');

  // The two deletions must be real deletions, not orphans left behind.
  const code = codeOnly(storeSrc);
  ok(!/function MissionsSection\(/.test(code) && !/<MissionsSection/.test(code),
    'MissionsSection is gone, not merely unmounted',
    'it drew the same eight RANKS the Journey draws');
  ok(!/function CertificatesSection\(/.test(code) && !/<CertificatesSection/.test(code),
    'CertificatesSection is gone, not merely unmounted');

  /**
   * ...but the one thing Certificates could do that a badge could not must
   * survive. Deleting the tab was correct; deleting the print would have been
   * taking something away from her homeschool binder.
   */
  ok(/function CertificateModal\(/.test(code) && /<CertificateModal cert=\{openCert\}/.test(code),
    'printing survived the tab it used to live in');
  ok(/certificatesByBadgeId/.test(code) && /Print certificate/.test(storeSrc),
    '...as a button on the badge that earns it');
  ok(/map\['hundred-lessons'\]/.test(code),
    'the mastery certificate is keyed by its BADGE id, not its own',
    "certificate 'mastery-100' vs badge 'hundred-lessons' — matching on the wrong one drops it silently");

  // Nova must explain the tabs that exist, and only those.
  const nova = read('src/components/Rewards/NovaTabGuide.jsx');
  const guideIds = [...(nova.match(/const GUIDES = \{[\s\S]*?\n\};/) || [''])[0]
    .matchAll(/^  ([a-z]+): \{/gm)].map((m) => m[1]);
  ok(guideIds.length > 0 && guideIds.every((id) => unique.includes(id)),
    'Nova has no guide for a tab that no longer exists',
    guideIds.filter((id) => !unique.includes(id)).join(', '));
  const unguided = unique.filter((id) => !guideIds.includes(id));
  ok(unguided.length === 0, '...and every tab has a guide', unguided.join(', '));
}

// ===========================================================================
console.log('\n--- 8. equipment is worn, and the room can be used ---');
// ===========================================================================
/**
 * The parent: **"Lamar wants to use the equipment he purchases not just have
 * it sitting in the equipment app. Can he also have his Avatar move around the
 * HQ to use items in there... sit in the flight chair, and look at the item
 * like the aquarium."**
 *
 * Two features, one property between them: **a thing he bought must be usable,
 * not merely present.** That is the same sentence as sections 1-3 above, one
 * step further along — those made purchases visible; this makes them work.
 */
{
  const SHIP_PARTS = ['eq-booster', 'eq-heatshield', 'eq-antenna', 'eq-solar'];
  const wearable = MISSION_EQUIPMENT.filter((i) => !SHIP_PARTS.includes(i.id));

  /**
   * THE LOAD-BEARING CHECK. `equipGear` refuses any item with no `slot`, so a
   * slotless piece of equipment is one that cannot be put on however many
   * coins it cost. This is the bug she reported, stated as a property.
   */
  const slotless = wearable.filter((i) => !i.slot);
  ok(slotless.length === 0,
    'every piece of wearable equipment has a slot',
    slotless.map((i) => i.id).join(', ') + '  <- equipGear refuses anything without one');

  const shipWithSlots = MISSION_EQUIPMENT.filter((i) => SHIP_PARTS.includes(i.id) && i.slot);
  ok(shipWithSlots.length === 0,
    '...and the four ship parts have none, because a boy cannot wear a heat shield',
    shipWithSlots.map((i) => i.id).join(', '));

  // A slot with no drawing is a purchase that equips and changes nothing.
  const artBlock = (avatarSrc.match(/const EQUIPMENT_ART = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const drawnEquip = [...artBlock.matchAll(/^  '(eq-[a-z-]+)':/gm)].map((m) => m[1]);
  /**
   * `body` is drawn by the BODY colour map rather than by EQUIPMENT_ART, so it
   * counts as drawn if it appears in either. It is still checked: the first run
   * of this guard caught `eq-suit-flight` equipping to a slot the colour map
   * had never heard of.
   */
  const bodyMap = (avatarSrc.match(/const BODY = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const drawnBody = [...bodyMap.matchAll(/'([a-z0-9-]+)':/g)].map((m) => m[1]);
  const undrawn = wearable.filter((i) => !drawnEquip.includes(i.id) && !drawnBody.includes(i.id));
  ok(undrawn.length === 0,
    'every wearable piece is drawn on the cadet',
    undrawn.map((i) => i.id).join(', ') + '  <- equips, and changes nothing on screen');

  // Every drawn slot has to be READ by the figure, or the drawing never runs.
  const slots = [...new Set(wearable.map((i) => i.slot))];
  const unread = slots.filter((slot) => slot !== 'body' && !new RegExp(`wearing\\('${slot}'\\)`).test(avatarSrc));
  ok(unread.length === 0,
    'every equipment slot is resolved by the drawing',
    unread.join(', ') + '  <- a slot nothing reads is a slot nothing wears');

  ok(/const headGear = wearing\('head'\)/.test(avatarSrc)
      && avatarSrc.indexOf('{headGear && headGear(paint)}') < avatarSrc.indexOf('{visorGear && visorGear(paint)}'),
    'the helmet is drawn before the gold visor comes down over it',
    'reversed, it draws a visor with a helmet on top of it, which is not a thing');

  // He must be able to tap it on, and see it in his loadout.
  ok(/equipment\.map\(\(item\) => \{/.test(inventorySrc) && /wearable && wear\(item\)/.test(inventorySrc),
    'equipment is tappable to wear, the same control as Avatar Gear');
  ok(/MISSION_EQUIPMENT\.find\(\(e\) => e\.id === id\)/.test(inventorySrc),
    '...and a worn piece appears in the loadout row',
    'searching only AVATAR_GEAR would draw it on him and omit it from the list of what he is wearing');

  // ---- the room ----
  const stationsBlock = (hqSrc.match(/export const STATIONS = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const stationIds = [...stationsBlock.matchAll(/^  '(hq-[a-z-]+)': \{/gm)].map((m) => m[1]);

  const ghostStations = stationIds.filter((id) => !HQ_ITEMS.some((i) => i.id === id));
  ok(ghostStations.length === 0,
    'no station exists for an item nobody can buy',
    ghostStations.join(', ') + '  <- the eq-gloves mistake, in a new place');

  const unusable = HQ_ITEMS.filter((i) => !stationIds.includes(i.id));
  ok(unusable.length === 0,
    `all ${HQ_ITEMS.length} HQ items can be walked to and used`,
    unusable.map((i) => i.id).join(', ') + '  <- bought, drawn, and still not usable');

  const blockFor = (id, i) => {
    // Slice to the NEXT station rather than to the next '},' — the last entry
    // in the object has no trailing comma, so the old form read it as empty
    // and reported a complete station as missing everything.
    const start = stationsBlock.indexOf(`'${id}': {`);
    const end = i + 1 < stationIds.length
      ? stationsBlock.indexOf(`'${stationIds[i + 1]}': {`)
      : stationsBlock.length;
    return stationsBlock.slice(start, end);
  };

  // Every station needs somewhere to stand and something to say.
  const STANCE_NAMES = /stance: '(stand|sit|work|type|reach|gaze|lift|tend)'/;
  const thin = stationIds.filter((id, i) => {
    const block = blockFor(id, i);
    const hasSpot = /du: -?[\d.]+/.test(block) ? /dv: -?[\d.]+/.test(block)
      : /u: [\d.]+/.test(block) && /v: [\d.]+/.test(block);
    return !hasSpot || !STANCE_NAMES.test(block) || !/doing: '/.test(block);
  });
  ok(thin.length === 0,
    'every station has a spot, a stance and a line about what he is doing',
    thin.join(', '));

  /**
   * ---- THE BUG THIS CHECK DID NOT CATCH (Aug 25, 2026) ----
   *
   * The parent: **"when the items are arranged the avatar doesn't move to the
   * new location."**
   *
   * One day old, and mine. Every station held an ABSOLUTE floor spot, computed
   * against wherever the designed layout happened to put each piece. The
   * moment arranging shipped, moving the desk left those coordinates behind —
   * so he walked to a patch of empty floor and mimed working at a workstation
   * that was now across the room.
   *
   * The old check asked "does this station have a spot?" and the answer was
   * yes, all along. It never asked whether the spot could still be right after
   * the piece moved. **A movable piece must carry an OFFSET, not a place.**
   */
  const FLOOR_IDS = HQ_ITEMS.map((i) => i.id).filter((id) => {
    const L = (hqSrc.match(new RegExp(`'${id}': \\{ u: [\\d.]+, v: [\\d.]+`)) || [])[0];
    return Boolean(L);
  });
  const absoluteFloorStations = stationIds.filter((id, i) => {
    if (!FLOOR_IDS.includes(id)) return false;
    return !/du: -?[\d.]+/.test(blockFor(id, i));
  });
  ok(absoluteFloorStations.length === 0,
    'every MOVABLE piece stores where to stand as an offset, not a fixed spot',
    absoluteFloorStations.join(', ')
      + '  <- he walks to where the piece USED to be the moment it is dragged');

  const offsetWallStations = stationIds.filter((id, i) => {
    if (FLOOR_IDS.includes(id)) return false;
    return /du: -?[\d.]+/.test(blockFor(id, i));
  });
  ok(offsetWallStations.length === 0,
    '...and a piece that cannot move keeps an absolute one',
    offsetWallStations.join(', '));

  // `atId` -> `standId` in Phase 2: where his FEET are, which is the piece he
  // tapped when he has tapped one and his current roaming stop when he has not.
  // Same invariant — the standing spot comes off the piece's live position.
  ok(/const base = spotOf\(standId\)/.test(hqSrc) && /standingSpotFor\('cadet', standStation, base\)/.test(hqSrc),
    '...and the standing spot is resolved from where the piece is NOW',
    'reading the designed layout instead would reintroduce the bug exactly');

  /**
   * ---- MOTION (Aug 25, 2026) ----
   *
   * The parent: **"is there a way there is animation like it is using the work
   * station... looks at items on the wall. pick up and put down certain items.
   * type on computer."**
   *
   * Each of the three she named must exist, and be reachable from a station —
   * a stance nothing points at is an animation nobody will ever see, which is
   * this project's oldest recurring fault in a new costume.
   */
  const usedStances = new Set([...stationsBlock.matchAll(/stance: '([a-z]+)'/g)].map((m) => m[1]));
  for (const st of ['type', 'gaze', 'lift']) {
    ok(usedStances.has(st), `a station uses the '${st}' stance`,
      st === 'type' ? 'typing on the computer' : st === 'gaze' ? 'looking at the wall pieces' : 'picking something up and putting it down');
  }

  const stanceBlock2 = (avatarSrc.match(/export const STANCES = \{([\s\S]*?)\n\};/) || [, ''])[1];
  /**
   * The end index was `j < 0 ? stanceBlock2.length : undefined` — backwards.
   * In the normal case (j found) it passed `undefined`, which slices to the
   * end of the WHOLE block, so every stance counted as animated as long as any
   * later one was. Deleting the typing motion passed this check.
   */
  const still = [...usedStances].filter((st) => {
    if (st === 'stand') return false;
    const i = stanceBlock2.indexOf(`\n  ${st}: {`);
    if (i < 0) return true;
    const j = stanceBlock2.indexOf('\n  },', i + 4);
    // Anchored to the property position. Unanchored, `/motion: \{/` also
    // matches inside any identifier ENDING in "motion", so a renamed or
    // shadowed property would still satisfy it.
    return !/\n {4}motion: \{/.test(stanceBlock2.slice(i, j < 0 ? stanceBlock2.length : j));
  });
  ok(still.length === 0, 'every stance a station uses actually moves', still.join(', '));

  /**
   * ---- A PRESENCE CHECK CAN BE FOOLED BY PROSE TOO (Aug 25, 2026) ----
   *
   * This read `/additive="sum"/.test(avatarSrc)` and passed when the attribute
   * was deleted — because the comment above it, explaining why the attribute
   * matters, contains the same string.
   *
   * This file's own doctrine says *assert presence against the file, assert
   * absence against the code*. That rule was written for absence checks, and
   * it needs the corollary: **a presence check whose subject is also named in
   * prose must be asserted against the code as well.** Four separate guards in
   * this repo have now been fooled by a comment quoting the thing they check.
   */
  ok(/additive="sum"/.test(codeOnly(avatarSrc)),
    'the animation adds to the transform already on the group rather than replacing it',
    'without additive="sum" the arm snaps to the origin before it moves — the classic SMIL mistake');
  ok(/PREFERS_REDUCED_MOTION/.test(avatarSrc) && /const moving = animate && !PREFERS_REDUCED_MOTION/.test(avatarSrc),
    '...and a machine asking for reduced motion gets a still figure');
  // The room now chooses between the walk cycle and the destination's stance,
  // so this reads the multi-line call. Same claim: off by default, on in the room.
  ok(/animate = false/.test(avatarSrc)
    && /stance=\{walking \? 'walk' : spot\.stance\}\s+raw\s+animate/.test(hqSrc),
    'motion is off by default and on only in the room',
    'a looping figure on every store card would be a shop that will not sit still');

  // Arm and hand must share a group, or the hand stays put while the arm swings.
  /**
   * ASSERT THE PROPERTY, NOT THE PUNCTUATION. (Aug 25, 2026.) This required the
   * literal `st?.holds && st.holds()` and broke the day the held object learned
   * to be drawn AT the hand — a guard failing on a correct change. What matters
   * is that it is inside the right arm's animated group and positioned on the
   * hand, so it can neither be left behind by the arm nor drawn at his feet,
   * which is exactly what happened the first time a pencil was added.
   */
  {
    const rightGroup = (avatarSrc.match(
      /<Motion spec=\{motion\?\.right\}[\s\S]{0,700}?<\/g>/
    ) || [''])[0];
    ok(/st\?\.holds/.test(rightGroup),
      'what he picks up rides in the same group as the hand carrying it',
      'drawn outside it, the object floats where the maths left it while the arm moves away');
    ok(/translate\(\$\{r\[0\]\} \$\{r\[1\]\}\)/.test(rightGroup),
      '...and is positioned on the hand, wherever the reach has put it',
      'the pencil rendered down by his boots the first time it was drawn');
  }

  // Stances must exist in the drawing, or he walks over and does nothing.
  const stanceBlock = (avatarSrc.match(/export const STANCES = \{([\s\S]*?)\n\};/) || [, ''])[1];
  const used = [...new Set([...stationsBlock.matchAll(/stance: '([a-z]+)'/g)].map((m) => m[1]))];
  const missing = used.filter((st) => !new RegExp(`(^|\\n)  ${st}[:,]`).test(stanceBlock));
  ok(missing.length === 0, 'every stance a station asks for is drawn', missing.join(', '));
  ok(/sit: \{[\s\S]*?legs: \(suit\) =>/.test(stanceBlock),
    'sitting actually moves the legs, not just the arms',
    'she asked for him to SIT in the flight chair — arms alone is a boy standing at a chair');

  // Only owned pieces are usable, and he is actually in the room.
  ok(/const usable = owned && Boolean\(onUse\)/.test(hqSrc),
    'only a piece he owns can be walked to',
    'miming a telescope he has not bought is the shop promise made worse');
  {
    /**
     * Membership, not argument order — this broke when `reachY` was added.
     *
     * ---- AND AGAIN WHEN THE CREW ARRIVED (Aug 30, 2026) ----
     *
     * Phase 4 put a second figure in the room, so `<CadetInRoom>` is no longer
     * mounted once with his own variables. Every figure — him and any posted
     * crew — goes into one array, gets sorted back to front by its own v, and
     * is mounted from the array. His equipped gear is still his; it is just one
     * indirection away now.
     *
     * So the check follows the indirection rather than being relaxed. Both
     * halves still have to hold: the CADET'S ROW supplies what he has equipped,
     * and the MOUNT passes each figure's own values through. Cutting either one
     * still turns this red.
     */
    const mount = (hqSrc.match(/<CadetInRoom[\s\S]{0,260}?\/>/) || [''])[0];
    const cadetRow = (hqSrc.match(/\{ key: 'cadet',[\s\S]{0,200}?\},/) || [''])[0];
    ok(/spot=\{f\.spot\}/.test(mount) && /avatar=\{f\.avatar\}/.test(mount)
      && /gear=\{f\.gear\}/.test(mount)
      && /avatar: equippedAvatar/.test(cadetRow) && /gear: equippedGear/.test(cadetRow),
      'the cadet is drawn in the room, wearing what he has equipped');
    ok(/reachY=\{f\.reachY\}/.test(mount) && /reachY\b/.test(cadetRow),
      '...and is told how high the surface he walked up to actually is',
      'without it every station got the same hands in the same place');
  }
  ok(/const k = depth\(at\.y\) \* FIGURE_SCALE/.test(hqSrc),
    '...and scaled by depth like every other object in the perspective',
    'a figure that ignored it would be the one thing proving the room is a drawing');
  ok(/raw = false/.test(avatarSrc) && /if \(raw\) return <g/.test(avatarSrc),
    '...as a bare <g>, not a nested <svg> that would clip and refuse to scale');
}

// ===========================================================================
console.log('\n9. WHAT HE OWNS CAN BE CHOSEN WHERE HE OWNS IT');
// ---------------------------------------------------------------------------
// The parent, verbatim: **"Avatar and rockets wont allow selections in My
// Stuff."**
//
// They did not, and the comment sitting directly above the grid said
// `these DO equip` while the code under it rendered a plain <div> with no
// handler on it. Ten avatars and five rockets, every one a dead tile, under a
// note reading "Change these in the Store tab."
//
// That note was the mistake. The four tabs were split by VERB two days
// earlier — Shop is where you SPEND, My Stuff is what you OWN — and sending
// him to the shop to switch between two characters he has already paid for
// puts a price tag in front of a thing he already bought.
//
// They also drew as `item.icon`: an emoji, on the screen whose whole point
// since Aug 25 is that avatars are drawn characters and rockets have real
// colours. Two of the ten avatar glyphs are the same picture at that size —
// the exact fault the store was fixed for a day earlier, still sitting one
// tab away.
// ---------------------------------------------------------------------------
{
  const invCode = codeOnly(inventorySrc).replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  ok(/const equipCosmetic = useAppStore\(\(s\) => s\.equipCosmetic\)/.test(invCode)
      && /equipCosmetic\(item\)/.test(invCode),
    'My Stuff can equip a cosmetic at all',
    'the section said "these DO equip" and called nothing');
  ok(/<PickGrid items=\{avatars\}/.test(invCode) && /<button/.test(invCode),
    '...its avatar tiles are buttons');
  ok(/<PickGrid items=\{rockets\}/.test(invCode),
    '...and so are its rockets');
  ok(/aria-pressed=\{on\}/.test(invCode) && /on \? 'Equipped' : 'Tap to use'/.test(invCode),
    '...each knowing whether it is the one in use',
    'a grid where every tile looks identical cannot show him what he is wearing');
  ok(/<RocketSwatch color=\{item\.color\}/.test(invCode) && /<CadetAvatar avatar=\{item\.id\}/.test(invCode),
    '...drawn as the real thing, not an emoji',
    'two of the ten avatar glyphs are the same picture at tile size');
  // ABSENCE AGAINST codeOnly, NEVER THE RAW SOURCE. The comment explaining this
  // very fix quotes the note it removed, so the raw file still contains the
  // words. Eighth time in this project a check has been defeated by its own
  // explanation — and the first time it happened in the safe direction.
  ok(!/Change these in the Store tab/.test(invCode),
    '...and it no longer sends him to the shop for something he owns',
    'Shop is where you spend; My Stuff is what you own');

  ok(fs.existsSync(path.join(REPO, 'src/components/Rewards/RocketSwatch.jsx'))
      && /from '\.\/RocketSwatch\.jsx'/.test(inventorySrc)
      && /from '\.\/RocketSwatch\.jsx'/.test(storeSrc),
    'the rocket is drawn from one file, used by both screens',
    'a second copy of the artwork is how two screens come to disagree about a product');

  // And the thing they call has to be able to do the job. This map silently
  // returned `unknown-type` for anything missing — a click that does nothing
  // and says nothing, which is the shape of the whole complaint.
  const fieldMap = (read('src/store/useAppStore.js').match(/const FIELD = \{[^}]*\}/) || [''])[0];
  for (const type of ['avatar', 'rocket', 'theme']) {
    ok(new RegExp(`${type}: 'equipped\\w+'`).test(fieldMap),
      `equipCosmetic knows what to do with a ${type}`, fieldMap);
  }
  const untyped = [...AVATARS, ...ROCKETS].filter((i) => !i.type).map((i) => i.id);
  ok(untyped.length === 0,
    '...and every avatar and rocket declares the type it dispatches on', untyped.join(', '));
  ok(AVATARS.length >= 10 && ROCKETS.length >= 5,
    `...across all ${AVATARS.length} avatars and ${ROCKETS.length} rockets`);
}

// ---------------------------------------------------------------------------
// EVERY STORE SECTION BELONGS TO EXACTLY ONE WALLET. (Aug 25, 2026.)
//
// The parent: **"Why is it in both reward and my stuff?"**
//
// Two different things, and only one of them was a bug. My Stuff SHOULD list
// what he owns — that is the tab. But the Avatars section sat ABOVE the
// `showCoins` wrapper in StoreSection, so it rendered in both halves: ten
// avatars priced in coins, showing up in the Rewards tab, which is the
// CREDITS wallet, beside the real-world rewards Mom has to approve.
//
// Themes and Rocket Skins were moved inside the wrapper when the store split
// two days earlier. Avatars was already above the line and stayed there.
//
// Invisible in use, because the section looks right wherever you are standing
// — correct in Shop, plausible in Rewards. Only opening both tabs shows it.
// So it is asserted here instead of being noticed.
// ---------------------------------------------------------------------------
{
  const i = storeSrc.indexOf('function StoreSection');
  const body = storeSrc.slice(i, storeSrc.indexOf('\nfunction ', i + 10));
  const guards = [...body.matchAll(/\{showCoins && \(|\{showCredits && \(/g)]
    .map((m) => ({ at: m.index, wallet: m[0].includes('Coins') ? 'coins' : 'credits' }));
  const WALLET_OF = {
    Avatars: 'coins',
    'Board Themes': 'coins',
    'Rocket Skins': 'coins',
    'Real-World Rewards': 'credits',
    'Dream Rewards': 'credits'
  };
  let found = 0;
  for (const m of body.matchAll(/uppercase tracking-widest text-signal-\w+">([^<]{3,40})</g)) {
    const name = Object.keys(WALLET_OF).find((k) => m[1].startsWith(k));
    if (!name) continue;
    found += 1;
    const guard = guards.filter((g) => g.at < m.index).pop();
    ok(guard && guard.wallet === WALLET_OF[name],
      `"${name}" appears only in the ${WALLET_OF[name]} half of the store`,
      guard ? `found under ${guard.wallet}` : 'not inside either wallet — it renders in BOTH tabs');
  }
  ok(found === Object.keys(WALLET_OF).length,
    `...and all ${Object.keys(WALLET_OF).length} store sections were checked`, `found ${found}`);
}

// ===========================================================================
console.log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
