import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { dayKeyOf } from '../../lib/reviewQueue.js';
import {
  GAME_SITES,
  SITE_BY_WEEKDAY,
  displayCode,
  nextScheduledDay,
  isDayKey
} from '../../data/games/gameCodes.js';

// ---------------------------------------------------------------------------
// TODAY'S GAME — where Gigi types the code or link for a game she has started.
//
// Gigi, Oct 1 2026: "so when the scheduled day comes I can add the code."
//
// ONE ROW PER SITE, EACH WITH ITS OWN DAY. The date is pre-filled with the next
// day that site is Azianna's scheduled game (Gimkit → Wednesday), so the common
// case is: paste, press Save. A code only ever shows on her Play tab on the day
// it is for. All the rules — what counts as a link, which day — are in
// data/games/gameCodes.js and are not repeated here.
// ---------------------------------------------------------------------------

const DAY_NAMES = { 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri' };

function scheduledDaysOf(siteId) {
  return Object.entries(SITE_BY_WEEKDAY)
    .filter(([, id]) => id === siteId)
    .map(([d]) => DAY_NAMES[d])
    .join(' & ');
}

function dayText(dayKey) {
  if (!isDayKey(dayKey)) return String(dayKey || '');
  return new Date(`${dayKey}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

function SiteRow({ site, today }) {
  const entry = useAppStore((s) => s.gameEntries?.[site.id]);
  const save = useAppStore((s) => s.saveGameEntry);
  const clear = useAppStore((s) => s.clearGameEntry);

  const [text, setText] = useState('');
  const [day, setDay] = useState(nextScheduledDay(site.id, today));
  const [msg, setMsg] = useState(null); // { good, words }

  async function submit() {
    const r = await save(site.id, text, day);
    if (r.ok) {
      setText('');
      setMsg({ good: true, words: `Saved for ${dayText(day)} ✓` });
    } else {
      setMsg({ good: false, words: r.reason });
    }
  }

  const expired = entry && entry.forDay < today;

  return (
    <div className="rounded-petal border border-cream-300 bg-white px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-700 text-ink-900">
          {site.label}{' '}
          <span className="font-400 text-ink-500">· her game on {scheduledDaysOf(site.id)}</span>
        </p>
        {entry ? (
          <p className={`text-xs ${expired ? 'text-ink-500' : 'font-700 text-sage-700'}`}>
            {expired ? 'Old — was for ' : 'Waiting for her on '}
            {dayText(entry.forDay)} ·{' '}
            {entry.kind === 'code' ? displayCode(entry.value) : 'link saved'}
          </p>
        ) : (
          <p className="text-xs text-ink-500">Nothing saved</p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setMsg(null);
          }}
          placeholder={`${site.label} code or link`}
          aria-label={`${site.label} code or link`}
          className="min-w-[12rem] flex-1 rounded-petal border border-cream-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-lavender-500"
        />
        <input
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          aria-label={`Day for the ${site.label} game`}
          className="rounded-petal border border-cream-300 bg-white px-3 py-2 text-sm text-ink-900 outline-none focus:border-lavender-500"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim()}
          className="rounded-full bg-blush-500 px-5 py-2 text-sm font-700 text-white hover:bg-blush-700 disabled:opacity-40"
        >
          Save
        </button>
        {entry && (
          <button
            type="button"
            onClick={() => {
              clear(site.id);
              setMsg(null);
            }}
            className="rounded-full border border-cream-300 px-4 py-2 text-sm font-700 text-ink-700 hover:bg-cream-200"
          >
            Clear
          </button>
        )}
      </div>
      <p className="mt-1.5 text-xs text-ink-500">{site.where}.</p>
      {msg && (
        <p className={`mt-1 text-xs font-700 ${msg.good ? 'text-sage-700' : 'text-blush-700'}`}>{msg.words}</p>
      )}
    </div>
  );
}

export function TodaysGamePanel() {
  const today = dayKeyOf();
  return (
    <section className="panel px-5 py-5 print-hide">
      <h2 className="font-display text-lg text-ink-900">Today’s game code</h2>
      <p className="mt-1 text-sm text-ink-700">
        After you start a game on Gimkit, Kahoot or Blooket, type its code (or paste its link) here. It shows on
        Azianna’s <span className="font-700">Play</span> tab on the day you pick, and only that day.
      </p>
      <div className="mt-4 space-y-3">
        {GAME_SITES.map((s) => (
          <SiteRow key={s.id} site={s} today={today} />
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-700">
        <span className="font-700">On a different computer than hers?</span> After you save, use{' '}
        <span className="font-700">Settings → Backup &amp; settings → Export / download backup</span>, and have her tap{' '}
        <span className="font-700">Load what Gigi sent</span>. If you type it on her laptop, it shows right away.
      </p>
    </section>
  );
}
