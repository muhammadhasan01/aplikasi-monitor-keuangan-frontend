import React, { Component } from "react";
import Pdf from "react-to-pdf";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";
import { pengeluaranDataService } from "_services";
import { formatRupiah, namaBulanIndonesia } from "_helpers";
import { Loading } from "_components";

const options = {
  orientation: "landscape",
  unit: "in",
  format: [5.75, 14.2],
};

export class FormF11 extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { pengeluaran: null };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    pengeluaranDataService
      .getPengeluaran(id)
      .then(({ data }) => {
        this.setState({ pengeluaran: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { pengeluaran } = this.state;
    if (!pengeluaran) {
      return <Loading info={"Loading Form F11"} />;
    }
    const { jumlah, RKA, bulan } = pengeluaran;
    const { kegiatan, subkegiatan, rincian_belanja, jenis_belanja } = RKA;
    const date = new Date();
    const curMonth = date.getMonth();
    const curYear = date.getFullYear();
    return (
      <Container fluid className="ml-5 mt-3 mb-5">
        <h2 className="mb-3">Tampilan Form F11</h2>
        <Container fluid style={{ width: "80%" }}>
          <Pdf targetRef={this.ref} filename="form-f11.pdf" options={options}>
            {({ toPdf }) => (
              <Button
                onClick={toPdf}
                variant="success"
                className="my-3 float-right d-flex justify-content-center align-items-center"
              >
                Download PDF <FaFilePdf className="ml-2" />
              </Button>
            )}
          </Pdf>
        </Container>
        <div
          ref={this.ref}
          className="justify-content-center align-items-center"
          style={{
            fontFamily: "Arial",
            width: "1350px",
            backgroundColor: "white",
            borderRadius: "20px",
            paddingBottom: "5px",
            boxShadow:
              "0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n" +
              "  0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n" +
              "  0 12.5px 10px rgba(0, 0, 0, 0.06),\n" +
              "  0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n" +
              "  0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n" +
              "  0 100px 80px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Row>
            <Col>
              <h6 className="mt-5 mx-4">
                <b>PERINCIAN REALISASI BUKTI KAS KELUAR (BKK)</b>
              </h6>
              <h6 className="mx-4">
                <b>KATEGORI RKA MURNI (SISPRAN1)</b>
              </h6>
              <h6 className="mx-4">
                <b>UNIT KERJA: STEI</b>
              </h6>
              <h6 className="mx-4" style={{ textTransform: "uppercase" }}>
                <b>
                  BULAN: <u>{namaBulanIndonesia[curMonth]}</u> {curYear}
                </b>
              </h6>
            </Col>
            <Col xs={6}>
              <h3
                className="mt-5"
                style={{ color: "rgb(47,102,145)", fontFamily: "Arial" }}
              >
                DM LAMPIRAN BKK (F1.1)
              </h3>
            </Col>
          </Row>
          <Table
            striped
            bordered
            responsive
            className="text-center mt-2 ml-4"
            style={{ height: "125px", width: "1300px", fontFamily: "Arial" }}
          >
            <thead>
              <tr>
                <th>NO</th>
                <th>PROGRAM/KEGIATAN/SUB KEGIATAN</th>
                <th>NO. AKUN</th>
                <th>URAIAN BELANJA</th>
                <th>JENIS BELANJA</th>
                <th>JUMLAH</th>
                <th>KETERANGAN</th>
              </tr>
            </thead>
            <tbody>
              <td>1</td>
              <td>
                {kegiatan}/{subkegiatan}
              </td>
              <td> - </td>
              <td>{rincian_belanja}</td>
              <td>{jenis_belanja}</td>
              <td>{formatRupiah(jumlah)}</td>
              <td style={{ textTransform: "capitalize" }}>Bulan {bulan}</td>
            </tbody>
          </Table>
          <div className="text-right mr-5">
            <div>
              Bandung, ................. 2021 <br />
              Kepala Sub Bagian Keuangan <br />
            </div>
            <div className="my-5" />
            <div style={{ marginTop: "100px", marginBottom: "20px" }}>
              Indrayadi, SE <br />
              Nopeg:109000027
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
