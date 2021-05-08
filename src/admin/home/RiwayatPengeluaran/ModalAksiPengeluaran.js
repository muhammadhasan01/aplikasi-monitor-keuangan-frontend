import React, { Component } from 'react';
import { Modal, Button, Alert } from "react-bootstrap";

export default class ModalAksiPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showMessage: false
        };
    }

    static getDerivedStateFromProps(props) {
        return { show: props.show, showMessage: props.showMessage };
    }

    handleCloseMessage = () => this.setState({ showMessage: false })

    render() {
        const { show, showMessage } = this.state;
        const { action, handleConfirmation, handleClose } = this.props;
        return (
          <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                  <Modal.Title>{`Konfirmasi ${action} Pengeluaran`}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <p>{`Apakah Anda yakin ingin melakukan ${action} pengeluaran?`}</p>
                  <div className='container'>
                      <div className='row'>
                          <Button variant="success"
                                  className='col text-center m-2'
                                  onClick={handleConfirmation}
                          >
                              Ya
                          </Button>
                          <Button variant="danger"
                                  className='col text-center m-2'
                                  onClick={handleClose}
                          >
                              Tidak
                          </Button>
                      </div>
                  </div>
                  <Alert className='m-2' show={showMessage} variant="success">
                      {`${action} Pengeluaran Berhasil!`}
                  </Alert>
             </Modal.Body>
          </Modal>
        );
    }
}