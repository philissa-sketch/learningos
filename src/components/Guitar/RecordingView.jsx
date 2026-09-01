import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { academyContent } from '../../content/academyContent.js';

const { guitarFeedbackPlaces = [] } = academyContent().electives;

/**
 * THE RECORDING ROUTINE — and the parent-facing safety text, which is NOT
 * buried anywhere. It is on this screen, above the button, in full.
 *
 * -- WHY RECORDED AND NEVER LIVE, and it is a safety decision first ----------
 * This app cannot hear him. It cannot tell whether he is in tune, whether his
 * timing drifts, or whether his fretting hand is collapsing in a way that will
 * hurt him in a year — and no free software solves that last one. So technique
 * correction has to come from a human being. The question is which shape that
 * takes, and there are only two options.
 *
 * A twelve-year-old on a one-to-one live video call with an unvetted adult is
 * not a thing this app will help set up. A short clip, framed on his hands,
 * posted publicly by his mother from her own account, is a different category
 * entirely. That is the whole design.
 *
 * It also happens to be BETTER feedback: a reviewer can pause, rewatch and slow
 * a hand position down. Live, they get one look.
 *
 * -- RECORDING DOUBLES AS EVIDENCE -------------------------------------------
 * Record at the start of a quarter and again at the end, side by side. That is
 * portfolio material for his homeschool record, and it is the before-and-after
 * measurement this app asks for in every other applied subject. For a boy who
 * is not naturally disciplined, watching himself visibly improve beats a
 * counter — a streak says he showed up, a recording proves it worked.
 */

const SAFETY_RULES = [
  {
    rule: 'Sixty to ninety seconds, framed on your hands and the guitar — not your face.',
    why: 'A reviewer needs to see the fretting hand and the picking hand. Nothing else in the shot is any use to them.'
  },
  {
    rule: 'Your mother posts it, from her account, in a public thread.',
    why: 'Not his account, and not a private one. A public thread means everything said is said in front of everyone.'
  },
  {
    rule: 'No school name, no location, no last name, nothing on a wall behind you that says either.',
    why: 'Check the background before you press record, not after you press post.'
  },
  {
    rule: 'If anyone tries to move it into private messages, that is the stop signal.',
    why: 'A real teacher answering a public question has no reason to take it private. That is the whole rule, and it does not need a second opinion.'
  }
];

export function RecordingView() {
  const guitarLog = useAppStore((s) => s.guitarLog);
  const recordGuitarLogEntry = useAppStore((s) => s.recordGuitarLogEntry);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const recordings = guitarLog.filter((r) => r.kind === 'recording');

  const logRecording = async () => {
    setSaving(true);
    await recordGuitarLogEntry({
      kind: 'recording',
      title: 'Recording made',
      notes: notes.trim(),
      data: { when: new Date().toISOString() }
    });
    setNotes('');
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          The honest limitation
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">
          This app cannot hear you. It does not know whether you are in tune, whether your timing drifts, or
          whether your fretting wrist is bent in a way that will start hurting in a year. Nothing free does.
          So the app handles what to practise and whether you practised — and a person handles whether you are
          doing it right.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">
          The way you get a person is a short recording, posted where guitarists are. Not a live call. A clip
          is better anyway: they can pause it, watch it twice, and slow your hand down.
        </p>
      </div>

      {/* --- the safety rules, in full, unburied ------------------------- */}
      <div className="rounded-xl border border-signal-amber/40 bg-signal-amber/5 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-amber">
          The rules — for both of you, before anything is posted
        </p>
        <div className="mt-3 space-y-3">
          {SAFETY_RULES.map((r, i) => (
            <div key={i}>
              <p className="font-display text-sm font-700 text-ink-100">{r.rule}</p>
              <p className="mt-0.5 text-xs text-ink-300">{r.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- where to post ----------------------------------------------- */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-ink-500">Where it goes</p>
        <div className="mt-2 space-y-2">
          {guitarFeedbackPlaces.map((place) => (
            <div key={place.id} className="rounded-lg bg-space-900 p-3">
              <p className="font-display text-sm font-700 text-ink-100">
                {place.url ? (
                  <a href={place.url} target="_blank" rel="noopener noreferrer" className="text-signal-cyan underline">
                    {place.name}
                  </a>
                ) : (
                  place.name
                )}
                {place.recommended && (
                  <span className="ml-2 rounded-full bg-signal-green px-2 py-0.5 text-[10px] font-display font-700 text-space-950">
                    Start here
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs text-ink-300">{place.what}</p>
              <p className="mt-1 text-xs text-ink-500">{place.whyHere}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-500">
          For eyes in the room rather than on a screen: guitar shops often give a free trial lesson, and it is
          a sales funnel and a real lesson at the same time — ask how long it runs, whether it is in person,
          and whether anything is expected afterwards. Churches, the library, a homeschool co-op and the
          neighbourhood are all places where one ask turns a guitarist up.
        </p>
      </div>

      {/* --- before and after -------------------------------------------- */}
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">
          Record at the start of a quarter, and again at the end
        </p>
        <p className="mt-1 text-sm text-ink-300">
          Play the same thing both times. Side by side, those two clips are the clearest evidence that any of
          this worked — clearer than a streak, and clearer than a grade. They also go straight into his
          homeschool portfolio as real work.
        </p>
        <label className="mt-3 block">
          <span className="text-xs font-display uppercase tracking-widest text-ink-500">
            What is on this recording
          </span>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Week 1 — Peter Gunn, slow, lots of buzzing."
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-900 px-3 py-2 text-sm text-ink-100"
          />
        </label>
        <button
          type="button"
          onClick={logRecording}
          disabled={saving}
          className="mt-3 w-full rounded-lg bg-signal-cyan px-4 py-2.5 font-display text-sm font-700 text-space-950 transition hover:brightness-110 disabled:cursor-default disabled:bg-space-700 disabled:text-ink-500"
        >
          Log a recording
        </button>
        <p className="mt-2 text-xs text-ink-500">
          The app records that a recording exists and what was on it. The video file itself stays wherever your
          mother keeps it — this app deliberately stores no files.
        </p>
      </div>

      {recordings.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-display uppercase tracking-widest text-ink-500">
            Recordings so far ({recordings.length})
          </p>
          {[...recordings].reverse().map((row) => (
            <div key={row.id} className="rounded-xl border border-space-700 bg-space-800 p-3 shadow-panel">
              <div className="flex items-start justify-between gap-3">
                <p className="font-display text-sm font-700 text-ink-100">{row.notes || row.title}</p>
                <span className="flex-none text-xs text-ink-500">{row.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
