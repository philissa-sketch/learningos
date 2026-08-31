import { useMemo, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';

/**
 * THE DOMAINS-LAYER ENTRY — where a project lives whole.
 * (PROJECT_PLAN.md "Applied Learning — the domains layer". Built Aug 9, 2026.)
 *
 * ---- WHAT THIS IS ----
 *
 * The parent's own framing: "I want him to view his life as a plan to better
 * himself and his environment." The subjects teach; the domains are where it
 * gets proven. Aerospace teaches him to change one variable and measure — the
 * garden is where he runs that test. This is the form that holds one of those
 * from problem to result.
 *
 * The plan asked for three things and said only one was content: a repeatable
 * research method, an entry type where a project lives whole, and the domains
 * themselves. This is thing two, and it was the piece still missing in the week
 * its first real user starts — the sun survey runs from Friday August 14.
 *
 * ---- THE SEVEN PARTS, AND WHY EACH ONE IS SEPARATE ----
 *
 * They are separate fields rather than one text box because a text box lets him
 * skip the hard ones. Each is the engineering design cycle with source
 * evaluation welded on the front:
 *
 *   Problem      Stated as a number he can move. "The garden needs more space"
 *                is a wish. "The back buckets get 2.5 hours of sun and the
 *                front get 5 — can I raise the back above 4?" is a project.
 *   Already knew Written BEFORE looking anything up, so he can find out later
 *                whether he was right. A prediction written down beforehand is
 *                worth ten explanations invented afterwards.
 *   Sources      Where he looked AND why he trusts it. The 'why' is the whole
 *                point — it is the same evidence-evaluation skill Social
 *                Studies Q2 teaches for genealogy, met against a new target.
 *                Without it, "go research it" hands a twelve-year-old a blog
 *                post to copy, which the plan names as a risk by name.
 *   Found        In his own words. Not a quote.
 *   Changed      ONE thing. One variable, or the measurement means nothing.
 *   Measured     Before and after, as numbers. The plan calls this the single
 *                discipline that stops the whole layer going vague.
 *   Next         A real result always arrives with a next move attached.
 *
 * ---- GRADED ON PROCESS, NEVER OUTCOME ----
 *
 * The tomato dies and the shelf is crooked. That is not the failure, and this
 * screen never says it is. The progress meter counts how many of the seven
 * parts are genuinely filled in — the part he controls — and nothing anywhere
 * scores whether the number moved the way he hoped.
 */

const DOMAINS = [
  { id: 'garden', label: 'Garden', hint: '32 square feet under an awning' },
  { id: 'room', label: 'Room', hint: 'Where a real wall needs a real shelf' },
  { id: 'body', label: 'Body', hint: 'Strength, food, sleep — measurable, all of it' }
];

function Field({ label, hint, value, onChange, rows = 2, placeholder }) {
  return (
    <label className="block">
      <span className="block font-display text-sm font-700 text-ink-100">{label}</span>
      {hint && <span className="mt-0.5 block text-[11px] text-ink-500">{hint}</span>}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
      />
    </label>
  );
}

const EMPTY = {
  domain: 'garden',
  title: '',
  problem: '',
  known: '',
  sources: [
    { where: '', whyTrusted: '' },
    { where: '', whyTrusted: '' }
  ],
  finding: '',
  tried: '',
  measuredBefore: '',
  measuredAfter: '',
  unit: '',
  next: ''
};

export function DomainProjectView({ defaultDomain = 'garden' }) {
  const portfolio = useAppStore((s) => s.portfolio);
  const addDomainProject = useAppStore((s) => s.addDomainProject);
  const updateDomainProject = useAppStore((s) => s.updateDomainProject);
  const getDomainProjectProgress = useAppStore((s) => s.getDomainProjectProgress);

  const projects = useMemo(
    () => (portfolio || []).filter((p) => p.kind === 'domain-project'),
    [portfolio]
  );

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ ...EMPTY, domain: defaultDomain });
  const [msg, setMsg] = useState(null);

  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const setSource = (i, patch) =>
    setDraft((d) => ({
      ...d,
      sources: d.sources.map((s, idx) => (idx === i ? { ...s, ...patch } : s))
    }));

  const startEdit = (entry) => {
    const p = entry.project || {};
    setEditingId(entry.id);
    setDraft({
      domain: p.domain || 'garden',
      title: entry.title || '',
      problem: p.problem || '',
      known: p.known || '',
      sources: (p.sources || []).length ? [...p.sources, { where: '', whyTrusted: '' }] : EMPTY.sources,
      finding: p.finding || '',
      tried: p.tried || '',
      measuredBefore: p.measuredBefore ?? '',
      measuredAfter: p.measuredAfter ?? '',
      unit: p.unit || '',
      next: p.next || ''
    });
    setMsg(null);
  };

  const save = async () => {
    if (!draft.title.trim()) {
      setMsg('Give it a name first — even a rough one.');
      return;
    }
    if (editingId) {
      await updateDomainProject(editingId, { ...draft });
      setMsg('Saved.');
    } else {
      const res = await addDomainProject({ ...draft, subject: 'gardening' });
      if (!res.ok) {
        setMsg('That did not save — give it a name and try again.');
        return;
      }
      setEditingId(res.id);
      setMsg('Started. Come back and fill in the rest as you go — this is meant to take weeks.');
    }
  };

  const reset = () => {
    setEditingId(null);
    setDraft({ ...EMPTY, domain: defaultDomain });
    setMsg(null);
  };

  const delta =
    draft.measuredBefore !== '' && draft.measuredAfter !== ''
      ? Number(draft.measuredAfter) - Number(draft.measuredBefore)
      : null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Improvement project</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">
          {editingId ? 'Working on it' : 'Start a project'}
        </h3>
        <p className="mt-1 text-sm text-ink-300">
          One at a time. State a problem as a number, find out what is actually known, change one thing,
          measure it again. Nothing here is graded on whether the number went your way — only on whether
          you did the seven parts.
        </p>
      </div>

      {msg && (
        <p className="rounded-lg border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-2 text-sm text-ink-100">{msg}</p>
      )}

      <div className="space-y-4 rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
        <div className="flex flex-wrap gap-1.5">
          {DOMAINS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => set({ domain: d.id })}
              className={
                'rounded-full border px-3 py-1 text-xs font-display transition ' +
                (draft.domain === d.id
                  ? 'border-signal-cyan bg-signal-cyan/15 text-signal-cyan'
                  : 'border-space-600 text-ink-300 hover:text-ink-100')
              }
            >
              {d.label}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="block font-display text-sm font-700 text-ink-100">What are you calling it?</span>
          <input
            type="text"
            value={draft.title}
            onChange={(e) => set({ title: e.target.value })}
            placeholder="Raising the back buckets into the light"
            className="mt-1 w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
          />
        </label>

        <Field
          label="1 · The problem, as a number"
          hint="Not 'the garden needs more space'. Something you can measure before and after."
          value={draft.problem}
          onChange={(v) => set({ problem: v })}
          placeholder="The back four buckets get about 2.5 hours of direct sun. The front four get 5. Can I get the back above 4?"
        />

        <Field
          label="2 · What you already think you know"
          hint="Write this BEFORE you look anything up, so you find out later whether you were right."
          value={draft.known}
          onChange={(v) => set({ known: v })}
          placeholder="Tomatoes want 6+ hours. The awning cuts the morning. The back row is shaded until about noon."
        />

        <div>
          <p className="font-display text-sm font-700 text-ink-100">3 · Where you looked, and why you trust it</p>
          <p className="mt-0.5 text-[11px] text-ink-500">
            Both halves. A link on its own is not a source — anyone can put anything on the internet, and
            the reason you believe it is the part that counts.
          </p>
          <div className="mt-2 space-y-2">
            {draft.sources.map((s, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={s.where}
                  onChange={(e) => setSource(i, { where: e.target.value })}
                  placeholder="UGA Extension — vegetable light requirements"
                  className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
                />
                <input
                  type="text"
                  value={s.whyTrusted}
                  onChange={(e) => setSource(i, { whyTrusted: e.target.value })}
                  placeholder="State university extension service, written for Georgia, no product to sell"
                  className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setDraft((d) => ({ ...d, sources: [...d.sources, { where: '', whyTrusted: '' }] }))}
            className="mt-1.5 text-xs text-signal-cyan underline"
          >
            Add another source
          </button>
        </div>

        <Field
          label="4 · What you found, in your own words"
          hint="If you cannot say it without copying it, you have not got it yet."
          value={draft.finding}
          onChange={(v) => set({ finding: v })}
        />

        <Field
          label="5 · The one thing you changed"
          hint="One. Change two and the measurement cannot tell you which one did it."
          value={draft.tried}
          onChange={(v) => set({ tried: v })}
          rows={2}
        />

        <div>
          <p className="font-display text-sm font-700 text-ink-100">6 · Measured, before and after</p>
          <p className="mt-0.5 text-[11px] text-ink-500">
            The part that keeps this from turning into a diary entry. Same method both times, or the
            comparison is worthless.
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            <input
              type="number"
              step="any"
              value={draft.measuredBefore}
              onChange={(e) => set({ measuredBefore: e.target.value })}
              placeholder="Before"
              className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
            />
            <input
              type="number"
              step="any"
              value={draft.measuredAfter}
              onChange={(e) => set({ measuredAfter: e.target.value })}
              placeholder="After"
              className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
            />
            <input
              type="text"
              value={draft.unit}
              onChange={(e) => set({ unit: e.target.value })}
              placeholder="hours of direct sun"
              className="w-full rounded-lg border border-space-600 bg-space-950 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500"
            />
          </div>
          {delta !== null && (
            <p className="mt-1.5 text-sm text-ink-300">
              Change: <span className="font-display font-700 text-ink-100">{delta > 0 ? '+' : ''}{delta}</span>{' '}
              {draft.unit || 'units'}.{' '}
              {/* Both directions are results. Saying so here is the whole
                  "grade the process, not the outcome" rule in one line. */}
              {delta === 0
                ? 'No change is a result — it rules something out.'
                : delta < 0
                  ? 'It went the other way. That is a result too, and it is worth more than a guess.'
                  : 'It moved. Now say what you would change next.'}
            </p>
          )}
        </div>

        <Field
          label="7 · What you would change next time"
          hint="Every real result arrives with a next move attached."
          value={draft.next}
          onChange={(v) => set({ next: v })}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
          >
            {editingId ? 'Save changes' : 'Start this project'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-space-600 px-4 py-2 font-display text-sm font-600 text-ink-300 hover:text-ink-100"
            >
              Start a different one
            </button>
          )}
        </div>
      </div>

      {projects.length > 0 && (
        <div className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
          <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Your projects</p>
          <div className="mt-2 space-y-2">
            {projects.map((entry) => {
              const progress = getDomainProjectProgress(entry);
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => startEdit(entry)}
                  className="block w-full rounded-lg border border-space-700 bg-space-900 px-3 py-2 text-left transition hover:border-signal-cyan/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-sm font-700 text-ink-100">{entry.title}</span>
                    <span className="text-[11px] font-display text-ink-500">
                      {progress.done} of {progress.total} parts
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-space-800">
                    <div
                      className="h-full rounded-full bg-signal-green/70"
                      style={{ width: `${Math.round((progress.done / progress.total) * 100)}%` }}
                    />
                  </div>
                  {progress.missing.length > 0 && (
                    <p className="mt-1 text-[11px] text-ink-500">Still to do: {progress.missing.join(' · ')}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
