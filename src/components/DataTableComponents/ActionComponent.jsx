import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import CustomModal from "../Modals/Modal";
import React from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
} from "@floating-ui/react";
import { useSelector } from "react-redux";
function ActionButtonDropdown({
  children,
  style,
  buttonContent
}) {
  const [isToggled, setIsToggeled] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [
      offset(5),
      flip(),
      shift(),
      size({
        apply({ elements }) {
          // Set the width of the floating element directly
          Object.assign(elements.floating.style, {
            width: `20vw`, // Set width to 30% of viewport width
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        !refs.reference.current?.contains(event.target) &&
        !refs.floating.current?.contains(event.target)
      ) {
        setIsToggeled(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [refs]);
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  return (
    <>
      <div className="position-relative d-flex w-100">
        <button
          ref={refs.setReference}
          onClick={() => {
            toggleDropdown();
          }}
          className={style}
        >
          {buttonContent}
        </button>
        <CSSTransition
          in={isToggled}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`${darkMode ? 'dark-bg dark-mode-border' : 'border'} dropdown-menu show position-absolute shadow-sm p-1 rounded-3 d-flex flex-column gap-1`}
          >
          {children}
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
export default React.memo(ActionButtonDropdown);

export function ModalButton({
  action,
  children,
  classname,
  rowData,
  resetAll,
  size,
  bulkData,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShow = (Component) => {
    setModalContent(
      <Component
        handleClose={handleClose}
        rowData={rowData}
        resetAll={resetAll}
        bulkData={bulkData}
      />
    );
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <>
      <div>
        <div
          className={`${classname} pointer-cursor`}
          onClick={(e) => {
            e.stopPropagation();
            handleShow(action.modalContent);
          }}
        >
          {children}
        </div>
      </div>
      <CustomModal show={showModal} handleClose={handleClose} size={size}>
        {modalContent}
      </CustomModal>
    </>
  );
}

export function DropDownMenuItem({ children, onClick, className, ...props }){
   return (
    <button
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}