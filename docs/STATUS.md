# STATUS — generated, do not edit by hand

Written by `scripts/generate-status.mjs`. Re-run it after any change that moves
a number here. **If a status claim is not in this file, it is not a status
claim** — PROJECT_PLAN.md keeps decisions and reasons, this keeps counts.

## Curriculum

| | |
|---|---|
| Total Mission Control lessons | 356 |
| Lessons carrying test questions | 356 |
| Lessons with no questions yet | 0 |

### By subject

| Subject | Lessons | State |
|---|---:|---|
| math | 106 | archived — taught on Khan |
| reading | 59 | active (lesson track) |
| science | 39 | archived — taught on Khan |
| aerospace | 54 | active |
| technology | 43 | active |
| socialStudies | 46 | active |
| robotics | 9 | active |

Active subjects: aerospace, technology, socialStudies, pe, robotics
Lesson-track subjects (browsable, not in the rotating block): reading
Archived (Khan teaches these): math, reading, science
Browsable lesson subjects, for rank-gate reachability: aerospace, technology, socialStudies, pe, robotics, reading

## Database

| | |
|---|---|
| Dexie version | v35 |
| Tables at v35 | 41 |

## Gamification

| | |
|---|---|
| Achievement badges | 51 |
| Rank tiers | 8 |
| Journey destinations | 8 |
| Ship systems | 7 |
| Engineer Readiness skills | 11 (Bronze/Silver/Gold) |
| Readiness skills with written criteria | 11 of 11 |
| Nova daily lines | 27 |

## Economy

| | |
|---|---|
| Coins | 1 per 2 XP |
| Credits | 1 per 5 XP |
| Credit ladder | 50 · 150 · 400 · 800 · 1500 · 2000 |
| Seasonal operations | 4 (one per quarter) |
| Projected challenge income | 940 Credits + 3840 Coins per year |
| Coin-purchasable items | 45 |
| Real-world rewards | 26 |
| Dream Rewards | 8 |

> **These counts describe the CATALOG, and as of Aug 9, 2026 the catalog is
> what the student's store actually renders.** They did not before: the store
> read the `rewards` Dexie table, seeded Aug 6 at coin-era prices, while this
> file counted `data/rewardCatalog.js`, which no component imported. So the
> one document designated as authoritative was describing a store that was not
> the one running. `migrateRewardsToLadder` in useAppStore now re-prices the
> seeded rows onto this ladder, and the live table is the catalog plus
> whatever the parent has added or removed herself.

> The 2000-Credit Dream Reward is priced assuming the challenge income above.
> If challenges are ever dropped, the top tier must come down with them.

## Two-computer sync

| | |
|---|---|
| Export version | 3 |
| Tables that travel | 32 |
| Tables deliberately excluded | 9 |
| Guard | `scripts/verify-export-completeness.mjs` |

> Every table in the v35 schema must appear in `EXPORT_TABLE_POLICY`
> as either `true` or a written reason for exclusion, and the guard fails the
> moment the schema, the policy and the export payload stop agreeing. Four
> separate tables have shipped silently un-exported in this project's history;
> that is what the guard is for.

## Participation subjects

| | |
|---|---|
| Garden calendar days | 51 (25 with a brief, 3 closed) |
| Garden calendar runs | 2026-08-14 → 2027-07-30 |
| Guitar skill ladder | 30 skills |
| PE exercises | 70 across 7 categories |

## Parent Dashboard

| | |
|---|---|
| Sections | 34 |
| Groups | 6 |

## Schedule

| | |
|---|---|
| Blocks in the default day | 13 |
| Day runs | 08:30 → 16:45 |
| Scheduled school time | 5 hr 15 min (break, lunch and after-school guitar excluded) |
| Week shape | 5 core days + 1 buffer day |
| Class bell | on by default, 2-minute warning, parent-set 0-15 |

> The narrative walkthrough lives in `docs/THE_SCHEDULE.md`. This table is the
> count; that document is the explanation.

## Verification suites

54 guard suites in `scripts/` — this is the suite:

- `node scripts/verify-academic-order.mjs`
- `node scripts/verify-academic-schedule.mjs`
- `node scripts/verify-academy-css.mjs`
- `node scripts/verify-academy-db.mjs`
- `node scripts/verify-assignment-dates.mjs`
- `node scripts/verify-audit-aug23.mjs`
- `node scripts/verify-book-swap.mjs`
- `node scripts/verify-class-bell.mjs`
- `node scripts/verify-compliance-deadline.mjs`
- `node scripts/verify-curriculum.mjs`
- `node scripts/verify-daily-writing.mjs`
- `node scripts/verify-dream-goals.mjs`
- `node scripts/verify-ela-sequence.mjs`
- `node scripts/verify-export-completeness.mjs`
- `node scripts/verify-field-trip-records.mjs`
- `node scripts/verify-front-door.mjs`
- `node scripts/verify-gardening.mjs`
- `node scripts/verify-georgia-hours.mjs`
- `node scripts/verify-grade-entry.mjs`
- `node scripts/verify-grammar-ladder.mjs`
- `node scripts/verify-guitar.mjs`
- `node scripts/verify-handoff.mjs`
- `node scripts/verify-hq-room.mjs`
- `node scripts/verify-import.mjs`
- `node scripts/verify-khan-unit-completion.mjs`
- `node scripts/verify-khan-unit-names.mjs`
- `node scripts/verify-local-dates.mjs`
- `node scripts/verify-mission-grades.mjs`
- `node scripts/verify-mission-schedule.mjs`
- `node scripts/verify-morning-meeting.mjs`
- `node scripts/verify-no-learner.mjs`
- `node scripts/verify-pacing.mjs`
- `node scripts/verify-parses.mjs`
- `node scripts/verify-pe-videos.mjs`
- `node scripts/verify-planner-feeds.mjs`
- `node scripts/verify-printouts.mjs`
- `node scripts/verify-prompt-lessons.mjs`
- `node scripts/verify-quarter-gating.mjs`
- `node scripts/verify-quiz-games.mjs`
- `node scripts/verify-readiness-record.mjs`
- `node scripts/verify-reflections.mjs`
- `node scripts/verify-report-card.mjs`
- `node scripts/verify-roster-trim.mjs`
- `node scripts/verify-rotating-block.mjs`
- `node scripts/verify-schedule-times.mjs`
- `node scripts/verify-school-calendar.mjs`
- `node scripts/verify-splice-regression.mjs`
- `node scripts/verify-store-visibility.mjs`
- `node scripts/verify-technology-khan.mjs`
- `node scripts/verify-timetable-order.mjs`
- `node scripts/verify-typing.mjs`
- `node scripts/verify-word-study.mjs`
- `node scripts/verify-wrong-answer-diagnosis.mjs`
- `node scripts/verify-xp-and-rank.mjs`

