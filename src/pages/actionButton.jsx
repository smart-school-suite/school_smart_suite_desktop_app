import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "@iconify/react";
import CustomModal from "../components/modal";
import { CSSTransition } from "react-transition-group";
function ActionButtonDropdown({ actions, row_id }) {
  const key = uuidv4();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isToggled, setIsToggeled] = useState(false);
  const handleShow = (title, Component) => {
    setModalTitle(title);
    setModalContent(<Component  row_id={row_id} handleClose={handleClose}/>);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle("");
  };
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  return (
    <>
      <div className="dropdown-box z-1 position-relative">
        <div
          className="selected-box"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
        >
          <div
            className="d-flex flex-row justify-content-between primary-background align-items-center px-2 text-white rounded-3 pointer-cursor"
            style={{
              width: "6vw",
              height: "2.2rem",
            }}
          >
            <span>Edit</span>
            <span>
              <Icon
                icon="heroicons:chevron-down-20-solid"
                className={
                  isToggled ? "rotate-180 transition-3s" : "transition-3s"
                }
              />
            </span>
          </div>
        </div>
        <CSSTransition
          in={isToggled}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="d-flex flex-column bg-white p-2 rounded-3 w-100 border mt-1 z-3 position-absolute">
            <div className=" d-flex flex-column z-3">
              {
                actions.length > 0 ?  actions.map((items) => {
                    return (
                      <>
                        <span
                          className="my-0 font-size-sm gainsboro-color"
                          key={key}
                          onClick={() => {
                            handleShow(items.modalTitle, items.modalContent);
                          }}
                        >
                          {items.actionTitle}
                        </span>
                      </>
                    );
                  }) :
                   (
                    <span>No actions found</span>
                   )
              }
            </div>
          </div>
        </CSSTransition>
      </div>
      <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={modalTitle}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
export default ActionButtonDropdown;


export function ActionButtonDropUp({ actions, row_id }){
  const key = uuidv4();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isToggled, setIsToggeled] = useState(false);

  const dropdownRef = useRef(null);

  const handleShow = (title, Component) => {
    setModalTitle(title);
    setModalContent(<Component row_id={row_id} />);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle("");
  };

  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsToggeled(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="dropdown-box z-1 position-relative" ref={dropdownRef}>
        <div
          className="selected-box"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
        >
          <Icon icon="charm:menu-meatball" />
        </div>

        <CSSTransition
          in={isToggled}
          timeout={200}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="d-flex flex-column bg-white p-2 rounded-3  border mb-1 z-3 position-absolute" style={{ bottom: '100%', width:"10rem" }}>
            <div className="d-flex flex-column z-3">
              {actions.length > 0 ? actions.map((items) => (
                <span
                  className="my-1 font-size-sm gainsboro-color"
                  key={key}
                  onClick={() => {
                    handleShow(items.modalTitle, items.modalContent);
                  }}
                >
                  {items.actionTitle}
                </span>
              )) : (
                <span>No actions found</span>
              )}
            </div>
          </div>
        </CSSTransition>
      </div>

      <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={modalTitle}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}


export function ModialButton({ row_id, action, children, classname }){
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const handleShow = (title, Component) => {
    setModalTitle(title);
    setModalContent(<Component  row_id={row_id} handleClose={handleClose}/>);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setModalContent(null);
    setModalTitle("");
  };

  return(
    <>
    <div>
     <button className={`${classname}`}
       onClick={() => {
         handleShow(action.modalTitle, action.modalContent)
       }}
     >
     {children}
     </button>
    </div>
        <CustomModal
        show={showModal}
        handleClose={handleClose}
        title={modalTitle}
      >
        {modalContent}
      </CustomModal>
    </>
  )
}