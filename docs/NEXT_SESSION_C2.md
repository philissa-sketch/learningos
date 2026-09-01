# LearningOS — C2 build session prompt

**Written Aug 31, 2026, at the end of the session that made an Academy's content
loaded rather than compiled in. Paste this at the start of the C2 conversation.**

---

## Read first, in this order

| Doc | What it holds |
|---|---|
| `docs/PROJECT_LOG.md`, last three entries | C1, the tooling trap, and the template |
| `docs/LEARNINGOS_PACK_SPEC.md` §1, §3a, §3b, §8 | The three Academy states, changing track, the template, the lesson transform |
| `src/content/academyContent.js` | The contract itself. Sixteen slots, and why each rule is there |

## Where things are

| | |
|---|---|
| Platform | `philissa-sketch/learningos`, branch `master` |
| Live at | `https://learningos-academy.netlify.app` |
| Old school | `https://mission-control-homeschool.netlify.app` — frozen archive, never write |
| Checks | 56 scripts, all passing |
| Front door | 325 kB, down from 4,866 kB |

**C1 is done and deployed.** The school no longer names an Academy — it asks
which one is signed in. One Academy is migrated and live, on two computers,
1,021 rows verified. An Academy with no curriculum shows its own room and can
never open somebody else's school.

**The template is done and deployed.** `_template/` ships a guide with 31 neutral
lines and a readable theme, merged under every Academy slot by slot and name by
name. A missing name is now a less tailored school, not a broken one.

---

## The job: C2 — the second learner's Academy

Display name is her **first name** — what she would write herself at the door.
`petal-pestle-academy` is the **content pack**, which is a separate field on the
Academy record and not the id. Both already decided; see §3a below.

### Her source

The connected folder `petal-pestle-academy` — read-only, the archive. Her
placement is nine strand levels in
`petal-pestle-academy/claude/azianna-diagnostic-results.md`, re-entered by hand.

### The measurement that shapes this step

Her app and this one share almost no module API:

```
her content files          150
her exported names         511
names the school asks for  162
overlap                      2      ← getDailyLine, strandsForSubject
```

**So her content cannot be dropped in. Each slot needs an adapter**, written in
her folder's own `content.js`, translating what she has into what the school
reads. That file is the whole shape of C2.

Of the 162 names, **71 are logic rather than curriculum** — `milestonesFor`,
`findFormat`, `instructionMinutes`. The template answers a few of them today.
Every one it grows is one she does not have to write, and one no Academy after
her writes either. **When the generator reports a missing name, the first
question is whether it is hers to supply or the template's.**

### First step, and it is mechanical

```
1.  copy her content into src/academies/petal-pestle-academy/
2.  node scripts/scan-content-needs.mjs
3.  node scripts/generate-academy-manifest.mjs petal-pestle-academy
```

Step 3 prints exactly which names neither she nor the template has. **That list
is the worklist**, and it already excludes anything inherited.

`scripts/scan-content-needs.mjs` may need slot rules added for her folder
layout — she has `data/herbs/`, `data/movement/`, `data/journal/`,
`data/standards/`, `config/`. Adding rules there is expected; it is tooling, not
the platform.

---

## Decisions already made — do not relitigate

- **`practiceGeneratorId`** — teach `LessonEngine` a static-bank practice path
  (~1 day) rather than write ~512 generator templates. It improves the engine
  either way.
- **`activity` and `ledger`** — carry them over even though nothing renders them
  yet. Preserving data costs nothing; dropping it is permanent.
- **Her video data is richer** than his (`id`, `title`, `channel`, `minutes`,
  `verified`, `teaches`, `sourceGap` against a bare URL string). **His schema
  takes hers**, not the reverse.
- **Her records do not migrate.** She starts fresh at a quarter boundary. Petal
  & Pestle stays read-only.
- **Slot names are LearningOS's own.** PE is PE. Her app drifted from these bones
  once; a third vocabulary in the contract meant to reunite them repeats that
  mistake one layer up.
- **The content pack is a field, never the id** (§3a). A child changing what she
  is working toward must not change her database and lose every hour, grade and
  record she has earned.
- **The template never fills `subjects` or `lessons`.** A default curriculum is a
  school made of nothing that still opens, and it would hide the exact state the
  Empty and Configured screens exist to show a family. The loader enforces it.

### Authoring, not scripting

**256 `connection` paragraphs** (required inside `novaIntro`) and **128 missing
`explanation` strings**. No script writes those. Nine strand levels by hand.

---

## Rules that outlive the step

- **The platform contains no learner.** Enforced by zone in
  `verify-no-learner.mjs`. Do not weaken a zone to make a change pass — when it
  rejected a slot name and then the comment explaining the slot name, both times
  it was right.
- **The debt list may shrink and must never grow.** 131 → 85 so far.
- **Copy, never mutate.** Originals stay untouched until a copy verifies.
- **Code is not live until it is pushed**, and verify the DEPLOYED bundle for a
  known string, not the local file.
- **Rewriting imports means resolving them**, not string-replacing. Depth
  differs per file; getting it wrong fails at runtime, not at build.
- **A module that Academy content imports must not read Academy content at
  module scope.** New in C1. Three of her content files will import date helpers
  out of `lib/`, exactly as his do — a module-scope read there asks for content
  that has not finished loading. Read inside the function instead. Asserted by
  `verify-content-interface.mjs`.
- **Triage transitively.** `isSchoolDay` looked like pure logic one level deep
  and turned out to reach this family's own holiday list three levels down.
  Moving it would have compiled one family's Christmas into the platform, and no
  name-based guard would have caught it, because a date is not a name.
- **Ask before opening a school.** Verifying a deploy renders is worth doing, but
  it puts a real child's curriculum on screen. Say so first.

## Traps this repo has already paid for

- **A tool can report success and produce nothing.** `scan-content-needs.mjs` was
  written to find imports pointing into an Academy folder — the right question
  before C1 and the wrong one immediately after, because removing those imports
  *was* C1. Re-run afterwards it found zero, wrote an empty inventory, and the
  generator built an **empty manifest** from it. Both now refuse an empty
  inventory. Read the counts a generator prints.
- **Git locks.** Committing from the agent side strands `.git/*.lock` files and
  GitHub Desktop then refuses every commit. `CLEAR-GIT-LOCKS.bat` clears them.
  Commit from GitHub Desktop, not from the session.
- **`npm run build` cannot run in the session** — Windows-only rollup binaries
  and no npm registry. `RUN-THE-BUILD.bat` runs it. Look at the chunk sizes.

## Settled — do not undo

- A learner can sign themselves out, with a confirmation rather than the parent
  passcode.
- An empty machine says so in both tabs.
- The 3-group tab structure, quiet tiles as a dead pattern, derived card order,
  PE pinned above the day-kind branch — all parent-negotiated.
- Single-profile in the old `PROJECT_PLAN.md` is reversed on purpose.
- `isSchoolDay` existed twice and the unused copy is deleted. Both were run over
  400 days and agreed on every one before it went.

## Cut list

- The Tailwind token rename — 5,614 occurrences, zero visible effect
- Migrating her old records — she starts fresh
- Supabase — its own project, after C2
- Hand-auditing subject literals — the debt list is the audit, and it is generated

---

## Open, unrelated to C2

- **`SCHOOL_YEAR_START_DATE`** still lives in `lib/schoolQuarter.js`, where an
  Academy's content reaches back for it. It is the last thing content imports
  out of the school. Moving it into the Academy folder closes that loop —
  Tier 2, with a comment already pointing at it.
- **The `placement` slot is empty** for the existing Academy, which predates the
  code. Her folder has a full diagnostic bank, so hers may be what fills it
  first — which would make her the Academy that proves the placement path and
  the Configured state.
- **Two days show implausible lesson counts** — 50 in 16 minutes, 91 in 113,
  against a 0–19 norm. Looks like a bulk mark-complete. Affects the gradebook,
  not the hours. Deliberately left alone.
- **Only 7 of 36 days show 270+ active minutes**, but the dashboard credits
  `max(active, scheduled)`. Worth comparing the two once, to know which number
  would be stood behind.
- **Three `petal-pestle-backup-*.json` files** sit in the repo root by decision —
  reviewed and kept.
