// ---------------------------------------------------------------------------
// TODAY'S GAME — the code or link Gigi types in for Azianna's Gimkit, Kahoot or
// Blooket game, and the rules that keep it safe and correct.
//
// Gigi, Oct 1 2026: "build for Gimkit, Kahoot and Blooket, so when the
// scheduled day comes I can add the code."
//
// ---- WHY THIS IS A SEPARATE FILE ----
// Pure rules, no screen, no database: so a check can run every one of them
// without a browser, and the Grown-Up Corner, her Games tab and the backup
// merge all read ONE copy of each rule.
//
// ---- THE THREE RULES THAT MATTER ----
//
// 1. A GAME CODE BELONGS TO ONE DAY. A code or link dies when its game ends.
//    Every entry carries `forDay`, and her Games tab shows an entry only on
//    that day. A code left over from Wednesday must never greet her on Friday
//    as if it were live.
//
// 2. A LINK MUST BE THE SITE'S OWN. Her screen turns what Gigi pasted into a
//    button a nine-year-old taps. So a link is accepted only if it is https and
//    its host is one of the site's own. No javascript:, no look-alike
//    domains, no other site. THE SAME TEST RUNS AGAIN ON EVERYTHING THAT ARRIVES
//    IN A BACKUP FILE — a file is typed by nobody and cannot be trusted just
//    because it came from "Gigi's computer".
//
// 3. IT TRAVELS WITH THE DAILY FILE. Gigi's computer and Azianna's Chromebook
//    do not talk to each other; they trade a backup file. An entry typed on
//    either one rides along in that file, and when both have one for the same
//    site the NEWER ONE WINS.
// ---------------------------------------------------------------------------

/** The three sites, in the order the screens list them. */
export const GAME_SITES = [
  {
    id: 'gimkit',
    label: 'Gimkit',
    joinUrl: 'https://www.gimkit.com/join',
    hosts: ['gimkit.com', 'www.gimkit.com'],
    where: 'The number on the Gimkit host screen, or a link to the kit or game'
  },
  {
    id: 'kahoot',
    label: 'Kahoot!',
    joinUrl: 'https://kahoot.it/',
    hosts: ['kahoot.it', 'www.kahoot.it', 'play.kahoot.it', 'kahoot.com', 'www.kahoot.com', 'create.kahoot.it'],
    where: 'The game PIN on the Kahoot host screen, or a link to the challenge'
  },
  {
    id: 'blooket',
    label: 'Blooket',
    joinUrl: 'https://play.blooket.com/play',
    hosts: ['blooket.com', 'www.blooket.com', 'play.blooket.com', 'dashboard.blooket.com'],
    where: 'The game ID on the Blooket host screen, or a link to the game'
  }
];

export const SITE_IDS = GAME_SITES.map((s) => s.id);

export function siteById(id) {
  return GAME_SITES.find((s) => s.id === id) || null;
}

/**
 * Which site is her game on which weekday. This is Gigi's rotation of Sept 30:
 * Monday Kahoot, Tuesday Blooket, Wednesday Gimkit, Thursday Kahoot (test
 * prep), Friday Blooket (redo). 0 = Sunday … 6 = Saturday; no game on a weekend.
 * check-game-codes asserts this agrees with GAME_WEEK in the Grown-Up Corner,
 * so the two cannot drift apart.
 */
export const SITE_BY_WEEKDAY = { 1: 'kahoot', 2: 'blooket', 3: 'gimkit', 4: 'kahoot', 5: 'blooket' };

const DAYKEY = /^\d{4}-\d{2}-\d{2}$/;

export function isDayKey(s) {
  return typeof s === 'string' && DAYKEY.test(s) && !Number.isNaN(new Date(`${s}T00:00:00`).getTime());
}

/** The site scheduled for a 'YYYY-MM-DD' day, or null on a weekend. */
export function scheduledSiteFor(dayKey) {
  if (!isDayKey(dayKey)) return null;
  const weekday = new Date(`${dayKey}T00:00:00`).getDay();
  return SITE_BY_WEEKDAY[weekday] || null;
}

/** What a code looks like on screen: 123456 -> 123 456. Links are shown as-is. */
export function displayCode(code) {
  const s = String(code || '');
  return /^\d{6,8}$/.test(s) ? `${s.slice(0, 3)} ${s.slice(3)}` : s;
}

/**
 * Read what Gigi typed or pasted for one site.
 *
 *   { ok: true,  kind: 'code', value: '123456' }
 *   { ok: true,  kind: 'link', value: 'https://www.gimkit.com/join?gc=123456' }
 *   { ok: false, reason: 'plain words she can act on' }
 *
 * A code is 4 to 12 letters or digits once spaces and dashes are taken out
 * ("123 456" and "123-456" both work). A link must be https (a plain http link
 * is upgraded) and on the site's own host.
 */
export function parseGameEntry(siteId, raw) {
  const site = siteById(siteId);
  if (!site) return { ok: false, reason: 'That is not one of the three game sites.' };
  const text = String(raw ?? '').trim();
  if (!text) return { ok: false, reason: 'Type the code, or paste the link.' };

  const looksLikeLink = /^(https?:\/\/|www\.)/i.test(text) || /^[a-z0-9.-]+\.[a-z]{2,}\//i.test(text);
  if (looksLikeLink) {
    let url;
    try {
      url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
    } catch {
      return { ok: false, reason: 'That link does not look right. Copy it again from the site.' };
    }
    if (url.protocol === 'http:') url.protocol = 'https:';
    if (url.protocol !== 'https:') return { ok: false, reason: `Only a ${site.label} link can go here.` };
    if (url.username || url.password) return { ok: false, reason: 'That link has a sign-in inside it. Copy the plain link.' };
    if (!site.hosts.includes(url.hostname.toLowerCase())) {
      return { ok: false, reason: `That is not a ${site.label} link, so it was not saved.` };
    }
    return { ok: true, kind: 'link', value: url.href };
  }

  const code = text.replace(/[\s-]+/g, '');
  if (!/^[A-Za-z0-9]{4,12}$/.test(code)) {
    return { ok: false, reason: 'A code is 4 to 12 letters or numbers, like 123 456. Or paste the link.' };
  }
  return { ok: true, kind: 'code', value: code };
}

/** Make the entry for storage. Returns { ok:false, reason } if the text is no good. */
export function makeGameEntry(siteId, raw, forDay, now = new Date().toISOString()) {
  const parsed = parseGameEntry(siteId, raw);
  if (!parsed.ok) return parsed;
  if (!isDayKey(forDay)) return { ok: false, reason: 'Pick the day this game is for.' };
  return { ok: true, entry: { site: siteId, kind: parsed.kind, value: parsed.value, forDay, setAt: now } };
}

/**
 * Is a stored entry safe to use? Re-runs the same test as typing it, so an
 * entry that arrives in a backup file is held to the same rule as one Gigi typed.
 */
export function isValidEntry(siteId, entry) {
  if (!entry || typeof entry !== 'object') return false;
  if (entry.site !== siteId) return false;
  if (!isDayKey(entry.forDay)) return false;
  if (typeof entry.setAt !== 'string' || Number.isNaN(Date.parse(entry.setAt))) return false;
  const again = parseGameEntry(siteId, entry.value);
  return again.ok && again.kind === entry.kind && again.value === entry.value;
}

/** Keep only entries that pass. Anything else is dropped, never repaired. */
export function cleanEntries(map) {
  const out = {};
  for (const id of SITE_IDS) {
    if (isValidEntry(id, map?.[id])) out[id] = map[id];
  }
  return out;
}

/**
 * Merge two sets of entries (this computer's and a backup file's). Per site,
 * the one set LATER wins; a tie keeps this computer's. An invalid incoming
 * entry never wins, however new it claims to be.
 */
export function mergeGameEntries(local, incoming) {
  const have = cleanEntries(local);
  const inn = cleanEntries(incoming);
  const out = { ...have };
  for (const id of SITE_IDS) {
    if (!inn[id]) continue;
    if (!have[id] || Date.parse(inn[id].setAt) > Date.parse(have[id].setAt)) out[id] = inn[id];
  }
  return out;
}

/** How many of the incoming entries would change anything here. For the import preview. */
export function countNewEntries(local, incoming) {
  const merged = mergeGameEntries(local, incoming);
  const have = cleanEntries(local);
  return SITE_IDS.filter((id) => merged[id] && (!have[id] || merged[id].setAt !== have[id].setAt)).length;
}

/**
 * The entries to show on a given day, her scheduled site first. Only entries
 * made FOR that day. Nothing from another day is ever returned.
 */
export function entriesForDay(map, dayKey) {
  const clean = cleanEntries(map);
  const scheduled = scheduledSiteFor(dayKey);
  return SITE_IDS.filter((id) => clean[id] && clean[id].forDay === dayKey)
    .sort((a, b) => (a === scheduled ? -1 : b === scheduled ? 1 : 0))
    .map((id) => clean[id]);
}

/** Where the Play button goes: the pasted link, or the site's join page. */
export function playUrl(entry) {
  const site = siteById(entry?.site);
  if (!site) return null;
  return entry.kind === 'link' ? entry.value : site.joinUrl;
}

function keyOf(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * The first day on or after `fromDayKey` when this site is her scheduled game.
 * Used to pre-fill the date, so typing Wednesday's Gimkit code on Monday
 * defaults to Wednesday. Falls back to `fromDayKey` if the site is never scheduled.
 */
export function nextScheduledDay(siteId, fromDayKey) {
  if (!isDayKey(fromDayKey)) return fromDayKey;
  for (let i = 0; i < 7; i++) {
    const d = new Date(`${fromDayKey}T00:00:00`);
    d.setDate(d.getDate() + i);
    const key = keyOf(d);
    if (scheduledSiteFor(key) === siteId) return key;
  }
  return fromDayKey;
}
