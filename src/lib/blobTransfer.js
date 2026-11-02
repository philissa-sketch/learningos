/**
 * =============================================================================
 * CARRYING A PICTURE BETWEEN THE TWO COMPUTERS.
 * =============================================================================
 *
 * ---- WHY THIS EXISTS (Nov 2, 2026) ----
 *
 * The parent, trying to grade: *"i am trying to grade his school work but
 * unable to read it."* The grading screen had crashed, and underneath the
 * crash was the real fault: a picture he attaches to a hands-on project never
 * left his computer.
 *
 * `exportProgressData` reads the rows out of IndexedDB, where a File is stored
 * whole, and then calls `JSON.stringify`. A File has no JSON form, so it comes
 * out as `{}` — not missing, which would be honest, but an empty object that
 * still looks like a picture to anything that checks the field. The grading
 * card checked the field, handed `{}` to `createObjectURL`, and took the whole
 * Ready-to-Grade list down with it.
 *
 * The card is guarded now. This file fixes the thing the guard was hiding: the
 * bytes travel.
 *
 * ---- WHAT IT DOES, AND WHAT IT DELIBERATELY DOES NOT ----
 *
 * On the way out, a Blob becomes a plain object carrying its name, its type and
 * its bytes as base64. On the way in, that object becomes a File again. Rows
 * with no Blob are returned untouched and unchanged, so a table that never
 * holds one pays nothing.
 *
 * It does NOT touch `fullBackup.js`. That file walks every store in every
 * database for a whole-machine migration, and a picture is not what a
 * migration is for. The progress export is the one the parent actually
 * receives his work through, so it is the one that has to carry his work.
 *
 * BASE64 IS CHUNKED on purpose. `btoa(String.fromCharCode(...bytes))` spreads
 * the whole array into arguments and throws RangeError on anything above a few
 * hundred kilobytes — which is every phone photo. Chunking is not a
 * micro-optimisation here; it is the difference between working and not.
 */

const MARKER = '__transferBlob';
const CHUNK = 0x8000;

function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

function base64ToBytes(b64) {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

/** Is this value a real Blob/File, rather than the husk a JSON round-trip leaves? */
export function isTransferableBlob(value) {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

/** Already-encoded on its way through an export. */
export function isEncodedBlob(value) {
  return Boolean(value) && typeof value === 'object' && value[MARKER] === 1 && typeof value.data === 'string';
}

/**
 * Rows out, with every Blob field turned into something JSON can hold.
 *
 * Returns the SAME array when nothing had a Blob in it — so the common case
 * costs one pass and no copying.
 */
export async function encodeBlobFields(rows, fields) {
  if (!Array.isArray(rows) || !rows.length) return rows;
  let touched = false;
  const out = await Promise.all(
    rows.map(async (row) => {
      if (!row) return row;
      let next = row;
      for (const field of fields) {
        const value = row[field];
        if (!isTransferableBlob(value)) continue;
        const bytes = new Uint8Array(await value.arrayBuffer());
        if (next === row) next = { ...row };
        next[field] = {
          [MARKER]: 1,
          name: value.name || null,
          type: value.type || 'application/octet-stream',
          size: value.size,
          data: bytesToBase64(bytes)
        };
        touched = true;
      }
      return next;
    })
  );
  return touched ? out : rows;
}

/**
 * Rows in, with every encoded blob turned back into a File.
 *
 * An un-decodable value is set to null rather than left as a husk: null is a
 * picture that is not here, and every screen already handles that. A husk is
 * a picture that looks present and is not, which is the bug this whole file
 * exists because of.
 */
export function decodeBlobFields(rows, fields) {
  if (!Array.isArray(rows) || !rows.length) return rows;
  return rows.map((row) => {
    if (!row) return row;
    let next = row;
    for (const field of fields) {
      const value = row[field];
      if (value === undefined || value === null || isTransferableBlob(value)) continue;
      if (next === row) next = { ...row };
      if (!isEncodedBlob(value)) {
        next[field] = null;
        continue;
      }
      try {
        const bytes = base64ToBytes(value.data);
        const type = value.type || 'application/octet-stream';
        next[field] = typeof File !== 'undefined'
          ? new File([bytes], value.name || 'attachment', { type })
          : new Blob([bytes], { type });
      } catch {
        next[field] = null;
      }
    }
    return next;
  });
}
