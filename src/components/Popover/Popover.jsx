import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useState } from "react";
import { useEscapeKey } from "../../hooks/common/useEscapeKey";

// Stops clicks/keys from reaching parents in the React tree. Portalled content
// still bubbles through React, so without this a click inside the popover
// would also count as a click on whatever card or row contains it.
const stop = (event) => event.stopPropagation();

/**
 * Small click-to-open popover.
 *
 *   <Popover trigger="+2" triggerClassName="..." ariaLabel="Show 2 more">
 *     ...content...
 *   </Popover>
 */
export default function Popover({
  trigger,
  triggerClassName = "",
  ariaLabel,
  placement = "bottom-start",
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context, { escapeKey: false }),
    useRole(context, { role: "dialog" }),
  ]);
  useEscapeKey(() => setIsOpen(false), isOpen);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        className={triggerClassName}
        aria-label={ariaLabel}
        {...getReferenceProps({ onClick: stop, onKeyDown: stop })}
      >
        {trigger}
      </button>
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="app-popover"
            {...getFloatingProps({ onClick: stop, onKeyDown: stop })}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
