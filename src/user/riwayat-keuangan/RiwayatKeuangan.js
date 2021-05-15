import React, { Component } from "react";
import { Loading } from "_components";
import { pengeluaranDataService, authenticationService } from "_services";
import { dataRiwayatKeuanganTable } from "./data-riwayat-keuangan-table";
import { Container } from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";

export class RiwayatKeuangan extends Component {
  constructor(props) {
    super(props);
    this.state = { pengeluaran: null, unit: null };
  }

  componentDidMount() {
    this.retrievePengeluaran();
    const { unit } = authenticationService.UserInformation;
    this.setState({ unit });
  }

  retrievePengeluaran = () => {
    pengeluaranDataService
      .getAllPengeluaran()
      .then((response) => {
        this.setState({ pengeluaran: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { pengeluaran, unit } = this.state;
    if (!pengeluaran) {
      return <Loading info={"riwayat keuangan"} />;
    }
    const data = dataRiwayatKeuanganTable.getData(pengeluaran);
    const columns = dataRiwayatKeuanganTable.getColumns();
    return (
      <Container fluid style={{ width: "90%" }}>
        <h3 className="mt-4">Riwayat Keuangan {unit} </h3>
        <BootstrapTable
          classes="table-feature"
          striped
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
          noDataIndication={"Belum ada data riwayat keuangan"}
        />
      </Container>
    );
  }
}
