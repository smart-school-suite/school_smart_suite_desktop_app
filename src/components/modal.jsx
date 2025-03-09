import { Modal, Button } from "react-bootstrap";
import React from "react";
function CustomModal({ show, handleClose,  children }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Body>
          <div >
            {children}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
