import { Button, Modal } from "react-bootstrap";
import React from "react";

function ConfirmActionPopup(props) {
  return (
    <Modal show onHide={() => props.cancelAction()} backdrop="static">
      <Modal.Header backdrop="static" centered>
        <Modal.Title>Konfirmasi {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          className="mr-1"
          style={{ width: "46%" }}
          onClick={() => props.cancelAction()}
          variant="danger"
        >
          Cancel
        </Button>
        <Button
          className="ml-1"
          style={{ width: "50%" }}
          onClick={() => props.acceptAction()}
          variant="success"
        >
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmActionPopup;
