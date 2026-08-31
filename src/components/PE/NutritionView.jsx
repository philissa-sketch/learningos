import { useState } from 'react';
import {
  nutritionTopics,
  recipeLibrary,
  shoppingListCategories,
  nutritionChallenges
} from '../../academies/lamar/data/pe/nutritionContent.js';

const SUBTABS = [
  { id: 'topics', label: 'Learn' },
  { id: 'recipes', label: 'Recipe Library' },
  { id: 'shopping', label: 'Shopping List' },
  { id: 'challenges', label: 'Challenges' }
];

export function NutritionView() {
  const [subtab, setSubtab] = useState('topics');
  const [openTopicId, setOpenTopicId] = useState(nutritionTopics[0]?.id ?? null);
  const [openRecipeId, setOpenRecipeId] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 rounded-lg bg-space-900 p-1">
        {SUBTABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubtab(t.id)}
            className={
              'rounded-md px-3 py-1.5 text-xs font-display font-600 transition-colors ' +
              (subtab === t.id ? 'bg-signal-cyan/15 text-signal-cyan' : 'text-ink-300 hover:text-ink-100')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {subtab === 'topics' && (
        <div className="space-y-3">
          {nutritionTopics.map((topic) => {
            const open = openTopicId === topic.id;
            return (
              <div key={topic.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
                <button
                  type="button"
                  onClick={() => setOpenTopicId(open ? null : topic.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="font-display text-base font-700 text-ink-100">{topic.title}</p>
                    <p className="mt-1 text-xs text-ink-500">{topic.summary}</p>
                  </div>
                  <span className="flex-none text-ink-500">{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div className="mt-3 space-y-2 border-t border-space-700 pt-3">
                    {topic.body.map((para, i) => (
                      <p key={i} className="text-sm text-ink-300">
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {subtab === 'recipes' && (
        <div className="space-y-3">
          {recipeLibrary.map((recipe) => {
            const open = openRecipeId === recipe.id;
            return (
              <div key={recipe.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
                <button
                  type="button"
                  onClick={() => setOpenRecipeId(open ? null : recipe.id)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <div>
                    <p className="font-display text-base font-700 text-ink-100">{recipe.title}</p>
                    <p className="mt-1 text-xs text-ink-500">
                      {recipe.category} · {recipe.prepTime} · Serves {recipe.servings} · {recipe.skillLevel}
                    </p>
                  </div>
                  <span className="flex-none text-ink-500">{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div className="mt-3 space-y-3 border-t border-space-700 pt-3">
                    <div>
                      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Ingredients</p>
                      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-300">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-display uppercase tracking-widest text-ink-500">Steps</p>
                      <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-ink-300">
                        {recipe.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <p className="rounded-lg border border-signal-green/30 bg-signal-green/5 p-3 text-sm text-ink-300">
                      {recipe.nutritionNote}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {subtab === 'shopping' && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {shoppingListCategories.map((cat) => (
            <div key={cat.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
              <p className="font-display text-sm font-700 uppercase tracking-wide text-signal-cyan">{cat.label}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-300">
                {cat.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {subtab === 'challenges' && (
        <div className="space-y-3">
          {nutritionChallenges.map((c) => (
            <div key={c.id} className="rounded-xl border border-space-700 bg-space-800 p-4 shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-base font-700 text-ink-100">{c.title}</p>
                <span className="flex-none rounded-full border border-signal-amber/40 bg-signal-amber/10 px-2 py-1 text-xs font-display text-signal-amber">
                  {c.durationDays} days
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-300">{c.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
