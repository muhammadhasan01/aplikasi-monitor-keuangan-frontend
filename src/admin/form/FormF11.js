import React, { Component } from "react";
import Pdf from "react-to-pdf";
import { Table } from "react-bootstrap";

const options = {
  orientation: "portrait",
  unit: "in",
};

export class FormF11 extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    return (
      <React.Fragment>
        <Pdf
          targetRef={this.ref}
          filename="form-f11.pdf"
          options={options}
          // x={0.5}
          // y={0.5}
          // scale={0.8}
        >
          {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
        </Pdf>
        <div ref={this.ref}>
          <Table striped bordered responsive style={{ width: "50%" }}>
            <tbody>
              <tr>
                <td>
                  <b>PROGRAM/KEGIATAN/SUB KEGIATAN</b>
                </td>
                <td>
                  Kegiatan Belajar Mengajar/Mengajar Informatika ke Masyarakat
                </td>
              </tr>
              <tr>
                <td>
                  <b>NO. AKUN</b>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <b>URAIAN BELANJA</b>
                </td>
                <td>Alat Tulis</td>
              </tr>
              <tr>
                <td>
                  <b>JENIS BELANJA</b>
                </td>
                <td>NGasal</td>
              </tr>
              <tr>
                <td>
                  <b>JUMLAH</b>
                </td>
                <td>1290493</td>
              </tr>
              <tr>
                <td>
                  <b>KETERANGAN</b>
                </td>
                <td>BULAN NAON</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}
