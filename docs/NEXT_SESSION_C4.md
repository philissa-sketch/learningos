# LearningOS — C4 build session prompt
**Written Sept 3, 2026, at the end of the session that shipped Step 1 slice 1,
made a thin Academy open at all, and then found that a parent cannot reach one.
Paste this at the start of the C4 conversation.**

---

## Read first, in this order

| Doc | What it holds |
|---|---|
| **This file, §The job** | Why the last session's fixes did not make it generic |
| `docs/LEARNINGOS_PACK_SPEC.md` §3a, §3c | The contract, the four steps, and the screen §3a specified and nobody built |
| `docs/PROJECT_LOG.md`, last two entries | C3 and what it cost |
| `docs/STEP1_SCOPE.md` | Step 1 measured — what moved, what did not, and why |
| `scripts/content-name-triage.json` | Which of the 156 names are behaviour, school-bound, or school data |

## Where things are

| | |
|---|---|
| Platform | `philissa-sketch/learningos`, branch `master` |
| Live at | `https://learningos-academy.netlify.app` |
| Checks | 58 scripts — **run them as `ACADEMY=lamar node scripts/<name>.mjs`** |
| Academies in the build | `lamar`, `petal-pestle-academy`, `_template` |
| **Do not open an Academy folder you are not working in** | See the rules |

---

## The job: LearningOS is not reachable as a multi-school platform

The separation underneath is real. Records are in separate databases, content is
in separate folders, and the checks prove both. **A person still cannot use it.**

The parent said it plainly at the end of C3, and she was right:

> *"There isn't an option to choose either school. It just takes me back to
> Mission Control."*

### Three doors do not exist. This is the top of the list

```js
// src/FrontDoorGate.jsx
onParentSignedIn={() => {
  if (academies.length === 0) { …first-run… }
  enter(academies[0].id, 'parent');   // ← always the first Academy
}}
```

| Missing | Consequence |
|---|---|
| A parent cannot choose WHICH Academy | Always lands in `academies[0]` — the first child's school |
| A parent cannot CREATE a second Academy | "Create Academy" opens the parent panel, which signs into #1 |
| A curriculum cannot be CHANGED once it works | `contentPack` is written in two places, both only reachable when the Academy is already broken |

The student door is the only one that takes an Academy id — and a learner is
correctly forbidden from changing a curriculum. **The one door that can choose
is the one that must not choose.**

§3a already specified the third of these — *"Change what you're working toward",
in the grown-up corner of every Academy* — and it was never built. Nothing
anywhere displays which curriculum an Academy is using, so a wrong choice is
invisible until you recognise another child on the screen. `availableAcademyFolders()`
returns folders sorted, so `lamar` is the first option in that dropdown.

### And the platform still shows one school to everyone

Measured, not estimated:

```
156   names the contract demands of EVERY Academy
 91     one school's data          ACTIVE_SUBJECTS, allLessons, COIN_CATALOG
 62     logic bound to that data   isSchoolDay -> isHoliday -> HOLIDAY_BY_DATE
  3     genuinely behaviour        what Step 1 has left to move

 85   files on scripts/generic-debt.json
 52     name a school     ·  32 name a learner
 28     name a subject    ·  16 name a guide

2,556 lines of one child's electives in src/components/Guitar and /Garden,
      with NavBar offering both tabs to every Academy unconditionally
```

---

## The test for done

**A parent creates a second Academy from the front door, signs in, opens it, and
sees nothing of the first school anywhere.** No guide name, no rank names, no
Guitar or Garden tab, no "Mission Control" in any string on any screen.

If any of those appear, it is not done.

---

## The order. Each lands alone, each is verified and deployed alone.

| Step | Work | Why here |
|---|---|---|
| **1** | **The three doors.** Parent picks an Academy · "Add an Academy" that creates one · §3a's change-curriculum screen, reachable from a WORKING Academy, showing the current pack by name | Until these exist nobody can verify anything else by using the app |
| **2** | **The boot check.** Install a manifest with only the five required slots, import every school module, run the store's hydration | C3 found seven crashes one browser reload at a time. Five of them were import-time or hydration and would have failed this check in one run |
| **3** | **§3c Step 2 — features out of the platform.** Guitar and Garden leave `src/components/`. A nav entry becomes something an Academy DECLARES | Three of C3's seven crashes were one child's electives reaching for content a second learner never had |
| **4** | **§3c Step 3 — slots become shapes.** A screen stops asking for `getCurrentGuitarSkill` by name; the slot answers a question | This is the step that ends name matching |
| **5** | **The wording sweep.** All 52 files that name a school, in one pass, shrinking the debt list | Do this as its own deliberate pass — see the rule below |

**Do step 1 first.** It is the smallest and it is the only one whose absence
makes the others unverifiable by a person.

---

## Rules that outlive this step

- **Build an Academy in that Academy's folder.** A change to the bones is a
  SEPARATE, deliberate piece of work with its own reason, verification and
  deploy. This rule exists because ignoring it took a real child's school off
  the air for part of an evening.
- **Do not open another Academy's folder to build one.** Two inputs only: the
  folder you are building, and the platform contract.
- **The platform contains no learner.** `verify-no-learner.mjs` reads PROSE as
  well as code, on purpose. Fix your comment, never the guard.
- **The debt list may shrink and must never grow.**
- **A read with no writer is a one-way door** — and so is a write reachable only
  when the thing is already broken. That is what `contentPack` is today.
- **A slot an Academy leaves blank must render as an absent screen, never a
  broken one.** Enforced now for absent slots; NOT enforced for absent content
  inside a present slot.
- **Triage transitively.** `isSchoolDay` → `isHoliday` → `holidayName` → one
  family's holiday list is three levels deep.

### New, learned in C3 — these are why C3 took as long as it did

- **A closure walk cannot see a fact typed as a literal.** Three names looked
  like pure behaviour and were not: `nextDeclarationDeadline` hardcodes
  September 1 (one state's filing deadline), `declarationCoversToday` hardcodes
  a July school-year boundary that disagrees with `lib/schoolQuarter.js`, and
  `suggestedGradeFromRubric` inlines a grade scale that disagrees with
  `lib/gradeScale.js`. **Read the behaviour list by hand before moving it.**
- **Default by SHAPE, and take the shape from CALL SITES, not return
  statements.** `return schedule[week] || []` is a list, and no reading of the
  return type alone said so. What the callers do with the result is the truth.
- **A function returning a list may be defaulted to `[]`; a function that builds
  a RECORD'S TEXT may not be defaulted at all.** `grammarRowTitle` with an empty
  default writes a blank, untitled row into a real database.
- **A guard pinned to WHERE a function is imported from fails on unrelated
  progress.** `verify-georgia-hours` asserted the compliance panel read
  `instructionMinutes` from the Academy slot; Step 1 moved it to the platform and
  the check failed on a correct change. Assert the property, not the address.
- **Do not fix wording in the middle of debugging.** Every string fixed mid-crash
  is an unverified edit to the school every Academy runs.

---

## Traps this repo has already paid for

- **Git locks.** Running git from the agent side strands `.git/*.lock`.
  `CLEAR-GIT-LOCKS.bat` clears them. **Commit from GitHub Desktop.**
- **`npm run build` cannot run in the session** — Windows-only rollup binaries.
  `RUN-THE-BUILD.bat` runs it.
- **The deployed bundle hash will NOT match the local build.** `vite.config.js`
  injects `__BUILD_STAMP__` from `new Date()` at build time, so Netlify's build
  differs from yours in every chunk carrying it. Verify by the build stamp on
  screen or by the entry hash CHANGING — never by matching your local hash.
- **The SPA redirect returns index.html with status 200 for any missing asset.**
  Checking whether a chunk deployed by fetching it always "succeeds". Test
  whether the body starts with `<`.
- **A tool can report success and produce nothing.** Read the counts a generator
  prints.
- **Dates: local, never UTC.** `verify-local-dates.mjs` exists for a reason.
- **Vite is pinned to port 5173 and refuses to move.** 5174 is a different
  origin, so it would open an empty database and read as total data loss.

---

## Settled — do not relitigate

- **The content pack is a FIELD, never the id** (§3a).
- **Slot names are LearningOS's own.** PE is PE.
- **The template never fills `subjects` or `lessons`.** Enforced by the loader.
- **The second Academy's manifest is HAND-WRITTEN and says so at the top.**
- **Her records do not migrate.** She starts fresh at a quarter boundary.
- **Absent slots resolve to `{}`**, filled AFTER the required-slot check. `{}` is
  truthy; filling first would satisfy every required slot and let a school with
  no subjects through the guard built to refuse it.

---

## State at handoff

**Everything is committed and deployed.** `f145c04`, and the live bundle has
moved. `master` is level with `origin/master`.

**Checks: 57 pass, 1 fails deliberately.**

```
FAIL  verify-content-interface: petal-pestle-academy — 140 missing
```

That is accurate and it is the job. It goes green at §3c Step 4, not by
weakening it and not by removing a folder from the build.

### What C3 shipped

- **Step 1 slice 1** — six names left the contract for `lib/`: `daysUntil`,
  `getWeekNumber` (scheduler), `affordable` (economy), `wordProgress`
  (writingCheck), `instructionMinutes` and `patternSubjects` (two new modules).
  **162 → 156.**
- **A thin Academy opens at all** — absent slots resolve to `{}`; 258 names
  across 81 files got shape-correct defaults; seven crashes fixed, every one the
  same shape: a screen assuming content the Academy does not have.
- Three of ~23 school-named strings fixed. **Twenty remain** — do them in step 5,
  not one at a time.

### What is NOT true yet

- A parent cannot reach the second Academy. **Start here.**
- Nothing asserts a thin Academy boots. Every C3 crash was found by a person
  reloading a browser.
- Guitar and Garden still ship to every Academy.
