# Mission Control — session prompt

**Written Sept 8, 2026, at the end of the session that fixed the book-report
load, the lesson sequencing and a planner that was deleting itself. Paste this
at the start of the new conversation, and work in the `learningos` folder.**

---

## Read first, in this order

| Doc | What it holds |
|---|---|
| **This file, §Triage** | Which issues to fix now and which to leave alone |
| **This file, §Traps** | Six ways a fix here silently fails, four of them paid for on Sept 5-8 |
| `docs/PROJECT_LOG.md`, entries from Sept 5-8 | Everything below, with the evidence |
| `docs/GENERIC_CARRYOVER.md` | What belongs to the PLATFORM and must not be fixed here |
| `docs/NEXT_SESSION_C4.md` | The generic-platform plan this must not collide with |

## The first thing to understand

**Mission Control is the school LearningOS renders.** Its screens live in
`src/components/Dashboard/`, inside the same repo, and every fix there is a fix
to the platform that every future Academy runs.

So the question is never "which project." It is **"which folder does this
belong in"**:

| Change is about | It lives in | Safe to change here? |
|---|---|---|
| A due date, a book, a project, a lesson, a week | `src/academies/lamar/` | **Yes.** Free |
| How a date or grade is COMPUTED | `src/lib/` | Only if the bug is genuinely there |
| A screen | `src/components/` | C4 steps 3-5 rewrite these — fix only real bucket A |

**If the fix is in `src/lib/` or `src/store/`, stop and check
`docs/GENERIC_CARRYOVER.md` first.** Three faults last week looked like this
school's and were the platform's.

---

## Triage

| Bucket | What it is | Verdict |
|---|---|---|
| **A** | Wrong dates, wrong grades, lost work, a crash, a wrong compliance record, work due before it is taught | **Fix now** |
| **B** | Wording, branding, rank names, anything naming him or his subjects | **Leave it.** One deliberate pass at C4 step 5 |
| **C** | Screens needing rebuilding | **Leave it.** C4 steps 3-4 rewrite those files |

---

## Traps — how a fix here silently does nothing, or does harm

### 1. A seed edit does not reach a learner who already has the row

`placeholders.js` is seed data. Real dates live in Dexie, hydrated **once per
`slotId`, never overwritten**. To move a date on a real screen you must ALSO add
an entry to `ASSIGNMENT_CORRECTIONS` in `useAppStore.js`, naming the wrong value
it replaces. `fromDueDate` and `fromNote` take **arrays** — a database that took
an earlier correction sits on different data than one that never did, and both
must be reachable.

### 2. Fixing a real bug is not evidence that it was THE bug

Sept 5-6, twice in a row. A genuine bug was found in the field trip dedupe, a
genuine fix shipped, and the parent was told her missing trips were explained.
They were not: her rows were all dated and the bug only touched undated ones.
The real cause was a third thing entirely.

**Reproduce the reported symptom against the real data before claiming a cause.**
When the data is in her browser, ask for a read-only console dump. One paste
ended a week of wrong answers:

```
field trip rows: 348 | visible: 1 | tombstoned: 347
```

### 3. A tombstone is not a row

Soft-deleted rows stay in Dexie and keep travelling in exports — that is what
made recovery possible. It also means **every function handed "all rows" gets
the tombstones too.** `planFieldTripDedupe` ranked deleted rows against live
ones, and the deleted ones won on the oldest-`createdAt` tie-break, deleting one
live trip per hydrate for weeks. Fixed, but check the shape anywhere else rows
are grouped, ranked or deduped.

### 4. Two systems schedule the same thing

A project appears in **both**:

| | Says |
|---|---|
| `weeklySchedule.js` — Writing Journal | *build this in week N* |
| `placeholders.js` — Success Center | *write-up due on this date* |

Fixing one and not the other moved a write-up ten months from its build. **Check
both, always.** Same for `isHoliday` (11 federal days) vs `EXCLUDED_RANGES` (the
real breaks) — they disagree and mean different things.

### 5. Read the declared value; do not derive it

Every lesson carries `quarter`. A check was written that *estimated* when a
lesson would be reached from sessions-per-week, and it was wrong on half of what
it measured — `ae7-rocket-design` declares Q2, the estimate said Q1. Comments
lie too: three separate comments last week asserted facts the code did not do,
and one of them put an unteachable project on his board for weeks.

### 6. The rest, inherited

- **Git locks.** `CLEAR-GIT-LOCKS.bat`. **Commit from GitHub Desktop.**
- **`npm run build` cannot run in-session** — `RUN-THE-BUILD.bat`.
- **Netlify skips docs-only commits.** Correct, not a failure.
- **Three addresses, three databases.** Live, `localhost:5173`, anything else.
  An empty local copy is not data loss.
- **Dates: local, never UTC.**

---

## Verify before pushing — all free

```bash
ACADEMY=lamar node scripts/verify-assignment-dates.mjs          # 15
ACADEMY=lamar node scripts/verify-lesson-before-assignment.mjs  #  4
ACADEMY=lamar node scripts/verify-field-trip-records.mjs        # 70
ACADEMY=lamar node scripts/verify-planner-feeds.mjs             # 175, 2 RED ON PURPOSE
ACADEMY=lamar node scripts/verify-no-learner.mjs
ACADEMY=lamar node scripts/verify-parses.mjs
```

Then `RUN-THE-BUILD.bat`, then commit from GitHub Desktop.

**`verify-planner-feeds` is meant to be red.** Its two failures are decisions
the parent made, not defects — see below. `verify-content-interface` is also
deliberately red (the second Academy's 140 missing names; that goes green at C4
§3c step 4). **Do not "fix" either to get green.**

---

## State at handoff

Everything is committed through `4fd50d6` except a `docs/PROJECT_LOG.md` edit.

### Shipped Sept 5-8

- **Book reports cut from 7 to 3, all in language arts** — one per quarter, the
  standard the parent asked for. Non-ELA reports became Portfolio Entries or
  were retired.
- **Nothing is due before the lesson that teaches it.** Assignments carry
  `needsLesson`; `verify-lesson-before-assignment` compares declared quarters.
- **Science lessons quartered** (Q1 12 · Q2 6 · Q3 11 · Q4 7 · Summer 3) and all
  13 experiments repointed off Aerospace onto Science lessons. **This gates
  them: he sees 12 of 39 now.** Deliberate, chosen by the parent.
- **The field trip planner recovered** — 21 destinations back, one each.
- **The Writing Journal reaches Summer** (weeks 44+), so the wind tunnel sits
  beside its lesson at week 50 with its Lab Report.
- **An unguarded date migration removed** from the platform store.

### Open, in the order the parent set

1. **Repair 2 — the four break weeks.** `w17` Nov 27 (Thanksgiving), `w21`
   Dec 24, `w22` Dec 31 (winter break), `w43` May 28 (closing week). Moves
   writing prompts as well as one experiment, so **she asked to walk through it
   week by week rather than have a rule applied.** Start by showing her what is
   in each of the four and where it could go.
2. **Q1 weeks 5-9 have no hands-on work.** Not an oversight: all three Aerospace
   projects need Q2 or Summer lessons, and Technology's first needs lesson 20 of
   40. The prompts in those weeks document work Q1 does not contain. Needs a
   curriculum decision, not a date change.
3. **Two builds sit before their lessons** — Bottle Rocket (wk 2, lesson Q2) and
   Parachute Drop (wk 4, lesson Summer). **The parent chose to leave these**: he
   has done them, and moving the weeks rewrites a record rather than changing
   what he does. This is one of the two deliberate reds.
4. **He may ask why science shrank.** 27 lessons he could open last week are now
   locked until their quarter. That is the chosen trade; it is worth a word from
   her before he notices.

### Do not do here

Everything in `docs/GENERIC_CARRYOVER.md` — the 21 Georgia field trips in
`src/lib/`, the 40 slot ids in the platform store, the milestone module's move.
**Those are the LearningOS build session's, and the generic version is supposed
to be completely generic.**

---

## Rules that outlive this session

- **Build an Academy in that Academy's folder.** Ignoring this once took a real
  child's school off the air for part of an evening.
- **Do not open another Academy's folder to build one.**
- **The platform contains no learner, and no learner's content.**
- **The debt list may shrink and must never grow.**
- **A tool can report success and produce nothing.** Read the counts. Read the
  record back.
- **Assert the property, not the address** — and note it fails both ways: a
  guard pinned to a name fails on a correct change, and passes over a wrong one.
- **When a check enumerates, the enumeration is the assertion.** A suite that
  measured 10 of 26 projects was green while five had drifted a quarter.
- **A guard that has never failed is not a guard.** Reintroduce the bug, watch
  it fail, put it back.
