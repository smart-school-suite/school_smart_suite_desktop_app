import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
function CustomModal({
  show,
  handleClose,
  children,
  size,
  centered = true, 
  scrollable = false,
  fullscreen = false,
  dialogClassName,
  contentClassName,
  ...props 
}) {
 const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size={size}
        centered={centered}
        scrollable={scrollable} 
        fullscreen={fullscreen}
        className="custom-modal"
        dialogClassName={dialogClassName}
        contentClassName={`${contentClassName || ''} ${darkMode ? 'dark-bg dark-mode-text' : 'white-bg'}`}
        {...props}
      >
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;