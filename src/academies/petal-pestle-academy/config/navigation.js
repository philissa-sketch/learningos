// ---------------------------------------------------------------------------
// THE NAVIGATION — six destinations, not twelve.
//
// Gigi's own grouping, in her words, from the post-build backlog §3:
//
//     My Plan · My Courses · My Lessons  -> one tab
//     Today · Check-In                   -> one tab
//     My Greenhouse · Market             -> one tab
//     everything about the diagnostic    -> its own tab
//     Import · Export · Backup           -> all under Settings
//
// Her list contained one contradiction and she settled it: the "Check-In" that
// belongs on Today is her DAILY check-in — the morning warm-up — and the
// diagnostic Check-In gets its own tab with her levels inside it.
//
// ---- WHY A SECTION ID IS AN OLD VIEW ID ----
//
// Every section below is named after the view it replaces. That is not laziness,
// it is the migration. Twelve tabs' worth of `onNavigate('plan')` calls live
// scattered through Home, the schedule blocks, the lesson screens and the
// Grown-Up Corner, and `check-links` proves 46 of them resolve. If the ids had
// changed, every one of those call sites would have had to change with them, and
// the ones I missed would have gone nowhere — which looks exactly like a broken
// app to a nine-year-old.
//
// So `setView('market')` still works, unchanged, and now lights the Greenhouse
// tab with the Market section open. Nothing had to be rewritten to be moved.
// ---------------------------------------------------------------------------

export const NAV = [
  {
    id: 'home',
    label: 'Home',
    icon: '🌿',
    sections: [{ id: 'home', label: 'Home' }]
  },
  {
    id: 'today',
    label: 'Today',
    icon: '🔔',
    // Friday finally has a home. It was reachable only from its own top-level
    // tab, which meant the catch-up day sat outside the week it belongs to.
    sections: [
      { id: 'today', label: 'My day' },
      { id: 'friday', label: 'Friday catch-up' }
    ]
  },
  {
    id: 'learning',
    label: 'My Learning',
    icon: '🌱',
    sections: [
      { id: 'lessons', label: 'My Lessons' },
      { id: 'plan', label: 'My Plan' },
      { id: 'year', label: 'My Courses' },
      { id: 'herbs', label: 'Herb Library' },
      // v3.80 — the reading check, and it needed a home here rather than only a
      // button on Today.
      //
      // ⚠️ check-links CAUGHT THIS AND WAS RIGHT. The button on Today's Planner
      // is a real door, but the rule in this app is stricter and better: every
      // screen App.jsx can render has ONE home in the nav, so "where am I" and
      // "how do I get back" always have an answer. A screen reachable only from
      // a button inside another screen is one layout change from being the sixth
      // thing here that is correct and unreachable.
      //
      // It is safe to show always: the screen says so plainly when no check is
      // written for the unit she is currently in, rather than opening blank.
      { id: 'reading', label: 'Reading check' },
      // v3.91 — word study, and check-links caught this one too, in exactly the
      // same way and for exactly the same reason as the reading check above.
      //
      // The button on the Language Arts block is a real door, and it is the one
      // that KNOCKS — which the book reports went four months without. But the
      // rule here is stricter and better: every screen App.jsx can render has
      // ONE home in the nav, so "where am I" and "how do I get back" always have
      // an answer. A screen reachable only from a button inside another screen
      // is one layout change from being the seventh thing in this app that is
      // correct and unreachable.
      //
      // Safe to show always: the screen says so plainly when there are no words
      // for the week she is in, rather than opening blank.
      { id: 'words', label: 'Word Study' },
      // She asked for this one herself, Aug 19. The 15:40 block has existed
      // since v3.2 and opened nothing.
      { id: 'movement', label: 'Singing & Movement' }
    ]
  },
  {
    id: 'checkin',
    label: 'Check-In',
    icon: '🌾',
    sections: [
      { id: 'diagnostic', label: 'The Check-In' },
      { id: 'levels', label: 'My Levels' }
    ]
  },
  {
    id: 'greenhouse',
    label: 'My Greenhouse',
    icon: '🏡',
    sections: [
      { id: 'greenhouse', label: 'My room' },
      { id: 'market', label: 'Market' }
    ]
  },
  {
    // ---- SOMETHING TO DO INSTEAD OF WALKING AWAY. Gigi, Aug 19. ----
    // Never locked — her call. The screen says what is left on the day and
    // then gets out of the way. See components/Games/GamesView.jsx.
    id: 'play',
    label: 'Play',
    icon: '🎲',
    sections: [{ id: 'games', label: 'Play' }]
  },
  {
    id: 'journal',
    label: 'Journal',
    icon: '📓',
    sections: [{ id: 'journal', label: 'Journal' }]
  }
];

/** Every section id in the app — i.e. every value `view` may hold. */
export const ALL_VIEWS = NAV.flatMap((t) => t.sections.map((s) => s.id));

/** Which top-level tab a view belongs to. */
export function tabForView(view) {
  return NAV.find((t) => t.sections.some((s) => s.id === view)) || null;
}

/** The sections of the tab a view belongs to. One-section tabs get no sub-row. */
export function sectionsFor(view) {
  const tab = tabForView(view);
  if (!tab || tab.sections.length < 2) return [];
  return tab.sections;
}

/** Where a tab opens when she taps it: its first section. */
export function defaultViewFor(tabId) {
  const tab = NAV.find((t) => t.id === tabId);
  return tab ? tab.sections[0].id : 'home';
}

/**
 * The bar she must never have to scroll.
 *
 * Twelve tabs wrapped onto two rows on Gigi's screen, which is how a child ends
 * up never finding My Courses. Guarded by check-links so a future addition has
 * to displace something rather than quietly making the row longer again.
 */
export const MAX_TABS = 7;

// ---------------------------------------------------------------------------
// THE GROWN-UP CORNER — six groups, not eleven panels.
//
// The other half of Gigi's §3: "Import · Export · Backup — all under Settings."
// They were three separate places. Loading her data was its own top-level tab,
// downloading a backup was buried at the bottom of Settings, and there was no
// export in the other direction at all (§4.3, still owed).
//
// Same migration trick as the child's nav: a SECTION id is the old TAB id, so
// every `setTab('remeasure')` in a nine-hundred-line file keeps working and
// nothing had to be rewritten to be moved.
// ---------------------------------------------------------------------------

export const PARENT_NAV = [
  {
    id: 'report',
    label: 'Report',
    sections: [
      { id: 'report', label: 'One-page report' },
      { id: 'strands', label: 'Strand detail' },
      { id: 'remeasure', label: 'Re-measure', badge: 'floor' },
      // v3.58 — sits beside the report and the re-measure on purpose. A goal is
      // set FROM a measurement, and four of hers are waiting on the re-measure
      // one row up.
      { id: 'goals', label: 'Goals' },
      { id: 'hours', label: 'Hours (Georgia)' },
      // v3.78 — the document Georgia actually asks for, O.C.G.A. § 20-2-690(c).
      // It sits beside Hours because they answer the same statute from two
      // sides: hours are the instruction given, this is the progress made.
      { id: 'annual', label: 'Annual report' }
    ]
  },
  {
    id: 'gradebook',
    label: 'Gradebook',
    badge: 'attempts',
    sections: [
      { id: 'gradebook', label: 'Tests' },
      { id: 'history', label: 'Answer history' },
      { id: 'khan', label: 'Khan grades' },
      { id: 'writingpieces', label: 'Writing pieces' }
    ]
  },
  {
    id: 'work',
    label: 'Her work',
    badge: 'pending',
    sections: [
      { id: 'journal', label: 'Her journal', badge: 'journal' },
      { id: 'rewards', label: 'Rewards', badge: 'pending' }
    ]
  },
  {
    id: 'messages',
    label: 'Write to her',
    sections: [{ id: 'messages', label: 'Write to her' }]
  },
  {
    id: 'day',
    label: 'Her day',
    sections: [{ id: 'schedule', label: 'Her day' }]
  },
  {
    // Gigi's line, kept: Import · Export · Backup all under Settings.
    id: 'settings',
    label: 'Settings',
    sections: [
      { id: 'import', label: 'Bring her work here' },
      { id: 'settings', label: 'Backup & settings' }
    ]
  }
];

export const ALL_PARENT_VIEWS = PARENT_NAV.flatMap((t) => t.sections.map((s) => s.id));

export function parentTabForView(view) {
  return PARENT_NAV.find((t) => t.sections.some((s) => s.id === view)) || null;
}

export function parentSectionsFor(view) {
  const tab = parentTabForView(view);
  if (!tab || tab.sections.length < 2) return [];
  return tab.sections;
}

export function defaultParentViewFor(tabId) {
  const tab = PARENT_NAV.find((t) => t.id === tabId);
  return tab ? tab.sections[0].id : 'report';
}

/** The group that must hold every way data enters or leaves the app. */
export const DATA_GROUP = 'settings';
