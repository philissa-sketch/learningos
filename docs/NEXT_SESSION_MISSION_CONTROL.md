# Mission Control — issue-fixing session prompt

**Written Sept 5, 2026. Paste this at the start of the new conversation, and
work in the `learningos` folder.**

---

## Read first, in this order

| Doc | What it holds |
|---|---|
| **This file, §Triage** | Which issues to fix now and which to leave alone |
| **This file, §Traps** | The four ways a fix here silently fails to reach a real screen |
| `docs/GENERIC_INVENTORY.md` | What is platform, what is Academy, measured |
| `docs/PROJECT_LOG.md`, last four entries | What was just changed and why |
| `docs/NEXT_SESSION_C4.md` | The generic-platform plan this must not collide with |

## The first thing to understand

**Mission Control is not a separate product.** It is the school LearningOS
renders. Its screens live in `src/components/Dashboard/` — 36 files, 14,211
lines — inside the same repo. Every Mission Control fix is an edit to the
platform that every future Academy runs.

So the question is never "which project." It is "which order, in one codebase."

---

## Triage — do this before fixing anything

Sort every issue into one of three buckets. **Only bucket A gets fixed in this
session.**

| Bucket | What it is | Verdict |
|---|---|---|
| **A — breaks his schooling today** | Wrong dates, wrong grades, lost attendance, a screen that crashes, a compliance record that is wrong, work not saving | **Fix now.** His school year is running and the compliance file is a legal record |
| **B — wording and naming** | "Mission Control" branding, Commander Nova, Junior Engineer ranks, anything naming him or his subjects | **Leave it.** These are the 52 files on `scripts/generic-debt.json` and they get done in ONE deliberate pass at C4 step 5 |
| **C — structural or feature work in Dashboard** | Screens that need rebuilding, features that need rethinking | **Leave it.** C4 steps 3 and 4 rewrite those files. Work done now is work done twice |

The repo already settled bucket B, twice:

> **Do not fix wording in the middle of debugging.** Every string fixed mid-crash
> is an unverified edit to the school every Academy runs.

> Three of ~23 school-named strings fixed. **Twenty remain — do them in step 5,
> not one at a time.**

### Where a bucket-A fix belongs

| The issue is about | It lives in | Collides with C4? |
|---|---|---|
| A due date, a book, a lesson, a project, an exam, a rank | `src/academies/lamar/` | **No.** Free to fix |
| How a date, grade or schedule is COMPUTED | `src/lib/` | Rarely |
| How a screen renders | `src/components/` | **Yes** — steps 3–5 touch these. Fix only if it is genuinely bucket A |

Most bucket-A issues turn out to be in his folder, which is the good case.

---

## Traps — four ways a fix here silently does nothing

### 1. Editing a seed does not reach a learner who already has the row

This is the one that has now cost two sessions.

`src/academies/lamar/data/academicSuccessCenter/placeholders.js` is **seed data
only**. Real books, dates and statuses live in the `academicBooks` /
`academicAssignments` Dexie tables, hydrated **once per `slotId` and never
overwritten**.

So changing a due date in the seed reaches new Academies only. To move a date on
a real screen you must **also** add an entry to `ASSIGNMENT_CORRECTIONS` in
`src/store/useAppStore.js`, naming the wrong value it replaces so a date the
parent chose herself is walked past.

`verify-assignment-dates.mjs` now holds the two in agreement once both exist. It
cannot see that a seed changed — nothing can see history — so this is the half
that has to be read.

### 2. A stored milestone chain outlives a corrected due date

`milestonesFor` prefers stored milestones over computed ones, because stored
ones carry real progress. So a corrected date moves the assignment and leaves
its weekly steps behind. The correction loop now clears a chain with **no ticked
step**; a chain with any step ticked is his work and is never touched.

### 3. A write is not committed just because it resolved

A Dexie `put` resolves when the request succeeds; the transaction still has to
commit. `location.reload()` can tear the page down first, and the write
vanishes. **Never destroy the page on the strength of a write you have not read
back.**

### 4. The rest, inherited

- **Git locks.** Running git from the agent side strands `.git/*.lock`.
  `CLEAR-GIT-LOCKS.bat` clears them. **Commit from GitHub Desktop.**
- **`npm run build` cannot run in the session** — Windows-only rollup binaries.
  `RUN-THE-BUILD.bat` runs it, and it is a free check before spending a Netlify
  build.
- **Netlify skips the build** unless the commit touched `src/`, `public/`,
  `index.html`, `package*.json`, `vite.config.js`, `tailwind.config.js`,
  `postcss.config.js` or `netlify.toml`. A docs-only commit not rebuilding is
  correct, not a failure.
- **The deployed bundle hash will not match the local build** —
  `__BUILD_STAMP__` differs. Verify by the build stamp on screen.
- **Three addresses, three databases.** The live site, `localhost:5173`, and any
  other port are separate origins with separate records. An empty local copy is
  not data loss.
- **Dates: local, never UTC.** `verify-local-dates.mjs` exists for a reason.

---

## Verify before pushing — all free

```bash
node scripts/verify-assignment-dates.mjs     # dates obey the schedule's own rules
node scripts/verify-no-learner.mjs           # the debt list did not GROW
node scripts/verify-three-doors.mjs          # a parent can still reach every Academy
node scripts/verify-parses.mjs               # 517 files parse
```

Run them as `ACADEMY=lamar node scripts/<name>.mjs`. There are 59 scripts;
**58 pass and 1 is a deliberate red** — `verify-content-interface`,
petal-pestle-academy's 140 missing names, which goes green at §3c step 4 and not
by weakening the check or deleting a folder.

Then `RUN-THE-BUILD.bat`, then commit and push from GitHub Desktop.

---

## Rules that outlive this session

- **Build an Academy in that Academy's folder.** A change to the bones is a
  SEPARATE, deliberate piece of work with its own reason, verification and
  deploy. Ignoring this once took a real child's school off the air for part of
  an evening.
- **Do not open another Academy's folder to build one.**
- **The platform contains no learner.** `verify-no-learner.mjs` reads PROSE as
  well as code, on purpose. **Fix your comment, never the guard.**
- **The debt list may shrink and must never grow.**
- **A read with no writer is a one-way door** — and so is a write reachable only
  when the thing is already broken.
- **A tool can report success and produce nothing.** Read the counts. Read the
  record back.
- **Assert the property, not the address.** Four guards here have failed on a
  correct change because they were pinned to where something lived rather than
  to what it guaranteed.
- **Read the behaviour list by hand before moving it.** A closure walk cannot
  see a fact typed as a literal — a filing deadline, a school-year boundary, a
  grade scale.

---

## State at handoff

**Uncommitted in the working tree** (check `git status` first — this may already
be pushed):

```
M docs/PROJECT_LOG.md
M scripts/verify-assignment-dates.mjs
M src/academies/lamar/data/academicSuccessCenter/placeholders.js
M src/store/useAppStore.js
```

That is the Hatchet scheduling fix: the book moves `2026-09-18 → 2026-10-09`
and its report `2026-10-09 → 2026-10-30`, in the seed **and** the correction
table, so the whole chain sits behind Sept 18 rather than straddling it.

**Already shipped this week:** C4 step 1, the three doors — a parent can choose
which Academy to open, add another, and repoint a working Academy at a different
curriculum. `scripts/verify-three-doors.mjs`, 23 checks.

**Known and not yet fixed:**

- `MissionControlBoard.jsx:804` crashes on an Academy with no `compliance` slot.
  `nextDeclarationDeadline` defaults to `() => null` and the call site feeds
  that straight to `daysUntil`, which does `null.split('-')`. **Do not chase
  this one crash** — C4 step 2 is a boot check that would find all of them in
  one run instead of one browser reload at a time.
- Guitar and Garden still ship to every Academy, 2,556 lines, with both tabs
  hardcoded into the nav.
- 85 files still name one school.
