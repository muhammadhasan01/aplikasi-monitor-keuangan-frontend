import React, { Component } from 'react';
import {Button, Modal, Table, Form} from "react-bootstrap";
import {namaBulanIndonesia, formatRupiah} from "_helpers";

class ModalInputPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RKA: null,
            bulan: null,
            inputPengeluaran: 0
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            RKA: nextProps.RKA,
            bulan: nextProps.bulan
        };
    }

    handleInputPengeluaran = (e) => {
        this.setState({ inputPengeluaran: e.target.value });
    }

    render() {
        if (this.state.RKA == null) return null;
        const { unit, sub_unit: subUnit, rincian_belanja: rincianBelanja, rancangan, penggunaan } = this.state.RKA;
        const bulan = this.state.bulan;
        const idBulan = bulan.toLowerCase();
        const sisaAnggaran = rancangan[idBulan] - penggunaan[idBulan];
        return (
            <Modal show onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Input Pengeluaran</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive="sm" bordered>
                        <tbody>
                            <tr>
                                <td><b>Rincian Belanja</b></td>
                                <td>{rincianBelanja}</td>
                            </tr>
                            <tr>
                                <td><b>Sisa Anggaran</b></td>
                                <td>{formatRupiah(sisaAnggaran)}</td>
                            </tr>
                            <tr>
                                <td><b>Bulan</b></td>
                                <td>{bulan}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Form>
                        <Form.Group controlId="formInputPengeluaran">
                            <Form.Label>Masukkan Jumlah Input Pengeluaran</Form.Label>
                            <Form.Control type="number" placeholder="Jumlah Input Pengeluaran"
                                onChange={this.handleInputPengeluaran}
                            />
                        </Form.Group>
                        <div className='container'>
                            <div className='row'>
                                <Button variant="primary" type="submit"
                                        className='col text-center'>
                                    Masukkan Input Pengeluaran
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalInputPengeluaran;