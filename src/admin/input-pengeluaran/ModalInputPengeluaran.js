import React, { Component } from 'react';
import { Button, Modal, Table, Form, Alert } from "react-bootstrap";
import {getSisaAnggaranFromBulan, formatRupiah} from "_helpers";
import {RKADataService} from "_services";

class ModalInputPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RKA: null,
            bulan: null,
            inputPengeluaran: 0,
            showMessage: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            RKA: nextProps.RKA,
            bulan: nextProps.bulan
        };
    }

    handleInputPengeluaran = ({ target: { value } }) => {
        console.log(value);
        this.setState({ inputPengeluaran: value });
    }

    handleClickInputPengeluaran = (e) => {
        e.preventDefault();
        const { RKA, bulan } = this.state;
        const { inputPengeluaran } = this.state;
        const sisaAnggaran = getSisaAnggaranFromBulan(RKA, bulan);
        if (inputPengeluaran > sisaAnggaran) {
            alert("Input pengeluaran tidak boleh lebih dari sisa anggaran");
            return;
        }
        const { unit, sub_unit: subunit, rincian_belanja: rb } = RKA;
        const body = {
            'rincian_belanja': rb,
            'amount': Number(inputPengeluaran),
            'bulan': bulan.toLowerCase()
        };
        RKADataService.inputPengeluaranRKA(unit, subunit, body)
            .then((response) => {
                const { data } = response;
                this.props.handleUpdateRKAs(data);
                this.setState({ showMessage: true });
            }).catch((err) => {
                console.log(err)
        })
    }

    render() {
        if (this.state.RKA == null) return null;
        const { RKA, bulan, showMessage } = this.state;
        const { rincian_belanja: rincianBelanja } = RKA;
        const sisaAnggaran = getSisaAnggaranFromBulan(RKA, bulan);
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
                                        className='col text-center'
                                        onClick={this.handleClickInputPengeluaran}
                                >
                                    Masukkan Input Pengeluaran
                                </Button>
                            </div>
                        </div>
                    </Form>
                    {showMessage ? <Alert className='mt-3' variant='success'>Successfully Updated!</Alert> : null}
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalInputPengeluaran;