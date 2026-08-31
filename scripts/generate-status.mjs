/**
 * Writes docs/STATUS.md from the code, not from memory.
 *
 * WHY THIS EXISTS. The master plan review (Aug 6) found 13 wrong status claims
 * in PROJECT_PLAN.md, four of them contradicting another section of the same
 * document. Every one drifted the same way: work shipped, the plan was not
 * edited, and the next session read a confident "Status:" line and believed it.
 *
 * The rule that follows: PROJECT_PLAN.md keeps decisions, scope and reasons —
 * the parts that stay true for months and are worth writing by hand. Anything
 * countable lives here and is generated. If a status claim is not in this file,
 * it is not a status claim.
 *
 * Run: node scripts/generate-status.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { allLessons } from '../src/academies/lamar/data/lessons/index.js';
// ARCHIVED_SUBJECTS was renamed KHAN_TAUGHT_SUBJECTS and this import was never
// updated, so `node scripts/generate-status.mjs` has thrown on line 1 ever
// since — which means docs/STATUS.md, the file whose own header says "if a
// status claim is not in this file, it is not a status claim", had quietly
// stopped being regenerated. Fixed Aug 13, 2026. LESSON_TRACK_SUBJECTS is
// included because a subject can be browsable without being in ACTIVE_SUBJECTS
// (Reading is), and the mastery-gate arithmetic depends on which are which.
import {
  ACTIVE_SUBJECTS,
  KHAN_TAUGHT_SUBJECTS,
  LESSON_TRACK_SUBJECTS
} from '../src/academies/lamar/subjects.js';
const BROWSABLE_SUBJECTS = [...ACTIVE_SUBJECTS, ...LESSON_TRACK_SUBJECTS];
import { BADGES } from '../src/lib/badges.js';
import { RANKS } from '../src/lib/ranks.js';
import { READINESS_SKILLS, READINESS_LEVELS } from '../src/lib/readiness.js';
import { SHIP_SYSTEMS } from '../src/lib/shipSystems.js';
import { DESTINATIONS } from '../src/lib/journey.js';
import { SEASONAL_OPERATIONS, projectedAnnualIncome } from '../src/lib/challenges.js';
import { CREDIT_LADDER, XP_PER_COIN, XP_PER_CREDIT } from '../src/lib/economy.js';
import { MISSION_EQUIPMENT, AVATAR_GEAR, HQ_ITEMS, REAL_WORLD_REWARDS, DREAM_REWARDS } from '../src/academies/lamar/data/rewardCatalog.js';
import { EXPORT_TABLE_POLICY } from '../src/db/db.js';
import { gardenCalendar } from '../src/academies/lamar/data/gardening/gardenCalendar.js';
import { guitarSkillLadder } from '../src/academies/lamar/data/guitar/guitarSkillLadder.js';
import { exerciseLibrary } from '../src/academies/lamar/data/pe/exerciseLibrary.js';
import { DAILY_LINE_COUNT } from '../src/academies/lamar/data/mentor/dailyLines.js';
import { defaultSchedule } from '../src/academies/lamar/data/schedule/defaultSchedule.js';
import { WEEK_PATTERN } from '../src/academies/lamar/data/schedule/weekPattern.js';
import { toMinutes } from '../src/lib/classBell.js';

const db = readFileSync('src/db/db.js', 'utf8');
const dexieVersion = Math.max(...[...db.matchAll(/db\.version\((\d+)\)/g)].map((m) => Number(m[1])));
/**
 * Read the table count from the LATEST version, not a hardcoded v30.
 *
 * This file exists because status claims drift. Pinning the regex to a
 * specific version number is the same drift wearing a script's clothes: the
 * day the schema moved to v31, the one document designated as authoritative
 * would have gone on reporting v30's table count without failing.
 */
const storesMatch = db.match(
  new RegExp('db\\.version\\(' + dexieVersion + '\\)(?:\\s*\\n\\s*)?\\.stores\\(\\{([\\s\\S]*?)\\n\\s*\\}\\)')
);
const tables = (storesMatch || ['', ''])[1]
  .split('\n').filter((l) => /^\s+[a-zA-Z]+:/.test(l)).length;
const store = readFileSync('src/store/useAppStore.js', 'utf8');
const exportVersion = (store.match(/const EXPORT_VERSION = (\d+);/) || ['', '?'])[1];
const exportedTables = Object.values(EXPORT_TABLE_POLICY).filter((v) => v === true).length;
const excludedTables = Object.values(EXPORT_TABLE_POLICY).filter((v) => typeof v === 'string').length;

const pd = readFileSync('src/components/Dashboard/ParentDashboard.jsx', 'utf8');
const groupsBlock = (pd.match(/const SECTION_GROUPS = \[[\s\S]*?\n\];/) || [''])[0];
const parentSections = [...new Set([...groupsBlock.matchAll(/\{ id: '([a-z-]+)', label:/g)].map((m) => m[1]))];
const parentGroups = [...groupsBlock.matchAll(/^  \{\n\s+id: '([a-z]+)'/gm)].length;

const scriptGuards = readdirSync('scripts')
  .filter((f) => /^verify-.*\.mjs$/.test(f))
  .sort();

// Filtered by id and colorKey, NOT by matching the label text: block-9's label
// contains the word "Guitar" (Friday guitar THEORY) and a label match silently
// dropped its 45 minutes from this total on the first run.
const NON_INSTRUCTION_IDS = new Set(['block-10', 'block-11']); // after-school guitar practice and gardening
const instructionMinutes = defaultSchedule
  .filter((b) => b.colorKey !== 'break' && !NON_INSTRUCTION_IDS.has(b.id))
  .reduce((n, b) => n + (toMinutes(b.endTime) - toMinutes(b.startTime)), 0);
const coreDays = Object.values(WEEK_PATTERN).filter((d) => d.kind === 'core').length;
// No day is 'buffer' any more — Friday became a core day on Aug 9 2026. What
// is still distinct about it is the OPEN rotating block, so that is what gets
// counted. The variable keeps its name because the template below reads it.
const bufferDays = Object.values(WEEK_PATTERN).filter((d) => d.kind === 'core' && d.flex).length;

const suites = existsSync('_build/verify')
  ? readdirSync('_build/verify').filter((f) => /^(check|test)-.*\.mjs$/.test(f)).sort()
  : [];

const bySubject = {};
for (const l of allLessons) bySubject[l.subject] = (bySubject[l.subject] || 0) + 1;

const withQuestions = allLessons.filter((l) => Array.isArray(l.questions) && l.questions.length > 0).length;

const income = projectedAnnualIncome();
const coinItems = MISSION_EQUIPMENT.length + AVATAR_GEAR.length + HQ_ITEMS.length;

const rows = (o) => Object.entries(o).map(([k, v]) => `| ${k} | ${v} |`).join('\n');

const out = `# STATUS — generated, do not edit by hand

Written by \`scripts/generate-status.mjs\`. Re-run it after any change that moves
a number here. **If a status claim is not in this file, it is not a status
claim** — PROJECT_PLAN.md keeps decisions and reasons, this keeps counts.

## Curriculum

| | |
|---|---|
| Total Mission Control lessons | ${allLessons.length} |
| Lessons carrying test questions | ${withQuestions} |
| Lessons with no questions yet | ${allLessons.length - withQuestions} |

### By subject

| Subject | Lessons | State |
|---|---:|---|
${Object.entries(bySubject).map(([s, n]) =>
  `| ${s} | ${n} | ${ACTIVE_SUBJECTS.includes(s) ? 'active' : LESSON_TRACK_SUBJECTS.includes(s) ? 'active (lesson track)' : KHAN_TAUGHT_SUBJECTS.includes(s) ? 'archived — taught on Khan' : 'unlisted'} |`
).join('\n')}

Active subjects: ${ACTIVE_SUBJECTS.join(', ')}
Lesson-track subjects (browsable, not in the rotating block): ${LESSON_TRACK_SUBJECTS.join(', ')}
Archived (Khan teaches these): ${KHAN_TAUGHT_SUBJECTS.join(', ')}
Browsable lesson subjects, for rank-gate reachability: ${BROWSABLE_SUBJECTS.join(', ')}

## Database

| | |
|---|---|
| Dexie version | v${dexieVersion} |
| Tables at v${dexieVersion} | ${tables} |

## Gamification

| | |
|---|---|
| Achievement badges | ${BADGES.length} |
| Rank tiers | ${RANKS.length} |
| Journey destinations | ${DESTINATIONS.length} |
| Ship systems | ${SHIP_SYSTEMS.length} |
| Engineer Readiness skills | ${READINESS_SKILLS.length} (${READINESS_LEVELS.join('/')}) |
| Readiness skills with written criteria | ${READINESS_SKILLS.filter((s) => s.levels && Object.keys(s.levels).length === 3).length} of ${READINESS_SKILLS.length} |
| Nova daily lines | ${DAILY_LINE_COUNT} |

## Economy

| | |
|---|---|
| Coins | 1 per ${XP_PER_COIN} XP |
| Credits | 1 per ${XP_PER_CREDIT} XP |
| Credit ladder | ${CREDIT_LADDER.map((t) => t.credits).join(' · ')} |
| Seasonal operations | ${SEASONAL_OPERATIONS.length} (one per quarter) |
| Projected challenge income | ${income.credit} Credits + ${income.coin} Coins per year |
| Coin-purchasable items | ${coinItems} |
| Real-world rewards | ${REAL_WORLD_REWARDS.length} |
| Dream Rewards | ${DREAM_REWARDS.length} |

> **These counts describe the CATALOG, and as of Aug 9, 2026 the catalog is
> what the student's store actually renders.** They did not before: the store
> read the \`rewards\` Dexie table, seeded Aug 6 at coin-era prices, while this
> file counted \`data/rewardCatalog.js\`, which no component imported. So the
> one document designated as authoritative was describing a store that was not
> the one running. \`migrateRewardsToLadder\` in useAppStore now re-prices the
> seeded rows onto this ladder, and the live table is the catalog plus
> whatever the parent has added or removed herself.

> The ${CREDIT_LADDER[CREDIT_LADDER.length - 1].credits}-Credit Dream Reward is priced assuming the challenge income above.
> If challenges are ever dropped, the top tier must come down with them.

## Two-computer sync

| | |
|---|---|
| Export version | ${exportVersion} |
| Tables that travel | ${exportedTables} |
| Tables deliberately excluded | ${excludedTables} |
| Guard | \`scripts/verify-export-completeness.mjs\` |

> Every table in the v${dexieVersion} schema must appear in \`EXPORT_TABLE_POLICY\`
> as either \`true\` or a written reason for exclusion, and the guard fails the
> moment the schema, the policy and the export payload stop agreeing. Four
> separate tables have shipped silently un-exported in this project's history;
> that is what the guard is for.

## Participation subjects

| | |
|---|---|
| Garden calendar days | ${gardenCalendar.length} (${gardenCalendar.filter((d) => d.briefId).length} with a brief, ${gardenCalendar.filter((d) => d.closed).length} closed) |
| Garden calendar runs | ${gardenCalendar[0].date} → ${gardenCalendar[gardenCalendar.length - 1].date} |
| Guitar skill ladder | ${guitarSkillLadder.length} skills |
| PE exercises | ${Object.values(exerciseLibrary).flat().length} across ${Object.keys(exerciseLibrary).length} categories |

## Parent Dashboard

| | |
|---|---|
| Sections | ${parentSections.length} |
| Groups | ${parentGroups} |

## Schedule

| | |
|---|---|
| Blocks in the default day | ${defaultSchedule.length} |
| Day runs | ${defaultSchedule[0].startTime} → ${defaultSchedule[defaultSchedule.length - 1].endTime} |
| Scheduled school time | ${Math.floor(instructionMinutes / 60)} hr ${instructionMinutes % 60} min (break, lunch and after-school guitar excluded) |
| Week shape | ${coreDays} core days + ${bufferDays} buffer day |
| Class bell | on by default, ${'2'}-minute warning, parent-set 0-15 |

> The narrative walkthrough lives in \`docs/THE_SCHEDULE.md\`. This table is the
> count; that document is the explanation.

## Verification suites

${scriptGuards.length} guard suites in \`scripts/\` — this is the suite:

${scriptGuards.map((f) => `- \`node scripts/${f}\``).join('\n')}
${suites.length > 0 ? `
\\n${suites.length} older scratch scripts remain in \`_build/verify/\` and are NOT
part of the suite.` : ''}
`;

writeFileSync('docs/STATUS.md', out, 'utf8');
/**
 * COUNT THE REAL SUITES. (Fixed Aug 16, 2026.)
 *
 * This line reported \`suites.length\` — files matching check-*.mjs / test-*.mjs
 * inside _build/verify/, a scratch directory of old candidate components. The
 * real guards are scriptGuards, computed forty lines above and then used only
 * in a footnote. So STATUS.md has been naming 28 files that nobody runs and
 * burying the 29 that gate every change.
 *
 * Second time this generator has quietly described the wrong thing — it also
 * froze completely on Aug 12 when an export it imported was renamed. A document
 * that regenerates without complaint is not the same as a document that is
 * right.
 */
console.log(`docs/STATUS.md written — ${allLessons.length} lessons, ${BADGES.length} badges, ${scriptGuards.length} guard suites`);
