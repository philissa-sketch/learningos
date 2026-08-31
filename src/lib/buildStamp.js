// ---------------------------------------------------------------------------
// WHICH COPY OF THE APP AM I LOOKING AT?
//
// ---- WHY THIS EXISTS (Aug 10, 2026) ----
//
// The parent: "when selecting reading on my computer it opens to reading, when
// my son opens the link on his computer it has the coding not the reading."
//
// Nothing was wrong with either machine. Hers was running the current code and
// his was running a copy zipped the day before — from before the Reading &
// Literature lessons were turned on. On his screen that row was still the old
// rotating-block Technology lesson, which is coding. Same app, two versions,
// and no way to tell from either screen.
//
// ---- AND WHY IT CHANGED (Aug 24, 2026) ----
//
// The app moved to Netlify. She pushes to GitHub, Netlify builds, and both
// computers load the same web address — so the two machines can no longer be
// on different builds by accident, and the emailed zip that caused the
// original problem no longer exists.
//
// The stamp itself was rewritten by `scripts/package-update.mjs`, the script
// that made that zip. Nobody runs it now. Left alone, this file would have
// gone on printing `2026-08-23 22:32` in the top bar of both computers
// forever. **A version number that stops moving is worse than no version
// number** — it answers "are we current?" with a confident wrong yes, which is
// precisely the failure the stamp was built to prevent.
//
// So the value now comes from the BUILD, injected by `vite.config.js` at the
// moment Netlify compiles the code. Nothing to remember, nothing to run by
// hand, and it cannot drift from what was actually deployed.
//
// It still earns its place: a tab left open for three days is running
// three-day-old code, and this is the only thing on the screen that says so.
// ---------------------------------------------------------------------------

/**
 * Injected by `define` in vite.config.js — see the note above.
 *
 * The `typeof` guard is not decoration. This module is imported by node guard
 * scripts (`scripts/verify-*.mjs`) that run outside Vite entirely, where the
 * global does not exist; a bare reference would throw a ReferenceError and
 * take the whole suite down.
 */
export const BUILD_STAMP = typeof __BUILD_STAMP__ === 'string' ? __BUILD_STAMP__ : 'dev';

/** Short human label for the nav bar. */
export const BUILD_LABEL = `build ${BUILD_STAMP}`;
