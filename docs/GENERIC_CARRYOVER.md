# What the school session found that belongs to the PLATFORM

**Written Sept 5, 2026, at the end of a school-fixing session. Read this before
C4 steps 2-5. Everything here is platform work — none of it can be fixed in an
Academy folder.**

## The standard

**The generic version is completely generic. The platform contains no school's
content — none.** Not a book, not a field trip, not a holiday, not a slot id,
not a date. Those belong to an Academy folder. The platform holds mechanism
only: how a correction reaches a hydrated row, how duplicates collapse, how a
quarter is decided. Every item below is a place where that is not true yet, and
each one is a bug against this standard rather than a matter of taste.

Nothing here asks anyone to touch a learner's records. Every fix is a code move
or a mechanism change.

---

The session it came from was fixing one school's schedule. Four of the faults it
found were not that school's at all: they were in `src/lib/` and `src/store/`,
where every Academy runs them. This file is the handover of those, and of the
four construction habits that produced them, so the platform work fixes causes
rather than repeating the same shape in a new place.

Detail for every item is in `docs/PROJECT_LOG.md`, entries dated Sept 5, 2026.

---

## Already fixed. Do not redo these — verify and move on.

| Fault | File | Why it was generic |
|---|---|---|
| **Field trip dedupe deleted undated repeat visits** | `src/lib/fieldTrips.js` | It read a blank date as matching the winner's date, so any second visit planned but not yet dated was soft-deleted on *every* hydrate. Every Academy would lose them. A parent lost a year of planned trips to this. |
| **An unguarded date migration overwrote chosen dates** | `src/store/useAppStore.js` | `readingStaggerMap` wrote due dates with no from-guard, reverting any date a parent set for 21 slots, and fought the corrections table on three of them every boot. Removed; a from-guard was unimplementable because the values it replaced predate the first commit. |

Both are covered by checks now: `verify-field-trip-records` sections 7-8 (62
checks) and `verify-assignment-dates`'s three new guards (15 checks). Both guards
were tested by reintroducing the bug and watching them fail.

---

## Still generic. This is the list.

### 1. Twenty-one Georgia field trips are hardcoded in the platform

`src/lib/fieldTrips.js` exports `DEFAULT_FIELD_TRIPS` — **21 real trips with real
2026-2027 dates**, seeded into every Academy that ever boots:

```
FAB STEM Friday — Clayton County Library (Lovejoy)     2026-08-28
Homeschool Day — Clayton County Library (Lovejoy)      2026-09-28
Michael C. Carlos Museum (Emory)                       2026-10-02
Georgia Aquarium                                       2027-04-16
… 17 more, all metro Atlanta
```

A family in another state gets Clayton County Library programmes on dates that
have already passed. `LIBRARY_TRIP_RENAMES` in the same file names three of them
explicitly. The debt list flags this file only as `["subject"]`, so **nothing
currently describes this as a problem.**

It is Academy content in a platform module. It belongs behind a slot the way
subjects and lessons already do, with the platform keeping only the dedupe, the
sync-id builder and the merge.

**This is a code move, not a data migration. Do not go near anyone's records.**
The seeder only adds destinations a database does not already hold:

```js
const toAdd = DEFAULT_FIELD_TRIPS.filter((d) => !workingRows.some((t) => t.destination === d.destination));
```

Rows already hydrated stay exactly as they are, wherever the list is declared
from — the same once-per-slot, never-overwrite rule as `placeholders.js`. So
moving the list into an Academy folder changes nothing for an existing learner
and stops a new Academy inheriting another family's calendar. A parent put this
plainly, and she was right: a school's field trips are that school's folder's
business, and the only reason this is on a platform list at all is that the
content is currently in the wrong place.

### 2. Forty of one school's slot ids are embedded in the platform store

`src/store/useAppStore.js` carries **32 `asg::` and 8 `book::` slot ids** across
four migrations that run for every Academy:

| Migration | What it is |
|---|---|
| `ASSIGNMENT_CORRECTIONS` | ~29 entries of one school's due dates, formats, notes, retypes |
| `RETIRED_ASSIGNMENT_SLOTS` | three of that school's dropped slots |
| `bookSwapMap` | eight of that school's book titles |
| the wind-tunnel retitle | one slot, by id, with hardcoded dates |

They are inert for another Academy only because the ids will not match. That is
luck, not design, and it is why the file is on the debt list with all four flags
(`learner`, `school-name`, `guide`, `subject`).

**The shape to aim for:** a correction table is a real platform mechanism — a
seed edit cannot reach a hydrated row, and that is true for every Academy. The
mechanism should stay; the *entries* should come from the Academy. The guard
semantics are worth keeping exactly as they are: `fromDueDate` and `fromNote`
accept arrays because a database that took an earlier correction sits on
different data than one that never did, and both must be reachable.

### 3. Assignment milestone behaviour is in an Academy folder, and carries a bug

`src/academies/lamar/data/academicSuccessCenter/assignmentMilestones.js` holds
`MILESTONE_TEMPLATES`, `LEAD_DAYS_BY_TYPE`, `buildMilestones` and
`milestoneOpensOn`. `docs/NEXT_SESSION_C4.md` already records that this is
behaviour sitting in the wrong place and must move in a §3c Step 1 slice.

**Fix this before or during that move, because it moves with it:**
`buildMilestones` dates its steps by plain −7-day arithmetic and never consults
the excluded ranges, so four assignment chains put a weekly step on Fri Nov 27,
inside Thanksgiving break. The exclusion rule is applied to assignment *due
dates* and never inside the *chain*. When the module becomes platform, so does
the bug.

### 4. Two different notions of "not a school day", and the checks use the weaker one

- `isHoliday` → `SCHOOL_HOLIDAYS`: **eleven single federal days** (Labor Day,
  Christmas Day, Juneteenth…).
- `EXCLUDED_RANGES` in `assignmentRecommendations.js`: the **real breaks** —
  Thanksgiving week, winter break, the closing week.

`verify-planner-feeds` asserted "nothing lands on a holiday", passed, and four
weeks of Writing Journal work were sitting inside actual school breaks. The
platform needs one answer to "is this a school day", and every check should use
it. Right now both live in Academy data, but the *question* is the platform's.

### 5. The Writing Journal has no Summer

`weeklySchedule.js` runs weeks 1-43 and ends **2027-05-28**. It covers Q1-Q4.
`schoolQuarter.js` treats Summer as a real period with its own pace and its own
lesson targets, and lessons declare `quarter: 'Summer 2027'`. So content whose
lesson is taught in Summer has **nowhere to live** in the weekly schedule — a
project needing a Summer lesson had to be removed from the schedule entirely and
left to its Success Center entry.

Whatever replaces `weeklySchedule` at §3c must cover every period the quarter
model defines, or the model and the schedule will keep disagreeing.

---

## The four habits underneath. These are what actually propagate.

The data faults above cannot travel — `src/academies/_template/` is three files
and carries no lessons, projects, schedule or placeholders. **The construction
habits travel, because they are how the next Academy will be built.** Each
occurred more than once in a single day:

### A guard pinned to a NAME, not the property it protects — 3×

- `readingStaggerMap` guarded on `status`, never on the value it replaced.
- `.gitignore` guarded `*-progress-*.json`; the exports were named `*-backup-*`
  and walked straight past into a commit.
- `verify-assignment-dates` knew two writers by name, so a third was invisible
  by construction.

Already in this log as *assert the property, not the address* — recorded there
as a guard failing on a correct change. It also runs the other way: **a guard
passing over a wrong one.**

### A comment asserting something the code does not do — 3×

- `readingStaggerMap`: *"ONLY rows still sitting on the old stacked date… a date
  the parent has since changed herself is left exactly as it is."* No such check
  existed.
- A seed comment: *"Sept 16 is the Wednesday after the Wind Tunnel Test, the
  last hands-on Aerospace project of Q1."* The lesson is #43 of 49, declared
  Summer. This one sat for weeks and put an unteachable project on a child's
  board.
- `weeklySchedule.js` section headers: *"Q1 (weeks 1-9)"* against
  `schoolQuarter.js`'s weeks 1-13. Everything filed under a header slid one
  quarter early.

A comment stating a *fact* — a date relationship, a count, an ordering, an
"only" — is load-bearing and unverified. Where the fact is checkable, check it.

### Two systems owning the same thing, never compared — 3×

- The Writing Journal (*build this in week N*) and the Success Center (*write-up
  due on this date*) schedule the same projects independently. Fixing one moved
  a write-up ten months away from its build.
- `isHoliday` and `EXCLUDED_RANGES`, above.
- The seed and the corrections table — already known, and the reason
  `placeholders.js` carries a warning in its header.

### A check scoped to a subset, with the fault in the unmeasured part — 2×

- `verify-planner-feeds` measured `[...roboticsProjects, ...technologyProjects]`
  — 10 of 26 planner-scheduled projects. Sixteen unmeasured, and five of those
  had drifted a full quarter.
- `verify-field-trip-records`, 47 checks, was entirely about a *completed* trip
  reaching the compliance packet. Nothing asserted what the cleanup was allowed
  to **remove**, so a deletion bug ran under a green suite.

**When a check enumerates, the enumeration is the assertion.** Prefer deriving
the list from the data over writing it out.

---

## Checks worth making platform-level

60 verify scripts exist; **33 require an `ACADEMY`**, so they measure one school
rather than the contract. These four are generic in substance and could be
promoted as-is:

| Check | Asserts |
|---|---|
| `verify-field-trip-records` §7-8 | the dedupe never deletes a plan; the restore never adds a duplicate |
| `verify-assignment-dates` (3 new) | no date-writer without a from-guard; every correction names what it replaces |
| `verify-lesson-before-assignment` | no assignment is due in an earlier quarter than the lesson it needs |
| `verify-planner-feeds` (new section) | no project precedes its lesson; nothing lands inside a school break |

The last one currently reports **2 deliberate failures**, both decisions the
parent made rather than defects: two builds she chose to leave in the past, and
four break weeks awaiting her review. Do not "fix" those to get green.

---

## Do not relitigate

- **Wording is step 5, in one pass.** Nothing here is a naming fix. The debt
  list may shrink and must never grow.
- **The correction-table mechanism is right.** A seed cannot reach a hydrated
  row. Keep it; move the entries out.
- **`fromDueDate` and `fromNote` accept arrays deliberately.** Removing that
  lands a second fix on half the databases.
- **A soft delete is a soft delete.** Field trips, rewards, assignments and
  self-explanations tombstone rather than erase, and rows keep travelling in
  exports. That is what made a year of deleted field trips recoverable.
