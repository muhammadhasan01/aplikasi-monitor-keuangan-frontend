import React, { Component } from 'react';
import { Button, Modal, Table, Form, Alert } from "react-bootstrap";
import { getSisaAnggaranFromBulan, formatRupiah, getPenggunaanBulan } from "_helpers";
import { pengeluaranDataService } from "_services";

class ModalInputPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RKA: null,
            bulan: null,
            inputPengeluaran: 0,
            show: false,
            showMessage: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            RKA: nextProps.RKA,
            bulan: nextProps.bulan,
            show: nextProps.show,
            showMessage: nextProps.showMessage
        };
    }

    handleInputPengeluaran = ({ target: { value } }) => {
        this.setState({ inputPengeluaran: Number(value) });
    }

    handleClickInputPengeluaran = (e) => {
        e.preventDefault();
        const { RKA, bulan } = this.state;
        const { inputPengeluaran } = this.state;
        const sisaAnggaran = getSisaAnggaranFromBulan(RKA, bulan);
        if (inputPengeluaran > sisaAnggaran || inputPengeluaran < 0) {
            alert("Input pengeluaran tidak beleh invalid atau lebih dari sisa anggaran");
            return;
        }
        const { unit, sub_unit: subunit, rincian_belanja: rb } = RKA;
        const body = {
            'rincian_belanja': rb,
            'amount': Number(inputPengeluaran),
            'bulan': bulan.toLowerCase(),
            'unit': unit,
            'sub_unit': subunit
        };
        pengeluaranDataService.inputPengeluaranRKA(body)
            .then((response) => {
                const { data: { RKA } } = response;
                this.props.handleUpdateRKAs(RKA);
                this.setState({ showMessage: true });
            }).catch((err) => {
                console.log(err)
        })
    }

    render() {
        const { RKA, bulan, show, showMessage } = this.state;
        if (!RKA) {
            return null;
        }
        const { rincian_belanja: rincianBelanja } = RKA;
        const penggunaan = getPenggunaanBulan(RKA, bulan);
        const sisaAnggaran = getSisaAnggaranFromBulan(RKA, bulan);
        return (
            <Modal show={show} onHide={this.props.handleClose}>
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
                                <td><b>Pengunaan</b></td>
                                <td>{formatRupiah(penggunaan)}</td>
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
                                <Button type="submit"
                                        className='col text-center'
                                        onClick={this.handleClickInputPengeluaran}
                                >
                                    Masukkan Input Pengeluaran
                                </Button>
                            </div>
                        </div>
                    </Form>
                    <Alert className='mt-3' show={showMessage} variant='success'>Successfully Updated!</Alert>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalInputPengeluaran;