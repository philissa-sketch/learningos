import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildActionPlan, planRows } from '../../lib/actionPlan.js';
import { CONFIDENCE_LABEL, describeLevel, strandReading, RE_DIAGNOSTIC } from '../../engine/diagnosticEngine.js';

import {
  getStrand,
  SUBJECTS,
  strandLabel,
  READ_ALOUD_CHANGES_CONSTRUCT
} from '../../config/strands.js';
import { getItem, itemsForStrand } from '../../data/diagnostic/index.js';
import { exportAll } from '../../db/db.js';
import { RewardsPanel } from './RewardsPanel.jsx';
import { MessagesPanel } from './MessagesPanel.jsx';
import { SchedulePanel } from './SchedulePanel.jsx';
import { AnnualReportPanel } from './AnnualReportPanel.jsx';
import { GradebookPanel } from './GradebookPanel.jsx';
import { WritingPiecesPanel } from './WritingPiecesPanel.jsx';
import { GoalsPanel } from './GoalsPanel.jsx';
import { JournalMarkPanel } from './JournalMarkPanel.jsx';
import { BackupPanel } from '../../screens/GrownUpCorner/BackupPanel.jsx';
import { kindMeta } from '../../data/journal/journalPrompts.js';
import { previewImport, importBackup } from '../../db/db.js';
import { importVerdict, whenLabel } from '../../lib/importGuard.js';

import { GEORGIA, hoursSummary, subjectsWithNoHours } from '../../lib/hours.js';
import {
  PARENT_NAV,
  parentTabForView,
  parentSectionsFor,
  defaultParentViewFor
} from '../../config/navigation.js';
import { VERSION, BUILD_DATE, CHANGES } from '../../config/buildStamp.js';
import {
  KHAN_GRADEABLE_COURSES,
  KHAN_GRADE_LETTERS,
  KHAN_MASTERY_GUIDE,
  KIND_CHALLENGE,
  challengeFor,
  courseAverage,
  gradeAdvances,
  letterForPercent,
  parseScore,
  GRADE_SCALE_SUMMARY,
  percentFromFraction
} from '../../lib/khanGrade.js';
import { resolveBlockTarget } from '../../lib/blockLinks.js';
// v3.97 — what is waiting on her. Pure, so check-khan-waiting can call it.
import { khanWaiting, waitingReason } from '../../lib/khanWaiting.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';
// ⚠️ v3.94 — THE GRADING SCREEN HAD NO LINKS ON IT AT ALL.
//
// These three builders have existed since v3.19 and were used by AZIANNA'S
// screens only. This screen asked Gigi to copy a score off a Khan page it would
// not take her to — she had to go and find it herself, every time, for every
// unit. Gigi, Aug 29: "Where are the links to the reading and Vocabulary so that
// they can be graded?" There were none for any course.
//
// They are built from khanUnits.js, so a link here can never disagree with the
// unit name printed beside it — both come from the same confirmed record.
import { unitUrl, unitTestUrl, courseChallengeUrl } from '../../data/khan/khanUnits.js';
import {
  speechSupported,
  listVoices,
  getPreferredVoiceName,
  setPreferredVoiceName,
  speakChunks
} from '../../lib/speech.js';

/**
 * Human words for each table previewImport reports on.
 *
 * This is a LABEL map, not the list of what gets shown — the rows come from
 * whatever previewImport actually returns. A table missing from here still
 * appears, under its raw name. See the note beside `rows`.
 */
const PREVIEW_LABELS = {
  answers: 'Answers',
  strands: 'Strand results',
  journal: 'Journal entries',
  messages: 'Notes',
  ledger: 'Petal ledger',
  sittings: 'Sittings',
  scheduleDays: 'Days attended',
  attempts: 'Tests sat',
  lessonReads: 'Lessons read',
  reviewItems: 'Review cards',
  projects: 'Projects',
  khanGrades: 'Khan grades',
  writingMarks: 'Graded writing',
  requests: 'Seed requests',
  itemEvents: 'Answers she gave',
  baselines: 'Starting points',
  journalMarks: 'Journal marks'
};


/**
 * Everything the child's screens deliberately hide: the decimal levels, the
 * confidence rating on each, the accuracy, and every question she has answered
 * with what she picked.
 *
 * The one-page report at the top is the printable artefact. It is genuinely one
 * page — twelve rows, a header and a footnote — and it was checked at print
 * width rather than assumed.
 */

function ConfidencePill({ level }) {
  const tone =
    level === 'high'
      ? 'bg-sage-300/60 text-sage-700'
      : level === 'medium'
        ? 'bg-gold-300/60 text-gold-700'
        : 'bg-cream-200 text-ink-500';
  return (
    <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-700 ${tone}`}>
      {CONFIDENCE_LABEL[level]}
    </span>
  );
}

function OnePageReport({ rows, name, accuracy, answered, settled, total, readAloud }) {
  const printed = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return (
    <section className="print-content panel-white px-5 py-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-ink-900">Diagnostic Report</h2>
          <p className="text-xs text-ink-500">
            {name || 'Student'} · Petal &amp; Pestle Academy · {printed}
          </p>
        </div>
        <div className="text-right text-xs text-ink-700">
          <p>
            <span className="font-700">{settled}</span> of {total} strands settled
          </p>
          <p>
            <span className="font-700">{answered}</span> questions ·{' '}
            {accuracy == null ? '—' : `${Math.round(accuracy * 100)}% correct`}
          </p>
        </div>
      </div>

      <table className="mt-4 w-full border-collapse text-left text-[0.78rem]">
        <thead>
          <tr className="border-b-2 border-cream-300 text-ink-500">
            <th className="py-1.5 pr-2 font-700">Strand</th>
            <th className="py-1.5 pr-2 font-700">Level</th>
            <th className="py-1.5 pr-2 font-700">Confidence</th>
            <th className="py-1.5 pr-2 font-700">Asked</th>
            <th className="py-1.5 pr-2 font-700">Khan Academy: start here</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.strandId} className="border-b border-cream-300 align-top">
              <td className="py-1.5 pr-2">
                <span className="block font-700 text-ink-900">{row.strand}</span>
                <span className="text-[0.68rem] text-ink-500">{row.group}</span>
              </td>
              <td className="py-1.5 pr-2 tnum">
                {row.level == null ? '—' : row.level.toFixed(1)}
              </td>
              <td className="py-1.5 pr-2 text-[0.7rem]">{CONFIDENCE_LABEL[row.confidence]}</td>
              <td className="py-1.5 pr-2 tnum">
                {row.asked === 0 ? '—' : `${row.correct}/${row.asked}`}
              </td>
              <td className="py-1.5 pr-2">
                <span className="block text-ink-900">{row.course}</span>
                <span className="text-[0.68rem] text-ink-500">{row.unit}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---- READ ALOUD, PER STRAND. ----
           This paragraph used to name Reading Comprehension and Vocabulary and
           call everything else "good news" — from a list of two typed into this
           component. Grammar-Usage and Writing-Strategies were not on it, so a
           grown-up was told that hearing a GRAMMAR question aloud removes the
           reading load. The per-strand figures existed the whole time in
           readAloudByStrand() and no screen had ever shown them. ---- */}
      {readAloud.any && (
        <div className="mt-3 rounded-lg border border-cream-300 px-3 py-2 text-[0.68rem] leading-relaxed text-ink-700">
          <p>
            <span className="font-700">
              Read aloud was used on {readAloud.count} of {readAloud.total} questions.
            </span>{' '}
            {readAloud.elaCount > 0 ? (
              <>
                {readAloud.elaCount} of those were in Reading &amp; Writing strands, where hearing
                the question may change what was measured — treat those levels as partly{' '}
                <span className="font-700">listening</span> estimates. On maths strands it is good
                news: it removes a reading load that was never part of the point.
              </>
            ) : (
              <>
                None were in a Reading &amp; Writing strand, so every level here still means what it
                says — and hearing a maths question removes reading from a strand that was never
                meant to test it.
              </>
            )}
          </p>

          <table className="mt-2 w-full border-collapse text-left">
            <tbody>
              {readAloud.perStrand.map((s) => (
                <tr key={s.strandId} className="border-t border-cream-300">
                  <td className="py-1 pr-2">{s.label}</td>
                  <td className="tnum py-1 pr-2 text-right">
                    {s.readAloud} of {s.total}
                  </td>
                  <td className="py-1 pl-2 text-ink-500">
                    {s.changesConstruct ? 'may change what was measured' : 'removes reading load'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-2 text-ink-500">
            Which side a strand sits on is taken from its subject — every Reading &amp; Writing
            strand is treated as one where hearing the question matters. Whether that is right for
            Grammar and Writing is a judgement, not a measurement, and the counts are here so it can
            be made rather than assumed.
          </p>
        </div>
      )}

      <p className="mt-3 text-[0.65rem] leading-relaxed text-ink-500">
        Levels are grade-equivalent estimates from an adaptive staircase, not standardised test
        scores. A strand marked “Rough estimate” has had fewer than four questions and should be
        treated as a starting guess. Levels are expected to move.
      </p>
    </section>
  );
}

/**
 * VOICE PICKER.
 *
 * The app now prefers a known female voice for Dr. Marigold, because it was
 * picking a male one — on Windows the first English voice is usually Microsoft
 * David. That fix is a NAME LIST, and a name list can be wrong on a machine
 * nobody tested. This is the escape hatch: hear every voice the computer has and
 * pick one.
 *
 * Stored in localStorage rather than the database on purpose. It describes THIS
 * computer's installed voices, so it must not travel in the backup and land on a
 * machine where that voice does not exist.
 */
/**
 * WHAT VERSION IS THIS. The first thing in Settings, deliberately. When an
 * update does not seem to have landed, this is the answer — and it is a number
 * you can read back to me rather than an impression of whether something looks
 * different.
 */
function VersionPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-petal border-2 border-lavender-500 bg-lavender-300/20 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="label-caps">This app</p>
          <p className="mt-1 font-display text-2xl text-ink-900">Petal &amp; Pestle v{VERSION}</p>
          <p className="text-xs text-ink-700">Built {BUILD_DATE}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-lavender-500 bg-white px-4 py-1.5 text-xs font-700 text-lavender-700"
        >
          {open ? 'Hide' : 'What changed'}
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-700">
        If this number does not match the version you were told to expect, the update did not land —
        stop the app, replace the files, start it again, then press{' '}
        <span className="font-mono font-700">Ctrl+Shift+R</span> in the browser.
      </p>
      {open && (
        <div className="mt-3 max-h-64 space-y-3 overflow-y-auto pr-1">
          {CHANGES.map((c) => (
            <div key={c.version} className="rounded-xl bg-white px-3 py-2">
              <p className="text-xs font-700 text-ink-900">
                v{c.version} · {c.date}
              </p>
              <ul className="mt-1 list-disc pl-4 text-[0.7rem] leading-relaxed text-ink-700">
                {c.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VoicePanel() {
  const [voices, setVoices] = useState([]);
  const [chosen, setChosen] = useState(getPreferredVoiceName());

  useEffect(() => {
    if (!speechSupported()) return;
    const load = () => setVoices(listVoices());
    load();
    // Chrome populates the list asynchronously and fires this once ready.
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => window.speechSynthesis.removeEventListener?.('voiceschanged', load);
  }, []);

  if (!speechSupported()) {
    return (
      <div className="panel px-4 py-4">
        <h2 className="font-display text-base text-ink-900">Dr. Marigold’s voice</h2>
        <p className="mt-1 text-xs text-ink-700">
          This browser has no speech built in, so the read-aloud button will not appear. Chrome or
          Edge both have it.
        </p>
      </div>
    );
  }

  return (
    <div className="panel px-4 py-4">
      <h2 className="font-display text-base text-ink-900">Dr. Marigold’s voice</h2>
      <p className="mt-1 text-xs text-ink-700">
        She should sound like a woman. The app tries the female voices your computer has, but if it
        still sounds wrong, pick one here and press Try it.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <select
          value={chosen || ''}
          onChange={(e) => {
            const v = e.target.value || null;
            setChosen(v);
            setPreferredVoiceName(v);
          }}
          className="min-w-[14rem] flex-1 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-lavender-500"
        >
          <option value="">Let the app choose</option>
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} {v.local ? '' : '(needs internet)'}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() =>
            speakChunks([
              'Hello. I am Doctor Marigold. I look after people, and I grow the plants I learn from.'
            ])
          }
          className="rounded-full bg-lavender-500 px-5 py-2 text-sm font-700 text-white hover:bg-lavender-700"
        >
          🔊 Try it
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-500">
        This choice is saved on <em>this</em> computer only. If she uses the app on her own laptop,
        set it there too.
      </p>
      {voices.length === 0 && (
        <p className="mt-2 text-xs text-ink-500">
          No voices found yet — they sometimes take a second to load. Reopen this tab.
        </p>
      )}
    </div>
  );
}


/**
 * HER JOURNAL, FOR A GROWN-UP.
 *
 * Read-only, deliberately. There is no edit button and no correction tool on
 * this screen, because the moment a child discovers that a grown-up rewrites
 * her journal it stops being her journal. If something in here needs talking
 * about, the conversation happens at the table, not in the software.
 *
 * What this IS for: Phase 4's portfolio and the writing sample any records
 * requirement asks for. Print it straight from here.
 */
function JournalReview() {
  const journal = useAppStore((s) => s.journal);
  const totalWords = useAppStore((s) => s.journalWordTotal());
  const entries = [...journal].sort((a, b) => String(b.at).localeCompare(String(a.at)));
  const days = new Set(journal.map((e) => String(e.at).slice(0, 10))).size;

  if (journal.length === 0) {
    return (
      <div className="panel px-5 py-8 text-center">
        <p className="font-display text-base text-ink-900">She has not written anything yet.</p>
        <p className="mt-2 text-sm text-ink-700">
          The Journal is on her Journal tab. Two sentences counts as an entry, and the first one is
          the hard one.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Her writing</h2>
        <p className="mt-1 text-xs text-ink-700">
          Read-only on purpose — nothing here can be edited from this side. Print this page for a
          portfolio or a writing sample.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            ['Entries', journal.length],
            ['Days written', days],
            ['Words in all', totalWords]
          ].map(([label, value]) => (
            <div key={label} className="rounded-petal bg-cream-100 px-3 py-3 text-center">
              <p className="tnum font-display text-2xl text-ink-900">{value.toLocaleString()}</p>
              <p className="text-[0.7rem] uppercase tracking-wide text-ink-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-3">
        {entries.map((e) => (
          <article key={e.entryId} className="rounded-petal border border-cream-300 bg-white px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-700 text-ink-700">
                {kindMeta(e.kind).icon} {kindMeta(e.kind).label}
                <span className="ml-2 font-400 text-ink-500">
                  {new Date(e.at).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </p>
              <p className="tnum text-[0.7rem] text-ink-500">{e.words} words</p>
            </div>
            {e.prompt && (
              <p className="mt-2 border-l-2 border-sage-300 pl-3 text-xs italic text-ink-500">
                {e.prompt}
              </p>
            )}
            <p className="mt-2 whitespace-pre-wrap font-body text-sm leading-relaxed text-ink-900">
              {e.text}
            </p>
            {/* Two boxes, two purposes. The note is FEEDBACK and check-writing
                still fails the build if a score appears in it; the mark is a
                MARK and lives in its own component. Gigi drew that line and it
                survives her overturning the grading rule. */}
            <JournalNote entry={e} />
            <JournalMarkPanel entry={e} />
          </article>
        ))}
      </div>
    </div>
  );
}

/**
 * SAY SOMETHING BACK — v3.44.
 *
 * Gigi: "Her journal is entered but there isn't a way to grade it or give
 * feedback." And later, plainly: can the journal be graded by AI?
 *
 * ---- WHAT THIS IS, AND WHAT IT REFUSES TO BE ----
 *
 * FEEDBACK IS NOT GRADING. Gigi wrote that sentence herself in the backlog and
 * it is the whole design. This is a grown-up reading what a nine-year-old wrote
 * and saying something back to her. It is not a score, not a rubric, not a
 * correction, and there is nowhere here to put one.
 *
 * THE JOURNAL IS NEVER GRADED AND NEVER CORRECTED — locked since v3.38, stated
 * on her own screen in her own words ("Nobody marks this. Nobody corrects your
 * spelling."), and read as text by check-writing on every run. Nothing here
 * touches her entry. Her words are not editable from this side and never will
 * be: the moment a child finds out a grown-up rewrites her journal, it stops
 * being her journal.
 *
 * ---- WHY IT SENDS A NOTE RATHER THAN INVENTING A CHANNEL ----
 *
 * The app already has "Notes from Gigi and Mom", with a sender picker, a read
 * receipt, a place on her Home screen and a row in the backup. A second, nearly
 * identical delivery path would mean a new table, a database version, an export
 * change and an import change — four places to get wrong — to do a thing that
 * is already built. So the note goes where every other note from home goes, and
 * arrives looking like one, because that is what it is.
 *
 * ---- ON THE AI QUESTION ----
 *
 * There is no model here and no network call. Gigi asked to see this version
 * first. If a model is ever added it can only write a DRAFT into this same box
 * for her to edit and send — a grown-up stays between the machine and the child,
 * and the entry itself is still never scored.
 */
function JournalNote({ entry }) {
  const sendMessage = useAppStore((s) => s.sendMessage);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState('gigi');
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  async function send() {
    const body = text.trim();
    if (!body) return;
    // The date is included so a note arriving three days later still makes
    // sense to a child who has written four times since.
    const when = new Date(entry.at).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
    await sendMessage({ from, text: `About what you wrote on ${when} — ${body}` });
    setText('');
    setOpen(false);
    setSent(true);
  }

  if (sent && !open) {
    return (
      <p className="mt-3 rounded-petal bg-sage-300/25 px-3 py-2 text-xs font-700 text-ink-700">
        ✓ Sent to her Notes. She will see it on her Home screen.{' '}
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setOpen(true);
          }}
          className="underline"
        >
          Write another
        </button>
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 rounded-full border border-cream-300 bg-cream-100 px-3.5 py-1.5 text-xs font-700 text-ink-700 hover:border-lavender-500"
      >
        ✎ Say something back
      </button>
    );
  }

  return (
    <div className="mt-3 rounded-petal border-2 border-lavender-300 bg-lavender-300/10 px-3.5 py-3">
      <p className="text-xs font-700 text-ink-900">Say something back</p>
      <p className="mt-0.5 text-[0.7rem] text-ink-700">
        This goes to her Notes as a message from home. It is not a mark and it never appears on her
        entry — nothing you write here changes a word of what she wrote.
      </p>
      <div className="mt-2 flex gap-2">
        {[
          ['gigi', 'From Gigi'],
          ['mom', 'From Mom']
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFrom(id)}
            className={`rounded-full px-3 py-1 text-[0.7rem] font-700 ${
              from === id ? 'bg-lavender-500 text-white' : 'bg-white text-ink-700 border border-cream-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <textarea
        value={text}
        onChange={(ev) => setText(ev.target.value)}
        rows={3}
        placeholder="I loved the bit about the seed. What do you think happens next?"
        className="mt-2 w-full rounded-xl border border-cream-300 px-3 py-2 text-sm text-ink-900"
      />
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={send}
          disabled={!text.trim()}
          className="rounded-full bg-sage-700 px-4 py-1.5 text-xs font-700 text-white disabled:opacity-40"
        >
          Send it to her
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setText('');
          }}
          className="rounded-full border border-cream-300 px-3.5 py-1.5 text-xs font-700 text-ink-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


/**
 * RE-MEASURE A STRAND.
 *
 * The four strands that came back at the floor were not measurements — the item
 * bank had no question easy enough to find out where she actually was, so the
 * test walked uphill away from her and the number pinned. The easy band exists
 * now (levels 1.5 to 2.2), so those strands can be measured properly.
 *
 * Re-opening one strand leaves the other eight completely alone, and leaves her
 * answer history intact. A re-take should be visible as a re-take.
 */
function RemeasurePanel() {
  const strandList = useAppStore((s) => s.strandList());
  const reopen = useAppStore((s) => s.reopenStrand);
  const suspect = useAppStore((s) => s.strandsPinnedAtFloor());
  const dueNow = useAppStore((s) => s.reDiagnosticsDue());
  const [done, setDone] = useState([]);

  const suspectIds = new Set(suspect.map((s) => s.strandId));
  const strandLabel = (id) => getStrand(id)?.label || id;

  return (
    <section className="panel px-5 py-5">
      <h2 className="font-display text-lg text-ink-900">Re-measure a subject</h2>
      <p className="mt-1 text-xs text-ink-700">
        Re-opening one strand puts it back into the Check-In on its own. Every other strand, and her
        whole answer history, stays exactly as it is.
      </p>

      {/* THE RE-DIAGNOSTIC TRIGGER FIRING.
          Gigi declined a re-take on Aug 13 with good reason — school had started
          and Azianna was behind. That decision was recorded as permanent, which
          is this project's own tenth bug: a correct decision nobody revisited
          when the thing it was about changed. The way back is an EVENT, not a
          date: once she has read the Human Body modules that teach the thing the
          Check-In could not measure, the teaching has happened and re-measuring
          costs no school days. */}
      {dueNow.filter((d) => d.due).map((d) => (
        <div
          key={d.strandId}
          className="mt-3 rounded-petal border-2 border-sage-500/60 bg-sage-500/5 px-4 py-3"
        >
          <p className="text-sm font-700 text-ink-900">
            {strandLabel(d.strandId)} can be measured properly now
          </p>
          <p className="mt-1 text-xs text-ink-700">
            She has finished every lesson that teaches it. {d.trigger.why}
          </p>
          <p className="mt-1.5 text-xs text-ink-500">
            You paused this on {RE_DIAGNOSTIC.decidedOn} — {RE_DIAGNOSTIC.reason} That reason has
            run out, which is why this is here rather than settled.
          </p>
        </div>
      ))}

      {suspect.length > 0 && (
        <div className="mt-3 rounded-petal border-2 border-clay-500/50 bg-clay-500/5 px-4 py-3">
          <p className="text-sm font-700 text-ink-900">
            {suspect.length} result{suspect.length === 1 ? '' : 's'} inconclusive — never measured
          </p>
          <p className="mt-1 text-xs text-ink-700">
            These finished at the bottom of the old scale. At the time the easiest question in the
            app was harder than she needed, so the test could not find her level and the number
            settled at the floor. There are easier questions now — re-taking these will give a real
            number. It is about 8 questions each.
          </p>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {strandList
          .filter((s) => s.state && s.state.asked > 0)
          .map((s) => {
            const flagged = suspectIds.has(s.id);
            const reopened = done.includes(s.id) || !s.state.settled;
            return (
              <div
                key={s.id}
                className={`flex flex-wrap items-center justify-between gap-3 rounded-petal border px-4 py-3 ${
                  flagged ? 'border-clay-500/50 bg-clay-500/5' : 'border-cream-300 bg-white'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-700 text-ink-900">
                    {s.name}
                    {flagged && (
                      <span className="ml-2 rounded-full bg-clay-500 px-2 py-0.5 text-[0.65rem] font-700 text-white">
                        worth re-taking
                      </span>
                    )}
                  </p>
                  <p className="tnum text-xs text-ink-500">
                    level {s.state.level.toFixed(2)} · {s.state.correct} of {s.state.asked} right
                  </p>
                </div>
                {reopened ? (
                  <span className="text-xs font-700 text-sage-700">
                    open — it will come up in her next Check-In ✓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      reopen(s.id);
                      setDone((d) => [...d, s.id]);
                    }}
                    className="rounded-full border border-lavender-500 bg-white px-4 py-1.5 text-xs font-700 text-lavender-700 hover:bg-lavender-300/30"
                  >
                    Re-measure this
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}


/**
 * LOAD A BACKUP FROM THE OTHER COMPUTER.
 *
 * The app is built on one machine and used on another. Reviewing what needs
 * changing means seeing the real thing — her real levels, her real journal, her
 * real day — on the machine where the work happens.
 *
 * ---- THE WARNING IS THE IMPORTANT PART ----
 *
 * What lands here is a COPY, taken at the moment the file was saved. Nothing
 * typed on this computer travels back to hers. Without saying that plainly,
 * the obvious next thing a grandmother would do is write her granddaughter a
 * note on the review copy and wonder for a week why it never arrived.
 */
/**
 * THE HOURS LEDGER — Gigi's Georgia record.
 *
 * "Where are the hours counted for the Georgia standards? For a homeschool
 * record in Georgia this is not optional."
 *
 * Two things this screen must never do. It must not imply the number is
 * complete — it counts ticked blocks and cannot see a nature walk. And it must
 * not present itself as legal advice: it shows what the statute asks for, with
 * where that came from, and leaves the judgement to her.
 */
/**
 * KHAN GRADES — typed by a grown-up, because there is no honest way to read them.
 *
 * Gigi, §4.1: "No place to enter Khan Academy grades. Four of her subjects are
 * taught by Khan and none of that reaches the record. Without it the report
 * card is a quarter of her year."
 *
 * ONE CORRECTION TO HER NOTE, and it is worth stating rather than quietly
 * building around: it is THREE subjects, not four. Khan teaches Mathematics,
 * Reading, and Language Arts & Writing. Science and Social Studies moved to the
 * app at v3.5, when it turned out Khan's US science starts at 5th grade and it
 * has no elementary social studies at all.
 *
 * THE APP NEVER INVENTS A NUMBER HERE. Khan lives outside this app; a guessed
 * figure would end up on a transcript. So this is a form, and what it stores is
 * exactly what a grown-up typed.
 */
const KHAN_SUBJECTS = [
  { id: 'math', label: 'Mathematics' },
  { id: 'reading', label: 'Reading' },
  { id: 'writing', label: 'Language Arts & Writing' }
];

/**
 * KHAN GRADES — BUILT TO LAMAR'S SHAPE, v3.74.
 *
 * Gigi, Aug 24: "I want the grading to be exactly like Lamar's. I don't like
 * the dropdown that is currently there."
 *
 * Lamar's Mission Control does not have a form. `KhanAcademyMissionsCard.jsx`
 * shows EACH SKILL AS ITS OWN ROW with a verified link, a Mark Complete
 * button, and an inline A-F picker revealed beside it. Nothing is chosen from
 * a list before you can record anything — the work is already on the screen
 * and you grade it where it sits.
 *
 * So this is rows. Every unit of every course Azianna is in, in order, each
 * one showing whether it has been recorded and offering the picker if it has
 * not. The unit she is on right now is marked, because that is the one the
 * question is usually about.
 *
 * ---- WHY THIS REPLACED A FORM WITH A PERCENT BOX ----
 *
 * The old panel asked for a subject from a dropdown and a unit typed as free
 * text, and stored a percent. Three things wrong with that at once:
 *
 *   · the typed unit could not be matched to a real unit, so recording a grade
 *     never advanced her — the whole v3.74 bug;
 *   · the subject could be chosen separately from the unit, so the two could
 *     disagree about the same row;
 *   · and Khan does not show a percent on the screen Gigi is reading. It shows
 *     Mastered, Proficient, Familiar. Asking for a number she has to derive is
 *     asking her to do arithmetic that Lamar's app never asked for.
 */
function KhanGradesPanel() {
  const grades = useAppStore((s) => s.khanGrades);
  const strands = useAppStore((s) => s.strands);
  const addKhanGrade = useAppStore((s) => s.addKhanGrade);
  const removeKhanGrade = useAppStore((s) => s.removeKhanGrade);

  /** Which row is open for entry. Lamar's reveals on Mark Complete. */
  const [picking, setPicking] = useState(null);
  const [problem, setProblem] = useState('');

  /**
   * The fraction being typed on the open row. Gigi, Aug 24: "I'll type 8/10.
   * The app will make that into a percentage and a letter grade."
   */
  // ⚠️ ONE BOX, NOT TWO — v3.84. Gigi, Aug 26: "i want the format the same."
  //
  // v3.75 gave this two little number boxes, 8 and 10. Lamar's takes ONE, and
  // his reason is the one that matters: Khan's denominator is not constant
  // between units — 9/11, 8/10, 4/6 — so two boxes make her decide which number
  // goes where, every time. One box takes what is on the screen in front of her,
  // fraction or percentage, and `parseScore` works out which it is.
  const [score, setScore] = useState('');

  /** The letter as it stands, shown live while she types. Never stored from here. */
  const parsed = parseScore(score);
  const livePercent = parsed === null ? null : parsed.percent;
  const liveLetter = livePercent === null ? null : letterForPercent(livePercent);

  function openRow(key) {
    setPicking(key);
    setScore('');
    setProblem('');
  }

  const gradeFor = (courseId, n) =>
    grades.find((g) => g.courseId === courseId && Number(g.unitN) === Number(n));

  /**
   * WHERE HER THREE KHAN BLOCKS OPEN RIGHT NOW, resolved by the same function
   * the Planner uses — not a second copy of the rule.
   *
   * Gigi, Aug 23: "it is a new week and the links still have the same units
   * connected." The unit does not move with the calendar and never did. It
   * moves when a result is recorded here, and until v3.74 it did not move
   * then either.
   */
  const openNow = KHAN_SUBJECTS.map((s2) => ({
    ...s2,
    target: resolveBlockTarget({ subject: s2.id }, strands, grades)
  }));

  const onNow = new Set(
    openNow
      .filter((s2) => s2.target?.courseId && s2.target?.unitN)
      .map((s2) => `${s2.target.courseId}:${s2.target.unitN}`)
  );

  /**
   * v3.97 — EVERY COURSE STILL WAITING ON A RESULT, longest silence first.
   *
   * Derived here and rendered below, never computed inside the JSX: the rule is
   * in lib/khanWaiting.js where a check can call it, which is rule 10 and the
   * reason lib/gradebook.js exists.
   */
  const waiting = khanWaiting(grades, dayKeyOf());

  /**
   * `grade` is left undefined on the normal path so the writer works the letter
   * out from the fraction. It is passed only when Khan showed a word and there
   * is no fraction to type, or when Gigi overrides one.
   */
  async function mark(courseId, unitN, extra = {}) {
    // The fraction is still what gets STORED when she typed one — v3.75's rule,
    // keep what she observed and compute the conclusion every time it is shown.
    // A percentage typed straight in has no fraction behind it and stores none,
    // rather than having one invented from the percentage.
    const p = parseScore(score);
    const r = await addKhanGrade({
      courseId,
      unitN,
      correct: p?.correct ?? null,
      total: p?.total ?? null,
      percent: p?.percent ?? null,
      ...extra
    });
    if (!r.ok) {
      setProblem(r.reason);
      return;
    }
    setProblem('');
    setPicking(null);
    setScore('');
  }

  /**
   * Rows saved before v3.74 carry no course and no unit number, so nothing can
   * tell WHICH unit they finished. They are kept and shown, never deleted and
   * never guessed at — matching them by their text would mark a unit she never
   * sat as done, on a record that becomes a transcript.
   */
  const legacy = grades.filter((g) => !gradeAdvances(g));

  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Khan grades</h2>
        <p className="mt-1 text-xs text-ink-700">
          Khan is outside this app, so nothing here is read automatically — you record what her Khan
          screen says. This is what puts her three Khan subjects into the record, and it is the
          difference between a report card and a quarter of one.
        </p>

        {/* ---- THE STEP NOBODY HAD BEEN TOLD ABOUT — v3.74 ----
            Gigi looked at a new week and expected a new unit. The unit does not
            follow the calendar. It follows this screen. */}
        <div className="mt-3 rounded-petal border border-lavender-500/40 bg-lavender-500/10 px-4 py-3">
          <p className="text-xs font-700 text-ink-900">
            Recording a result here is what moves her on to the next unit.
          </p>
          <p className="mt-1 text-xs text-ink-700">
            Her Planner does not advance with the calendar. A new week does not change her unit —
            marking a unit complete does. When every unit in a course has a letter, her block offers
            the Course Challenge instead.
          </p>
          <ul className="mt-2 space-y-1">
            {openNow.map((s2) => (
              <li key={s2.id} className="text-[0.7rem] text-ink-700">
                <span className="font-700">{s2.label}:</span>{' '}
                {s2.target?.courseId
                  ? s2.target.detail || s2.target.label
                  : 'no Khan unit linked yet'}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- WAITING ON YOU — v3.97 ----------------------------------------
            Gigi, Sep 12 2026: "Reading and Language Arts isn’t correctly
            connected to Khan Academy. The lessons aren’t moving along."

            ⚠️ NOTHING WAS BROKEN. Her record held three Khan grades, all typed
            on Aug 29 — grammar unit 1, math2 units 1 and 2 — and NOT ONE for
            reading, ever. So Reading sat on Unit 1 correctly, and Grammar sat on
            Unit 2 correctly, for a fortnight.

            The box above has said "recording a result here is what moves her on"
            since v3.74. It is a true sentence that names no course, no unit and
            no date, so it reads as background. This says which one, and how long
            it has been sitting. The app already does exactly this for rewards
            and for goals; the one action that gates her whole week had nothing.

            It is not a warning and not a nag — no red, no count badge. The lock
            is explained in a sentence on screen, which is this screen's rule. */}
        {waiting.length > 0 && (
          <div className="mt-3 rounded-petal border border-gold-500/50 bg-gold-300/15 px-4 py-3">
            <p className="text-xs font-700 text-ink-900">
              Waiting on you · {waiting.length}
            </p>
            <p className="mt-1 text-[0.7rem] text-ink-700">
              She cannot move past these until a result is recorded below. This is not a late
              notice — it is just what the record currently says.
            </p>
            <ul className="mt-2 space-y-1.5">
              {waiting.map((w) => (
                <li key={w.courseId} className="text-[0.7rem] text-ink-700">
                  <span className="font-700 text-ink-900">{w.label}</span> · Unit {w.unitN} of{' '}
                  {w.unitCount} — {w.unitName}
                  <br />
                  <span className={w.neverRecorded ? 'text-clay-500' : 'text-ink-500'}>
                    {waitingReason(w)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ---- LAMAR'S LADDER, IN KHAN'S OWN WORDS ----
            Read off his disk: "Mastered=A, Proficient=A-/B+, Familiar 90-99%=B,
            Familiar 70-89%=C, below 70%=D". Printed here so Gigi is copying
            what is on the Khan screen rather than converting anything. */}
        <div className="mt-3 rounded-petal border border-cream-300 bg-cream-100 px-4 py-3">
          <p className="text-xs font-700 text-ink-900">
            The same ladder as Lamar’s Mission Control
          </p>
          <p className="mt-1 text-[0.7rem] text-ink-700">
            Read what Khan says on her screen and pick the letter beside it. The app never works the
            letter out for you — Khan has no way to tell it, so a number this app calculated would
            be a number this app invented.
          </p>
          <ul className="mt-2 grid gap-1 sm:grid-cols-2">
            {KHAN_MASTERY_GUIDE.map((row) => (
              <li key={row.says} className="text-[0.7rem] text-ink-700">
                Khan says <span className="font-700">{row.says}</span> →{' '}
                <span className="font-700 text-ink-900">{row.letters.join(' or ')}</span>
              </li>
            ))}
          </ul>
        </div>

        {problem && <p className="mt-3 text-xs text-clay-500">{problem}</p>}
      </section>

      {/* ---- A ROW PER UNIT. NO DROPDOWN. ---- */}
      {KHAN_GRADEABLE_COURSES.map((c) => {
        const recorded = c.units.filter((u) => gradeFor(c.courseId, u.n)).length;
        /* The line Lamar's report card prints — "5 Khan Academy units graded,
           86% average". Averaged over what is RECORDED, never over the whole
           course: a unit she has not sat is not a zero, and counting it as one
           would make an unfinished course look like a failing child. */
        const avg = courseAverage(c.courseId, grades);
        /* Beside the unit average, never inside it. Two instruments. */
        const challenge = challengeFor(c.courseId, grades);
        return (
          <section key={c.courseId} className="panel px-5 py-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-base text-ink-900">{c.label}</h2>
              {avg ? (
                <p className="flex items-center gap-2 text-xs text-ink-700">
                  <span className="rounded-petal border-2 border-sage-700 px-2 py-0.5 font-700 text-ink-900">
                    {avg.grade}
                  </span>
                  <span className="tnum">
                    {avg.percent}% average · {avg.units} of {c.units.length} units graded
                  </span>
                </p>
              ) : (
                <p className="text-xs text-ink-500 tnum">
                  Not yet graded · 0 of {c.units.length} units
                </p>
              )}
            </div>

            {c.graded === 'parent' && (
              <p className="mt-1 text-[0.7rem] text-clay-500">
                Khan built no tests for this course — its elementary Reading is themed reading with
                no assessments at all. A letter here is <span className="font-700">your</span> mark
                on her work, recorded as yours. It still moves her to the next unit.
              </p>
            )}

            <ul className="mt-3 space-y-1">
              {c.units.map((u) => {
                const g = gradeFor(c.courseId, u.n);
                const key = `${c.courseId}:${u.n}`;
                const isNow = onNow.has(key);
                return (
                  <li
                    key={key}
                    className={`rounded-petal border px-3 py-2 ${
                      isNow ? 'border-blush-500 bg-blush-300/15' : 'border-cream-200 bg-white'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="min-w-0 text-sm text-ink-900">
                        <span className="text-ink-500 tnum">Unit {u.n}</span> · {u.name}
                        {isNow && (
                          <span className="ml-2 rounded-full bg-blush-500 px-2 py-0.5 text-[0.6rem] font-700 text-white">
                            she is here
                          </span>
                        )}
                        {/* ---- v3.94 — GO AND LOOK AT THE WORK YOU ARE GRADING ----
                            A new tab, deliberately: Gigi keeps this screen open
                            beside Khan and types the score back into the row she
                            started from. Replacing the page would lose the row.
                            `rel` is set because target="_blank" without it hands
                            the opened page a handle on this one. */}
                        <span className="mt-1 flex flex-wrap items-center gap-3">
                          {unitUrl(c.courseId, u.n) && (
                            <a
                              href={unitUrl(c.courseId, u.n)}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[0.7rem] text-lavender-700 underline hover:no-underline"
                            >
                              open the unit on Khan ↗
                            </a>
                          )}
                          {unitTestUrl(c.courseId, u.n) ? (
                            <a
                              href={unitTestUrl(c.courseId, u.n)}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-[0.7rem] text-lavender-700 underline hover:no-underline"
                            >
                              unit test ↗
                            </a>
                          ) : (
                            /* Said out loud rather than left as an absence. Khan
                               built no test here, and a missing link with no
                               reason reads as a broken screen. */
                            <span className="text-[0.7rem] text-ink-500">no unit test on Khan</span>
                          )}
                        </span>
                      </span>

                      {g ? (
                        <span className="flex items-center gap-2">
                          <span className="rounded-full bg-sage-700 px-3 py-0.5 text-xs font-700 text-white">
                            {g.grade}
                          </span>
                          {/* The fraction she typed, kept beside the letter it
                              made. A letter with no working shown is a letter
                              nobody can check. */}
                          {Number.isFinite(Number(g.percent)) && (
                            <span className="text-[0.7rem] text-ink-700 tnum">
                              {Number.isFinite(Number(g.total))
                                ? `${g.correct}/${g.total} · ${g.percent}%`
                                : `${g.percent}%`}
                            </span>
                          )}
                          <span className="text-[0.7rem] text-ink-500 tnum">{g.at}</span>
                          <button
                            type="button"
                            onClick={() => removeKhanGrade(g.gradeId)}
                            className="text-[0.7rem] text-clay-500 hover:underline"
                          >
                            undo
                          </button>
                        </span>
                      ) : picking === key ? (
                        /* ---- TYPE WHAT KHAN PRINTED ----
                           Gigi, Aug 24: "I'll type 8/10. The app will make that
                           into a percentage and a letter grade." So the two
                           numbers are the entry, and the letter appears as she
                           types rather than after she saves — she can see what
                           the row is about to record before it records it. */
                        <span className="flex flex-wrap items-center gap-2">
                          <input
                            type="text"
                            inputMode="text"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            placeholder="8/10 or 82%"
                            aria-label={`How many she got right on Unit ${u.n}, as a fraction or a percentage`}
                            className="w-28 rounded-petal border border-cream-300 px-2 py-1 text-sm font-400 tnum text-ink-900"
                          />

                          {liveLetter ? (
                            <span className="text-xs font-700 text-ink-900 tnum">
                              = {livePercent}% · {liveLetter}
                            </span>
                          ) : (
                            <span className="text-[0.7rem] text-ink-500">
                              what Khan said she got
                            </span>
                          )}

                          <button
                            type="button"
                            disabled={!liveLetter}
                            onClick={() => mark(c.courseId, u.n)}
                            className="rounded-full bg-sage-700 px-4 py-1 text-xs font-700 text-white hover:bg-sage-500 disabled:opacity-40"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setPicking(null)}
                            className="text-[0.7rem] text-ink-500 hover:underline"
                          >
                            cancel
                          </button>

                          {/* ---- THE FALLBACK, AND IT IS SECOND ON PURPOSE ----
                              Khan prints a fraction on a unit test and a WORD on
                              a skill. When there is no fraction to type, the
                              letter is picked straight and `gradedFrom` records
                              that it was, so a transcript never has to guess
                              where a letter came from. */}
                          <span className="flex w-full flex-wrap items-center gap-1 pt-1">
                            <span className="text-[0.7rem] text-ink-500">
                              or Khan showed a word —
                            </span>
                            {KHAN_GRADE_LETTERS.map((letter) => (
                              <button
                                key={letter}
                                type="button"
                                onClick={() => mark(c.courseId, u.n, { grade: letter })}
                                className="rounded-full border border-cream-300 bg-white px-2 py-0.5 text-[0.7rem] font-700 text-ink-900 hover:border-sage-500 hover:bg-sage-700 hover:text-white"
                              >
                                {letter}
                              </button>
                            ))}
                          </span>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openRow(key)}
                          className="rounded-full bg-lavender-500 px-4 py-1 text-xs font-700 text-white hover:bg-lavender-700"
                        >
                          Mark complete
                        </button>
                      )}
                    </div>
                    {g?.note && (
                      <p className="mt-1 text-[0.7rem] text-ink-500">{g.note}</p>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* ---- THE COURSE CHALLENGE — v3.76 ----
                Gigi: "The unit tests are what is being graded by Khan Academy
                and the course challenge is the test after all the units are
                completed." It had nowhere to live: eight unit rows and no ninth,
                so the one cumulative result in the course could not be recorded
                at all, and would not have reached the annual progress report.

                It sits apart from the units on purpose. It is not averaged with
                them — a cumulative test covers the same material a second time,
                and folding it in would let one sitting outweigh the eight that
                led to it. Both are recorded. Neither is the other. */}
            {c.courseChallenge ? (
              <div className="mt-3 rounded-petal border-2 border-dashed border-cream-300 bg-cream-100 px-3 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm text-ink-900">
                    📘 <span className="font-700">Course Challenge</span>
                    <span className="ml-2 text-[0.7rem] text-ink-500">
                      the whole course, after the units
                    </span>
                    {/* v3.94 — same reason as the unit links above. */}
                    {courseChallengeUrl(c.courseId) && (
                      <span className="mt-1 block">
                        <a
                          href={courseChallengeUrl(c.courseId)}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-[0.7rem] text-lavender-700 underline hover:no-underline"
                        >
                          open the Course Challenge on Khan ↗
                        </a>
                      </span>
                    )}
                  </span>

                  {challenge ? (
                    <span className="flex items-center gap-2">
                      <span className="rounded-full bg-lavender-500 px-3 py-0.5 text-xs font-700 text-white">
                        {challenge.grade}
                      </span>
                      {Number.isFinite(Number(challenge.percent)) && (
                        <span className="text-[0.7rem] text-ink-700 tnum">
                          {Number.isFinite(Number(challenge.total))
                            ? `${challenge.correct}/${challenge.total} · ${challenge.percent}%`
                            : `${challenge.percent}%`}
                        </span>
                      )}
                      <span className="text-[0.7rem] text-ink-500 tnum">{challenge.at}</span>
                      <button
                        type="button"
                        onClick={() => removeKhanGrade(challenge.gradeId)}
                        className="text-[0.7rem] text-clay-500 hover:underline"
                      >
                        undo
                      </button>
                    </span>
                  ) : picking === `${c.courseId}:challenge` ? (
                    <span className="flex flex-wrap items-center gap-2">
                      <input
                            type="text"
                            inputMode="text"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            placeholder="8/10 or 82%"
                            aria-label={`How many she got right on the ${c.label} Course Challenge, as a fraction or a percentage`}
                            className="w-28 rounded-petal border border-cream-300 px-2 py-1 text-sm font-400 tnum text-ink-900"
                          />
                      {liveLetter && (
                        <span className="text-xs font-700 text-ink-900 tnum">
                          = {livePercent}% · {liveLetter}
                        </span>
                      )}
                      <button
                        type="button"
                        disabled={!liveLetter}
                        onClick={() => mark(c.courseId, null, { kind: KIND_CHALLENGE })}
                        className="rounded-full bg-sage-700 px-4 py-1 text-xs font-700 text-white hover:bg-sage-500 disabled:opacity-40"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setPicking(null)}
                        className="text-[0.7rem] text-ink-500 hover:underline"
                      >
                        cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openRow(`${c.courseId}:challenge`)}
                      className="rounded-full border-2 border-lavender-500 px-4 py-1 text-xs font-700 text-lavender-700 hover:bg-lavender-500 hover:text-white"
                    >
                      Record the Course Challenge
                    </button>
                  )}
                </div>

                {/* ⚠️ KHAN AND THIS APP DISAGREE ABOUT WHEN SHE MAY SIT IT, AND
                    THAT IS DELIBERATE. Khan offers the Course Challenge at any
                    time — her 2nd Grade Math screenshot shows it already "in
                    progress" with six units untouched. This app holds her block
                    on Unit 1 until the units are graded, which was the v3.20 fix
                    for "maths skips to unit 6". Recording it early is allowed;
                    pretending the units are done is not. */}
                {!challenge && recorded < c.units.length && (
                  <p className="mt-1 text-[0.7rem] text-ink-500">
                    Khan lets her take this whenever she likes — you can record it now. It will not
                    mark the {c.units.length - recorded} unrecorded{' '}
                    {c.units.length - recorded === 1 ? 'unit' : 'units'} as done.
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-[0.7rem] text-ink-500">
                Khan built no Course Challenge for this course, so there is nothing to record here.
              </p>
            )}
          </section>
        );
      })}

      {legacy.length > 0 && (
        <section className="panel px-5 py-5">
          <h2 className="font-display text-base text-ink-900">Recorded before v3.74</h2>
          <p className="mt-1 text-[0.7rem] text-ink-700">
            These are on her record and they are not lost. But they were saved when the unit was
            typed rather than picked, so nothing can tell which unit they finished —{' '}
            <span className="font-700">they do not advance her.</span> Guessing the unit from the
            words would mark a unit she never sat as done. Mark that unit complete above and this
            row can be removed.
          </p>
          <ul className="mt-3 space-y-1">
            {legacy.map((g) => (
              <li
                key={g.gradeId}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-200 py-1.5 last:border-0"
              >
                <span className="text-sm text-ink-900">
                  <span className="text-ink-500 tnum">{g.at}</span> · {g.unit}
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-xs font-700 text-ink-700 tnum">
                    {g.grade || (Number.isFinite(Number(g.percent)) ? `${g.percent}%` : '—')}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeKhanGrade(g.gradeId)}
                    className="text-[0.7rem] text-clay-500 hover:underline"
                  >
                    remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-[0.7rem] leading-relaxed text-ink-500">
        The letter lives here, in the record. Her own screen shows a band and never a letter — the
        same rule as every test in this app.
      </p>
    </div>
  );
}

function HoursPanel() {
  const scheduleDays = useAppStore((s) => s.scheduleDays);
  const blocks = useAppStore((s) => s.scheduleBlocks);
  const summary = hoursSummary({ scheduleDays, blocks });
  const missing = subjectsWithNoHours(summary);
  const recent = [...summary.rows].reverse().slice(0, 20);

  const pct = (n, of) => Math.min(100, Math.round((n / of) * 100));

  return (
    <div className="space-y-4">
      <section className="panel px-5 py-5">
        <h2 className="font-display text-lg text-ink-900">Hours and days — the Georgia record</h2>
        <p className="mt-1 text-xs text-ink-700">
          Georgia asks for the equivalent of <span className="font-700">180 days</span>, each of at
          least <span className="font-700">four and a half hours</span>, covering reading, language
          arts, mathematics, social studies and science. You keep this record yourself — it is not
          submitted to anybody.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-petal border border-cream-300 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-ink-500">Qualifying days</p>
            <p className="mt-1 font-display text-2xl text-ink-900 tnum">
              {summary.daysMeetingRequirement}
              <span className="text-base text-ink-500"> / {GEORGIA.daysPerYear}</span>
            </p>
            <div className="mt-2 h-2 rounded-full bg-cream-200">
              <div
                className="h-2 rounded-full bg-sage-600"
                style={{ width: pct(summary.daysMeetingRequirement, GEORGIA.daysPerYear) + '%' }}
              />
            </div>
            <p className="mt-2 text-[0.7rem] text-ink-500">
              {summary.daysWithWork} day{summary.daysWithWork === 1 ? '' : 's'} had school on them.
              A day counts toward the 180 once it reaches {GEORGIA.hoursPerDay} hours.
            </p>
          </div>

          <div className="rounded-petal border border-cream-300 bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-ink-500">Hours recorded</p>
            <p className="mt-1 font-display text-2xl text-ink-900 tnum">
              {summary.hours.toFixed(1)}
              <span className="text-base text-ink-500"> / {GEORGIA.hoursPerYear}</span>
            </p>
            <div className="mt-2 h-2 rounded-full bg-cream-200">
              <div
                className="h-2 rounded-full bg-lavender-500"
                style={{ width: pct(summary.hours, GEORGIA.hoursPerYear) + '%' }}
              />
            </div>
            <p className="mt-2 text-[0.7rem] text-ink-500">
              {summary.hoursRemaining.toFixed(1)} hours still to go this year.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-3">
          <p className="text-xs font-700 text-ink-900">This counts ticked blocks, and nothing else.</p>
          <p className="mt-1 text-xs text-ink-700">
            A nature walk, an afternoon in the garden, a trip to the library or a lesson done on
            paper will not appear here unless the block was ticked off on her Today screen. If this
            number looks low, the likeliest reason is that she did the work and nobody ticked it —
            not that she is behind.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-5">
        <h2 className="font-display text-base text-ink-900">
          The five subjects the law names
        </h2>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {summary.perStatuteSubject.map((row) => (
              <tr key={row.statute} className="border-b border-cream-200 last:border-0">
                <td className="py-1.5 font-700 text-ink-900">{row.statute}</td>
                <td className="py-1.5 text-right tnum text-ink-900">{row.hours.toFixed(1)} h</td>
                <td className="py-1.5 pl-3 text-right text-[0.7rem] text-ink-500">
                  {row.from.join(' + ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {missing.length > 0 && (
          <p className="mt-3 rounded-petal bg-clay-500/10 px-3 py-2 text-xs text-ink-700">
            <span className="font-700">Nothing recorded yet for {missing.join(', ')}.</span> The
            annual progress report has to cover all five, and the useful time to notice that is now
            rather than in June.
          </p>
        )}
      </section>

      <section className="panel px-5 py-5">
        <h2 className="font-display text-base text-ink-900">Day by day</h2>
        <p className="mt-1 text-xs text-ink-500">Most recent first. Print this page for your file.</p>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-ink-700">
            No days recorded yet. Days appear here as blocks get ticked off on her Today screen.
          </p>
        ) : (
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-cream-300 text-left text-xs uppercase tracking-wide text-ink-500">
                <th className="py-1.5">Day</th>
                <th className="py-1.5 text-right">Hours</th>
                <th className="py-1.5 text-right">Blocks</th>
                <th className="py-1.5 text-right">Counts toward 180</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((row) => (
                <tr key={row.dayKey} className="border-b border-cream-200 last:border-0">
                  <td className="py-1.5 text-ink-900">{row.dayKey}</td>
                  <td className="py-1.5 text-right tnum text-ink-900">
                    {(row.minutes / 60).toFixed(1)}
                  </td>
                  <td className="py-1.5 text-right tnum text-ink-500">{row.blocksTicked}</td>
                  <td className="py-1.5 text-right">
                    {row.metRequirement ? (
                      <span className="text-sage-700">yes</span>
                    ) : (
                      <span className="text-ink-500">short</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <p className="text-[0.7rem] leading-relaxed text-ink-500">
        Requirement checked Aug 16 2026 against HSLDA’s summary of O.C.G.A. § 20-2-690 and the
        Georgia Home Education Association. Attendance is no longer reported to the state — it is
        kept in your own file. This screen is a record, not legal advice.
      </p>
    </div>
  );
}

function ImportPanel() {
  const hydrate = useAppStore((s) => s.hydrate);
  const [preview, setPreview] = useState(null);
  const [payload, setPayload] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [dropped, setDropped] = useState(null);
  // What the guard decided about the file currently in hand, and — for the file
  // picker only — whether she has agreed to it anyway.
  const [verdict, setVerdict] = useState(null);
  const [refusal, setRefusal] = useState(null);
  const [agreed, setAgreed] = useState(false);

  // Is there an export sitting in the app folder, put there for me?
  //
  // WHY THIS EXISTS. Sending the export to me in the chat lets ME read it. It
  // does nothing to the app on this computer — the two are not connected, and
  // there is no reason anyone would guess otherwise. So the file now gets
  // written into the app's own folder, and loading it is one button rather than
  // a hunt through Downloads for a file with a long name.
  //
  // ---- DEVELOPMENT ONLY, SINCE v3.72 ----
  //
  // The file this asks for is her real data. It used to sit in `public/`, and
  // everything in public/ is copied into the built site — so publishing the app
  // anywhere would have put her learner name, her nine measured levels, 74
  // answers and her journal entries at a public web address.
  //
  // It lives in `local/` now and the dev server hands it over (see the plugin in
  // vite.config.js). `import.meta.env.DEV` is false in a build, so the PUBLISHED
  // app never asks for it and never shows the green button. "Or open a file
  // yourself" is unaffected and is how the backup is loaded on her Chromebook.
  useEffect(() => {
    if (!import.meta.env.DEV) return undefined;
    let alive = true;
    fetch('/her-latest-export.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || d.app !== 'Petal & Pestle Academy') return;
        const name = (d.meta || []).find((m) => m.key === 'learnerName')?.value;
        const last = (d.answers || []).reduce((m, a) => Math.max(m, a.at || 0), 0);
        setDropped({ data: d, name, answers: (d.answers || []).length, last });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // ---- THE GREEN BUTTON REFUSES. GIGI'S CALL, Aug 19. ----
  //
  // This button offers ONE file that the app chose to put in front of her. There
  // is no reason to offer a file that can only take her backwards, so when the
  // guard blocks it, nothing is previewed and nothing is staged — the panel says
  // what the file is and why it was not taken.
  //
  // The refusal is not the end of the road: "Or open a file yourself" is three
  // inches below and it will load this same file after a confirmation. Refusing
  // here removes the ACCIDENT, not the option.
  async function loadDropped() {
    if (!dropped) return;
    setError(null);
    setRefusal(null);
    try {
      const p = await previewImport(dropped.data);
      const v = importVerdict(p);
      if (v.blocked) {
        setRefusal(v);
        setPreview(null);
        setPayload(null);
        return;
      }
      setVerdict(v);
      setAgreed(false);
      setPayload(dropped.data);
      setPreview(p);
    } catch (err) {
      setError(err?.message || 'That file could not be read.');
    }
  }

  // ---- THE PICKER WARNS AND NEVER REFUSES. ----
  //
  // Choosing a file by hand is a deliberate act. A grown-up who has decided to
  // restore an older backup is allowed to, so this path shows the same verdict
  // and asks her to agree to it rather than blocking her.
  async function onFile(e) {
    const file = e.target.files?.[0];
    setError(null);
    setResult(null);
    setPreview(null);
    setPayload(null);
    setRefusal(null);
    setVerdict(null);
    setAgreed(false);
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const p = await previewImport(data);
      setVerdict(importVerdict(p));
      setPayload(data);
      setPreview(p);
    } catch (err) {
      setError(err?.message || 'That file could not be read.');
    }
  }

  async function apply() {
    if (!payload || busy) return;
    setBusy(true);
    try {
      const r = await importBackup(payload);
      await hydrate();
      setResult(r);
      setPreview(null);
      setPayload(null);
      setVerdict(null);
      setAgreed(false);
    } catch (err) {
      setError(err?.message || 'The import did not finish.');
    }
    setBusy(false);
  }

  // ---------------------------------------------------------------------------
  // THE ROWS ARE DERIVED FROM THE PREVIEW, NOT TYPED OUT BESIDE IT.
  //
  // This was a hand-written list of SEVEN. previewImport described eleven, and
  // importBackup merged fifteen. So the screen a grown-up reads before pressing
  // the button showed less than half of what the button was about to do — and
  // the tables it left out were her PROJECTS, her KHAN GRADES and her GRADED
  // WRITING. Sixteen fortnights of work a year, four subjects' worth of marks,
  // and every piece of writing that enters a Georgia record: all merged behind
  // a summary that never named them.
  //
  // Two hand-maintained lists and one function, none of them agreeing. Every
  // hand-typed list in this project has drifted. This one now walks whatever
  // previewImport returns, so a table added tomorrow appears here tomorrow.
  //
  // A KEY WITH NO LABEL IS SHOWN, NOT HIDDEN. Falling back to the raw table
  // name is ugly on purpose: ugly gets fixed, and silently absent does not.
  // ---------------------------------------------------------------------------
  const rows = preview
    ? Object.entries(preview)
        .filter(([, v]) => v && typeof v === 'object' && typeof v.incoming === 'number')
        .map(([key, v]) => [
          PREVIEW_LABELS[key] || key,
          // `strands` counts what it will REPLACE rather than what is new — a
          // strand result is overwritten by whichever machine answered more of
          // it, never appended.
          { incoming: v.incoming, new: v.new ?? v.willReplace ?? 0 }
        ])
    : [];

  return (
    <section className="panel px-5 py-5">
      {/* ---- BACKLOG §1.4, in Gigi's words: "I don't understand the 'load her
           data' tab." If the person it was built for cannot tell what it does,
           it does not work.

           The old copy opened with a CORRECTION — "sending her export to me in
           the chat does not put it into this app" — which answers a mistake
           somebody made once and never says what the screen is FOR. Rewritten
           to answer the three questions in order: what the file is, where it
           comes from, and what happens after. ---- */}
      <h2 className="font-display text-lg text-ink-900">Bring her work onto this computer</h2>
      <p className="mt-2 text-sm text-ink-700">
        <span className="font-700">Her app keeps everything on HER laptop.</span> This screen copies
        it onto yours, so you can see what she has done without standing over her shoulder.
      </p>

      <ol className="mt-3 space-y-2 text-sm text-ink-700">
        <li>
          <span className="font-700">1 · On her laptop</span> — Grown-Up Corner → Settings →{' '}
          <span className="font-700">Export / download backup</span>. That saves one file into her
          Downloads folder. Its name ends in <span className="font-mono text-xs">.json</span>.
        </li>
        <li>
          <span className="font-700">2 · Get that one file over here</span> — email it to yourself,
          or carry it on a memory stick. It is just a file.
        </li>
        <li>
          <span className="font-700">3 · Drop it in below.</span>
        </li>
      </ol>

      <p className="mt-3 text-sm text-ink-700">
        <span className="font-700">Then her work appears on this screen</span> — her levels, her
        lessons, her journal, her greenhouse and the days she has done. Nothing already here is
        deleted or written over, and loading the same file twice adds nothing the second time.
      </p>

      <div className="mt-3 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-4 py-3">
        {/* ---- ⚠️ THIS PANEL USED TO SAY SOMETHING FALSE. Aug 19. ----

             It read: "a note written here will never reach her. To send her
             something, write it on her computer."

             Gigi: "I left a message on her journals. Where would she see them?"
             The answer was nowhere — but not for the reason the screen gave.
             THE MECHANISM ALREADY WORKED: exportAll ships messages,
             importBackup merges them, and a fresh note arrives on a machine
             that has never seen it. Nobody had ever used it in that direction,
             so the screen described the habit as though it were a limit.

             A screen that tells a grown-up the app CANNOT do something it can
             is the same class of error as one that claims a thing is not
             recorded when it is — it just costs her a feature instead of the
             truth. ---- */}
        <p className="text-xs font-700 text-ink-900">This makes a copy, not a connection.</p>
        <p className="mt-1 text-xs text-ink-700">
          What lands here is a snapshot from the moment that file was saved. Nothing travels
          between the two computers on its own — <span className="font-700">but it goes both
          ways.</span> A note you write here reaches her the same way her work reaches you: as a
          file somebody carries across.
        </p>
        <p className="mt-2 text-xs text-ink-700">
          <span className="font-700">To send her a note:</span> write it in Notes, then{' '}
          <span className="font-700">Export / download backup</span> on this computer, put that
          file on her laptop, and load it there. It will show up on her Home screen.
        </p>
      </div>

      {dropped && (
        <div className="mt-4 rounded-petal border-2 border-sage-500 bg-sage-300/20 px-4 py-4">
          <p className="text-sm font-700 text-ink-900">
            Her latest export is already in the app folder
          </p>
          <p className="mt-1 text-xs text-ink-700">
            {dropped.name ? `${dropped.name} · ` : ''}
            {dropped.answers} answers
            {dropped.last
              ? ` · saved ${new Date(dropped.last).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric'
                })}`
              : ''}
          </p>
          <button
            type="button"
            onClick={loadDropped}
            className="mt-3 rounded-full bg-sage-700 px-5 py-2 text-sm font-700 text-white hover:bg-sage-500"
          >
            Load her latest export
          </button>
        </div>
      )}

      <p className="mt-4 label-caps">Or open a file yourself</p>
      <input
        type="file"
        accept="application/json,.json"
        onChange={onFile}
        className="mt-4 block w-full text-sm text-ink-700 file:mr-3 file:rounded-full file:border-0 file:bg-lavender-500 file:px-5 file:py-2 file:text-sm file:font-700 file:text-white hover:file:bg-lavender-700"
      />

      {error && (
        <p className="mt-3 rounded-petal bg-clay-500/10 px-3 py-2 text-xs text-clay-500">{error}</p>
      )}

      {refusal && (
        <div className="mt-4 rounded-petal border-2 border-clay-500 bg-clay-500/10 px-4 py-4">
          <p className="text-sm font-700 text-ink-900">Not loaded — {refusal.headline}</p>
          <p className="mt-1 text-xs text-ink-700">{refusal.reason}</p>
          <p className="mt-2 tnum text-xs text-ink-500">
            {whenLabel(refusal.newestInFile)
              ? `Newest work in that file: ${whenLabel(refusal.newestInFile)}.`
              : 'That file holds no answers.'}{' '}
            {whenLabel(refusal.newestHere)
              ? `Newest work already here: ${whenLabel(refusal.newestHere)}.`
              : ''}
          </p>
          {refusal.protectedStrands.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-ink-700">
              {refusal.protectedStrands.map((s) => (
                <li key={s.strandId} className="tnum">
                  <span className="font-700">{s.strandId}</span> — keeping{' '}
                  {Number(s.keptLevel).toFixed(2)} from the {s.keptAsked} questions still being
                  asked here, not {Number(s.fileLevel).toFixed(2)} from the {s.fileAsked} in the
                  file.
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-500">
            If you meant to load it anyway, use <span className="font-700">Or open a file
            yourself</span> below — it will ask you to confirm.
          </p>
        </div>
      )}

      {preview && (
        <div className="mt-4 rounded-petal border border-cream-300 bg-white px-4 py-4">
          <p className="text-sm font-700 text-ink-900">
            {preview.learnerName ? `This file is ${preview.learnerName}'s.` : 'Ready to load.'}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            Nothing here is deleted or overwritten — this adds what is missing.
          </p>

          {verdict && verdict.headline && (
            <div className="mt-3 rounded-petal border-2 border-gold-500 bg-gold-300/20 px-3 py-3">
              <p className="text-xs font-700 text-ink-900">{verdict.headline}</p>
              <p className="mt-1 text-xs text-ink-700">{verdict.reason}</p>
              {verdict.protectedStrands.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-ink-700">
                  {verdict.protectedStrands.map((s) => (
                    <li key={s.strandId} className="tnum">
                      <span className="font-700">{s.strandId}</span> — keeping{' '}
                      {Number(s.keptLevel).toFixed(2)}, not {Number(s.fileLevel).toFixed(2)}.
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <table className="mt-3 w-full text-xs">
            <tbody>
              {rows.map(([label, v]) => (
                <tr key={label} className="border-t border-cream-300">
                  <td className="py-1.5 text-ink-700">{label}</td>
                  <td className="tnum py-1.5 text-right text-ink-500">{v.incoming} in the file</td>
                  <td className="tnum py-1.5 text-right font-700 text-sage-700">
                    {v.new} new here
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* A blocked file loads only after she says so IN THIS SESSION. The
              tick is not remembered — agreeing once must not make the next
              older file quietly acceptable. */}
          {verdict?.blocked && (
            <label className="mt-4 flex items-start gap-2 rounded-petal bg-cream-300/40 px-3 py-2 text-xs text-ink-700">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <span>{verdict.confirmLabel}</span>
            </label>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={apply}
              disabled={busy || (verdict?.blocked && !agreed)}
              className="rounded-full bg-blush-500 px-6 py-2.5 text-sm font-700 text-white hover:bg-blush-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? 'Loading…' : 'Load it in'}
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-4 rounded-petal border-2 border-sage-500 bg-sage-300/20 px-4 py-4">
          <p className="text-sm font-700 text-ink-900">Loaded ✓</p>
          <p className="mt-1 text-xs text-ink-700">
            Added {result.answers.new} answers, {result.strands.willReplace} strand results,{' '}
            {result.journal.new} journal entries and {result.messages.new} notes. Her levels are on
            My Levels, her Khan units are on My Plan, and the Re-measure tab now lists her strands.
          </p>
          <p className="mt-2 text-xs text-ink-500">
            Loading the same file again is safe — it would add nothing the second time.
          </p>
        </div>
      )}
    </section>
  );
}

export function ParentDashboard({ onExit }) {
  const strands = useAppStore((s) => s.strands);
  const answers = useAppStore((s) => s.answers);
  const sittings = useAppStore((s) => s.sittings);
  const name = useAppStore((s) => s.learnerName);
  const accuracy = useAppStore((s) => s.overallAccuracy());
  const progress = useAppStore((s) => s.progress());
  const resetAll = useAppStore((s) => s.resetAll);
  // Written at v3.55, rendered by nothing until Aug 19.
  const byStrand = useAppStore((s) => s.readAloudByStrand());
  // ⚠️ v3.93 — THIS LINE WAS MISSING AND IT TOOK THE WHOLE SCREEN DOWN.
  //
  // v3.92 changed `buildActionPlan(strands)` to `buildActionPlan(strands, grades)`
  // in three files by matching the same text in each. In HomeDashboard and
  // PlanView a selector was added beside it. HERE IT WAS NOT — and there IS a
  // `grades` in this file, at line 798, inside KhanGradesPanel. A different
  // component. So the edit read as correct and threw ReferenceError at render.
  //
  // The Grown-Up Corner is where she records a Khan grade, marks the journal
  // and takes a backup. It was down on the live site until she opened it.
  const khanGrades = useAppStore((s) => s.khanGrades);

  const [tab, setTab] = useState('report');
  const [confirmText, setConfirmText] = useState('');

  const plan = buildActionPlan(strands, khanGrades);
  const rows = planRows(plan);

  // Read-aloud usage, split by whether it landed on a strand where hearing the
  // question changes what was measured or a strand where it simply removes
  // reading load that was never part of the point.
  //
  // THE LIST IS DERIVED (config/strands.js), NOT TYPED HERE. It used to be two
  // strand ids written inline in this component, missing Grammar-Usage and
  // Writing-Strategies — so the report called read-aloud on a grammar question
  // "good news". Nine of her forty-two read-aloud answers are in those two.
  //
  // AND THE PER-STRAND BREAKDOWN IS NOW PASSED IN. readAloudByStrand() has
  // existed and correct since it was written, with ZERO consumers — the fourth
  // thing in this app to be built right and rendered nowhere.
  const readAloudSummary = (() => {
    const count = answers.filter((a) => a.readAloud).length;
    const elaCount = answers.filter(
      (a) => a.readAloud && READ_ALOUD_CHANGES_CONSTRUCT.includes(a.strandId)
    ).length;
    const perStrand = Object.entries(byStrand)
      .filter(([, v]) => v.readAloud > 0)
      .map(([strandId, v]) => ({
        strandId,
        label: strandLabel(strandId),
        readAloud: v.readAloud,
        total: v.total,
        changesConstruct: READ_ALOUD_CHANGES_CONSTRUCT.includes(strandId)
      }))
      .sort((a, b) => b.readAloud - a.readAloud);
    return { any: count > 0, count, elaCount, total: answers.length, perStrand };
  })();

  async function handleExport() {
    const data = await exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `petal-pestle-backup-${/* LearningOS, Sept 23 2026: her LOCAL date, not UTC — after 8pm Eastern UTC is already tomorrow. */ dayKeyOf()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const pendingCount = useAppStore((s) => s.pendingRequests().length);
  const journalCount = useAppStore((s) => s.journal.length);
  const floorCount = useAppStore((s) => s.strandsPinnedAtFloor().length);
  const attemptCount = useAppStore((s) => s.attempts.length);

  // Eleven panels became six groups at v3.17 — Gigi's §3. The badge counts move
  // onto the group, so a pending reward is still visible from the top row even
  // though Rewards now lives one level down inside "Her work".
  const BADGES = {
    attempts: attemptCount,
    floor: floorCount,
    journal: journalCount,
    pending: pendingCount
  };
  const badgeFor = (key) => (key && BADGES[key] ? ` (${BADGES[key]})` : '');
  const groupBadge = (group) =>
    badgeFor(group.badge) ||
    group.sections.map((sec) => badgeFor(sec.badge)).find(Boolean) ||
    '';

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="print-hide flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="label-caps">Grown-Up Corner</p>
          <h1 className="mt-1 font-display text-2xl text-ink-900">
            {name ? `${name}'s results` : 'Results'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700 hover:border-lavender-500"
          >
            🖨️ Print report
          </button>
          <button
            type="button"
            onClick={onExit}
            className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-700 text-ink-700"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="print-hide mt-4 flex flex-wrap gap-1.5">
        {PARENT_NAV.map((group) => {
          // Highlighted by the SECTION showing, not by an id match — opening
          // "Bring her work here" must light Settings rather than nothing.
          const active = parentTabForView(tab)?.id === group.id;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setTab(defaultParentViewFor(group.id))}
              aria-current={active ? 'true' : undefined}
              className={`rounded-full px-4 py-1.5 text-sm font-700 ${
                active ? 'bg-lavender-500 text-white' : 'text-ink-700 hover:bg-cream-200'
              }`}
            >
              {group.label}
              {groupBadge(group)}
            </button>
          );
        })}
      </div>

      {parentSectionsFor(tab).length > 0 && (
        <div className="print-hide mt-2 flex flex-wrap gap-1.5 border-t border-cream-300/70 pt-2">
          {parentSectionsFor(tab).map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => setTab(sec.id)}
              aria-current={tab === sec.id ? 'true' : undefined}
              className={`rounded-full px-3 py-1 text-[0.8rem] font-700 ${
                tab === sec.id
                  ? 'bg-sage-600 text-white'
                  : 'border border-cream-300 bg-white text-ink-700 hover:border-sage-400'
              }`}
            >
              {sec.label}
              {badgeFor(sec.badge)}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5">
        {tab === 'report' && (
          <OnePageReport
            rows={rows}
            name={name}
            accuracy={accuracy}
            answered={answers.length}
            settled={progress.settledCount}
            total={progress.strandCount}
            readAloud={readAloudSummary}
          />
        )}

        {tab === 'gradebook' && <GradebookPanel />}

        {tab === 'strands' && (
          <div className="space-y-3">
            {Object.values(strands).map((state) => {
              const strand = getStrand(state.strandId);
              if (!strand) return null;
              const d = describeLevel(state.asked > 0 ? state.level : null);
              // A floored strand is INCONCLUSIVE, never a score. The number is an
              // upper bound and printing it as "2.0" beside a caveat lets the
              // figure win the argument — which it did, for five days.
              const reading = strandReading(state, itemsForStrand(state.strandId));
              const unmeasured = reading.kind === 'inconclusive';
              return (
                <div key={state.strandId} className="panel px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-700 text-ink-900">
                        {strand.plant} {strand.label}
                      </p>
                      <p className="text-xs text-ink-500">{SUBJECTS[strand.subject].label}</p>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <ConfidencePill level={unmeasured ? 'none' : state.asked >= 6 ? 'high' : state.asked >= 4 ? 'medium' : state.asked > 0 ? 'low' : 'none'} />
                      <span
                        className={
                          unmeasured
                            ? 'font-display text-sm text-clay-500'
                            : 'tnum font-display text-lg text-ink-900'
                        }
                      >
                        {state.asked > 0 ? reading.display : '—'}
                      </span>
                    </div>
                  </div>
                  {unmeasured ? (
                    <p className="mt-1 text-xs text-ink-700">
                      {reading.why} · {state.correct}/{state.asked} correct
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-ink-700">
                      {d.text} · {state.correct}/{state.asked} correct ·{' '}
                      {state.settled ? 'settled' : 'still measuring'}
                    </p>
                  )}
                  {state.levelHistory.length > 1 && (
                    <p className="mt-1.5 font-mono text-[0.65rem] text-ink-500">
                      path: {state.levelHistory.map((l) => l.toFixed(1)).join(' → ')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {tab === 'history' && (
          <div className="panel px-4 py-3">
            <p className="text-xs text-ink-500">
              {answers.length} answers, newest first. Every question she has been asked, with what
              she picked.
            </p>
            <div className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
              {[...answers].reverse().map((a, i) => {
                const item = getItem(a.itemId);
                const strand = getStrand(a.strandId);
                return (
                  <div
                    key={`${a.itemId}-${a.at}-${i}`}
                    className="rounded-xl border border-cream-300 bg-white px-3 py-2"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs font-700 text-ink-900">
                        {a.correct ? '✅' : '❌'} {strand?.label}
                      </p>
                      <p className="tnum text-[0.65rem] text-ink-500">
                        level {a.level?.toFixed(1)} · {new Date(a.at).toLocaleString()}
                      </p>
                    </div>
                    {item && (
                      <>
                        <p className="mt-1 text-xs leading-snug text-ink-700">{item.prompt}</p>
                        <p className="mt-1 text-[0.7rem] text-ink-500">
                          She picked: <span className="text-ink-900">{item.choices[a.submitted]}</span>
                          {!a.correct && (
                            <>
                              {' · '}Correct: <span className="text-sage-700">{item.choices[item.answer]}</span>
                            </>
                          )}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
              {answers.length === 0 && (
                <p className="py-6 text-center text-sm text-ink-500">Nothing answered yet.</p>
              )}
            </div>
          </div>
        )}

        {/* LearningOS (Sept 23, 2026): this school's add-only loader replaces the
            standalone app's merge — see screens/GrownUpCorner/GrownUpCorner.jsx. */}
        {tab === 'import' && <BackupPanel />}
        {tab === 'remeasure' && <RemeasurePanel />}
        {tab === 'goals' && <GoalsPanel />}
        {tab === 'hours' && <HoursPanel />}
        {/* v3.78 — the document O.C.G.A. § 20-2-690(c) actually asks for. */}
        {tab === 'annual' && <AnnualReportPanel />}
        {tab === 'khan' && <KhanGradesPanel />}
        {tab === 'writingpieces' && <WritingPiecesPanel />}
        {tab === 'messages' && <MessagesPanel />}
        {tab === 'schedule' && <SchedulePanel />}
        {tab === 'journal' && <JournalReview />}
        {tab === 'rewards' && <RewardsPanel />}

        {tab === 'settings' && (
          <div className="space-y-4">
            <VersionPanel />
            <VoicePanel />

            <div className="panel px-4 py-4">
              <h2 className="font-display text-base text-ink-900">Sittings</h2>
              <p className="mt-1 text-xs text-ink-700">
                {sittings.length} sitting{sittings.length === 1 ? '' : 's'} recorded.
              </p>
              <ul className="mt-2 space-y-1 text-xs text-ink-500">
                {sittings.slice(-8).reverse().map((s) => (
                  <li key={s.id}>
                    {new Date(s.startedAt).toLocaleString()} — {s.answered || 0} question
                    {(s.answered || 0) === 1 ? '' : 's'}
                  </li>
                ))}
              </ul>
            </div>

            {/* ---- §32.7, found by Gigi Aug 18: SIX EXCHANGES TO FIND THIS.
                 "Nothing on screen says export." The panel that MAKES the file
                 said "Back up her data" and "⬇ Download backup"; the panel that
                 READS one says "Her latest export". Three words for two
                 directions of one idea, so neither search term found anything.

                 Export · backup · download are now all on the button that does
                 it, and each panel says which direction it is and names the
                 other. The word she reaches for is no longer the one word
                 missing. ---- */}
            <div className="panel px-4 py-4" id="export-her-work">
              <h2 className="font-display text-base text-ink-900">
                Export her work — save a backup copy
              </h2>
              <p className="mt-1 text-xs text-ink-700">
                <span className="font-700">
                  Everything lives in this browser, on this computer only.
                </span>{' '}
                There is no cloud copy and no server. If the browser data is cleared, it is gone —
                and this file is the only way back.
              </p>
              <p className="mt-2 text-xs text-ink-700">
                This is also how her work travels between her laptop and yours. It saves one{' '}
                <span className="font-mono">.json</span> file into Downloads.
              </p>
              <button
                type="button"
                onClick={handleExport}
                className="mt-3 rounded-full border border-sage-500 px-5 py-2 text-sm font-700 text-sage-700 hover:bg-sage-300/30"
              >
                ⬇ Export / download backup (.json)
              </button>
              <p className="mt-2 text-xs text-ink-500">
                Going the other way — loading a file that came off her laptop — is{' '}
                <span className="font-700">Bring her work onto this computer</span>, on the Load tab.
              </p>
            </div>

            <div className="rounded-petal border-2 border-clay-500/50 bg-clay-500/5 px-4 py-4">
              <h2 className="font-display text-base text-ink-900">Start the diagnostic over</h2>
              <p className="mt-1 text-xs text-ink-700">
                Deletes every level, every answer, every sitting, and the Petals and Golden Seeds
                that were earned from them. There is no undo. Type{' '}
                <span className="font-mono font-700">RESET</span> to enable the button.
              </p>
              <p className="mt-2 rounded-petal bg-sage-300/25 px-3 py-2 text-xs text-ink-700">
                <span className="font-700">What this does NOT touch:</span> her journal, the notes
                you and her mother have written her, her attendance, her name, and this passcode.
                This button exists so the Check-In can be retaken — it is not a way to delete the
                child’s work, and her writing cannot be got back by taking a test again.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type RESET"
                  className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm outline-none focus:border-clay-500"
                />
                <button
                  type="button"
                  disabled={confirmText !== 'RESET'}
                  onClick={async () => {
                    await resetAll();
                    setConfirmText('');
                    setTab('report');
                  }}
                  className="rounded-full bg-clay-500 px-5 py-2 text-sm font-700 text-white disabled:opacity-30"
                >
                  Erase and start over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
