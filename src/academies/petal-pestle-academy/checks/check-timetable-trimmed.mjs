// Nov 1: no break after Maths, no Journal & Quiet Reading block, no gaps, and the promised minutes match.
// Run: node checks/check-timetable-trimmed.mjs        (self-test: --self-test)
import { readFileSync, cpSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
const here = dirname(fileURLToPath(import.meta.url));
const arg = process.argv.find((a) => a.startsWith('--root='));
const root = arg ? arg.slice(7) : join(here, '..');
if (process.argv.includes('--self-test')) {
  const bugs = {
    'break after Maths put back': (s) => s.replace("id: 'blk-reading',", "id: 'blk-break1', label: 'Snack & Move', start: '10:15', minutes: 20, kind: 'break' },\n  { id: 'blk-reading',"),
    'journal block put back': (s) => s.replace("id: 'blk-doing',", "id: 'blk-journal', subject: 'journal', label: 'Journal', start: '15:05', minutes: 30, kind: 'open' },\n  { id: 'blk-doing',"),
    'gap after Maths': (s) => s.replace("start: '10:15',\n    minutes: 60", "start: '10:35',\n    minutes: 60"),
    'promised minutes stale': (s) => s.replace('PROMISED_INSTRUCTIONAL_MINUTES = 345', 'PROMISED_INSTRUCTIONAL_MINUTES = 315')
  };
  const rotBug = (s) => s.replace("2: 'social',", "2: 'body',");
  rotBug.file = 'lib/rotatingBlock.js';
  bugs['Tuesday goes back to Human Body in the Social slot'] = rotBug;
  const noBody = (s) => s.replace("id: 'blk-body',", "id: 'blk-bodyX',");
  noBody.file = 'config/schedule.js';
  bugs['Human Body block lost'] = noBody;
  let ok = true;
  for (const [name, f] of Object.entries(bugs)) {
    const d = mkdtempSync(join(tmpdir(), 'tt-')); cpSync(join(here, '..'), d, { recursive: true });
    const p = join(d, bugs[name].file || 'config/schedule.js'); const a = readFileSync(p, 'utf8'); const b = f(a);
    if (a === b) { console.log('CANNOT apply:', name); ok = false; continue; }
    writeFileSync(p, b);
    const r = spawnSync('node', [join(d, 'checks/check-timetable-trimmed.mjs'), '--root=' + d], { encoding: 'utf8' });
    console.log((r.status !== 0 ? 'caught   ' : 'MISSED   ') + name); if (r.status === 0) ok = false;
  }
  process.exit(ok ? 0 : 1);
}
const m = await import(pathToFileURL(join(root, 'config/schedule.js')).href + '?t=' + Date.now());
const blocks = [...m.DEFAULT_SCHEDULE].sort((a, b) => m.toMinutes(a.start) - m.toMinutes(b.start));
const fails = [];
if (blocks.some((b) => b.id === 'blk-break1')) fails.push('the break after Maths is back');
if (blocks.some((b) => b.id === 'blk-journal' || b.subject === 'journal')) fails.push('the Journal & Quiet Reading block is back');
for (let i = 1; i < blocks.length; i++) {
  const prevEnd = m.toMinutes(blocks[i - 1].start) + blocks[i - 1].minutes;
  const st = m.toMinutes(blocks[i].start);
  if (st !== prevEnd) fails.push(`${blocks[i - 1].id} ends ${prevEnd} but ${blocks[i].id} starts ${st}`);
}
const soc = blocks.find((b) => b.id === 'blk-social');
const body = blocks.find((b) => b.id === 'blk-body');
if (!soc || soc.minutes !== 30) fails.push('Social Studies is not a 30-minute block');
if (!body || body.minutes !== 30 || body.subject !== 'body') fails.push('The Human Body is not its own 30-minute block');
const rot = await import(pathToFileURL(join(root, 'lib/rotatingBlock.js')).href + '?t=' + Date.now());
for (const d of [1, 2, 3, 4]) if (rot.BLOCK_ROTATION['blk-social']?.[d] !== 'social') fails.push('Social Studies is not taught on weekday ' + d);
if (rot.BLOCK_ROTATION['blk-social']?.[5]) fails.push('a lesson is scheduled on Friday');
const total = m.instructionalMinutes(m.DEFAULT_SCHEDULE);
if (total !== m.PROMISED_INSTRUCTIONAL_MINUTES) fails.push(`day teaches ${total} min, promise says ${m.PROMISED_INSTRUCTIONAL_MINUTES}`);
if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('PASS: 2 breaks removed, both subjects Mon-Thu, no gaps, ' + total + ' instructional minutes.\nNOT TESTED HERE: how Today looks, or her bell on the Chromebook.');
