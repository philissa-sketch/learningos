import { comparePortfolioNewestFirst } from './academicOrder.js';

/**
 * Academic Success Center — Portfolio aggregation (PROJECT_PLAN.md
 * Part 9, "Portfolio Integration").
 *
 * Part 9 asks for ONE place where every completed piece of academic work
 * lives. Three real sources already exist in this app and none of them
 * is being replaced or migrated here — this only reads them:
 *
 *   1. `writingEntries` — the Writing Journal. Covers writing skill
 *      prompts, recurring writing projects, hands-on Aerospace projects,
 *      AND Science experiments, because all four log into that one table
 *      via WritingPromptEngine (confirmed in useAppStore's
 *      getWritingJournalSummary, which had to be fixed for exactly this
 *      reason). Titles are resolved against all three content pools.
 *   2. `academicAssignments` — completed Academic Success Center
 *      assignments (book reports, research papers, presentations,
 *      portfolio entries).
 *   3. `portfolio` — the Parent Dashboard's hand-logged project entries,
 *      which predate this Center and stay exactly where they are.
 *
 * Pure function, no store access, so it can be unit-tested and so
 * components call it against reactively-selected state instead of
 * through a Zustand getter — a getter's reference never changes, so it
 * won't re-render when the underlying data does (a real bug this
 * project already hit, see schoolQuarter.js's groupByQuarter comment).
 */

/**
 * ORDER LIVES IN lib/academicOrder.js. (Aug 16, 2026.)
 *
 * What used to be here was a `sortKey` that returned the stored string
 * unchanged, under a comment promising it compared "their first 10
 * characters." It never sliced. Two shapes go into this list — a bare local
 * 'YYYY-MM-DD' from hand-logged rows, a full UTC ISO timestamp from writing
 * entries and assignments — so comparing them raw meant a piece finished after
 * 8pm Eastern sorted under TOMORROW while its own card, which converts back to
 * local to display, printed today. It appeared above rows whose visible date
 * was later than its own.
 *
 * comparePortfolioNewestFirst converts to a local day first, so the day a row
 * sorts by is the day it shows.
 */

export function buildAcademicPortfolio({
  writingEntries = [],
  academicAssignments = [],
  portfolio = [],
  promptPools = []
}) {
  const titleById = new Map();
  const subjectById = new Map();
  const categoryById = new Map();
  for (const pool of promptPools) {
    for (const item of pool) {
      titleById.set(item.id, item.title);
      if (item.subject) subjectById.set(item.id, item.subject);
      if (item.category) categoryById.set(item.id, item.category);
    }
  }

  const items = [];

  for (const entry of writingEntries) {
    const category = categoryById.get(entry.promptId);
    items.push({
      key: `writing::${entry.id}`,
      source: 'writing-journal',
      sourceLabel:
        category === 'experiment' ? 'Project / Experiment' : category === 'project' ? 'Journal Project' : 'Writing',
      title: titleById.get(entry.promptId) || entry.promptId,
      subject: subjectById.get(entry.promptId) || null,
      completedAt: entry.completedAt,
      grade: entry.grade ?? null,
      detail: entry.wordCount ? `${entry.wordCount} words` : null
    });
  }

  for (const assignment of academicAssignments) {
    if (assignment.status !== 'completed' || !assignment.title) continue;
    items.push({
      key: `academic::${assignment.id}`,
      source: 'academic-success-center',
      sourceLabel: assignment.type,
      title: assignment.title,
      subject: assignment.subject,
      completedAt: assignment.completedAt,
      grade: assignment.grade ?? null,
      detail: assignment.quarter || null,
      // Part 9 asks the portfolio to hold reflections, not just titles —
      // in June this is the part that's actually worth reading back.
      reflection: assignment.reflection || null
    });
  }

  for (const entry of portfolio) {
    items.push({
      key: `portfolio::${entry.id}`,
      source: 'logged-project',
      sourceLabel: 'Logged Project',
      title: entry.title,
      subject: entry.subject || null,
      completedAt: entry.dateCompleted,
      grade: null,
      detail: entry.reflection || null
    });
  }

  return items.sort(comparePortfolioNewestFirst);
}

/**
 * Reading history for the Book Library view. The Parent Dashboard's
 * Reading Log predates this Center and keeps its own rows (title,
 * author, amount, unit, date); rather than migrating or duplicating
 * them, the Library shows each book's matching log entries underneath
 * it, and everything that doesn't match a book in the library is
 * returned separately so no logged reading silently disappears.
 *
 * Matching is on normalized title only — the Reading Log has no book id
 * and never will retroactively, so title is the only honest join. Author
 * is deliberately NOT part of the match, since the same book is often
 * logged with and without an author.
 */
function normalizeTitle(title) {
  return (title || '').trim().toLowerCase();
}

export function matchReadingLogToBooks(books = [], readingLog = []) {
  const byTitle = new Map();
  for (const book of books) {
    const key = normalizeTitle(book.title);
    if (!key) continue;
    if (!byTitle.has(key)) byTitle.set(key, []);
    byTitle.get(key).push(book);
  }

  const logByBookId = new Map();
  const unmatched = [];
  for (const entry of readingLog) {
    const matches = byTitle.get(normalizeTitle(entry.title));
    if (!matches || matches.length === 0) {
      unmatched.push(entry);
      continue;
    }
    // A title can legitimately appear as a slot in more than one subject
    // (e.g. an aerospace biography also assigned for Social Studies).
    // Showing the log entry under each is correct — it's the same real
    // reading session, surfaced everywhere it counts, not duplicated data.
    for (const book of matches) {
      if (!logByBookId.has(book.id)) logByBookId.set(book.id, []);
      logByBookId.get(book.id).push(entry);
    }
  }

  return { logByBookId, unmatched };
}
