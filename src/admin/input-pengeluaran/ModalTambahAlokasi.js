import React, { Component } from "react";
import {Modal, Form, Table, Button, Alert} from 'react-bootstrap';
import {formatRupiah, getSisaAnggaranFromBulan, getPenggunaanBulan, namaBulanIndonesia} from "_helpers";
import {RKADataService} from "_services";

export default class ModalTambahAlokasi extends Component {
    constructor(props) {
        super(props);
        this.state = { RKA: null, feedback: null }
        this.amount = React.createRef();
    }

    static getDerivedStateFromProps(props) {
        return { RKA: props.RKA }
    }

    handleCloseAlert = () => this.setState({ feedback: null })
    getSelectedBulan = () => {
        let { selectedBulan, bulan } = this.props;
        if (!selectedBulan || selectedBulan === bulan) {
            selectedBulan = bulan === "Januari" ? "Februari" : "Januari";
        }
        return selectedBulan;
    }

    handleSelectBulan = ({ target: { value }}) => this.props.updateSelectedBulan(value)
    handleSubmitForm = (e) => {
        e.preventDefault();
        const refJumlah = this.amount.current;
        if (!refJumlah) return;
        const { bulan, RKA: { _id } } = this.props;
        const bulanDikurang = this.getSelectedBulan().toLowerCase();
        const jumlah = Number(refJumlah.value);
        const body = { bulanDikurang, bulanDitambah: bulan.toLowerCase(), jumlah };
        console.log(body);
        RKADataService.ambilAlokasi(_id, body)
            .then(resp => {
                console.log(resp.data);
                const { data: RKA } = resp;
                console.log(RKA["rancangan"]);
                this.props.handleUpdateRKAs(RKA);
                this.setState({ feedback: { status: "success", message: "Alokasi pemindahan berhasil dilakukan!" } });
            })
            .catch(err => {
                console.log(err);
                this.setState({ feedback: { status: "danger", message: "Terjadi kesalahan" } });
            })
    }

    render() {
        const { show, bulan, handleClose } = this.props;
        const { RKA } = this.state;
        const { feedback } = this.state;
        const { rincian_belanja: rincianBelanja } = RKA;
        const selectedBulan = this.getSelectedBulan();
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Tambah Alokasi Bulan {bulan}</Modal.Title></Modal.Header>
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
                    <Form onSubmit={this.handleSubmitForm}>
                        <Form.Group controlId='pilih-bulan'>
                            <Form.Label>Pilih bulan lain untuk diambil alokasinya</Form.Label>
                            <Form.Control as='select' onChange={this.handleSelectBulan}>
                                {namaBulanIndonesia.map((b, id) => {
                                    if (b === bulan) return null;
                                    return <option key={id} selected={b === selectedBulan}>{b}</option>
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
                            <Form.Control type='number' ref={this.amount} />
                            <Form.Text id='tambah-alokasi-feedback' muted>Pastikan jumlah alokasi tidak melebihi sisa anggaran bulan {selectedBulan}</Form.Text>
                        </Form.Group>
                        <div className='container'>
                            <div className='row'>
                                <Button className='col text-center' type="submit" variant='success'>
                                    Tambah Alokasi
                                </Button>
                            </div>
                        </div>
                        {!!feedback &&
                            <Alert  onClose={this.handleCloseAlert}
                                    dismissible
                                    variant={feedback.status}
                                    className='mt-2 text-center'>{feedback.message}</Alert>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}