import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontDoorGate from './FrontDoorGate.jsx';
import './index.css';

/**
 * ---- A HANDLE ON THE STORE, IN DEV ONLY ----
 *
 * Vite folds `import.meta.env.DEV` to false and eliminates this from any
 * production build. `setState` here does not persist, so nothing it does
 * survives a reload — which is the property wanted: furnish a room for a
 * screenshot, take the picture, refresh.
 *
 *   await __appStore(); __appStore.get.setState({ unlockedCosmetics: [...ids] })
 *
 * ---- WHY THIS BECAME A FUNCTION ----
 *
 * It used to be a static import of the store. That one line pulled the store —
 * and through it every content module the store reads — into the entry chunk,
 * which meant one Academy's whole curriculum was downloaded and evaluated
 * before anybody had signed in. It also broke the rule the content interface
 * depends on: no school module may evaluate before its Academy's content is
 * loaded. Importing on demand keeps the handle and drops both problems.
 */
if (import.meta.env.DEV) {
  window.__appStore = async () => {
    const mod = await import('./store/useAppStore.js');
    window.__appStore.get = mod.useAppStore;
    return mod.useAppStore;
  };
}

/**
 * LearningOS.
 *
 * The gate is the whole app at this point: it decides who is at the keyboard,
 * opens that Academy's database, and hands over. Nothing here knows about a
 * learner, a subject or a lesson — and the check in
 * scripts/verify-no-learner.mjs is what keeps it that way.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FrontDoorGate />
  </React.StrictMode>
);
