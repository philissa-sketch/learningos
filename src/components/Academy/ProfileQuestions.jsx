import { useState } from 'react';
import {
  PROFILE_SECTIONS,
  profileAnswers,
  profileCompleteness
} from '../../lib/learnerProfile.js';

/**
 * =============================================================================
 * THE SETUP QUESTIONS. (Sept 18, 2026 — audit finding 5, second half.)
 * =============================================================================
 *
 * The front door had been promising these since the day it was built:
 *
 *   > "It starts empty: you'll answer the setup questions and enter their
 *   >  placement next, and that is what fills it in."
 *
 * There were no setup questions. The audit's words for it were *"the front door
 * promises setup questions that do not exist"*, and the first half of the fix
 * gave the answers somewhere to live (src/lib/learnerProfile.js, db.js v36).
 * This is the other half: the asking.
 *
 * ---- WHAT THIS COMPONENT IS NOT ----
 *
 * It is not a wizard. A family does not answer six sections in one sitting, and
 * a flow that insists on it produces either an abandoned setup or six sections
 * of guesses. Every section stands alone, can be answered in any order, months
 * apart, and edited forever after — which is the point, because the thing it is
 * recording changes.
 *
 * It holds no state of its own beyond the box being typed in. The profile comes
 * in as a prop and every save goes out through `onSave`, so this same screen
 * serves a brand-new Academy at the front door and a running school's parent
 * area without either of them teaching it anything.
 *
 * ---- WHY A REFUSAL IS PRINTED AND NOT SWALLOWED ----
 *
 * `onSave` answers `{ok:true}` or `{ok:false, message}`. The message is shown,
 * verbatim, next to the section it was about. A parent has just typed for ten
 * minutes; a save that quietly does nothing is the worst thing this screen
 * could do, and it is the thing an unchecked save does by default.
 */
export function ProfileQuestions({ profile, onSave, heading = 'Setup questions' }) {
  const [openId, setOpenId] = useState(null);
  const done = profileCompleteness(profile);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Setup</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">{heading}</h3>
        <p className="mt-2 text-sm text-ink-300">
          What you say here is kept exactly as you write it. Nothing is worked out from it and
          nothing is filled in for you — an age does not become a grade, and a reading level does
          not become a year group.
        </p>
        <p className="mt-2 text-sm text-ink-300">
          Answer them in any order, a section at a time, and change them whenever they stop being
          true. Leaving a question blank is an answer too.
        </p>
        <p className="mt-3 text-xs text-ink-400">
          {done.answered} of {done.total} sections answered
          {done.complete ? ' — all of them.' : '.'}
        </p>
      </div>

      {PROFILE_SECTIONS.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          answers={profileAnswers(profile, section.id)}
          open={openId === section.id}
          onOpen={() => setOpenId(openId === section.id ? null : section.id)}
          onSave={onSave}
        />
      ))}
    </div>
  );
}

function SectionCard({ section, answers, open, onOpen, onSave }) {
  const [draft, setDraft] = useState(null);
  const [refusal, setRefusal] = useState('');
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  // The draft starts as whatever is stored, and is thrown away on close, so
  // re-opening a section always shows what is actually saved rather than an
  // abandoned edit from earlier in the sitting.
  const current = draft === null ? answers : draft;
  const answeredCount = section.questions.filter((q) => hasValue(answers[q.id])).length;

  function setField(id, value) {
    setSaved(false);
    setRefusal('');
    setDraft({ ...current, [id]: value });
  }

  async function save() {
    setBusy(true);
    setRefusal('');
    try {
      const outcome = await onSave(section.id, current);
      if (outcome && outcome.ok) {
        setSaved(true);
        setDraft(null);
      } else {
        // Printed as given. This screen does not write its own wording for a
        // refusal it did not decide.
        setRefusal(outcome?.message || 'That did not save. Nothing was changed.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <button
        type="button"
        onClick={() => { onOpen(); setDraft(null); setRefusal(''); setSaved(false); }}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span>
          <span className="block font-display text-base font-700 text-ink-100">{section.label}</span>
          <span className="mt-1 block text-sm text-ink-300">{section.blurb}</span>
        </span>
        <span className="shrink-0 text-xs text-ink-400">
          {answeredCount > 0 ? `${answeredCount} of ${section.questions.length}` : 'Not started'}
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-space-700 pt-4">
          {section.questions.map((q) => (
            <Question key={q.id} question={q} value={current[q.id]} onChange={(v) => setField(q.id, v)} />
          ))}

          {refusal ? (
            <p className="text-sm text-amber-300" role="alert">{refusal}</p>
          ) : null}
          {saved ? <p className="text-sm text-signal-cyan">Saved.</p> : null}

          <div className="flex gap-3">
            <button
              type="button"
              disabled={busy}
              onClick={save}
              className="rounded-lg bg-signal-cyan px-4 py-2 text-sm font-700 text-space-900 disabled:opacity-60"
            >
              {busy ? 'Saving…' : 'Save this section'}
            </button>
            <button
              type="button"
              onClick={() => { setDraft(null); setRefusal(''); setSaved(false); }}
              className="rounded-lg border border-space-700 px-4 py-2 text-sm text-ink-300"
            >
              Undo my changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Question({ question, value, onChange }) {
  const id = `profile-${question.id}`;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-700 text-ink-200">
        {question.label}
      </label>
      {question.hint ? <p className="mt-1 text-xs text-ink-400">{question.hint}</p> : null}

      {question.type === 'text' && (
        <input
          id={id}
          type="text"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />
      )}

      {question.type === 'long' && (
        <textarea
          id={id}
          rows={3}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-sm text-ink-100"
        />
      )}

      {question.type === 'choice' && (
        <div className="mt-2 space-y-1">
          {question.options.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm text-ink-200">
              <input
                type="radio"
                name={id}
                checked={value === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'multi' && (
        <div className="mt-2 space-y-1">
          {question.options.map((option) => {
            const chosen = Array.isArray(value) && value.includes(option);
            return (
              <label key={option} className="flex items-center gap-2 text-sm text-ink-200">
                <input
                  type="checkbox"
                  checked={chosen}
                  onChange={() =>
                    onChange(
                      chosen
                        ? (value || []).filter((v) => v !== option)
                        : [...(Array.isArray(value) ? value : []), option]
                    )
                  }
                />
                {option}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function hasValue(v) {
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.trim() !== '';
  return v !== undefined && v !== null;
}
