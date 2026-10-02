// Pull one week's game data out of Azianna's backup + the app's question banks.
// usage: node extract_gamedata.mjs <backup.json> <out.json>
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const A = path.join(ROOT, 'src/academies/petal-pestle-academy');
const { WEEKS } = await import(pathToFileURL(path.join(A, 'config/assessment.js')));
const { ALL_BANK_ITEMS } = await import(pathToFileURL(path.join(A, 'data/assessments/appBank.js')));
const b = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const read = new Set(b.lessonReads.map((l) => l.lessonId));
const byLesson = {};
for (const q of ALL_BANK_ITEMS) (byLesson[q.lesson] ||= []).push(q);
const events = b.itemEvents || [];
const tally = {};
for (const e of events) {
  const t = (tally[e.questionId] ||= { seen: 0, wrong: 0 });
  t.seen++; if (!e.correct) t.wrong++;
}
const byId = Object.fromEntries(ALL_BANK_ITEMS.map((q) => [q.id, q]));
const missed = Object.entries(tally).filter(([id, t]) => t.wrong > 0 && byId[id])
  .map(([id, t]) => ({ ...byId[id], wrong: t.wrong, seen: t.seen }))
  .sort((x, y) => y.wrong - x.wrong || x.id.localeCompare(y.id));
const out = { courses: {}, missed, weekReport: {} };
for (const course of ['herbalism', 'sciencelab', 'social', 'humanbody']) {
  const weeks = WEEKS[course].filter((w) => w.lessons.length >= 1);
  const status = weeks.map((w) => ({ id: w.id, n: w.n, title: w.title, read: w.lessons.filter((l) => read.has(l)).length, of: w.lessons.length }));
  out.weekReport[course] = status;
    // she is "in" the first week that is started but not finished; if none, the latest week she has finished
  let idx = weeks.findIndex((w) => w.lessons.some((l) => read.has(l)) && !w.lessons.every((l) => read.has(l)));
  if (idx < 0) weeks.forEach((w, i) => { if (w.lessons.every((l) => read.has(l))) idx = i; });
  const w = weeks[idx];
  const earlier = weeks.slice(0, idx).flatMap((x) => x.lessons.flatMap((l) => byLesson[l] || []));
  out.courses[course] = {
    week: w.id, title: w.title, n: w.n,
    lessons: w.lessons.map((l) => ({ id: l, title: (byLesson[l]?.[0]?.lessonTitle) || l, read: read.has(l), items: byLesson[l] || [] })),
    earlierItems: earlier
  };
}
fs.writeFileSync(process.argv[3], JSON.stringify(out));
for (const c of Object.keys(out.courses)) {
  const v = out.courses[c];
  console.log(c, v.week, v.lessons.map((l) => `${l.id}:${l.read ? 'read' : 'unread'}:${l.items.length}q`).join(' '), 'earlier', v.earlierItems.length);
}
console.log('missed', missed.length);
