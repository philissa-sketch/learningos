import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { avatarIconFor } from '../../lib/rewards.js';
import { BUILD_STAMP } from '../../lib/buildStamp.js';
import { academyContent } from '../../content/academyContent.js';

// Grouped navigation (Aug 2026, parent feedback — 9 flat top-level tabs
// felt cluttered/confusing). Every page still exists at the exact same
// `view` id App.jsx already switches on; this only changes how they're
// organized and reached, not what they are. Grouping confirmed with the
// parent directly:
//   Learn    — subject content the learner actually studies from
//   Practice — skill reps and low-stakes play, not graded subject content
//   Plan     — looking back (Progress), looking ahead (Schedule), and the
//              Academic Success Center (books, major assignments and the
//              portfolio — exactly the "what's coming and how is it going"
//              work this group is for)
//   Parent Dashboard — stays its own top-level item, different audience
/**
 * ---- A TAB CAN SAY WHAT IT NEEDS ----
 *
 * Every tab below used to render for every Academy. That was invisible while
 * one Academy existed and filled every slot; the moment a second arrived it
 * meant a child being offered a Garden she does not have and a Guitar she has
 * never played, both opening onto a screen that reads content nobody wrote.
 *
 * `needs` names the content slot a tab cannot work without. No slot, no tab —
 * the same skip-when-absent rule the lesson engine follows for a beat with no
 * example. A tab with no `needs` is platform furniture that works for anyone:
 * the dashboard, the schedule, the roster.
 *
 * ---- WHAT THIS DOES NOT YET FIX ----
 *
 * `garden` and `guitar` both gate on `electives`, which is coarse: an Academy
 * with a garden and no guitar gets both tabs or neither. The honest fix is that
 * the platform should carry an ELECTIVES area and let each Academy name what is
 * in it, rather than shipping components/Garden/ and components/Guitar/ as
 * platform code — two whole feature directories that belong to one curriculum.
 *
 * That is a real refactor and it is written down rather than quietly tolerated.
 * What is fixed here is the part that shows a child somebody else's subject.
 */
const NAV_GROUPS = [
  {
    id: 'learn',
    label: 'Learn',
    tabs: [
      // FIRST, and above the dashboard on purpose: it is the first block of the
      // morning, and a morning routine buried three items down gets skipped.
      { id: 'morning', label: 'Morning Meeting' },
      { id: 'dashboard', label: 'Mission Control' },
      { id: 'lessons', label: 'Lesson Roster' },
      { id: 'pe', label: 'PE & Nutrition', needs: 'pe' },
      // Gardening sits in Learn beside PE & Nutrition — participation subjects,
      // real work recorded by what was done rather than graded.
      { id: 'garden', label: 'Garden', needs: 'electives' },
      { id: 'guitar', label: 'Guitar', needs: 'electives' }
    ]
  },
  {
    id: 'practice',
    label: 'Practice',
    tabs: [
      { id: 'journal', label: 'Writing Journal', needs: 'writing' },
      { id: 'typing', label: 'Typing', needs: 'writing' },
      { id: 'games', label: 'Games', needs: 'games' },
      { id: 'rewards', label: 'Rewards', needs: 'rewards' }
    ]
  },
  {
    id: 'plan',
    label: 'Plan',
    tabs: [
      { id: 'progress', label: 'Progress' },
      { id: 'schedule', label: 'Schedule' },
      { id: 'academic', label: 'Academic Center', needs: 'academicCenter' }
    ]
  }
];

const PARENT_TAB = { id: 'parent', label: 'Parent Dashboard' };

/**
 * The tabs THIS Academy can actually open.
 *
 * A group whose every tab was dropped disappears with them — an empty dropdown
 * is worse than no dropdown, because it looks like something failed to load.
 */
export function navGroupsFor(content) {
  return NAV_GROUPS.map((group) => ({
    ...group,
    tabs: group.tabs.filter((tab) => !tab.needs || Boolean(content?.[tab.needs]))
  })).filter((group) => group.tabs.length > 0);
}

/** Is this view reachable for this Academy? Used by App.jsx to refuse a
 *  navigation into a feature this Academy has no content for. */
export function viewIsAvailable(view, content) {
  if (view === PARENT_TAB.id) return true;
  for (const group of NAV_GROUPS) {
    const tab = group.tabs.find((t) => t.id === view);
    if (tab) return !tab.needs || Boolean(content?.[tab.needs]);
  }
  // A view no tab owns — a lesson, a printout — is not the nav's to refuse.
  return true;
}

function findGroupFor(view, groups) {
  return groups.find((g) => g.tabs.some((t) => t.id === view)) || null;
}

function findTabLabel(view, groups) {
  for (const g of groups) {
    const tab = g.tabs.find((t) => t.id === view);
    if (tab) return tab.label;
  }
  if (view === PARENT_TAB.id) return PARENT_TAB.label;
  return 'Menu';
}

/**
 * @param {Function} [onSignOut] hands the machine back to the LearningOS front
 *   door. See the sign-out button below for why a child can reach it.
 */
export function NavBar({ academyName, view, onNavigate, onSignOut }) {
  const [openGroup, setOpenGroup] = useState(null); // desktop dropdown
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile sheet
  const navRef = useRef(null);

  // Read once per render from the signed-in Academy's manifest. Safe here
  // because the shell awaits loadAcademyContent() before mounting the school —
  // see src/content/academyContent.js on why "read before load" is structurally
  // impossible rather than merely discouraged.
  const groups = useMemo(() => navGroupsFor(academyContent()), []);

  const [expandedMobileGroup, setExpandedMobileGroup] = useState(
    () => findGroupFor(view, navGroupsFor(academyContent()))?.id || null
  );

  const currentLabel = findTabLabel(view, groups);
  const activeGroup = findGroupFor(view, groups);

  // Coin balance + equipped avatar (Part 5 gamification) — always visible, and
  // a shortcut into the Rewards area.
  const coinBalance = useAppStore((s) => s.getCoinBalance());
  const equippedAvatar = useAppStore((s) => s.equippedAvatar);

  // Close an open desktop dropdown on outside click, same convention as
  // any other dropdown in this app.
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenGroup(null);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleNavigate = (id) => {
    onNavigate(id);
    setOpenGroup(null);
    setMenuOpen(false);
  };

  return (
    <header className="print-hide sticky top-0 z-10 border-b border-space-700 bg-space-900/95 backdrop-blur">
      {confirmSignOut ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-space-950/80 px-4"
          onMouseDown={(e) => e.target === e.currentTarget && setConfirmSignOut(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signout-title"
            className="w-full max-w-sm rounded-2xl border border-space-700 bg-space-800 p-6 text-left"
          >
            <h2 id="signout-title" className="font-display text-lg text-ink-100">
              Sign out?
            </h2>
            <p className="mt-2 text-sm text-ink-300">
              Nothing is lost. Everything you have done is saved on this computer and will be
              exactly where you left it.
            </p>
            <p className="mt-2 text-sm text-ink-400">
              To get back in you will need your name and your four numbers.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onSignOut}
                className="flex-1 rounded-lg bg-signal-cyan px-4 py-2 font-display text-sm font-700 text-space-950 transition hover:brightness-110"
              >
                Sign out
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setConfirmSignOut(false)}
                className="flex-1 rounded-lg border border-space-600 px-4 py-2 font-display text-sm text-ink-200 transition hover:border-ink-500"
              >
                Stay signed in
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          {/*
            ---- THE APP IS CALLED LEARNINGOS ----

            This read "MISSION CONTROL / Homeschool Academy" — one school's
            name, in the platform, on every screen of every Academy. C1 moved
            the curriculum out and the title stayed, so a second learner signed
            into her own school and it announced itself as somebody else's.

            The Academy's OWN name comes first now, because that is whose school
            this is. LearningOS sits behind it as the thing the school is built
            on, the way an operating system does — visible, secondary, and the
            same for everyone. An Academy with no name yet shows LearningOS
            alone rather than a blank space.
          */}
          <span className="text-lg font-display font-700 tracking-wide text-signal-cyan">
            {academyName || 'LearningOS'}
          </span>
          {academyName && (
            <span className="hidden font-display text-sm text-ink-500 sm:inline">LearningOS</span>
          )}
          {/**
            * THE BUILD STAMP, ON BOTH COMPUTERS. (Aug 10, 2026.)
            *
            * The parent: "when selecting reading on my computer it opens to
            * reading, when my son opens the link on his computer it has the
            * coding not the reading."
            *
            * Neither machine was broken — his was simply running an older copy
            * of the app, and nothing on either screen said so. Progress syncs
            * between the two computers; the code never has. This is how the
            * two screens can be compared in one glance, out loud, from another
            * room. See config/buildStamp.js.
            *
            * ---- WHAT IT MEANS NOW (Aug 24, 2026) ----
            *
            * The app is on Netlify, so the two computers cannot be on
            * different builds by accident any more — and nobody runs the
            * packaging script that used to write this string, so it is now
            * stamped by the build itself.
            *
            * It still answers a real question, just a narrower one: a tab left
            * open since Friday is running Friday's code, and this is the only
            * thing on the screen that says so. Reloading the page fixes it.
            */}
          <span
            title="The version this tab loaded, stamped when the site was built. If it looks old, reload the page."
            className="hidden font-display text-[10px] uppercase tracking-widest text-ink-600 md:inline"
          >
            {BUILD_STAMP}
          </span>
          <button
            type="button"
            onClick={() => handleNavigate('rewards')}
            aria-label={`Rewards — ${coinBalance} coins`}
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-0.5 font-display text-xs font-700 text-signal-amber transition hover:brightness-110"
          >
            <span aria-hidden="true">{avatarIconFor(equippedAvatar)}</span>
            🪙 {coinBalance}
          </button>

          {/*
            ---- A CHILD CAN SIGN THEMSELVES OUT ----

            The first version put sign-out behind the parent passcode, reasoning
            that a button here is one a twelve-year-old hits by accident
            mid-lesson. That reasoning was wrong for what this platform is FOR.

            Two children share this computer. If only the parent can sign out,
            the second child can never reach her own Academy without fetching
            her mother first — every single day. That is not a safeguard, it is
            a queue.

            The accidental press is real, so it is handled by ASKING, which
            costs one tap. And the worst case is mild: signing out loses
            nothing, and getting back in is a name and four numbers.
          */}
          {onSignOut ? (
            <button
              type="button"
              onClick={() => setConfirmSignOut(true)}
              title="Sign out — hand the computer to someone else"
              aria-label="Sign out"
              className="ml-1 rounded-full border border-space-700 px-2 py-0.5 font-display text-xs text-ink-500 transition hover:border-ink-500 hover:text-ink-300"
            >
              ⏻<span className="ml-1 hidden sm:inline">Sign out</span>
            </button>
          ) : null}
        </div>

        {/* Desktop: 4 group buttons (3 dropdowns + Parent Dashboard direct link) */}
        <nav ref={navRef} className="hidden items-center gap-1 rounded-lg bg-space-800 p-1 shadow-panel md:flex" aria-label="Primary">
          {groups.map((group) => {
            const isActiveGroup = activeGroup?.id === group.id;
            const isOpen = openGroup === group.id;
            return (
              <div key={group.id} className="relative">
                <button
                  type="button"
                  onClick={() => setOpenGroup((g) => (g === group.id ? null : group.id))}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={
                    'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-cyan ' +
                    (isActiveGroup ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
                  }
                >
                  {group.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-lg border border-space-700 bg-space-800 p-1 shadow-panel">
                    {group.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleNavigate(tab.id)}
                        aria-current={view === tab.id ? 'page' : undefined}
                        className={
                          'block w-full rounded-md px-3 py-2 text-left text-sm font-display font-600 transition-colors ' +
                          (view === tab.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:bg-space-900 hover:text-ink-100')
                        }
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => handleNavigate(PARENT_TAB.id)}
            aria-current={view === PARENT_TAB.id ? 'page' : undefined}
            className={
              'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-cyan ' +
              (view === PARENT_TAB.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
            }
          >
            {PARENT_TAB.label}
          </button>
        </nav>

        {/* Mobile: hamburger toggle showing the current page, opens a grouped accordion below */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Open navigation menu"
          className="flex min-h-[44px] items-center gap-2 rounded-lg bg-space-800 px-3 py-2 font-display text-sm font-600 text-ink-100 shadow-panel md:hidden"
        >
          {currentLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 5h12M2 8h12M2 11h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu — grouped accordion, each row a real 44px+ touch target */}
      {menuOpen && (
        <nav aria-label="Primary" className="border-t border-space-700 bg-space-900 md:hidden">
          {groups.map((group) => {
            const isExpanded = expandedMobileGroup === group.id;
            const isActiveGroup = activeGroup?.id === group.id;
            return (
              <div key={group.id} className="border-b border-space-800">
                <button
                  type="button"
                  onClick={() => setExpandedMobileGroup((g) => (g === group.id ? null : group.id))}
                  aria-expanded={isExpanded}
                  className={
                    'flex min-h-[44px] w-full items-center justify-between px-4 py-3 text-left font-display text-sm font-700 uppercase tracking-wide transition-colors ' +
                    (isActiveGroup ? 'text-signal-cyan' : 'text-ink-300')
                  }
                >
                  {group.label}
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true" className={isExpanded ? 'rotate-180 transition-transform' : 'transition-transform'}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {isExpanded && (
                  <div className="pb-1">
                    {group.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleNavigate(tab.id)}
                        aria-current={view === tab.id ? 'page' : undefined}
                        className={
                          'block min-h-[44px] w-full px-8 py-2.5 text-left font-display text-sm font-600 transition-colors ' +
                          (view === tab.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:bg-space-800 hover:text-ink-100')
                        }
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => handleNavigate(PARENT_TAB.id)}
            aria-current={view === PARENT_TAB.id ? 'page' : undefined}
            className={
              'block min-h-[44px] w-full px-4 py-3 text-left font-display text-sm font-700 uppercase tracking-wide transition-colors ' +
              (view === PARENT_TAB.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:bg-space-800 hover:text-ink-100')
            }
          >
            {PARENT_TAB.label}
          </button>
        </nav>
      )}
    </header>
  );
}
