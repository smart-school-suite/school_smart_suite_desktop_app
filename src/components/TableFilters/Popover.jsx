import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { cloneElement, useState } from "react";

/**
 * Small anchored popover. `trigger` is a single element; `children` is a
 * render function receiving `close`.
 */
function Popover({
  trigger,
  children,
  placement = "bottom-start",
  width = 300,
}) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    transform: false,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip({ padding: 8 }), shift({ padding: 8 })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
    useRole(context, { role: "dialog" }),
  ]);

  return (
    <>
      {cloneElement(trigger, {
        ref: refs.setReference,
        "aria-expanded": open,
        ...getReferenceProps(trigger.props),
      })}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingFocusManager
              context={context}
              modal={false}
              initialFocus={-1}
            >
              <motion.div
                ref={refs.setFloating}
                style={{ ...floatingStyles, width, zIndex: 1050 }}
                {...getFloatingProps()}
                className="tf-pop"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                {children(() => setOpen(false))}
              </motion.div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default Popover;
