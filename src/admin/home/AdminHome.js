import React, { Component } from "react";
import { Container } from "react-bootstrap";
import DataPengeluaran from "./GrafikPengeluaran/DataPengeluaran";

export class AdminHome extends Component {
  render() {
    return (
      <Container fluid>
        <DataPengeluaran />
      </Container>
    );
  }
}
