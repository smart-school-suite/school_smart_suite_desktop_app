import { Modal } from "react-bootstrap";
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
        contentClassName={contentClassName}
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