import { Component } from "react";
import { RotateCcw, X } from "lucide-react";
import EmptyState, { EmptyStateButton } from "./EmptyState";

const keysChanged = (previous = [], next = []) =>
  previous.length !== next.length ||
  previous.some((key, index) => !Object.is(key, next[index]));

/**
 * Keeps a rendering error inside the part of the screen that failed (a
 * dialog, a drawer, a page) instead of unmounting the whole app.
 *
 *   <ErrorBoundary resetKeys={[show]} onClose={handleClose}>
 *     {children}
 *   </ErrorBoundary>
 *
 * - resetKeys: when any of them changes, the boundary tries again (e.g. the
 *   dialog was reopened or the route changed).
 * - onReset: called on "Try again", before re-rendering (clear bad state).
 * - onClose: shows a "Close" button next to "Try again".
 * - fallback: ({ error, reset }) => node, to replace the default screen.
 */
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info?.componentStack);
    this.props.onError?.(error, info);
  }

  componentDidUpdate(previousProps) {
    if (this.state.error && keysChanged(previousProps.resetKeys, this.props.resetKeys)) {
      this.setState({ error: null });
    }
  }

  reset = () => {
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const {
      fallback,
      onClose,
      title = "Something went wrong",
      description = "This part of the app ran into a problem. Nothing you saved was lost; try again, and if it keeps happening, close it and reopen it.",
      height = "100%",
      mascotHeight = "7rem",
    } = this.props;

    if (fallback) return fallback({ error, reset: this.reset });

    return (
      <div className="d-flex w-100 h-100 p-3" style={{ minHeight: "18rem" }}>
        <EmptyState
          mascot="error"
          title={title}
          description={description}
          height={height}
          mascotHeight={mascotHeight}
          actions={
            <div className="d-flex flex-row gap-2 justify-content-center">
              <EmptyStateButton icon={RotateCcw} onClick={this.reset}>
                Try again
              </EmptyStateButton>
              {onClose && (
                <EmptyStateButton variant="secondary" icon={X} onClick={onClose}>
                  Close
                </EmptyStateButton>
              )}
            </div>
          }
        />
      </div>
    );
  }
}
