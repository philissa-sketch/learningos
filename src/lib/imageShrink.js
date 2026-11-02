/**
 * Shrink a photo before it is stored, so his work can travel.
 *
 * ---- WHY (Nov 2, 2026) ----
 *
 * The progress export carries attached pictures now (lib/blobTransfer.js), and
 * base64 adds about a third on top of whatever it is given. A phone photo is
 * three to five megabytes, so two of them would put a twelve-megabyte JSON
 * through a download, an email and an import — the point at which the transfer
 * that was supposed to fix the problem becomes the problem.
 *
 * 1600px on the long edge is more than a grader needs to read a nameplate or
 * see which zone a seedling is in, and lands most photos between 150 and 400
 * kilobytes.
 *
 * IT NEVER MAKES A FILE BIGGER. If re-encoding would cost more bytes than the
 * original — already-small screenshots, mostly, where PNG beats JPEG — the
 * original is kept. And if anything at all goes wrong (an unreadable file, no
 * canvas, a format the browser will not decode) the original is kept too: a
 * picture that is larger than ideal is worth having, and a lost one is not.
 */

const MAX_EDGE = 1600;
const QUALITY = 0.82;

export async function shrinkImage(file, { maxEdge = MAX_EDGE, quality = QUALITY } = {}) {
  if (!file || typeof document === 'undefined') return file;
  if (!String(file.type || '').startsWith('image/')) return file;

  try {
    const bitmap = await loadBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, maxEdge / Math.max(width, height));
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    if (bitmap.close) bitmap.close();

    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
    if (!blob || blob.size >= file.size) return file;

    const base = String(file.name || 'photo').replace(/\.[^.]+$/, '');
    return new File([blob], `${base}.jpg`, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

function loadBitmap(file) {
  if (typeof createImageBitmap === 'function') return createImageBitmap(file);
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}
