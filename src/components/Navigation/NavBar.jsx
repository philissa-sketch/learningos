import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { avatarIconFor } from '../../lib/rewards.js';
import { BUILD_STAMP } from '../../lib/buildStamp.js';
import { academyContent } from '../../content/academyContent.js';

// ---- THE NAV IS DECLARED BY THE ACADEMY, NOT BY THIS FILE ----
//
// This file used to carry a fixed list of tabs, handed to every Academy
// whether or not it had anything behind them. A second Academy inherited the
// first one's electives as empty screens, and a school had no way to add a tab
// of its own.
//
// The list now comes from the `nav` content slot. The template declares the
// generic entries — screens the platform itself provides — and an Academy
// declares its own on top of them. This file renders what it is handed and
// knows the name of no school, no subject and no elective.
//
// Grouping is the Academy's decision too. The template groups by cadence
// rather than topic, which is what a parent navigates by, but nothing here
// enforces that.
//
// A blank slot renders as an absent nav, never a broken one: no groups means
// no group buttons, and no parent tab means no Parent Dashboard button.


function findGroupFor(groups, view) {
  return groups.find((g) => g.tabs.some((t) => t.id === view)) || null;
}

function findTabLabel(groups, parentTab, view) {
  for (const g of groups) {
    const tab = g.tabs.find((t) => t.id === view);
    if (tab) return tab.label;
  }
  if (parentTab && view === parentTab.id) return parentTab.label;
  return 'Menu';
}

/**
 * @param {Function} [onSignOut] hands the machine back to the LearningOS front
 *   door. See the sign-out button below for why a child can reach it.
 */
export function NavBar({ view, onNavigate, onSignOut }) {
  // Read per render, never at module scope: a content-pack destructure at the
  // top of a module runs before the pack is installed. See the crash recorded
  // in docs/GENERIC_CARRYOVER.md.
  const {
    navGroups: groups = [],
    navParentTab: parentTab = null,
    navSchoolName: schoolName = '',
    navSchoolTagline: schoolTagline = ''
  } = academyContent().nav || {};

  const [openGroup, setOpenGroup] = useState(null); // desktop dropdown
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile sheet
  const [expandedMobileGroup, setExpandedMobileGroup] = useState(findGroupFor(groups, view)?.id || null);
  const navRef = useRef(null);

  const currentLabel = findTabLabel(groups, parentTab, view);
  const activeGroup = findGroupFor(groups, view);

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
            The school's name comes from its own theme slot. An Academy that has
            not named itself yet shows no name rather than someone else's.
          */}
          {schoolName ? (
            <span className="text-lg font-display font-700 tracking-wide text-signal-cyan">
              {schoolName}
            </span>
          ) : null}
          {schoolTagline ? (
            <span className="hidden font-display text-sm text-ink-500 sm:inline">
              {schoolTagline}
            </span>
          ) : null}
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

          {parentTab ? (
            <button
              type="button"
              onClick={() => handleNavigate(parentTab.id)}
              aria-current={view === parentTab.id ? 'page' : undefined}
              className={
                'rounded-md px-3 py-1.5 text-sm font-display font-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-cyan ' +
                (view === parentTab.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
              }
            >
              {parentTab.label}
            </button>
          ) : null}
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
          {parentTab ? (
            <button
              type="button"
              onClick={() => handleNavigate(parentTab.id)}
              aria-current={view === parentTab.id ? 'page' : undefined}
              className={
                'block min-h-[44px] w-full px-4 py-3 text-left font-display text-sm font-700 uppercase tracking-wide transition-colors ' +
                (view === parentTab.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:bg-space-800 hover:text-ink-100')
              }
            >
              {parentTab.label}
            </button>
          ) : null}
        </nav>
      )}
    </header>
  );
}
