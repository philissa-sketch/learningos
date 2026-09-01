# LearningOS — C3 build session prompt

**Written Sept 1, 2026, at the end of the session that built the second Academy
and found why it could not open. Paste this at the start of the C3 conversation.**

---

## Read first, in this order

| Doc | What it holds |
|---|---|
| `docs/LEARNINGOS_PACK_SPEC.md` §3c | **The job.** The measurement, three rules, four steps |
| `docs/PROJECT_LOG.md`, last entry | C2, an outage I caused, and the rule it earned |
| `src/content/academyContent.js` | The contract as it stands — sixteen slots, and why |
| `scripts/academy-content-needs.json` | The inventory. 162 names. This file is the worklist |

## Where things are

| | |
|---|---|
| Platform | `philissa-sketch/learningos`, branch `master` |
| Live at | `https://learningos-academy.netlify.app` |
| Checks | 58 scripts |
| Academies in the build | two folders; **do not open the one you are not working on** |

---

## The job: C3 — the contract stops being one school's vocabulary

LearningOS is generic at the SLOT level and one school's vocabulary INSIDE each
slot. That is the last thing between multi-school in principle and in practice.

**Measured, not estimated** — against `scripts/academy-content-needs.json`:

```
162   names the platform demands of EVERY Academy
 75   one curriculum's own words     guitarTheory, aerospaceProjects, recipeLibrary
 61   behaviour, not curriculum      affordable, findFormat, milestonesFor
 26   genuinely per-school data      ACTIVE_SUBJECTS, WEEK_PATTERN, allLessons
```

**Only 26 of 162 are things a school should ever be asked for.** The second
Academy fills seven slots from 150 files and 575 exported names and still reports
145 missing — most of it never hers to supply.

### The four steps, in order. Each lands alone.

| Step | Work | Moves |
|---|---|---|
| **1** | **Behaviour out of the contract.** The 61 logic names leave the slots for `lib/`. No curriculum changes at all. | 162 → ~101 |
| **2** | **Features out of the platform.** `src/components/Guitar/` and `src/components/Garden/` — 2,556 lines of one child's extracurriculars — plus the two single-subject games. Nav entries become something an Academy declares. | ~101 → ~40 |
| **3** | **Slots become shapes.** Each slot gets a small named interface. This is the step that ends name matching. | ~40 → ~26 |
| **4** | **The check follows.** `verify-content-interface` asks "does it answer every question its slots claim to answer," not "does it provide every name." | — |

**Step 1 first: it moves the most and touches no curriculum.**

### The test for done

**A new Academy supplies about twenty things about itself and inherits the rest.**
If a new Academy's first morning still owes more than roughly twenty answers,
this is not finished.

---

## Rules that outlive this step

- **Build an Academy in that Academy's folder.** A change to the bones is a
  SEPARATE, deliberate piece of work with its own reason, its own verification
  and its own deploy — never something that happens on the way to something
  else. **This rule exists because ignoring it took a real child's school off
  the air for part of an evening.** See the last log entry.
- **Do not open another Academy's folder to build one.** Not for shape, not for
  schema, not for field names. Two inputs only: the folder you are building, and
  the platform contract. Reading the other folder is how a field from its schema
  gets reported as a hole in this one — that happened, and cost real time.
- **The checks are how you know the running school is fine.** Not by reading its
  content. `node scripts/verify-academy.mjs --household` and the suite.
- **The platform contains no learner.** `verify-no-learner.mjs` reads PROSE as
  well as code, on purpose. Fix your comment, never the guard.
- **The debt list may shrink and must never grow.**
- **A read with no writer is a one-way door.** `contentPack` was read in one
  place and written in none. An Academy that lost it was unreachable from inside
  the app — every record intact — and took a hand-typed database write on each of
  the family's computers. When you add a field, add the thing that writes it and
  the check that proves it.
- **A slot an Academy leaves blank must render as an absent screen, never a
  broken one.**
- **Triage transitively.** `isSchoolDay` → `isHoliday` → `holidayName` → one
  family's own holiday list is three levels deep. Moving it as "pure logic" would
  compile one family's Christmas into the platform, and no name-based guard
  catches it, because a date is not a name. The first triage said 24 names were
  pure; re-run transitively it was 9.

## Traps this repo has already paid for

- **Git locks.** Running git from the agent side strands `.git/*.lock` and
  GitHub Desktop then refuses every commit. `CLEAR-GIT-LOCKS.bat` clears them.
  **Commit from GitHub Desktop, not from the session.** This happened again in
  C2; the session could not even delete the lock it created.
- **`npm run build` cannot run in the session** — Windows-only rollup binaries.
  `RUN-THE-BUILD.bat` runs it.
- **Verify the DEPLOYED bundle for a known string, not the local file.** In C2
  this caught a heading that existed TWICE — one copy fixed, one shipped. A local
  grep would have found it too; nothing prompted one until the bundle disagreed.
- **A tool can report success and produce nothing.** `scan-content-needs.mjs`
  once wrote an empty inventory and the generator built an empty manifest from
  it. Both now refuse an empty inventory. **Read the counts a generator prints.**
- **A check pinned to punctuation or to a sentence is a check that fails on
  unrelated progress.** Three did in C2 — an exact tab literal, an exact button
  phrase, and a stylesheet check reading its own explanatory comment. Assert the
  property, not the wording. `verify-no-learner` is the deliberate exception.
- **Dates: local, never UTC.** `verify-local-dates.mjs` exists because
  `toISOString()` turned a check red every night after 8pm. It caught a new
  script doing it again in C2.

## Settled — do not relitigate

- **The content pack is a FIELD, never the id** (§3a). Changing what a child
  works toward must not change her database.
- **Slot names are LearningOS's own.** PE is PE. A folder called `movement` fills
  the `pe` slot; a folder name is not a vocabulary change.
- **The template never fills `subjects` or `lessons`.** Enforced by the loader.
- **The second Academy's manifest is HAND-WRITTEN and says so at the top.** The
  generator matches names and found 2 of 162 against her folder — not because
  content is missing, but because it is called something else. Translation is
  what a manifest is for.
- **Her records do not migrate.** She starts fresh at a quarter boundary.

## State at handoff

**Uncommitted, needs pushing first:**

- `src/components/Academy/AcademyShell.jsx` — the content-pack picker
- `src/components/FrontDoor/frontDoor.css` — `select` styled alongside `input`
- `scripts/verify-content-pack.mjs` — new, 9 checks, passing
- `scripts/verify-academy.mjs` — new; one Academy alone, plus `--household`
- `scripts/preview-academy.mjs`, `scripts/transform-lessons.mjs` — new tools
- `scripts/verify-guitar.mjs`, `verify-content-interface.mjs`,
  `scan-content-needs.mjs` — **restored to their originals**, undoing C2 edits

**One check is red, deliberately:**

```
FAIL  petal-pestle-academy: provides every name the school asks for — 145 missing
```

That is accurate and it is the job. It goes green at Step 4, not by weakening it
and not by removing a folder from the build.

## Open, unrelated to C3

- **`SCHOOL_YEAR_START_DATE`** still lives in `lib/schoolQuarter.js`, where an
  Academy's content reaches back for it — the last thing content imports out of
  the school.
- **The Configured state has never been used.** Choosing a curriculum currently
  marks an Academy `active` and goes straight to the school. §1's middle state —
  the room plus "run these diagnostics" — is the questionnaire path, unbuilt.
  When it lands it takes over that decision rather than sitting beside it.
- **The second Academy's remaining slots** — `writing`, `pe`, `rewards`,
  `compliance`, `khanSequences` — cannot be filled honestly until Step 3, because
  filling a slot means filling it completely and most of those names are one
  curriculum's words. That is the correct order: fix the contract, then fill.
