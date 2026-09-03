import React from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingPortal,
  FloatingOverlay,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const slideVariants = {
  right: {
    initial: { x: "100%" },
    animate: { x: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
    exit: {
      x: "100%",
      transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
    },
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
    exit: {
      x: "-100%",
      transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
    },
  },
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
    exit: {
      y: "100%",
      transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
    },
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
    exit: {
      y: "-100%",
      transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
    },
  },
};

const backdropTransition = { duration: 0.25, ease: "easeOut" };

function useScrollLock(isLocked) {
  React.useLayoutEffect(() => {
    if (!isLocked) return;

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const originalOverflowY = document.body.style.overflowY;
    const originalOverflowX = document.body.style.overflowX;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflowY = "hidden";
    document.body.style.overflowX = "hidden";
    if (scrollBarWidth > 0) {
      const currentPadding =
        parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflowY = originalOverflowY;
      document.body.style.overflowX = originalOverflowX;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  placement = "right",
  className = "",
  closeOnOutsideClick = true,
  showHeader = true,
}) => {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => !open && onClose(),
  });

  const dismiss = useDismiss(context, {
    outsidePress: closeOnOutsideClick,
    escapeKey: true,
  });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);
  useScrollLock(isOpen);

  return (
    <FloatingPortal>
      <AnimatePresence>
        {isOpen && (
          <FloatingOverlay lockScroll={false} className="drawer-overlay">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              className="drawer-backdrop"
              style={{}}
              onClick={closeOnOutsideClick ? onClose : undefined}
            />

            <FloatingFocusManager context={context}>
              <motion.div
                ref={refs.setFloating}
                {...getFloatingProps()}
                variants={slideVariants[placement]}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`drawer-panel drawer-panel--${placement} ${className} bg-white`}
              >
                {showHeader && (
                  <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
                    <span className="fw-medium">{title}</span>
                    <button
                      onClick={onClose}
                      className="bg-none border-none border rounded-circle"
                      aria-label="Close drawer"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        display: "grid",
                        placeItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {children}
              </motion.div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
};
