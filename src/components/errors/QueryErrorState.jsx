import { RotateCcw, X } from "lucide-react";
import EmptyState, { EmptyStateButton } from "./EmptyState";
import { parseServerError } from "../../utils/functions";

/**
 * A request that failed to load, inside a dialog or drawer: the server's
 * title and description (or a connection message), with Try again and Close.
 *
 *   <QueryErrorState error={error} onRetry={refetch} onClose={handleClose} />
 *
 * Pass `title` / `description` to replace the server's words when the
 * caller knows better (e.g. a 404 that means the endpoint is missing).
 */
export default function QueryErrorState({
  error,
  fallbackTitle = "Couldn't load this",
  title: titleOverride,
  description: descriptionOverride,
  onRetry,
  onClose,
  isRetrying = false,
  height = "100%",
  mascotHeight = "7rem",
}) {
  const parsed = parseServerError(error, fallbackTitle);
  const title = titleOverride ?? parsed.title;
  const messages = descriptionOverride ? [descriptionOverride] : parsed.messages;
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
