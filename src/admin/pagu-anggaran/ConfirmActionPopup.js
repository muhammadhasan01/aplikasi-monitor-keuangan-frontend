import { Button, Modal } from "react-bootstrap";

function ConfirmActionPopup(props){
    return (
      <Modal show onHide={() => props.cancelAction()}>
          <Modal.Header backdrop="static" centered>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Button onClick={() => props.acceptAction()}>Submit</Button>
              <Button onClick={() => props.cancelAction()}>Cancel</Button>
          </Modal.Body>
        </Modal>
    )
  }

  export default ConfirmActionPopup;