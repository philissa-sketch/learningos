/**
 * Google Drive (and general web) evidence links.
 *
 * WHY THIS EXISTS: student work samples, field trip photos, award
 * certificates and standardized test reports were the one Part 8 item
 * that stayed blocked, because storing the actual files meant putting
 * scans and photos into browser storage — which the parent declined,
 * correctly. IndexedDB is not a safe long-term home for records Georgia
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
    blurb: 'Score reports. Georgia asks for one at least every three years.',
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
    blurb: 'Downloaded records packets. Georgia asks you to retain records at least three years.',
    recordKind: null
  }
];

export const EVIDENCE_FOLDER_KEYS = EVIDENCE_FOLDERS.map((f) => f.key);

export function folderForRecordKind(kind) {
  return EVIDENCE_FOLDERS.find((f) => f.recordKind === kind) || null;
}

/**
 * Folder links created in the parent's own Drive on August 6, 2026, at
 * her request, and seeded so the feature works on first open rather than
 * presenting eight empty boxes.
 *
 * SEEDED, NOT HARDCODED: these go in as normal rows the first time the
 * app loads and can be edited or cleared like any other link. This
 * follows the same static-seed-plus-persisted-override pattern used for
 * books, assignments, and Khan Academy work — the seed is a starting
 * point, and her edit always wins.
 */
export const SEEDED_FOLDER_URLS = {
  root: 'https://drive.google.com/drive/folders/1VKP1msqBwA2Rowg8HI_XD_io5HNtj2KY',
  'field-trip': 'https://drive.google.com/drive/folders/1tFeIVhfytHJ6-FboWA8BwSZgOSE9BxtI',
  award: 'https://drive.google.com/drive/folders/1Ybc9x2TwxiTbliGpRT7keEEk064ToPpZ',
  test: 'https://drive.google.com/drive/folders/1VI4XunRoGVIp7-kBIoLCEnow5fHT80Bl',
  'work-sample': 'https://drive.google.com/drive/folders/13Kb2V7Y98ZyxgzzXf3pC97_aaNVS_7s4',
  portfolio: 'https://drive.google.com/drive/folders/1zqjMaJGpv0fPwuFe3xcIJWeqLlRQHLEA',
  extracurricular: 'https://drive.google.com/drive/folders/1b5bvwnqIuV9k6xI4z7m718Z40aAnQAeq',
  packets: 'https://drive.google.com/drive/folders/16WRqEQwJ-Q5-eqmyBQIIPociTIJuygVc'
};
