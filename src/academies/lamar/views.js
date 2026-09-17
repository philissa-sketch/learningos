// ---------------------------------------------------------------------------
// THIS SCHOOL'S OWN SCREENS (Sept 17, 2026).
//
// WRITTEN BY HAND. `content.js` is generated and re-exports this file; the
// generator never rewrites it, because nothing in a data folder could tell it
// which tab opens which screen.
//
// ---- WHY THESE TWO LIVE HERE ----
//
// The parent, about two activities only her son does: *"They are supposed to be
// in his school only."*
//
// They were in all three schools. The content moved first — `optional.js` took
// those twenty names off every other school's bill — and the screens followed
// here, into `screens/`, out of the shared `src/components/` folder the shell
// imported them from by name.
//
// ---- THE SHAPE ----
//
// A tab id this school's own nav declares, and how to load the screen behind
// it. A loader, not a component: every check script loads this file in plain
// Node, where a React import would throw, and a loader is only called when the
// tab is actually opened. The shell does the lazy() wrapping.
// See src/content/slots/views.js.
// ---------------------------------------------------------------------------
export const views = {
  garden: {
    load: () => import('./screens/Garden/GardenHome.jsx').then((m) => ({ default: m.GardenHome }))
  },
  guitar: {
    load: () => import('./screens/Guitar/GuitarHome.jsx').then((m) => ({ default: m.GuitarHome }))
  }
};
