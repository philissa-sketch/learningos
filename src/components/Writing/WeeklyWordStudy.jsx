import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { MASTERY_STREAK, WORD_ACTIVITIES, DAY_TASK_ORDER, getDayKeyForDate } from '../../lib/weeklyWords.js';

const DAY_NAMES = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' };

/**
 * THE WEEK, ON THE SCREEN HE ACTUALLY OPENS. (Added Aug 9 2026.)
 *
 * The five activities were built and shipped and the parent still could not
 * find them: "I don't see the activities. I just see the vocabulary word, the
 * word put into a sentence, and the definition." She was right, and nothing
 * was broken -- it was a SUNDAY. Word study runs Mon-Fri, so the only screen
 * reachable that day was the list, and the list said nothing about the four
 * days that follow it.
 *
 * That is the same failure this project has now hit three times, in her own
 * words the first time: "I told him to follow that schedule but that isn't
 * there." Work that exists only in code, or only on a day you are not looking
 * at, does not exist. So the week is printed here, on the one word-study screen
 * that is open every day, and each day is a live button -- he can run
 * Wednesday's word search on a Sunday if he wants to.
 */
function WeekStrip({ skill, completedDayTasks, quizTakenThisWeek, onOpenActivity }) {
  const todayKey = getDayKeyForDate(new Date());
  const done = new Set([...(completedDayTasks || []), ...(quizTakenThisWeek ? ['fri'] : [])]);
  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">
        This week — a different activity every day
      </p>
      <div className="mt-2 space-y-1.5">
        {DAY_TASK_ORDER.map((day) => {
          const activity = WORD_ACTIVITIES[skill][day];
          const isToday = day === todayKey;
          const isDone = done.has(day);
          return (
            <button
              key={day}
              type="button"
              disabled={!onOpenActivity}
              onClick={() => onOpenActivity && onOpenActivity(day)}
              className={
                'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ' +
                (isToday
                  ? 'border-signal-cyan/50 bg-signal-cyan/5'
                  : 'border-space-700 bg-space-900 hover:border-signal-cyan/40')
              }
            >
              <span
                className={
                  'w-10 flex-none font-display text-[11px] uppercase tracking-widest ' +
                  (isToday ? 'text-signal-cyan' : 'text-ink-600')
                }
              >
                {DAY_NAMES[day]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-ink-100">{activity.label}</span>
                <span className="block text-xs text-ink-500">{activity.instructions}</span>
              </span>
              {isDone && <span className="flex-none text-[10px] font-display uppercase tracking-widest text-signal-green">Done</span>}
              {!isDone && onOpenActivity && (
                <span className="flex-none text-[10px] font-display uppercase tracking-widest text-signal-cyan">Open</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] text-ink-500">
        Each day is open whenever you want it — the day it sits on is when the schedule asks for it.
      </p>
    </div>
  );
}

const SKILL_LABELS = { spelling: 'Spelling', vocabulary: 'Vocabulary' };

/**
 * MONDAY — read the list.
 *
 * This screen used to be the word and nothing else for spelling: ten correctly
 * spelled words on a page, which is not study material. The whole difficulty of
 * spelling is the near-miss, and the pool already carries the exact near-misses
 * each word is quizzed against, so they are shown struck through underneath.
 *
 * It is also reachable any day, from the word list tiles and the weekend row —
 * `dayKey` only decides whether the "mark today's reading done" button appears,
 * so opening the list on a Wednesday to look something up cannot accidentally
 * tick Monday off.
 */
export function WeeklyWordStudy({ skill, dayKey, onStartQuiz, onOpenActivity, onExit }) {
  const getWeeklyWordList = useAppStore((s) => s.getWeeklyWordList);
  const getWordStudyRecord = useAppStore((s) => s.getWordStudyRecord);
  const completeWordIntroduceTask = useAppStore((s) => s.completeWordIntroduceTask);
  const { weekNumber, words, quizTakenThisWeek, wordMastery, completedDayTasks } = getWeeklyWordList(skill);
  const record = getWordStudyRecord()[skill];
  const [introduceDone, setIntroduceDone] = useState(false);
  const showIntroduceButton = dayKey === 'mon' && !introduceDone;

  const handleMarkIntroduceDone = async () => {
    await completeWordIntroduceTask(skill);
    setIntroduceDone(true);
  };

  const streakOf = (id) => (wordMastery && wordMastery[id] ? wordMastery[id].streak || 0 : 0);
  const isMastered = (id) => Boolean(wordMastery && wordMastery[id] && wordMastery[id].mastered);

  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={onExit} className="text-sm text-ink-500 hover:text-ink-100">
          ← Exit mission
        </button>
        <span className="text-sm text-ink-500">Week {weekNumber}</span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          {SKILL_LABELS[skill]} — Week {weekNumber} Word List
        </p>
        <h2 className="mt-2 font-display text-2xl font-700 text-ink-100">Study These {words.length} Words</h2>
        <p className="mt-1 text-sm text-ink-300">
          Get a word right {MASTERY_STREAK} times in a row and it leaves the list — a new one takes its place on
          Monday.
        </p>

        {/* THE COUNTER THE PARENT DASHBOARD WAS MISSING FOR THREE WEEKS. It read
            "words seen 10 / 360" because the list could not move; seen is
            exposure, and this is the number that means something. */}
        {record && (
          <p className="mt-3 text-xs text-ink-500">
            <span className="font-display uppercase tracking-widest text-signal-green">
              {record.wordsMastered} learned
            </span>{' '}
            of {record.poolSize} {skill} words so far.
          </p>
        )}

        <p className="mt-3 rounded-lg bg-space-900 p-3 text-xs text-ink-300">
          <span className="font-display uppercase tracking-widest text-signal-amber">How to study it</span>
          <span className="mt-1 block">
            {skill === 'spelling'
              ? 'Read the word, cover it, write it from memory, then check. The wrong spellings under each word are the ones people really write — look at the exact letters that change.'
              : 'Read the sentence first and guess the meaning from it before you read the answer. Then say the word in a sentence of your own.'}
          </span>
        </p>
      </div>

      <WeekStrip
        skill={skill}
        completedDayTasks={completedDayTasks}
        quizTakenThisWeek={quizTakenThisWeek}
        onOpenActivity={onOpenActivity}
      />

      <div className="space-y-2">
        {words.map((entry, i) => (
          <div
            key={entry.wordId ?? entry.id}
            className={
              'rounded-xl border p-4 shadow-panel ' +
              (isMastered(entry.id) ? 'border-signal-green/40 bg-signal-green/5' : 'border-space-700 bg-space-800')
            }
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-lg font-700 text-ink-100">
                <span className="mr-2 text-sm text-ink-600">{i + 1}.</span>
                {entry.word}
              </p>
              <span className="flex-none text-[10px] font-display uppercase tracking-widest text-ink-600">
                {isMastered(entry.id)
                  ? <span className="text-signal-green">Learned</span>
                  : `${streakOf(entry.id)}/${MASTERY_STREAK} in a row`}
              </span>
            </div>

            {skill === 'spelling' && Array.isArray(entry.distractors) && (
              <p className="mt-2 text-xs text-ink-500">
                <span className="font-display uppercase tracking-widest text-ink-600">Not</span>{' '}
                {entry.distractors.map((d, j) => (
                  <span key={d + j}>
                    {j > 0 && <span className="text-ink-600"> · </span>}
                    <span className="text-signal-amber line-through">{d}</span>
                  </span>
                ))}
              </p>
            )}

            {skill === 'vocabulary' && (
              <>
                <p className="mt-1 text-sm text-ink-300">{entry.sentence.replace('{word}', entry.word)}</p>
                <p className="mt-1 text-xs text-signal-green">
                  <span className="font-display uppercase tracking-widest text-ink-600">Means</span> {entry.correct}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {showIntroduceButton && (
        <button
          type="button"
          onClick={handleMarkIntroduceDone}
          className="w-full rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
        >
          Mark Today's Reading Done
        </button>
      )}
      {introduceDone && (
        <p className="text-center text-sm text-signal-green">
          Today's reading is done — tomorrow is {skill === 'spelling' ? 'spot the spelling' : 'word to meaning'}.
        </p>
      )}

      {/* Only when the week strip above is not already offering Friday — two
          buttons that open the same screen is the "Quiz" tile problem again. */}
      {onStartQuiz && !onOpenActivity && (
        <button
          type="button"
          onClick={onStartQuiz}
          className="w-full rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110"
        >
          {quizTakenThisWeek ? 'Retake This Week’s Test' : 'Take This Week’s Test'}
        </button>
      )}
    </div>
  );
}
