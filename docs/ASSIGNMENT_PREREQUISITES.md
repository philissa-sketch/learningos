# Assignment prerequisites — scoped, not built

**Written Sept 5, 2026. Platform work, its own deliberate piece, with its own
reason, verification and deploy. Nothing in this document has been built.**

---

## The question the app cannot answer

> *The Hatchet report shouldn't start until the A Long Walk to Water report is
> turned in.*

There is no way to say that. An assignment has a due date and nothing else that
positions it. Every relationship between two pieces of work — this follows that,
this waits for that — has to be smuggled in by hand-computing dates.

## What that cost, measured

A Book Report carries four weekly milestones and a 21-day lead on the first, so
the day it actually lands on a learner's board is **its due date minus 42 days**,
not minus seven.

| | Due | Step 1 opens |
|---|---|---|
| A Long Walk to Water — Salva's well | 2026-09-18 | 2026-08-07 |
| Hatchet — book jacket redesign *(was)* | 2026-10-09 | **2026-08-28** |

Hatchet's reading step opened three weeks before the report it was meant to
follow was even due. Both sat on his board together, which is the exact
complaint that produced `milestoneOpensOn` in August — one level further up.

**This is the third time this shape has been found at a new depth:**

1. Aug 15 — a due date with no run-up. *"A due date with no run-up is half a
   date."* Fixed by `LEAD_DAYS_BY_TYPE`.
2. Aug 16 — a milestone with no start. Every milestone date meant *finish by*
   and none meant *begin*. Fixed by `milestoneOpensOn`.
3. **Sept 5 — two run-ups overlapping.** Each assignment's window is correct in
   isolation and nothing compares one to another.

Each fix looked complete. The next one was sitting one level down.

## The interim fix, and why it is not the answer

Hatchet moved to **2026-10-30** — the earliest date whose minus-42 lands on
Sept 18. It works, and it has two costs worth writing down:

- **It consumed all the slack in Q1.** `QUARTER_DUE_WINDOWS.Q1` ends
  `[10, 30]`. A fifth Q1 report would have nowhere legal to go.
- **It is arithmetic encoding an intent.** Nothing in the data says *this waits
  for that*. Move either date and the relationship silently breaks, and no check
  can catch it, because there is nothing to check against.

---

## The design

### 1. The field is school data. The behaviour is the platform's.

An assignment names its blocker by `slotId`:

```js
{ slotId: 'asg::reading::Q1::2', type: 'Book Report', dueDate: '2026-10-09',
  blockedBy: 'asg::socialStudies::Q1::3', ... }
```

*Which* work waits for *which* is a curriculum decision and belongs in the
Academy's folder. *What it means for one thing to wait for another* is behaviour
every school needs and belongs in `lib/`. That split is the contract in §3c and
this feature should not invent a third answer.

### 2. A prerequisite may delay an opening. It may never strand one.

This is the rule the whole feature turns on, and getting it wrong is worse than
not building it.

```
opensOn = max( dateDerivedOpen , releasedOn )

releasedOn = blocker turned in?  →  the date it was turned in
             blocker overdue?    →  the blocker's own due date
             otherwise           →  the blocker's due date
```

Three consequences, all of them wanted:

- **Turning the blocker in EARLY releases the next one early.** The August rule
  already says being ahead must never mean being told to wait, and a
  prerequisite that ignored an early submission would contradict it.
- **A blocker that is never turned in does NOT block forever.** It releases on
  its own due date regardless. A twelve-year-old who misses one report must not
  lose the next one too, and a quarter must not be able to jam itself.
- **The dependent's own dates still apply.** A prerequisite can only push an
  opening later, never earlier than the run-up its type already earns.

### 3. A missing or circular blocker is ignored, loudly

A `blockedBy` naming a slot that does not exist, or a cycle, resolves to **no
prerequisite** — and says so in the check, not on a child's screen. The
alternative is an assignment that never opens because of a typo, which is the
`contentPack` failure again: a record intact and unreachable.

### 4. What this does NOT do

- It does not gate the assignment's **due date**. The report is still due when
  it is due; only its run-up moves.
- It does not gate **grading, records or compliance**. Nothing about hours or
  attendance changes.
- It does not chain more than one level in the first version. `A → B → C`
  resolves B against A and C against B, each independently. No transitive
  closure walk, no fixed point — the triage tool already showed what depth-3
  reasoning costs.

---

## Where the code has to move first

`assignmentMilestones.js` currently sits in **one Academy's folder** and is
mostly behaviour:

| In that file | Verdict |
|---|---|
| `milestonesFor`, `milestoneOpensOn`, `activeMilestone`, `startByFor`, `leadDaysFor`, `milestoneProgress` | **Behaviour** — every school needs it |
| `MILESTONE_TEMPLATES` (read → notes → draft → polish) | **School data** — a pedagogical choice about how this family breaks work down |
| `LEAD_DAYS_BY_TYPE` | **School data** — "a novel is not read the night before" is a judgement about a particular reader |

So the sequence is: **move the arithmetic to `lib/`, leave the templates and the
lead days in the folder, then add prerequisites to the moved arithmetic.**

Doing it the other way round means writing the feature twice.

⚠️ **Read the behaviour list by hand before moving it.** C3's most expensive
lesson: a closure walk cannot see a fact typed as a literal. Three of nine names
that read as pure arithmetic were carrying one state's filing deadline, one
school year's boundary, and a grade scale that disagreed with the platform's.
Six names is ten minutes. Skipping it is a day.

---

## The check that has to exist

`scripts/verify-assignment-prerequisites.mjs`. It must assert the properties,
never the addresses — the fourth guard in this repo pinned to a fact rather than
a property failed on a correct change.

| # | Assertion |
|---|---|
| 1 | A dependent's first milestone never opens before its blocker's due date |
| 2 | A blocker turned in early releases the dependent on that date, not later |
| 3 | A blocker never turned in still releases the dependent on the blocker's own due date — **nothing strands** |
| 4 | A prerequisite only ever moves an opening LATER, never earlier |
| 5 | A `blockedBy` naming a nonexistent slot resolves to no prerequisite, and the check reports it by name |
| 6 | A cycle resolves to no prerequisite and is reported, not thrown |
| 7 | No two assignments in one quarter have overlapping run-ups unless one declares the other — the fault that produced this document, made checkable |

Assertion 7 is the one that would have caught Hatchet, and it is the reason this
is worth building rather than fixing dates forever.

---

## Then the date goes back

Once this lands, `asg::reading::Q1::2` returns to the three-weeks-after-the-book
pattern every other report in `placeholders.js` uses — **2026-10-09**, with
`blockedBy: 'asg::socialStudies::Q1::3'` saying out loud what the date was
silently encoding. Q1 gets its slack back.

---

## Sequencing against C4

This is platform work and it does not collide with steps 3 through 5, which
touch `src/components/` and the wording debt. It does overlap **§3c Step 1** —
behaviour leaving the slots — because that is exactly what moving the milestone
arithmetic is.

**Cheapest order:** fold the `assignmentMilestones.js` move into the next Step 1
slice, then build prerequisites on top of it. Two pieces of work, one migration
of the same file, rather than moving it twice.

Not urgent. The interim date holds Q1, and Q2's reports are already three weeks
apart with no overlap. The pressure returns when a fifth Q1 assignment needs a
date, or when either of these two dates moves again.
