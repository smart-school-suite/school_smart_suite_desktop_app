import { Modal } from "react-bootstrap";
import React from "react";
function CustomModal({ show, handleClose, children, fullscreen=false }) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        fullscreen={fullscreen}
        className="custom-modal"
      >
        <Modal.Body className="custom-modal">
          <div>{children}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
