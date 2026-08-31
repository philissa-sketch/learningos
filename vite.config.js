import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * ---- THE BUILD STAMP IS NOW STAMPED BY THE BUILD (Aug 24, 2026) ----
 *
 * It used to be rewritten by `scripts/package-update.mjs` — the script that
 * zipped the folder she emailed to his computer. That workflow ended when the
 * app moved to Netlify: she pushes to GitHub, Netlify builds, and both
 * machines load the same URL. Nobody runs the packaging script any more.
 *
 * Which left a hardcoded date string in `src/config/buildStamp.js` that would
 * have read `2026-08-23 22:32` forever, printed in the top bar of both
 * computers as though it meant something. **A version number that stops
 * moving is worse than none** — it is a screen that answers "are we on the
 * same build?" with a confident wrong yes.
 *
 * Netlify runs `npm run build`, so the build itself is the only thing that
 * reliably knows when the deployed code was made. Stamped in Atlanta time,
 * because that is the clock she and Lamar are actually reading it against.
 */
const BUILD_STAMP = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})
  .format(new Date())
  .replace(',', '');

// Mission Control Homeschool Academy — Vite config
// Kept intentionally plain. No aliasing tricks, no env-specific branches,
// so this behaves identically on any machine that runs `npm install`.
export default defineConfig({
  plugins: [react()],

  // Read by src/config/buildStamp.js. Applies in `vite dev` too, so the local
  // copy and the deployed one report their versions the same way.
  define: {
    __BUILD_STAMP__: JSON.stringify(BUILD_STAMP)
  },

  server: {
    port: 5173,

    /**
     * Fail to start rather than silently move to 5174.
     *
     * Vite's default is to take the next free port if 5173 is held — by a
     * stale dev server, or a second `npm run dev`. In a local-first app that
     * is not a nuisance, it is data-visibility loss: IndexedDB is scoped per
     * ORIGIN, and localhost:5173 and localhost:5174 are different origins.
     * The app then opens against a DIFFERENT, empty database — no progress,
     * no Khan Academy rows, no attendance — which reads as total data loss.
     *
     * The real risk window is the two-computer handoff: an empty app on his
     * machine invites "the import broke it", and the response to that is a
     * re-import or a reset, which could destroy real work where none had
     * been lost.
     *
     * A visible failure to start is strictly better. If it fires, something
     * else is already on 5173 — close it.
     */
    strictPort: true,
    open: true,

    /**
     * Things inside the project folder that Vite must NOT watch.
     *
     * The parent, Aug 7 2026: "My dev was up. There is something that you are
     * doing that keeps closing it out." She was right, and it was this.
     *
     * Vite watches the whole project root. Three kinds of file were sitting in
     * it and being watched on every change:
     *
     *   - a scratch folder holding 53 files, two of them ~300KB, rewritten
     *     several times a minute while patches were being applied
     *   - src.backup-preQ3/ — a full 4.8MB second copy of src/, every .jsx in
     *     it scanned as if it were live source
     *   - a 4MB .zip of the app
     *
     * This project's folder is a shared mount, so each of those writes lands
     * on the watcher from the other side of the mount. Chokidar on Windows
     * does not survive that indefinitely — it throws, and the dev server goes
     * with it. The scratch folder has been moved out entirely; the rest are
     * ignored here so nothing in this class can take the server down again.
     *
     * Anything added here is invisible to HMR by design. Real source lives in
     * src/ and is unaffected.
     */
    watch: {
      ignored: [
        '**/.mc-patches/**',
        '**/src.backup-*/**',
        '**/*.zip',
        '**/_to_delete/**',
        '**/_build/**',
        '**/.git/**'
      ]
    }
  },

  // The backup copy of src/ must also stay out of dependency pre-bundling —
  // otherwise its duplicate modules get scanned at startup even though they
  // are never imported.
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.{js,jsx}']
  }
});
