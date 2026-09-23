import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
// LearningOS (Sept 23, 2026): the platform's build stamp — the date and time
// this copy was built — which the platform's own bar used to show above hers.
import { BUILD_STAMP } from '../../../../lib/buildStamp.js';
import { SHORT_STAMP } from '../../config/buildStamp.js';
import { NAV, tabForView, sectionsFor, defaultViewFor } from '../../config/navigation.js';

/**
 * The second row: the sections inside the tab she is standing in.
 *
 * It only appears when a tab HAS more than one section, so Home and the Journal
 * never grow a row of one button — a sub-row with a single item reads like
 * something is missing.
 */
function SubNav({ view, onNavigate }) {
  const sections = sectionsFor(view);
  if (sections.length === 0) return null;
  return (
    <div className="border-t border-cream-300/70 bg-cream-100/60">
      <div className="mx-auto flex max-w-5xl flex-wrap gap-1.5 px-4 py-2">
        {sections.map((sec) => {
          const active = view === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigate(sec.id)}
              aria-current={active ? 'true' : undefined}
              className={`rounded-full px-3 py-1 text-[0.8rem] font-700 ${
                active
                  ? 'bg-sage-700 text-white'
                  : 'border border-cream-300 bg-white text-ink-700 hover:border-sage-500'
              }`}
            >
              {sec.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * LearningOS (Sept 23, 2026): the platform's own bar is turned off in this
 * school (nav.navShellBar), so this bar carries what that one did — the build
 * date and Sign out, the parent's request. `onSignOut` comes from the platform
 * shell; in her standalone app it is absent and nothing extra is drawn.
 */
export function NavBar({ view, onNavigate, onSignOut }) {
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const rank = useAppStore((s) => s.rank());
  const name = useAppStore((s) => s.learnerName);
  const petals = useAppStore((s) => s.petalBalance());
  const seeds = useAppStore((s) => s.seedBalance());

  return (
    <header className="print-hide border-b border-cream-300 bg-cream-100/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-left"
        >
          <span className="text-2xl">🌸</span>
          <span>
            <span className="block font-display text-base leading-tight text-ink-900">
              Petal &amp; Pestle
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-ink-500">
              Academy · {SHORT_STAMP}
              {onSignOut && BUILD_STAMP !== 'dev' ? (
                <span title="When this copy of the app was built. If it looks old, reload the page."> · {BUILD_STAMP}</span>
              ) : null}
            </span>
          </span>
        </button>

        {/* LearningOS (Sept 23, 2026): with Sign out and the build date added,
            the tabs no longer fit beside the name and the petals, and squeezed
            into a column. Here they always get their own full-width row. */}
        <nav className={`order-3 flex w-full flex-wrap gap-1.5 ${onSignOut ? '' : 'sm:order-2 sm:w-auto sm:flex-1'}`}>
          {NAV.map((tab) => {
            // Highlighted by the SECTION she is in, not by an id match — the
            // Market is inside My Greenhouse, so opening the Market must light
            // the Greenhouse tab rather than nothing at all.
            const active = tabForView(view)?.id === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(defaultViewFor(tab.id))}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-sm font-700 ${
                  active
                    ? 'bg-blush-500 text-white shadow-lift'
                    : 'text-ink-700 hover:bg-cream-200'
                }`}
              >
                <span aria-hidden="true" className="mr-1">
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className={`order-2 ml-auto flex items-center gap-3 ${onSignOut ? '' : 'sm:order-3'}`}>
          {/* Balances live in the nav so they are visible from every screen
              EXCEPT the one place it would matter — the Check-In replaces the
              whole layout, nav included, so she never watches a counter tick up
              mid-question. */}
          <button
            type="button"
            onClick={() => onNavigate('greenhouse')}
            className="flex items-center gap-2 rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-700 text-ink-900 hover:border-blush-500"
            title="Open your greenhouse"
          >
            <span className="tnum">🌸 {petals.toLocaleString()}</span>
            <span className="text-cream-300">|</span>
            <span className="tnum">🌟 {seeds.toLocaleString()}</span>
          </button>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-700 leading-tight text-ink-900">
              {rank.plant} {rank.name}
            </p>
            {name && <p className="text-[0.7rem] text-ink-500">{name}</p>}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('parent')}
            className="rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-700 text-ink-700 hover:border-lavender-500 hover:text-lavender-700"
          >
            🔒 Grown-Up Corner
          </button>
          {onSignOut ? (
            confirmSignOut ? (
              <span className="flex items-center gap-1.5 text-xs">
                <span className="text-ink-700">Sign out?</span>
                <button type="button" onClick={onSignOut} className="rounded-full bg-blush-500 px-3 py-1.5 font-700 text-white hover:bg-blush-700">
                  Yes
                </button>
                <button type="button" onClick={() => setConfirmSignOut(false)} className="rounded-full border border-cream-300 bg-white px-3 py-1.5 font-700 text-ink-700">
                  No
                </button>
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmSignOut(true)}
                title="Sign out — hand the computer to someone else. Nothing is lost."
                className="rounded-full border border-cream-300 bg-white px-3 py-1.5 text-xs font-700 text-ink-700 hover:border-blush-500"
              >
                ⏻ Sign out
              </button>
            )
          ) : null}
        </div>
      </div>
      <SubNav view={view} onNavigate={onNavigate} />
    </header>
  );
}
