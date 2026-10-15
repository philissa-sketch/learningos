// ---------------------------------------------------------------------------
// THE FOUR "CAN'T TELL YOU" QUESTIONS ARE ANSWERED. Run: ACADEMY=lamar node scripts/verify-analytics-answers.mjs
//
// The parent, Oct 14, 2026: "There are a lot of questions that aren't getting
// answered due to there not being a setup for it." Learning Analytics listed four
// questions as unanswerable. Each now has a derivation or a setup button.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0;
const failures = [];
function ok(label, cond, detail = '') {
  if (cond) { passed += 1; console.log('PASS  ' + label); }
  else { failures.push(label); console.log('FAIL  ' + label + (detail ? `  ${detail}` : '')); }
}
const read = (rel) => fs.readFileSync(path.join(REPO, rel), 'utf8');

const { installAcademyContent } = await import('../src/content/academyContent.js');
installAcademyContent(await import('../src/academies/lamar/content.js'), 'lamar');
const { onTrackForYear, nextWeekFocus, learningStyleView } = await import('../src/lib/analyticsAnswers.js');
const { schoolDaysBetween } = await import('../src/lib/yearPlan.js');

// --- on track ---------------------------------------------------------------
const plan = [{ id: 'Q1', status: 'current', start: '2026-08-03', end: '2026-10-30', schoolDays: 60, daysLogged: 50,
  bySubject: { a: { total: 20, mastered: 2 }, b: { total: 20, mastered: 18 } } }];
const t = onTrackForYear({ yearPlan: plan, progress: { required: 180, onTrack: true }, today: '2026-10-14', schoolDaysBetween });
ok('on-track finds the current quarter', t.currentLabel === 'Q1');
ok('on-track flags the subject far behind', t.rows.find((r) => r.subject === 'a')?.word === 'behind');
ok('on-track does not flag the subject that is ahead', t.rows.find((r) => r.subject === 'b')?.word !== 'behind');
ok('on-track sorts the most behind subject first', t.rows[0].subject === 'a');
ok('one subject behind reads as watch, not behind', t.overall === 'watch', t.overall);
const early = onTrackForYear({ yearPlan: [{ ...plan[0], bySubject: {}, daysLogged: 0 }], today: '2026-08-04', schoolDaysBetween });
ok('the first days of a quarter read as too early, not behind', early.overall === 'not-started', early.overall);
const empty = onTrackForYear({});
ok('no plan never throws and says too early', empty.overall === 'not-started');

const st = onTrackForYear({ yearPlan: plan, today: '2026-10-14', schoolDaysBetween, started: { a: 5 } });
ok('started-but-not-mastered is counted per subject', st.rows.find((r) => r.subject === 'a').startedNotMastered === 3);
ok('the focus item tells you to finish started lessons', nextWeekFocus({ onTrack: st, today: '2026-10-14' }).some((x) => /started but not mastered/.test(x.why)));

const ov = onTrackForYear({ yearPlan: plan, today: '2026-10-14', schoolDaysBetween,
  pace: { a: { days: 26, needs: 71, state: 'over', daysSoFar: 20 }, b: { days: 11, needs: 11, state: 'tight', daysSoFar: 9 } } });
ok('an over-scheduled subject is overloaded, not behind', ov.rows.find((r) => r.subject === 'a').word === 'overloaded' && ov.behindSubjects.length === 0);
ok('overloaded subjects get their own focus item with the day counts', nextWeekFocus({ onTrack: ov, today: '2026-10-14' }).some((x) => x.id === 'over-a' && /71/.test(x.why) && /26/.test(x.why)));
ok('expected uses owned days, not calendar days', ov.rows.find((r) => r.subject === 'b').expected === Math.round(20 * 9 / 11 * 10) / 10);

// --- next week --------------------------------------------------------------
const f = nextWeekFocus({
  onTrack: t,
  assignments: [{ dueDate: '2026-10-02', status: 'in-progress' }, { dueDate: '2026-10-05', status: 'completed' }],
  momentum: [{ subject: 'b', change: -3, prior: 5, recent: 2 }],
  reading: { sessions: 0 },
  wellness: { daysLogged: 0, workouts: 10 },
  today: '2026-10-14', labelFor: (s) => s.toUpperCase()
});
ok('late work ranks first', f[0].id === 'late' && /1 late assignment\b/.test(f[0].title), JSON.stringify(f[0]));
ok('completed work is not counted late', !/2 late/.test(f[0].title));
ok('a behind subject becomes an item with its numbers', f.some((x) => x.id === 'pace-a' && /2 of 20/.test(x.why)));
ok('a slowing subject becomes an item', f.some((x) => x.id === 'slip-b'));
ok('empty reading log points at the reading log', f.find((x) => x.id === 'reading')?.go === 'reading-log');
ok('missing daily log points at PE & Nutrition', f.find((x) => x.id === 'daily-log')?.go === 'pe-fitness-nutrition');
ok('focus is capped at five', nextWeekFocus({ onTrack: t, assignments: Array.from({ length: 30 }, () => ({ dueDate: '2026-01-01' })), momentum: [], reading: { sessions: 0 }, wellness: { daysLogged: 0, workouts: 0 }, today: '2026-10-14' }).length <= 5);
const calm = nextWeekFocus({ onTrack: { behindSubjects: [] }, today: '2026-10-14' });
ok('nothing wrong gives one steady item, not an empty list', calm.length === 1 && calm[0].id === 'steady');

// --- learning style ---------------------------------------------------------
ok('no answer is reported as unanswered', learningStyleView({ profile: {} }).answered === false);
const s = learningStyleView({
  profile: { learning: { answers: { worksBest: ['Hands-on building'], attention: '20 to 30 minutes' } } },
  momentum: [{ subject: 'b', change: 4 }, { subject: 'a', change: -1 }]
});
ok('a saved answer is read back', s.answered && s.worksBest[0] === 'Hands-on building' && s.attention === '20 to 30 minutes');
ok('only subjects speeding up are listed', s.speedingUp.length === 1 && s.speedingUp[0] === 'b');

// --- wiring -----------------------------------------------------------------
const sec = read('src/components/Dashboard/LearningAnalyticsSection.jsx');
const dash = read('src/components/Dashboard/ParentDashboard.jsx');
ok('the old "can\'t tell you" list is gone', !/UNANSWERED_QUESTIONS/.test(sec) && !/UNANSWERED_QUESTIONS/.test(read('src/lib/learningAnalytics.js')));
ok('the section shows the four answers', ['on track for the year', 'focus on next week', 'learning style', 'take him the longest'].every((w) => sec.toLowerCase().includes(w)));
ok('the learning-style button opens Setup Questions', /onGoTo\('learner-profile'\)/.test(sec));
ok('the dashboard passes a way to navigate', /<LearningAnalyticsSection[\s\S]{0,80}onGoTo=/.test(dash));
ok('empty reading and wellness cards have an Open button', /onGoTo\('reading-log'\)/.test(sec) && /onGoTo\('pe-fitness-nutrition'\)/.test(sec));
ok('the analytics lib names no learner or school', !/Lamar|Mission Control|Academy/.test(read('src/lib/analyticsAnswers.js')));

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
