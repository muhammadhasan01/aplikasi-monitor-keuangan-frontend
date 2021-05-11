import React, { Component } from "react";
import {Modal, Form, Table, Button} from 'react-bootstrap';
import {formatRupiah, getSisaAnggaranFromBulan, getPenggunaanBulan, namaBulanIndonesia} from "_helpers";

export default class ModalTambahAlokasi extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedBulan: null }
    }

    static getDerivedStateFromProps(props) {
        return {
            RKA: props.RKA
        };
    }

    getSelectedBulan = () => {
        let { selectedBulan } = this.state;
        if (!selectedBulan) {
            selectedBulan = this.props.bulan === "Januari" ? "Februari" : "Januari";
        }
        return selectedBulan;
    }

    handleSelectBulan = ({ target: { value }}) => this.setState({ selectedBulan: value })

    render() {
        const { show, bulan, RKA } = this.props;
        const { rincian_belanja: rincianBelanja } = RKA;
        const selectedBulan = this.getSelectedBulan();
        return (
            <Modal show={show}>
                <Modal.Header><Modal.Title>Tambah Alokasi Bulan {bulan}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Table responsive="sm" bordered>
                        <tbody>
                        <tr>
                            <td><b>Rincian Belanja</b></td>
                            <td>{rincianBelanja}</td>
                        </tr>
                        <tr>
                            <td><b>Pengunaan</b></td>
                            <td>{formatRupiah(getPenggunaanBulan(RKA, bulan))}</td>
                        </tr>
                        <tr>
                            <td><b>Sisa Anggaran</b></td>
                            <td>{formatRupiah(getSisaAnggaranFromBulan(RKA, bulan))}</td>
                        </tr>
                        <tr>
                            <td><b>Bulan</b></td>
                            <td>{bulan}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Form>
                        <Form.Group controlId='pilih-bulan'>
                            <Form.Label>Pilih bulan lain untuk diambil alokasinya</Form.Label>
                            <Form.Control as='select' onChange={this.handleSelectBulan}>
                                {namaBulanIndonesia.map((b, id) => {
                                    if (b === bulan) return null;
                                    return <option key={id}>{b}</option>
                                })}
                            </Form.Control>
                            {!!selectedBulan &&
                            <Table responsive="sm" bordered>
                                <tbody>
                                <tr>
                                    <td><b>Sisa Anggaran Bulan {selectedBulan}</b></td>
                                    <td>{formatRupiah(getSisaAnggaranFromBulan(RKA, selectedBulan))}</td>
                                </tr>
                                </tbody>
                            </Table>
                            }
                        </Form.Group>
                        <Form.Group controlId='tambah-alokasi-dari-bulan'>
                            <Form.Label>Masukkan jumlah alokasi yang ingin diambil dari bulan <b>{selectedBulan}</b></Form.Label>
                            <Form.Control type='number' />
                            <Form.Text id='tambah-alokasi-feedback' muted>Pastikan jumlah alokasi tidak melebihi sisa anggaran bulan {selectedBulan}</Form.Text>
                        </Form.Group>
                        <div className='container'>
                            <div className='row'>
                                <Button className='col text-center' variant='success'>
                                    Tambah Alokasi
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}