/**
 * Parent Dashboard passcode.
 *
 * WHAT THIS IS: a lock that keeps a 12-year-old out of the grading,
 * attendance and compliance screens he uses this app next to every day.
 * Before it existed, "Parent Dashboard" was one tap from Mission
 * Control, and every grade, note and record was editable from there.
 *
 * WHAT THIS IS NOT: security. Every byte of this app lives in his own
 * browser's IndexedDB. Anyone who opens developer tools can read the
 * records regardless of this passcode, and no client-side lock can
 * change that. The UI says so plainly rather than implying a protection
 * it cannot provide — the same rule the compliance section follows about
 * not implying it files anything.
 *
 * Given that, the passcode is still hashed properly rather than stored
 * in the clear. Not because it defeats a determined attacker, but
 * because a passcode sitting readable in IndexedDB is one glance over a
 * shoulder from useless, and because she may well reuse a number she
 * uses elsewhere. Cheap to do correctly; no reason not to.
 */

const ITERATIONS = 150000;
const HASH = 'SHA-256';
const KEY_BITS = 256;

/**
 * Web Crypto's subtle API is unavailable outside a secure context —
 * plain http on a LAN address, for instance, though localhost counts as
 * secure. If it is missing we refuse to set a passcode and say why,
 * rather than quietly falling back to a weaker hash that would look
 * identical to her while protecting nothing.
 */
export function cryptoAvailable() {
  return typeof globalThis.crypto?.subtle?.importKey === 'function';
}

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

function toHex(bytes) {
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function derive(secret, saltHex, iterations = ITERATIONS) {
  const encoder = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map((h) => parseInt(h, 16)));
  const key = await globalThis.crypto.subtle.importKey('raw', encoder.encode(secret), 'PBKDF2', false, [
    'deriveBits'
  ]);
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: HASH },
    key,
    KEY_BITS
  );
  return toHex(bits);
}

/**
 * Compare in constant time. Barely matters against a local sibling, but
 * an early-exit compare is the kind of thing that gets copied into
 * somewhere it does matter.
 */
function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const MIN_PASSCODE_LENGTH = 4;

export function validatePasscode(code) {
  const value = (code || '').trim();
  if (value.length < MIN_PASSCODE_LENGTH) {
    return { ok: false, error: `Use at least ${MIN_PASSCODE_LENGTH} characters.` };
  }
  return { ok: true, value };
}

/**
 * A recovery code, generated once at setup.
 *
 * This app has no accounts and no server, so there is no "email me a
 * reset link". Without a recovery path, forgetting the passcode would
 * mean losing a year of attendance, grades and compliance records — a
 * far worse outcome than the snooping this protects against. She saves
 * this code in her Drive records folder, which is exactly what that
 * folder is for.
 *
 * Grouped and uppercase, with I/O/0/1 left out, because it gets written
 * down by hand and read back weeks later.
 */
const RECOVERY_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateRecoveryCode() {
  const bytes = randomBytes(16);
  const chars = [...bytes].map((b) => RECOVERY_ALPHABET[b % RECOVERY_ALPHABET.length]);
  return [chars.slice(0, 4), chars.slice(4, 8), chars.slice(8, 12), chars.slice(12, 16)]
    .map((group) => group.join(''))
    .join('-');
}

/** Ignore case, spaces and dashes when checking a hand-copied code. */
export function normalizeRecoveryCode(code) {
  return (code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * A salted, stretched record for ONE secret, with no recovery half.
 *
 * Added Aug 31 2026 for the LearningOS front door. A child's four numbers do
 * not get a recovery code: the recovery path is the parent, who can reset the
 * PIN from the dashboard. Writing a 16-character recovery code for a 9-year-old
 * to keep safe would be a worse answer than "ask your grown-up", which is what
 * the sign-in screen actually says.
 *
 * The same derivation, iterations and salt length as the parent passcode below,
 * so `verifyPasscode` reads either record without caring which it is.
 */
export async function buildSecretRecord(secret) {
  if (!cryptoAvailable()) {
    throw new Error('Secure crypto is unavailable in this browser context.');
  }
  const salt = toHex(randomBytes(16));
  return {
    salt,
    hash: await derive(secret, salt),
    iterations: ITERATIONS,
    createdAt: new Date().toISOString()
  };
}

export async function buildPasscodeRecord(passcode, recoveryCode, hint) {
  if (!cryptoAvailable()) {
    throw new Error('Secure crypto is unavailable in this browser context.');
  }
  const salt = toHex(randomBytes(16));
  const recoverySalt = toHex(randomBytes(16));
  return {
    salt,
    hash: await derive(passcode, salt),
    recoverySalt,
    recoveryHash: await derive(normalizeRecoveryCode(recoveryCode), recoverySalt),
    iterations: ITERATIONS,
    hint: (hint || '').trim() || null,
    createdAt: new Date().toISOString()
  };
}

export async function verifyPasscode(record, attempt) {
  if (!record?.hash || !cryptoAvailable()) return false;
  const candidate = await derive(attempt, record.salt, record.iterations || ITERATIONS);
  return constantTimeEqual(candidate, record.hash);
}

export async function verifyRecoveryCode(record, attempt) {
  if (!record?.recoveryHash || !cryptoAvailable()) return false;
  const candidate = await derive(
    normalizeRecoveryCode(attempt),
    record.recoverySalt,
    record.iterations || ITERATIONS
  );
  return constantTimeEqual(candidate, record.recoveryHash);
}

/**
 * Idle auto-lock, in milliseconds.
 *
 * The realistic failure mode is not him guessing the passcode — it's her
 * unlocking the dashboard to enter grades, getting pulled away by a
 * client call or the front door, and the app sitting open. Fifteen
 * minutes is long enough to grade a stack of work without being asked
 * again and short enough that walking away closes it.
 */
export const IDLE_LOCK_MS = 15 * 60 * 1000;
