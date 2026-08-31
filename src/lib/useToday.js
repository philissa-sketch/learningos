import { useEffect, useState } from 'react';
import { todayDateStr } from './scheduler.js';

/**
 * TODAY'S DATE, AND IT CHANGES AT MIDNIGHT — NOT WHEN THE PAGE RELOADS.
 *
 * ---- WHY (Aug 11, 2026) ----
 *
 * The parent, after the UTC fix: "The different day shouldn't start until
 * 12am."
 *
 * She is right, and the fix she was responding to only got half of it. The
 * date is now read from the local clock, so it rolls at local midnight rather
 * than at 8pm — but a React component only recomputes when something makes it
 * render. This app is left open all day. A screen opened at 4pm still holds
 * the string '2026-08-10' at 12:30am, so for the first half hour of the new
 * day the checkbox he ticks saves to the 11th (the store reads the clock live)
 * while the screen is still looking at the 10th.
 *
 * That is the SAME failure she reported, in a narrower window: a tick that
 * saves and never appears. Fixing the timezone without fixing the rollover
 * would have left a thirty-minute version of it behind, and it would have
 * looked exactly as inexplicable.
 *
 * ---- WHY IT ALSO LISTENS FOR THE MACHINE WAKING UP ----
 *
 * A timer set for midnight does not fire on time on a laptop that was closed
 * at 10pm and opened at 7am — the OS suspends it, and it fires late or all at
 * once. So the date is re-read whenever the tab becomes visible or regains
 * focus, which is the moment anyone would actually look at the screen.
 *
 * Returns the same string todayDateStr() would, so it is a drop-in for it in
 * any component.
 */
export function useToday() {
  const [today, setToday] = useState(todayDateStr);

  useEffect(() => {
    let timer = null;

    const scheduleNextMidnight = () => {
      const now = new Date();
      // Two seconds past midnight, not midnight exactly: timers fire a hair
      // early often enough that landing on 23:59:59.998 is a real outcome, and
      // it would set the date to yesterday and then not try again for a day.
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 2, 0);
      timer = setTimeout(() => {
        setToday(todayDateStr());
        scheduleNextMidnight();
      }, next.getTime() - now.getTime());
    };

    const resync = () => setToday(todayDateStr());

    scheduleNextMidnight();
    document.addEventListener('visibilitychange', resync);
    window.addEventListener('focus', resync);
    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener('visibilitychange', resync);
      window.removeEventListener('focus', resync);
    };
  }, []);

  return today;
}
