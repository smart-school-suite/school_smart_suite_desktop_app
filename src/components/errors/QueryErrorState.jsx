import { RotateCcw, X } from "lucide-react";
import EmptyState, { EmptyStateButton } from "./EmptyState";
import { parseServerError } from "../../utils/functions";

/**
 * A request that failed to load, inside a dialog or drawer: the server's
 * title and description (or a connection message), with Try again and Close.
 *
 *   <QueryErrorState error={error} onRetry={refetch} onClose={handleClose} />
 */
export default function QueryErrorState({
  error,
  fallbackTitle = "Couldn't load this",
  onRetry,
  onClose,
  isRetrying = false,
  height = "100%",
  mascotHeight = "7rem",
}) {
  const { title, messages } = parseServerError(error, fallbackTitle);
  const actions =
    onRetry || onClose ? (
      <div className="d-flex flex-row gap-2 justify-content-center">
        {onRetry && (
          <EmptyStateButton icon={RotateCcw} onClick={() => !isRetrying && onRetry()}>
            {isRetrying ? "Retrying…" : "Try again"}
          </EmptyStateButton>
        )}
        {onClose && (
          <EmptyStateButton variant="secondary" icon={X} onClick={onClose}>
            Close
          </EmptyStateButton>
        )}
      </div>
    ) : null;

  return (
    <EmptyState
      mascot="error"
      title={title}
      description={messages?.[0] ?? "Something went wrong while loading. Please try again."}
      height={height}
      mascotHeight={mascotHeight}
      actions={actions}
    />
  );
}
