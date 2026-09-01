
/**
 * THE PRINTABLE SHEETS.
 *
 * ---- WHY THEY ARE GENERATED AND NOT LINKED (Aug 16, 2026) ----
 *
 * The parent asked for "printout links where needed". A link to an outside
 * printable is a link that can rot, cost money, or turn out never to have
 * existed — and there is no way to promise a URL is still what it was without
 * opening it. Every sheet here is rendered by the app from the lesson's own
 * data and printed through the browser, exactly as the Study Guide has done
 * since it shipped. The link always works because there is nothing at the other
 * end of it but this app.
 *
 * ---- THE DESIGN OF THE SHEET ITSELF ----
 *
 * Four prompts, then space. A worksheet with twenty boxes gets abandoned at box
 * four, and the point of paper here is room to think, not room to fill in.
 * Printed light, with real ruled space, and the "why this one is on paper" line
 * kept at the top — because a sheet whose purpose is stated gets used properly
 * and a sheet that arrives without explanation is busywork.
 */
export function PrintoutSheet({ lesson, onExit }) {
  const sheet = printoutFor(lesson?.id);
  if (!sheet) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="print-hide mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 underline hover:text-ink-100">
          ← Back
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-signal-cyan px-3 py-1.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Print this sheet
        </button>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 print:border-0 print:bg-white print:p-0 print:text-black">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan print:text-black">
          {SUBJECT_LABELS[lesson.subject] || lesson.subject} · {sheet.label}
        </p>
        <h2 className="mt-1 font-display text-2xl font-700 text-ink-100 print:text-black">{sheet.title}</h2>
        <p className="mt-1 text-sm text-ink-400 print:text-black">{lesson.title}</p>

        {/* Stated on the sheet on purpose — see the header comment. */}
        <p className="mt-3 border-l-2 border-signal-cyan/50 pl-3 text-sm italic text-ink-300 print:border-black print:text-black">
          {sheet.why} {sheet.blurb}
        </p>

        <div className="mt-5 space-y-6">
          {sheet.prompts.map((prompt, i) => (
            <div key={prompt}>
              <p className="text-sm font-display font-700 text-ink-100 print:text-black">
                {i + 1}. {prompt}
              </p>
              {/* Ruled space. The diagram sheets get a box; the rest get lines. */}
              {sheet.kind === 'diagram' ? (
                <div className="mt-2 h-40 rounded-lg border border-dashed border-space-600 print:h-44 print:border-gray-400" />
              ) : (
                <div className="mt-2 space-y-5">
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="border-b border-space-600 print:border-gray-400" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-ink-600 print:text-black">
          Name ______________________  Date ______________
        </p>
      </div>
    </div>
  );
}

/**
 * THE SUBJECT JOURNAL — the parent's own better idea, taken up in full.
 *
 * "Instead of printing loose sheets for individual lessons, consider creating a
 * single printed workbook or journal at the beginning of a unit."
 *
 * Printed once. Blank templates he fills as he goes, so the daily prep is zero
 * and the year's physical work ends up in one book instead of a pile — which is
 * also what turns it into a portfolio artifact rather than loose paper.
 */
export function SubjectJournal({ subject, onExit }) {
  const journal = journalFor(subject);
  if (!journal) return null;
  const total = journal.pages.reduce((n, p) => n + p.count, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="print-hide mb-4 flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 underline hover:text-ink-100">
          ← Back
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-signal-amber px-3 py-1.5 text-sm font-display font-700 text-space-950 transition hover:brightness-110"
        >
          Print the journal ({total} pages)
        </button>
      </div>

      <div className="print-hide mb-4 rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4">
        <p className="text-sm text-ink-200">
          Print this <strong>once</strong>, at the start of the unit, and staple or bind it. It is{' '}
          {total} pages of blank templates he fills as he goes — which is the whole point: no
          printing on a school morning, and his year's paper work ends up in one book instead of a pile.
        </p>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 print:border-0 print:bg-white print:p-0 print:text-black">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber print:text-black">
          {SUBJECT_LABELS[subject] || subject}
        </p>
        <h2 className="mt-1 font-display text-3xl font-700 text-ink-100 print:text-black">{journal.title}</h2>
        <p className="mt-1 text-sm text-ink-400 print:text-black">{journal.subtitle}</p>
        <p className="mt-6 text-sm text-ink-500 print:text-black">
          Name ______________________________  Started ______________
        </p>

        {journal.pages.map((section) => (
          <div key={section.label}>
            {Array.from({ length: section.count }, (_, i) => (
              <div
                key={section.label + i}
                className="mt-6 break-before-page border-t border-space-700 pt-4 print:border-gray-300"
              >
                <p className="text-[11px] font-display uppercase tracking-widest text-ink-500 print:text-black">
                  {section.label} · {i + 1} of {section.count}
                </p>
                <div className="mt-2 space-y-3">
                  {section.lines.map((line) => (
                    <div key={line}>
                      <p className="text-xs text-ink-300 print:text-black">{line}</p>
                      <div className="mt-1 border-b border-space-600 print:border-gray-400" />
                    </div>
                  ))}
                </div>
                <div className="mt-3 h-48 rounded-lg border border-dashed border-space-600 print:h-56 print:border-gray-400" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
import { academyContent } from '../../content/academyContent.js';

const { journalFor = () => null, printoutFor = () => null } = academyContent().rewards;
const { SUBJECT_LABELS = {} } = academyContent().subjects;
