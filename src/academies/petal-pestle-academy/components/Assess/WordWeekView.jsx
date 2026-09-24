// ---------------------------------------------------------------------------
// SPELLING & VOCABULARY — her 15-minute class (Sept 24 2026).
//
// Lamar's format, as Gigi asked: two lists of ten, a different activity every
// weekday for each, and a test on Friday. The rules (which words, which day,
// what carries) are all in lib/wordWeek.js; this screen only shows them.
//
// ---- THE WORD IS NEVER ON SCREEN DURING THE SPELLING TEST ----
// She hears it and types it. If this computer cannot speak, the TEST refuses
// to run and says why; it never falls back to showing her the word. The
// practice days still work.
//
// ---- PRACTICE TELLS HER STRAIGHT AWAY; TESTS TELL HER AT THE END ----
// Mon–Thu give feedback on every tap. Friday's two tests are scored, so their
// feedback waits until she says she has finished.
//
// ---- NOTHING HERE SAYS "BEHIND", "MISSED" OR "AGAIN" ----
// Carried words are just words on her list. A catch-up day is just "catch-up".
// ---------------------------------------------------------------------------

import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MarigoldMessage } from '../Mentor/MarigoldMessage.jsx';
import {
  wordWeek,
  todaysTask,
  chooseRound,
  missingPattern,
  wordSearch,
  findPlacement,
  vocabRound,
  vocabTest,
  gradeVocab
} from '../../lib/wordWeek.js';
import { gradeSpelling } from '../../lib/wordStudy.js';
import { speechSupported, speakChunks, stopSpeaking } from '../../lib/speech.js';

const btn = 'rounded-full px-5 py-2 text-sm font-700';
const primary = `${btn} bg-sage-700 text-white hover:bg-sage-500 disabled:cursor-not-allowed disabled:opacity-40`;

function say(text) {
  stopSpeaking();
  speakChunks([text]);
}

function SpeakButton({ text, label = '🔊' }) {
  if (!speechSupported()) return null;
  return (
    <button
      type="button"
      onClick={() => say(text)}
      aria-label={`Say ${text}`}
      className="flex-none rounded-full border border-cream-300 bg-white px-2.5 py-1 text-xs hover:border-lavender-500"
    >
      {label}
    </button>
  );
}

export function WordWeekView({ onExit }) {
  const lessonReads = useAppStore((s) => s.lessonReads);
  const results = useAppStore((s) => s.spellingResults);
  const recordWordActivity = useAppStore((s) => s.recordWordActivity);
  const recordSpellingResult = useAppStore((s) => s.recordSpellingResult);
  const recordVocabTest = useAppStore((s) => s.recordVocabTest);

  // Frozen for the week: worked out from what was true before Monday.
  const week = useMemo(() => wordWeek({ date: new Date(), lessonReads, results }), [lessonReads, results]);
  const [open, setOpen] = useState(null); // 'spelling' | 'vocabulary' | null

  const tasks = {
    spelling: todaysTask('spelling', new Date(), results),
    vocabulary: todaysTask('vocabulary', new Date(), results)
  };

  async function saveActivity(skill, task, right, total) {
    await recordWordActivity({ skill, weekOf: week.weekOf, task, right, total });
    setOpen(null);
  }

  if (open) {
    const task = tasks[open];
    const list = week[open].list;
    const seed = `${week.weekOf}|${open}|${task.dayKey}`;
    const common = { task, list, seed, onBack: () => setOpen(null) };
    let body = null;
    if (open === 'spelling') {
      if (task.type === 'read') body = <ReadSpelling {...common} onDone={() => saveActivity('spelling', 'mon', list.length, list.length)} />;
      if (task.type === 'choose') body = <ChooseSpelling {...common} onDone={(r) => saveActivity('spelling', 'tue', r, list.length)} />;
      if (task.type === 'wordsearch') body = <WordSearchActivity {...common} onDone={(r) => saveActivity('spelling', 'wed', r, list.length)} />;
      if (task.type === 'missing') body = <MissingLetters {...common} onDone={(r) => saveActivity('spelling', 'thu', r, list.length)} />;
      if (task.type === 'test')
        body = (
          <SpellingTest
            {...common}
            onSave={(grade) =>
              recordSpellingResult(week.spelling.listId, grade, {
                week: week.spelling.week,
                quarter: week.spelling.quarter,
                weekInQuarter: week.spelling.weekInQuarter,
                carriedCount: week.spelling.carried.length,
                weekOf: week.weekOf
              })
            }
            onDone={() => setOpen(null)}
          />
        );
    } else {
      if (task.type === 'read') body = <ReadVocabulary {...common} onDone={() => saveActivity('vocabulary', 'mon', list.length, list.length)} />;
      if (['meaning', 'blank', 'recall'].includes(task.type))
        body = <VocabPractice {...common} onDone={(r) => saveActivity('vocabulary', task.dayKey, r, list.length)} />;
      if (task.type === 'test')
        body = (
          <VocabTestActivity
            {...common}
            onSave={(grade) =>
              recordVocabTest(week.vocabulary.listId, grade, {
                week: week.vocabulary.week,
                quarter: week.vocabulary.quarter,
                weekInQuarter: week.vocabulary.weekInQuarter,
                weekOf: week.weekOf
              })
            }
            onDone={() => setOpen(null)}
          />
        );
    }
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <button type="button" onClick={() => setOpen(null)} className="text-xs font-700 text-ink-700">
          ← Spelling & Vocabulary
        </button>
        <p className="label-caps mt-3">
          {open === 'spelling' ? 'Spelling' : 'Vocabulary'} · {task.label}
          {task.isCatchUp ? ' · catch-up' : ''}
        </p>
        <div className="mt-3">
          <MarigoldMessage text={task.instructions} size="sm" />
        </div>
        <div className="mt-5">{body}</div>
      </main>
    );
  }

  const allDone = tasks.spelling.type === 'done' && tasks.vocabulary.type === 'done';
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <p className="label-caps">🔤 Spelling & Vocabulary · about 15 minutes</p>
      <h1 className="mt-1 font-display text-3xl text-ink-900">Your words this week</h1>
      <div className="mt-4">
        <MarigoldMessage
          text={
            tasks.spelling.type === 'weekend'
              ? 'No word work on the weekend. Your new list comes on Monday.'
              : allDone
                ? 'Both of today’s word activities are done. Well done.'
                : 'Do today’s spelling, then today’s vocabulary.'
          }
          tone={allDone ? 'done' : 'start'}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {['spelling', 'vocabulary'].map((skill) => {
          const t = tasks[skill];
          const canOpen = t.type !== 'done' && t.type !== 'weekend';
          return (
            <div key={skill} className="panel px-5 py-5">
              <p className="label-caps text-ink-500">{skill === 'spelling' ? '✏️ Spelling' : '📚 Vocabulary'}</p>
              <p className="mt-1 font-display text-lg text-ink-900">
                {t.type === 'done' ? '✓ Done for today' : t.type === 'weekend' ? 'Weekend' : t.label}
              </p>
              {t.isCatchUp && <p className="text-[0.7rem] text-ink-500">Catch-up from earlier this week</p>}
              <p className="mt-2 text-xs text-ink-700">
                {week[skill].list.slice(0, 10).map((w) => w.word).join(' · ')}
              </p>
              {canOpen && (
                <button type="button" onClick={() => setOpen(skill)} className={`${primary} mt-3`}>
                  Start
                </button>
              )}
            </div>
          );
        })}
      </div>

      <button type="button" onClick={onExit} className="mt-7 text-xs font-700 text-lavender-700">
        ← Back to my day
      </button>
    </main>
  );
}

// ---------------------------------------------------------------------------
// SPELLING
// ---------------------------------------------------------------------------

function ReadSpelling({ list, onDone }) {
  return (
    <>
      <ul className="space-y-2">
        {list.map((w) => (
          <li key={w.word} className="flex items-center gap-3 rounded-petal border border-cream-300 bg-white px-4 py-3">
            <span className="font-display text-xl text-ink-900">{w.word}</span>
            <SpeakButton text={w.word} />
            <span className="ml-auto text-xs text-ink-500">
              not: <span className="line-through">{(w.misspellings || []).join(', ')}</span>
            </span>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onDone} className={`${primary} mt-5`}>
        I read my list
      </button>
    </>
  );
}

function ChooseSpelling({ list, seed, onDone }) {
  const round = useMemo(() => chooseRound(list, seed), [list, seed]);
  const [picked, setPicked] = useState({});
  const answered = Object.keys(picked).length;
  const right = round.filter((q, i) => picked[i] === q.word).length;
  return (
    <>
      <div className="space-y-3">
        {round.map((q, i) => (
          <div key={q.word} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-700">Word {i + 1}</span>
              <SpeakButton text={q.word} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {q.options.map((o) => {
                const chosen = picked[i] === o;
                const settled = picked[i] !== undefined;
                const cls = settled && o === q.word ? 'border-sage-500 bg-sage-300/30' : chosen ? 'border-clay-500 bg-clay-500/10' : 'border-cream-300 bg-white';
                return (
                  <button key={o} type="button" disabled={settled} onClick={() => setPicked((p) => ({ ...p, [i]: o }))} className={`rounded-petal border-2 px-3 py-2 text-left text-base ${cls}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={answered < round.length} onClick={() => onDone(right)} className={`${primary} mt-5`}>
        Finish ({answered} of {round.length})
      </button>
    </>
  );
}

function WordSearchActivity({ list, seed, onDone }) {
  const search = useMemo(() => wordSearch(list.map((w) => w.word), seed), [list, seed]);
  const [start, setStart] = useState(null);
  const [found, setFound] = useState([]);
  if (!search) return <p className="text-sm text-ink-700">This word search could not be built. Tell a grown-up.</p>;
  const lit = new Set();
  for (const p of found) for (let k = 0; k < p.word.length; k += 1) lit.add(p.across ? `${p.r}:${p.c + k}` : `${p.r + k}:${p.c}`);
  function tap(r, c) {
    if (!start) {
      setStart({ r, c });
      return;
    }
    const p = findPlacement(search, start, { r, c });
    if (p && !found.includes(p)) setFound((f) => [...f, p]);
    setStart(null);
  }
  const foundWords = new Set(found.map((p) => p.word));
  return (
    <>
      <div className="inline-grid gap-0.5 rounded-petal border border-cream-300 bg-white p-2" style={{ gridTemplateColumns: `repeat(${search.size}, minmax(0, 1fr))` }}>
        {search.rows.map((row, r) =>
          [...row].map((ch, c) => {
            const on = lit.has(`${r}:${c}`);
            const isStart = start && start.r === r && start.c === c;
            return (
              <button
                key={`${r}:${c}`}
                type="button"
                onClick={() => tap(r, c)}
                className={`h-7 w-7 rounded text-sm font-700 ${isStart ? 'bg-lavender-500 text-white' : on ? 'bg-sage-300 text-ink-900' : 'text-ink-900 hover:bg-cream-200'}`}
              >
                {ch}
              </button>
            );
          })
        )}
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {list.map((w) => {
          const got = foundWords.has(w.word.toUpperCase().replace(/[^A-Z]/g, ''));
          return (
            <li key={w.word} className={`rounded-full px-3 py-1 text-sm ${got ? 'bg-sage-300/40 line-through text-ink-500' : 'bg-cream-200 text-ink-900'}`}>
              {w.word}
            </li>
          );
        })}
      </ul>
      <button type="button" disabled={found.length < list.length} onClick={() => onDone(found.length)} className={`${primary} mt-5`}>
        {found.length < list.length ? `${found.length} of ${list.length} found` : 'Finish'}
      </button>
    </>
  );
}

function MissingLetters({ list, onDone }) {
  const [typed, setTyped] = useState({});
  const [checked, setChecked] = useState({});
  const right = list.filter((w) => checked[w.word] && typed[w.word]?.trim().toLowerCase() === w.word.toLowerCase()).length;
  return (
    <>
      <div className="space-y-3">
        {list.map((w) => {
          const done = checked[w.word];
          const ok = typed[w.word]?.trim().toLowerCase() === w.word.toLowerCase();
          return (
            <div key={w.word} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl tracking-widest text-ink-900">{missingPattern(w.word, w.misspellings)}</span>
                <SpeakButton text={w.word} />
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={typed[w.word] ?? ''}
                  disabled={done}
                  onChange={(e) => setTyped((t) => ({ ...t, [w.word]: e.target.value }))}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-base"
                  aria-label="Type the whole word"
                />
                {!done && (
                  <button type="button" disabled={!typed[w.word]?.trim()} onClick={() => setChecked((c) => ({ ...c, [w.word]: true }))} className={primary}>
                    Check
                  </button>
                )}
              </div>
              {done && (
                <p className={`mt-1 text-sm ${ok ? 'text-sage-700' : 'text-ink-700'}`}>
                  {ok ? '🌸 Yes!' : `It is spelled: ${w.word}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" disabled={Object.keys(checked).length < list.length} onClick={() => onDone(right)} className={`${primary} mt-5`}>
        Finish
      </button>
    </>
  );
}

function SpellingTest({ list, onSave, onDone }) {
  const [typed, setTyped] = useState({});
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);
  if (!speechSupported()) {
    return (
      <p className="rounded-petal border-2 border-gold-300 bg-gold-300/15 px-4 py-3 text-sm text-ink-700">
        The spelling test needs this computer to say the words out loud, and it cannot. A grown-up can
        read the words to you on paper instead.
      </p>
    );
  }
  if (grade) {
    return (
      <>
        <p className="font-display text-2xl text-ink-900">
          {grade.right} of {grade.total}
        </p>
        <ul className="mt-4 space-y-2">
          {grade.rows.map((r) => (
            <li key={r.word} className="rounded-petal border-2 border-cream-200 px-4 py-2 text-sm">
              <span className="font-700 text-ink-900">{r.word}</span>
              {!r.correct && <span className="ml-2 text-ink-500">{r.skipped ? '— left blank' : `— you wrote ${r.given}`}</span>}
              <span className="ml-2">{r.correct ? '🌸' : ''}</span>
            </li>
          ))}
        </ul>
        {grade.rows.some((r) => !r.correct) && (
          <p className="mt-4 rounded-petal bg-cream-200 px-4 py-3 text-sm text-ink-700">The ones without a flower will be on your list next week.</p>
        )}
        <button type="button" onClick={onDone} className={`${primary} mt-5`}>
          Done
        </button>
      </>
    );
  }
  async function finish() {
    if (saving) return;
    setSaving(true);
    const g = gradeSpelling(list, typed);
    await onSave(g);
    setGrade(g);
    setSaving(false);
  }
  return (
    <>
      <ol className="space-y-3">
        {list.map((item, i) => (
          <li key={item.word} className="flex items-center gap-3 rounded-petal border-2 border-cream-200 px-4 py-3">
            <span className="w-5 text-sm font-700 text-ink-500">{i + 1}.</span>
            <button type="button" onClick={() => say(item.word)} className="rounded-full border-2 border-sage-500 bg-sage-300/20 px-4 py-1.5 text-sm font-700 text-sage-700">
              🌸 say the word
            </button>
            <input
              type="text"
              value={typed[item.word] ?? ''}
              onChange={(e) => setTyped((t) => ({ ...t, [item.word]: e.target.value }))}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              className="min-w-0 flex-1 rounded-petal border-2 border-cream-200 px-3 py-1.5 text-base"
              aria-label={`Word ${i + 1}`}
            />
          </li>
        ))}
      </ol>
      <button type="button" onClick={finish} disabled={saving} className={`${primary} mt-5`}>
        {saving ? 'Saving…' : 'I have finished'}
      </button>
    </>
  );
}

// ---------------------------------------------------------------------------
// VOCABULARY
// ---------------------------------------------------------------------------

function ReadVocabulary({ list, onDone }) {
  return (
    <>
      <ul className="space-y-3">
        {list.map((w) => (
          <li key={w.word} className="rounded-petal border border-cream-300 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl text-ink-900">{w.word}</span>
              <SpeakButton text={`${w.word}. ${w.sentence} It means: ${w.meaning}`} />
            </div>
            <p className="mt-1 text-sm italic text-ink-700">{w.sentence}</p>
            <p className="mt-1 text-sm text-ink-900">{w.meaning}</p>
          </li>
        ))}
      </ul>
      <button type="button" onClick={onDone} className={`${primary} mt-5`}>
        I read them
      </button>
    </>
  );
}

function Question({ q, picked, onPick, reveal }) {
  return (
    <div className="rounded-petal border border-cream-300 bg-white px-4 py-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-base text-ink-900">{q.prompt}</p>
          {q.context && <p className="mt-1 text-sm text-ink-700">{q.context}</p>}
        </div>
        <SpeakButton text={`${q.prompt} ${q.context || ''} ${q.options.join('. ')}`} />
      </div>
      <div className="mt-2 space-y-2">
        {q.options.map((o) => {
          const chosen = picked === o;
          const settled = reveal && picked !== undefined;
          const cls = settled && o === q.answer ? 'border-sage-500 bg-sage-300/30' : chosen ? (reveal ? 'border-clay-500 bg-clay-500/10' : 'border-lavender-500 bg-lavender-300/30') : 'border-cream-300 bg-white';
          return (
            <button key={o} type="button" disabled={settled} onClick={() => onPick(o)} className={`block w-full rounded-petal border-2 px-3 py-2 text-left text-sm ${cls}`}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VocabPractice({ task, list, seed, onDone }) {
  const round = useMemo(() => vocabRound(task.type, list, seed), [task.type, list, seed]);
  const [picked, setPicked] = useState({});
  const answered = Object.keys(picked).length;
  const right = round.filter((q, i) => picked[i] === q.answer).length;
  return (
    <>
      <div className="space-y-3">
        {round.map((q, i) => (
          <Question key={q.word} q={q} picked={picked[i]} onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))} reveal />
        ))}
      </div>
      <button type="button" disabled={answered < round.length} onClick={() => onDone(right)} className={`${primary} mt-5`}>
        Finish ({answered} of {round.length})
      </button>
    </>
  );
}

function VocabTestActivity({ list, seed, onSave, onDone }) {
  const questions = useMemo(() => vocabTest(list, seed), [list, seed]);
  const [picked, setPicked] = useState({});
  const [grade, setGrade] = useState(null);
  const [saving, setSaving] = useState(false);
  const answered = Object.keys(picked).length;
  async function finish() {
    if (saving) return;
    setSaving(true);
    const g = gradeVocab(questions, picked);
    await onSave(g);
    setGrade(g);
    setSaving(false);
  }
  if (grade) {
    return (
      <>
        <p className="font-display text-2xl text-ink-900">
          {grade.right} of {grade.total}
        </p>
        <div className="mt-4 space-y-3">
          {questions.map((q, i) => (
            <Question key={q.word} q={q} picked={picked[i]} onPick={() => {}} reveal />
          ))}
        </div>
        {grade.rows.some((r) => !r.correct) && (
          <p className="mt-4 rounded-petal bg-cream-200 px-4 py-3 text-sm text-ink-700">The words you did not get this time will be on your list next week.</p>
        )}
        <button type="button" onClick={onDone} className={`${primary} mt-5`}>
          Done
        </button>
      </>
    );
  }
  return (
    <>
      <div className="space-y-3">
        {questions.map((q, i) => (
          <Question key={q.word} q={q} picked={picked[i]} onPick={(o) => setPicked((p) => ({ ...p, [i]: o }))} reveal={false} />
        ))}
      </div>
      <button type="button" disabled={answered < questions.length || saving} onClick={finish} className={`${primary} mt-5`}>
        {saving ? 'Saving…' : `I have finished (${answered} of ${questions.length})`}
      </button>
    </>
  );
}

export default WordWeekView;
