# Home screen & tab review

**Aug 30, 2026.** Read against the live code, not the plan.

---

## The short answer

**Yes, it's overwhelming — and the reason is written in your own docs.**

`docs/PROJECT_PLAN.md:449`, from your competitive research:

> *"Cramming many data types onto one screen is a named failure mode… 'today's
> actionable items first, everything else one tab away' instead of the current single
> dense view with 18 widget types on it."*

And `MissionControlDashboard.jsx:44–46`, the file's own header, measuring the screen
*before* the Aug 7 rebuild:

> *"3,152px tall — three and a half viewports — across 14 cards."*

The rebuild's stated rule was **"NOTHING WAS REMOVED."** Since then the screen has
gained the Morning Meeting banner, Nova's greeting, `DailyMissionCard`,
`RocketProgressMeter`, the density toggle, `WeekInReviewCard`, `FeedbackFromMomCard`,
the garden row, the typing row, the hands-on project row, and the
Messages/Spelling/Vocabulary tile row.

**Today's numbers**

| | |
|---|---|
| Lines in `MissionControlDashboard.jsx` | **1,489** |
| Store selectors across the rendered subtree | **63** |
| Child components mounted | 12 |
| Data modules imported | 19 |
| Rows in "the rest of today", typical Tuesday | 13–14 |
| **Clickable controls, normal Tuesday** | **≈ 43–53** |
| Schedule blocks rendered per day | 12–13 — **rendered twice** |

---

## The tension to respect before changing anything

You have already tried moving things off the day list, three times, and it failed
three times. `docs/PROJECT_PLAN.md:2589–2601`, Aug 25, in your words:

> *"This weeks projects should be added to his rest of the day because he is ignoring it."*

Log entry: *"the same build in two places, one of them under 'nothing here is due
today', is the thing that was wrong with it. **Third report of this fault.**"*

**So the fix is not "move things into tiles."** That pattern is dead and the docs say
so. The fix is that several things are on the screen **twice**, and the tile row is
the leftover of the dead pattern.

Everything below removes a duplicate or fixes a misfile. Nothing below moves a real
task off the day list.

---

## What to cut — in order of payoff

### 1 · The day's timetable renders twice, in the same sticky rail ⭐ biggest win

`ClassBellCard.jsx:202–224` draws all 12–13 blocks as a chip strip.
`TodaysRoutineRail.jsx:104–160` draws **the same blocks** as a vertical timeline —
immediately below it, in the same `<aside>` (`MissionControlDashboard.jsx:741–742`).

The rail is already taller than a laptop viewport and needs its own inner scroll (see
the comment at L729–732). Half of that height is a second copy of what's directly
above it.

**Keep the rail** — it has progress dots and a completion bar, which the chips don't.
**Cut the chip strip** from `ClassBellCard`, leaving it as what its name says: current
block, countdown, next up.

*Saves roughly a third of the left rail. No task leaves the screen.*

### 2 · Spelling and vocabulary appear twice on one screen

Rows at `MissionControlDashboard.jsx:1227–1310` **and** quiet tiles at L1409–1410 —
130 lines apart, both calling `onStudyWords(skill)`.

By your own Aug 25 rule, the row in the day list is the one that gets done.
**Delete the two tiles.**

### 3 · Academic Center has two entry points on the same screen

`AcademicCenterCard`'s header "Open" button (L178–192) and the "Academic Center" quiet
tile (L1367). **Delete the tile.**

### 4 · The current book appears three times, two of them simultaneously

The day row (L1053–1085) and `AcademicCenterCard`'s Reading section (L214–222) both
render when a book is in progress. **Keep the row** (it deep-links to *that* book,
which was a specific fix). Drop Reading from `AcademicCenterCard`.

### 5 · Three things are filed under the wrong heading

The "Also available" heading at L1352 reads **"nothing here is due today"** — and
`WeekInReviewCard`, `FeedbackFromMomCard` and `StudentHandoffCard` all render inside
that same div (closing L1437).

Mom's graded feedback is not "nothing due." Sending work to Mom is not "nothing due."
**Move those three below the tile row, under their own heading** — "Before you finish
up" would cover all three.

### 6 · File handoff is on the dashboard *and* is Morning Meeting step 1

`StudentHandoffCard.jsx:56–76` duplicates `MorningMeeting.jsx:470–516`. Both are
import/export. Keep both **only** if the dashboard one is the *end*-of-day copy —
otherwise he does it twice or ignores both.

**Net effect of 1–6:** the left rail loses a third, the day list is untouched, and
five duplicate controls leave the screen. Nothing a student needs to do disappears.

---

## The tabs

**13 student tabs in 3 groups, plus Parent.** The grouping is settled and
parent-negotiated — `docs/PROJECT_PLAN.md:2570–2578`, Aug 2026, after you corrected
the first draft (PE belongs in Learn; Games with Typing). **Leave the groups alone.**

Four real problems, none of them about the grouping:

### ⚠ Mission Comms has no nav entry at all

It's routed at `App.jsx:465` but appears nowhere in `NAV_GROUPS`. Its only door is one
tile on the dashboard (`MissionControlDashboard.jsx:1391`).

Morning Meeting step 6 posts his questions *into* it (`MorningMeeting.jsx:813–835`).
**So he can ask you something, and the only way to see your reply is to find one tile
on one screen.** That's the reply loop's return leg hanging on a tile — the same
pattern that failed three times elsewhere.

Give it a nav entry under Learn, or fold Comms into the Morning Meeting.

### ⚠ Parent tools are inside a student tab, ungated

`Academic/AcademicParentSetupView.jsx` — **673 lines** of book and assignment editors
— is the 4th tab inside the student-facing Academic Center, behind **no gate**.
Everything else parent-facing sits behind `<ParentGate>`.

Move it into the Parent Dashboard, or gate it.

### ⚠ Nothing is one click

Desktop nav is three dropdowns: **group click + tab click = 2 clicks** to reach
anything. Mobile is hamburger + accordion = **3**. Only Parent Dashboard (and Rewards,
via the coin chip) is direct.

Four things sit **four levels deep**: PE → Nutrition → Recipe Library → expand;
Rewards → Progress → Badges → certificate; Academic → Assignments → expand →
reflection; Garden → Garden Log → form.

Cheapest fix: pin the two or three tabs he uses daily as direct buttons beside the
groups.

### ⚠ Two tabs are empty or inert

- **Progress** has **zero buttons on the whole screen** — a read-only page behind two
  clicks, duplicating the rank/streak/XP already on the dashboard and the mission
  journey already in Rewards.
- **Games** — both Signature Missions are exam-gated, so early in the year the tab is
  locked, and the quiz games are inert until you supply links.

Neither needs deleting. Both need to stop being a dead end when he arrives.

---

## What's in the right place

Worth saying, because most of it is:

- **Card order is derived, not authored.** Rows carry a `block` and sort against your
  real `scheduleBlocks` (`docs/PROJECT_LOG.md:17267`). Move a block in the Scheduler
  and the day list moves with it. That's the right design and it should stay.
- **PE pinned above the day-kind branch** — deliberate, your words, assertion-protected.
- **The deep links work.** The book row opens *that book*, the journal row opens *that
  prompt*, the word rows open *that day's activity*. Each was a specific fix.
- **Nova's per-tab guides** — 8 student surfaces, `tone='brief'`, deliberately
  restrained. `docs/PROJECT_LOG.md:13375`: *"a twelve-year-old will not read a manual —
  but he will listen to Nova for fifteen seconds."* Right call.
- **Two duplicates you already killed on purpose** — the Writing Journal tile only
  renders when no journal row exists; the project tile was deleted when the project got
  a row.

---

## One thing to measure before and after

Nobody has measured the screen since Aug 7. Open it on Lamar's machine on a Tuesday
and note the scroll height. Then again after cuts 1–6.

If it's still over two viewports, the next conversation is about the day list itself —
and that one is harder, because every row on it is there for a reason you already wrote
down.
