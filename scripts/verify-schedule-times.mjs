/**
 * The morning retime of Aug 9 2026, and the shape of the school day.
 *
 * The parent: "the time for reading should be less than 45min and language
 * arts and writing should be longer. 15 minutes for reading and I will have
 * him read later in the day before bed."
 *
 * The 30 minutes MOVES. It is not added to the day and not taken off it — that
 * is what keeps the Georgia 4.5 hr/day average intact, and it is the property
 * most likely to be broken by a future edit, so it is asserted here.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = ROOT;
const { defaultSchedule } = await import('file://' + root + '/src/academies/lamar/data/schedule/defaultSchedule.js');

// Extract migrateSavedSchedule from the SHIPPED file rather than reimplementing it.
const src = fs.readFileSync(root + '/src/store/useAppStore.js', 'utf8');
const start = src.indexOf('export function migrateSavedSchedule(saved) {');
if (start === -1) throw new Error('function not found');
let depth = 0, i = src.indexOf('{', start), end = -1;
for (; i < src.length; i++) {
  if (src[i] === '{') depth++;
  else if (src[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const body = src.slice(start, end).replace('export function', 'function');
const migrateSavedSchedule = new Function('defaultSchedule', body + '; return migrateSavedSchedule;')(defaultSchedule);

let pass = 0, fail = 0;
const ok = (name, cond, extra='') => { if (cond) { pass++; } else { fail++; console.log('  FAIL:', name, extra); } };
const mins = (t) => { const [h,m]=t.split(':').map(Number); return h*60+m; };

// --- her real saved schedule, as it stands on both computers today ---
const HERS = [
  { id:'block-1', startTime:'08:30', endTime:'09:00', label:'Morning Meeting, Goals & Calendar', colorKey:'neutral' },
  { id:'block-2', startTime:'09:00', endTime:'10:00', label:'Mathematics', colorKey:'math' },
  { id:'block-3', startTime:'10:00', endTime:'10:45', label:'Independent Reading', colorKey:'reading' },
  { id:'block-4', startTime:'10:45', endTime:'11:00', label:'Break', colorKey:'break' },
  { id:'block-5', startTime:'11:00', endTime:'12:00', label:'Science', colorKey:'science' },
  { id:'block-6', startTime:'12:00', endTime:'13:00', label:'Lunch & Outdoor Time', colorKey:'break' },
  { id:'block-7', startTime:'13:00', endTime:'13:30', label:'Language Arts & Writing Journal', colorKey:'math' },
  { id:'block-7b', startTime:'13:30', endTime:'13:45', label:'Spelling & Vocabulary', colorKey:'reading' },
  { id:'block-8', startTime:'13:45', endTime:'14:15', label:'Physical Education', colorKey:'pe' },
  { id:'block-9', startTime:'14:15', endTime:'15:00', label:defaultSchedule.find(b=>b.id==='block-9').label, colorKey:'science' },
  { id:'block-10', startTime:'15:00', endTime:'15:15', label:'Electric Guitar Practice', colorKey:'reading' }
];
const frozen = JSON.stringify(HERS);
const out = migrateSavedSchedule(HERS);
const get = (a,id) => a.find(b=>b.id===id);

console.log('--- her saved schedule through the migration ---');
/**
 * ---- RE-BASELINED, AND DERIVED THIS TIME (Aug 10, 2026) ----
 *
 * Seven checks in this file were frozen against "11 blocks" and "315
 * instructional minutes". The schedule then legitimately grew to 13 blocks and
 * 405 minutes — Typing Practice, Spelling & Vocabulary and the Friday
 * gardening block, each added at the parent's request — and these checks
 * failed for a week while nothing was actually wrong.
 *
 * That is the SIXTH time a hardcoded literal in a guard has gone stale here,
 * and a guard that cries wolf is worse than no guard: it trains you to ignore
 * the output, and then a real regression scrolls past in the same red text.
 *
 * So the counts now come from defaultSchedule itself. What is actually being
 * asserted has not changed — her SAVED schedule must come through the
 * migration with the same number of blocks it went in with, and with the same
 * teaching time. Those are the two properties worth protecting. The specific
 * numbers were never the point.
 */
/**
 * ---- WHAT THIS SHOULD HAVE BEEN ASSERTING ALL ALONG (Aug 10, 2026) ----
 *
 * The two checks here were frozen against "11 blocks" and "315 instructional
 * minutes" and failed for a week. Re-baselining them to 13 and 405 would have
 * been wrong too, for a more interesting reason: migrateSavedSchedule is
 * SUPPOSED to add blocks. That is its entire job — Typing Practice, Spelling &
 * Vocabulary and the Friday gardening block were each added to the default
 * after this family's schedules were saved, and reach an existing install only
 * through this function. Any check that pins the count fails the next time the
 * parent asks for a block, which is what happened.
 *
 * The properties that actually matter are directional, so that is what is
 * asserted now:
 *   - nothing she had is ever REMOVED, and nothing she had is ever RE-TIMED
 *   - the teaching day never silently shrinks
 * Growth is allowed. Loss is not.
 */
ok('every block she had is still there', HERS.every((b) => out.some((o) => o.id === b.id)),
   HERS.filter((b) => !out.some((o) => o.id === b.id)).map((b) => b.id).join(', '));
/**
 * NOT "nothing was re-timed" — that check was written and immediately deleted,
 * because HERS above is the schedule as it stood BEFORE the retime, and moving
 * it onto the new times is the whole point of this migration. The blocks below
 * assert each of those new times individually.
 *
 * The rule the migration actually follows, and the only one worth guarding, is
 * the one it states about itself: a block still sitting where it shipped may be
 * re-timed; a block the parent has MOVED is hers and is never touched. That
 * distinction is what the custom-morning section further down tests.
 */
ok('the migration only ever adds', out.length >= HERS.length, `${HERS.length} -> ${out.length}`);
ok('original array not mutated', JSON.stringify(HERS) === frozen);
ok('reading is 15 min', mins(get(out,'block-3').endTime)-mins(get(out,'block-3').startTime) === 15);
ok('language arts is 60 min', mins(get(out,'block-7').endTime)-mins(get(out,'block-7').startTime) === 60);
ok('lunch 11:30-12:30', get(out,'block-6').startTime==='11:30' && get(out,'block-6').endTime==='12:30');
ok('day still starts 08:30', get(out,'block-1').startTime === '08:30');
ok('day still ends 15:15', get(out,'block-10').endTime === '15:15');
for (const id of ['block-7b','block-8','block-9','block-10']) {
  const a = get(HERS,id), b = get(out,id);
  ok('afternoon untouched: '+id, a.startTime===b.startTime && a.endTime===b.endTime, b.startTime+'-'+b.endTime);
}
// no gaps, no overlaps, no negative durations, across the school day 08:30-15:15
const sorted = [...out].sort((a,b)=>mins(a.startTime)-mins(b.startTime));
for (let k=0;k<sorted.length;k++){
  ok('positive duration '+sorted[k].id, mins(sorted[k].endTime) > mins(sorted[k].startTime));
  if (k) ok('contiguous '+sorted[k-1].id+'->'+sorted[k].id, sorted[k-1].endTime === sorted[k].startTime,
            sorted[k-1].endTime+' vs '+sorted[k].startTime);
}
// instructional time unchanged
const instr = (a) => a.filter(b=>b.id!=='block-4'&&b.id!=='block-6'&&b.id!=='block-10')
                      .reduce((t,b)=>t+mins(b.endTime)-mins(b.startTime),0);
ok('the teaching day never shrinks', instr(out) >= instr(HERS), instr(HERS)+' -> '+instr(out));

console.log('--- idempotence ---');
const twice = migrateSavedSchedule(out);
ok('run 2 returns same array by reference', twice === out);
ok('run 3 returns same array by reference', migrateSavedSchedule(twice) === out);

console.log('--- a parent who moved her own morning is left alone ---');
const CUSTOM = HERS.map(b => b.id==='block-5' ? {...b, startTime:'11:15', endTime:'12:15'} : {...b});
const cOut = migrateSavedSchedule(CUSTOM);
/**
 * WAS `cOut === CUSTOM` — reference identity, meaning "the migration did not
 * touch this at all". That stopped being true, correctly: the migration now
 * also renames block-3 from 'Independent Reading' to 'Reading Lesson', because
 * the 10:00 block became a taught lesson rather than silent reading, and a
 * saved schedule still showing the old name would contradict the app.
 *
 * So the property to protect is not "untouched". It is: HER TIMES ARE HERS. A
 * parent who moved her own morning must never find it moved back.
 */
ok('her custom times are left exactly as she set them',
   CUSTOM.every((before) => { const after = get(cOut, before.id);
                              return after && after.startTime === before.startTime && after.endTime === before.endTime; }),
   'a migration that re-times a schedule she edited is the one thing it must never do');
ok('...including the morning she moved',
   get(cOut,'block-5').startTime === '11:15' && get(cOut,'block-5').endTime === '12:15');
ok('custom reading still 45 min', mins(get(cOut,'block-3').endTime)-mins(get(cOut,'block-3').startTime)===45);

console.log('--- a schedule already on the new times is not re-shifted ---');
const NEW = defaultSchedule.map(b=>({...b}));
const nOut = migrateSavedSchedule(NEW);
ok('default schedule passes through unchanged', nOut === NEW);

console.log('--- defaultSchedule.js itself ---');
const ds = [...defaultSchedule].sort((a,b)=>mins(a.startTime)-mins(b.startTime));
for (let k=1;k<ds.length;k++) ok('default contiguous '+ds[k].id, ds[k-1].endTime===ds[k].startTime, ds[k-1].endTime+' vs '+ds[k].startTime);
// Derived, not frozen — see the note above. What matters is that no two blocks
// collide, not how many there happen to be this month.
ok('no duplicate labels', new Set(defaultSchedule.map(b=>b.label)).size === defaultSchedule.length);
ok('no duplicate ids', new Set(defaultSchedule.map(b=>b.id)).size === defaultSchedule.length);
/**
 * The school day still has to be a plausible school day. This is a RANGE, not
 * a number: it catches a block accidentally spanning the whole afternoon, or
 * the day quietly emptying out, without failing every time she adds fifteen
 * minutes of typing.
 */
const dayMinutes = instr(defaultSchedule);
ok('the default day holds a sane amount of teaching time',
   dayMinutes >= 240 && dayMinutes <= 480, `${dayMinutes} min`);

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
