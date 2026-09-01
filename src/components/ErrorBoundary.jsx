import { Component } from 'react';

/**
 * Catches a render/runtime crash in any screen below it so one broken
 * screen can't white-screen the whole app (Batch A, Aug 2026). All saved
 * work lives in IndexedDB on this computer, so a crash here never means
 * lost data — the fallback says so explicitly. The reload button both
 * remounts the tree and re-hydrates from disk, which recovers from any
 * transient render problem; a deterministic crash will show this same
 * screen again (instead of a blank white page) with the error name the
 * parent can report.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('A school screen crashed:', error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center text-ink-500">
        <p className="font-display text-sm uppercase tracking-widest text-signal-amber">
          This screen hit a problem
        </p>
        <p className="max-w-md text-sm">
          Your saved work is safe — everything is stored on this computer, and a
          display problem on one screen can&apos;t erase it. Reload to head back
          to the Dashboard and keep going.
        </p>
        <p className="max-w-md text-xs opacity-70">
          Details: {String(this.state.error?.message || this.state.error)}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg border border-space-700 bg-space-800 px-4 py-2 font-display text-sm uppercase tracking-widest transition hover:border-signal-cyan/50"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }
}
