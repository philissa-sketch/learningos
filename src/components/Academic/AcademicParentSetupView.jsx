import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { getCurrentQuarter } from '../../lib/schoolQuarter.js';
import {
  PendingBookSuggestion,
  countPendingSuggestions
} from './PendingBookSuggestion.jsx';
import {
  PendingAssignmentSuggestion,
  AcceptAllAssignments
} from './PendingAssignmentSuggestion.jsx';
import { AssignmentFormatPicker } from './AssignmentFormatPicker.jsx';
import { orderBooks, orderAssignments } from '../../lib/academicOrder.js';
import {
  ASSIGNMENT_STATUS_LABELS,
  statusBadgeClass,
  subjectHeading,
  orderedSubjects,
  orderedQuarters,
  formatDueDate
} from './academicUi.js';
import { academyContent } from '../../content/academyContent.js';

const { ACADEMIC_ASSIGNMENT_TYPES = [], ACADEMIC_BOOK_TYPES = [], ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER } = academyContent().academicCenter;

// Same letter set the Writing Journal Review and Khan Academy grading
// already use — one grading scale across the whole app, not a second one.
const GRADE_OPTIONS = ['A', 'A-', 'B+', 'B', 'C', 'D', 'F'];

/**
 * Parent Setup — where placeholder slots become real work.
 *
 * The parent enters the real book title/author she actually has, and the
 * real title/topic and due date for each quarterly assignment. Nothing
 * in this app pre-fills or suggests a book: Part 9's "Intelligent
 * Reading Planner" (AI auto-recommends books based on grade, interests,
 * reading level, season) is a deferred item, and this app has no live AI
 * integration, so a fake recommender would be inventing content rather
 * than building the feature. Deliberately left as her decision.
 *
 * Not a security boundary — this is a plain sub-tab. The Parent
 * Dashboard login gate she asked for is still queued; this tab is the
 * natural thing to move behind it when it's built.
 */
export function AcademicParentSetupView() {
  const [mode, setMode] = useState('assignments');

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Parent Setup</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Fill In the Real Books &amp; Assignments</h3>
        <p className="mt-2 text-sm text-ink-300">
          Each subject comes with slots built from its real curriculum — a Q1 Book Report for Reading, a Q3
          Research Paper for Aerospace, and so on. A slot doesn't become real work Lamar sees until you give it
          a title here. Nothing is auto-filled or suggested: the book is your call.
        </p>
        <p className="mt-2 rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-xs text-ink-500">
          <span className="font-display uppercase tracking-widest text-ink-600">Academic Center or Planner? </span>
          Both exist on purpose, and anything with a due date shows up on the Scheduler, the Parent Dashboard's
          Coming Up view, and Lamar's dashboard either way. Use <strong>here</strong> for book reports, research
          papers, presentations, and portfolio work tied to a subject and quarter — this is what tracks reading
          status and carries a grade. Use the <strong>Planner</strong> (Parent Dashboard) for one-off work:
          field trips, labs, volunteering, competitions, extra practice.
        </p>

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          <button
            type="button"
            onClick={() => setMode('assignments')}
            className={
              'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
              (mode === 'assignments' ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
            }
          >
            Assignments
          </button>
          <button
            type="button"
            onClick={() => setMode('books')}
            className={
              'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
              (mode === 'books' ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
            }
          >
            Books
          </button>
        </div>
      </div>

      {mode === 'books' ? <BookSetup /> : <AssignmentSetup />}
    </div>
  );
}

// ---------------------------------------------------------------------
// Books
// ---------------------------------------------------------------------

function BookSetup() {
  const academicBooks = useAppStore((s) => s.academicBooks);
  const subjects = orderedSubjects(academicBooks);
  const pending = countPendingSuggestions(academicBooks);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-signal-cyan/40 bg-signal-cyan/5 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Books Waiting on You</p>
        <p className="mt-1 text-sm text-ink-300">
          {pending === 0
            ? "Every slot has either a book or no suggestions left. Add your own below any time."
            : `${pending} ${pending === 1 ? 'slot has' : 'slots have'} a suggested book waiting for a yes or no. Each one is a real book, checked against its publisher and library listings — say yes to use it, or pass and the next option comes up.`}
        </p>
      </div>
      {subjects.map((subject) => (
        <div key={subject} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            {subjectHeading(subject)}
          </p>
          <div className="mt-3 space-y-2">
            {orderBooks(academicBooks.filter((b) => b.subject === subject))
              .map((book) => (
                <BookEditor key={book.id} book={book} />
              ))}
          </div>
          <AddCustomBook subject={subject} />
        </div>
      ))}
    </div>
  );
}

function BookEditor({ book }) {
  const updateAcademicBook = useAppStore((s) => s.updateAcademicBook);
  const removeAcademicBook = useAppStore((s) => s.removeAcademicBook);
  const setBookPacing = useAppStore((s) => s.setBookPacing);

  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [type, setType] = useState(book.type);
  const [totalUnits, setTotalUnits] = useState(book.totalUnits ? String(book.totalUnits) : '');
  const [unit, setUnit] = useState(book.unit || 'chapters');
  const [saved, setSaved] = useState(false);

  const dirty =
    title !== (book.title || '') ||
    author !== (book.author || '') ||
    type !== book.type ||
    totalUnits !== (book.totalUnits ? String(book.totalUnits) : '') ||
    unit !== (book.unit || 'chapters');

  const handleSave = async () => {
    await updateAcademicBook(book.id, { title, author, type });
    await setBookPacing(book.id, { totalUnits, unit });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      <p className="text-xs text-ink-500">{book.note || 'Custom book'}</p>

      <PendingBookSuggestion book={book} />

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Real book title"
          className="min-w-[12rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author (optional)"
          className="min-w-[10rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        >
          {ACADEMIC_BOOK_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* How long the book is — the one fact the app can't know. Without
          it there's no weekly reading pace, and it won't invent one. */}
      {title.trim() && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            type="number"
            min="1"
            value={totalUnits}
            onChange={(e) => setTotalUnits(e.target.value)}
            placeholder="How many?"
            className="w-32 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          >
            <option value="chapters">chapters</option>
            <option value="pages">pages</option>
          </select>
          <span className="text-xs text-ink-600">
            {book.totalUnits ? 'Sets his weekly reading target.' : 'Add this and he gets a weekly reading target.'}
          </span>
        </div>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
        {(book.title || book.isCustom) && (
          <button
            type="button"
            onClick={() => {
              removeAcademicBook(book.id);
              setTitle('');
              setAuthor('');
            }}
            className="text-xs text-ink-500 hover:text-signal-red"
          >
            {book.isCustom ? 'Delete' : 'Clear slot'}
          </button>
        )}
      </div>
    </div>
  );
}

function AddCustomBook({ subject }) {
  const addCustomAcademicBook = useAppStore((s) => s.addCustomAcademicBook);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('Recommended');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addCustomAcademicBook(subject, { title, author, type });
    setTitle('');
    setAuthor('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 text-xs font-display font-600 text-ink-500 hover:text-ink-100"
      >
        + Add another book to {subjectHeading(subject)}
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          className="min-w-[12rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author (optional)"
          className="min-w-[10rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        >
          {ACADEMIC_BOOK_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!title.trim()}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Book
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ink-500 hover:text-ink-100">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------
// Assignments
// ---------------------------------------------------------------------

function AssignmentSetup() {
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const academicBooks = useAppStore((s) => s.academicBooks);
  const currentQuarter = getCurrentQuarter().batchLabel;
  const quarters = orderedQuarters(academicAssignments);
  const [quarter, setQuarter] = useState(
    quarters.includes(currentQuarter) ? currentQuarter : quarters[0] || currentQuarter
  );

  const inQuarter = academicAssignments.filter((a) => a.quarter === quarter);
  const subjects = orderedSubjects(inQuarter);

  // Reading Assignment suggestions are generated from the subject's real
  // approved books, so the editors below need them grouped by subject.
  const booksBySubject = {};
  for (const book of academicBooks) {
    (booksBySubject[book.subject] ??= []).push(book);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <div className="flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {quarters.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuarter(q)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (quarter === q ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
              }
            >
              {q}
              {q === currentQuarter ? ' • now' : ''}
            </button>
          ))}
        </div>
      </div>

      <AcceptAllAssignments assignments={inQuarter} booksBySubject={booksBySubject} quarter={quarter} />

      {subjects.map((subject) => (
        <div key={subject} className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
            {subjectHeading(subject)}
          </p>
          <div className="mt-3 space-y-2">
            {orderAssignments(inQuarter.filter((a) => a.subject === subject))
              .map((assignment) => (
                <AssignmentEditor
                  key={assignment.id}
                  assignment={assignment}
                  booksForSubject={booksBySubject[subject] || []}
                />
              ))}
          </div>
          <AddCustomAssignment subject={subject} quarter={quarter} />
        </div>
      ))}

      {subjects.length === 0 && (
        <p className="text-sm text-ink-500">No assignment slots exist for {quarter} yet.</p>
      )}
    </div>
  );
}

function AssignmentEditor({ assignment, booksForSubject = [] }) {
  const scheduleAcademicAssignment = useAppStore((s) => s.scheduleAcademicAssignment);
  const moveAssignmentToQuarter = useAppStore((s) => s.moveAssignmentToQuarter);
  const removeAcademicAssignment = useAppStore((s) => s.removeAcademicAssignment);
  const gradeAcademicAssignment = useAppStore((s) => s.gradeAcademicAssignment);

  const [title, setTitle] = useState(assignment.title || '');
  // An <input type="date"> value IS a local 'YYYY-MM-DD' string, which is
  // exactly the format stored — no Date object is constructed anywhere in
  // this flow, so there's no UTC shift to guard against.
  const [dueDate, setDueDate] = useState(assignment.dueDate || '');
  const [type, setType] = useState(assignment.type);
  const [saved, setSaved] = useState(false);

  const dirty =
    title !== (assignment.title || '') || dueDate !== (assignment.dueDate || '') || type !== assignment.type;

  const handleSave = async () => {
    await scheduleAcademicAssignment(assignment.id, { title, dueDate, type });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={
            'rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-widest ' +
            statusBadgeClass(assignment.status)
          }
        >
          {ASSIGNMENT_STATUS_LABELS[assignment.status] || assignment.status}
        </span>
        {assignment.dueDate && (
          <span className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Due {formatDueDate(assignment.dueDate)}
          </span>
        )}
      </div>

      <p className="mt-1.5 text-xs text-ink-500">{assignment.note || 'Custom assignment'}</p>

      <div className="mt-2">
        <PendingAssignmentSuggestion assignment={assignment} booksForSubject={booksForSubject} />
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Real title or topic"
          className="min-w-[12rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        >
          {ACADEMIC_ASSIGNMENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
        {(assignment.title || assignment.isCustom) && (
          <button
            type="button"
            onClick={() => {
              removeAcademicAssignment(assignment.id);
              setTitle('');
              setDueDate('');
            }}
            className="text-xs text-ink-500 hover:text-signal-red"
          >
            {assignment.isCustom ? 'Delete' : 'Clear slot'}
          </button>
        )}
      </div>

      {/* Part 9 §4's "Move to another quarter" — a report that didn't
          happen in Q1 slides to Q2 instead of being rebuilt. */}
      {assignment.title && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-display uppercase tracking-widest text-ink-600">Move to</span>
          {ACADEMIC_SUCCESS_CENTER_QUARTER_ORDER.filter((q) => q !== assignment.quarter).map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => moveAssignmentToQuarter(assignment.id, q)}
              className="rounded-md border border-space-600 px-2 py-0.5 text-xs font-display font-600 text-ink-500 transition hover:text-ink-100"
            >
              {q.replace(' 2026-2027', '')}
            </button>
          ))}
        </div>
      )}

      <AssignmentFormatPicker assignment={assignment} />

      {assignment.status === 'completed' && (
        <div className="mt-3 border-t border-space-700 pt-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
            Grade — read it, then pick a letter
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {GRADE_OPTIONS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => gradeAcademicAssignment(assignment.id, g)}
                aria-pressed={assignment.grade === g}
                className={
                  'rounded-md px-2.5 py-1 text-xs font-display font-700 transition-colors ' +
                  (assignment.grade === g
                    ? 'bg-signal-cyan/15 text-signal-cyan'
                    : 'text-ink-500 hover:text-ink-100')
                }
              >
                {g}
              </button>
            ))}
            {assignment.grade && (
              <button
                type="button"
                onClick={() => gradeAcademicAssignment(assignment.id, null)}
                className="ml-1 text-xs text-ink-500 hover:text-signal-red"
              >
                Clear grade
              </button>
            )}
          </div>
          <AssignmentFeedbackBox assignment={assignment} />
        </div>
      )}
    </div>
  );
}

/**
 * Written feedback the STUDENT sees.
 *
 * From the parent, August 6, 2026: "I would like for him to see feedback
 * on his assignments." A letter alone tells a 12-year-old where he landed
 * and nothing about what to do next time — and the note is the half he
 * can actually act on.
 *
 * Saved separately from the grade so changing a letter never wipes the
 * paragraph explaining it, and so she can leave a note on work she hasn't
 * put a letter on at all.
 */
function AssignmentFeedbackBox({ assignment }) {
  const setAcademicAssignmentFeedback = useAppStore((s) => s.setAcademicAssignmentFeedback);
  const [text, setText] = useState(assignment.feedback || '');
  const [saved, setSaved] = useState(false);
  const dirty = text !== (assignment.feedback || '');

  const handleSave = async () => {
    await setAcademicAssignmentFeedback(assignment.id, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="mt-3 border-t border-space-700 pt-2">
      <p className="text-[10px] font-display uppercase tracking-widest text-ink-600">
        Feedback — Lamar sees this
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="What worked, and one thing to do differently next time."
        className="mt-1 w-full resize-none rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty}
          className="rounded-md bg-space-700 px-3 py-1 text-xs font-display font-700 text-ink-100 transition hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save feedback
        </button>
        {saved && <span className="text-xs text-signal-cyan">Saved</span>}
      </div>
    </div>
  );
}

function AddCustomAssignment({ subject, quarter }) {
  const addCustomAcademicAssignment = useAppStore((s) => s.addCustomAcademicAssignment);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Portfolio Entry');
  const [dueDate, setDueDate] = useState('');

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addCustomAcademicAssignment(subject, quarter, { title, type, dueDate });
    setTitle('');
    setDueDate('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 text-xs font-display font-600 text-ink-500 hover:text-ink-100"
      >
        + Add another {quarter} assignment to {subjectHeading(subject)}
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-lg border border-space-700 bg-space-900 px-3 py-3">
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title or topic"
          className="min-w-[12rem] flex-1 rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        >
          {ACADEMIC_ASSIGNMENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!title.trim()}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-xs font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add Assignment
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ink-500 hover:text-ink-100">
          Cancel
        </button>
      </div>
    </div>
  );
}
