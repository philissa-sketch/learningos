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

import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import { ThisWeeksStep } from '../Journal/JournalView.jsx';
import { ParentGate } from '../../../../components/Dashboard/ParentGate.jsx';
import { BOOK_REPORT, RESEARCH_PAPER } from '../../data/writing/writingPieces.js';
import {
  QUARTERS,
  RESEARCH_QUARTERS,
  RESEARCH_BOXES,
  bookReportStatus,
  projectBoard,
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

function ProjectsTab() {
  const her = useHer();
  const setProjectDone = useAppStore((s) => s.setProjectDone);
  const board = projectBoard(her);
  const [openId, setOpenId] = useState(board[0]?.id || null);
  const WORDS = { now: 'This module', earlier: 'From an earlier module', later: 'Later', done: '✓ Done', 'set-aside': 'Set aside by a grown-up' };
  return (
    <div className="space-y-3">
      {board.map((p) => {
        const open = openId === p.id;
        return (
          <div key={p.id} className={`rounded-petal border-2 px-4 py-3 ${p.state === 'now' ? 'border-sage-500 bg-sage-300/10' : 'border-cream-300 bg-white'}`}>
            <button type="button" onClick={() => setOpenId(open ? null : p.id)} className="flex w-full items-baseline justify-between gap-2 text-left">
              <span className="font-display text-base text-ink-900">
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
                <p className="mt-3 font-700">What you do</p>
                <ol className="list-decimal pl-5">
                  {p.steps.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
                <p className="mt-3 font-700">It is finished when</p>
                <p>{p.done}</p>
                {p.state !== 'set-aside' && (
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
              rows={now.box.rows}
              value={draft[now.box.field] || ''}
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
