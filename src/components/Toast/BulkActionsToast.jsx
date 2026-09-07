import { motion, AnimatePresence } from "framer-motion";
import { useFloating, offset, shift, autoUpdate } from "@floating-ui/react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { SquareMousePointer } from "lucide-react";

function BulkActionsToast({
  anchorRef,
  rowCount,
  label,
  dropDownItems,
  actionButton,
  resetAll,
}) {
  const [isToggled, setIsToggeled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRef, setModalRef] = useState(null);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const { refs: containerRefs, floatingStyles: containerFloatingStyles } =
    useFloating({
      placement: "bottom",
      strategy: "fixed",
      middleware: [
        offset(({ rects }) => -(rects.floating.height + 120)),
        shift({ padding: 16 }),
      ],
      whileElementsMounted: (reference, floating, update) =>
        autoUpdate(reference, floating, update, {
          animationFrame: true,
        }),
    });

  useEffect(() => {
    if (anchorRef?.current) {
      containerRefs.setReference(anchorRef.current);
    }
  }, [anchorRef, containerRefs]);

  const handleModalStateChange = (modalOpen, modalElementRef) => {
    setIsModalOpen(modalOpen);
    setModalRef(modalElementRef);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen) {
        return;
      }

      if (modalRef?.current?.contains(event.target)) {
        return;
      }

      if (!event.target.closest(".bulk-actions-toast")) {
        setIsToggeled(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, modalRef]);

  const toggleDropdown = () => {
    setIsToggeled((prev) => !prev);
  };

  return createPortal(
    <div
      ref={containerRefs.setFloating}
      style={{
        ...containerFloatingStyles,
        zIndex: 1020,
        width: "min(90%, 540px)",
      }}
    >
      <motion.div
        className="d-flex flex-column justify-content-center align-items-center"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 32,
        }}
      >
        <div className="position-relative w-100 bulk-actions-toast">
          <AnimatePresence>
            {isToggled && (
              <motion.div
                className="position-absolute end-0 bottom-100 mb-3"
                style={{
                  zIndex: 1081,
                  width: "50%",
                }}
                initial={{
                  opacity: 0,
                  y: 6,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.18,
                }}
              >
                <div className="me-2">
                  <div
                  className="w-100 d-flex flex-column rounded-3 white-bg border p-2 shadow-sm overflow-x-hidden overflow-y-auto scroll-bar-sm"
                  style={{
                    maxHeight: "24dvh"
                  }}
                >
                  {React.cloneElement(dropDownItems, {
                    onModalStateChange: handleModalStateChange,
                  })}
                </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="w-100 p-2 rounded-3 d-flex flex-row justify-content-between align-items-center shadow-sm bg-white border"
          >
            <div className="d-flex flex-row align-items-center gap-3">
              <SquareMousePointer size={16} />
              <span className="font-size-sm">
                {rowCount} {label}
              </span>
            </div>

            <div className="d-flex flex-row gap-1">
              {actionButton}

              <button
                type="button"
                className={
                  darkMode
                    ? "dark-mode-text border-none transparent-bg"
                    : "border-none transparent-bg text-color"
                }
                onClick={toggleDropdown}
              >
                <span className="pointer-cursor">
                  <Icon icon="circum:menu-kebab" width="24" height="24" />
                </span>
              </button>

              <button
                type="button"
                className={
                  darkMode
                    ? "dark-mode-text border-none transparent-bg"
                    : "border-none transparent-bg text-color"
                }
                onClick={resetAll}
              >
                <span className="pointer-cursor">
                  <Icon
                    icon="material-symbols-light:cancel-outline"
                    width="24"
                    height="24"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

export default BulkActionsToast;
