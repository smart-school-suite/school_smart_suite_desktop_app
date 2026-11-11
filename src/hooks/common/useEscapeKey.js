import { useEffect, useRef } from "react";

// Calls `onEscape` when Escape is pressed while `enabled`, and stops the event
// there. Drawers close themselves on Escape from a document capture listener;
// this listens on window in the capture phase, which runs first, so a modal or
// popover opened from a drawer closes on its own without closing the drawer.
export function useEscapeKey(onEscape, enabled = true) {
  const callbackRef = useRef(onEscape);
  useEffect(() => {
    callbackRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!enabled) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !event.isComposing) {
        event.stopPropagation();
        callbackRef.current?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [enabled]);
}
