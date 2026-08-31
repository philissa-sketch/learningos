/**
 * ---- THE FRONT DOOR (LearningOS step 2, Aug 31 2026) ----
 *
 * Who is at the keyboard, decided before any Academy database opens.
 *
 * All of the logic lives here, as plain functions over plain data, so that the
 * component is only a form and the rules can be checked without a browser.
 *
 * ---- THE RULE THIS FILE ENFORCES ----
 *
 *   "No child's name, age, goal or schedule appears before sign-in."
 *
 * That has a consequence most sign-in screens get wrong: a WRONG NAME and a
 * WRONG PIN must fail identically. If the door said "no one by that name" for
 * one and "wrong numbers" for the other, then anyone could sit down and type
 * names until the message changed — and the door would have told them who
 * lives here. One message, one delay, both paths. See `SIGN_IN_FAILED`.
 *
 * This costs nothing in usability. A child who typed their own name wrong and
 * a child who typed their numbers wrong both need the same instruction: try
 * again, then ask your grown-up.
 */
import { verifyPasscode } from './parentAuth.js';

/** Exactly four digits. The label on the screen is "your four numbers". */
export const PIN_LENGTH = 4;

/**
 * The one failure message the student door gives, whatever went wrong.
 * Deliberately not "we don't know that name" — see the header.
 */
export const SIGN_IN_FAILED = "That didn't match. Try again, then ask your grown-up.";

/**
 * Names are typed by children, so matching is forgiving about the things
 * children vary — capitals, stray spaces, a trailing space from a fast return.
 * It is NOT forgiving about spelling, which would start guessing at identity.
 */
export function normalizeName(name) {
  return (name || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/**
 * @returns {{ok: true, value: string} | {ok: false, error: string}}
 */
export function validatePin(pin) {
  const value = (pin || '').trim();
  if (!/^\d+$/.test(value)) return { ok: false, error: 'Numbers only.' };
  if (value.length !== PIN_LENGTH) {
    return { ok: false, error: `Use ${PIN_LENGTH} numbers.` };
  }
  return { ok: true, value };
}

/**
 * A PIN that is four of the same digit, or four in a row, is the one a child
 * picks in three seconds and a sibling guesses in four. Refused at SETUP only
 * — never at sign-in, where an existing PIN must always be accepted as typed.
 */
export function isGuessablePin(pin) {
  if (!/^\d{4}$/.test(pin)) return false;
  if (/^(\d)\1{3}$/.test(pin)) return true;
  const digits = [...pin].map(Number);
  const ascending = digits.every((d, i) => i === 0 || d === digits[i - 1] + 1);
  const descending = digits.every((d, i) => i === 0 || d === digits[i - 1] - 1);
  return ascending || descending;
}

/**
 * @param {Array<{id:string, displayName:string}>} records
 * @param {string} typed
 * @returns {object|undefined}
 */
export function matchAcademyByName(records, typed) {
  const wanted = normalizeName(typed);
  if (!wanted) return undefined;
  return (records || []).find((r) => normalizeName(r.displayName) === wanted);
}

/**
 * Verify a student at the door.
 *
 * Both the name lookup and the PIN check run before returning, and both
 * failures return the same thing — including the same amount of work, so the
 * response time does not distinguish them either.
 *
 * @returns {Promise<{ok: true, academyId: string} | {ok: false, error: string}>}
 */
export async function signInStudent(records, name, pin) {
  const academy = matchAcademyByName(records, name);

  // A name that matched nothing still costs one verification against a real
  // record's parameters, so "no such name" and "wrong numbers" take the same
  // time. Without this, the door leaks the answer through a stopwatch.
  const decoy = (records || []).find((r) => r?.pin?.hash);
  const target = academy?.pin?.hash ? academy.pin : decoy?.pin;

  const matched = target ? await verifyPasscode(target, pin) : false;

  if (!academy || !academy.pin?.hash || !matched) {
    return { ok: false, error: SIGN_IN_FAILED };
  }
  return { ok: true, academyId: academy.id };
}

/**
 * Verify the parent.
 *
 * The passcode is the one already set on the Parent Dashboard — the same
 * record, the same hash, the same recovery code. There is deliberately no
 * second parent secret to remember. Email is an identifier the record carries,
 * not a second factor, so a mismatched email is reported plainly: unlike the
 * student door, there is nobody to enumerate.
 *
 * @returns {Promise<{ok: true} | {ok: false, error: string}>}
 */
export async function signInParent(record, email, passcode) {
  if (!record?.hash) {
    return { ok: false, error: 'No parent passcode has been set on this computer yet.' };
  }
  if (record.email && normalizeName(record.email) !== normalizeName(email)) {
    return { ok: false, error: "That email doesn't match the one saved here." };
  }
  const matched = await verifyPasscode(record, passcode);
  if (!matched) {
    return { ok: false, error: 'That passcode did not match.' };
  }
  return { ok: true };
}

/**
 * How long to refuse after consecutive failures.
 *
 * Not rate limiting in the security sense — this runs on the family's own
 * computer and anyone with developer tools reads the records regardless, which
 * lib/parentAuth.js says plainly. It is here because a sibling tapping four
 * digits repeatedly is the realistic case, and a growing pause ends that game
 * quickly without ever locking a child out of their own school day.
 */
export function lockoutMsFor(consecutiveFailures) {
  if (consecutiveFailures < 3) return 0;
  if (consecutiveFailures < 5) return 5_000;
  if (consecutiveFailures < 8) return 15_000;
  return 60_000;
}
