import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Button, Modal, Form, ModalBody } from "react-bootstrap";

export function ConfirmActionPopup(props) {
  return (
    <Modal show onHide={() => props.cancelAction()} backdrop="static">
      <Modal.Header backdrop="static" centered>
        <Modal.Title>Konfirmasi {props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="danger"
          className="mr-1"
          style={{ width: "45%" }}
          onClick={() => props.cancelAction()}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          className="ml-1"
          style={{ width: "50%" }}
          onClick={() => props.acceptAction()}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export class NewUserForm extends Component {
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
      <Modal show onHide={() => this.props.hideNewUserForm()}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.props.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.props.onChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.props.onChangeName}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.props.onChangePassword}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={this.props.onChangeCPassword}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={this.props.onChangeUserType}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={this.props.onChangeUnit}
              >
                {this.props.renderUnitOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSubUnit">
              <Form.Label>Subunit</Form.Label>
              <Form.Control
                as="select"
                required
                onChange={this.props.onChangeSubUnit}
              >
                {this.props.renderSubUnitOptions()}
              </Form.Control>
            </Form.Group>
          </Form>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              variant="danger"
              className="mr-1"
              style={{ width: "45%" }}
              onClick={() => this.props.hideNewUserForm()}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="ml-1"
              style={{ width: "45%" }}
              onClick={() => this.showConfirmActionModal()}
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
        {this.state.showConfirmActionModal ? (
          <ConfirmActionPopup
            title="Add New User"
            acceptAction={() => this.props.saveUser()}
            cancelAction={() => this.hideConfirmActionModal()}
          />
        ) : null}
      </Modal>
    );
  }
}

export class EditUserForm extends Component {
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
      <Modal show onHide={() => this.props.hideEditUserForm()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.name}
                onChange={this.props.onChangeName}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                required
                value={this.props.userType}
                onChange={this.props.onChangeUserType}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.username}
                onChange={this.props.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                as="select"
                required
                value={this.props.unit}
                onChange={this.props.onChangeUnit}
              >
                {this.props.renderUnitOptions()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSubUnit">
              <Form.Label>Sub Unit</Form.Label>
              <Form.Control
                as="select"
                required
                value={this.props.subunit}
                onChange={this.props.onChangeSubUnit}
              >
                {this.props.renderSubUnitOptions()}
              </Form.Control>
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              variant="danger"
              className="mr-1"
              style={{ width: "45%" }}
              onClick={() => this.props.hideEditUserForm()}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              className="ml-1"
              style={{ width: "45%" }}
              onClick={() => this.showConfirmActionModal()}
            >
              Submit
            </Button>
          </div>
        </Modal.Body>
        {this.state.showConfirmActionModal ? (
          <ConfirmActionPopup
            title="Edit User"
            acceptAction={() => this.props.updateUser()}
            cancelAction={() => this.hideConfirmActionModal()}
          />
        ) : null}
      </Modal>
    );
  }
}
