import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Button, Modal, Form, ModalBody } from "react-bootstrap";

export function ConfirmActionPopup(props) {
  return (
    <Modal show onHide={() => props.cancelAction()} backdrop="static">
      <Modal.Header backdrop="static" centered>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={() => props.acceptAction()}>Submit</Button>
        <Button onClick={() => props.cancelAction()}>Cancel</Button>
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
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.username}
                onChange={this.props.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.email}
                onChange={this.props.onChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId="formName">
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
            <Form.Group controlId="formPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.password}
                onChange={this.props.onChangePassword}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label column sm="2">
                Confirm Password
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.c_password}
                onChange={this.props.onChangeCPassword}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label column sm="2">
                Role
              </Form.Label>
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
            <Form.Group controlId="formUnit">
              <Form.Label column sm="2">
                Unit
              </Form.Label>
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
              <Form.Label column sm="2">
                Sub Unit
              </Form.Label>
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
          <Button onClick={() => this.props.hideNewUserForm()}>Cancel</Button>
          <Button onClick={() => this.showConfirmActionModal()}>Submit</Button>
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
            <Form.Group controlId="formRole">
              <Form.Label column sm="2">
                Role
              </Form.Label>
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
              <Form.Label column sm="2">
                Username
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={this.props.username}
                onChange={this.props.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formUnit">
              <Form.Label column sm="2">
                Unit
              </Form.Label>
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
              <Form.Label column sm="2">
                Sub Unit
              </Form.Label>
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
          <Button onClick={() => this.props.hideEditUserForm()}>Cancel</Button>
          <Button onClick={() => this.showConfirmActionModal()}>Submit</Button>
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

export function UserRow(props) {
  return (
    <tr>
      <td>
        <p>{props.username}</p>
      </td>
      <td>
        <p>{props.name}</p>
      </td>
      <td>
        <p>{props.userType}</p>
      </td>
      <td>
        <p>{props.unit}</p>
      </td>
      <td>
        <Button onClick={props.onClickEdit}>Edit</Button>
      </td>
      <td>
        <Button onClick={props.onClickDelete}>Delete</Button>
      </td>
    </tr>
  );
}