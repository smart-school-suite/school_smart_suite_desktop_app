import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import CustomModal from "../modal";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
function ActionButtonDropdown({ actions, row_id }) {
  const key = uuidv4();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isToggled, setIsToggeled] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        !refs.reference.current?.contains(event.target) &&
        !refs.floating.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [refs]);
  const handleShow = (Component) => {
    setModalContent(<Component row_id={row_id} handleClose={handleClose} />);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent(null);
  };
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  return (
    <>
      <div
        className="position-relative d-flex w-100"
      >
        <button
          ref={refs.setReference}
          onClick={() => {
             toggleDropdown();
          }}
          className="btn btn-primary primary-background font-size-sm"
        >
          <span>Edit Admin</span>
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
            className="dropdown-menu show position-absolute shadow-sm border w-100 p-1 rounded-2"
          >
            {actions.length > 0 ? (
              actions.map((items) => {
                return (
                  <>
                    <div
                      className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm"
                      onClick={() => {
                        handleShow(items.modalContent);
                      }}
                    >
                      <span>{items.actionTitle}</span>
                      <span>
                        <Icon icon="mynaui:logout" className="font-size-md" />
                      </span>
                    </div>
                  </>
                );
              })
            ) : (
              <span>No actions found</span>
            )}
          </div>
        </CSSTransition>
      </div>
      <CustomModal
        show={showModal}
        handleClose={handleClose}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
export default ActionButtonDropdown;

export function ModalButton({ row_id, action, children, classname }) {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const handleShow = ( Component) => {
      setModalContent(<Component row_id={row_id} handleClose={handleClose} />);
      setShowModal(true);
    };
  
    const handleClose = () => {
      setShowModal(false);
      setModalContent(null);
    };
  
    return (
      <>
        <div>
          <button
            className={`${classname}`}
            onClick={() => {
              handleShow(action.modalTitle, action.modalContent);
            }}
          >
            {children}
          </button>
        </div>
        <CustomModal
          show={showModal}
          handleClose={handleClose}
        >
          {modalContent}
        </CustomModal>
      </>
    );
  }