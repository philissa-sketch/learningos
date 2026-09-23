import React from 'react';

/**
 * One screen crashing must not white-screen the whole app. Mission Control
 * added this after the fact; it is here from the start.
 *
 * The message is written for a nine-year-old first and a parent second: it says
 * nothing is lost, because the very first thing a child assumes when a screen
 * breaks is that she broke it and her work is gone.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Console only — there is no server to report to, and a local app should
    // not pretend otherwise.
    console.error('Petal & Pestle caught an error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-lg px-6 py-16 text-center">
          <div className="panel px-6 py-10">
            <p className="text-4xl">🌱</p>
            <h2 className="mt-3 font-display text-xl text-ink-900">This page got tangled</h2>
            <p className="mt-2 text-sm text-ink-700">
              Nothing you did caused this and nothing you have finished is lost — every answer is
              saved the moment you give it.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-blush-500 px-6 py-2.5 font-700 text-white hover:bg-blush-700"
            >
              Start again
            </button>
            <p className="mt-4 text-[0.7rem] text-ink-500">
              For a grown-up: {String(this.state.error?.message || this.state.error)}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
