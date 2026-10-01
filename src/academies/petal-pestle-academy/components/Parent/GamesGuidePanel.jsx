// ---------------------------------------------------------------------------
// REVIEW GAMES — the weekly Kahoot / Blooket / Gimkit routine, written down
// where Gigi will find it (Sept 30 2026).
//
// Gigi: "can you create a guide … so I don't forget the steps" — then: "No,
// put it in the Grown-Up Corner." So it lives here, under Her day, beside her
// schedule, with a Print button for a paper copy.
//
// The routine itself (decided Sept 30): games follow her progress, one site a
// day, files made by Claude each week from her backup. See the project doc
// her-weekly-review-games.md. This screen only explains it; it stores nothing.
// ---------------------------------------------------------------------------

export const GAME_WEEK = [
  { day: 'Monday', site: 'Kahoot', game: 'Today’s game', holds: 'Her next lesson in each class that meets today, plus Math and Grammar unit questions.' },
  { day: 'Tuesday', site: 'Blooket', game: 'Today’s game', holds: 'Her next lesson in each class that meets today, plus Math and Grammar unit questions.' },
  { day: 'Wednesday', site: 'Gimkit', game: 'Today’s game', holds: 'Her next lesson in each class that meets today, plus Math and Grammar unit questions.' },
  { day: 'Thursday', site: 'Kahoot', game: 'Test prep (one per class)', holds: 'Every question her weekly test can pull from, plus earlier questions she has missed. Play it BEFORE the test.' },
  { day: 'Friday', site: 'Blooket', game: 'Redo', holds: 'The questions she has missed most, plus a few Math and Grammar.' }
];

export const UPLOAD_STEPS = [
  { site: 'Kahoot', file: '.xlsx', steps: ['Log in and choose Create.', 'Choose Add question, then Import spreadsheet.', 'Pick the .xlsx file for today and press Upload.', 'Save, then play in Solo / practice mode.'] },
  { site: 'Blooket', file: '.csv', steps: ['Log in and choose Create a set.', 'Choose CSV Import.', 'Pick the .csv file for today.', 'Save, then host a solo game she can play at her own pace.'] },
  { site: 'Gimkit', file: '.csv', steps: ['Log in and choose New Kit.', 'Choose Import from Spreadsheet.', 'Pick the .csv file for today.', 'Save, then start a solo game.'] }
];

const card = 'panel px-5 py-5';

export function GamesGuidePanel() {
  return (
    <div className="space-y-5">
      <section className={card}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg text-ink-900">Review games: the weekly routine</h2>
            <p className="mt-1 text-sm text-ink-700">
              Short Kahoot, Blooket and Gimkit games made from Azianna’s own lessons, so she practices the exact
              questions she is learning and being tested on.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print-hide rounded-full border border-sage-500 px-4 py-2 text-sm font-700 text-sage-700 hover:bg-sage-300/30"
          >
            🖨 Print this guide
          </button>
        </div>

        <h3 className="mt-5 font-display text-base text-ink-900">Every Monday (5 minutes)</h3>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-sm text-ink-700">
          <li>
            Save her work: <span className="font-700">Settings → Backup &amp; settings → Export / download backup</span>, or use the file
            she made with <span className="font-700">Send my work to Gigi</span>.
          </li>
          <li>Send that file to Claude and ask for <span className="font-700">“this week’s games for Azianna.”</span></li>
          <li>
            The week’s five games are saved on your computer in{' '}
            <span className="font-mono text-xs">learningos → Game Files → Week of (Monday’s date)</span>.
          </li>
          <li>
            When she finishes a Khan unit, enter the grade on the <span className="font-700">Khan grades</span> tab as usual. Claude
            reads it from the backup and writes questions for her next unit.
          </li>
        </ol>
      </section>

      <section className={card}>
        <h3 className="font-display text-base text-ink-900">One site a day</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-cream-300 text-[0.7rem] uppercase tracking-wide text-ink-500">
                <th className="py-2 pr-3">Day</th>
                <th className="py-2 pr-3">Site</th>
                <th className="py-2 pr-3">Game</th>
                <th className="py-2">What’s in it</th>
              </tr>
            </thead>
            <tbody>
              {GAME_WEEK.map((d) => (
                <tr key={d.day} className="border-b border-cream-200 align-top">
                  <td className="py-2 pr-3 font-700 text-ink-900">{d.day}</td>
                  <td className="py-2 pr-3 text-ink-900">{d.site}</td>
                  <td className="py-2 pr-3 text-ink-700">{d.game}</td>
                  <td className="py-2 text-ink-700">{d.holds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-ink-700">
          <li>
            <span className="font-700">The games follow her progress, not the calendar.</span> If she is behind in a class, her game covers
            the lesson she is actually on.
          </li>
          <li>
            <span className="font-700">Thursday:</span> upload only the test-prep games for the tests she will take that day. A test opens
            once she has read that week’s lessons.
          </li>
          <li>
            <span className="font-700">Math and Language Arts</span> questions are written for the Khan unit she is on.
          </li>
        </ul>
      </section>

      <section className={card}>
        <h3 className="font-display text-base text-ink-900">How to upload</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {UPLOAD_STEPS.map((s) => (
            <div key={s.site} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
              <p className="text-sm font-700 text-ink-900">
                {s.site} <span className="font-mono text-xs text-ink-500">{s.file}</span>
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-ink-700">
                {s.steps.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h3 className="font-display text-base text-ink-900">If something goes wrong</h3>
        <table className="mt-3 w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-cream-200 align-top">
              <td className="py-2 pr-3 font-700 text-ink-900">A site will not take the file</td>
              <td className="py-2 text-ink-700">
                On that site’s import screen, download its blank template and send it to Claude. The next files will match it.
              </td>
            </tr>
            <tr className="border-b border-cream-200 align-top">
              <td className="py-2 pr-3 font-700 text-ink-900">A game is too long for her</td>
              <td className="py-2 text-ink-700">Ask Claude for shorter games. The questions she has missed go in first.</td>
            </tr>
            <tr className="border-b border-cream-200 align-top">
              <td className="py-2 pr-3 font-700 text-ink-900">You forgot to send the backup</td>
              <td className="py-2 text-ink-700">Send it any day. The games are made from wherever she is that day.</td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-3 font-700 text-ink-900">Importing needs a paid plan</td>
              <td className="py-2 text-ink-700">Tell Claude which sites are free for you, and the rotation will use only those.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
