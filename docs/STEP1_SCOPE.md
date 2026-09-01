# Step 1 scope — behaviour out of the contract

**Sept 1, 2026. Measured, not estimated.** Nothing has moved. This document is
the scope §3c Step 1 acts on, and it exists because the number in the plan and
the number in the code disagree.

Re-run the measurement with:

```
node scripts/triage-content-names.mjs     -> scripts/content-name-triage.json
```

---

## 1 · What the contract actually contains

| Verdict | Count | |
|---|---:|---|
| **behaviour** | **9** | closure touches no school data at all |
| school-bound | 62 | logic, but welded to a table in an Academy folder |
| school-data | 91 | facts about a school |
| unresolved | 0 | |

§3c estimated 61 behaviour names. Read transitively there are **9**. The
estimate was not careless — it was made by name, and by name it is right:
`affordable`, `sizeFor`, `findFormat`, `instructionMinutes` all sound like
arithmetic. `sizeFor(format)` reads as pure from its signature and touches
`FORMAT_SIZE` on its first line.

The spec's own example came out exactly as written:

```
isSchoolDay -> isHoliday -> holidayName -> HOLIDAY_BY_DATE
```

Fifteen of the 62 bind at depth 3 or 4. That band is precisely where a triage
by eye fails, and it is why this is a script rather than a list.

### The nine

`affordable` · `daysUntil` · `declarationCoversToday` · `getWeekNumber` ·
`instructionMinutes` · `nextDeclarationDeadline` · `patternSubjects` ·
`suggestedGradeFromRubric` · `wordProgress`

Hand-checked, all nine: every one already takes its data as an argument.
`affordable(balance, catalog)`, `wordProgress(size, count)`,
`suggestedGradeFromRubric(scores, criteria)`. They are the shape everything
else is being moved toward, which is the useful thing about them.

---

## 2 · Two routes, and only one asks for a judgment call

| | What moves | What a person has to decide |
|---|---|---|
| **A** | function **and** its table, into `_template/` | every table, one at a time |
| **B** | function into `lib/`; table stays, passed in | nothing |

**Route A needs judgment because the claim it makes is not in the code.**
Putting a table in `_template/` asserts *"this is a sensible default for every
school that will ever enrol."* `BOOK_REPORT_FORMATS` and `HOLIDAY_BY_DATE` are
the same kind of artifact — a named list in an Academy folder. One is plainly
the platform's; the other is one family's days off. A text heuristic run over
all 45 anchor tables put both in the same bucket, which is the demonstration
that there is no mechanical answer.

And the failure is silent. `mergeContent` means a school that does not override
inherits the default and renders correctly. A wrong default never throws — it
teaches somebody else's child from this family's table, with the suite green.
That is the same shape as the `contentPack` one-way door: invisible for exactly
as long as one Academy exists.

**Route B asserts nothing.** The question it asks — *does this function's
closure touch school data* — is already answered by the script above.

**Route B does not foreclose Route A.** Once the logic is in `lib/` and the
table is a parameter, adding a `_template/` default for any single table is a
self-contained change made when that default is actually wanted. One at a time,
no deadline, debt list still only shrinking.

---

## 3 · What Route B costs

### The contract

```
162  today
-62  function names leave the slots
+28  tables that were internal must become named slots
---
128
```

Not a clean −62: seventeen of the 45 anchor tables are already contract names,
but **28 are not** — they are module-internal today, and a function that is
handed its data needs that data to have a name the school can read.

### The code

| | |
|---|---:|
| Contract functions relocating | 62 |
| Intermediate helpers travelling with them | 34 |
| — of those, never in the contract | 17 |
| **Total functions relocating** | **96** |
| Source files they come from | 26 |
| Call-site files to edit | 47 |
| Individual reads to edit | 110 |

The 34 helpers are the part an estimate misses. `isSchoolDay` cannot move
without `isHoliday` and `holidayName`; neither was ever in the contract, and
both sit between it and the data.

### How many tables each function needs handed to it

| Tables | Functions |
|---:|---:|
| 1 | 37 |
| 2 | 15 |
| 3 | 7 |
| 4 | 3 |

**The 3-and-4 table cases are Step 3 arriving early, and they cluster.**
`activeMilestone`, `leadStatus` and `startByFor` want the same three tables.
`findFormat` and `formatsForType` want the same four. A function taking four
positional tables is not a fixed contract, it is a worse one — the answer there
is one named bundle from the slot, which is exactly what §3c Step 3 calls a
shape. Ten functions, about six clusters. They should be left until Step 3
rather than given four parameters now and rewritten later.

---

## 4 · A correction worth recording

An earlier pass in this session tested the 26 **source files** against
`verify-no-learner` and found 15 of them carrying a learner name, a school name,
a guide or a subject identifier — which read as a hard constraint on how much
could move, since `src/lib/` is the ratchet zone and the debt list may never
grow.

**That test was wrong, and wrong in the direction that would have shrunk the
work for no reason.** What moves is a function and its comment, not the file it
was cut from. Tested on the extracted bodies:

| | |
|---|---:|
| Functions clean | 69 |
| Functions that would trip the guard | **2** |

Both are comments, not code:

- **`instructionMinutes`** — quotes the parent by name explaining why measured
  and scheduled minutes are the same hours.
- **`subjectsForDay`** — explains which subject gets the second Wednesday block
  in Q1 and why, naming the curriculum.

Both are genuinely one school's reasoning and neither belongs in the platform.
The fix is the one the repo already requires: **fix the comment, never the
guard.** The reasoning stays with the school; the function travels with a
generic one.

---

## 5 · Suggested slicing

Each slice lands, verifies and deploys alone.

| Slice | Work | Functions |
|---|---|---:|
| **1** | The nine. A pure move — no signature changes at all, no call-site edits beyond the import. | 9 |
| **2** | Single-table functions. One parameter added each. | 32 |
| **3** | Two-table functions. | 15 |
| **4** | Three- and four-table clusters — **or hold for Step 3.** | 10 |

**Excluded deliberately: the 5 elective functions** — `getCurrentGuitarSkill`,
`getGuitarTool`, `getGardenBriefById`, `getGardenDayForWeekOf`,
`getNextGardenDay`. Step 2 removes guitar and garden from the platform
entirely. Moving their logic into `lib/` in Step 1 means moving it twice, and
the second move is a deletion.

Slice 1 is the natural first deploy: it changes no signature, so a regression
can only come from the import path.

### Blast radius

47 files, but the weight is concentrated — `store/useAppStore.js` alone carries
15 reads across five slots, and **24 of the 47 files touch a single read**.
Overlap with the reward HQ work is one file (`components/Rewards/RewardsHome.jsx`,
one read), so §8's sequencing concern barely applies here.

---

## 6 · Baseline at the time of writing

```
ACADEMY=lamar  ->  57 passed, 1 failed
FAIL  verify-content-interface: petal-pestle-academy, 145 missing
```

That failure is the deliberate one. It goes green at Step 4, not by weakening
it and not by removing a folder from the build.

The checks now require an `ACADEMY=` env var, since a second Academy exists —
running them bare fails all 58 with an instruction rather than a result.

---

## 7 · Slice 1, as landed (Sept 1, 2026)

**Six of the nine moved. Three were held, and the reason is the same for all
three: a fact typed straight into the code, where the closure walk cannot see
it.** See the limitation now recorded at the top of
`scripts/triage-content-names.mjs`.

| Moved to | Names |
|---|---|
| `src/lib/scheduler.js` | `daysUntil`, `getWeekNumber` |
| `src/lib/economy.js` | `affordable` |
| `src/lib/writingCheck.js` | `wordProgress` |
| `src/lib/instructionTime.js` *(new)* | `instructionMinutes` |
| `src/lib/timetable.js` *(new)* | `patternSubjects` |

### Held, with reasons

| Name | Why it did not move |
|---|---|
| `nextDeclarationDeadline` | `new Date(year, 8, 1)` — September 1 is **one state's** statutory filing deadline. Belongs to §6's state table, not the platform. |
| `declarationCoversToday` | Its helper `declarationSchoolYear` hardcodes a **July** school-year boundary, while `lib/schoolQuarter.js` already owns `SCHOOL_YEAR_START_DATE = August 3`. Moving it installs a second, disagreeing answer to one question. Tied to the open `SCHOOL_YEAR_START_DATE` item. |
| `suggestedGradeFromRubric` | Inlines seven percentage bands that **disagree** with the thirteen in `lib/gradeScale.js` — 85% is an `A-` to one and a `B` to the other. Reconciling them changes real grades already recorded, which is a decision, not a refactor. |

### Contract

```
162 -> 156
```

The manifest regenerated differs **only** where a name moved — six import lines
and six slot lines, nothing else.

### The one check that had to change, and how

`verify-georgia-hours` asserted `readsFromAcademy(code, 'instructionMinutes')` —
that the compliance panel gets the function *from the Academy slot*. Correct
until the function became the platform's, then it failed on the change it should
have been indifferent to.

The property it exists to protect was never which module the function comes
from. It is **there is one implementation of the credit rule and this panel uses
it** — three hand-rolled copies of `measured + logged` drifted apart here, each
fixed believing it was the last. It now asserts that, plus a new assertion that
the panel never rebuilds the rule by hand. **Nothing was loosened.**

`verify-planner-feeds` and `verify-rotating-block` only needed their imports
repointed.

### Verified

```
ACADEMY=lamar  ->  57 passed, 1 failed   (the deliberate one)
verify-no-learner  ->  18 passed, 0 failed — the debt list did not grow
```

The second Academy's missing count fell **145 -> 140**. Five, not six, because
her hand-written manifest already supplied `patternSubjects` — so it was never
on her missing list. Her manifest now exports one name the contract no longer
asks for, which is harmless and hers to tidy.

**Not yet built or deployed.** `npm run build` cannot run from a session —
`RUN-THE-BUILD.bat`, then verify the deployed bundle rather than the local file.

---

## 8 · What this document does not settle

- **Whether the 28 newly-exposed tables should be named slots or slot members.**
  Route B needs them readable; it does not say at what granularity.
- **Which tables eventually deserve a `_template/` default.** That is Route A,
  it is incremental, and it needs a person per table.
- **Whether slice 4 happens at all**, or waits for Step 3's named interfaces.
