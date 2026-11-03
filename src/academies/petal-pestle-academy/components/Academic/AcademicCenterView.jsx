// ---------------------------------------------------------------------------
// HER ACADEMIC CENTER (Sept 24 2026).
//
// Gigi: "I'd like there to be an Academic Center like Lamar's where it will
// have book reports, projects, etc." Research papers and Grown-Up Setup were
// asked for now as well.
//
// Six tabs: Book Reports · Projects · Research Papers · Book Library ·
// Portfolio · Grown-Up Setup. Dr. Marigold says what each tab is for (and says
// it out loud, like every message of hers). The rules are in
// lib/academicCenter.js; this file only shows them.
//
// `startTab` lets a button elsewhere open the right tab: Today's book report
// button opens Book Reports, never a list she has to search.
// ---------------------------------------------------------------------------

import { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { readProjectPhoto } from '../../db/db.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { ThisWeeksStep } from '../Journal/JournalView.jsx';
import { ParentGate } from '../../../../components/Dashboard/ParentGate.jsx';
import { BOOK_REPORT, RESEARCH_PAPER } from '../../data/writing/writingPieces.js';
import { PROJECTS } from '../../config/projects.js';
import {
  QUARTERS,
  RESEARCH_QUARTERS,
  RESEARCH_BOXES,
  bookReportStatus,
  projectBoard,
  canFinishProject,
  researchNow,
  researchSlot,
  canTickResearch,
  libraryShelf,
  portfolioItems,
  setupFrom
} from '../../lib/academicCenter.js';

export const ACADEMIC_TABS = [
  { id: 'reports', label: '📖 Book Reports', say: 'This is your book report. Do this week’s step, then tick it.' },
  { id: 'projects', label: '🌱 Projects', say: 'Your project for this module is at the top. Check you have what it needs before you start.' },
  { id: 'research', label: '🔎 Research Papers', say: 'A research paper answers one real question. You do it one step at a time.' },
  { id: 'library', label: '📚 Book Library', say: 'These are your books for the year.' },
  { id: 'portfolio', label: '🗂️ Portfolio', say: 'Everything you have finished lives here.' },
  { id: 'setup', label: '🔒 Grown-Up Setup', say: 'This part is for Gigi and Mom.' }
];

const primary = 'rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white hover:bg-sage-500 disabled:cursor-not-allowed disabled:opacity-40';
const STATE_WORDS = {
  'not-yet': 'Later this year',
  'this-quarter': 'This quarter',
  'in-progress': 'Started',
  finished: '✓ Finished',
  marked: '✓ Marked'
};

export function AcademicCenterView({ startTab = 'reports', onNavigate }) {
  const [tab, setTab] = useState(ACADEMIC_TABS.some((t) => t.id === startTab) ? startTab : 'reports');
  const current = ACADEMIC_TABS.find((t) => t.id === tab);
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="label-caps">🎓 Academic Center</p>
      <h1 className="mt-1 font-display text-3xl text-ink-900">Book reports, projects and papers</h1>
      <nav className="mt-4 flex flex-wrap gap-2">
        {ACADEMIC_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-700 ${tab === t.id ? 'bg-sage-700 text-white' : 'border border-cream-300 bg-white text-ink-700 hover:border-sage-500'}`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <div className="mt-4">
        <MarigoldMessage text={current.say} size="sm" />
      </div>
      <div className="mt-5">
        {tab === 'reports' && <BookReportsTab />}
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'research' && <ResearchTab />}
        {tab === 'library' && <LibraryTab />}
        {tab === 'portfolio' && <PortfolioTab />}
        {tab === 'setup' && (
          <ParentGate onExit={() => setTab('reports')}>
            <SetupTab />
          </ParentGate>
        )}
      </div>
      {onNavigate && (
        <button type="button" onClick={() => onNavigate('today')} className="mt-8 text-xs font-700 text-lavender-700">
          ← Back to my day
        </button>
      )}
    </main>
  );
}

function useHer() {
  const drafts = useAppStore((s) => s.writingDrafts);
  const lessonReads = useAppStore((s) => s.lessonReads);
  const marks = useAppStore((s) => s.writingMarks);
  const projectStatus = useAppStore((s) => s.projectStatus);
  const attempts = useAppStore((s) => s.attempts);
  const spellingResults = useAppStore((s) => s.spellingResults);
  return { drafts: drafts || {}, lessonsRead: Object.keys(lessonReads || {}), marks: marks || [], projectStatus: projectStatus || {}, attempts, spellingResults };
}

// ---------------------------------------------------------------------------

function BookReportsTab() {
  const her = useHer();
  return (
    <>
      <div className="-mt-10">
        <ThisWeeksStep />
      </div>
      <section className="mt-8">
        <h2 className="font-display text-lg text-ink-900">Your four book reports</h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {QUARTERS.map((q) => {
            const s = bookReportStatus(q, her);
            return (
              <div key={q} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
                <p className="text-sm font-700 text-ink-900">Quarter {q}</p>
                <p className="text-xs text-ink-700">{s.book ? `📖 ${s.book}` : 'Book not chosen yet'}</p>
                <p className="mt-1 text-xs text-ink-500">
                  {STATE_WORDS[s.state]}
                  {s.state === 'in-progress' ? ` · step ${s.stepsDone} of ${s.of}` : ''}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="mt-8">
        <h2 className="font-display text-lg text-ink-900">What a good book report has</h2>
        <ol className="mt-2 space-y-2">
          {BOOK_REPORT.frame.map((f) => (
            <li key={f.n} className="rounded-petal bg-cream-100 px-4 py-2 text-sm">
              <span className="font-700 text-ink-900">
                {f.n}. {f.heading}.
              </span>{' '}
              <span className="text-ink-700">{f.ask}</span>
            </li>
          ))}
        </ol>
        <h3 className="mt-5 font-display text-base text-ink-900">How it is marked</h3>
        <ul className="mt-2 space-y-1 text-sm text-ink-700">
          {BOOK_REPORT.rubric.map((r) => (
            <li key={r.row}>
              <span className="font-700 text-ink-900">{r.row}:</span> {r.l4}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------

/**
 * Shrinks whatever the camera/file picker hands over before it goes into
 * IndexedDB. A Chromebook or phone camera photo straight off the sensor can
 * be several MB; sixteen of those a year is still fine on-device, but there
 * is no reason to keep them full size when nobody ever needs to print one at
 * full resolution. 1280px on the long side, JPEG @ 0.72, is plenty to see
 * "did she actually do it."
 */
function compressImageFile(file, maxDim = 1280, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('That did not look like a photo.'));
    };
    img.src = url;
  });
}

/**
 * THE REAL PHOTO (Gigi, Nov 3 2026 — replaces the "I emailed my photo to
 * Gigi" checkbox). An actual take-or-choose-a-photo upload, stored on her
 * own Chromebook (db.js v3, projectPhotos — never in the daily backup file),
 * so she can open her project later and see it, not just remember she sent
 * it. canFinishProject still just reads row.photoSent, unchanged.
 */
function ProjectPhotoBox({ projectId, mine }) {
  const saveProjectPhoto = useAppStore((s) => s.saveProjectPhoto);
  const removeProjectPhoto = useAppStore((s) => s.removeProjectPhoto);
  const [photo, setPhoto] = useState(undefined); // undefined = loading, null = none
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    let live = true;
    setPhoto(undefined);
    readProjectPhoto(projectId).then((row) => {
      if (live) setPhoto(row?.dataUrl || null);
    });
    return () => {
      live = false;
    };
  }, [projectId]);

  async function onPick(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setErr('');
    setBusy(true);
    try {
      const dataUrl = await compressImageFile(file);
      await saveProjectPhoto(projectId, dataUrl);
      setPhoto(dataUrl);
    } catch {
      setErr('That photo could not be saved. Try again.');
    } finally {
      setBusy(false);
    }
  }

  async function onRemove() {
    setBusy(true);
    await removeProjectPhoto(projectId);
    setPhoto(null);
    setBusy(false);
  }

  return (
    <div>
      <p className="mt-3 font-700">📷 Your photo</p>
      {photo === undefined && <p className="text-xs text-ink-500">Loading…</p>}
      {photo && (
        <div className="mt-1.5">
          <img src={photo} alt="Your project" className="max-h-64 rounded-petal border-2 border-cream-200" />
          {mine && (
            <button type="button" disabled={busy} onClick={onRemove} className="mt-1.5 block text-xs text-ink-500 underline disabled:opacity-40">
              Remove this photo
            </button>
          )}
        </div>
      )}
      {photo === null && mine && (
        <label className="mt-1.5 inline-block rounded-full border border-lavender-500 bg-white px-4 py-1.5 text-xs font-700 text-lavender-700 hover:bg-lavender-300/25">
          {busy ? 'Saving…' : '📷 Take or choose a photo'}
          <input type="file" accept="image/*" capture="environment" disabled={busy} onChange={onPick} className="hidden" />
        </label>
      )}
      {photo === null && !mine && <p className="text-xs text-ink-500">No photo yet.</p>}
      {err && <p className="mt-1 text-xs text-clay-500">{err}</p>}
    </div>
  );
}

function ProjectsTab() {
  const her = useHer();
  const setProjectDone = useAppStore((s) => s.setProjectDone);
  const toggleProjectStep = useAppStore((s) => s.toggleProjectStep);
  const toggleMonitorCheckIn = useAppStore((s) => s.toggleMonitorCheckIn);
  const saveProjectWriteup = useAppStore((s) => s.saveProjectWriteup);
  const board = projectBoard(her);
  const [openId, setOpenId] = useState(board[0]?.id || null);
  const [said, setSaid] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const WORDS = {
    now: 'Your project now',
    watching: 'Watching now',
    next: 'Next, when this one is finished',
    earlier: 'From an earlier module',
    later: 'Later',
    done: '✓ Done',
    'set-aside': 'Set aside by a grown-up'
  };
  return (
    <div className="space-y-3">
      {said && <p className="rounded-petal bg-gold-300/25 px-3.5 py-2.5 text-sm text-ink-900">{said}</p>}
      {board.map((p) => {
        const open = openId === p.id;
        const row = her.projectStatus?.[p.id] || {};
        const have = new Set(row.stepsDone || []);
        const checkIns = new Set(row.checkIns || []);
        const isMonitor = p.kind === 'monitor';
        const canFinish = canFinishProject(p, row);
        const mine = p.state !== 'set-aside' && p.state !== 'done';
        return (
          <div key={p.id} className={`rounded-petal border-2 px-4 py-3 ${p.state === 'now' ? 'border-sage-500 bg-sage-300/10' : p.state === 'watching' ? 'border-lavender-500 bg-lavender-300/15' : 'border-cream-300 bg-white'}`}>
            <button type="button" onClick={() => setOpenId(open ? null : p.id)} className="flex w-full items-baseline justify-between gap-2 text-left">
              <span className="font-display text-base text-ink-900">
                {isMonitor ? '🔎 ' : ''}
                {p.title} <span className="text-xs text-ink-500">· Module {p.module}</span>
              </span>
              <span className="text-xs font-700 text-ink-700">{WORDS[p.state]}</span>
            </button>
            {open && (
              <div className="mt-2 text-sm text-ink-900">
                <p>{p.what}</p>
                <p className="mt-1 text-xs text-ink-500">{p.runs}</p>
                <p className="mt-3 font-700">What you need</p>
                <ul className="list-disc pl-5">
                  {p.needs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>

                {!isMonitor && (
                  <>
                    <p className="mt-3 font-700">What you do. Tick each one when you have done it.</p>
                    <div className="mt-1.5 space-y-1.5">
                      {p.steps.map((x, i) => {
                        const n = i + 1;
                        const on = have.has(n);
                        return (
                          <button
                            key={x}
                            type="button"
                            disabled={!mine}
                            onClick={async () => {
                              const r = await toggleProjectStep(p.id, n);
                              setSaid(r?.ok === false ? 'Do the step before it first, then tick this one.' : '');
                            }}
                            className="flex w-full items-start gap-2.5 text-left text-sm"
                          >
                            <span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[0.65rem] font-700 ${on ? 'bg-sage-500 text-white' : 'bg-cream-200 text-ink-700'}`}>
                              {on ? '✓' : n}
                            </span>
                            <span className={on ? 'text-ink-500 line-through' : 'text-ink-900'}>{x}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {isMonitor && (
                  <>
                    <p className="mt-3 font-700">Your daily check-in</p>
                    <p className="text-xs text-ink-700">{p.watch}</p>
                    <button
                      type="button"
                      disabled={!mine}
                      onClick={() => toggleMonitorCheckIn(p.id)}
                      className={`mt-1.5 rounded-full border px-4 py-1.5 text-xs font-700 ${checkIns.has(today) ? 'border-lavender-500 bg-lavender-500 text-white' : 'border-lavender-500 bg-white text-lavender-700 hover:bg-lavender-300/25'}`}
                    >
                      {checkIns.has(today) ? 'Checked today ✓' : 'I checked it today ✓'}
                    </button>
                    <p className="mt-1.5 text-xs text-ink-500">
                      Checked {checkIns.size} of {p.minCheckIns} days needed{checkIns.size > 0 ? ` · last: ${[...checkIns].sort().slice(-1)[0]}` : ''}
                    </p>
                  </>
                )}

                <p className="mt-3 font-700">It is finished when</p>
                <p>{p.done}</p>

                <p className="mt-3 font-700">Write about it</p>
                <textarea
                  disabled={!mine}
                  defaultValue={row.writeup || ''}
                  onBlur={(e) => saveProjectWriteup(p.id, e.target.value)}
                  rows={4}
                  placeholder="What happened? What did you find out?"
                  className="mt-1 w-full rounded-petal border-2 border-cream-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:text-ink-500"
                />

                <ProjectPhotoBox projectId={p.id} mine={mine} />

                {p.state !== 'set-aside' && p.state !== 'done' && !canFinish && (
                  <p className="mt-3 text-xs text-ink-500">
                    {isMonitor
                      ? 'The finish button shows up once you have checked in enough days, written about it, and added your photo.'
                      : 'The finish button shows up once every step is ticked, you have written about it, and added your photo.'}
                  </p>
                )}
                {p.state !== 'set-aside' && (p.state === 'done' || canFinish) && (
                  <button type="button" onClick={() => setProjectDone(p.id, p.state !== 'done')} className={`${primary} mt-3`}>
                    {p.state === 'done' ? 'Not finished after all' : 'I finished it'}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------

function ResearchTab() {
  const her = useHer();
  const saveWritingDraft = useAppStore((s) => s.saveWritingDraft);
  const toggleResearchStep = useAppStore((s) => s.toggleResearchStep);
  const [q, setQ] = useState(RESEARCH_QUARTERS.find((x) => researchNow(x, her).state === 'open') || RESEARCH_QUARTERS[0]);
  const [refused, setRefused] = useState(false);
  const now = researchNow(q, her);
  const slot = researchSlot(q);
  const draft = her.drafts[slot] || {};
  const done = new Set(draft.steps || []);

  return (
    <>
      <div className="flex gap-2">
        {RESEARCH_QUARTERS.map((x) => (
          <button key={x} type="button" onClick={() => setQ(x)} className={`rounded-full px-4 py-1.5 text-sm font-700 ${q === x ? 'bg-lavender-500 text-white' : 'border border-cream-300 bg-white text-ink-700'}`}>
            Quarter {x}
          </button>
        ))}
      </div>

      {now.state === 'not-yet' && (
        <p className="mt-4 rounded-petal bg-cream-100 px-4 py-3 text-sm text-ink-700">
          This research paper starts in Quarter {q}. Nothing to do for it yet. You can read the five steps below.
        </p>
      )}
      {now.state === 'finished' && (
        <p className="mt-4 rounded-petal bg-sage-300/20 px-4 py-3 text-sm text-ink-900">✓ This research paper is finished. It is in your Portfolio.</p>
      )}

      {now.state === 'open' && (
        <div className="panel mt-4 px-5 py-5">
          <p className="label-caps text-sage-700">
            Research paper · Quarter {q} · step {now.stepNumber} of {now.of}
          </p>
          <h2 className="mt-1 font-display text-xl text-ink-900">{now.step.step}</h2>
          <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-900">{now.step.ask}</p>
          {now.step.example && <p className="mt-2 text-sm text-ink-500">{now.step.example}</p>}
          {now.assignedQuestion && now.stepNumber === 1 && (
            <p className="mt-3 rounded-petal bg-gold-300/20 px-3 py-2 text-sm text-ink-900">Gigi suggests this question: “{now.assignedQuestion}”</p>
          )}
          <label className="mt-4 block text-sm font-700 text-ink-900">
            {now.box.label}
            <textarea
              // THE CURSOR BUG (Gigi, Nov 3 2026 — same bug as the book
              // report box: a controlled value={draft[...]} saved on every
              // keystroke fights her caret because saveWritingDraft awaits an
              // IndexedDB write before the store catches up). Uncontrolled,
              // keyed to the slot/field so it only remounts when she moves to
              // a different step or quarter, never on her own typing.
              key={`${slot}-${now.box.field}`}
              rows={now.box.rows}
              defaultValue={draft[now.box.field] || ''}
              onChange={(e) => saveWritingDraft(slot, { [now.box.field]: e.target.value })}
              className="mt-1 block w-full rounded-petal border-2 border-cream-200 px-3 py-2 text-base font-400"
            />
          </label>
          <button
            type="button"
            onClick={async () => {
              const r = await toggleResearchStep(q, now.stepNumber);
              setRefused(r?.ok === false);
            }}
            disabled={!canTickResearch(q, now.stepNumber, draft)}
            className={`${primary} mt-3`}
          >
            I finished this step
          </button>
          {refused && <p className="mt-2 text-xs text-clay-500">Write in the box first. Then this step can be ticked.</p>}
        </div>
      )}

      <ol className="mt-6 space-y-2">
        {RESEARCH_PAPER.sequence.map((s) => {
          const box = RESEARCH_BOXES[s.n];
          const text = String(draft[box.field] || '').trim();
          return (
            <li key={s.n} className="rounded-petal border border-cream-300 bg-white px-4 py-2 text-sm">
              <span className="font-700 text-ink-900">
                {done.has(s.n) ? '✓' : `${s.n}.`} {s.step}
              </span>{' '}
              <span className="text-ink-700">{s.ask}</span>
              {done.has(s.n) && text && <p className="mt-1 whitespace-pre-wrap text-xs text-ink-500">{text.length > 200 ? `${text.slice(0, 200)}…` : text}</p>}
            </li>
          );
        })}
      </ol>
    </>
  );
}

// ---------------------------------------------------------------------------

function LibraryTab() {
  const her = useHer();
  const shelf = libraryShelf(her.drafts);
  return (
    <>
      <h2 className="font-display text-lg text-ink-900">Your Reading course books</h2>
      <ul className="mt-2 space-y-2">
        {shelf.course.map((b) =>
          b.kind === 'reading' ? (
            <li key={b.module} className="rounded-petal border border-cream-300 bg-white px-4 py-3 text-sm">
              <p className="font-700 text-ink-900">
                {b.title} <span className="font-400 text-ink-500">· {b.author}</span>
              </p>
              <p className="text-xs text-ink-500">
                Module {b.module} · Quarter {b.quarter} · {b.ages}
              </p>
              {b.note && <p className="mt-1 text-xs text-ink-700">{b.note}</p>}
            </li>
          ) : (
            <li key={b.module} className="rounded-petal border border-dashed border-cream-300 px-4 py-2 text-xs text-ink-500">
              Module {b.module} · {b.moduleTitle}: book to come when this module is written
            </li>
          )
        )}
      </ul>
      <h2 className="mt-7 font-display text-lg text-ink-900">Your book report books</h2>
      {shelf.reports.length ? (
        <ul className="mt-2 space-y-2">
          {shelf.reports.map((b) => (
            <li key={b.quarter} className="rounded-petal border border-cream-300 bg-white px-4 py-2 text-sm">
              <span className="font-700 text-ink-900">{b.title}</span>
              {b.author ? <span className="text-ink-500"> · {b.author}</span> : null}
              <span className="text-xs text-ink-500"> · Quarter {b.quarter}{b.chosenBy === 'grown-up' ? ' · chosen by Gigi' : ''}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-ink-700">No book report book chosen yet.</p>
      )}
      {shelf.added.length > 0 && (
        <>
          <h2 className="mt-7 font-display text-lg text-ink-900">More books from Gigi and Mom</h2>
          <ul className="mt-2 space-y-2">
            {shelf.added.map((b) => (
              <li key={b.id} className="rounded-petal border border-cream-300 bg-white px-4 py-2 text-sm">
                <span className="font-700 text-ink-900">{b.title}</span>
                {b.author ? <span className="text-ink-500"> · {b.author}</span> : null}
                {b.note ? <p className="text-xs text-ink-700">{b.note}</p> : null}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------

function PortfolioTab() {
  const her = useHer();
  const items = portfolioItems(her);
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-700">{items.length} finished piece{items.length === 1 ? '' : 's'}</p>
        <button type="button" onClick={() => window.print()} className="rounded-full border border-cream-300 bg-white px-4 py-1.5 text-xs font-700 text-ink-700">
          🖨️ Print
        </button>
      </div>
      {items.length === 0 && <p className="mt-3 text-sm text-ink-700">When you finish a book report, a project, a research paper or a reading lesson, it shows up here.</p>}
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={`${it.kind}-${it.title}-${i}`} className="rounded-petal border border-cream-300 bg-white px-4 py-3 text-sm">
            <p className="label-caps text-ink-500">
              {it.kind}
              {it.at ? ` · ${String(it.at).slice(0, 10)}` : ''}
            </p>
            <p className="font-700 text-ink-900">{it.title}</p>
            <p className="text-xs text-ink-700">{it.detail}</p>
            {it.text && <p className="mt-2 whitespace-pre-wrap text-sm text-ink-900">{it.text}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}

// ---------------------------------------------------------------------------

function SetupTab() {
  const drafts = useAppStore((s) => s.writingDrafts) || {};
  const saveAcademicSetup = useAppStore((s) => s.saveAcademicSetup);
  const setup = setupFrom(drafts);
  const [newBook, setNewBook] = useState({ title: '', author: '', note: '' });

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-lg text-ink-900">Book report books</h2>
        <p className="text-xs text-ink-700">Choose her book for each quarter. It fills in her book report for her. Leave it blank to let her choose.</p>
        <div className="mt-2 space-y-2">
          {QUARTERS.map((q) => (
            <div key={q} className="flex flex-wrap items-center gap-2">
              <span className="w-24 text-sm font-700 text-ink-900">Quarter {q}</span>
              <input
                placeholder="Title"
                defaultValue={setup.bookFor[q]?.title || ''}
                onBlur={(e) => saveAcademicSetup({ bookFor: { ...setup.bookFor, [q]: { ...(setup.bookFor[q] || {}), title: e.target.value.trim() } } })}
                className="min-w-0 flex-1 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm"
              />
              <input
                placeholder="Author"
                defaultValue={setup.bookFor[q]?.author || ''}
                onBlur={(e) => saveAcademicSetup({ bookFor: { ...setup.bookFor, [q]: { ...(setup.bookFor[q] || {}), author: e.target.value.trim() } } })}
                className="w-40 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink-900">Research papers</h2>
        {RESEARCH_QUARTERS.map((q) => (
          <div key={q} className="mt-3 rounded-petal border border-cream-300 bg-white px-4 py-3">
            <p className="text-sm font-700 text-ink-900">Quarter {q}</p>
            <label className="mt-1 flex items-center gap-2 text-sm text-ink-900">
              <input type="checkbox" checked={!!setup.researchOpen[q]} onChange={(e) => saveAcademicSetup({ researchOpen: { ...setup.researchOpen, [q]: e.target.checked } })} />
              Open it now (otherwise it opens when she reaches Quarter {q})
            </label>
            <input
              placeholder="A question to suggest to her (optional)"
              defaultValue={setup.researchQuestion[q] || ''}
              onBlur={(e) => saveAcademicSetup({ researchQuestion: { ...setup.researchQuestion, [q]: e.target.value.trim() } })}
              className="mt-2 block w-full rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm"
            />
          </div>
        ))}
      </section>

      <section>
        <h2 className="font-display text-lg text-ink-900">Projects</h2>
        <p className="text-xs text-ink-700">Set a project aside if it will not work for her this year. It stays in the list and can be brought back.</p>
        <ul className="mt-2 space-y-1">
          {projectBoard({ drafts }).sort((a, b) => a.module - b.module).map((p) => {
            const off = setup.projectsOff.includes(p.id);
            return (
              <li key={p.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!off}
                  onChange={() => saveAcademicSetup({ projectsOff: off ? setup.projectsOff.filter((x) => x !== p.id) : [...setup.projectsOff, p.id] })}
                />
                <span className="text-ink-900">
                  Module {p.module}: {p.title}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-ink-900">Supply list — the whole year</h2>
          <button type="button" onClick={() => window.print()} className="rounded-full border border-cream-300 bg-white px-4 py-1.5 text-xs font-700 text-ink-700">
            🖨️ Print
          </button>
        </div>
        <p className="text-xs text-ink-700">What every project needs, in order, so it can be gotten ahead of the week it is due. A project set aside above is grayed out — nothing to buy for it this year.</p>
        <div className="mt-3 space-y-4">
          {QUARTERS.map((q) => (
            <div key={q}>
              <p className="label-caps text-ink-500">Quarter {q}</p>
              <ul className="mt-1 space-y-2">
                {PROJECTS.filter((p) => p.quarter === q)
                  .sort((a, b) => a.module - b.module)
                  .map((p) => {
                    const off = setup.projectsOff.includes(p.id);
                    return (
                      <li key={p.id} className={`rounded-petal border px-3 py-2 text-sm ${off ? 'border-cream-200 bg-cream-100 text-ink-500' : 'border-cream-300 bg-white text-ink-900'}`}>
                        <span className="font-700">
                          Module {p.module} · {p.title}
                        </span>{' '}
                        <span className="text-xs">(due week {p.dueWeek}){off ? ' — set aside' : ''}</span>
                        <ul className={`mt-1 list-disc pl-5 text-xs ${off ? 'line-through' : ''}`}>
                          {p.needs.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg text-ink-900">Add a book to her library</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <input placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} className="min-w-0 flex-1 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm" />
          <input placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} className="w-40 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm" />
          <input placeholder="A note for her (optional)" value={newBook.note} onChange={(e) => setNewBook({ ...newBook, note: e.target.value })} className="block w-full rounded-petal border-2 border-cream-200 px-3 py-1.5 text-sm" />
          <button
            type="button"
            disabled={!newBook.title.trim()}
            onClick={async () => {
              const id = `bk-${Date.now()}`;
              await saveAcademicSetup({ library: [...setup.library, { id, title: newBook.title.trim(), author: newBook.author.trim(), note: newBook.note.trim() }] });
              setNewBook({ title: '', author: '', note: '' });
            }}
            className={primary}
          >
            Add book
          </button>
        </div>
        {setup.library.length > 0 && (
          <ul className="mt-3 space-y-1">
            {setup.library.map((b) => (
              <li key={b.id} className="flex items-center gap-2 text-sm text-ink-900">
                {b.title}
                {b.author ? ` · ${b.author}` : ''}
                <button type="button" onClick={() => saveAcademicSetup({ library: setup.library.filter((x) => x.id !== b.id) })} className="text-xs text-clay-500">
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default AcademicCenterView;
