# LearningOS — build session prompt

**Rewritten Aug 31, 2026. Supersedes the earlier version, which was wrong about the
most important thing.**

> The earlier prompt said *"Mission Control becomes the base — it gets emptied into a
> generic vessel"* and listed forking to a new repo as work to avoid. **That was
> backwards and it is now cancelled.** Steps 1 and 2 were built under that framing.
> They are fine — everything they produced is generic — but they are in the wrong
> folder.

---

## What LearningOS is

**LearningOS is a new, generic platform in its own repository.** It contains no
learner. Not a name, not an age, not a subject, not a lesson.

Mission Control and Petal & Pestle are **existing schools whose content and records
get imported into it.** They are sources and then archives. They are not the base, and
the platform does not live inside either of them.

**The test:** a fresh checkout of LearningOS, with no imports run, boots to a front
door and offers to create the first Academy. That must be true from the first commit,
not achieved later by deleting things.

## Repository layout

```
learningos/                       ← NEW. the platform. no learner in it.
  src/
    engine/  components/  db/  lib/  store/
    academies/
      _template/                  ← the blank an Academy is created from
  scripts/
  docs/

mission-control-homeschool/       ← FROZEN after the move.
                                     Lamar's content and records are imported
                                     from here, then it is an archive.

petal-pestle-academy/             ← same, for Azianna. Untouched for now.
```

---

## ⚠ The one thing that can go badly wrong

**IndexedDB is scoped to the origin.** Lamar's entire year of records is stored against
the URL the app is served from. A new Netlify site is a new origin, and a new origin
has an **empty database.** Deploy LearningOS to a new URL, hand him the link, and he
opens a school with nothing in it.

**Point the EXISTING Netlify site at the new repository.** Same site, same URL, same
origin — his IndexedDB is untouched and the import works as designed. Netlify supports
relinking a site's repo without creating a new site.

*(Fallback if that goes wrong: verified exports of both apps are in Google Drive,
dated Aug 31, and the import machinery is built and tested. Don't plan to need it.)*

---

## Status

- **Steps 1 and 2 are built and green** — 60 check scripts pass — but they live in
  `mission-control-homeschool`. **Everything they produced is generic and moves.**
- Netlify credits are topped up. No freeze.
- Backups verified: Mission Control's 32 tables and Petal & Pestle's 21, both complete.
- Nothing committed.

---

## Build order

### Step A — Move the bones into `learningos/` *(do this first)*

A clean line, not a judgement call:

| Moves | Stays in Mission Control |
|---|---|
| `src/engine/`, `src/components/`, `src/db/`, `src/lib/`, `src/store/` | **`src/data/`** — 76 files, 64,639 lines. All Lamar's content |
| `src/academies/`, `src/FrontDoorGate.jsx`, `src/main.jsx`, `src/App.jsx` | His lessons, exams, garden briefs, PE plans, writing prompts |
| `scripts/` and the whole check suite | |
| `docs/LEARNINGOS_*.md` | The rest of `docs/` |

**Everything Steps 1 and 2 created is bones and moves without a decision:** `db.js`
(the recorder), `registry.js`, `householdDb.js`, `frontDoor.js`, `FrontDoorGate.jsx`,
`components/FrontDoor/`, `verify-academy-db.mjs`, `verify-front-door.mjs`.

Then, in the new repo:

- `package.json` name → `learningos`
- **`DB_PREFIX` → `LearningOSDB_`.** Nothing real uses the old prefix yet, so this is
  free today and a data migration after Step B
- `HOUSEHOLD_DB_NAME` → matching prefix. It is one day old; re-running first-run costs
  two minutes
- **`LEGACY_DB_NAME` stays exactly as it is** — it names Lamar's real existing
  database, which Step B reads *from*
- `registry.js` ships with **`ACADEMIES = []`**. No learner in the platform
- Strip any remaining product-level "Mission Control" naming. *Academy* names are data
  now, not code

**Done means:** a fresh checkout boots to the home page, offers to create the first
Academy, and the check suite passes with **zero Academies registered.**

#### The home page is the front door — build the page, not just the panel

`docs/LEARNINGOS_FRONT_DOOR_MOCKUP.html` is the approved design and it is a **full
page**: a utility bar carrying *Parent Login · Student Login*, a brand bar, and the
sections below it. Sign-in is a **panel that opens over that page**, not the whole
screen.

Step 2 built the panel. The page around it is still missing.

**Routing:**

```
boot
 └─ someone remembered on this machine?
     ├─ yes → straight into their Academy
     └─ no  → the LearningOS home page
               ├─ Student Login     → name + PIN → their Academy
               ├─ Parent Login      → passcode   → parent side
               └─ Create an Academy → first run
Sign Out → the home page
```

A remembered learner goes straight to school and rarely sees the page. It exists for a
first visit, for the signed-out state, and for anyone who reaches the URL not knowing
what this is.

**Keep from the built version:** one error message for every sign-in failure, the
constant-time verification behind it, and no local fonts fetched from a CDN. Those are
correct and the page must not undo them.

#### First run creates an Academy — it does not name a pre-existing one

`ACADEMIES = []` on its own doesn't say what first run should *do*.

1. No parent passcode → **create** one, show the recovery code once
2. No Academies → **create the first**: a name, a PIN, a generated id
3. It is born **Empty** — §1's first state. It exists and can be signed into; it has no
   subjects, theme or guide yet
4. The questionnaire (Step D) moves it Empty → Configured
5. Placement moves it Configured → Active

**Importing an existing school is the other door into the same room** — it creates a
Configured Academy straight from a seed, with no questionnaire typed. Same code path
underneath, different entry point. The platform needs both.

#### Also fix during the move: no recovery path at the gate

`FirstRun.jsx` calls `verifyPasscode` only. The screen it replaced offered *"Forgot it
— use my recovery code"* (`ParentGate.jsx:314`). Because the gate wraps `App`, a
forgotten passcode with no recovery link is a **lockout with the records intact and
unreachable**.

`verifyRecoveryCode` is already written and exported from `parentAuth.js`. Add the link
to first run **and** to the parent tab on the home page.

### Step B — Import Lamar

1. **Records.** Read `MissionControlHomeschoolDB`, write `LearningOSDB_lamar`.
   **Filter the ledger to `coin` and `credit` only** — see the warning below. **Copy,
   never mutate**; the original stays untouched until the copy verifies.
2. **Content.** Mission Control's `src/data/` → `learningos/src/academies/lamar/`.
3. **Config.** `docs/SEED_LAMAR_DRAFT.js` holds his settings, every value quoted from
   the live repo.
4. **Register** the Academy — through the same code path a questionnaire answer uses.
   One way in, never two.

**Done means:** Lamar signs in and notices nothing different.

### Step C — Import Azianna

Config, theme, guide, subjects, timetable, and Khan core at her real strand levels
(nine levels, in `petal-pestle-academy/claude/azianna-diagnostic-results.md`). Her 256
lessons follow — see the transform notes in `LEARNINGOS_PACK_SPEC.md` §8.

### Step D — `_template/` and the questionnaire

Including **Step 4a** (the template's guide line pools) and **Step 4b** ("change what
you're working toward"), both detailed below and in the spec.

### Step E — Cleanup

Home screen duplicates, tab problems, engine bugs, the `testkhan` fixture (**row-based
checks skip silently without it**), and the Gardening re-frame.

---

## ⚠ Lamar's ledger is contaminated — filter it during the import

**41 of Azianna's ledger entries are in Lamar's database.** All 41 entryIds match
Petal & Pestle's ledger exactly. Dated Aug 14–21; notes read *"Ribboned Braids"*,
*"Read ss-m1-01"*, *"Morning warm-up."*

| Currency | Entries | Whose |
|---|---|---|
| coin | 12 | his |
| credit | 7 | his |
| **petal** | **39** | **hers** |
| **seed** | **2** | **hers** |

Nothing is damaged — balances are computed per currency, and **his attendance is
clean**, which is the Georgia record. The import writes only `coin` and `credit`.

---

## Reference

| Doc | What |
|---|---|
| `LEARNINGOS_PACK_SPEC.md` | Architecture. **§3a** change-your-mind · **§3b** guide lines · **§6** state compliance · **§8** the lesson transform |
| `LEARNINGOS_ONBOARDING.md` | The questionnaire that fills a blank Academy |
| `SEED_LAMAR_DRAFT.js` | His settings as data |
| `LEARNINGOS_FRONT_DOOR_MOCKUP.html` | The front door, designed and approved |
| `HOME_SCREEN_REVIEW.md` | Six duplicates, four tab problems |
| `STATE_COMPLIANCE_DATA.md` | Six states, sourced and dated |
| `GUIDE_LINES_WRITING_PROMPT.md` | The guide line pools — a separate conversation owns this |

---

## Rules that outlive any single step

- **The platform contains no learner.** If a file in `learningos/src/` names a child, a
  subject, an age or a reading level, it is in the wrong folder
- **Copy, never mutate.** Originals stay untouched until a copy verifies
- **One way in.** A seed and a typed questionnaire answer use the same code path
- **Land structural changes alone.** One deploy, one candidate when something breaks
- **Decisions and reasons are written by hand; anything countable is generated**

## Settled — do not undo

- The 3-group tab structure is parent-negotiated
- **Quiet tiles are a dead pattern.** Moving a real task off the day list failed three
  times. Every home-screen cut removes a *duplicate*, never a task
- Card order is derived from the real schedule
- PE is pinned above the day-kind branch, with an assertion
- The single-profile decision in the old `PROJECT_PLAN.md` is reversed on purpose

## Cut list

- **The Tailwind token rename** — 5,614 occurrences, zero visible effect
- **Migrating Azianna's records.** She starts fresh; Petal & Pestle stays read-only
- **Supabase.** Local databases now; sync and the social layer come later
- **Auditing the ~82 `aerospace` code reads by hand** — they stay behind in Mission
  Control's `src/data/` anyway. Let a blank Academy and the check suite find any that
  leaked into the bones
- **Writing 50 states of law** before families need them
