import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { WritingCheckerLink } from './WritingCheckerLink.jsx';
import { checkWriting } from '../../lib/writingCheck.js';
import { academyContent } from '../../content/academyContent.js';

const { lessonForPrompt, requirementsFor } = academyContent().writing;

export function WritingPromptEngine({ prompt, onExit }) {
  const submitWritingEntry = useAppStore((s) => s.submitWritingEntry);
  const getEntriesForPrompt = useAppStore((s) => s.getEntriesForPrompt);
  const [text, setText] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(null); // { wordCount } | null
  /**
   * The last check he ran on THIS text, or null if he has not run one — or has
   * typed since. Typing resets it deliberately: a check he passed three
   * paragraphs ago is not a check on what he is about to save.
   */
  const [checked, setChecked] = useState(null);

  /**
   * THE STRUCTURE LESSON. (Aug 17, 2026.)
   *
   * The parent: "it's not teaching a lesson... The lesson should be how to
   * write an introduction, what should be in the body, and how to write a
   * conclusion."
   *
   * The Essay prompt already NAMED those three parts and taught none of them.
   * Naming a structure is not teaching it.
   *
   * Open by default the first time he writes a form; collapsed to a reminder
   * afterwards — her rule: "This doesn't have to be in every journal, but since
   * this is his real first journal that should apply to any other journal that
   * will be asking him to do something new." Mission Report comes round seven
   * times a year, and teaching shoved at him on the seventh is how a student
   * learns to scroll past teaching.
   */
  const structure = lessonForPrompt(prompt.id);
  const [lessonOpen, setLessonOpen] = useState(null); // null = follow the default

  /**
   * A DAILY DRILL TEACHES BEFORE IT ASKS. (Aug 13, 2026.)
   *
   * Every other prompt in this app is a bare instruction dropped over a bare
   * textarea. That is a writing TASK, and a twelve-year-old who does not
   * already know how to build a topic sentence cannot get better at building
   * one by being asked for four more.
   *
   * A drill carries four things the prompts never had — what the structure is,
   * the same idea done badly, the same idea done well, and the one thing to
   * check before submitting. The weak/strong pair is the load-bearing part:
   * a rule stated is a rule read, a rule shown next to its violation is a rule
   * he can see.
   */
  const isDrill = Boolean(prompt.teach && prompt.strong);
  const isProject = prompt.category === 'project';
  const pastEntries = getEntriesForPrompt(prompt.id);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const meetsGoal = wordCount >= (prompt.minWords || 0);
  // A drill is measured in sentences, not words — the whole point is structure.
  const sentenceCount = text.split(/[.!?]+(?:\s|$)/).filter((t) => t.trim().length > 0).length;

  // Skill prompts with a topicPool cycle through variations so redoing one
  // gives a genuinely new topic instead of repeating the same assignment.
  // Attempt #0 uses the base instructions; each subsequent attempt advances
  // through topicPool, wrapping back around once every variation is used.
  const allVariations = prompt.topicPool ? [prompt.instructions, ...prompt.topicPool] : [prompt.instructions];
  const activeInstructions = allVariations[pastEntries.length % allVariations.length];

  /**
   * ==========================================================================
   * HE HAS TO LOOK AT IT BEFORE IT IS SAVED. (Aug 25, 2026.)
   * ==========================================================================
   *
   * The parent, on two D- grades in two days: **"He received D minuses because
   * he rushed, didn't use punctuation marks, capitalization, or complete
   * sentences on both entries."**
   *
   * This button used to be `disabled={wordCount === 0}` and nothing else. Type
   * one word, press Save, +15 XP. Every mistake she named is machine-detectable
   * and nothing looked — the first anyone knew was her reading it days later.
   *
   * MUST LOOK, CAN OVERRIDE — her choice, and the right one. A hard block is
   * beaten by a twelve-year-old adding full stops without reading, and turns
   * writing into an argument with a machine. An advisory line is ignored, which
   * is already proven: the external checker link has sat on this screen the
   * whole time and neither D- entry had been near it.
   *
   * So the first press CHECKS. If it is clean it saves in that same press —
   * making him press twice for work that is already right would teach him the
   * check is a toll. If it is not clean he sees exactly what and how many, and
   * the button becomes "Save anyway", which he is allowed to press.
   *
   * WHAT HE OVERRODE IS RECORDED. `checkIssues` travels with the entry to her
   * grading screen, so "he rushed" stops being something she has to infer from
   * the prose and becomes a number beside it.
   */
  const runCheck = () =>
    checkWriting(text, {
      requirements: requirementsFor(prompt.id),
      minWords: prompt.minWords || 0,
      minSentences: prompt.minSentences || 0
    });

  const save = async (issueCount) => {
    const entry = await submitWritingEntry(prompt.id, text, { checkIssues: issueCount });
    setJustSubmitted({ wordCount: entry.wordCount });
  };

  const handleSubmit = async () => {
    if (wordCount === 0) return;
    // Second press on a text he has already checked: he has seen the list.
    if (checked) {
      await save(checked.issues.length);
      return;
    }
    const result = runCheck();
    if (result.issues.length === 0) {
      await save(0);
      return;
    }
    setChecked(result);
  };

  if (justSubmitted) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">Entry Saved</p>
          <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">Nice work, engineer.</h2>
          <p className="mt-2 text-sm text-ink-300">
            {justSubmitted.wordCount} words logged · +15 XP earned
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {isProject && (
              <button
                type="button"
                onClick={() => {
                  setText('');
                  setJustSubmitted(null);
                }}
                className="rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
              >
                Write Another Entry
              </button>
            )}
            <button
              type="button"
              onClick={onExit}
              className="rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
            >
              Return to Mission Control
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
          ← Exit mission
        </button>
        <span className="text-sm text-ink-500">
          {isProject ? 'Writing Project' : 'Writing Skill'}
        </span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          {isProject ? 'Journal Entry' : prompt.category === 'experiment' ? 'Hands-On Experiment' : 'Writing Practice'}
        </p>
        <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">{prompt.title}</h2>
        <p className="mt-1 text-sm text-ink-300">{prompt.theme}</p>

        {prompt.category === 'experiment' && (
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex flex-wrap gap-3 text-xs text-ink-500">
              <span className="rounded-full bg-space-900 px-2 py-1">{prompt.difficulty}</span>
              <span className="rounded-full bg-space-900 px-2 py-1">~{prompt.estMinutes} minutes</span>
            </div>
            <p className="text-ink-100">{prompt.objectives}</p>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-signal-amber">Materials</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-300">
                {prompt.materials.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-signal-amber">Procedure</p>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-ink-300">
                {prompt.procedure.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-signal-red">Safety</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-ink-300">
                {prompt.safetyTips.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-widest text-signal-green">Concepts</p>
              <p className="mt-1 text-ink-300">{prompt.concepts.join(', ')}</p>
            </div>
            <p className="font-display text-xs uppercase tracking-widest text-signal-cyan">Reflection Question</p>
          </div>
        )}

        {isDrill && (
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 p-3">
              <p className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">
                {prompt.skillLabel}
              </p>
              <p className="mt-1 leading-relaxed text-ink-200">{prompt.teach}</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-signal-amber/30 bg-space-900 p-3">
                <p className="font-display text-[11px] uppercase tracking-widest text-signal-amber">Weak</p>
                <p className="mt-1 text-sm italic text-ink-400">{prompt.weak}</p>
              </div>
              <div className="rounded-lg border border-signal-green/30 bg-space-900 p-3">
                <p className="font-display text-[11px] uppercase tracking-widest text-signal-green">Stronger</p>
                <p className="mt-1 text-sm text-ink-200">{prompt.strong}</p>
              </div>
            </div>
          </div>
        )}

        {structure && !isDrill && (() => {
          const firstTime = pastEntries.length === 0;
          const open = lessonOpen === null ? firstTime : lessonOpen;
          return (
            <div className="mt-4 rounded-lg border border-signal-cyan/30 bg-signal-cyan/5 p-3">
              <button
                type="button"
                onClick={() => setLessonOpen(!open)}
                className="flex w-full items-center justify-between gap-2 text-left"
              >
                <span className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">
                  How to write {structure.form.toLowerCase()}
                </span>
                <span className="text-[11px] text-ink-500">
                  {open ? 'Hide' : firstTime ? 'Read this first' : 'You have done this before — open it again'}
                </span>
              </button>

              {open && (
                <div className="mt-2 space-y-3">
                  <p className="leading-relaxed text-ink-200">{structure.teach}</p>

                  <div className="space-y-2">
                    {structure.parts.map((part, i) => (
                      <div key={part.name} className="rounded-lg border border-space-700 bg-space-950 p-3">
                        <p className="font-display text-xs font-700 text-ink-100">
                          {i + 1}. {part.name}
                        </p>
                        <p className="mt-0.5 text-sm text-ink-300">{part.what}</p>
                        <p className="mt-1 text-xs text-ink-500">{part.tip}</p>
                      </div>
                    ))}
                  </div>

                  {/* The load-bearing part, same as the daily drills: a rule
                      stated is a rule read; a rule shown beside its violation
                      is a rule he can see. */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-signal-amber/30 bg-space-900 p-3">
                      <p className="font-display text-[11px] uppercase tracking-widest text-signal-amber">Weak</p>
                      <p className="mt-1 text-sm italic text-ink-400">{structure.weak}</p>
                    </div>
                    <div className="rounded-lg border border-signal-green/30 bg-space-900 p-3">
                      <p className="font-display text-[11px] uppercase tracking-widest text-signal-green">Stronger</p>
                      <p className="mt-1 text-sm text-ink-200">{structure.strong}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        <p className="mt-4 leading-relaxed text-ink-100">{isDrill ? prompt.task : activeInstructions}</p>

        {structure && !isDrill && (
          <div className="mt-3 rounded-lg border border-space-700 bg-space-950 p-3">
            <p className="font-display text-[11px] uppercase tracking-widest text-ink-500">
              Before you turn it in
            </p>
            <p className="mt-1 text-sm text-ink-300">{structure.checkFor}</p>
          </div>
        )}

        {/**
          * The self-check. It names the ONE thing this drill is about, in the
          * same words his mother will use when she reads it — so "check your
          * work" stops meaning "read it again vaguely" and starts meaning
          * something he can actually do.
          */}
        {isDrill && (
          <div className="mt-3 rounded-lg border border-space-700 bg-space-950 p-3">
            <p className="font-display text-[11px] uppercase tracking-widest text-ink-500">
              Before you turn it in
            </p>
            <p className="mt-1 text-sm text-ink-300">{prompt.checkFor}</p>
          </div>
        )}
        {allVariations.length > 1 && (
          <p className="mt-2 text-xs text-ink-500">
            Topic {(pastEntries.length % allVariations.length) + 1} of {allVariations.length} — each attempt
            gives a fresh topic.
          </p>
        )}
      </div>

      {isProject && pastEntries.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-900 p-4">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">
            Past Entries ({pastEntries.length})
          </p>
          <ul className="mt-2 space-y-2">
            {pastEntries.slice(0, 3).map((entry) => (
              <li key={entry.id} className="text-xs text-ink-500">
                {new Date(entry.completedAt).toLocaleDateString()} — {entry.wordCount} words
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            // A check he passed three paragraphs ago is not a check on what he
            // is about to save. Typing puts the button back to "Check it".
            if (checked) setChecked(null);
          }}
          rows={10}
          placeholder="Start writing here…"
          className="w-full resize-none rounded-lg border border-space-700 bg-space-900 p-3 text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
          {/* A drill is measured in SENTENCES. Counting words on a five-sentence
              structure exercise would reward padding, which is the opposite of
              what it teaches. */}
          <span>
            {isDrill
              ? `${sentenceCount} sentence${sentenceCount === 1 ? '' : 's'}${
                  prompt.minSentences ? ` (aim for ${prompt.minSentences}+)` : ''
                } · ${wordCount} words`
              : `${wordCount} words ${prompt.minWords ? `(aim for ${prompt.minWords}+)` : ''}`}
          </span>
          {isDrill ? (
            <span className={sentenceCount >= (prompt.minSentences || 0) ? 'text-signal-green' : 'text-ink-500'}>
              {sentenceCount >= (prompt.minSentences || 0) ? 'Goal reached' : 'Keep going'}
            </span>
          ) : prompt.minWords > 0 ? (
            <span className={meetsGoal ? 'text-signal-green' : 'text-ink-500'}>
              {meetsGoal ? 'Goal reached' : 'Keep going'}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-3">
        <WritingCheckerLink />
      </div>

      {/*
        WHAT THE CHECK FOUND, IN HIS WORDS, WITH THE SENTENCE IT MEANS.

        Task problems first and in amber: not doing the assignment is a bigger
        problem than a missing capital, and the top line should be the one that
        matters most. "8 sentences do not start with a capital letter" is
        something he can act on; "mechanics: poor" is a verdict he can only
        absorb.
      */}
      {checked && checked.issues.length > 0 && (
        <div className="mt-3 rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-4">
          <p className="font-display text-sm font-700 text-signal-amber">
            {checked.issues.length === 1
              ? 'One thing to fix before you save'
              : `${checked.issues.length} things to fix before you save`}
          </p>
          <ul className="mt-2 space-y-2">
            {checked.issues.map((issue) => (
              <li key={issue.id}>
                <p className={'text-sm ' + (issue.severity === 'task' ? 'text-signal-amber' : 'text-ink-200')}>
                  {issue.severity === 'task' ? '◆ ' : '• '}
                  {issue.label}
                </p>
                {issue.example && (
                  <p className="ml-4 mt-0.5 text-xs italic text-ink-500">{issue.example}</p>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-500">
            Fix them and this goes away on its own. You can save without fixing them — Mom will
            see what was left.
          </p>
        </div>
      )}

      {checked && checked.issues.length === 0 && checked.note && (
        <p className="mt-3 text-xs text-ink-400">{checked.note}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={wordCount === 0}
        className={
          'mt-3 w-full rounded-lg px-4 py-2 font-display font-700 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 ' +
          (checked && checked.issues.length > 0
            ? 'bg-space-700 text-ink-100'
            : 'bg-signal-cyan text-space-950')
        }
      >
        {checked && checked.issues.length > 0
          ? `Save anyway — ${checked.issues.length} not fixed`
          : 'Check it, then save'}
      </button>
    </div>
  );
}
