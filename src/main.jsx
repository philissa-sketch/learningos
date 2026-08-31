import React from 'react';
import ReactDOM from 'react-dom/client';
import FrontDoorGate from './FrontDoorGate.jsx';
import { useAppStore } from './store/useAppStore.js';
import './index.css';

/**
 * ---- A HANDLE ON THE STORE, IN DEV ONLY ----
 *
 * Vite folds `import.meta.env.DEV` to false and eliminates this from any
 * production build. `setState` here does not persist, so nothing it does
 * survives a reload — which is the property wanted: furnish a room for a
 * screenshot, take the picture, refresh.
 *
 *   __appStore.setState({ unlockedCosmetics: [...ids] })
 */
if (import.meta.env.DEV) {
  window.__appStore = useAppStore;
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
