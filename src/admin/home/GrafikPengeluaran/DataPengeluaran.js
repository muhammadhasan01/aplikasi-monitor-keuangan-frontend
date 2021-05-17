import React, { Component } from "react";
import { Container } from "react-bootstrap";
import LineChartPengeluaran from "./LineChartPengeluaran/LineChartPengeluaran";
import { TabelPengeluaran } from "./TabelPengeluaran/TabelPengeluaran";

class DataPengeluaran extends Component {
  render() {
    return (
      <Container fluid>
        <LineChartPengeluaran />
        <TabelPengeluaran />
      </Container>
    );
  }
}

export default DataPengeluaran;
