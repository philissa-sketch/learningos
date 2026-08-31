import { useEffect, useRef, useState } from 'react';
import { loadTypingScore } from '../../db/db.js';
import { useAppStore } from '../../store/useAppStore.js';

const PASSAGES = [
  {
    id: 'typing-1',
    text: 'The rocket cleared the launch tower and climbed steadily into the morning sky.'
  },
  {
    id: 'typing-2',
    text: 'Engineers checked every system twice before signing off on the flight readiness review.'
  },
  {
    id: 'typing-3',
    text: 'Mission control confirmed a stable orbit as the spacecraft continued its journey outward.'
  },
  {
    id: 'typing-4',
    text: 'A well designed wing generates enough lift to carry the entire weight of the aircraft.'
  },
  {
    id: 'typing-5',
    text: 'The astronaut ran through the checklist calmly, focused on each step in careful order.'
  },
  {
    id: 'typing-6',
    text: 'Every bolt on the launch vehicle is torqued to an exact specification before flight.'
  },
  {
    id: 'typing-7',
    text: 'The rover extended its robotic arm and carefully collected a sample of Martian soil.'
  },
  {
    id: 'typing-8',
    text: 'A sudden change in wind speed forced the team to delay the test flight by an hour.'
  },
  {
    id: 'typing-9',
    text: 'Scientists analyzed the data from the probe long after it had left the outer planets.'
  },
  {
    id: 'typing-10',
    text: 'The engineering team spent months refining the prototype before it ever left the lab.'
  },
  {
    id: 'typing-11',
    text: 'Ground control tracked the satellite as it passed silently over the northern hemisphere.'
  },
  {
    id: 'typing-12',
    text: 'A single loose wire can cause an entire electrical system to fail without warning.'
  },
  {
    id: 'typing-13',
    text: 'The pilot adjusted the throttle smoothly as the aircraft leveled off at cruising altitude.'
  },
  {
    id: 'typing-14',
    text: 'Every mission begins with careful planning long before anyone reaches the launch pad.'
  },
  {
    id: 'typing-15',
    text: 'The telescope captured a faint image of a galaxy billions of light years away.'
  },
  {
    id: 'typing-16',
    text: 'Astronauts train for years to prepare for the physical demands of living in space.'
  },
  {
    id: 'typing-17',
    text: 'The heat shield protected the capsule as it plunged back into the atmosphere at high speed.'
  },
  {
    id: 'typing-18',
    text: 'A small design flaw discovered early can save an enormous amount of time and money later.'
  },
  {
    id: 'typing-19',
    text: 'The team ran dozens of simulations before ever attempting the real test flight.'
  },
  {
    id: 'typing-20',
    text: 'Clear communication between every member of the crew is essential during an emergency.'
  },
  {
    id: 'typing-21',
    text: 'The solar panels unfolded slowly, catching the first sunlight of the new orbit.'
  },
  {
    id: 'typing-22',
    text: 'Precision matters most when there is no room left for a second attempt.'
  },
  {
    id: 'typing-23',
    text: 'The engineer double checked her calculations before submitting the final design.'
  },
  {
    id: 'typing-24',
    text: 'A successful landing depends on thousands of decisions made correctly in sequence.'
  },
  {
    id: 'typing-25',
    text: 'Curiosity and careful observation are the two habits every good scientist shares.'
  }
];

function pickPassage() {
  return PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
}

export function TypingPractice({ onExit }) {
  const [passage, setPassage] = useState(() => pickPassage());
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null); // { wpm, accuracy } | null
  const [bestWpm, setBestWpm] = useState(null);
  const inputRef = useRef(null);
  const recordTypingSpeedTest = useAppStore((s) => s.recordTypingSpeedTest);

  useEffect(() => {
    loadTypingScore(passage.id).then((row) => setBestWpm(row?.bestWpm ?? null));
  }, [passage.id]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime && value.length > 0) setStartTime(Date.now());
    setTyped(value);

    if (value.length >= passage.text.length) {
      finish(value);
    }
  };

  const finish = async (finalValue) => {
    const elapsedMinutes = Math.max((Date.now() - startTime) / 1000 / 60, 0.01);
    const words = passage.text.trim().split(/\s+/).length;
    const wpm = Math.round(words / elapsedMinutes);

    let correctChars = 0;
    for (let i = 0; i < passage.text.length; i++) {
      if (finalValue[i] === passage.text[i]) correctChars += 1;
    }
    const accuracy = Math.round((correctChars / passage.text.length) * 100);

    setResult({ wpm, accuracy });

    /**
     * ---- THIS USED TO WRITE STRAIGHT TO THE SCORES TABLE. (Aug 26, 2026.) ----
     *
     * Four lines that saved a personal best and did nothing else — no
     * attendance bump, no dated row, no block credit. So a finished passage
     * was real work that booked NOTHING, and block-5b's fifteen minutes a day
     * could not reach his Georgia record no matter how often he practised.
     *
     * The store action does all four. A screen writing to the database behind
     * the store is a screen that will keep missing whichever of the four gets
     * added next.
     */
    const { bestWpm: newBest } = await recordTypingSpeedTest(passage.id, { wpm, accuracy });
    setBestWpm(newBest);
  };

  const tryAnother = () => {
    setPassage(pickPassage());
    setTyped('');
    setStartTime(null);
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (result) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 px-4 py-6 sm:px-6">
        <div className="rounded-xl border border-signal-green/40 bg-signal-green/5 p-6 text-center shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-green">Passage Complete</p>
          {/* ACCURACY LEADS, WPM FOLLOWS — and it is the other way round in
              every typing app he has ever seen, which is the point. Until
              Aug 9 2026 this screen shouted WPM in 3xl and whispered accuracy
              underneath, while Typing II taught him "accuracy before speed."
              A number that big IS the instruction, whatever the lesson said. */}
          <h2 className="mt-2 font-display text-3xl font-700 text-ink-100">{result.accuracy}% accurate</h2>
          <p className="mt-1 text-sm text-ink-300">{result.wpm} WPM</p>
          {result.accuracy < 95 ? (
            <p className="mt-2 text-xs text-signal-amber">
              Under 95% — run it again slower. Speed built on wrong fingers is far harder to undo later.
            </p>
          ) : (
            <p className="mt-2 text-xs text-signal-green">
              95%+. This is the pace to build speed from.
            </p>
          )}
          {bestWpm && <p className="mt-1 text-xs text-ink-500">Personal best on this passage: {bestWpm} WPM</p>}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={tryAnother}
              className="rounded-lg bg-space-700 px-4 py-2 font-display font-700 text-ink-100 transition hover:bg-space-600"
            >
              Try Another Passage
            </button>
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
        <span className="text-sm text-ink-500">Typing Practice</span>
      </div>

      <div className="rounded-xl border border-space-700 bg-space-800 p-6 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Type This Passage</p>
        {bestWpm && <p className="mt-1 text-xs text-ink-500">Personal best: {bestWpm} WPM</p>}
        <p className="mt-4 font-mono text-lg leading-relaxed">
          {passage.text.split('').map((char, i) => {
            let className = 'text-ink-500';
            if (i < typed.length) {
              className = typed[i] === char ? 'text-signal-green' : 'text-signal-red';
            }
            return (
              <span key={i} className={className}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={handleChange}
        rows={4}
        autoFocus
        placeholder="Start typing here…"
        className="w-full resize-none rounded-lg border border-space-700 bg-space-900 p-3 font-mono text-ink-100 placeholder:text-ink-500 focus:border-signal-cyan focus:outline-none"
      />
    </div>
  );
}
