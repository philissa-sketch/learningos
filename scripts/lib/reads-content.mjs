// ---------------------------------------------------------------------------
// DOES THIS FILE GET THIS VALUE FROM ITS ACADEMY?
//
// Several guards assert that a screen READS a value rather than retyping it —
// that the Georgia daily bar is imported from the compliance file rather than
// written as `270`, that the guitar row reads the skill ladder rather than
// hardcoding a title, that the hands-on row reads the garden list.
//
// Those assertions are about where a value comes from, and they were written
// against the shape it used to arrive in:
//
//   import { gardenProjects } from '../../academies/<id>/data/gardening/…';
//
// It now arrives like this, from whichever Academy is signed in:
//
//   const { gardenProjects } = academyContent().electives;
//
// The guards are still right and still worth keeping. Only the shape changed.
// This is that shape, written once, so there is one definition of "reads its
// content properly" instead of a seventh hand-rolled regex the next time.
// ---------------------------------------------------------------------------

/**
 * True when `source` destructures `name` out of any Academy content slot.
 *
 * Aliases count: `const { LAUNCH_SCORE_LABELS: SCORE_LABELS } = …` reads both,
 * which is right — the file genuinely gets both names from its Academy.
 */
export function readsFromAcademy(source, name) {
  return countReadsFromAcademy(source, name) > 0;
}

/** How many slot reads in `source` mention `name`. */
export function countReadsFromAcademy(source, name) {
  const re = new RegExp(
    `const \\{[^}]*\\b${name}\\b[^}]*\\} = academyContent\\(\\)\\.\\w+;`,
    'g'
  );
  return (source.match(re) || []).length;
}

/**
 * True when the value is obtained rather than written out by hand — either the
 * old direct import or the slot read.
 *
 * For guards whose point is "not retyped" rather than "imported from exactly
 * this path". Most of them.
 */
export function obtainsValue(source, name) {
  if (readsFromAcademy(source, name)) return true;
  const importRe = new RegExp(`import\\s*\\{[^}]*\\b${name}\\b[^}]*\\}\\s*from`);
  return importRe.test(source);
}

/** The body with comments and slot reads stripped, for "is it actually used" checks. */
export function bodyWithoutContentReads(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/^const \{[^}]*\} = academyContent\(\)\.\w+;$/gm, '')
    .replace(/^import[\s\S]*?from\s*['"][^'"]*['"];$/gm, '');
}
