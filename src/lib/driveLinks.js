/**
 * Google Drive (and general web) evidence links.
 *
 * WHY THIS EXISTS: student work samples, field trip photos, award
 * certificates and standardized test reports were the one Part 8 item
 * that stayed blocked, because storing the actual files meant putting
 * scans and photos into browser storage — which the parent declined,
 * correctly. IndexedDB is not a safe long-term home for records the state
 * asks you to retain for three years; a browser reset would take them.
 *
 * A link solves it without that risk. The file lives in Drive, where it
 * is backed up, shareable, and outlives this app entirely. The app
 * stores a URL — a few dozen bytes — and the compliance packet prints
 * that URL so a printed or emailed packet still points at the evidence.
 *
 * WHAT THIS MODULE IS CAREFUL ABOUT: these URLs are rendered as `href`
 * on an anchor tag. An unvalidated string in an href is a real XSS
 * vector (`javascript:alert(1)` runs on click), so nothing reaches the
 * UI without passing through normalizeEvidenceUrl, which admits http
 * and https and nothing else.
 */

/**
 * Hosts we can describe precisely. Anything else is still allowed — she
 * may keep records in Dropbox, OneDrive, or a school portal — it just
 * gets the generic label rather than a wrong one.
 */
const DRIVE_HOSTS = new Set(['drive.google.com', 'docs.google.com', 'photos.google.com', 'photos.app.goo.gl']);

/**
 * Validate and normalize a pasted link.
 *
 * Returns { ok, url, error }. `url` is only safe to render when ok is
 * true. An empty string is treated as "no link", not as an error —
 * clearing the field is how you remove a link.
 */
/**
 * The reference types on a custom assignment that are RENDERED AS A LINK.
 *
 * Lives here, next to `normalizeEvidenceUrl`, because two places need the same
 * answer and they must not disagree: the Parent Dashboard decides from it
 * whether to draw an `<a>`, and `addAssignment` decides from it whether the
 * value has to survive URL validation first. Two copies of this list is how a
 * type comes to be rendered as a link without ever having been checked as one.
 * (Aug 23, 2026.)
 */
export const REFERENCE_LINK_TYPES = ['Khan Academy Lesson', 'YouTube Video', 'Website'];

export function normalizeEvidenceUrl(input) {
  const raw = (input || '').trim();
  if (!raw) return { ok: true, url: null, error: null };

  let parsed;
  try {
    // Bare "drive.google.com/..." is what you get from copying an
    // address bar on some browsers. Assume https rather than rejecting.
    parsed = new URL(/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw) ? raw : `https://${raw}`);
  } catch {
    return { ok: false, url: null, error: 'That doesn’t look like a web link.' };
  }

  // The whole point of this check. Everything else here is convenience;
  // this line is the one that matters.
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { ok: false, url: null, error: 'Only http and https links can be saved.' };
  }
  if (!parsed.hostname) {
    return { ok: false, url: null, error: 'That link is missing a website address.' };
  }

  return { ok: true, url: parsed.toString(), error: null };
}

/**
 * A short human label for a saved link, so the UI can say "Drive folder"
 * instead of showing 90 characters of URL.
 */
export function describeEvidenceUrl(url) {
  if (!url) return null;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return 'Link';
  }
  const host = parsed.hostname.replace(/^www\./, '');
  if (!DRIVE_HOSTS.has(host)) return host;

  const path = parsed.pathname;
  if (host === 'photos.google.com' || host === 'photos.app.goo.gl') return 'Google Photos';
  if (path.includes('/folders/')) return 'Drive folder';
  if (path.startsWith('/document/')) return 'Google Doc';
  if (path.startsWith('/spreadsheets/')) return 'Google Sheet';
  if (path.startsWith('/presentation/')) return 'Google Slides';
  if (path.startsWith('/forms/')) return 'Google Form';
  return 'Drive file';
}

export function isDriveUrl(url) {
  if (!url) return false;
  try {
    return DRIVE_HOSTS.has(new URL(url).hostname.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

/**
 * The folder slots the app knows about.
 *
 * A fixed list rather than "add your own folders" on purpose. These map
 * one-to-one onto the record kinds that already exist, so every record
 * type has an obvious home and the packet can print a complete index.
 * An open-ended folder manager would be one more thing to maintain and
 * would let the mapping drift.
 *
 * `recordKind` ties a folder to the Records section tab that uses it, so
 * that tab can show a "put the file here" link at the point of entry
 * rather than making her hunt for the right folder.
 */
export const EVIDENCE_FOLDERS = [
  {
    key: 'root',
    label: 'All Homeschool Records',
    blurb: 'The top-level folder everything else lives inside.',
    recordKind: null
  },
  {
    key: 'field-trip',
    label: 'Field Trips',
    blurb: 'Photos, tickets, museum programs, trip write-ups.',
    recordKind: 'field-trip'
  },
  {
    key: 'award',
    label: 'Awards & Certificates',
    blurb: 'Scanned certificates, competition results, recognition letters.',
    recordKind: 'award'
  },
  {
    key: 'test',
    label: 'Standardized Tests',
    blurb: 'Score reports. {state} asks for one at least every three years.',
    recordKind: 'test'
  },
  {
    key: 'work-sample',
    label: 'Student Work Samples',
    blurb: 'Scanned or photographed worksheets, essays, lab write-ups, drawings.',
    recordKind: 'work-sample'
  },
  {
    key: 'portfolio',
    label: 'Portfolio Projects',
    blurb: 'Photos and video of hands-on builds — rockets, egg drops, garden projects.',
    recordKind: null
  },
  {
    key: 'extracurricular',
    label: 'Extracurriculars & Volunteer Service',
    blurb: 'Team rosters, service-hour confirmations, club materials.',
    recordKind: 'extracurricular'
  },
  {
    key: 'packets',
    label: 'Compliance Packets',
    blurb: 'Downloaded records packets. {state} asks you to retain records at least three years.',
    recordKind: null
  }
];

export const EVIDENCE_FOLDER_KEYS = EVIDENCE_FOLDERS.map((f) => f.key);

export function folderForRecordKind(kind) {
  return EVIDENCE_FOLDERS.find((f) => f.recordKind === kind) || null;
}

/**
 * =============================================================================
 * NOTHING IS SEEDED HERE ANY MORE, AND THAT IS THE FIX.
 * =============================================================================
 *
 * WHAT HAPPENED. (Sept 28, 2026.)
 *
 * The parent, looking at the cell-model card: **"this link leads to 404 error
 * message."** She checked her Drive: the eight folders are gone.
 *
 * Eight folder ids were baked into this file on Aug 6, 2026 — created in her
 * Drive that day, so they were real when they were written. They are not real
 * now, and NOTHING IN THE APP COULD EVER HAVE NOTICED. A Drive id is an opaque
 * string on somebody else's server: the app cannot open it, cannot check it,
 * and cannot tell a live folder from a deleted one. It presented all eight as
 * working links for seven weeks.
 *
 * That is worse than having no link at all. A child told "upload it here" who
 * lands on a 404 concludes the app is broken, or that his work has nowhere to
 * go. The honest state — "no folder linked yet, here is how to link one" — was
 * always available and was not used, because a seeded link made the first open
 * look finished.
 *
 * ---- THE RULE NOW ----
 *
 * No external id ships in this codebase. Every folder link is pasted by the
 * parent in the Parent Dashboard, which is the only party who can actually see
 * whether the folder exists. `scripts/verify-drive-links.mjs` enforces it.
 *
 * An empty seed map is deliberate, not an oversight, and is left as a named
 * export so the store's seeding path keeps its shape: it now seeds nothing,
 * every folder starts unlinked, and every card that shows one says so.
 */
export const SEEDED_FOLDER_URLS = {};

/**
 * ---- THE EIGHT DEAD ONES, KEPT SO THEY CAN BE CLEANED UP ----
 *
 * The seeds above were not merely displayed — they were WRITTEN into each
 * browser's database on first open, as ordinary rows. Deleting them from this
 * file therefore fixes nothing on a computer that has already run the app:
 * both his and hers still hold all eight, and would go on offering them.
 *
 * So hydrate compares every saved folder link against this list and clears the
 * matches. Only an EXACT match is cleared: a folder the parent pasted herself
 * is never touched, even if it turns out to be dead too, because the app has
 * no standing to overrule her about her own Drive.
 *
 * This list may be deleted once both computers have opened the app again.
 */
export const RETIRED_FOLDER_URLS = [
  'https://drive.google.com/drive/folders/1VKP1msqBwA2Rowg8HI_XD_io5HNtj2KY',
  'https://drive.google.com/drive/folders/1tFeIVhfytHJ6-FboWA8BwSZgOSE9BxtI',
  'https://drive.google.com/drive/folders/1Ybc9x2TwxiTbliGpRT7keEEk064ToPpZ',
  'https://drive.google.com/drive/folders/1VI4XunRoGVIp7-kBIoLCEnow5fHT80Bl',
  'https://drive.google.com/drive/folders/13Kb2V7Y98ZyxgzzXf3pC97_aaNVS_7s4',
  'https://drive.google.com/drive/folders/1zqjMaJGpv0fPwuFe3xcIJWeqLlRQHLEA',
  'https://drive.google.com/drive/folders/1b5bvwnqIuV9k6xI4z7m718Z40aAnQAeq',
  'https://drive.google.com/drive/folders/16WRqEQwJ-Q5-eqmyBQIIPociTIJuygVc'
];

/** True for a link this app put there and has since been shown to be dead. */
export function isRetiredFolderUrl(url) {
  return typeof url === 'string' && RETIRED_FOLDER_URLS.includes(url.trim());
}
