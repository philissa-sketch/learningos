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
