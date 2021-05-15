import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ConfirmActionPopup from "./ConfirmActionPopup";

class EditPaguForm extends Component {
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

  FormInputs() {
    let inputs = [];
    let ado_list = this.props.ados;
    let pagu_list = this.props.pagus;
    let value = null;
    ado_list.forEach((ado) => {
      pagu_list.forEach((pagu) => {
        if (
          pagu.unit === this.props.selectedUnit.unit &&
          pagu.subunit === this.props.selectedUnit.sub_unit &&
          pagu.ADO === ado
        ) {
          value = pagu.alokasi;
        }
      });

      inputs.push(
        <Form.Group
          controlId={
            this.props.selectedUnit.unit +
            " " +
            this.props.selectedUnit.sub_unit +
            " " +
            ado
          }
        >
          <Form.Label>{ado}</Form.Label>
          <Form.Control
            type="number"
            required
            value={value}
            onChange={this.props.onChange}
          />
        </Form.Group>
      );
    });
    return inputs;
  }

  render() {
    return (
      <Modal show onHide={() => this.props.hide()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pagu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPlaintextUnit">
              <Form.Label column sm="2">
                {this.props.selectedUnit.unit}
              </Form.Label>
            </Form.Group>
            <Form.Group controlId="formPlaintextSubUnit">
              <Form.Label column sm="2">
                {this.props.selectedUnit.sub_unit}
              </Form.Label>
            </Form.Group>
            {this.FormInputs()}
            <Button onClick={() => this.showConfirmActionModal()}>
              Submit
            </Button>
            <Button onClick={() => this.props.hide()}>Close</Button>
          </Form>
        </Modal.Body>
        {this.state.showConfirmActionModal ? (
          <ConfirmActionPopup
            title="Edit Pagu"
            acceptAction={() => this.props.submit()}
            cancelAction={() => this.hideConfirmActionModal()}
          />
        ) : null}
      </Modal>
    );
  }
}

export default EditPaguForm;