import { Modal, Button } from "react-bootstrap";
import React from "react";
function CustomModal({ show, handleClose, title, children }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Body>
          <div className="scrollable-modial-body">
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
