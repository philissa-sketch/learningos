import { useState } from 'react';
import { GlossaryText } from '../Mentor/GlossaryText.jsx';

export function QuestionCard({ question, index, total, onSubmit, locked, lastResult, glossaryTerms }) {
  const [choiceValue, setChoiceValue] = useState(null);
  const [textValue, setTextValue] = useState('');

  const canSubmit = question.type === 'choice' ? choiceValue !== null : textValue.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit || locked) return;
    onSubmit(question.type === 'choice' ? choiceValue : textValue);
  };

  const feedbackText = lastResult?.feedback ?? question.explanation;
  const feedbackParagraphs = feedbackText ? feedbackText.split('\n\n').filter(Boolean) : [];

  return (
    <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
      <p className="text-xs font-display uppercase tracking-widest text-ink-500">
        Question {index + 1} of {total}
      </p>
      <p className="mt-2 font-display text-lg font-600 text-ink-100">
        <GlossaryText text={question.prompt} terms={glossaryTerms} />
      </p>

      {question.type === 'choice' ? (
        <div className="mt-4 space-y-2">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              type="button"
              disabled={locked}
              onClick={() => setChoiceValue(i)}
              className={
                'block w-full rounded-lg border px-4 py-2 text-left text-sm transition ' +
                (choiceValue === i
                  ? 'border-signal-cyan bg-signal-cyan/10 text-ink-100'
                  : 'border-space-600 bg-space-900 text-ink-300 hover:border-signal-cyan/50') +
                (locked ? ' cursor-not-allowed opacity-70' : '')
              }
            >
              {choice}
            </button>
          ))}
        </div>
      ) : question.type === 'shortAnswer' ? (
        // A paragraph needs room to write. A single-line input silently tells
        // a student to answer in a few words, which is the opposite of what a
        // short-answer question is asking for.
        <textarea
          rows={5}
          disabled={locked}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Answer in your own words — a few sentences"
          className="mt-4 w-full rounded-lg border border-space-600 bg-space-900 px-4 py-2 text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
      ) : (
        <input
          type="text"
          disabled={locked}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Type your answer"
          className="mt-4 w-full rounded-lg border border-space-600 bg-space-900 px-4 py-2 text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
        />
      )}

      {lastResult && (
        <div
          className={
            'mt-4 rounded-lg border p-3 text-sm ' +
            (lastResult.awaitingParentGrade
              ? 'border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan'
              : lastResult.correct
                ? 'border-signal-green/40 bg-signal-green/10 text-signal-green'
                : 'border-signal-red/40 bg-signal-red/10 text-signal-red')
          }
        >
          {/* A written answer gets neither green nor red. Showing "Not quite"
              on an answer nobody has read yet would be a lie, and a red box is
              a discouraging thing to hand a student for writing carefully. */}
          <p className="font-display font-700">
            {lastResult.awaitingParentGrade ? 'Answer saved' : lastResult.correct ? 'Correct' : 'Not quite'}
          </p>
          <div className="mt-2 space-y-2 text-ink-300">
            {feedbackParagraphs.map((para, i) => (
              <p key={i} className={i > 0 ? 'border-t border-space-700 pt-2' : ''}>
                <GlossaryText text={para} terms={glossaryTerms} />
              </p>
            ))}
          </div>
        </div>
      )}

      {!locked && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-4 rounded-lg bg-signal-cyan px-4 py-2 font-display font-700 text-space-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
}
