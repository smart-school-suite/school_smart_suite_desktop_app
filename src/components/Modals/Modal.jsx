import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react"

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
  closeOnOutsideClick = true, 
  closeOnEscape = true,
  ...props
}) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      centered={centered}
      scrollable={scrollable}
      fullscreen={fullscreen}
      backdrop={closeOnOutsideClick ? true : "static"} 
      keyboard={closeOnEscape}
      className="custom-modal border p-0"
      dialogClassName={`${dialogClassName || ""} custom-modal-dialog`}
      contentClassName={`${contentClassName || ""} ${darkMode ? "dark-bg dark-mode-text" : "white-bg"} custom-modal-content`}
      {...props}
    >
      <Modal.Body className="custom-modal-body p-0">
        {children}
      </Modal.Body>
    </Modal>
  );
}

export default CustomModal;