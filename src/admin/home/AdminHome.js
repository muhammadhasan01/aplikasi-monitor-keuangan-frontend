import React, { Component } from "react";
import { Container } from "react-bootstrap";
import PengeluaranTerakhir from "./RiwayatPengeluaran/PengeluaranTerakhir";
import GrafikPengeluaran from "./GrafikPengeluaran/GrafikPengeluaran";

export class AdminHome extends Component {
  render() {
    return (
      <Container fluid>
        <GrafikPengeluaran />
        <PengeluaranTerakhir />
      </Container>
    );
  }
}