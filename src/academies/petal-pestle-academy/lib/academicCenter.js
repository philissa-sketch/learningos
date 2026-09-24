// ---------------------------------------------------------------------------
// HER ACADEMIC CENTER — the rules behind every tab (Sept 24 2026).
//
// Gigi: "I'd like there to be an Academic Center like Lamar's where it will
// have book reports, projects, etc." Then: build the research papers now, and
// a Grown-Up Setup tab now.
//
// Lamar's Academic Center is one place for his books, his big assignments and
// his finished work. Hers had all of the pieces and no place:
//   · 4 book reports a year     — at the bottom of the Journal
//   · 16 projects               — only on the Friday catch-up screen
//   · 2 research papers         — written in data, with NO screen at all
//   · 16 Reading-course books   — only inside each reading module
// This file answers, for each tab, "where is she, and what is next?". The
// screens only show what it says. check-academic-center.mjs calls it directly.
//
// ---- NOTHING NEW IS STORED IN A NEW PLACE ----
// Research paper drafts and the grown-up's settings are rows in writingDrafts,
// the table book reports already use, so backups and imports carry them with
// no new table:
//   'research-paper-q2', 'research-paper-q4'  — her research papers
//   'academic-setup'                          — the grown-up's choices
//
// ---- THE SAME PACING RULE AS EVERYTHING ELSE ----
// No dates. A piece opens by HER PROGRESS (the Herbalism week she is in), and
// its steps go in order: a step never opens before the one before it is done.
// ---------------------------------------------------------------------------

import { BOOK_REPORT, RESEARCH_PAPER } from '../data/writing/writingPieces.js';
import { PROJECTS } from '../config/projects.js';
import { READING_MODULES, READING_REGISTER } from '../data/reading/course/readingCourse.js';
import { spineWeek, quarterOfWeek, weekWithinQuarter, bookReportNow } from './bookReportSchedule.js';
import { WEEKS } from '../config/assessment.js';

export const SETUP_SLOT = 'academic-setup';
export const QUARTERS = [1, 2, 3, 4];

// ---------------------------------------------------------------------------
// GROWN-UP SETUP
// ---------------------------------------------------------------------------

/** The grown-up's choices, with safe blanks for anything never set. */
export function setupFrom(drafts = {}) {
  const row = drafts?.[SETUP_SLOT] || {};
  return {
    bookFor: row.bookFor || {}, // { 1: { title, author } }
    library: Array.isArray(row.library) ? row.library : [], // [{ id, title, author, note }]
    researchOpen: row.researchOpen || {}, // { 2: true } opens a paper early
    researchQuestion: row.researchQuestion || {}, // { 2: 'Why does mint spread?' }
    projectsOff: Array.isArray(row.projectsOff) ? row.projectsOff : [] // project ids a grown-up has set aside
  };
}

// ---------------------------------------------------------------------------
// BOOK REPORTS
// ---------------------------------------------------------------------------

export function bookReportSlot(q) {
  return `book-report-q${q}`;
}

/**
 * Where each quarter's book report stands.
 * state: 'not-yet' | 'this-quarter' | 'in-progress' | 'finished' | 'marked'
 */
export function bookReportStatus(q, { drafts = {}, lessonsRead = [], marks = [], weeks = WEEKS } = {}) {
  const draft = drafts?.[bookReportSlot(q)] || null;
  const steps = new Set(draft?.steps || []);
  const total = BOOK_REPORT.steps.length;
  const setup = setupFrom(drafts);
  const book = setup.bookFor[q]?.title || draft?.bookTitle || '';
  const mark = (marks || []).find((m) => m && m.pieceId === 'book-report' && Number(m.quarter) === q) || null;
  const nowQ = quarterOfWeek(spineWeek(lessonsRead, weeks));
  let state = 'not-yet';
  if (mark) state = 'marked';
  else if (steps.has(total) && String(draft?.final || '').trim()) state = 'finished';
  else if (steps.size > 0) state = 'in-progress';
  else if (q <= nowQ) state = 'this-quarter';
  return { quarter: q, state, stepsDone: steps.size, of: total, book, mark };
}

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

/** The Herbalism module she is in: two weeks a module. */
export function currentModule(lessonsRead = [], weeks = WEEKS) {
  return Math.ceil(spineWeek(lessonsRead, weeks) / 2);
}

/**
 * Every project with its state, the current one first.
 * state: 'done' | 'now' | 'earlier' (its module is past and it is not done) |
 *        'later' | 'set-aside' (a grown-up turned it off)
 */
export function projectBoard({ lessonsRead = [], projectStatus = {}, drafts = {}, weeks = WEEKS } = {}) {
  const mod = currentModule(lessonsRead, weeks);
  const off = new Set(setupFrom(drafts).projectsOff);
  const rows = PROJECTS.map((p) => {
    const done = !!projectStatus?.[p.id]?.doneAt;
    let state = 'later';
    if (off.has(p.id)) state = 'set-aside';
    else if (done) state = 'done';
    else if (p.module === mod) state = 'now';
    else if (p.module < mod) state = 'earlier';
    return { ...p, state, doneAt: projectStatus?.[p.id]?.doneAt || null };
  });
  const order = { now: 0, earlier: 1, later: 2, done: 3, 'set-aside': 4 };
  return rows.sort((a, b) => order[a.state] - order[b.state] || a.module - b.module);
}

// ---------------------------------------------------------------------------
// RESEARCH PAPERS
// ---------------------------------------------------------------------------

export const RESEARCH_QUARTERS = RESEARCH_PAPER.quarters; // [2, 4]

export function researchSlot(q) {
  return `research-paper-q${q}`;
}

/** Which box each step writes in. */
export const RESEARCH_BOXES = {
  1: { field: 'question', label: 'Your question', rows: 2 },
  2: { field: 'sources', label: 'Your two sources: what each one is, and where it came from', rows: 4 },
  3: { field: 'notes', label: 'Your notes, in your own words', rows: 8 },
  4: { field: 'draft', label: 'Your paper', rows: 12 },
  5: { field: 'final', label: 'Your checked paper, the one you hand in', rows: 12 }
};

/**
 * Where a research paper stands, and which step is hers now.
 *
 * It opens when she reaches its quarter (by her Herbalism progress), or sooner
 * if a grown-up opens it in Setup. Steps go in order: she is on her first step
 * not done. A step cannot be ticked with its box empty (the store enforces it),
 * because a ticked step with nothing written is a record of work that is not
 * there.
 */
export function researchNow(q, { drafts = {}, lessonsRead = [], weeks = WEEKS } = {}) {
  const setup = setupFrom(drafts);
  const draft = drafts?.[researchSlot(q)] || {};
  const done = new Set(draft.steps || []);
  const total = RESEARCH_PAPER.sequence.length;
  const nowQ = quarterOfWeek(spineWeek(lessonsRead, weeks));
  const open = nowQ >= q || !!setup.researchOpen[q];
  if (!open) return { quarter: q, state: 'not-yet', opensInQuarter: q, of: total, stepsDone: done.size };
  let n = 1;
  while (n <= total && done.has(n)) n += 1;
  if (n > total) return { quarter: q, state: 'finished', of: total, stepsDone: total };
  return {
    quarter: q,
    state: 'open',
    stepNumber: n,
    step: RESEARCH_PAPER.sequence.find((s) => s.n === n),
    box: RESEARCH_BOXES[n],
    of: total,
    stepsDone: done.size,
    assignedQuestion: setup.researchQuestion[q] || ''
  };
}

/** May this step be ticked? Only when it is her current step and its box has writing. */
export function canTickResearch(q, n, draft = {}, total = RESEARCH_PAPER.sequence.length) {
  const done = new Set(draft.steps || []);
  let first = 1;
  while (first <= total && done.has(first)) first += 1;
  if (n !== first) return false;
  const box = RESEARCH_BOXES[n];
  return !!String(draft[box.field] || '').trim();
}

// ---------------------------------------------------------------------------
// BOOK LIBRARY
// ---------------------------------------------------------------------------

/**
 * Her shelf: the Reading-course book for each written module (verified on the
 * publisher's page), each quarter's book report book, and anything a grown-up
 * added. Modules not written yet are listed as coming, never with a guessed book.
 */
export function libraryShelf(drafts = {}) {
  const setup = setupFrom(drafts);
  const course = READING_REGISTER.map((r) => {
    const m = READING_MODULES.find((x) => x.module === r.n);
    return m?.book
      ? { kind: 'reading', module: r.n, quarter: r.quarter, title: m.book.title, author: m.book.author, ages: m.book.ages, note: m.book.note, source: m.book.source }
      : { kind: 'reading-coming', module: r.n, quarter: r.quarter, moduleTitle: r.title };
  });
  const reports = QUARTERS.map((q) => {
    const title = setup.bookFor[q]?.title || drafts?.[bookReportSlot(q)]?.bookTitle || '';
    return title ? { kind: 'book-report', quarter: q, title, author: setup.bookFor[q]?.author || '', chosenBy: setup.bookFor[q]?.title ? 'grown-up' : 'her' } : null;
  }).filter(Boolean);
  const added = setup.library.map((b) => ({ kind: 'added', ...b }));
  return { course, reports, added };
}

// ---------------------------------------------------------------------------
// PORTFOLIO
// ---------------------------------------------------------------------------

/**
 * Everything she has finished, newest first. Only finished work: a portfolio
 * of half-done things is not a record of what she did.
 */
export function portfolioItems({ drafts = {}, projectStatus = {}, attempts = [], spellingResults = [], marks = [], lessonsRead = [] } = {}) {
  const items = [];
  for (const q of QUARTERS) {
    const s = bookReportStatus(q, { drafts, lessonsRead, marks });
    if (s.state === 'finished' || s.state === 'marked') {
      const d = drafts[bookReportSlot(q)] || {};
      items.push({ kind: 'Book report', title: `Quarter ${q}${s.book ? `: ${s.book}` : ''}`, at: d.updatedAt || null, detail: s.mark ? 'Marked by a grown-up' : 'Finished', text: d.final || '' });
    }
  }
  for (const q of RESEARCH_QUARTERS) {
    const r = researchNow(q, { drafts, lessonsRead });
    if (r.state === 'finished') {
      const d = drafts[researchSlot(q)] || {};
      items.push({ kind: 'Research paper', title: `Quarter ${q}: ${d.question || ''}`.trim(), at: d.updatedAt || null, detail: 'Finished', text: d.final || '' });
    }
  }
  for (const p of PROJECTS) {
    const row = projectStatus?.[p.id];
    if (row?.doneAt) items.push({ kind: 'Project', title: p.title, at: row.doneAt, detail: p.done, text: row.note || '' });
  }
  for (const a of attempts || []) {
    if (!a || !['reading-lesson', 'reading-test', 'reading-quarter'].includes(a.kind)) continue;
    items.push({ kind: a.kind === 'reading-lesson' ? 'Reading lesson' : 'Reading test', title: a.title, at: a.at, detail: `${a.right} of ${a.total}` });
  }
  for (const r of spellingResults || []) {
    if (!r || !(r.kind === 'spelling' || r.kind == null || r.kind === 'vocab-test')) continue;
    items.push({ kind: r.kind === 'vocab-test' ? 'Vocabulary test' : 'Spelling test', title: r.listId, at: r.at, detail: `${r.right} of ${r.total}` });
  }
  return items.sort((a, b) => String(b.at || '').localeCompare(String(a.at || '')));
}

export { bookReportNow, weekWithinQuarter };
