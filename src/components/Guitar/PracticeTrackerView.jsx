import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { todayDateStr } from '../../lib/scheduler.js';
import { toDateStr } from '../../lib/scheduler.js';
import { academyContent } from '../../content/academyContent.js';

const { GUITAR_DAILY_MINUTES, GUITAR_SESSION_SHAPE, getCurrentGuitarSkill, getGuitarTool, guitarSkillLadder } = academyContent().electives;

/**
 * THE PRACTICE TRACKER — the Habit Tracker widget from PROJECT_PLAN.md Part 5,
 * which had never been built for anything. Guitar is its first real use case.
 *
 * THIS IS DESIGNED AGAINST A SPECIFIC PROBLEM, not decorated with a streak
 * counter. The boy is not self-disciplined with this guitar; that is the entire
 * reason the subject exists. So:
 *
 *   - FIFTEEN MINUTES is the default and the button says fifteen. He will do
 *     fifteen most days and he will not do forty-five, and a routine he skips
 *     teaches him that he is someone who skips.
 *   - ONE SKILL is on the card. Not eight. The ladder exists so that he never
 *     has to decide what to practise, because deciding is where the fifteen
 *     minutes go.
 *   - TUNE FIRST is a button, not a sentence. It is step one of the loop —
 *     tune, watch, play, log — and an out-of-tune guitar is the fastest route
 *     to a beginner deciding he is bad at this.
 *   - THE STREAK DOES NOT SHOW A ZERO on a morning he simply has not practised
 *     yet (see getGuitarPracticeStreak in the store). Punishing him at nine in
 *     the morning for not having done the three-o'clock block is the exact
 *     opposite of what this widget is for.
 *
 * WHAT THIS DOES NOT DO, and must not pretend to: it cannot hear him. It has no
 * idea whether that was any good. Every number on this screen is a fact about
 * what he DID, and technique correction comes from a human — see the Recording
 * tab.
 */
export function PracticeTrackerView({ onOpenRecording }) {
  const guitarLog = useAppStore((s) => s.guitarLog);
  const recordGuitarLogEntry = useAppStore((s) => s.recordGuitarLogEntry);
  const getGuitarPracticeStreak = useAppStore((s) => s.getGuitarPracticeStreak);

  const [minutes, setMinutes] = useState(String(GUITAR_DAILY_MINUTES));
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const today = todayDateStr();
  const clearedNumbers = guitarLog
    .filter((r) => r.kind === 'skill-cleared')
    .map((r) => r.data?.skillNumber)
    .filter((n) => typeof n === 'number');
  const skill = getCurrentGuitarSkill(clearedNumbers);
  const practicedToday = guitarLog.some((r) => r.kind === 'practice' && r.date === today);
  const streak = getGuitarPracticeStreak();
  const tuner = getGuitarTool('guitar-tool-tuner');
  const tool = skill.toolId ? getGuitarTool(skill.toolId) : null;

  // Last 14 days, oldest first — a row of squares he can see at a glance.
  const recentDays = [];
  for (let i = 13; i >= 0; i -= 1) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = toDateStr(d);
    recentDays.push({
      key,
      label: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
      done: guitarLog.some((r) => r.kind === 'practice' && r.date === key)
    });
  }

  const handleLog = async () => {
    const mins = Math.max(1, Math.min(180, Math.round(Number(minutes) || GUITAR_DAILY_MINUTES)));
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'practice',
      skillId: skill.id,
      title: `Practice — ${skill.title}`,
      notes: notes.trim(),
      data: { minutes: mins, skillNumber: skill.number }
    });
    setNotes('');
    setMinutes(String(GUITAR_DAILY_MINUTES));
    setSaving(false);
  };

  const handleClearSkill = async () => {
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'skill-cleared',
      skillId: skill.id,
      title: `Skill cleared — ${skill.title}`,
      data: { skillNumber: skill.number }
    });
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {/* --- the streak strip ------------------------------------------- */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-display uppercase tracking-widest text-signal-amber">Practice streak</p>
          <p className="font-display text-2xl font-700 text-ink-100">
            {streak} <span className="text-sm font-600 text-ink-300">day{streak === 1 ? '' : 's'}</span>
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {recentDays.map((d) => (
            <span
              key={d.key}
              title={d.key}
              aria-label={`${d.key}: ${d.done ? 'practised' : 'no practice logged'}`}
              className={
                'flex h-7 w-7 items-center justify-center rounded text-[10px] font-display font-700 ' +
                (d.done ? 'bg-signal-green text-space-950' : 'border border-space-600 text-ink-500')
              }
            >
              {d.label}
            </span>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          Fifteen minutes a day, at 3:00, right after school ends. Missing one day is nothing. Missing
          three in a row is how a habit dies, so the squares are here to be looked at.
        </p>
      </div>

      {/* --- today's skill ---------------------------------------------- */}
      <div className="rounded-2xl border border-signal-cyan/40 bg-gradient-to-br from-[#16233b] to-space-800 p-5 shadow-glow">
        <p className="font-display text-[11px] uppercase tracking-widest text-signal-cyan">
          Skill {skill.number} of {guitarSkillLadder.length} · today's 15 minutes
        </p>
        <h3 className="mt-1 font-display text-2xl font-700 text-ink-100">{skill.title}</h3>
        <p className="mt-1 text-sm text-ink-300">{skill.whatItIs}</p>
        <p className="mt-2 text-xs text-ink-500">{skill.whyFirst}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={tuner.toolUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-signal-amber px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
          >
            1 · {tuner.toolLabel}
          </a>
          {skill.lesson ? (
            <a
              href={skill.lesson.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-signal-cyan/50 px-4 py-2 font-display text-sm font-700 text-signal-cyan transition hover:bg-signal-cyan/10"
            >
              2 · Watch the lesson
            </a>
          ) : (
            <span className="rounded-lg border border-space-600 px-4 py-2 font-display text-sm font-600 text-ink-500">
              2 · No video — this one is repetition
            </span>
          )}
          {tool && tool.id !== 'guitar-tool-tuner' && (
            <a
              href={tool.toolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-space-600 px-4 py-2 font-display text-sm font-600 text-ink-300 transition hover:text-ink-100"
            >
              {tool.toolLabel}
            </a>
          )}
        </div>

        {skill.lesson && <p className="mt-2 text-xs text-ink-500">{skill.lesson.label}</p>}
        {skill.noLessonReason && <p className="mt-2 text-xs text-ink-500">{skill.noLessonReason}</p>}
        {skill.alsoWatch && (
          <p className="mt-1 text-xs text-ink-500">
            Also worth watching:{' '}
            <a href={skill.alsoWatch.url} target="_blank" rel="noopener noreferrer" className="text-signal-cyan underline">
              {skill.alsoWatch.label}
            </a>
          </p>
        )}
        {skill.fromGrade2 && (
          <p className="mt-2 rounded-lg border border-signal-amber/30 bg-signal-amber/5 p-2 text-xs text-ink-300">
            This one comes from JustinGuitar's Grade 2, not Grade 1 — on purpose. His course is built
            acoustic-first, and you are on an electric. Power chords are two fingers and they sound like the
            record, so you are not waiting three months for them.
          </p>
        )}
      </div>

      {/* --- the session shape ------------------------------------------ */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">How the 15 minutes go</p>
        <div className="mt-2 space-y-2">
          {GUITAR_SESSION_SHAPE.map((part) => (
            <div key={part.id} className="flex gap-3">
              <span className="w-12 flex-none font-display text-sm font-700 text-signal-cyan">{part.minutes} min</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-ink-100">{part.label}</span>
                <span className="block text-xs text-ink-500">{part.detail}</span>
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs font-display uppercase tracking-widest text-ink-500">What to do today</p>
        <ul className="mt-1 space-y-1">
          {skill.practice.map((step, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-300">
              <span className="flex-none text-ink-600">·</span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-space-900 p-2 text-xs text-ink-300">
          <b className="text-ink-100">You will know you have it when:</b> {skill.youWillKnowItWhen}
        </p>
      </div>

      {/* --- log it ------------------------------------------------------ */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          {practicedToday ? 'Practice already logged today — log another session if you did one' : '3 · Log your practice'}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-[8rem_1fr]">
          <label className="block">
            <span className="text-xs font-display uppercase tracking-widest text-ink-500">Minutes</span>
            <input
              type="number"
              inputMode="numeric"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
            />
          </label>
          <label className="block">
            <span className="text-xs font-display uppercase tracking-widest text-ink-500">
              How did it go (optional)
            </span>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="The change from the 5th fret to the 3rd is still slow."
              className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleLog}
          disabled={saving}
          className="mt-3 w-full rounded-lg bg-signal-cyan px-4 py-2.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110 disabled:cursor-default disabled:bg-space-700 disabled:text-ink-500"
        >
          Log {minutes || GUITAR_DAILY_MINUTES} minutes of practice
        </button>
        <button
          type="button"
          onClick={handleClearSkill}
          disabled={saving}
          className="mt-2 w-full rounded-lg border border-space-600 px-4 py-2 font-display text-xs font-600 text-ink-300 transition hover:text-ink-100 disabled:text-ink-600"
        >
          I can do this one now — move me to skill {Math.min(skill.number + 1, guitarSkillLadder.length)}
        </button>
        <p className="mt-2 text-xs text-ink-500">
          Only you can say whether you have a skill — nothing here can hear you play. Be honest with it; moving
          on before a skill is solid is how step 8 becomes impossible.
        </p>
        {onOpenRecording && (
          <button
            type="button"
            onClick={onOpenRecording}
            className="mt-3 text-xs text-signal-cyan underline"
          >
            Nobody here plays guitar — so how do you know if you are doing it right?
          </button>
        )}
      </div>
    </div>
  );
}
