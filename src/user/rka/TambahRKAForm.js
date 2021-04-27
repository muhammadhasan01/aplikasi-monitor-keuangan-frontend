import React, {Component} from 'react';
import {ADODataService, RKADataService} from "../../_services";
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

    renderADOOption = () => {
        ADODataService.getDistinctADO()
            .then(response => {
                this.setState({ ADOOption: response.data });
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
        this.forceUpdate();
    }

    handleSubmit = (e) => {
        const data = {
            "year"                  : new Date().getFullYear(),
            "ADO"                   : e.target.adoSelect.value,
            "kegiatan"              : e.target.kegiatan.value,
            "subkegiatan"           : e.target.subkegiatan.value,
            "rincian_subkegiatan"   : e.target.rincian_subkegiatan.value,
            "rincian_belanja"       : e.target.rincian_belanja.value,
            "jenis_belanja"         : e.target.jenis_belanja.value,
            "satuan"                : "kegiatan",
            "volume"                : Number(4), //To Do Ilangin Implementasinya
            "rancangan": {
                "januari"   : Number(e.target.Januari.value),
                "februari"  : Number(e.target.Februari.value),
                "maret"     : Number(e.target.Maret.value),
                "april"     : Number(e.target.April.value),
                "mei"       : Number(e.target.Mei.value),
                "juni"      : Number(e.target.Juni.value),
                "juli"      : Number(e.target.Juli.value),
                "agustus"   : Number(e.target.Agustus.value),
                "september" : Number(e.target.September.value),
                "oktober"   : Number(e.target.Oktober.value),
                "november"  : Number(e.target.November.value),
                "desember"  : Number(e.target.Desember.value)
            }
        };

        console.log(data);

        RKADataService.createRKA(this.props.unit, this.props.subunit, data)
            .then(response => {
                alert(response.data);
            })
            .catch(err => {
                console.log(err);
                alert(err.message);
            });

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
                                                (ado === this.state.currentADO ? <option value={ado} selected>{ado}</option> : <option value={ado}>{ado}</option> )
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
