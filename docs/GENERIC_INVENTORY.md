# What is in the generic version of LearningOS

**Measured Sept 3, 2026, against `f145c04`. Read-only inventory — nothing in
this document was changed to produce it.**

This file answers one question: *when a new student's folder branches off the
generic version, what exactly is it branching off?*

The short answer is that there are **three zones, not two**, and the one a new
student inherits from is the smallest of them by a wide margin.

---

## The three zones

| Zone | Path | Size | Role |
|---|---|---:|---|
| **Platform** | `src/` minus `academies/` | 209 files · 86,220 lines | The bones every Academy runs |
| **Template** | `src/academies/_template/` | 3 files · 236 lines | What a new student folder branches off |
| **Academy** | `src/academies/<id>/` | lamar 79 files · 65,146 lines<br>petal-pestle-academy 153 files · 85,089 lines | One child's school |

The platform is large and generic in **structure**. The template is where
"generic" is supposed to become something a family can actually start from, and
it is nearly empty. That gap is the subject of this document.

---

## 1. The platform zone — what every Academy runs

| Folder | Files | Lines | What it holds |
|---|---:|---:|---|
| `src/lib/` | 58 | — | Behaviour: scheduler, gradeScale, economy, ranks, compliancePacket, parentAuth, schoolQuarter, timetable, instructionTime |
| `src/components/Dashboard/` | 36 | 14,211 | The main school screens |
| `src/components/Rewards/` | 11 | 7,151 | XP, coins, store, avatar |
| `src/components/Academic/` | 12 | 3,149 | Academic Success Center |
| `src/components/Writing/` | 12 | 2,456 | Drills, typing, spelling |
| `src/components/FrontDoor/` | 5 | 1,955 | Sign-in, first run |
| `src/components/Lesson/` | 16 | 1,630 | Lesson shell, study guide, review game |
| `src/components/Garden/` | 7 | 1,499 | **One child's elective. Ships to every Academy.** |
| `src/components/PE/` | 9 | 1,432 | Exercise, nutrition |
| `src/components/Scheduler/` | 5 | 1,117 | Planner, calendar |
| `src/components/Guitar/` | 6 | 1,057 | **One child's elective. Ships to every Academy.** |
| `src/components/Mentor/` | 6 | 940 | The guide / avatar system |
| `src/components/Morning/` | 1 | 886 | Morning Meeting |
| `src/components/Games/` | 3 | 873 | Quiz and game hub |
| `src/components/Academy/` | 2 | 850 | The Empty and Configured states |
| `src/components/Domains/` | 1 | 385 | Domain project view |
| `src/components/Navigation/` | 1 | 362 | The nav bar |
| `src/components/Messages/` | 1 | 113 | Messages |
| `src/engine/` | 6 | — | Lesson engine (`LessonEngine.jsx`, `problemTemplates.js` ~1.3 MB) |
| `src/db/` | 3 | — | `db.js` one Academy · `householdDb.js` the family · `importRunner.js` |
| `src/store/` | 1 | — | `useAppStore.js` (~640 KB) |
| `src/content/` | 1 | 468 | `academyContent.js` — **the contract** |

Top level: `main.jsx` (45) · `FrontDoorGate.jsx` (235) · `SchoolBoot.jsx` (44) ·
`App.jsx` (536) · `index.css` (41).

---

## 2. The contract — the sixteen slots a folder may fill

`src/content/academyContent.js` is the whole agreement between the platform and
every Academy that will ever exist. It names **roles, never subjects**.

```
subjects · lessons · placement · timetable · guide · theme
projects · exams · writing · khanSequences · pe · electives
games · academicCenter · rewards · compliance
```

### Five are required

`subjects` · `lessons` · `timetable` · `guide` · `theme`

A school missing any of these is refused loudly rather than rendered emptily. A
school with none of them is not a partly-built school; it is a blank screen with
a nav bar.

The other eleven may be left blank. **Blank is expected and costs nothing** —
that is the difference between a slot and a requirement. An Academy on its first
morning legitimately has no exams, no electives and no games.

### Two are never defaulted, on purpose

`subjects` and `lessons`. The loader refuses a template that fills either.

The reason belongs in front of anyone who is tempted: a default curriculum is
not a gentler fallback, it is a school made of nothing that still opens. It
would hide the exact state the Empty and Configured screens exist to show a
family. Those two come from a real Academy or not at all.

### How a folder merges onto the template

Slot by slot, name by name. An Academy's own answers land on top of the
template's, and anything it does not mention it keeps. So a folder can supply
one line pool of its own without losing the rest of the guide.

---

## 3. The template — what a new student actually inherits

`src/academies/_template/` is three files.

| File | Fills | Why it is there |
|---|---|---|
| `content.js` | `guide`, `theme` | The two slots below |
| `guide/dailyLines.js` | the generic line pool | A new Academy must have a guide who does not repeat on day one |
| `theme/template.css` | the plain look | An Academy with no stylesheet gets a plain readable school rather than a white page — this is what makes the Configured state survivable while a family is still setting up |

**Two of sixteen slots.** A new student folder inherits a guide and a look.

**It owes `subjects`, `lessons` and `timetable` before the school will open at
all** — those are three of the five required slots, and the template supplies
none of them.

The rule written at the top of `_template/content.js` governs everything else
that might be added to it:

> It belongs here if it would be true for a child studying anything at all. If
> it would look wrong in the folder of a learner whose subjects you have never
> thought about, it is not generic — it is one Academy's answer wearing a
> neutral name, and it belongs in that Academy's folder.

---

## 4. Where it is not generic yet

Measured, not estimated.

### The contract asks for 156 names. Most of them are not a school's to give.

`scripts/content-name-triage.json`, read against `lamar`:

| Verdict | Count | Example |
|---|---:|---|
| One school's data | 91 | `ACTIVE_SUBJECTS`, `allLessons`, `COIN_CATALOG` |
| Logic bound to that data | 62 | `isSchoolDay` → `isHoliday` → `HOLIDAY_BY_DATE` |
| Genuinely behaviour — belongs to the platform | 3 | what Step 1 has left to move |

Only about **26 of the 156** are things a school should ever be asked for.
Petal-Pestle reports 140 missing, and most of them were never hers to supply.

The platform is generic at the **slot** level and one school's vocabulary
**inside** each slot. A slot has to become a *shape* — *"is today a school day,
and what is on it?"* — that each school answers however it likes.

### 85 files in the platform zone still name one school

`scripts/generic-debt.json`. **This list may shrink and must never grow.**

| Tag | Files |
|---|---:|
| school-name | 52 |
| learner | 32 |
| subject | 28 |
| guide | 16 |

Where they sit:

| Folder | Files on the list |
|---|---:|
| `src/components/Dashboard/` | 18 |
| `src/components/Writing/` | 8 |
| `src/components/Lesson/` | 6 |
| `src/components/Rewards/` | 6 |
| `src/components/Mentor/` | 5 |
| `src/components/Games/` | 3 |
| `src/components/Scheduler/` | 3 |
| `src/components/Academic/` | 2 |
| `src/lib/` | 25 single files |
| everything else | 9 single files |

### One child's electives ship to every Academy

2,556 lines across `src/components/Guitar/` and `src/components/Garden/`, and
`src/components/Navigation/` offers both tabs unconditionally — no condition, no
declaration from the Academy, the entries are written straight into the nav
list.

### A parent cannot reach a second Academy at all

```js
// src/FrontDoorGate.jsx
enter(academies[0].id, 'parent');   // always the first Academy
```

The separation underneath is real. It is not reachable.

---

## 5. What separation actually rests on

Two mechanisms, for two different things. Both are working.

| | Where it lives | Isolated by |
|---|---|---|
| **Content** — lessons, theme, guide, subjects | `src/academies/<id>/` | different directories |
| **Records** — XP, attendance, grades, streaks | IndexedDB, in the browser | **different databases** |

The folder is the textbook; the database is the notebook. One database per
Academy means nothing crosses, because there is no shared table for it to cross
through.

`src/academies/registry.js` ships `ACADEMIES = []` and it stays empty — that is
not a placeholder for a list that fills up later, it is the no-learner rule
written as something that executes. Real Academies live in the household
database, created by the family who owns them.

Verified Sept 3, 2026: `verify-no-learner` 18/0 · `verify-front-door` 50/0 ·
`verify-academy-db` 32/0 · `verify-content-interface` 29/1 (the one deliberate
red — Petal-Pestle's 140 missing names, which go green at §3c Step 4 and not by
weakening the check).

---

## 6. The three gaps between here and "each student branches off the generic version"

| # | Gap | Where it is addressed |
|---|---|---|
| 1 | **The template is too thin to branch from.** 2 of 16 slots. A new folder starts near-empty and owes 156 names, most of which should never have been asked of it | The *outcome* of §3c Step 4, not currently its own step |
| 2 | **The platform still shows one school to everyone.** 85 debt files, plus Guitar and Garden in every nav bar | C4 steps 3 and 5 |
| 3 | **A parent cannot reach a second Academy.** Cannot choose one, cannot create a second, cannot change a curriculum once it works | C4 step 1 — the top of the list |

Gap 3 comes first, because until a parent can create, choose and re-point an
Academy, nothing else can be verified by a person actually using the app.

See `docs/NEXT_SESSION_C4.md` for the sequence and
`docs/LEARNINGOS_PACK_SPEC.md` §3a and §3c for the contract behind it.
