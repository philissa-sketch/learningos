// ---------------------------------------------------------------------------
// WHERE THIS SCHOOL'S OWN RECORDS GO. (Sept 23, 2026)
//
// The parent chose option A: this school keeps its records in a database of
// its own, not in the platform's tables, so the two schools share nothing. She
// then allowed the one change it needed outside this folder — the platform's
// database guard (scripts/verify-academy-db.mjs) now accepts a school's own
// database, under rules that file checks:
//
//   · it is opened only from this folder's db/ directory, and nothing outside
//     this folder imports it;
//   · its name is built by ownDbName() from OWN_DB_PREFIX and the signed-in
//     Academy's id, so two Academies using this pack never share one, and it
//     can never be a platform database (those all start LearningOSDB_);
//   · it is opened on first use, never at module load.
//
// ---- ⚠️ THE PLATFORM'S BACKUP DOES NOT COVER THIS ----
//
// The platform's automatic backup and "send my work to your grown-up" copy the
// platform's database, not this one. Her own Backup & settings screen has to
// come across before she relies on anything saved here. That is the cost of
// keeping the schools separate, and the parent accepted it.
//
// ---- ROW SHAPES ----
//
// Every row is field-for-field the standalone Petal & Pestle app's (schema
// v12), so bringing her records across later is a copy, not a translation.
// ---------------------------------------------------------------------------

import Dexie from 'dexie';
import { loadedAcademyId } from '../../../content/academyContent.js';

/** True once results survive a reload. The screen tells her when it is false. */
export const RECORDS_ARE_SAVED = true;

/** Every database this school opens starts with this. Never 'LearningOSDB_'. */
export const OWN_DB_PREFIX = 'PetalPestleSchool_';

/** The database name for one signed-in Academy. Refuses to guess one. */
export function ownDbName(academyId) {
  if (!academyId || typeof academyId !== 'string') {
    throw new Error('Petal & Pestle records: no Academy is signed in, so there is no database to open.');
  }
  return `${OWN_DB_PREFIX}${academyId}`;
}

let ownDb = null;
let ownDbFor = null;

/** Open (once per Academy) and return this school's database. */
function openOwn() {
  const academyId = loadedAcademyId();
  if (ownDb && ownDbFor === academyId) return ownDb;
  if (ownDb) ownDb.close();
  const conn = new Dexie(ownDbName(academyId));
  conn.version(1).stores({
    // One row per sitting. Appended, never updated: a unit can be sat twice.
    attempts: 'attemptId, testId, dayKey, at'
  });
  ownDb = conn;
  ownDbFor = academyId;
  return ownDb;
}

/** Every reading-check sitting recorded so far. */
export async function loadReadingAttempts() {
  const rows = await openOwn().attempts.toArray();
  return rows.filter((a) => a && a.kind === 'reading-check');
}

/** Record one sitting. `add`, not `put`: an existing row is never overwritten. */
export async function saveReadingAttempt(row) {
  await openOwn().attempts.add(row);
  return row;
}

/** A new id for a row, the same way the standalone app makes one. */
export function newRecordId() {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Today as YYYY-MM-DD in her local time, never UTC. */
export function dayKeyOf(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
