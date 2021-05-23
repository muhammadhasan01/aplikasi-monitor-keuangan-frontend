import React, { Component } from "react";
import Pdf from "react-to-pdf";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";
import { pengeluaranDataService } from "_services";
import {
  formatRupiah,
  getSisaAnggaranFromBulan,
  namaBulanIndonesia,
} from "_helpers";
import { Loading } from "_components";

const options = {
  orientation: "portrait",
  unit: "in",
  format: [21.75, 14.2],
};

export class FormPPT extends Component {
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
      return <Loading info={"Loading Form PPT"} />;
    }
    const { jumlah, RKA, bulan } = pengeluaran;
    const { kegiatan, subkegiatan, rincian_belanja, jenis_belanja, unit } = RKA;
    const date = new Date();
    const curMonth = date.getMonth();
    const curYear = date.getFullYear();
    const curDay = date.getDate();
    const sisaAnggaran = getSisaAnggaranFromBulan(RKA, bulan);
    return (
      <Container fluid className="ml-5 mt-3 mb-5">
        <h2 className="mb-3">Tampilan Form PPT</h2>
        <Container fluid style={{ width: "80%" }}>
          <Pdf targetRef={this.ref} filename="form-ppt.pdf" options={options}>
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
              <h5 className="mt-5 mx-4">
                <b>Sekolah Teknik Elektro dan Informatika</b>
              </h5>
              <h6 className="mx-4">
                <b>PERMOHONAN DAN PEMBAYARAN</b>
              </h6>
              <h6 className="mx-4">
                <b>TRANSAKSI</b> FRM/stei/FIN/{curMonth}/{curDay}-{curYear}
              </h6>
              <h6 className="mx-4">
                <b>Pembebanan RKA:</b> {unit}
              </h6>
            </Col>
          </Row>
          <Table
            striped
            bordered
            responsive
            className="text-center mt-2 ml-4 mb-4"
            style={{ height: "125px", width: "1300px", fontFamily: "Arial" }}
          >
            <tr>
              <td className="text-left" colSpan={5}>
                Harap bayar kepada: PT. Sinar Mulia Perkasa <br />
                Nama Bank: Bank Mandiri <br />
                No. Rek: 1030008855146 a/n: PT. Sinar Mulia Perkasa <br />
                Email: - <br />
              </td>
              <td className="text-left" colSpan={3}>
                No: - <br />
                Tgl: {curDay}/{curMonth}/{curYear}
                <div className="d-flex justify-content-center align-items-center">
                  <label className="mr-3">
                    Biasa
                    <input type="radio" id="f-option" name="selector" />
                  </label>
                  <label>
                    Uang Muka/Advance
                    <input type="radio" id="s-option" name="selector" />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>UNIT: {unit}</td>
              <td colSpan={2}>Program: -</td>
              <td colSpan={4}>Jenis Belanja: {jenis_belanja}</td>
            </tr>
            <tr>
              <td colSpan={8}>
                <Table>
                  <tr>
                    <th>No</th>
                    <th>Uraian Belanja</th>
                    <th>Bulan</th>
                    <th>Tahun</th>
                    <th>Kode Akun</th>
                    <th>Qty</th>
                    <th>Harga Satuan </th>
                    <th>Jumlah </th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>{rincian_belanja}</td>
                    <td>{namaBulanIndonesia[curMonth]}</td>
                    <td>{curYear}</td>
                    <td>-</td>
                    <td>1</td>
                    <td>{formatRupiah(jumlah)}</td>
                    <td>{formatRupiah(jumlah)}</td>
                  </tr>
                  <tr>
                    <td colSpan={7}>Jumlah Keseluruhan </td>
                    <td>{formatRupiah(jumlah)}</td>
                  </tr>
                </Table>
              </td>
            </tr>
            <tr className="text-left">
              <td>1</td>
              <td>
                Pemohon: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td>2</td>
              <td>
                Disetujui <br />
                Kaprodi/Kasubag/Ketua KK: <br /> <br /> <br /> <br /> <br />{" "}
                Tgl.
              </td>
              <td>3</td>
              <td>
                Verifikator <br />
                Kasubag Keuangan <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td>4</td>
              <td>
                Disetujui/Diperiksa <br />
                Kabag Administrasi: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
            </tr>
            <tr className="text-left">
              <td>5</td>
              <td>
                Disetujui <br />
                Wakil Dekan Sumber Daya: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td colSpan={6} />
            </tr>
            <tr>
              <td colSpan={8}>SUMBER DANA</td>
            </tr>
            <tr>
              <td colSpan={4}>URAIAN</td>
              <td>PIC</td>
              <td>Sisa Awal Anggaran </td>
              <td>Pengeluaran </td>
              <td>Sisa Akhir Anggaran </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="d-flex justify-content-center align-items-center">
                  <label className="mr-3">
                    Sesuai RKA
                    <input type="radio" id="f-option" name="selector" />
                  </label>
                  <label>
                    Tidak Sesuai RKA
                    <input type="radio" id="s-option" name="selector" />
                  </label>
                </div>
                <br />
                <div className="text-left">Alasan: </div> <br /> <br />
              </td>
              <td colSpan={2} className="text-left">
                <ol>
                  <li>
                    Dana Masyarakat <b>(DM)</b>
                  </li>
                  <li>
                    Kegiatan: <b>{kegiatan}</b>
                  </li>
                  <li>
                    Subkegiatan: <b>{subkegiatan}</b>
                  </li>
                  <li>
                    Rincian Belanja: <b>{rincian_belanja}</b>
                  </li>
                </ol>
              </td>
              <td />
              <td>{formatRupiah(jumlah + sisaAnggaran)}</td>
              <td>{formatRupiah(jumlah)}</td>
              <td>{formatRupiah(sisaAnggaran)}</td>
            </tr>
          </Table>
          <h3 style={{ fontFamily: "Arial", marginLeft: "30px" }}>
            BUKTI KAS / BANK KELUAR
          </h3>
          <Table
            striped
            bordered
            className="mt-1 ml-4 mb-4"
            style={{ height: "125px", width: "1300px", fontFamily: "Arial" }}
          >
            <tr>
              <td colSpan={8}>No. Bukti</td>
            </tr>
            <tr>
              <td colSpan={8}>
                Pengeluaran dari:
                <div className="d-flex justify-content-center align-items-center">
                  <label className="mr-3">
                    Petty Cash
                    <input type="radio" id="f-option" name="selector" />
                  </label>
                  <label>
                    Bank, No. Cek:
                    <input type="radio" id="s-option" name="selector" />
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td>No</td>
              <td colSpan={3}>Uraian</td>
              <td>Kode Akun</td>
              <td>Ref</td>
              <td colSpan={2}>Jumlah </td>
            </tr>
            <tr>
              <td>1</td>
              <td colSpan={3}>{rincian_belanja}</td>
              <td>-</td>
              <td>-</td>
              <td colSpan={2}>{formatRupiah(jumlah)}</td>
            </tr>
            <tr>
              <td colSpan={7}>Jumlah Dibayar</td>
              <td colSpan={1}>{formatRupiah(jumlah)}</td>
            </tr>
            <tr>
              <td colSpan={8}>
                <div className="d-flex justify-content-center align-items-center">
                  <label className="mr-3">
                    Tunai
                    <input type="radio" id="f-option" name="selector" />
                  </label>
                  <label>
                    TR
                    <input type="radio" id="s-option" name="selector" />
                  </label>
                  <label>
                    Lain-lain
                    <input type="radio" id="s-option" name="selector" />
                  </label>
                </div>
                <div className="text-left">
                  Catatan: <br /> <br /> <br />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                Dibukukan: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td colSpan={2}>
                Diserahkan (Bendahara): <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td colSpan={1}>
                Diperiksa: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
              <td colSpan={1}>
                Penerima: <br /> <br /> <br /> <br /> <br /> Tgl.
              </td>
            </tr>
          </Table>
        </div>
      </Container>
    );
  }
}
