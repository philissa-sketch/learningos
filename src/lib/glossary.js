
/**
 * Aggregates every lesson's `novaIntro.glossary` for a given subject +
 * quarter into one deduped, alphabetized list of { term, definition }
 * pairs. Shared by StudyGuide.jsx and ReviewGame.jsx (and any future
 * quarter-review feature) so the quarter-filtering and dedupe logic
 * lives in exactly one place, rather than drifting between copies.
 *
 * Case-insensitive dedupe: a term could theoretically reappear across
 * lessons with slightly different capitalization, and we only want it
 * once per quarter's review set.
 */
export function getQuarterGlossaryTerms(subject, quarter) {
  const lessons = allLessons
    .filter((l) => l.subject === subject && l.quarter === quarter && !l.isQuarterlyExam)
    .sort((a, b) => (a.sequenceInQuarter || 0) - (b.sequenceInQuarter || 0));

  const termMap = new Map();
  for (const lesson of lessons) {
    const glossary = lesson.novaIntro?.glossary;
    if (!glossary) continue;
    for (const [term, definition] of Object.entries(glossary)) {
      const key = term.toLowerCase();
      if (!termMap.has(key)) {
        termMap.set(key, { term, definition });
      }
    }
  }

  return {
    lessons,
    terms: Array.from(termMap.values()).sort((a, b) => a.term.localeCompare(b.term))
  };
}
import { academyContent } from '../content/academyContent.js';

const { allLessons = [] } = academyContent().lessons;
