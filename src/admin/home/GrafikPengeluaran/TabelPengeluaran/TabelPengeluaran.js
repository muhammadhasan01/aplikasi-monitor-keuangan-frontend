import React, { Component } from "react";
import { RKADataService } from "_services";
import { Loading } from "_components";
import { dataPengeluaranTable } from "./data-table-pengeluaran";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container } from "react-bootstrap";

export class TabelPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RKAs: null,
    };
  }

  componentDidMount() {
    this.retrieveRKA();
  }

  retrieveRKA = () => {
    RKADataService.getAllRKA()
      .then(({ data }) => {
        this.setState({ RKAs: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { RKAs } = this.state;
    if (!RKAs) {
      return <Loading info={"tabel pengeluaran"} />;
    }
    const columns = dataPengeluaranTable.getColumns();
    const data = dataPengeluaranTable.getData(RKAs);
    return (
      <Container fluid style={{ width: "90%" }} className="mb-5">
        <h3 className="mt-4">Tabel Pengeluaran </h3>
        <BootstrapTable
          classes="table-feature"
          striped
          bootstrap4
          keyField="id"
          responsive
          wrapperClasses="table-responsive"
          data={data}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
          noDataIndication={"Belum ada data pengeluaran"}
        />
      </Container>
    );
  }
}
