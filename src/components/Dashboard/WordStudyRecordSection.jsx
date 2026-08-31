import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { WORD_ACTIVITIES, DAY_TASK_ORDER } from '../../lib/weeklyWords.js';

/**
 * SPELLING AND VOCABULARY, AS A RECORD (audit MISSING 2, built Aug 9 2026).
 *
 * ---- WHAT WAS WRONG ----
 *
 * He does word study four or five days a week: Monday introduce, Tuesday and
 * Wednesday practice, Thursday a targeted review of whatever he missed, Friday
 * the real test that sets next week's list. It is one of the most consistent
 * habits in the whole schedule.
 *
 * And it appeared in NO record. Not summarised badly — absent. No Parent
 * Dashboard section, nothing in the compliance packet, no mention in Learning
 * Analytics, and until today the `weeklyWordState` table was not even in the
 * export, so on a second computer it did not exist at all. A full strand of
 * English Language Arts, done all year, invisible to the records that are
 * supposed to describe his education.
 *
 * ---- WHAT A RECORD ACTUALLY NEEDS ----
 *
 * Not a score chart. Which words, how the test went, which days were done, and
 * how far through the pool he is — the things she would need to answer "what
 * did he study, and how do you know" a year from now, and the things that make
 * a transcript line defensible.
 *
 * The score is deliberately null until the Friday test is actually sat. A
 * percentage for a quiz nobody took would be a lie in a record, and this is a
 * record.
 */

/**
 * The day labels are READ FROM THE SCHEDULE rather than written here.
 *
 * They used to be a hardcoded map saying Practice / Practice / Review, which
 * described a week that no longer exists -- and would have gone on describing
 * it, silently, on the one screen the parent uses to check what he actually
 * did. Spelling and vocabulary now run different activities on the same day,
 * so this takes the skill.
 */
const DAY_NAMES = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' };
const DAY_ORDER = DAY_TASK_ORDER;
function dayLabel(skill, day) {
  const activity = (WORD_ACTIVITIES[skill] || WORD_ACTIVITIES.spelling)[day];
  return DAY_NAMES[day] + ' · ' + (activity ? activity.label : day);
}

function SkillPanel({ title, record, skill, children }) {
  if (!record) {
    return (
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{title}</p>
        <p className="mt-2 text-sm text-ink-500">
          No word-study week has started yet. It begins the first time he opens the Word Study card.
        </p>
      </div>
    );
  }

  const doneSet = new Set([...(record.daysCompleted || []), ...(record.quizTaken ? ['fri'] : [])]);

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">{title}</p>
        <p className="text-xs text-ink-500">
          Week {record.weekNumber}
          {record.weekStartDate ? ` · started ${record.weekStartDate}` : ''}
        </p>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Weeks completed</p>
          <p className="font-display text-xl font-700 text-ink-100">{record.weeksCompleted}</p>
        </div>
        {/**
          * WORDS LEARNED, NOT WORDS SEEN.
          *
          * This tile read "words seen 10 / 360" for three weeks and the number
          * was honest -- the list could not move without a Friday test, so ten
          * was genuinely all he had met. Seen is exposure. Learned is
          * {MASTERY_STREAK} correct in a row across separate sittings, and it
          * is the only one of the two that describes an education.
          */}
        <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">Words learned</p>
          <p className="font-display text-xl font-700 text-signal-green">
            {record.wordsMastered}
            <span className="text-sm font-400 text-ink-500"> / {record.poolSize}</span>
          </p>
          <p className="mt-0.5 text-[10px] text-ink-600">{record.wordsSeen} met so far</p>
        </div>
        <div className="rounded-lg border border-space-700 bg-space-900 px-3 py-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">This week's test</p>
          <p className="font-display text-xl font-700 text-ink-100">
            {record.scorePercent === null ? (
              <span className="text-sm font-400 text-ink-500">Not taken yet</span>
            ) : (
              `${record.scorePercent}%`
            )}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">This week's daily work</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {DAY_ORDER.map((day) => (
            <span
              key={day}
              className={
                'rounded-full border px-2 py-0.5 text-[11px] font-display ' +
                (doneSet.has(day)
                  ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                  : 'border-space-600 text-ink-500')
              }
            >
              {dayLabel(skill, day)}
            </span>
          ))}
        </div>
        <p className="mt-1 text-[11px] text-ink-500">
          {record.daysCompletedCount} of 5 days done this week.
        </p>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-display uppercase tracking-widest text-ink-500">
          This week's {record.wordCount} words
        </p>
        <p className="mt-1 text-sm text-ink-300">
          {record.words.map((w) => w.word || w.term || w.id).join(' · ')}
        </p>
      </div>

      {record.quizTaken && record.missedWords.length > 0 && (
        <div className="mt-3 rounded-lg border border-signal-amber/30 bg-signal-amber/5 px-3 py-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-amber">
            Missed on Friday — carries into next week
          </p>
          <p className="mt-0.5 text-sm text-ink-300">
            {record.missedWords.map((w) => w.word || w.term || w.id).join(' · ')}
          </p>
        </div>
      )}
      {/**
        * THE WORDS THAT NEED HER, NOT ANOTHER QUIZ.
        *
        * A word carried three weeks without being learned comes off the list so
        * it stops blocking the other 350 -- but taking it off silently would
        * just be a quieter version of the stall this whole rebuild removed. It
        * is reported here instead, because a word he has failed nine sittings
        * running is a teaching problem, not a practice problem.
        */}
      {record.stalledWords && record.stalledWords.length > 0 && (
        <div className="mt-3 rounded-lg border border-signal-red/30 bg-signal-red/5 px-3 py-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-signal-red">
            Set aside after 3 weeks — worth teaching directly
          </p>
          <p className="mt-0.5 text-sm text-ink-300">
            {record.stalledWords.map((w) => w.word || w.term || w.id).join(' · ')}
          </p>
        </div>
      )}

      {record.quizTaken && record.missedWords.length === 0 && (
        <p className="mt-3 rounded-lg border border-signal-green/30 bg-signal-green/5 px-3 py-2 text-sm text-signal-green">
          Every word correct on the test. Words learned three times running leave the list on Monday.
        </p>
      )}

      {children}
    </div>
  );
}

/**
 * MOVE THE LIST ON, WITHOUT WAITING FOR MONDAY.
 *
 * ---- WHY THIS CONTROL EXISTS (Aug 18, 2026) ----
 *
 * The parent, for the third time in two days: "The spelling and vocabulary
 * still hasn't moved to the new week."
 *
 * Twice the answer was a rule chosen in code. The rotation carried every
 * unmastered word and froze; then the repair was written to skip a week he had
 * already started, so it would not delete days he had worked — right, and it
 * means the computer he actually uses can still be sitting on the reported list
 * days after the fix shipped.
 *
 * She had to come back and say it was still wrong both times. **The list moves
 * on a schedule only the code knows, and the one person who can see that it is
 * wrong had no way to move it.**
 *
 * The confirm names the cost out loud rather than saying "are you sure?" — the
 * same rule the unit-completion dialogs follow. A confirmation that does not
 * say what it is about to destroy is a formality, not a safeguard.
 */
function AdvanceListControl({ skill, record }) {
  const advanceWordListNow = useAppStore((s) => s.advanceWordListNow);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  if (!record) return null;

  const onAdvance = async () => {
    const days = record.daysCompleted?.length || 0;
    const lines = [
      `Start the next ${skill} list now?`,
      '',
      `Replaces this week's ten words: ${(record.words || []).map((w) => w.word).join(', ')}`,
      '',
      days > 0
        ? `This week's ${days} finished day${days === 1 ? '' : 's'} re-open on the new words, so he does them again.`
        : 'No days have been completed this week, so nothing re-opens.',
      '',
      days > 0
        ? 'Those days stay on his attendance record — the hours he already put in still count toward Georgia.'
        : 'His attendance record is not touched.',
      '',
      'His test scores and every answer he has ever given are kept.'
    ];
    if (!window.confirm(lines.join('\n'))) return;
    setBusy(true);
    const out = await advanceWordListNow(skill);
    setBusy(false);
    setResult(out);
  };

  return (
    <div className="mt-4 border-t border-space-700 pt-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-ink-500">
          The list moves on its own each Monday. Move it now if it is stuck or you want a fresh set.
        </p>
        <button
          type="button"
          onClick={onAdvance}
          disabled={busy}
          className="shrink-0 rounded-lg border border-signal-cyan/50 px-3 py-1.5 text-xs font-display font-700 text-signal-cyan transition hover:bg-signal-cyan/10 disabled:opacity-50"
        >
          {busy ? 'Working…' : 'Start the next list now'}
        </button>
      </div>
      {result && (
        <p className="mt-2 text-xs text-signal-green">
          Now on list {result.weekNumber}: {result.arrived.join(', ')}
          {result.daysCleared > 0 && ` · ${result.daysCleared} day${result.daysCleared === 1 ? '' : 's'} re-opened, attendance kept`}
        </p>
      )}
    </div>
  );
}

export function WordStudyRecordSection() {
  const getWordStudyRecord = useAppStore((s) => s.getWordStudyRecord);
  // Subscribed, not passed: the getter reads the store itself, but a Zustand
  // getter's reference never changes, so without a real subscription this
  // panel would not re-render as he works through the week. That exact bug is
  // written up in lib/schoolQuarter.js — confirmed in testing, not theoretical.
  useAppStore((s) => s.weeklyWords);
  const record = getWordStudyRecord();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Records</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Spelling &amp; Vocabulary</h3>
        <p className="mt-2 text-sm text-ink-300">
          Ten words a week per skill, on a fixed seven-day rotation. Anything missed on Friday's test
          carries into the next list, and new words backfill to ten — so the list always reflects what
          he has not got yet, not what he has already proved. This is the daily English Language Arts
          strand; it belongs in the record alongside the Writing Journal and the Reading Log.
        </p>
      </div>

      <SkillPanel title="Spelling" record={record.spelling} skill="spelling">
        <AdvanceListControl skill="spelling" record={record.spelling} />
      </SkillPanel>
      <SkillPanel title="Vocabulary" record={record.vocabulary} skill="vocabulary">
        <AdvanceListControl skill="vocabulary" record={record.vocabulary} />
      </SkillPanel>
    </div>
  );
}
