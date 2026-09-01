# LearningOS — architecture spec

**Aug 30, 2026 · revision 3.**

- rev 1 scoped every table with a `profileId` — abandoned, see §3
- rev 2 carved Lamar's content out of the base — replaced by generic-first, see §1

**LearningOS is the platform. Each learner has an Academy.**
One codebase. One folder per Academy. One database per Academy. Nothing crosses.

Read against the live repo: 269 files, 144,913 lines in `src`, Dexie **v35 / 41
tables**, 328 lesson rows, 57 check scripts.

---

## 1 · Generic first

The app ships **empty**. No aerospace, no herbalism, no Nova, no Marigold in the
bones. An Academy is a blank shell until a questionnaire and a placement fill it in.

```
src/
  engine/  components/  db/  lib/     ← THE BONES. no subject, no age, no theme string
                                         fix a bug once, every Academy gets it
  academies/
    _template/                        ← the blank
    lamar/          lessons/ guide.js theme.js subjects.js timetable.js
                    ranks.js economy.js profile.js
    azianna/        …same shape, none of the same content…
  seeds/
    lamar.js  azianna.js              ← their existing answers, as data
```

### The acceptance test

> **Delete `academies/lamar/` and the app must still run**, booting to an empty state
> that offers to create an Academy.

Runs = the separation is real. Breaks = aerospace is still welded into the bones.
A check script can assert this, and it is how you know when you are done.

### Three states an Academy can be in

Placement cannot happen inside a setup wizard, so partial is a legitimate state.

| State | Means | Learner sees |
|---|---|---|
| **Empty** | Just created | The questionnaire |
| **Configured** | Questionnaire done, placement pending | Their room — theme, guide, name — plus "run these diagnostics" |
| **Active** | Placement entered, plan built | School |

### Seeds — and the one rule

Lamar and Azianna skip to Active because both halves already exist. Their answers live
in `subjects.js`, `themes.js`, `ranks.js`, `novaVoice.js`, `weekPattern.js`, and for
Azianna the nine strand levels in `azianna-diagnostic-results.md`.

> **A seed goes through the exact same code path a typed answer does.**

One way to create an Academy, never two. Otherwise the seeded path and the
questionnaire path drift, and the bug surfaces on the first real new learner — the one
person you cannot debug over their shoulder.

---

## 2 · Two separations, two mechanisms

| | Where it lives | Written by | Isolated how |
|---|---|---|---|
| **Content** — lessons, theme, guide, subjects | `src/academies/<id>/` | You, in advance | Different directories |
| **Records** — XP, attendance, grades, streaks | IndexedDB in the browser | The app, at runtime | **Different databases** |

The folder is the textbook. The database is the notebook. Both must separate, and they
separate by different means.

**Why folders:** Vite code-splits them for free — Lamar's ~2.2 MB of aerospace only
downloads when Lamar signs in. Separation becomes structural rather than maintained.
A new Academy is a folder copy.

---

## 3 · One database per Academy

`db.js:21` today:

```js
export const db = new Dexie('MissionControlHomeschoolDB');
```

Becomes a named database, opened after sign-in:

```
MissionControlHomeschoolDB_lamar      ← his 41 tables
MissionControlHomeschoolDB_azianna    ← her 41 tables
MissionControlHomeschoolDB_household  ← the family's shared tables
```

### Why this is clean here — verified

1. The database is created on **one line**
2. **Only 2 files import `db.js`** — `useAppStore.js` and `TypingPractice.jsx`
3. `db.js` exports **136 named helpers**; **zero** direct `db.<table>.get()` calls exist outside it

Change what `db` points at and all 136 helpers follow.

### What this deleted from revision 1

| Rev 1 item | Now |
|---|---|
| Split the `meta` singleton — 35 fields, ~15 call sites | **Deleted.** Each Academy has its own singleton |
| 17 natural-key tables → compound keys, ~40–60 call sites, **touching Georgia legal records** | **Deleted.** `attendance: 'date'` is correct with one database per child |
| `profileId` on 20 auto-increment tables | **Deleted** |
| Silent cross-learner merge on import | **Structurally impossible** |

That was the entire dangerous half.

### What it costs instead

| Item | Size |
|---|---|
| `db` created after sign-in, not at module load | **1 file** + boot ordering in 2 |
| Household database split | 1 file + the decision below |
| Parent dashboard opens two databases | Real work. Dexie supports it |
| Copy Lamar's database to `..._lamar` | Script. **Copy, never mutate** |

### Household vs per-Academy

**Household:** `parentAuth` · `adminRecords` · `evidenceLinks` · `fieldTrips` · school
calendar and holidays · **state compliance table (§6)**

**Per-Academy, despite looking shared:** `schedule` (different timetables) ·
`parentNotes` (messages to a specific child) · `complianceChecks`,
`missionEvaluations`, `courseDescriptions` (records are per child)

The 9 tables `EXPORT_TABLE_POLICY` already excludes overlap heavily with this list —
the app has been made to think about this once already.

---

## 3a · An Academy can change what it's working toward

**A core capability of the clean platform, not a migration concern.** It ships in
`_template/`, so every Academy created from it has this — including ones enrolled
years from now.

LearningOS's premise is *start with who they want to become.* Children change their
minds. That is the normal case, not a failure case. **A platform where changing your
mind means starting over would be worse than the grade-level products this replaces.**

### The rule

> **A career track is a field. It is never a foundation.**

Nothing in the engine, the schema, or a child's records may assume the track they
started with is the track they finish with.

### What a change touches

| Changes | Never changes |
|---|---|
| The signature subject's lessons | Math, reading, science — the Khan core |
| Rank **names** | XP, tier, mastery — earned, kept |
| Guide and theme, if the child wants them to | Attendance, hours, grades, portfolio, transcript |

### Three rules the engine must honour

1. **Completed work archives, never deletes.** Finished lessons are earned hours,
   state records and transcript lines. They leave the *active plan* and stay in the
   *record*, permanently.
2. **XP and rank tier carry.** Rank 3 stays rank 3 — only the tier's *name* changes
   with the track.
3. **Changes apply at the next quarter boundary**, so a running quarter is never
   disrupted.

### The screen it needs

**"Change what you're working toward"**, in the grown-up corner of every Academy:

- Shows the current goal, guide, theme and subject list
- Lets each be changed independently — **most changes are not full switches. Adding,
  narrowing, or renaming a track is the common case, and all three must be cheap**
- States plainly what will happen before confirming: *finished work stays, XP and rank
  stay, records stay, upcoming lessons change*
- Applies at the next quarter boundary

**This is the same data the questionnaire collects.** It is the questionnaire, opened
again — not a second code path. See §1, the one-way-in rule.

---

## 3b · The template ships a guide that already works

**A new Academy must have a guide who doesn't repeat, before anyone writes a custom
line for it.** A guide with three morning greetings is a screensaver — date-seeded
selection means the same line every third day, and over 180 school days a child sees
each one sixty times.

**Current state, measured Aug 31:** Mission Control's pools are `MORNING` 3,
`AFTERNOON` 3, `MASTERY_MESSAGES` 5, `REVIEW_MESSAGES` 5, `WEEKEND` 2, `FRIDAY` 2,
`BACK_AFTER_A_DAY` 2, `FIRST_DAY` 2, `STREAK_NOTE` 3, `ENRICHMENT` 4, plus 24 daily
lines. Marigold's file is 98 lines total. **The machinery is complete; the content is
thin.**

### Two categories, two homes

| | Lives in | Contains |
|---|---|---|
| **Generic** | `_template/` — every Academy inherits | Lines with no learner, no subject and no world in them: *"Morning, {honorific}. Let's put a good first hour on the board."* · *"That's mastery."* |
| **Flavor** | `academies/<id>/` — written over time | Lines that speak from that Academy's world, whatever it turns out to be |

`linesFor(academy)` = the template's generic pools, merged with whatever that
Academy's folder adds.

**The template contains no learner.** Not a name, not an age, not a reading level, not
a subject. Every learner-shaped thing is a variable the questionnaire fills.

### The requirement this creates

**Generic lines are tokenized, never hardcoded.** `"Morning, cadet"` →
`"Morning, ${honorific}"`. `"Nova"` → `"${guideName}"`.

This is already on the cleanup list from another direction: **"cadet" appears three
times as free text inside `novaVoice.js` greeting variants with no constant anywhere**,
and ~13 UI labels say "Nova" in plain JSX. Same fix — and it is what lets one pool
serve every Academy.

### Two variables select a pool — neither is a person

**Tone** — `guide.tone` from onboarding C6: *serious · funny · gentle.*

**Register** — how the guide speaks to this learner: *early · middle · older.*

Register is not reading level. A 7-year-old and a 16-year-old can read at the same
level and still need different lines; *"Nice work! You got it!"* is warm to one and
patronizing to the other.

> **Age is the wrong input for placement and the right input for register.**

No learner is ever *placed* by age — that rule is the foundation of the whole system.
But how a guide *talks* to someone is exactly what age is for. Register defaults from
age, the parent can override it, and it never touches what gets taught.

### Scope — ship one set, add the rest

The full matrix is thousands of lines. Don't write it.

**Ship one complete neutral set** — every pool at target count, ~330 lines. That alone
means any Academy created from the template has a guide that doesn't repeat, on day
one. Then add tone variants for the three highest-frequency pools, then register bands
as they're needed.

**Every band falls back to the neutral set when it doesn't exist.** A missing band is
never a broken guide, only a less tailored one — which is what makes this safe to ship
incomplete and grow indefinitely.

### Rules the generic pool must hold

Non-negotiable:

- **Never praise ability** — praise the work, never the learner's cleverness
- **Never tell a learner their level**
- **No learner in mind.** Written for a band, not for anyone who exists
- **No subject, career or world references** — that's flavor, and it lives in the
  Academy folder
- **Plain language by default** — a line that reads easily works at every level; a
  complicated one does not
- **Date-seeded, never `Math.random()`** — a random pick re-rolls on every React
  render and rewrites the line mid-screen. This was a real bug once
- **Brief.** `tone='brief'` exists so the guide doesn't start talking on every tab
- Passes the same content checks as any other authored content

### Sequencing

**The writing is parallel — the wiring is Step 4.** Lines are content and can be
drafted any time; they attach when `_template/` exists.

---

## 3c · A slot is a SHAPE, not a name list

**The last thing standing between LearningOS being multi-school in principle and
multi-school in practice.** Written Sept 1 2026, after the second Academy was
built and could not open.

### What is wrong, measured

C1 stopped the platform naming one Academy's FOLDER. It succeeded — records and
curriculum are properly separated, and an Academy with no content shows its own
room rather than somebody else's school.

But the screens were written against one school's functions, and putting the
data behind a slot did not change what the screens **call**:

```js
const { WEEK_PATTERN, isSchoolDay, dayPattern, subjectsForDay } =
  academyContent().timetable;
```

The folder got generic. The vocabulary did not. Counted against the real
inventory (`scripts/academy-content-needs.json`):

| Of the 162 names the platform demands of EVERY Academy | | |
|---|---:|---|
| **One curriculum's own words** | **75** | `guitarTheory`, `aerospaceProjects`, `recipeLibrary`, `EDCLUB_PORTAL_URL` |
| **Behaviour, not curriculum** | **61** | `affordable`, `findFormat`, `milestonesFor`, `instructionMinutes` |
| **Genuinely per-school data** | **26** | `ACTIVE_SUBJECTS`, `WEEK_PATTERN`, `allLessons` |

**Only 26 of 162 are things a school should ever be asked for.** The second
Academy fills seven slots from a folder of 150 files and 575 exported names, and
still reports 145 missing — because most of what is missing was never its to
supply.

### The three rules

> **1 · A slot asks a QUESTION. It does not name a function.**

`timetable` means *"is today a school day, and what is on it?"* — a small, stable
interface each school answers however it likes. One school answers from a
weekday rotation and a holiday list; another from five dated periods with no
holiday list at all, because its long breaks run at three days a week rather than
closing. Both are correct. Neither should have to invent the other's function
names to be allowed to answer.

> **2 · Behaviour belongs to the platform, never to a curriculum.**

"How many words into this assignment", "can she afford this", "which format fits
this type", "how many instructional minutes is that" — none of it is a fact
about a child or a subject. §1 already says why this matters: *fix a bug once,
every Academy gets it.* Sixty-one names currently make every school reimplement
the same logic, which is the exact opposite.

Anything that is pure logic moves to `lib/`. Anything that is logic **bound to
one school's data** stays with that school — and the binding is checked
**transitively**, because `isSchoolDay` → `isHoliday` → `holidayName` → one
family's own holiday list is three levels deep, and moving it would have
compiled one family's Christmas into the platform.

> **3 · A feature only one school has does not live in the platform.**

`src/components/Guitar/` and `src/components/Garden/` are 2,556 lines of one
child's extracurriculars in the platform zone, and `NavBar.jsx` offers both tabs
to every Academy that will ever exist. A second learner is shown a Guitar she has
never played, opening onto a screen that reads content nobody wrote for her.

An elective is an Academy's, not the platform's. What the platform owns is the
IDEA of an elective — a place they appear, a way one declares itself — never a
specific one.

### What a school supplies when this is done

**About twenty things about itself, and it inherits the rest.** That is the test.
If a new Academy's first morning still owes more than roughly twenty answers,
this is not finished.

### Sequencing — safest first, and each lands alone

Ordered so that no step needs the one after it, and every step is independently
verifiable and independently deployable. **This is a refactor of the bones every
existing school runs on. One batched, fully verified deploy per step.**

| Step | Work | Moves |
|---|---|---|
| **1** | **Behaviour out of the contract.** Take the 61 logic names out of the slots and into `lib/`, transitively checked. Nothing about any curriculum changes. | 162 → ~101 |
| **2** | **Features out of the platform.** Guitar, Garden and the two single-subject games leave `src/components/`. Nav entries become something an Academy declares rather than something the platform ships. | ~101 → ~40 |
| **3** | **Slots become shapes.** Each remaining slot gets a named interface — a small set of questions — and each Academy implements it. This is the step that ends name matching. | ~40 → ~26 |
| **4** | **The check follows.** `verify-content-interface` stops asking "does this Academy provide every name" and starts asking "does this Academy answer every question its slots claim to answer." | — |

### Rules this refactor must not break

- **The platform contains no learner.** `verify-no-learner.mjs` reads prose as
  well as code, and it is right to. Do not weaken a zone to make a step pass.
- **The debt list may shrink and must never grow.**
- **Every step keeps the existing school byte-identical until it is deliberately
  changed** — its manifest regenerated should differ only where a name genuinely
  moved.
- **A slot an Academy has nothing for stays blank**, and blank must render as an
  absent screen rather than a broken one.

---

## 4 · Already free — no work

| Thing | Why |
|---|---|
| `src/config/subjects.js` | Already clean data. Becomes `academies/lamar/subjects.js` unchanged |
| 328 lesson rows, `src/data/` (76 files, 64,639 lines) | Inert data keyed by `subject` |
| **Theme system** | `:root` CSS vars + `applyTheme()` + 6 themes + persisted `equippedTheme`, shipped Aug 25. A new palette is a **data entry** |
| **`NovaMessage.jsx`** | Confirmed single rendering seam — 11 importers, only file importing `NOVA_NAME` |
| `hqGeometry.js` | Pure isometric projection. Career-neutral — a greenhouse uses the same room math |
| Reward catalog (78 items), cosmetics, journey, ship | Already data files |
| 30 of 57 check scripts | Subject-agnostic |
| `verify-export-completeness.mjs` | **Safety asset** — cross-checks schema ↔ policy ↔ payload, hard-fails on mismatch. Keep green through every step |

---

## 5 · The work

### Tier 1 — foundation

| # | Item | Size |
|---|---|---|
| 1 | Sign-in screen + Academy registry | new, small |
| 2 | `db.js` opens a named database after sign-in | 1 file + boot ordering in 2 |
| 3 | Household database split | 1 file |
| 4 | Copy Lamar's database to `..._lamar` | one-time script |
| 5 | `_template/` + the questionnaire that fills it | new |
| 6 | `seeds/lamar.js` through the questionnaire path. **He must notice nothing** | mechanical |

### Tier 2 — cheap, needed

| Item | Size |
|---|---|
| Learner name: constant exists but **~20 JSX strings bypass it** | ~8 files, ~21 edits |
| Guide naming leaks: `speech.js:387` hardcodes a full Nova line; ~13 UI labels | ~16 files |
| `NAV_GROUPS` extracted from `NavBar.jsx:19` | 1 file |
| `ranks.js` — pack names vs engine gates; `CALIBRATED_LESSON_COUNT = 356` per Academy | 1 file |
| `weekPattern.js` — split his timetable from 8 engine functions | 2 files |
| `schoolQuarter.js` — `SCHOOL_YEAR_START_DATE` out of engine code | 3 files |
| `ink-*` colours → CSS variables, so a light theme is possible | **1 file.** Class names unchanged |

### Tier 3 — let the tests find it

~82 `aerospace` code reads across 27 files, and 27 check scripts with subject literals.

**Do not audit these by hand.** Create a blank Academy and run the 57 check scripts.
The failures name exactly which literals a non-aerospace Academy actually depends on.
The rest are defaults that never fire because every call site passes explicitly —
untidy, not broken. Hours of running things instead of days of reading.

---

## 6 · State compliance — any state, verified only

Same rule as videos: **verified against a primary source, never invented, gaps flagged
rather than filled.** This is legal compliance; a confidently wrong entry is worse than
a blank one.

One file per state in the household database:

```js
{
  code: 'GA', name: 'Georgia',
  notification:      { required: true, form: 'Declaration of Intent',
                       dueBy: 'September 1', renewal: 'annual' },
  instructionalTime: { daysPerYear: 180, hoursPerDay: 4.5 },
  requiredSubjects:  ['reading','language arts','math','science','social studies'],
  assessment:        { required: true, cadence: 'every 3 years from grade 3',
                       mustSubmit: false },
  recordKeeping:     ['attendance','annual progress report'],
  statute: 'O.C.G.A. § 20-2-690',
  sourceUrl: '…', verifiedOn: '2026-08-30'
}
```

**Four rules:**

1. `sourceUrl` and `verifiedOn` are required. A state without them does not load.
2. **Unverified states say so.** Picking an unverified state gives generic
   record-keeping and an honest message. The app never guesses a rule.
3. `verifiedOn` older than 12 months raises a warning. Homeschool law moves.
4. Start with the states you have. Georgia today; add on demand.

Petal & Pestle's `hours.js` already holds `GEORGIA = {daysPerYear:180,
minutesPerDay:270}` under O.C.G.A. § 20-2-690, looked up rather than remembered. That
constant is row one.

**What choosing a state changes:** attendance targets · which compliance checks appear
· deadline reminders · pre-filled required subjects · whether standardized test records
are needed · annual progress report format.

---

## 7 · The cut list

**✂️ The token rename.** 5,614 occurrences of `bg-space-900` etc. across 121 files.
Zero logic change, zero visible effect — her Academy renders cream while the class
still reads `space-900`. The biggest piece of fake work available.

**✂️ Migrating Azianna's records.** v12/21 tables vs v35/41; names barely overlap.
Start her fresh at a quarter boundary, keep Petal & Pestle read-only as the archive.
Her placement is nine strand levels, re-entered by hand in ten minutes.

**✂️ Supabase and cloud sign-in.** Sign-in is a local picker. Supabase solves
cross-device and the social layer — 2027.

**✂️ Forking into a new repo.** Evolve this one on a branch.

**✂️ Moving `problemTemplates.js` out of `src/engine/`.** Wrong, works, invisible.

**✂️ Auditing the 82 aerospace reads up front.** §5 Tier 3.

**✂️ Writing 50 states of law before anyone needs them.** §6 rule 4.

---

## 8 · Build order

Freeze lifts Sept 21. One batched, fully verified deploy per session.

| Window | Work | Deploy |
|---|---|---|
| **Now → Sept 21** | **Finish the reward HQ.** `HQRoom.jsx` is 2,816 lines and your most-changed file — no database surgery underneath it. Meanwhile, free: full export of both apps · diff the two lesson shapes · verify a first batch of states | 0 |
| **Sept 22 → early Oct** | Tier 1 items 1–4. Sign-in, named database, household split, copy his data. **Lamar the only Academy, sees no change** | 1 |
| **Oct** | Tier 1 items 5–6. `_template/`, questionnaire, `seeds/lamar.js`. Blank-Academy test passes | 1 |
| **Oct → Nov** | Tier 2, plus whatever Tier 3 the checks flagged | 1 |
| **Nov → Dec** | `academies/azianna/` — theme, guide, subjects, timetable, Khan core at her real levels. **She signs in and lands in her room** | 1 |
| **Dec → Jan 4** | Lamar's Q3 curriculum. Non-negotiable | 1 |
| **Jan, Q3 boundary** | Her 256 lessons ported | — |

### Her lessons — the diff is done, and it's harder than I said

**Revised Aug 30 after a field-by-field comparison. Earlier estimate of "an
afternoon" was wrong.**

**The good news first.** The text fields map almost perfectly: `id`, `title`, and all
four beat fields (`label`, `hook`, `teachingText`, `example`) are identical names for
identical things. Glossary converts array→map trivially. And the expensive-looking one
is free — **her feedback arrays already obey his exact invariant** (same length as
`choices`, `null` at the answer index) across all 2,560 bank items, 768 checks and 486
apply-its. `verify-curriculum.mjs` passes on that dimension with no work.

**The blocker: `practiceGeneratorId`.** Every one of his 261 beats carries one, and
`LessonEngine.jsx` builds the entire beat-practice phase from
`getTemplateById(...).build()`. Hers has **no generator system at all** — her practice
comes from a static bank. 512 converted beats would point at nothing.

Two ways out, and the second is better:
- Write ~512 generator templates from her bank items — mechanical but voluminous, and
  each would hold ~5 questions against a `practiceCount` of 4
- **Teach `LessonEngine` a static-bank fallback path** — about a day plus testing, and
  it changes his engine rather than her data

**The judgment call: `activity` and `ledger` have no home in his schema.** 243 lessons
each carry an `activity` (title, prep, needs, steps, safety, minutes) and a `ledger`
(the written record, plus if-she-is-stuck coaching). His engine has no phase that
renders either. Her lessons are 30–45 minutes with a 10–20 minute physical activity in
the middle — **strip that and you've ported the reading around the lesson, not the
lesson.**

Worth checking before treating it as fatal: **her own reader already ignores
`activity`, `ledger`, `concept`, `offGrade` and `spec`.** They may be parent-facing
notes rather than student-facing content. You'd know.

**Also authoring, not scripting:** 256 `connection` paragraphs (required inside
`novaIntro`) and 128 missing `explanation` strings. No script writes those.

**Also dropped:** `standards[]` and `offGrade`. She files Georgia compliance *per
lesson*; he files it centrally in `data/admin/georgiaCompliance.js`. That's a real loss
worth a schema field.

| Stage | Estimate |
|---|---|
| The field transform script | ~1 day |
| Static-bank practice path in `LessonEngine` | ~1 day + testing |
| 256 connection paragraphs + 128 explanations | authoring |
| `activity` / `ledger` decision | a schema + engine change, or accept the loss |

**Revised: a few days for lessons that load and run. Longer before they're as good as
they are in her own app.** Still January, but it's a real piece of work, not a
scripting afternoon.

**No video re-verification** — her verified videos travel with the rows, and hers
carries far richer video data than his (`id`, `title`, `channel`, `minutes`,
`verified`, `teaches`, `sourceGap`) against his bare URL string. **His schema should
take hers**, not the reverse.

### How long a *new* Academy's career track takes

**Weeks, not months.** Petal & Pestle's file timestamps: first lesson Aug 14; Science
Lab M1–M6, M8 and Social Studies M1–M12 on **Aug 16**; Herbalism M1–M16 and Human Body
M2–M16 on **Aug 17**. Essentially a four-course school year across two days.

What took months was the **system** — the diagnostic engine, assessment config, 42
check scripts, Khan lane mapping, gradebook, economy. That cost is never paid again.

The one thing that does not compress is **video verification** — every lesson needs a
verified video, ideally two sources, actively seeking Black American educators. Roughly
7 hours per 40-lesson course. Domain research for an unfamiliar career is the other
wildcard.

---

## 9 · Risks

| Risk | Mitigation |
|---|---|
| Boot-order refactor breaks hydration | Only 2 files consume `db.js`. Land it alone, deploy it alone |
| Lamar's live records damaged | **Copy, never mutate.** Full export first; original untouched until `..._lamar` verifies |
| Parent dashboard can't see both children | Known. Budget real time |
| Database surgery under active `HQRoom.jsx` work | Sequenced — reward HQ finishes first |
| Seeded and typed paths drift | §1 rule: one code path |
| A wrong state compliance entry | §6 rules 1–3 |

---

## 10 · A decision being deliberately reversed

`docs/PROJECT_PLAN.md:424` —

> *"The app stays single-profile — no separate parent/student login or account
> separation… Decided directly with the parent rather than assumed."*

Right for one child. Reversed on purpose. Log it in `PROJECT_LOG.md` with the date and
reason so a later session does not read the old line and undo this.
