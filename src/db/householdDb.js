/**
 * ---- THE HOUSEHOLD DATABASE (LearningOS step 2, Aug 31 2026) ----
 *
 * The front door has a chicken-and-egg problem: to know whether the person
 * typing is a given learner, you have to check a PIN — and the PIN cannot live
 * in that learner's database, because their database is the thing you are
 * deciding whether to open.
 *
 * So there is a second, small database that belongs to the FAMILY rather than
 * to any learner. It opens at boot, before anyone has signed in, and it holds
 * only the three things the door needs:
 *
 *   academies   — who has an Academy on this machine, and their PIN record
 *   parentAuth  — the parent's passcode record (hashed; see lib/parentAuth.js)
 *   session     — which Academy this machine last signed into
 *
 * ---- `academies` IS THE REGISTRY ----
 *
 * The platform ships with no Academies, because a family creates theirs at the
 * front door on their own machine — there is no commit that could have listed
 * it. src/academies/registry.js holds the naming rules; this table holds the
 * Academies that actually exist here.
 *
 * `LEARNINGOS_PACK_SPEC.md` §3 puts more here eventually — adminRecords,
 * evidenceLinks, fieldTrips, the school calendar, the state compliance table.
 * Those are a later step and a data move. This file deliberately does NOT
 * claim them yet: an empty table is a promise, and a promise in a schema is a
 * migration someone has to write twice.
 *
 * ---- WHAT IS HASHED, AND WHAT IS NOT ----
 *
 * PINs and passcodes are salted and stretched (PBKDF2, 150k iterations) via
 * lib/parentAuth.js. Display names are stored in the clear.
 *
 * That is a deliberate line, and it is the same one lib/parentAuth.js already
 * argues: hash the SECRET, be honest about the rest. Hashing a first name while
 * every grade, note and lesson sits in plaintext IndexedDB one database over
 * would be theatre — and the parent needs to see a real name when she manages
 * Academies. The privacy rule the front door actually keeps is about what the
 * SCREEN shows before sign-in, and that is enforced in the UI and its guard.
 */
import Dexie from 'dexie';
import { DB_PREFIX } from '../academies/registry.js';

export const HOUSEHOLD_DB_NAME = `${DB_PREFIX}household`;

/** The single row in `session`. */
export const SESSION_ID = 'current';

/** The single row in `parentAuth`. */
export const HOUSEHOLD_PARENT_AUTH_ID = 'singleton';

/**
 * Same shape as db.js: nothing is constructed at module load, so importing
 * this file in a check script builds no connection.
 */
let household = null;

/** @returns {boolean} whether openHousehold() has run. */
export function isHouseholdOpen() {
  return household !== null;
}

/**
 * Open the household database. Idempotent.
 *
 * Unlike openAcademy(), this takes no id — there is one household per machine,
 * and it is the same one before and after anybody signs in.
 */
export function openHousehold() {
  if (household) return household;

  household = new Dexie(HOUSEHOLD_DB_NAME);

  household.version(1).stores({
    // id: the Academy id, matching src/academies/registry.js and the folder
    // name under src/academies/. displayName is what the child types at the
    // door. pin is a buildSecretRecord() record, or null before it is set.
    academies: 'id',
    parentAuth: 'id',
    session: 'id'
  });

  return household;
}

function requireHousehold() {
  if (!household) {
    throw new Error(
      'LearningOS: the household database was used before openHousehold() ran. ' +
        'The front door opens it at boot — see src/FrontDoorGate.jsx.'
    );
  }
  return household;
}

// --- academies -------------------------------------------------------------

/** @returns {Promise<Array<{id:string, displayName:string, pin:object|null, createdAt:string}>>} */
export async function loadAcademyRecords() {
  return requireHousehold().academies.toArray();
}

export async function loadAcademyRecord(id) {
  return requireHousehold().academies.get(id);
}

export async function putAcademyRecord(record) {
  return requireHousehold().academies.put(record);
}

// --- parent ----------------------------------------------------------------

export async function loadHouseholdParentAuth() {
  return requireHousehold().parentAuth.get(HOUSEHOLD_PARENT_AUTH_ID);
}

export async function saveHouseholdParentAuth(record) {
  return requireHousehold().parentAuth.put({ id: HOUSEHOLD_PARENT_AUTH_ID, ...record });
}

// --- session ---------------------------------------------------------------

/**
 * Which Academy this machine last signed into.
 *
 * This is what lets a child open the app at 08:30 and land in school rather
 * than on a sign-in screen. It is a convenience on their own machine, not an
 * authentication decision — the record holds an id and a timestamp, nothing
 * about them.
 */
export async function loadSession() {
  return requireHousehold().session.get(SESSION_ID);
}

export async function saveSession(academyId) {
  return requireHousehold().session.put({
    id: SESSION_ID,
    academyId,
    signedInAt: new Date().toISOString()
  });
}

export async function clearSession() {
  return requireHousehold().session.delete(SESSION_ID);
}
