import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";

class ModalNotFoundRKA extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        const { heading, body } = this.props;
        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalNotFoundRKA;