import React, {Component} from 'react';
import {ADODataService} from "../../_services";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

class TambahRKAForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sisa: 0,
            show: false,
            ADOOption: [],
            currentADO: null,
            JenisOption: ["Barang", "Jasa", "Modal"]
        }
    }

    componentDidMount() {
        this.renderADOOption();
    }

    renderADOOption(){
        ADODataService.getDistinctADO()
            .then(response => {
                this.setState({ ADOOption: response.data });
                console.log(this.state.ADOOption);
            })
            .catch(err => {
                console.log(err);

            })
    }

    setShow = (boolean) => {
        this.setState({show:boolean});
    }

    handleClose = () => this.setShow(false);

    handleShow = () => {
        this.setState({currentADO: this.props.ado})
        this.setShow(true);
    }

    handleSubmit = (e) => {
        const data = {
            "ADO"                   : e.target.adoSelect.value,
            "kegiatan"              : e.target.kegiatan.value,
            "subkegiatan"           : e.target.subkegiatan.value,
            "rincian_subkegiatan"   : e.target.rincian_subkegiatan.value,
            "jenis_belanja"         : e.target.jenis_belanja.value,
            "rancangan": {
                "januari"   : e.target.Januari.value,
                "februari"  : e.target.Februari.value,
                "maret"     : e.target.Maret.value,
                "april"     : e.target.April.value,
                "mei"       : e.target.Mei.value,
                "juni"      : e.target.Juni.value,
                "juli"      : e.target.Juli.value,
                "agustus"   : e.target.Agustus.value,
                "september" : e.target.September.value,
                "oktober"   : e.target.Oktober.value,
                "november"  : e.target.November.value,
                "desember"  : e.target.Desember.value
            }
        };

        // const data = [e.target.adoSelect.value, e.target.kegiatan.value, e.target.subkegiatan.value]

        console.log(data);

        e.preventDefault();
    }

    render(){
        const bulan1 = ["Januari", "Februari","Maret","April","Mei","Juni"];
        const bulan2 = ["Juli", "Agustus","September","Oktober","November","Desember"];

        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Tambah RKA Baru
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah RKA</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs={4}>
                                    <h4>Detail RKA</h4>
                                    <Form.Group controlId="adoSelect">
                                        <Form.Label>ADO</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.ADOOption.map(ado =>
                                                <option value={ado}>{ado}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="kegiatan">
                                        <Form.Label>Kegiatan</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan kegiatan" required/>
                                    </Form.Group>

                                    <Form.Group controlId="subkegiatan">
                                        <Form.Label>Subkegiatan</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Subkegiatan" required/>
                                    </Form.Group>

                                    <Form.Group controlId="rincian_subkegiatan">
                                        <Form.Label>Rincian Subkegiatan</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Rincian Subkegiatan" required/>
                                    </Form.Group>

                                    <Form.Group controlId="rincian_belanja">
                                        <Form.Label>Rincian Belanja</Form.Label>
                                        <Form.Control type="text" placeholder="Masukkan Rincian Belanja" required />
                                    </Form.Group>

                                    <Form.Group controlId="jenis_belanja">
                                        <Form.Label>Jenis Belanja</Form.Label>
                                        <Form.Control as="select" required>
                                            {this.state.JenisOption.map(jenis => <option>{jenis}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col xs={8}>
                                    <Row>
                                        <h4>Anggaran Bulanan</h4>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {bulan1.map(bulan =>
                                                <Form.Group controlId={bulan}>
                                                    <Form.Label>{bulan}</Form.Label>
                                                    <Form.Control type="number" required/>
                                                </Form.Group>
                                            )}
                                        </Col>

                                        <Col>
                                            {bulan2.map(bulan =>
                                                <Form.Group controlId={bulan}>
                                                    <Form.Label>{bulan}</Form.Label>
                                                    <Form.Control type="number" required/>
                                                </Form.Group>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>

                            <Button variant="primary" type="submit">
                                Tambah RKA
                            </Button>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default TambahRKAForm;
