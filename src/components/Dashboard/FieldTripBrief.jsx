import { useAppStore } from '../../store/useAppStore.js';
import { tripSubjectLabel } from '../../lib/fieldTrips.js';

/**
 * A FIELD TRIP, ON HIS SIDE. (Oct 6, 2026.)
 *
 * The parent: he could not select his field trips from his home page — "when hovering or when clicks on them nothing happens." The trip rows
 * were plain text, and there was nowhere for them to go: a trip was only ever
 * a record on her Parent Dashboard. This is the read-only page a trip row
 * opens for him — where, when, which subjects, her notes, and the learning
 * pack if she has generated one. It changes nothing; planning, completing and
 * hours stay on her side.
 */
const asList = (v) => (Array.isArray(v) ? v.filter(Boolean) : []);

function formatTripDate(dateStr) {
  if (!dateStr) return 'No date yet';
  const d = new Date(`${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
}

function List({ items }) {
  const list = asList(items);
  if (list.length === 0) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink-300">
      {list.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

function Block({ title, children }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-display uppercase tracking-widest text-ink-500">{title}</p>
      {children}
    </div>
  );
}

export function FieldTripBrief({ tripId, onExit }) {
  const trip = useAppStore((s) => (s.fieldTrips || []).find((t) => t.id === tripId)) || null;

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <button
        type="button"
        onClick={onExit}
        className="rounded-lg border border-space-600 px-3 py-1.5 text-xs font-display font-700 text-ink-100 transition hover:border-signal-cyan/50"
      >
        ← Back
      </button>

      {!trip ? (
        <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
          <p className="font-display text-sm font-700 text-ink-100">This field trip is no longer on the list.</p>
          <p className="mt-1 text-sm text-ink-400">It may have been moved or removed. Ask your parent.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-signal-cyan/30 bg-space-800 p-5 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Field Trip</p>
          <h2 className="mt-1 font-display text-xl font-700 text-ink-100">{trip.destination || 'Untitled trip'}</h2>
          <p className="mt-1 text-sm text-ink-300">
            {formatTripDate(trip.date)}
            {trip.time ? ` · ${trip.time}` : ''}
            {trip.status === 'completed' ? ' · Completed' : ''}
          </p>
          {asList(trip.subjects).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {asList(trip.subjects).map((s) => (
                <span key={s} className="rounded-full bg-space-900 px-2 py-0.5 text-[11px] text-ink-300">{tripSubjectLabel(s)}</span>
              ))}
            </div>
          )}
          {trip.notes && <p className="mt-3 whitespace-pre-wrap text-sm text-ink-300">{trip.notes}</p>}

          {trip.learningPack ? (
            <div className="mt-4 rounded-lg border border-space-700 bg-space-950 p-4">
              {trip.learningPack.before && (
                <>
                  <p className="font-display text-sm font-700 text-signal-cyan">Before You Go</p>
                  {trip.learningPack.before.background && <p className="mt-1 text-sm text-ink-300">{trip.learningPack.before.background}</p>}
                  <Block title="Objectives"><List items={trip.learningPack.before.objectives} /></Block>
                  {asList(trip.learningPack.before.vocabulary).length > 0 && (
                    <Block title="Vocabulary">
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {asList(trip.learningPack.before.vocabulary).map((v, i) => (
                          <span key={i} className="rounded-full border border-space-600 px-2 py-0.5 text-xs text-ink-300">{v}</span>
                        ))}
                      </div>
                    </Block>
                  )}
                  <Block title="Essential Questions"><List items={trip.learningPack.before.essentialQuestions} /></Block>
                  <Block title="Safety"><List items={trip.learningPack.before.safety} /></Block>
                  <Block title="Packing List"><List items={trip.learningPack.before.packing} /></Block>
                </>
              )}
              {trip.learningPack.during && (
                <>
                  <p className="mt-5 font-display text-sm font-700 text-signal-cyan">During the Trip</p>
                  <Block title="Observe"><List items={trip.learningPack.during.observation} /></Block>
                  <Block title="Photos"><List items={trip.learningPack.during.photo} /></Block>
                  <Block title="Scavenger Hunt"><List items={trip.learningPack.during.scavengerHunt} /></Block>
                  <Block title="Journal Prompts"><List items={trip.learningPack.during.journalPrompts} /></Block>
                </>
              )}
              {trip.learningPack.after && (
                <>
                  <p className="mt-5 font-display text-sm font-700 text-signal-cyan">After the Trip</p>
                  <Block title="Reflection"><List items={trip.learningPack.after.reflection} /></Block>
                  {trip.learningPack.after.writingAssignment && (
                    <Block title="Writing Assignment"><p className="mt-1 text-sm text-ink-300">{trip.learningPack.after.writingAssignment}</p></Block>
                  )}
                  <Block title="Discussion"><List items={trip.learningPack.after.discussion} /></Block>
                  {trip.learningPack.after.portfolioPrompt && (
                    <Block title="Portfolio"><p className="mt-1 text-sm text-ink-300">{trip.learningPack.after.portfolioPrompt}</p></Block>
                  )}
                </>
              )}
            </div>
          ) : (
            <p className="mt-4 text-sm text-ink-500">No learning pack for this trip yet. Your parent adds it before you go.</p>
          )}
        </div>
      )}
    </div>
  );
}
