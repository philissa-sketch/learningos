// ---------------------------------------------------------------------------
// SEE ONE ACADEMY, RENDERED, WITHOUT BUILDING THE APP.
//
//   node scripts/preview-academy.mjs <academy-folder> [out.html]
//
// ---- WHY ----
//
// `npm run build` cannot run in every environment this repository is worked in,
// and a deployed site carries every Academy at once. Neither answers the plain
// question "what does THIS Academy look like, on its own?"
//
// So this reads one Academy's manifest — its palette, its subjects, its
// timetable, its guide, one real lesson — and writes a single self-contained
// page showing them. It imports exactly one folder. No other Academy is loaded,
// compared to, or mentioned.
//
// ---- WHAT IT IS NOT ----
//
// It is not the app. It does not run the store, the database, or the real
// LessonEngine — it walks the same phase order the engine walks and renders the
// same fields, so what you see is this Academy's CONTENT in this Academy's
// COLOURS. A layout difference here is this file's fault, not the school's.
// Judge the content and the palette by it; judge the app by the app.
// ---------------------------------------------------------------------------
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2];
const outArg = process.argv[3];

if (!name) {
  console.error('usage: node scripts/preview-academy.mjs <academy-folder> [out.html]');
  process.exit(1);
}

const folder = path.join(REPO, 'src/academies', name);
if (!fs.existsSync(folder)) {
  console.error(`No such Academy folder: src/academies/${name}`);
  process.exit(1);
}

const m = await import(pathToFileURL(path.join(folder, 'content.js')).href);

// ---- the palette, read out of this Academy's own stylesheet ---------------
const cssPath = path.join(folder, 'academy.css');
const sheet = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf8') : '';
const varOf = (n, fallback) => {
  const hit = sheet.match(new RegExp(`--${n}:\\s*([^;]+);`));
  return hit ? hit[1].trim() : fallback;
};
const rgb = (n, fb) => `rgb(${varOf(n, fb)})`;
const bodyBg = (sheet.match(/body\s*\{[\s\S]*?background:\s*([\s\S]*?);/) || [])[1] || '';

const palette = {
  page: rgb('space-950', '16 18 22'),
  panel: rgb('space-900', '24 27 33'),
  raised: rgb('space-800', '35 39 47'),
  line: rgb('space-700', '51 57 68'),
  hair: rgb('space-600', '74 82 96'),
  accent: rgb('accent', '125 145 170'),
  ink: rgb('ink-100', '232 236 244'),
  ink3: rgb('ink-300', '174 184 204'),
  ink5: rgb('ink-500', '124 135 152')
};

// ---- what the nav would show, from the slots this Academy fills -----------
const TABS = [
  ['Morning Meeting', null], ['Mission Control', null], ['Lesson Roster', null],
  ['PE & Nutrition', 'pe'], ['Garden', 'electives'], ['Guitar', 'electives'],
  ['Writing Journal', 'writing'], ['Typing', 'writing'], ['Games', 'games'],
  ['Rewards', 'rewards'], ['Progress', null], ['Schedule', null],
  ['Academic Center', 'academicCenter']
];
const shownTabs = TABS.filter(([, needs]) => !needs || m[needs]);
const hiddenTabs = TABS.filter(([, needs]) => needs && !m[needs]);

// ---- one real lesson, walked ---------------------------------------------
const lessons = m.lessons?.allLessons || [];
const lesson = lessons.find((l) => l.checkIn && l.activity && l.ledger) || lessons[0];
const beats = lesson?.novaIntro?.beats || [];

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/*
  LOCAL, NEVER UTC. `toISOString()` on a local Date rolls the day backwards
  west of Greenwich, so an evening run asks the guide and the timetable about
  tomorrow — or about a weekend that has not started. The repository already
  paid for this once: it turned a check red every night after 8pm, and
  scripts/verify-local-dates.mjs exists to stop it coming back. It caught this
  file the first time it ran.
*/
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const stamp = `${today} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
const guideLine = m.guide?.getDailyLine?.(today);
const dayPattern = m.timetable?.dayPattern?.(today);
const subjectsToday = m.timetable?.subjectsForDay?.(today) || [];
const labels = m.subjects?.SUBJECT_LABELS || {};

const card = (title, body) => `
  <section class="card">
    <p class="kicker">${esc(title)}</p>
    ${body}
  </section>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(name)} — rendered</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0 0 64px;
    font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    color: ${palette.ink};
    background: ${bodyBg.trim() || palette.page};
  }
  header {
    position: sticky; top: 0; z-index: 5;
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
    padding: 14px 20px; border-bottom: 1px solid ${palette.line};
    background: ${palette.panel};
  }
  .brand { font-weight: 700; letter-spacing: .02em; color: ${palette.accent}; font-size: 18px; }
  .brand-sub { color: ${palette.ink5}; font-size: 13px; }
  nav { display: flex; gap: 6px; flex-wrap: wrap; margin-left: auto; }
  nav span {
    font-size: 13px; padding: 4px 10px; border-radius: 6px;
    background: ${palette.raised}; color: ${palette.ink3};
  }
  main { max-width: 780px; margin: 0 auto; padding: 24px 20px; }
  .card {
    border: 1px solid ${palette.line}; background: ${palette.panel};
    border-radius: 14px; padding: 20px; margin-bottom: 16px;
  }
  .kicker {
    margin: 0 0 10px; font-size: 11px; letter-spacing: .16em; text-transform: uppercase;
    color: ${palette.accent}; font-weight: 700;
  }
  h1 { font-size: 26px; margin: 4px 0 18px; }
  h2 { font-size: 18px; margin: 0 0 8px; }
  .muted { color: ${palette.ink3}; }
  .dim { color: ${palette.ink5}; font-size: 13px; }
  .pill {
    display: inline-block; font-size: 12px; padding: 3px 9px; border-radius: 999px;
    border: 1px solid ${palette.hair}; color: ${palette.ink3}; margin: 0 6px 6px 0;
  }
  .inset {
    border: 1px solid ${palette.hair}; border-radius: 10px;
    background: ${palette.raised}; padding: 12px; margin-top: 12px;
  }
  ol, ul { margin: 8px 0 0; padding-left: 20px; }
  li { margin: 4px 0; }
  .phase { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: ${palette.ink5}; }
  .safety { border-color: #c05; }
  .chip-off { opacity: .35; text-decoration: line-through; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 8px; }
  td { padding: 5px 0; border-bottom: 1px solid ${palette.line}; vertical-align: top; }
  td:first-child { color: ${palette.ink5}; width: 40%; }
  footer { max-width: 780px; margin: 0 auto; padding: 0 20px; }
</style></head>
<body>

<header>
  <span class="brand">${esc(name)}</span>
  <span class="brand-sub">LearningOS</span>
  <nav>${shownTabs.map(([t]) => `<span>${esc(t)}</span>`).join('')}</nav>
</header>

<main>
  <h1>What this Academy renders, on its own</h1>
  <p class="dim">Built from <code>src/academies/${esc(name)}/</code> and nothing else.</p>

  ${card('The guide, today', `
    <p style="font-size:17px;margin:0">${esc(guideLine?.text || guideLine || '—')}</p>
    ${guideLine?.who ? `<p class="dim" style="margin:6px 0 0">— ${esc(guideLine.who)}</p>` : ''}`)}

  ${card('Subjects', `
    ${(m.subjects?.ACTIVE_SUBJECTS || []).map((s) => `<span class="pill">${esc(labels[s] || s)}</span>`).join('')}
    <p class="dim" style="margin-top:10px">
      Taught here: ${(m.subjects?.LESSON_TRACK_SUBJECTS || []).length} ·
      Placed by check-in: ${(m.subjects?.KHAN_TAUGHT_SUBJECTS || []).length}
    </p>`)}

  ${card('Today', `
    <table>
      <tr><td>Kind of day</td><td>${esc(dayPattern?.kind || '—')}${dayPattern?.label ? ` · ${esc(dayPattern.label)}` : ''}</td></tr>
      <tr><td>Subjects today</td><td>${subjectsToday.map((s) => esc(labels[s] || s)).join(', ') || '—'}</td></tr>
      <tr><td>Blocks in the day</td><td>${(m.timetable?.defaultSchedule || []).length}</td></tr>
    </table>
    <div class="inset">
      ${(m.timetable?.defaultSchedule || []).slice(0, 8).map((b) =>
        `<div style="display:flex;gap:10px;font-size:14px;padding:3px 0">
           <span class="dim" style="width:56px">${esc(b.start || '')}</span>
           <span>${esc(b.icon || '')} ${esc(b.label || b.subject || '')}</span>
           <span class="dim" style="margin-left:auto">${esc(b.minutes || '')}m</span>
         </div>`).join('')}
    </div>`)}

  ${card('Tabs this Academy does not get', `
    <p class="dim" style="margin:0 0 8px">A slot it leaves blank means the screen never renders.</p>
    ${hiddenTabs.map(([t, needs]) => `<span class="pill chip-off">${esc(t)} · ${esc(needs)}</span>`).join('') || '<span class="dim">none</span>'}`)}

  <h1 style="margin-top:36px">One lesson, in the order the engine walks it</h1>
  <p class="dim">${esc(lesson?.id || '')} · ${esc(lesson?.title || '')} · ${esc(lesson?.minutes || '?')} minutes</p>

  ${lesson?.checkIn ? card('Phase 1 · Check-in', `
    <h2>${esc(lesson.checkIn.title || '')}</h2>
    <p class="muted">${esc(lesson.checkIn.text || '')}</p>
    ${lesson.checkIn.question ? `<div class="inset"><p class="phase">Think about it</p><p style="margin:6px 0 0">${esc(lesson.checkIn.question)}</p></div>` : ''}`) : ''}

  ${beats.map((b, i) => card(`Phase ${i + 2} · Teach — beat ${i + 1} of ${beats.length}`, `
    ${b.hook ? `<div class="inset" style="margin:0 0 12px"><p class="phase">Did you know?</p><p style="margin:6px 0 0">${esc(b.hook)}</p></div>` : ''}
    <h2>${esc(b.label || '')}</h2>
    <p class="muted">${esc(b.teachingText || '')}</p>
    ${b.example ? `<div class="inset"><p class="phase">Worked example</p><p style="margin:6px 0 0">${esc(b.example)}</p></div>` : ''}
    ${b.applyItQuestion ? `
      <div class="inset">
        <p class="phase">Try it</p>
        <p style="margin:6px 0 8px"><strong>${esc(b.applyItQuestion.prompt || '')}</strong></p>
        <ol>${(b.applyItQuestion.choices || []).map((c, ci) =>
          `<li${ci === b.applyItQuestion.answer ? ` style="color:${palette.accent};font-weight:600"` : ''}>${esc(c)}</li>`).join('')}</ol>
        ${b.applyItQuestion.why ? `<p class="dim" style="margin-top:8px">${esc(b.applyItQuestion.why)}</p>` : ''}
      </div>` : '<p class="dim" style="margin-top:10px">No drill on this beat — it teaches, applies, and moves on.</p>'}`)).join('')}

  ${lesson?.activity ? card(`Phase ${beats.length + 2} · Activity — away from the screen`, `
    <h2>${esc(lesson.activity.title || '')}</h2>
    ${lesson.activity.minutes ? `<p class="dim">about ${esc(lesson.activity.minutes)} minutes</p>` : ''}
    ${lesson.activity.prep ? `<div class="inset"><p class="phase">Get ready first</p><p style="margin:6px 0 0">${esc(lesson.activity.prep)}</p></div>` : ''}
    ${lesson.activity.needs ? `<div class="inset"><p class="phase">What you need</p><ul>${lesson.activity.needs.map((n) => `<li>${esc(n)}</li>`).join('')}</ul></div>` : ''}
    ${lesson.activity.steps ? `<ol style="margin-top:14px">${lesson.activity.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>` : ''}
    ${lesson.activity.safety ? `<div class="inset safety"><p class="phase" style="color:#e46">Safety</p><p style="margin:6px 0 0">${esc(lesson.activity.safety)}</p></div>` : ''}`) : ''}

  ${lesson?.ledger ? card(`Phase ${beats.length + 3} · Ledger — what gets written down`, `
    ${lesson.ledger.tasks ? `<ul>${lesson.ledger.tasks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    ${lesson.ledger.game ? `<div class="inset">
      <h2>${esc(lesson.ledger.game.title || '')}</h2>
      ${lesson.ledger.game.cards ? `<p class="dim">${lesson.ledger.game.cards.map(esc).join(' · ')}</p>` : ''}
      ${lesson.ledger.game.rounds ? `<ol>${lesson.ledger.game.rounds.map((r) => `<li>${esc(r)}</li>`).join('')}</ol>` : ''}
      ${lesson.ledger.game.ifSheIsStuck ? `<p class="dim" style="margin-top:10px"><strong>If she is stuck ·</strong> ${esc(lesson.ledger.game.ifSheIsStuck)}</p>` : ''}
    </div>` : ''}
    ${lesson.ledger.note ? `<p class="dim" style="margin-top:12px"><em>${esc(lesson.ledger.note)}</em></p>` : ''}`) : ''}

  ${lesson?.practice?.length ? card(`Phase ${beats.length + 4} · Talk it through — never marked`, `
    ${lesson.practice.map((p) => `<div class="inset" style="margin-top:8px">
      <p style="margin:0"><strong>${esc(p.ask)}</strong></p>
      <p class="muted" style="margin:4px 0 0">${esc(p.answer || '')}</p>
      ${p.why ? `<p class="dim" style="margin:4px 0 0">${esc(p.why)}</p>` : ''}
    </div>`).join('')}`) : ''}

  ${lesson?.questions?.length ? card(`Phase ${beats.length + 5} · The check — this one is graded`, `
    ${lesson.questions.map((q, qi) => `<div class="inset" style="margin-top:8px">
      <p style="margin:0"><strong>${qi + 1}. ${esc(q.prompt)}</strong></p>
      <ol>${(q.choices || []).map((c, ci) =>
        `<li${ci === q.answer ? ` style="color:${palette.accent};font-weight:600"` : ''}>${esc(c)}</li>`).join('')}</ol>
    </div>`).join('')}`) : ''}

  ${lesson?.video ? card('The video on this lesson, and where it came from', `
    <table>
      <tr><td>Title</td><td>${esc(lesson.video.title || '')}</td></tr>
      <tr><td>Channel</td><td>${esc(lesson.video.channel || '')}</td></tr>
      <tr><td>Length</td><td>${esc(lesson.video.minutes || '?')} minutes</td></tr>
      <tr><td>Verified</td><td>${esc(lesson.video.verified || '—')}</td></tr>
      ${lesson.video.sourceGap ? `<tr><td>Open gap</td><td>${esc(lesson.video.sourceGap)}</td></tr>` : ''}
    </table>`) : ''}

  ${card('What else this Academy carries', `
    <table>
      <tr><td>Lessons</td><td>${lessons.length}</td></tr>
      <tr><td>Placement items</td><td>${(m.placement?.allItems || []).length}</td></tr>
      <tr><td>Assessment bank</td><td>${(m.exams?.ALL_BANK_ITEMS || []).length} questions</td></tr>
      <tr><td>Lessons carrying a verified video</td><td>${lessons.filter((l) => l.video?.verified).length}</td></tr>
      <tr><td>Lessons filing a Georgia standard</td><td>${lessons.filter((l) => Array.isArray(l.standards) && l.standards.length).length}</td></tr>
    </table>`)}
</main>

<footer>
  <p class="dim">
    Generated by scripts/preview-academy.mjs from src/academies/${esc(name)}/ ·
    ${esc(stamp)}
  </p>
</footer>
</body></html>`;

const out = outArg || path.join(REPO, `${name}-rendered.html`);
fs.writeFileSync(out, html);

console.log(`\n${name} — rendered from its own folder alone`);
console.log(`  lessons          ${lessons.length}`);
console.log(`  showing lesson   ${lesson?.id} · ${lesson?.title}`);
console.log(`  beats            ${beats.length}`);
console.log(`  tabs shown       ${shownTabs.length}`);
console.log(`  tabs hidden      ${hiddenTabs.length} (${hiddenTabs.map(([t]) => t).join(', ')})`);
console.log(`\nwrote ${path.relative(REPO, out)}\n`);
