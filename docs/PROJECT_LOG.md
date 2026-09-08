# LearningOS — Project Log

Decisions and reasons, written by hand. Anything countable is generated.

New repository. Mission Control's own `PROJECT_LOG.md` stays with Mission
Control — it is that school's history, 19,000 lines of it, and it does not
belong to the platform. This log starts here.

---

## Step A — the platform gets its own repository (Aug 31, 2026)

LearningOS is now a repository containing no learner. It boots to a front door
and offers to create the first Academy, with zero Academies registered.

### The clean line was not clean

The plan said: move `engine/`, `components/`, `db/`, `lib/`, `store/` — the
bones — and leave `src/data/` behind with the school. Measured before moving
anything, that turned out to be false in a way worth writing down:

| Folder | Files | Reach into `src/data/` or `src/config/` |
|---|---|---|
| `db/` | 2 | **0** |
| `engine/` | 6 | 0 files, but imports `components/`, `lib/novaVoice.js`, `store/` |
| front door path | 9 | **0** |
| `lib/` | 53 | 21 |
| `components/` | 130 | **65** |
| `store/useAppStore.js` | 1 | 22 imports, in one file |

**207 import statements, across 87 files.** Moving those without `src/data/`
produces a repository that does not build — which contradicts the one thing the
acceptance test asks for.

So Step A moved the **platform shell**: the nine front-door files, `db/`,
`academies/`, `main.jsx`, and the guards that hold them. `components/`, `lib/`,
`store/` and `engine/` cross with the first import, together with the content
interface that binds a component to an Academy's folder instead of to a
hardcoded `../data/` path. That interface is not extra work bolted onto the
import — it *is* how a school's content gets attached to an Academy, and it
cannot be designed without a real one to attach.

Copied rather than moved. Mission Control is untouched and still runs; it is the
archive and the fallback, and the rule is copy, never mutate.

### Three deviations from the written plan, each justified by another rule in it

**1. `engine/` did not come.** It is bones, and it belongs here eventually. It
also imports `components/Lesson/`, `components/Mentor/`, `lib/novaVoice.js` —
one Academy's guide — and the store. Six files that cannot compile alone. It
travels with the components it needs.

**2. `ACADEMIES = []` is real, and is not the registry.** The plan asked for an
empty array, and there is one. But an empty array cannot be where Academies live:
a family creates theirs at the front door, on their own machine, minutes after
first opening the app — there is no commit that could have listed it. The real
registry is the `academies` table in the household database. The array stays as
the rule written as something that executes: if a name ever appears in it, a
learner has been welded into the platform, and `verify-no-learner.mjs` fails on
the commit that did it.

**3. `LEGACY_DB_NAME` did not come.** The plan said keep it, because the import
reads from it. Correct — but it names one child's real database, and the first
rule of this repository is that the platform contains no learner. It belongs to
the import script, which is where it will be written, unchanged.

### The home page exists now

Step 2 built the sign-in panel and called it the front door. It was half of one.
The approved mockup is a full page — utility bar, brand bar, hero, four sections,
footer — and sign-in is a **panel that opens over it**, closable, Escape-able.

A remembered learner never sees the page: they go straight into their Academy.
It exists for a first visit, for the signed-out state, and for anyone who reaches
the URL not knowing what this is.

The three example goals in the hero are the mockup's own copy, kept. They are
illustrative — an age and an answer, naming nobody, read from nothing. The
guard distinguishes a subject *identifier* (`'aerospace'` as a string or a key —
a curriculum decision compiled into the platform) from a subject *word* in
marketing prose, because the first is the violation and the second is what the
page is about.

### First run creates an Academy rather than naming one that exists

In Mission Control, first run confirmed a passcode that already existed and
attached a PIN to an Academy the code already knew about. Neither is true here.
Now: create the passcode, show the recovery code once, create the Academy — a
name, four numbers, a generated id — and it is born **Empty**, §1's first state.
It exists, it has its own database, it can be signed into, and it has no
subjects, theme or guide until the questionnaire runs.

Ids get a random suffix rather than a collision check, because two children in
one household really can share a first name, and two Academies called `alex`
must not resolve to one set of records.

### The regression that would have cost a year of records

`FirstRun.jsx` verified the passcode and nothing else. The screen it replaced —
`ParentGate.jsx` — had offered *"Forgot it — use my recovery code"*.

Because the gate wraps the entire app, a forgotten passcode with no recovery
link on screen is **a lockout with the records intact and unreachable**: a year
of attendance, grades and compliance sitting in IndexedDB behind a door with no
handle, and no server anywhere to email a reset link from. `verifyRecoveryCode`
had always existed and was already exported. Only the screen was missing.

It is now on the parent tab and in first run. A used recovery code forces a new
passcode and issues a new recovery code, because otherwise one written-down
string opens the dashboard permanently — worse than the passcode it replaced.
Five checks hold all of it.

### Kept from Step 2, deliberately

- **One error message for every student sign-in failure**, and a decoy
  verification behind it so an unknown name and a wrong PIN take the same time.
  A door that answers "no one by that name" has published the guest list.
- **No font fetched from a CDN.** `index.html` used to preconnect and load three
  faces from Google. A front door that waits on a font CDN hangs on a morning
  when the internet is down.

### Two things left behind that were quietly one school's

- **`src/index.css`** carried a full dark theme, a glow gradient on `body`, and
  print rules for a Report Card and a certificate. It painted every page in one
  school's colours before a component rendered — the second family's Academy
  would have loaded its theme onto a body already committed to someone else's.
  What remains is the Tailwind layers, a full-height root, and a ground colour
  dark enough that the wordless boot frame does not flash white.
- **Learner names in comments.** `db.js` and `householdDb.js` explained
  themselves using one child's name. Documentation for one family reads as
  confusion to everyone else, and it is how a generic file quietly becomes a
  specific one. The reasoning is kept; the names are gone. The guard checks
  comments as well as code for exactly this reason.

### Verified

Three guards, **59 checks, all passing**:

- `verify-no-learner.mjs` (15) — no name, no subject identifier, no age or
  reading level, empty static registry, no reachable curriculum, and the
  acceptance test's two halves
- `verify-academy-db.mjs` (29) — two files may construct a Dexie, neither at
  module load; the schema is recorded where written and replayed in order; one
  importer; nothing renders before a database is open
- `verify-front-door.mjs` (38 assertions, 0 failed) — identical failures proven
  behaviourally, nothing about a child rendered, the recovery path, the panel
  over the page

14 modules reachable from `main.jsx`; every relative import resolves.

**Not verified here: `npm install && npm run build`.** The sandbox this was
built in cannot reach enough of the npm registry. Run it before deploying.

### Before the first deploy — read this

**IndexedDB is scoped to the origin.** A new Netlify site is a new origin, and a
new origin has an empty database. Point the **existing** site at this repository
— same site, same URL — or a child opens a school with nothing in it.

---

## Step B, part one — importing a school (Aug 31, 2026)

The records half of the import. Content and config are still to come.

### It cannot be a script

The obvious shape for "copy one database into another" is a Node script run
from a terminal. It does not work here, and the reason is worth stating once so
nobody tries: **the records are in IndexedDB, in a browser.** There is no file
on disk to read. The copy has to run as a page, at the origin the records
belong to.

That has a consequence for sequencing that matters more than the code:
**relink Netlify to this repository before importing.** A new site is a new
origin, and a new origin has an empty database. The importer will correctly and
truthfully report that no database of that name exists, because at that address
there isn't one.

### The 41 rows, and the fix that would have been wrong

One child's ledger held 41 entries belonging to his sibling — 39 `petal`, 2
`seed` — arriving from an import of her file. The merge deduped by entry id;
hers had never been seen, so 41 unknown rows were added with no error. Nothing
was damaged, because balances are computed per currency. It took two weeks to
notice.

The fix that suggests itself is a constant: copy only `coin` and `credit`. **It
was rejected.** It fixes the case that already happened and hides the next one —
a currency added next year, or a second contaminated table, would pass through
or vanish with equal silence.

What went in instead is a screen. The importer reads the source, **summarises
what is in it**, and copies only what a person explicitly ticked. The ledger
breaks down by currency with row counts and the first few notes attached to
each, because a count does not tell you whose rows these are and *"Ribboned
Braids"* does. Nothing is pre-ticked.

So the contamination stops being a constant in a file that someone has to
maintain, and becomes a line on a screen that reads: `petal — 39 entries · e.g.
"Ribboned Braids"`. That is recognisable in about a second, by the person who
would know.

### Copy, never mutate — enforced, not intended

The source is opened with **no version declared**, so Dexie adopts whatever
schema is already there. This matters more than it looks: `openAcademy()` would
declare 35 versions over a foreign database and force an upgrade, and an upgrade
is a write — to the one database that must never be written.

There is no cleanup step, no "delete once verified", and the guard fails if one
appears. The fix for a bad import is to run it again.

### The check that actually checks

An import reporting success without re-reading has verified nothing. After the
copy, the target is read back and compared against the plan — and a mismatch is
a failure even when every write returned cleanly. A silently dropped row is
precisely the failure mode that took two weeks to find last time.

Tables the source has that this platform does not are reported by name and left
in the original, rather than swallowed. A row with nowhere to go is information.

### Verified

`scripts/verify-import.mjs` — **27 checks**, and it re-runs the real event on
every commit against a fixture built to the counts actually found: 12 coin, 7
credit, 39 petal, 2 seed.

The three that matter most:

- ticking no currency copies **no** rows rather than defaulting to all — a
  default of "everything" is how 41 foreign rows arrived in the first place
- a currency invented after this code was written is surfaced as unfamiliar,
  which an allow-list of known names could not do
- rows that should have been left behind failing to be left behind fails the
  check — the exact shape of the original event

All four guards green: 29 + 38 + 27 + 15.

### Left to do in Step B

Content (`src/data/` → `academies/<id>/`), config from the seed, and the school
UI itself — `components/`, `lib/`, `store/`, `engine/` — which crosses with the
interface that binds a component to an Academy's folder rather than to a
hardcoded content path.

---

## Step B, part two — the school moves in (Aug 31, 2026)

265 files copied, 211 import specifiers rewritten, **62 check scripts passing**.
LearningOS now boots to a front door, creates an Academy, and — for an Academy
that has records — renders the school.

### The rewrite was done by resolving, not by string-replacing

The obvious approach is to search and replace `../data/` with
`../academies/lamar/data/`. It is wrong in a way that would not have shown up
until runtime: the number of `../` segments depends on how deep the importing
file sits, and content files import each other and reach back into `lib/` in
four places. A file at `components/Lesson/diagrams/x.jsx` and one at
`lib/y.js` need different answers for the same target.

So every relative specifier was **resolved to a real file** against the old
tree, mapped through the move table, and re-expressed relative to the importing
file's new home. 211 specifiers changed, **zero unresolved**, and the whole
graph from `main.jsx` — 282 modules — resolves. Every `.js` parses.

### Where the line fell

| Zone | Files | Rule |
|---|---|---|
| **platform** | 13 | absolutely no learner, ever |
| **academy** (`academies/lamar/`) | 78 | naming a subject here is the point |
| **school** (`components/ lib/ store/ engine/ App.jsx`) | 197 | a ratchet — see below |

`config/` is gone. `subjects.js` was content and went to
`academies/lamar/subjects.js`; `buildStamp.js` was platform and went to
`lib/`.

### `index.css` was one Academy's skin all along

It carried a dark palette, a glow on the body, and the print rules for a Report
Card and a certificate — loaded globally, before any component rendered. It is
now `academies/lamar/academy.css`, imported by App when that school renders,
with its `@tailwind` directives stripped because `index.css` already emits them
and a second copy ships the framework twice.

### The ratchet, and why the guard grew three zones

`verify-no-learner.mjs` was absolute and one-line simple when only the front
door existed. A whole school moved in naming a learner or a subject in **131
files**. A flat rule then has exactly two outcomes, both useless: fail on 131
files from the first commit and get switched off, or be watered down until it
catches nothing.

So the tree is read as three zones. The platform zone stays absolute. The
Academy zone is exempt by definition. The school zone gets
`scripts/generic-debt.json` — every file that still names an Academy, listed by
name with what it names.

**The list may shrink. It must never grow.** A file not on the list that starts
naming an Academy fails the build; a listed file that becomes clean is reported
so the line can be deleted. Nobody has to fix 131 files today, and nobody can
add a 132nd by accident.

That is also the spec's own Tier-3 advice made mechanical: don't audit the
literals by hand, let a blank Academy and the check suite name the ones that
actually matter. The list is the audit, and it is generated rather than typed.

### The guards moved too, and four had to be repaired

The 36 content check scripts assert on **import paths inside the code they
check** — `verify-georgia-hours` insists the daily bar is imported from
`georgiaCompliance` rather than retyped, and it proves it with a regex over the
import line. Moving the content moved those lines, so four guards were failing
for the right reason and had to be told the new path.

One more found a real gap rather than a moved path:
`verify-morning-meeting` checks that the instruction files say a push is what
rebuilds the site. `README.md` did not say it, because I had not written a
deploy section. It now says it, and says the thing that matters more:

> **Point the existing Netlify site at this repository — do not create a new
> one.** A new site is a new address, and a new address has an empty database.

`READ-ME-FIRST.txt` came across rewritten, with a section on signing in and on
the recovery code, because both are new and neither is guessable.

### What is still true, and what is not

**True:** LearningOS boots with no Academy, creates one, imports a school into
it, and runs that school.

**Not yet true:** the school is generic. 131 of its 197 files still name one
Academy, and `App.jsx` imports `academies/lamar/academy.css` by name. A second
Academy would render the first one's subjects. That is the next piece of work,
and the debt list is its worklist.

### Verified

**62 of 62 check scripts pass** — 58 inherited, 4 written here. 282 modules
resolve from `main.jsx`. Every `.js` file parses.

**Still not verified: `npm install && npm run build`.** Same sandbox limit as
before. Run it.

---

## The build broke on a stylesheet, and the guard that now stops it (Aug 31, 2026)

`npm run build` failed on the first real run after the school moved:

```
[vite:css] [postcss] academies/lamar/academy.css:18:1:
  '@layer base' is used but no matching '@tailwind base' directive is present.
```

Mine, and invisible when reading the file. Moving one Academy's theme out of
`index.css` and stripping the `@tailwind` directives — so the framework is not
emitted twice — left the `@layer base { }` and `@layer utilities { }` wrappers
behind. In `index.css` they had directives to attach to. On their own they have
nothing.

**PostCSS processes every CSS file as its own entry.** An Academy stylesheet is
imported by a component, so Tailwind runs over it alone. `@apply` is fine — the
plugin is running either way. It is only `@layer` that needs the directive.

The rules are now plain CSS, `@apply` intact, with the reason written above them
so the next person does not put the wrappers back.

### Two things worth keeping from this

**`scripts/verify-academy-css.mjs`** — six checks: exactly one file emits
Tailwind, no imported stylesheet declares a `@layer`, the platform entry never
imports an Academy's stylesheet, every Academy stylesheet is actually loaded by
something, and the palette stays space-separated RGB channels rather than hex
(a hex there breaks every opacity modifier in the app silently — nothing errors,
the colours just stop responding).

**A way to verify CSS without a full build.** The sandbox cannot run `vite
build` — `node_modules` is a Windows install and rollup's native binary will not
load on Linux. But `postcss` and `tailwindcss` are pure JavaScript, so running
the real plugins over each stylesheet reproduces exactly the step that failed.
All four now process clean: index 45.9 kB, academy 4.9 kB, front door 6.5 kB,
home page 7.8 kB.

That closes the CSS half of "cannot verify the build here". The JavaScript half
is still open, and still needs `npm run build` on a real machine.

---

## The build passes (Aug 31, 2026)

`npm run build` — **6.36s, clean.** Step A and both halves of Step B are
verified end to end: 63 check scripts, 4 stylesheets through the real PostCSS,
and now a real production build.

### One number worth watching

`dist/assets/index-*.js` is **4,866.94 kB** (1,389.78 kB gzipped), slightly
LARGER than the school it came from. That is expected and it is temporary, but
it should not be forgotten.

The reason the architecture puts content in `academies/<id>/` is that Vite
code-splits a dynamic import for free — a learner downloads their own Academy
and nothing else. That is not happening yet, because `App.jsx` and 131 other
files import `academies/lamar/…` **statically**. Static imports cannot be split;
they all land in the main chunk.

So the folder split is currently buying separation of *concerns* without
separation of *bytes*. Both arrive together when the school is made generic and
the Academy is reached through one dynamic import — and at that point this
number should fall by roughly the size of one curriculum, for every learner who
is not that learner.

The lazy chunks already in the list (`ParentDashboard` 264 kB, `RewardsHome`
146 kB, `AcademicHome` 72 kB…) are the school's own pre-existing route splits
and are unaffected.

---

## The move to a new address, and the export that would have lost the compliance file (Aug 31, 2026)

LearningOS is getting its own address — `learningos-academy.netlify.app`. The
old one goes back to being the old school until the move is proven.

### Why this needed new code at all

Browser records belong to the exact URL that created them. A move is therefore
not a copy between databases; the records travel as a file.

And **the export that already exists would have quietly ruined it.**
`EXPORT_TABLE_POLICY` excludes nine tables from the daily handoff — the
compliance checklist, the course descriptions, the quarterly evaluations, the
parent's notes about her son. Every one of those exclusions is right for a
handoff between two computers that both hold the records, and every one is
wrong for a move to a machine that holds none.

Reaching for it would have run cleanly, reported success, and dropped the
Georgia record. Nobody would have noticed until the year it was needed.

So a migration file is a separate format with the opposite rule: everything
travels. `scripts/verify-migration.mjs` computes the exclusion list from
`EXPORT_TABLE_POLICY` itself and fails if any of those tables goes missing —
so adding a tenth exclusion tomorrow extends the check automatically.

### A console snippet rather than a button

To read records at the old address, the code has to be RUNNING at the old
address. A button would have meant deploying a new version of the old app over
a child who was using it — which is exactly the mistake made earlier today.

`docs/migration-export-snippet.js` is pasted into the console instead. It opens
each database **without declaring a version**, because declaring one triggers an
upgrade and an upgrade is a write to the one thing that must not be written; and
it aborts rather than leaving an empty database behind if a name does not exist.
It takes every database at the address, not a chosen one — a household database
left behind is a passcode and every PIN lost.

### The bug the guard caught

`tablesTheHandoffWouldMiss()` took the whole file and looked up
`file.tables[name]`. Keys in a file are `database::table`, so every lookup
missed and it returned an empty list — **with no error anywhere.** The one piece
of reassurance a parent most needs on that screen would have rendered as
nothing at all.

It now takes the flat tables, and there is a check asserting that passing the
whole file still returns nothing — so the note explaining the trap stays honest
rather than becoming a story about a bug that was fixed some other way.

### Verified

`scripts/verify-migration.mjs` — 31 checks, including a restore that drops the
compliance table (must fail), a truncated file (must be refused, naming the
table), a daily handoff file offered by mistake (must be refused, explaining the
difference), and the ledger filter still holding on a file restore.

**64 of 64 check scripts pass.** Four stylesheets clean through PostCSS. 283
modules resolve from `main.jsx`.

`docs/MIGRATION.md` is the runbook, in order, with what each failure means.

---

## The move happened (Aug 31, 2026)

LearningOS is at **`learningos-academy.netlify.app`**, with its own name, its own
repository, and Lamar's records inside it.

### What travelled

Exported from `mission-control-homeschool.netlify.app`: **1,062 rows across 46
tables**, from two databases. Restored into `LearningOSDB_lamar-junt`: **1,021
rows**. The difference is exactly 41 — the `petal` and `seed` entries that
belong to his sister.

Twelve spot-checks against the export, all matching:

| | expected | found |
|---|---|---|
| attendance | 36 | 36 |
| ledger | 20 | 20 |
| complianceChecks | 3 | 3 |
| evidenceLinks | 8 | 8 |
| meta · schedule · parentAuth | 1 each | 1 each |
| khanAcademyAssignments | 162 | 162 |
| rewards | 206 | 206 |
| fieldTrips | 213 | 213 |
| academicAssignments | 48 | 48 |
| academicBooks | 20 | 20 |

### The screen did the job it was built for

The currency notes made the decision obvious rather than technical:

```
coin   — 12   "Flight Suit", "Course Correction", "Engineering Workstation"
credit —  8   "Credit for work completed before the Marketplace opened"
petal  — 39   "Ribboned Braids", "Morning warm-up", "Window Box"
seed   —  2   "Sat Week 1 · Seeds"
```

Flight suits on one side, ribboned braids on the other. A hardcoded allow-list
would have produced the same 20 rows and taught nobody anything; this took about
a second to read and will work the same way for a currency invented next year.

`credit` came back as 8 rather than the audited 7 — one earned since. The count
moved and nothing broke, which is the point of not hardcoding it.

### What it cost to get here, and the lesson

Three false starts, all mine, all the same shape: **a change was made and not
deployed.**

1. The site was relinked in Netlify's *build settings* rather than its
   *repository* setting, so nothing ever deployed. I read "branch: master" as
   proof the relink worked. It was not.
2. The migration code was written and committed locally but never pushed, so the
   live import screen was the older one with no file tab.
3. Before that, deploying LearningOS to the shared address flipped a child's
   school mid-morning, because a deploy reaches every computer at that address at
   once.

The rule that comes out of it: **after code changes, say plainly that it is not
live until it is pushed, and verify the deployed bundle rather than the local
one.** Checking the live site's JavaScript for a known string took one command
and would have caught two of the three immediately.

### Still open

- **Attendance is 36 against 21 possible weekdays** (Aug 3–31). Not a migration
  fault — the rows were already there. Worth resolving before it becomes a
  compliance answer: summer sessions and weekend activity are legitimate, dev
  test rows are not.
- **Lamar's computer has not been migrated.** It has its own copy of the
  records; the whole process runs again there.
- **`learningos-academy` is not his bookmark yet.** The old address still works
  and still holds everything.

---

## The sign-out only a parent could reach (Aug 31, 2026)

Hours after the migration, from the parent: **"He's unable to logout."**

He was not. Sign Out lived in the Parent Dashboard, behind the passcode, and I
put it there on purpose with a reason written next to it:

> *A Sign Out button on the school side is one a twelve-year-old hits by
> accident mid-lesson and then cannot undo without finding her.*

That reasoning is fine in isolation and wrong for what this platform is FOR.

**Two children share one computer.** That is the premise — it is why records
separate by database, why content separates by folder, why there is a front door
at all. A sign-out only the parent can perform means the second child cannot
reach her own Academy without fetching her mother. Every morning. It is not a
safeguard, it is a queue, and it would have been discovered by Azianna rather
than by a test.

### The fix, and what it cost to be wrong

A sign-out control in the nav bar, next to the coin balance, reachable by the
learner — with a confirmation rather than a passcode:

> **Sign out?** Nothing is lost. Everything you have done is saved on this
> computer and will be exactly where you left it. To get back in you will need
> your name and your four numbers.

The accidental press was a real concern and is handled by asking, which costs one
tap. The worst case was never severe: signing out loses nothing, and getting back
in is a name and four numbers. I had weighted a mild, recoverable annoyance above
a daily blocker on the platform's core use case.

The parent's Sign Out stays in the dashboard too — it is still the right place
for "I am handing this machine to someone else."

### The guard now argues the opposite of what it used to

`verify-front-door.mjs` previously asserted that sign-out was reachable **only**
from behind the parent passcode. It now asserts a learner can reach it, that App
threads it to the nav and not only to the dashboard, that it asks first, and that
the question says both *nothing is lost* and *what getting back in takes* — a
child who believes sign-out deletes their work will never press it.

The old reasoning is kept in the comment above the new checks. A guard that
silently flips its assertion teaches nobody why.

**64 of 64 check scripts pass.**

---

## Both computers, and four bugs a real family found in one evening (Aug 31, 2026)

The move is complete. Both machines are on `learningos-academy.netlify.app`,
each with its own household database, its own Academy record, and 1,021 rows of
verified school. The old address is an untouched archive.

### Everything that broke after "done" was the same bug

Four reports, hours apart, all from the second computer:

1. **He could not sign out.** Sign Out was in the Parent Dashboard behind the
   passcode, on the reasoning that a button on the school side is one a child
   hits mid-lesson. Wrong for a platform whose premise is two children on one
   computer — it made the second child wait for her mother every morning.
2. **His sign-in said the passcode was wrong.** It was not. His machine had no
   Academy on it. The door gave the deliberately vague failure, which is correct
   when there is a guest list to protect and useless when the machine is empty.
3. **Her parent sign-in failed too.** The identical flaw in the other tab, left
   standing after fixing the first. Passcodes are per-machine; a fresh computer
   has none, and the tab offered a form that could not succeed.
4. **The migration file was rejected as a daily export.** Six near-identical
   JSON files in one Downloads folder. The message said which file it was not.

**Every one of them was a screen that told the truth and did not help.** And
every one was on the empty-machine path — the path never walked during
development, because development always happened on a machine that already had
an Academy.

### What changed

- A learner can sign themselves out, with a confirmation instead of a passcode
- An empty machine says so in BOTH tabs, and the parent tab offers the button
  that actually moves forward
- The file validator names what it read: a daily handoff by name, anything else
  by the keys it starts with — and both name the file to look for instead
- The empty-machine screens are components rather than early returns, so no
  conditional return sits above `useState`

Each guard now asserts the pair rather than one instance, because fixing one
side of a shape and leaving its twin is what happened twice tonight.

### For C1

**The first task is to create a blank Academy and walk it cold.** That is also
what the spec's acceptance test has asked for since revision 3, and doing it
would have caught three of tonight's four before a twelve-year-old did.

### Verified

64 check scripts, all passing. Row counts on the second machine match the
first. The original records at the old address were never written to at any
point in the move — which is why four bugs on a school night cost time and
nothing else.

---

## C1 — an Academy's content is loaded, not compiled in (Aug 31, 2026)

The school no longer names an Academy. It asks which one is signed in.

### The cold walk, first, and what it showed

A blank Academy was created on the live site before any code was written — the
task the last entry ended on. The front door, both empty-machine screens, first
run, the passcode, the recovery code and the Academy creation all behaved
correctly, and a new Academy correctly stopped at *"nothing in it yet"*.

Then that Academy's state was moved by hand to `active`, which is where the
second learner lands the day she has anything at all. It rendered the FIRST
Academy's school: its guide, Aerospace Engineering, its rank ladder, its reading
lesson, and a field trip belonging to another child, marked past due.

Its own database had been created and was empty. **Records separated perfectly.
Curriculum had no concept of whose it was.** That is the whole of C1 in one
screen, and it is worth more than the grep that preceded it.

### Why the cheap fix does not exist

The obvious repair is to re-point 205 imports at a shared module that re-exports
everything. Measured properly, that fails: of the 190 names the school imported,
**42 are one curriculum's own words** — `aerospaceQ3Exam`, `gardenProjects`,
`guitarTheory`. A second Academy cannot supply a thing called `aerospaceQ3Exam`.
A shared module listing those names would have compiled one child's curriculum
into the platform while appearing to remove it.

So the contract is by ROLE. Sixteen slots — `lessons`, `timetable`, `guide`,
`pe`, `rewards`, `compliance` — that any Academy can fill, and one generated
manifest per Academy folder saying what it puts in each. `lessons` is the slot;
`aerospaceLessons7` is one Academy's answer to it.

**The slot names are this platform's own, by parent decision.** PE is PE, not
`movement`. The second Academy was meant to be built on these bones and drifted
into a different shape instead, which is the whole reason its content now has to
be adapted rather than dropped in; inventing a third vocabulary in the contract
meant to reunite them would repeat that mistake one layer up. Exactly one name
had to bend, because the platform guard refuses a bare quoted course-provider
name, and nothing was loosened to let it through.

### The guard rejected two of my own drafts, and was right both times

The first slot list named one slot after the outside course provider and one
after the two-letter abbreviation for physical education.
`verify-no-learner.mjs` failed the commit on the first. Then it failed the
*replacement comment*, because the rejected name was still written there in
quotes — which is the reason it reads prose as well as code. A platform file
that must name a vendor to explain itself has not finished separating from it.

### One slot came from reading the second Academy's folder

The rest were derived from the only Academy that exists in code, which is
precisely how a contract only one Academy can honour gets written. Checked
against the second Academy's real folder, one hole appeared: **`placement`** — a
diagnostic bank the first Academy has no equivalent for, because its placement
predates the code. §1 makes placement a state EVERY Academy passes through, so a
contract with nowhere to put diagnostics cannot express the platform's own
middle state.

That Academy also masters and reports on *skills* rather than whole lessons.
That is not a new slot — this platform already has the idea as the strands
hanging off a subject — so its manifest adapts it into `subjects`. Flagged
rather than silently reshaped.

### Two collisions the generator refused to write around

`isSchoolDay` exists twice in one Academy's schedule folder, with two
implementations, each documented as *"the single place the rest of the app
should ask."* Everything compliance-related uses the same one, so nothing is
wrong today. A manifest built by matching names would have imported both, which
is not valid JavaScript, and if it had loaded, one would silently have started
answering questions about attendance. The scan records which MODULE each name is
wanted from, not just the name.

Both games exported `SCORE_LABELS`. Renamed at the source; each component
aliases straight back, so nothing inside either game changed.

### The circular dependency, found by the checks rather than by a family

Three of the Academy's own content files import date helpers out of `lib/`. So
loading a manifest evaluates those `lib` modules **while that manifest is still
loading** — and a module-scope content read there asks for content that has not
finished arriving. It threw in Node, and it would have thrown in the browser.

The rule it produced, now asserted: **a module that Academy content imports must
not read Academy content at module scope.** Two files are in that position; both
read inside the function that needs the value. The longer fix is to move those
date helpers somewhere content can import without reaching into the school —
Tier 2, and there is a comment where someone will find it.

### Why the school's 550 use sites did not change

Every school file reads its slot at the top of the module, so the identifiers
below are untouched:

```js
const { WEEK_PATTERN, isSchoolDay } = academyContent().timetable;
```

That is safe only because the platform reaches the school through **one** dynamic
import, made after `loadAcademyContent()` resolves. `main.jsx` and the shell no
longer statically import `App.jsx` or the store; `SchoolBoot.jsx` is the seam.
So no school module can evaluate before its content exists — structurally, not
by convention. 205 import lines moved. 120 files changed, +391 / −312.

### An Academy with no curriculum now has a room

It shows its own name and says plainly that its lessons have not been added yet.
It never falls through to another Academy's school. The diagnostic detail is
there for a grown-up; the full Configured room, with the questionnaire and the
diagnostics, is C2's.

### The Academy record names its content pack

Not its id. The small reason is that an id is generated on the family's own
machine with a random suffix, so no folder can be authored against it in
advance. The real reason is §3a: **a career track is a field, never a
foundation.** If the folder were the id, changing what a child is working toward
would change her database and cost her every hour, grade and record she had
earned. The record points at a pack; the pack can be repointed; the records stay.

### Verified

**56 check scripts, all passing** — 55 inherited, one written here.
`verify-content-interface.mjs` holds the four properties C1 depends on: nothing
outside an Academy folder statically imports one, the boot path reaches the
school only dynamically, nothing reachable from content reads content at load
time, and every Academy answers the whole contract.

**The generic debt list shrank from 131 files to 85.** The ratchet moved for the
first time.

207 modules reachable from `main.jsx`, down from 283 — the difference is one
Academy's curriculum, which is now behind the glob and code-split per learner.
352 files parse, every relative import resolves, four stylesheets clean through
the real PostCSS.

**Built and deployed.** `npm run build` clean in 9.09s. The deployed bundle was
checked rather than the local one, which is the rule three stalls paid for:

| | before | after |
|---|---|---|
| `dist/assets/index-*.js` | 4,866.94 kB | **324 kB** |
| curriculum | inside that file | `content-*.js`, fetched after sign-in |

Confirmed live at the real address: the entry bundle carries a string that only
exists in this change, carries no `academies/…/data/` path any more, and the
network log shows the curriculum chunk requested only once an Academy signs in.
An Academy pointed at no content pack rendered its own room; the same Academy
pointed at a real one rendered the whole school, with no console errors.

---

## Two follow-ups, and a trap in my own tooling (Aug 31, 2026)

### `isSchoolDay` existed twice; the dead one is gone

Both were documented as the only one anyone should ask. Nothing imported the
`weekPattern.js` copy — every Georgia hour was already filed through
`schoolHolidays.js`. **Checked before deleting rather than assumed:** both were
run over 400 days from Aug 2026 and agreed on every one. Then the unused one
went, with the reasoning left in its place so nobody adds a third.

### The scan wrote an empty inventory, and the generator believed it

Worth writing down because the tool reported success.

`scan-content-needs.mjs` was built to find imports pointing INTO an Academy
folder. That was the right question before C1 and the wrong one the moment C1
landed, because removing every one of those imports was the entire job. Re-run
afterwards it found zero, wrote an empty inventory, and the generator built an
**empty manifest** from it — a school with no curriculum, produced by two
scripts that both exited 0.

Caught only because the manifest was regenerated after deleting `isSchoolDay`
and the output said `0 slots filled, 0 names`.

Three changes came out of it:

- The scan reads the shape the school now uses — `academyContent().slot`
  destructures — and still reports any static Academy import, because one
  reappearing is a C1 regression rather than a normal state.
- **It refuses to write an empty inventory.** A scan finding nothing means the
  scan is looking for the wrong thing; it throws and says so.
- The generator refuses an empty inventory for the same reason, and now resolves
  each name to a module by searching the Academy's own folder — which is what
  makes it usable for an Academy whose files are laid out differently.

The rewritten pair reproduces the live manifest exactly: same 162 names, same 13
slots, same modules, byte-identical slot contents. Only the import lines are
ordered differently, because they are sorted now.

**56 check scripts, all passing.**

---

## The template — the bones ship defaults now (Aug 31, 2026)

### What looking at C2 actually found

Measured against the second Academy's real folder: **2 of the 162 names the
school asks for exist there.** 150 files, 511 exported names, two overlaps. The
two schools share almost no module API, so her content cannot be dropped in —
each slot needs an adapter.

But the number that mattered was different. **71 of those 162 names are
functions, not curriculum** — `milestonesFor`, `findFormat`, `instructionMinutes`,
`getTodaysWorkout`. Nearly half of what a "curriculum folder" must supply is
behaviour, which is the opposite of §1's rule that a fix in the bones reaches
every Academy.

### A wrong number, corrected

The first triage said 24 of those were pure logic that could move to `lib/`
as-is. **It was wrong: only 9 are.** The check looked one level deep, and
`isSchoolDay` → `isHoliday` → `holidayName` → this family's own holiday list is
three. Moving it would have compiled one family's Christmas into the platform —
the precise violation this repository exists to prevent, and one no name-based
guard would have caught, because a date is not a name.

Re-run transitively: 9 pure, 62 bound to this Academy's data. Extraction was not
worth a deploy.

### The real blocker, and the answer already written down

The re-check surfaced something worse than a small saving. The school reads its
content at module scope, so an Academy that does not supply a name hands the
screen `undefined` and it breaks the moment it is used — **for a feature that
Academy may not even have.** No mission proposals, no guitar ladder, no garden
track, and the school still demands all three.

All-or-nothing: 162 names on the first morning, or a broken school.

§3b already answers it, for the guide: *"the template's generic pools, merged
with whatever that Academy's folder adds."* `_template/` has been in the tree
since Step A, empty. It is the same rule for every slot.

So the bones ship a working default, and an Academy overrides only what makes it
different. A missing name is now a LESS TAILORED school rather than a broken one
— which is what §3b says a missing band should be.

### What went in

- **`mergeContent`** — the Academy's answers over the template's, slot by slot,
  name by name. Shallow per slot on purpose: an Academy supplying its own
  `formatsForType` and no `criteriaForFormat` keeps the default for the second.
  Otherwise providing one thing in a slot would silently drop the rest.
- **`_template/guide/dailyLines.js`** — 31 neutral lines. Not a placeholder: at
  three lines a date-seeded guide repeats every third day and a child reads each
  one sixty times over a school year. Every §3b rule holds — no ability praise,
  no level, no learner, no subject, no attributed quotes.
- **`_template/theme/template.css`** — a plain readable school and print rules,
  so a Configured Academy is not unstyled text on white while a family is still
  setting up.
- **The loader refuses a template that fills `subjects` or `lessons`.** A default
  curriculum is not a gentler fallback, it is a school made of nothing that still
  opens — hiding the exact state the Empty and Configured screens exist to show.
- Required slots are checked **after** the merge, so an Academy inheriting a
  working guide and theme is not incomplete for failing to rewrite them.
- The manifest generator no longer reports inherited names as missing. What it
  reports now is the real worklist.

### Verified

**56 check scripts, all passing.** `verify-content-interface.mjs` grew to 23
checks covering the template: it exists, fills at least one slot, never fills
`subjects` or `lessons`, provides no default the school does not read, is not
offered as an Academy, and is actually merged rather than being a folder nobody
loads.

The existing Academy's manifest is **byte-identical** before and after. Nothing
about the running school changed; the template only matters the moment a second
Academy exists.

---

## C2 — the second Academy, an outage I caused, and the contract that has to change (Sept 1, 2026)

### The second Academy exists, and it cannot open

Her content is in `src/academies/petal-pestle-academy/` — 150 files copied from
her archive, originals untouched, every import resolving. Her manifest is
**hand-written**, and that is the first real finding: the generator matches names,
and run against her folder it found **2 of 162**. Not because anything is
missing — because her folder calls things by her names. Translation is what a
manifest was always for; the existing manifest is generated only because that
folder already spoke the school's vocabulary.

She fills seven slots on her own terms: `subjects`, `lessons`, `timetable`,
`guide`, `theme`, `placement`, `exams`. 256 lessons, 270 diagnostic items, 2,560
bank questions. **`placement` had never carried content before** — the slot was
added to the contract by reading her folder, and hers is what filled it.

### What broke, and it was mine

**I took a school off the air for a family for part of an evening.**

The instruction was to build in her folder. I repeatedly edited the shared
machinery instead — the lesson engine, the nav, the front door, the theme
tokens, the transcript. Each change had a reason I found convincing while making
it. **None of them was necessary to add an Academy**, and adding an Academy is
what I had been asked to do.

The recovery was to put every shared file back to its state before I started and
redeploy, which was verified on the deployed bundle rather than the local files.
Her folder is additive and was left in place.

**The rule this earns, and it is not a preference:** building an Academy touches
that Academy's folder. A change to the bones is a separate, deliberate piece of
work with its own reason, its own verification and its own deploy — never
something that happens along the way to something else.

### The lockout was NOT the outage, and it is worth separating

While the above was going on, the first Academy also stopped opening for an
unrelated and much more interesting reason.

`contentPackFor(academy)` returns `academy.contentPack || academy.id`. That field
is the only bridge between an Academy record and its curriculum folder — and it
was **read in one place and written in none**.

An id is generated at the front door with a random suffix, so it does not match
any authored folder name. When the field went missing, the id was used, no folder
of that name existed, and the school showed its own empty room. **Passcode,
state, and a year of records all intact.** Unreachable over one absent string,
with no screen anywhere able to put it back — it took a hand-typed database write,
on each of the family's computers.

**A read with no writer is a one-way door.** That is the whole lesson, and it was
invisible for as long as exactly one Academy existed, because that one happened
to have the field already set.

### What went in, and only this

- **The control** — on both screens an Academy can be stranded on (newly created,
  or pointing at a folder that is not there), a grown-up gets the curriculum
  folders this build carries and choosing one writes `contentPack`. One field.
  Not the id, not the database, not a record. §3a's rule made real: *a career
  track is a field, it is never a foundation.*
- **`scripts/verify-content-pack.mjs`** — nine checks. The pack stays a field
  falling back to the id; something can write it; the write persists to the
  household record; **both** stranded screens offer it; only a grown-up is
  offered it; no folder name is hardcoded. This is the guard that would have
  refused to ship the one-way door.
- **`scripts/verify-academy.mjs`** — one Academy, alone, on its own terms, plus a
  `--household` mode. Written because the 56 existing checks are mostly ONE
  curriculum's, and judging a second Academy by running the first Academy's suite
  and seeing it still pass says the first is undamaged and nothing at all about
  the second.

Three checks caught me while doing it, all correctly: `verify-no-learner`
rejected a comment of mine for naming a learner — it reads prose on purpose;
`verify-local-dates` caught a new script asking UTC what day it is, the bug that
used to turn a check red every night after 8pm; and `verify-guitar` failed on an
edit I had made to the check itself.

### The contract is the real remaining work — see §3c

Measured against the inventory rather than estimated:

| Of the 162 names demanded of every Academy | |
|---|---:|
| One curriculum's own words | **75** |
| Behaviour, not curriculum | **61** |
| Genuinely per-school data | **26** |

**Only 26 of 162 are things a school should ever be asked for.** Her folder
reports 145 missing, and most of them were never hers to supply.

The platform is generic at the SLOT level and one school's vocabulary INSIDE
each slot. A slot must become a shape — *"is today a school day, and what is on
it?"* — that each school answers however it likes. Behaviour moves to the
platform so nobody implements it twice. A feature only one school has leaves the
platform entirely, which is the same answer as the 2,556 lines of one child's
extracurriculars currently sitting in `src/components/`.

**§3c holds the design, the three rules and the four-step sequence.** It is
written for every Academy that will ever be enrolled, not for the one that
exposed it.


---

## C3 — the contract's first six names, and the number that was 61 (Sept 1, 2026)

### 61 was measured by name. Read transitively it is 9

§3c scoped Step 1 as sixty-one behaviour names leaving the slots. Counted
against the code rather than the names — `scripts/triage-content-names.mjs`,
which walks each name's definition to what it references and to what THOSE
reference, to a fixed point — the answer is **nine**.

| Verdict | |
|---|---:|
| behaviour | **9** |
| school-bound | 62 |
| school-data | 91 |
| unresolved | 0 |

The estimate was not careless. By name it is right: `affordable`, `sizeFor`,
`findFormat` and `instructionMinutes` all read as arithmetic. `sizeFor(format)`
is pure in its signature and touches `FORMAT_SIZE` on its first line.

The spec's own worked example came out exactly as written —
`isSchoolDay -> isHoliday -> holidayName -> HOLIDAY_BY_DATE`, three levels. **Fifteen
of the 62 bind at depth 3 or 4**, and that band is precisely where a triage by
eye fails.

### Six moved. Three were held, and the reason is the same for all three

The tool follows references. **It cannot see a fact typed straight into the
code**, and a hand pass over the nine caught three that no closure walk would
have:

- **`nextDeclarationDeadline`** — `new Date(year, 8, 1)`. September 1 is one
  state's statutory filing deadline. It would have shipped Georgia's law to
  every family in every state, silently.
- **`declarationCoversToday`** — its helper hardcodes a July school-year
  boundary while `lib/schoolQuarter.js` already owns a start date that says
  August. Moving it installs a second, disagreeing answer to one question.
- **`suggestedGradeFromRubric`** — seven percentage bands that disagree with the
  thirteen in `lib/gradeScale.js`. 85% is an `A-` to one and a `B` to the other.
  Reconciling changes grades already recorded, which is a decision and not a
  refactor.

A general magic-number detector would flag every sensible constant in the
codebase, so there is nothing useful to automate. The mitigation is that the
behaviour list is short by construction: **read it before you move it.** Nine
names is ten minutes, and that pass caught a third of them.

### What went in

`daysUntil` and `getWeekNumber` to `lib/scheduler.js` · `affordable` to
`lib/economy.js` · `wordProgress` to `lib/writingCheck.js` ·
`instructionMinutes` to a new `lib/instructionTime.js` · `patternSubjects` to a
new `lib/timetable.js`.

Each moved with its reasoning rewritten for any school. Two carried a comment
that named this family — one quoting the parent, one explaining which subject
gets the second Wednesday block in Q1. **The comment was fixed, never the
guard**, and the specific reasoning stayed with the school.

**Contract: 162 -> 156.** The manifest regenerated differs only where a name
moved.

### A check that was pinned to the wrong thing

`verify-georgia-hours` asserted the compliance panel read `instructionMinutes`
**from the Academy slot**. That was right until the function became the
platform's, and then it failed on the change it should have been indifferent to
— the fourth time in this repo a check has been pinned to a fact rather than to
its property.

The property it exists to protect was never which module the function comes
from. It is that **one implementation of the credit rule exists and this panel
uses it**, because three hand-rolled copies of `measured + logged` drifted apart
here and each was fixed believing it was the last. It now asserts that, and a
new assertion refuses a fourth hand-rolled copy. Nothing was loosened.

### Verified

57 passed, 1 failed — the same deliberate red. `verify-no-learner` 18/0: the
debt list did not grow. The second Academy's missing count fell 145 -> 140, five
rather than six because her manifest already supplied `patternSubjects`.

**Built and deployed: not yet.** Scoped in `docs/STEP1_SCOPE.md`, including what
slices 2-4 cost and why the elective functions are excluded from Step 1
entirely — Step 2 deletes them, and moving them first means moving them twice.

---

## C3 continued — a thin Academy opens, and then cannot be reached (Sept 3, 2026)

### The second Academy opened, and showed the first school

After the blank-slot work below, the Academy opened — to Commander Nova, a
Junior Engineer rank ladder, and a spelling list. Not a leak: the tells are all
CONTENT, and they say the Academy was pointed at the wrong pack.

Chasing why produced the finding that matters more than anything else in C3:

```js
// src/FrontDoorGate.jsx
enter(academies[0].id, 'parent');   // always the first Academy
```

**A parent cannot choose which Academy to open, cannot create a second one once
one exists, and cannot change a curriculum once it works.** `contentPack` is
written in exactly two places and both are only reachable when the Academy is
already broken. Nothing displays which pack is loaded, and
`availableAcademyFolders()` sorts, so the first child's folder is the first
option in the dropdown.

**This is the same shape as the C2 outage one turn further on.** That one was a
field read in one place and written in none. This one is a field written only
where it is already broken. The lesson generalises: *a write reachable only from
a failure state is not a writer.*

The parent's verdict — *"there isn't an option to choose either school, it just
takes me back to Mission Control"* — is correct, and it is a fair description of
the platform today whatever the checks say. The separation underneath is real.
It is not reachable.

### What went in

- **Step 1 slice 1.** Six names left the contract for the platform. 162 → 156.
  Three of the nine candidates were HELD, all for the same reason: a fact typed
  as a literal, which the closure walk cannot see. September 1 is one state's
  filing deadline; a July school-year boundary disagrees with the August one
  `lib/schoolQuarter.js` already owns; a seven-band grade scale disagrees with
  the thirteen-band one in `lib/gradeScale.js`.
- **Absent slots resolve to `{}`**, after the required-slot check and never
  before — `{}` is truthy, and filling first would satisfy every required slot.
- **258 names across 81 files** got shape-correct defaults, the shapes read from
  each name's declaration. Then corrected: four were wrong, because the shape
  has to come from what CALL SITES do with the result, not from the return
  statement. `return schedule[week] || []` is a list and nothing about the
  return type said so.
- Functions that build a record's TEXT are deliberately never defaulted. An
  empty `grammarRowTitle` writes a blank, untitled row into a real database.

### Seven crashes, one shape

Every one was a screen assuming content the Academy does not have, found one
browser reload at a time. Five were import-time or hydration and would have been
caught in a single run by a check that mounts a thin Academy. **No such check
exists.** That is the real defect in the process, and it is step 2 of C4.

### A guard that was pinned to the wrong thing

`verify-georgia-hours` asserted the compliance panel read `instructionMinutes`
**from the Academy slot**. Correct until Step 1 moved that function to the
platform, then it failed on the change it should have been indifferent to — the
fourth time in this repo a check has been pinned to a fact rather than to its
property. It now asserts what it always meant: one implementation of the credit
rule exists and this panel uses it. Nothing was loosened.

### Next

`docs/NEXT_SESSION_C4.md`. The three missing doors first — until a parent can
create, choose and re-point an Academy, nothing else can be verified by using
the app.

---

## C4 step 1 — the three doors (Sept 3, 2026)

### What was actually wrong

One line, and it made LearningOS single-school from the outside no matter how
well separated the databases underneath were:

```js
enter(academies[0].id, 'parent');   // always the first Academy
```

Everything downstream of that followed from it. A parent could not choose which
child's school to open. She could not create a second Academy once one existed,
because the home page routes a grown-up through the passcode first and the
passcode landed her inside Academy number one. And `contentPack` — the field
that says which curriculum an Academy is working through — was written in
exactly two places, both of them screens you could only reach once the Academy
was already broken.

Fifty-seven checks passed the whole time. None of them was watching whether a
person could get there.

### The three doors

**Choose.** A new phase in the gate, `'choose'`, and a new component
`src/components/FrontDoor/ParentCorner.jsx`. A verified passcode now ends at a
list of the household's Academies — each one named, with its state and the
curriculum it is pointed at — and the parent presses the one she means. A
machine with no Academies still goes straight to creating the first, because a
choice between nothing is a dead end.

**Add.** "Add an Academy" from that corner, routed to `FirstRun` with
`needsPasscode={false}` so a parent who has just signed in is not asked to
invent a second passcode. Cancelling returns her to the corner rather than the
home page, which would have made her retype the passcode to get back to the
list she was looking at.

**Repoint.** §3a's third door, specified long ago and never built. A working
school now carries a small parent-only chip naming its curriculum, and pressing
it opens the picker. It writes the field and then reloads, because the school
reads its content at module scope: swapping `installed` under a running school
would leave every already-evaluated module holding the old pack, which is the
worst version of this because it looks like it worked.

### Why the screen that shows names is a separate file

`FrontDoor.jsx` may never render a child's name — it is shown to whoever sits
down at the keyboard, and a list of names published to a stranger is exactly
what that rule exists to prevent. `ParentCorner.jsx` renders names freely,
because by the time it exists a passcode has been verified against a PBKDF2
hash, and refusing to show a parent her own children would protect nobody.

They are kept in two files so the difference is checkable. A guard that had to
decide whether a given `.map()` sat before or after authentication would
eventually be wrong. `verify-three-doors.mjs` counts entrances instead: exactly
one caller, and not from the home phase.

### The new guard, and what it is really watching

`scripts/verify-three-doors.mjs`, 20 checks. It is the first check in this repo
that watches REACHABILITY rather than correctness, which is the gap the parent
found and fifty-seven passing checks did not.

Section 4 is the one that matters most. Twice now this repo has shipped a field
read in many places and written in none, or written only from a screen you could
reach when the thing was already broken, and both times it cost an outage on a
real child's school. That section asserts the working-school branch can reach
the writer, that the pack is displayed before it is offered for change, and that
repointing reloads.

### One comment had to be rewritten

`verify-no-learner` failed on `ParentCorner.jsx` for `school-name` — the prose
quoted the parent's verdict verbatim and her sentence names one child's school.
The comment was fixed, not the guard. That is the fifth time that rule has
earned its keep.

### Verified

58 pass, 1 deliberate red — `verify-content-interface`, petal-pestle-academy's
140 missing names, which goes green at §3c Step 4 and not by weakening it.
`verify-no-learner` 18/0, debt 85 → 84 and did not grow. `verify-parses`
517/517.

**Not built and not deployed from here** — `npm run build` needs the Windows
rollup binaries. `RUN-THE-BUILD.bat`, then commit from GitHub Desktop.

### The repoint button did not save — found the same day, by using it

The first version did the obvious thing:

```js
await onAcademyChanged?.({ contentPack });
window.location.reload();
```

and it silently did nothing. A Dexie `put` resolves when the REQUEST succeeds;
the transaction still has to commit, and `location.reload()` tore the page down
before it did. The write vanished, the page came back on the old pack, and the
button looked inert. The parent pressed it, watched a school reload into the
same wrong curriculum, and concluded the feature was broken. She was right, for
a reason neither of us could see from the screen.

**This repo has already paid for this lesson once** — *a tool can report success
and produce nothing* — and it was written down about generators. It is the same
fault one layer down, in a browser database.

`onAcademyChanged` now returns the record as READ BACK out of IndexedDB. The
read is a separate transaction, and IndexedDB will not start it until the write
ahead of it has committed, so a read-back carrying the new value is proof the
write landed. `repointCurriculum` refuses to reload until it sees that, and a
failed save says so on screen instead of destroying the page and pretending
nothing happened.

The rule, generalised: **never destroy the page on the strength of a write you
have not read back.** Three new assertions in `verify-three-doors.mjs` hold it.
Guard now 23/0.

### Next

C4 step 2, the boot check. Then §3c Step 3 — Guitar and Garden out of
`src/components/`, and a nav entry becoming something an Academy declares.
`docs/GENERIC_INVENTORY.md` holds the measured starting point.

---

## Two book reports were open at once (Sept 5, 2026)

The parent: the Hatchet report should not start until the A Long Walk to Water
report is turned in. She was right, and the arithmetic says why.

A Book Report carries four weekly milestones and a 21-day lead on the first, so
the day it lands on his board is its due date **minus 42**, not minus seven.

| | Due | Step 1 opened |
|---|---|---|
| A Long Walk to Water — Salva's well | 2026-09-18 | 2026-08-07 |
| Hatchet — book jacket redesign | 2026-10-09 | **2026-08-28** |

Hatchet's reading step opened three weeks before the report it was meant to
follow was even due. Both were on his board together.

**Third time, third depth.** Aug 15 found a due date with no run-up. Aug 16
found a milestone with no start. This is two run-ups overlapping each other —
each assignment's window correct in isolation, and nothing comparing one to
another. Each fix looked complete and the next was one level down.

### What went in

`asg::reading::Q1::2` moved to **2026-10-30** — the earliest date whose minus-42
lands on Sept 18, the day the other report is due. The reading assignment did
not move; he still reads Hatchet by Sept 18, which means the report's own "read"
step is already satisfied when it opens. That is the correct relationship
between the two and was not true before.

```
OLD  Hatchet step 1 opens 2026-08-28
NEW  Hatchet step 1 opens 2026-09-18
```

Two costs, written down rather than discovered later. Oct 30 is the last day of
`QUARTER_DUE_WINDOWS.Q1`, so **Q1 has no slack left** — a fifth report would
have nowhere legal to go. And it is arithmetic encoding an intent: nothing in
the data says *this waits for that*, so moving either date breaks the
relationship silently and no check can catch it.

Six guards pass, `verify-assignment-dates` among them. The date is legal by the
app's own rules, which is exactly why the rules did not catch the problem.

### The seed moved and his screen did not

The fix above was made in `placeholders.js` and verified, and the parent's
screen still read *Start by Fri, Sep 18 · Finish by Fri, Oct 9*.

`placeholders.js` says why in its own header: real due dates live in the
`academicAssignments` table and are hydrated from the seeds **once per slotId,
never overwritten afterward**. His row was hydrated weeks ago. A seed edit
reaches new Academies only.

`ASSIGNMENT_CORRECTIONS` in `useAppStore.js` is the mechanism built for exactly
this, and its own comment records the day it was learned, Aug 10:

> All of it was fixed in placeholders.js, all of it verified, and none of it
> reached the two databases that actually matter. The parent looked at her real
> screen and the old dates were still there.

**Same file, same trap, one month later, by the same route.** The correction
entry is now in, matching on the old value so a date she chose herself is never
touched.

Two things came out of it beyond the entry:

- **A stored milestone chain was computed from the OLD date.** `milestonesFor`
  prefers stored milestones because they carry his progress — which means a
  corrected due date moved the assignment and left its four weekly steps where
  they were. The correction loop now clears a chain with NO ticked step, so it
  rebuilds from the new date; a chain with any step ticked is his work and is
  never touched.
- **A new assertion**: every correction must land on the same date as its seed,
  or a new learner and an existing one get different days. Eighteen existing
  corrections already satisfied it. It cannot catch that a seed CHANGED —
  nothing can see history — so the other half of the rule is now written in
  prose at the top of `placeholders.js`, where the next person will hit it.

### And then the book itself — the thing she was actually pointing at

The report was a real overlap and it was not what she was looking at. Her card
read:

```
READING ASSIGNMENT   Hatchet — Gary Paulsen
Start by Fri, Aug 28 — start now  ·  Finish by Fri, Sep 18
```

A Reading Assignment carries a 21-day lead — *a novel is not read the night
before* — so a book DUE Sept 18 had been saying **start now** since Aug 28, on
his board beside the report he was supposed to be finishing. A book cannot start
Sept 18 and also be due Sept 18.

`asg::reading::Q1::1` moved to **2026-10-09**, seed and correction together.
That is the date the book report just vacated, and Oct 30 is then three weeks
after it — the pattern every other report in this file uses. The Oct 30 change
stops being a workaround and becomes the natural date.

| | Card now reads |
|---|---|
| Hatchet — reading | Start by **Sep 18** · Finish by Oct 9 |
| Hatchet — book report | Start by Oct 9 · Finish by Oct 30, opens on his board **Sep 18** |
| A Long Walk to Water — report | Start by Aug 28 · Finish by Sep 18 |

The whole Hatchet chain now sits behind Sept 18 instead of straddling it.

**Known and accepted:** Aug 28 to Sept 17 has no new Reading Assignment open.
He is not idle — A Long Walk to Water's report runs notes, draft and polish
across exactly that window — but there is no new book in his hands until
Sept 18. That is the deliberate trade for not having two books open at once,
and it was the parent's call with the gap named in front of her.

### Scoped, not built

`docs/ASSIGNMENT_PREREQUISITES.md` — a `blockedBy` field, and the rule that
matters more than the field: **a prerequisite may delay an opening and may never
strand one.** A blocker turned in early releases the next one early; a blocker
never turned in releases it anyway on its own due date. A child who misses one
report must not lose the next one, and a quarter must not be able to jam itself.

It also records what has to move first: `assignmentMilestones.js` is behaviour
sitting in one Academy's folder, and the templates and lead days inside it are
not. Fold that move into the next §3c Step 1 slice, then build prerequisites on
the moved arithmetic — otherwise the feature gets written twice.

When it lands, Hatchet goes back to 2026-10-09 with the dependency declared out
loud, and Q1 gets its slack back.

---

## Seven book reports, four of them outside language arts (Sept 5, 2026)

The parent, the same day and one level up from the date arithmetic: **a 7th
grader should have about four book reports a year, and they belong to language
arts.** She was reading standard middle-school practice — one major novel
project per quarter for ELA, at most one book project all year for history,
and none at all for science, which is assessed by lab work.

Counted against his year, the split was cleaner than expected.

| Subject | Book reports | Standard |
|---|---|---|
| reading | 3 + a Q3 Presentation | **already correct** — one per quarter |
| socialStudies | 2 | at most 1 all year |
| science | 1 | 0 |
| aerospace | 1 | 0 |

**Nothing was wrong with language arts.** Hatchet (Q1), Hidden Figures (Q2),
The Martian as a Presentation (Q3), March: Book One (Q4) is exactly one major
novel project per quarter. Every excess report was in a subject that should not
have carried one.

### The type is the scaffolding, not the label

`Book Report` is not a name in this app. It is four weekly milestones and a
21-day lead on the first — 42 days on his board — and `Portfolio Entry` is
seven days and no chain. So retyping is a change to what he is looking at, not
to what it is called, and two of these had never been book reports in content
anyway: *build or draw Salva's well* is a model, and the Hatchet jacket
redesign is a cover design. They were carrying six-week scaffolds for an
afternoon's work.

| Slot | Was | Now |
|---|---|---|
| `asg::socialStudies::Q1::3` | Book Report / creative-project | Portfolio Entry / **build**, same Sept 18 date |
| `asg::socialStudies::Q2::3` | Book Report — Red-Tail Angels analysis | **retired** |
| `asg::science::Q3::2` | Book Report / oral-presentation | Portfolio Entry / **investigation**, retitled as a lab |
| `asg::aerospace::Q4::3` | Book Report / parent-interview | Portfolio Entry / **investigation**, retitled as a flight test |

Red-Tail Angels went rather than moved: it was the second history report in a
year that allows one, and Q2 already held the family-history Research Paper two
weeks later, both with 42-day run-ups. `RETIRED_ASSIGNMENT_SLOTS` already
existed for exactly this and already refuses to remove anything graded,
started, completed or carrying a ticked step. The book itself stays.

Board load fell from a seven-work peak to six, and Apr 9 and Mar 19–26 cleared
entirely.

### Two things the retype would have broken quietly

**Format ids are not interchangeable across types.** `formatsForType` returns
four ids for a Portfolio Entry — build, applied-math, investigation,
writing-sample — and `findFormat` returns null for anything else. A format is
the only thing that produces required sections, a checklist and a rubric, so
carrying `creative-project`, `parent-interview` and `oral-presentation` across
would have produced three assignments with **no rubric at all**, graded on
instinct. This file has already paid for that once, on all three research
papers. Every seeded format now validates against its own type.

**Three reading notes promised the reports being removed.** `socialStudies::Q1::2`,
`science::Q3::1` and `aerospace::Q3::2` each said *"the historical analysis /
scientific review / engineering analysis is due three weeks after you finish
it."* Dropping the reports without those would have recreated, pointing the
other way, the exact fault the `fromNote` section was written to fix. Each
`fromNote` now names **both** texts the row has ever shipped with, for the same
reason `fromDueDate` names several: a database that took the Sept 1 correction
holds different text than one that never did, and both are still untouched by
her.

The corrections loop grew a retype branch guarded on the old type **and** the
old format, and refused outright on anything graded, started or part-ticked —
because unlike every other correction here, this one moves the rubric the work
is judged against. A stale type on one assignment costs less than regrading
work he already did. Ten row shapes were replayed against the real loop before
it shipped.

---

## A third date-writer nobody was checking (Sept 5, 2026)

`verify-assignment-dates` passed green all week while `readingStaggerMap` sat in
`useAppStore.js` writing due dates **with no from-guard**:

```js
const target = readingStaggerMap[row.slotId];
if (!target || row.dueDate === target) continue;
if (row.status && row.status !== 'not-started') continue;   // the only guard
await updateAcademicAssignmentRecord(row.id, { dueDate: target });
```

Its own comment promised it moved *"ONLY rows still sitting on the old stacked
date… a date the parent has since changed herself is left exactly as it is."*
The code never checked that. It overwrote **any** not-started row whose date
differed — including one she had just chosen, for any of its 21 slots.

It was also fighting `ASSIGNMENT_CORRECTIONS` on three slots on every single
boot: `reading::Q1::1` (writing 2026-09-18 over the corrected 2026-10-09),
`reading::Q1::2` (2026-10-09 over 2026-10-30) and `socialStudies::Q2::1`
(2026-12-04 over 2026-11-13 — that one since the Aug 30 pass, not this week).
The screen came out right only because the corrections happen to run later in
`_hydrateOnce`. Nothing enforced that order.

**It could not simply be guarded.** A from-guard needs the old stacked dates.
They predate the first commit — `e91e534` already carries the staggered ones —
and `scheduleAcademicAssignment` records nothing marking a date as hers, so a
stacked date from before Aug 7 and a date she picked yesterday are
indistinguishable. The contract was unimplementable as written. The write is
gone rather than guessing at dates in a record that is a legal document;
eighteen of its twenty-one targets already equalled the seed, and the other
three were wrong.

### The guard that should have existed

Four checks were pinned to two writers **by name**. A third was invisible by
construction — the same failure shape this log already recorded as *assert the
property, not the address*, met from the other side: not a guard failing on a
correct change, but a guard passing over a wrong one.

`verify-assignment-dates` now asserts the property. **11 checks → 15.**

- no `slotId -> bare date` map may write dates outside `ASSIGNMENT_CORRECTIONS`
- every correction that moves a date must name the date it replaces
- every retype must name both the type and the format it replaces

All three were tested by reintroducing the bug and watching them fail, then
reverting. A guard that has never failed is not a guard.

### Still open

- **Sept 25 – Oct 9: two books open at once.** Moving Hatchet to Oct 9 pushed
  its window into Apollo 8's, which opens Sept 25. The Aug 16 complaint, one
  subject over — reading and aerospace rather than two inside reading. Fifteen
  days. Not fixed; it is a scheduling decision, not a bug.
- **Four milestone steps land on Fri Nov 27**, inside the Thanksgiving
  `EXCLUDED_RANGES`. The exclusion governs assignment due dates and was never
  applied inside `buildMilestones`, which does plain −7-day arithmetic. Same
  shape as *a due date with no run-up is half a date*, one level down again.
- **Five `asg::writing::*` slots are filed under the `reading` key** in
  `quarterlyAcademicPlaceholders`, while `bookSwap.js` derives a slot's subject
  from its slotId. Two places disagree about which subject those belong to.

---

## A year of field trips, deleted one reload at a time (Sept 5, 2026)

The parent: **"There were field trips planned for the year and I no longer see
them."**

`planFieldTripDedupe`, written Aug 28 to collapse duplicate trips arriving
through the import, decided whether two rows were the same visit like this:

```js
const sameVisit = otherDate === '' || otherDate === winnerDate;
if (sameVisit && !fieldTripCarriesWork(other)) dropIds.push(other.id);
```

**A blank date counted as matching.** So a second visit to a place she had
planned but not yet dated was read as a duplicate of the first and soft-deleted
— on every hydrate, not once. Planning a year means choosing the places first
and the dates later, and the repeat visit is the normal shape of it: a library's
monthly homeschool day, a museum in two seasons.

Reproduced against the real function before anything was changed:

| Planned | Survived |
|---|---|
| 4 library visits, first dated, three dates to come | **1** |
| 6 trips across 3 places, all undated | **3** |
| 4 library visits, all dates entered | 4 — correct |

Two rows are the same visit only when they say so: identical, non-empty dates.
Undated repeats now fall through to the branch that keeps a row and gives it an
id distinct from the winner's.

What that gives up, written down rather than discovered later: two *undated*
copies arriving through an import no longer collapse on their own. That is the
right way round, and it is this file's own principle one step further — it
already says *a duplicate cleanup that deletes the finished copy is worse than
the duplicates.* A cleanup that deletes a plan is too.

### Forty-seven checks passed while this ran

`verify-field-trip-records` was entirely about a COMPLETED trip reaching the
compliance packet. Not one check asked what the cleanup is allowed to REMOVE.
The same shape as the stagger map three entries up: the guard measured the
output everyone was worried about, and the destructive path had no guard at all.

Section 7 now holds it from both sides — the dedupe must still collapse the Aug
28 import copies, and must never take a row that is only undated. Verified by
restoring the old line and watching three of them fail.

### The restore, and the instruction that shaped it

Every deleted trip was still in Dexie carrying a tombstone, so nothing was lost.
But offered the restore, the parent said: **"Make sure duplicates are not
added."**

She was right, and it is the whole difficulty. The tombstoned pile is not one
thing. It holds her undated plans AND the genuine undated import copies the Aug
28 dedupe was built to remove. Content cannot separate them: two undated rows to
the same place with the same empty notes are byte-identical whether she planned
two visits or an import cloned one.

`createdAt` separates them, and only `createdAt` — the one field that records a
separate ACT of creation rather than a property of the trip:

- `addFieldTrip` stamps `new Date().toISOString()` per trip, one at a time, so
  two visits she planned herself never share an instant.
- `mergeBySyncId` copies the incoming row wholesale, `createdAt` included, so an
  import's copy carries the SAME instant as the row it duplicates — and that
  original is the row the dedupe kept, which is still on screen.
- the seeder stamps one `ftCreatedAt` across a whole batch.

So: a tombstoned row whose instant is already visible is a copy and stays
deleted; one with an instant of its own was a separate act and comes back. Two
tombstones sharing an instant are copies of each other and one returns, not
both. A row with **no** `createdAt` cannot be told from a copy, so it stays
deleted — an unidentifiable row is exactly the case where a duplicate would be
added.

`planUndatedTripRestore` is pure and tested, like the dedupe beside it, and runs
once behind a meta flag. Once, because after this pass a tombstone on these rows
means what it says again: if she deletes a restored trip herself it has to stay
deleted, and a restore running every hydrate would undo her the way the dedupe
just did. Eight checks in section 8. **47 → 62.**

### Ruled out on the way

- **The import.** `mergeBySyncId` is purely additive: it builds from the local
  rows and only adds an unmatched incoming row or overwrites a matched one's
  content. A local row with no counterpart survives. It has no removal path, so
  importing another Academy's backup could only ever have made the list longer.
- **The wrong Academy.** Each opens its own Dexie database, and C4 step 1 made
  choosing possible two days earlier, so this was the first suspect. Eliminated
  by the parent: everything else on the screen was his and correct.

### Found while answering "why is petal-pestle showing in my file list"

Three exported databases — `petal-pestle-backup-2026-08-31.json` and two browser
duplicate-downloads of it — plus `petal-pestle-rendered.html`, **committed** in
`a81fa8f`. Every `.gitignore` rule missed them twice over: they are named
"backup" and every pattern only knew "progress", and they landed in the repo
ROOT rather than in `Progress/`, so the folder rule added Aug 25 — added
precisely because *"a location cannot be typo'd the way a filename can"* — never
saw them either.

The root is now closed by default with `package.json` and `package-lock.json`
named back in, plus `*backup*.json`, `*-export-*.json` and `*-rendered.html` by
shape anywhere in the tree. Tested both directions.

`.gitignore` alone changes nothing — git never ignores a file it already tracks,
which is why `check-ignore` still reported all four as NOT IGNORED until tested
with `--no-index`. They need `git rm --cached`. They stay in `a81fa8f`; the
history was deliberately not rewritten while the repo is private.

**Third time this week a guard was pinned to a name instead of a property**, and
the third different subsystem: the stagger map, the corrections table, and now
the ignore rules.

---

## Projects due before the lessons that teach them (Sept 5, 2026)

The parent, looking at Mission Control: **"Mission Control has projects due that
he hasn't learned about."**

| Assignment | Was due | Needs lesson | Reachable |
|---|---|---|---|
| Tinkercad Mission Nameplate | 2026-09-11 (week 6) | `tech7-cad` **#20 of 40** | 2026-10-08 |
| Wind tunnel test | 2026-09-16 (week 7) | `ae7-wind-tunnels-flight-testing` **#43 of 49** | 2027-01-20 |
| The Change-One-Number Test | 2026-12-02 | `tech7-cad-2` **#30 of 40** | 2026-11-12 — already fine |

The seed comment above the wind tunnel had asserted the opposite in so many
words — *"Sept 16 is the Wednesday after the Wind Tunnel Test (Fri Sept 11), the
last hands-on Aerospace project of Q1."* It was written from the project's
place in Q1's story, never from the lesson's place in the sequence.

### The fact was in the repository and unreachable

Every project carries a `relatedLessonId`. Every lesson list is ordered. But an
ASSIGNMENT carried no link to its project — the two were joined only by having
similar titles, which no check can read. So the dependency existed in the data
the entire time and the only thing that ever compared the two was a parent
looking at a screen.

Assignments now carry `needsLesson` directly, and
`scripts/verify-lesson-before-assignment.mjs` measures it.

### The pace is read, not assumed

`schoolQuarter.js` says ~12 lessons a quarter, but says in its own words that
this is the **Khan Academy** pace — and Aerospace and Technology are
`ACTIVE_SUBJECTS`, taught by Mission Control on its own timetable. The rate
comes from `WEEK_PATTERN` instead: Aerospace meets Monday and Wednesday,
Technology Tuesday and Thursday. Two sessions each.

At **one lesson per session** — deliberately the most optimistic rate a learner
could manage — Sept 11 would have needed four Technology lessons a week and
Sept 16 eight Aerospace lessons a week, against two scheduled sessions. The
optimism is the point: the check can fail to flag something late and can never
flag something that is fine. A guard that cries wolf gets switched off.

### What moved

- `asg::technology::Q1::1` → **2026-10-16**, eight days after its lesson.
  Both earlier shipped dates are named in `fromDueDate`, so a database that
  took the Aug 30 correction and one that never did both land.
- `asg::aerospace::Q1::2` → retired, and reborn as **`asg::aerospace::Summer::3`
  due 2027-07-23**. It first went to Q3 on an ESTIMATED date and had to be moved
  again the same day — see the correction below.
- `asg::technology::Q2::1` — no date change, `needsLesson` recorded so the
  check can see it.

**Q1 Aerospace now has no project.** Worth knowing rather than discovering: the
subject has only three hands-on projects in the whole curriculum, and they need
lessons 15, 42 and 43. The earliest, the Bottle Rocket, is not reachable until
partway through Q2. Technology is the same shape — its first project needs
lesson 20 of 40.

### The same fault, five weeks earlier, with a grade on it

Asked whether the curriculum's Bottle Rocket was a harder project than the one
he had already done, the answer was no — there is only one bottle rocket in all
of Aerospace, and checking it found the fault had already happened once:

| | |
|---|---|
| He wrote it up | **2026-08-16** (week 2) — graded **C, 73%** |
| `ae7-rocket-design` (#15 of 49) reachable | **2026-09-21** |

He built and wrote up a propulsion project five weeks before propulsion was
taught, and the write-up asks him to *"explain the role of pressure and Newton's
Third Law."*

**It is also why the wind tunnel ended up on a week-7 date.** The Aug 20 note in
`placeholders.js` records the parent saying the rocket was *"setup so late"* for
Sept 16 — but Sept 16 was very nearly right for lesson 15. It only read as late
because the project had already happened early. The fix that followed retitled
the slot to the wind tunnel rather than asking why, swapping a lesson-15 project
for a lesson-43 one. The root cause was never a date.

The rocket iteration — the project's own `iterationPrompt`, one deliberate
change to the rocket he already built — is `asg::aerospace::Q2::2`, due
**2026-12-04**. Not a repeat of work he has done: a second pass with the physics
in hand. The parent regrades the August entry herself once it is in.

**Q1 Aerospace has no project and cannot have one.** All three hands-on
Aerospace projects exist; their lessons are declared Q2, Summer and Summer.
Nothing in the subject is buildable in Q1. Written into `placeholders.js` so the
next person does not "fix" it by moving a project back.

### The correction: I estimated a fact the data declares

The first version of `verify-lesson-before-assignment.mjs` computed when a
lesson would be reached — days per week from `WEEK_PATTERN`, one lesson per
session. It was wrong on half of what it checked, and passed both:

| Lesson | Estimated | **Declares** |
|---|---|---|
| `ae7-rocket-design` | Q1 | **Q2** |
| `ae7-wind-tunnels-flight-testing` | Q3 | **Summer 2027** |

All 49 Aerospace and all 40 Technology lessons carry a `quarter`, and
`verify-planner-feeds.mjs` has scheduled projects from it since August. The
answer was in the repository and an estimate was used instead — **a closure walk
cannot see a fact typed as a literal**, and **assert the property, not the
address**, both already in this log, met from the inside.

The check now compares declared quarters only: an assignment may not be filed in
an earlier quarter than the lesson it needs. No week arithmetic, no pace
assumption. A lesson shipping without a quarter fails the check rather than
falling back to a guess.

### The fourth depth

`ASSIGNMENT_PREREQUISITES.md`, written earlier the same day, designs `blockedBy`
for assignment→**assignment**. This is assignment→**lesson**, and it is the same
shape one level out again:

1. Aug 15 — a due date with no run-up.
2. Aug 16 — a milestone with no start.
3. Sept 5 — two run-ups overlapping.
4. **Sept 5 — work scheduled before the teaching that makes it possible.**

Each fix looked complete. Fold this into the prerequisites design rather than
building the two separately.

---

## Two schedulers, and only one of them was being fixed (Sept 5, 2026)

The parent, on being shown the assignment moves: **"I thought you already moved
aerospace projects before we started with science."**

She had every reason to think so. The answer was that a project lives in **two
independent schedulers** and only one had been touched:

| | Says | Fixed earlier that day |
|---|---|---|
| `weeklySchedule.js` — Writing Journal | *build this in week N* | **no** |
| `placeholders.js` — Success Center | *write-up due on this date* | yes |

So the write-ups had been moved to sit after their lessons while the builds
stayed where they were, and the two now contradicted each other outright:

| Project | Build | Write-up |
|---|---|---|
| Bottle Rocket | week 2 — Aug 14 | Dec 4 |
| Parachute Drop | week 4 — Aug 28 | **none existed** |
| Wind Tunnel | week 6 — **Sep 11** | Jul 23 |

**The wind tunnel was six days away.** He was scheduled to build one on Fri
Sept 11 and explain airflow and turbulence that
`ae7-wind-tunnels-flight-testing` does not teach until Summer 2027. Moving the
write-up to July had not stopped that — it had widened the gap to ten months.

It was found by the check written an hour earlier, extended to pools it had not
covered. **The guard caught the incomplete fix that the person who wrote the
guard had just made.**

### What went where

- **Week 6 no longer schedules the wind tunnel.** It could not move later
  inside the Writing Journal: that schedule runs weeks 1-43 and ends
  2027-05-28, so it covers Q1-Q4 and **never reaches Summer at all**. Nothing
  needing a Summer lesson can live in it. The build is carried by
  `asg::aerospace::Summer::3` (due 2027-07-23) alone.
- **`asg::aerospace::Q1::4` collects the parachute drop**, which he built in
  week 4 and which nothing anywhere collected — no portfolio entry, no grade,
  no transcript line. It carries NO `needsLesson` on purpose: its lesson is
  Summer, and gating it would leave August's work uncollected for eleven
  months. It asks what he measured, not the reentry physics he has not met.
- **The two past builds stay put.** The parent: leave the past, fix forward.
  Moving weeks 2 and 4 now would rewrite a record of what happened rather than
  change what he does.

---

## Science gets its own quarters, and its projects stop borrowing Aerospace's

The parent chose to quarter the science lessons **knowing what it costs**: all
39 were untagged, and in this app an untagged lesson is never gated — that is
deliberate and commented as load-bearing in `quarterAvailability.js`. So all 39
were open to him. Tagged at the Khan pace `schoolQuarter.js` documents —
**Q1 12 · Q2 6 · Q3 11 · Q4 7 · Summer 3** — in list order so every "I" topic
precedes its "II".

**He now has 12 of 39 open and 27 locked**, through `s7-electricity`. That is
the chosen trade, not an accident: Science now behaves like Aerospace and
Technology.

All 13 experiments were then repointed off the Aerospace lessons they had been
borrowing. Those cross-links were never carelessness — `weeklySchedule.js`
explains them in its header, and Aerospace lessons were the only ones carrying a
quarter to schedule from. Once Science had quarters the borrowing was no longer
needed.

### The bug this pass introduced, and how it surfaced

The first repoint used a regex that scanned forward from a project id to the
next `relatedLessonId`. For the five experiments that had **no** link, it
scanned past them into the *next* project and rewrote that one's. Three entries
ended up with two `relatedLessonId` keys, and **JavaScript takes the last** — so
Mars Rover, Satellite Model and Drone Concepts silently pointed at the wrong
lesson while the audit reported them as fine, because the wrong value was still
a real lesson id.

Caught by counting links against projects: 10 links for 13 projects. Redone with
a per-entry parse that strips every `relatedLessonId` in an entry and inserts
exactly one. **A verification that only asks "does this resolve?" cannot see a
value that resolves to the wrong thing.**

---

## Repair 1: the drift had one cause, not five

`weeklySchedule.js` labelled its sections with quarter boundaries that disagree
with `schoolQuarter.js`:

| | The file said | Actually |
|---|---|---|
| Q1 | weeks 1-9 | **1-13** |
| Q2 | weeks 10-18 | **14-22** |
| Q3 | weeks 19-27 | **23-34** |
| Q4 | weeks 28-36 | **35-43** |

Every project filed under a header slid one quarter early. Five Science
experiments were affected; the three that looked right were right by accident.

Repointing to Science lessons resolved two of the five on its own — Satellite
Model and Egg Drop — because Science lessons sit differently than the Aerospace
ones they had been borrowing. Three moved: **Bridge Building** w13→w18 (Q2),
**Mars Rover** w20→w23 (Q3), **Drone Concepts** w28→w40 (Q4). The boundaries in
the section headers were corrected so the next edit does not repeat it.

## Repair 3: the check covered two pools of five

`verify-planner-feeds` re-derives placement from the lesson and fails on drift —
exactly right — but its project list was `[...roboticsProjects,
...technologyProjects]`. **16 of the 26 planner-scheduled projects were never
measured.**

Extended to all four lesson-backed pools, with two rules that differ on purpose:

- **Not EARLIER than the lesson's quarter**, rather than equal to it.
  `weeklySchedule.js` deliberately schedules some experiments after their lesson
  as reinforcement and says so. Review is fine; being asked to do something
  before it is taught is not.
- **A break is not a holiday.** `isHoliday` reads `SCHOOL_HOLIDAYS` — eleven
  single federal days. The real breaks live in `EXCLUDED_RANGES`. The old check
  passed on holidays while four weeks of work sat inside actual school breaks.

**175 passed, 2 failed, and both failures are decisions rather than surprises:**
the two past builds the parent chose to leave, and the four break weeks awaiting
her week-by-week walkthrough. A red that names a decision is worth more than a
green that was not looking.

### Still open

- **Repair 2** — w17 (Thanksgiving), w21 (Christmas Eve), w22 (New Year's Eve),
  w43 (closing week). Moves writing prompts as well as one experiment, so it
  needs the parent week by week rather than a rule.
- **The Writing Journal has no Summer.** It ends 2027-05-28 while the school
  year model treats Summer as a real period with its own pace. Three Aerospace
  lessons' worth of Summer content has no home in it.
- **Q1 Aerospace has no new project and cannot have one.** All three builds need
  Q2 or Summer lessons. Written into `placeholders.js` so it is not "fixed"
  by moving one back.

---

## The planner that emptied itself, and two wrong diagnoses before the right one (Sept 6-8, 2026)

The parent, the day after the Sept 5 field trip fix shipped: **"I don't see the
field trips."**

Her database, read from the browser console:

```
database: LearningOSDB_lamar-junt
field trip rows: 348 | visible: 1 | tombstoned: 347
seed version: 4 | restore ran: true
```

**348 rows and one visible trip.** The survivor was her own completed Victory
Creek Waterfall, and it survived only because it carried hours, so
`fieldTripCarriesWork` protected it.

### Two wrong answers first, and both were confidently given

1. **"The dedupe reads a blank date as a match."** True, real, and fixed on
   Sept 5 — and irrelevant here. Every one of the 21 default trips is DATED, so
   that path never touched them.
2. **"The restore will bring them back."** `planUndatedTripRestore` requires a
   blank date for the same reason, so it ran, matched nothing, and set its
   once-only flag.

**Fixing a real bug is not evidence that it was the bug.** Both fixes were
worth keeping. Neither addressed what the parent reported, and she was told
otherwise twice.

### The actual cause

`planFieldTripDedupe` was handed **every row including tombstones** — the store
passes `[...fieldTripRows]` and the `deletedAt` filter does not happen until the
state boundary hundreds of lines later. `fieldTripKeepScore` has never known
about `deletedAt` either.

So a deleted row entered its group as a candidate, tied with the live row on
score (both dated, +5), and **won the tie, because the tie-break is oldest
`createdAt` and the deleted originals were older than every re-imported copy.**
The live row then became an "other", matched on date, and was deleted in turn.

One live trip died to an older ghost on every hydrate. Imports kept adding fresh
copies; the loop kept killing them. That is 348 rows climbing while the visible
count fell to one.

Proved before fixing: a two-row case — one tombstone, one live, same
destination and date — returns the LIVE row's id in `dropIds`.

### The fix, and the recovery

A tombstone is a record of a deletion, not a trip. It cannot be kept and cannot
be deleted again, so it has no business in the ranking. `planFieldTripDedupe`
now filters `deletedAt` at the top.

`planDeletedTripRecovery` restores **exactly one row per destination, and only
where nothing is visible.** The parent's instruction from the day before still
governed — *make sure duplicates are not added* — and with ~16 copies of 21
destinations, restoring by row would have rebuilt the pile that started this. A
destination with any live row is untouched. One in, or none; there is no path
through the function that makes two. The row chosen is the one the dedupe itself
would keep: highest keep-score, oldest `createdAt`.

Simulated against the real shape (348 rows, 1 visible) before shipping, then
confirmed by the parent: **the trips are back.**

Section 9, eight checks. **62 → 70.** Four of them fail when the tombstone
filter is removed.

### Why 47 checks, then 62, never caught it

Section 6 was about a completed trip reaching the compliance packet. Sections
7-8 were written for the blank-date bug and every row here is dated. Each suite
measured the thing most recently gone wrong. None asked the general question —
*what is this cleanup allowed to delete* — of the general case.

---

## The wind tunnel finally gets a week beside its lesson (Sept 8, 2026)

The parent, on the Writing Journal: *"none of those writing assignments are
connected to anything."* She was right, and week 6 was mine.

The file pairs each hands-on project with a documentation prompt in the same
week — Bottle Rocket to Mission Report, Parachute Drop to Scientific
Observation, **Wind Tunnel to Lab Report**. Removing the wind tunnel build on
Sept 5 left "Lab Report: Document an Experiment" in week 6 with no experiment.

Her instruction: *"Move the Lab Report to a week with an experiment. And put the
wind tunnel with the lesson it is adjacent to."* Those turned out to be one
move.

**The schedule was never capped at week 43.** It ended at 2027-05-28 and so
covered Q1-Q4 with no Summer, which is why a Summer-lesson project had nowhere
to go and was deleted from the schedule outright. But `getSchoolWeekNumber` is
plain arithmetic and `writingScheduleCalendarItems` iterates the map, so gaps
and later weeks both work. It had simply never been extended.

- **Week 50 (2027-07-16): `['ae7-wind-tunnel', 'w7-lab-report']`.** Beside its
  Summer lesson, one week before its write-up (`asg::aerospace::Summer::3`, due
  2027-07-23) — the same run-up every other project gets. The original pairing,
  restored.
- **Week 6** would have been empty, so it took one of week 7's two prompts.
  Nothing invented; an over-full week redistributed.

The wind tunnel has dropped off `verify-planner-feeds`'s "scheduled before its
lesson" failure. What remains there is the two builds already done, which the
parent chose to leave in the past, and the four break weeks awaiting her
week-by-week review.
