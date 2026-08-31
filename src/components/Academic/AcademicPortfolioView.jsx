import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore.js';
import { buildAcademicPortfolio } from '../../lib/academicPortfolio.js';
import { writingPrompts } from '../../academies/lamar/data/writing/writingPrompts.js';
import { aerospaceProjects } from '../../academies/lamar/data/aerospace/aerospaceProjects.js';
import { scienceExperiments } from '../../academies/lamar/data/science/scienceExperiments.js';
import { technologyProjects } from '../../academies/lamar/data/technology/technologyProjects.js';
import { roboticsProjects } from '../../academies/lamar/data/robotics/roboticsProjects.js';
import { gardenProjects } from '../../academies/lamar/data/gardening/gardenProjects.js';
import { SUBJECT_LABELS } from '../../academies/lamar/subjects.js';
import { formatCompletedAt } from './academicUi.js';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'writing-journal', label: 'Writing Journal' },
  { id: 'academic-success-center', label: 'Assignments' },
  { id: 'logged-project', label: 'Logged Projects' }
];

/**
 * Portfolio — PROJECT_PLAN.md Part 9's "Portfolio Integration."
 *
 * Read-only on purpose. Every item here is already stored somewhere
 * real: Writing Journal entries in `writingEntries`, completed
 * assignments in `academicAssignments`, hand-logged projects in
 * `portfolio`. This view aggregates them into one chronological record
 * rather than creating a fourth copy of the same work — so nothing can
 * fall out of sync, and deleting something in its home screen removes
 * it here too. Editing and grading stay where they already live (the
 * Parent Dashboard's Writing Journal Review, this Center's Parent Setup
 * tab, the Parent Dashboard's Portfolio section).
 */
export function AcademicPortfolioView() {
  const writingEntries = useAppStore((s) => s.writingEntries);
  const academicAssignments = useAppStore((s) => s.academicAssignments);
  const portfolio = useAppStore((s) => s.portfolio);
  const [filter, setFilter] = useState('all');

  const items = buildAcademicPortfolio({
    writingEntries,
    academicAssignments,
    portfolio,
    promptPools: [writingPrompts, aerospaceProjects, scienceExperiments, technologyProjects, roboticsProjects, gardenProjects]
  });

  const visible = filter === 'all' ? items : items.filter((i) => i.source === filter);
  const gradedCount = items.filter((i) => i.grade).length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-space-700 bg-space-800 p-5 shadow-panel">
        <p className="text-xs font-display uppercase tracking-widest text-signal-cyan">Portfolio</p>
        <h3 className="mt-1 font-display text-lg font-700 text-ink-100">Every Completed Piece of Academic Work</h3>
        <p className="mt-2 text-sm text-ink-300">
          Writing Journal entries, completed Academic Success Center assignments, and hand-logged projects
          from the Parent Dashboard — one record, newest first. This view reads from those three places;
          it doesn't store a separate copy.
        </p>
        {items.length > 0 && (
          <p className="mt-2 text-xs text-ink-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} · {gradedCount} graded
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={
                'rounded-md px-2.5 py-1 text-xs font-display font-600 transition-colors ' +
                (filter === f.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-500 hover:text-ink-100')
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-ink-500">
          {items.length === 0
            ? 'Nothing completed yet. Finished writing entries, assignments, and projects show up here automatically.'
            : 'Nothing in this category yet.'}
        </p>
      ) : (
        <div className="space-y-2">
          {visible.map((item) => (
            <div key={item.key} className="rounded-lg border border-space-700 bg-space-800 p-4 shadow-panel">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-ink-600/40 bg-ink-900/20 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-ink-500">
                  {item.sourceLabel}
                </span>
                {item.subject && (
                  <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-cyan">
                    {SUBJECT_LABELS[item.subject] || item.subject}
                  </span>
                )}
                {item.grade && (
                  <span className="rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-0.5 text-[10px] font-display uppercase tracking-widest text-signal-amber">
                    Grade {item.grade}
                  </span>
                )}
              </div>
              <p className="mt-1.5 font-display font-700 text-ink-100">{item.title}</p>
              {item.detail && <p className="mt-0.5 text-xs text-ink-500">{item.detail}</p>}
              {item.reflection && (
                <p className="mt-1.5 border-l-2 border-space-700 pl-2 text-xs italic text-ink-300">
                  “{item.reflection}”
                </p>
              )}
              <p className="mt-1 text-xs text-ink-600">{formatCompletedAt(item.completedAt) || 'No date recorded'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
