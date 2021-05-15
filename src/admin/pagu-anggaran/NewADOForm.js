import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ConfirmActionPopup from "./ConfirmActionPopup";

class NewADOFOrm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmActionModal: false,
    };
  }

  showConfirmActionModal() {
    this.setState({
      showConfirmActionModal: true,
    });
  }

  hideConfirmActionModal() {
    this.setState({
      showConfirmActionModal: false,
    });
  }

  render() {
    return (
      <Modal show onHide={() => this.props.hide()}>
        <Modal.Header closeButton>
          <Modal.Title>Insert New ADO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formADOName">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.name}
                onChange={this.props.onChangeName}
              />
            </Form.Group>
            <Form.Group controlId="formADODetail">
              <Form.Label column sm="2">
                Detail
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.detail}
                onChange={this.props.onChangeDetail}
              />
            </Form.Group>
          </Form>
          <Button onClick={() => this.showConfirmActionModal()}>Submit</Button>
          <Button onClick={() => this.props.hide()}>Close</Button>
        </Modal.Body>
        {this.state.showConfirmActionModal ? (
          <ConfirmActionPopup
            title="New ADO"
            acceptAction={() => this.props.submit()}
            cancelAction={() => this.hideConfirmActionModal()}
          />
        ) : null}
      </Modal>
    );
  }
}

export default NewADOFOrm;