import { AirfoilLiftDiagram } from './AirfoilLiftDiagram.jsx';
import { OrbitDiagram } from './OrbitDiagram.jsx';
import { RocketStagingDiagram } from './RocketStagingDiagram.jsx';
import { CssBoxModelDiagram } from './CssBoxModelDiagram.jsx';
import { HtmlNestingDiagram } from './HtmlNestingDiagram.jsx';

/**
 * Registry mapping a beat's `diagramId` (a plain string in the lesson
 * data files) to the actual SVG component to render. Lesson data stays
 * plain JS objects (not JSX) this way — LessonEngine.jsx looks up the
 * component here rather than lesson files importing React components
 * directly.
 *
 * Scoped lesson-by-lesson, per PROJECT_PLAN.md's instructional-design
 * audit (gap 4) — NOT a blanket retrofit of every beat. Add an entry
 * here only when a real lesson beat gets a genuinely helpful diagram.
 */
export const DIAGRAM_REGISTRY = {
  'airfoil-lift': AirfoilLiftDiagram,
  'orbit-ellipse': OrbitDiagram,
  'rocket-staging': RocketStagingDiagram,
  'css-box-model': CssBoxModelDiagram,
  'html-nesting-structure': HtmlNestingDiagram
};

export function getDiagramComponent(diagramId) {
  return DIAGRAM_REGISTRY[diagramId] || null;
}
