import { useState } from 'react';

/**
 * Renders `text` with any word matching a key in `terms` (a { term:
 * definition } dict) turned into a tap-or-hover target showing the
 * definition — so a word only has to be defined once per lesson, but
 * shows its definition every time it appears anywhere in that lesson
 * (teaching text, practice questions, test questions, explanations),
 * not just the one sentence where it was first introduced.
 *
 * Works on both desktop (hover) and touch devices (tap toggles it),
 * since hover alone doesn't work on a phone or tablet.
 */
export function GlossaryText({ text, terms, keyPrefix = '' }) {
  if (!terms || Object.keys(terms).length === 0 || !text) return <>{text}</>;

  const termNames = Object.keys(terms).sort((a, b) => b.length - a.length); // longest first, avoids partial overlaps
  const escaped = termNames.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const matchedTerm = termNames.find((t) => t.toLowerCase() === part.toLowerCase());
        if (matchedTerm) {
          return <TermSpan key={keyPrefix + i} definition={terms[matchedTerm]} display={part} />;
        }
        return <span key={keyPrefix + i}>{part}</span>;
      })}
    </>
  );
}

function TermSpan({ definition, display }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="cursor-help border-b border-dotted border-signal-cyan text-signal-cyan"
      >
        {display}
      </button>
      {open && (
        <span className="absolute left-0 top-full z-20 mt-1 block w-56 rounded-lg border border-signal-cyan/40 bg-space-900 p-2 text-left text-xs font-normal text-ink-100 shadow-lg">
          {definition}
        </span>
      )}
    </span>
  );
}
