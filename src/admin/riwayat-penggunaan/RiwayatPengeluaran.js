import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { pengeluaranDataService } from "_services";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ModalAksiPengeluaran from "./ModalAksiPengeluaran";
import ButtonAksiPengeluaran from "./ButtonAksiPengeluaran";
import { Reply, Trash } from "react-bootstrap-icons";
import { dataPengeluaranTable } from "./data-pengeluaran-table";

export class RiwayatPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pengeluaran: null,
      showUndo: false,
      showRemove: false,
      showMessage: false,
      IDPengeluaran: null,
    };
  }

  componentDidMount() {
    this.retrievePengeluaran();
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

  undoPengeluaran = () => {
    const { IDPengeluaran, pengeluaran } = this.state;
    pengeluaranDataService
      .undoPengeluaran(IDPengeluaran)
      .then(() => {
        let curId = -1;
        pengeluaran.forEach((p, id) => {
          if (p._id === IDPengeluaran) {
            curId = id;
          }
        });
        pengeluaran.splice(curId, 1);
        this.setState({ pengeluaran: pengeluaran });
        this.setState({ showMessage: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removePengeluaran = () => {
    const { IDPengeluaran, pengeluaran } = this.state;
    pengeluaranDataService
      .removePengeluaran(IDPengeluaran)
      .then(() => {
        let curId = -1;
        pengeluaran.forEach((p, id) => {
          if (p._id === IDPengeluaran) {
            curId = id;
          }
        });
        pengeluaran.splice(curId, 1);
        this.setState({ pengeluaran: pengeluaran });
        this.setState({ showMessage: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleOpenUndo = (value) =>
    this.setState({ showUndo: true, IDPengeluaran: value, showMessage: false });
  handleCloseUndo = () => this.setState({ showUndo: false });
  handleOpenRemove = (value) =>
    this.setState({
      showRemove: true,
      IDPengeluaran: value,
      showMessage: false,
    });
  handleCloseRemove = () => this.setState({ showRemove: false });

  render() {
    const { showMessage, pengeluaran, showUndo, showRemove } = this.state;
    if (!pengeluaran) {
      return (
        <Container className="row d-flex justify-content-center">
          <h3 className="mx-5 pt-4">Loading data pengeluaran...</h3>
          <div className="loader" />
        </Container>
      );
    }
    if (pengeluaran.length === 0) {
      return (
        <h2 className="mx-5 pt-4">Belum ada riwayat pengeluaran terakhir</h2>
      );
    }
    const columns = dataPengeluaranTable.getColumns();
    const data = pengeluaran.map((p) => {
      const {
        _id,
        RKA: { unit, sub_unit, rincian_belanja },
        jumlah,
        createdAt: tanggal,
      } = p;
      const undoButton = (
        <ButtonAksiPengeluaran
          icon={<Reply />}
          value={_id}
          action="Undo"
          variant="warning"
          handleAction={this.handleOpenUndo}
        />
      );
      const removeButton = (
        <ButtonAksiPengeluaran
          icon={<Trash />}
          value={_id}
          action="Delete"
          variant="danger"
          handleAction={this.handleOpenRemove}
        />
      );
      const action = (
        <div>
          {undoButton}
          {removeButton}
        </div>
      );
      return { _id, jumlah, unit, sub_unit, rincian_belanja, tanggal, action };
    });
    return (
      <Container fluid className="mt-4 mb-5" style={{ width: "90%" }}>
        <h2>Riwayat Pengeluaran</h2>
        <BootstrapTable
          classes="table-feature"
          striped
          bootstrap4
          keyField="id"
          data={data}
          columns={columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
        />
        <ModalAksiPengeluaran
          action="Undo"
          show={showUndo}
          showMessage={showMessage}
          handleConfirmation={this.undoPengeluaran}
          handleClose={this.handleCloseUndo}
        />
        <ModalAksiPengeluaran
          action="Delete"
          show={showRemove}
          showMessage={showMessage}
          handleConfirmation={this.removePengeluaran}
          handleClose={this.handleCloseRemove}
        />
      </Container>
    );
  }
}

export default RiwayatPengeluaran;
