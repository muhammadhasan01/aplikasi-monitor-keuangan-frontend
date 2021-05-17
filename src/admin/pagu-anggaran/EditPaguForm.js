import React, { Component } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
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
    const { unit, sub_unit } = this.props.selectedUnit;
    return (
      <Modal show onHide={() => this.props.hide()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Pagu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <tr>
              <td>
                <b>Unit</b>
              </td>
              <td>{unit}</td>
            </tr>
            <tr>
              <td>
                <b>Subunit</b>
              </td>
              <td>{sub_unit}</td>
            </tr>
          </Table>
          <Form>
            {this.FormInputs()}
            <Button
              className="mr-1"
              style={{ width: "46%" }}
              onClick={() => this.props.hide()}
              variant="danger"
            >
              Close
            </Button>
            <Button
              className="ml-1"
              style={{ width: "50%" }}
              onClick={() => this.showConfirmActionModal()}
              variant="success"
            >
              Submit
            </Button>
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
