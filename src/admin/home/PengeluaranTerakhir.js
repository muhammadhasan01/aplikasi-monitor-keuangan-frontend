import React, { Component } from 'react';
import { formatRupiah, formatTanggal } from "_helpers";
import { pengeluaranDataService } from "_services";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ModalAksiPengeluaran from "./ModalAksiPengeluaran";
import ButtonAksiPengeluaran from "./ButtonAksiPengeluaran";
import { Reply, Trash } from 'react-bootstrap-icons';

const title = "Pengeluaran Terakhir";
const columns = [
    {
    dataField: 'tanggal',
    text: 'Tanggal',
    sort: true,
    formatter: formatTanggal
}, {
    dataField: 'jumlah',
    text: 'Jumlah',
    sort: true,
    formatter: formatRupiah
}, {
    dataField: 'unit',
    text: 'Unit',
    filter: textFilter()
}, {
    dataField: 'sub_unit',
    text: 'Subunit',
    filter: textFilter()
}, {
    dataField: 'rincian_belanja',
    text: "Rencana Belanja",
    filter: textFilter()
}, {
    dataField: 'action',
    text: "Aksi"
}];

class PengeluaranTerakhir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pengeluaran: null,
            showUndo: false,
            showRemove: false,
            showMessage: false,
            IDPengeluaran: null
        };
    }

    componentDidMount() {
        this.retrievePengeluaran();
    }

    retrievePengeluaran = () => {
        pengeluaranDataService.getAllPengeluaran()
            .then(response => {
                this.setState({ pengeluaran: response.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    undoPengeluaran = () => {
        const { IDPengeluaran } = this.state;
        pengeluaranDataService.undoPengeluaran(IDPengeluaran)
            .then(() => {
                this.retrievePengeluaran();
                this.setState({ showMessage: true });
            })
            .catch(err => {
                console.log(err);
            })
    }

    removePengeluaran = () => {
        const { IDPengeluaran } = this.state;
        pengeluaranDataService.removePengeluaran(IDPengeluaran)
            .then(() => {
                this.retrievePengeluaran();
                this.setState({ showMessage: true });
            }).catch(err => {
                console.log(err);
        })
    }

    handleOpenUndo = (value) => this.setState({ showUndo: true, IDPengeluaran: value, showMessage: false })
    handleCloseUndo = () => this.setState({ showUndo: false })
    handleOpenRemove = (value) => this.setState({ showRemove: true, IDPengeluaran: value, showMessage: false })
    handleCloseRemove = () => this.setState({ showRemove: false })

    render() {
        const { showMessage, pengeluaran, showUndo, showRemove } = this.state;
        if (!pengeluaran) {
            return <h3>Loading...</h3>
        }
        if (pengeluaran.length === 0) {
            return <h2 className='mx-5 pt-4'>Belum ada pengeluaran terakhir</h2>
        }
        const data = pengeluaran.map((p) => {
            const { _id, RKA: { unit, sub_unit, rincian_belanja }, jumlah, createdAt: tanggal } = p;
            const undoButton = <ButtonAksiPengeluaran icon={<Reply />}
                                                      value={_id}
                                                      action="Undo"
                                                      variant="warning"
                                                      handleAction={this.handleOpenUndo} />
            const removeButton = <ButtonAksiPengeluaran icon={<Trash />}
                                                        value={_id}
                                                        action="Delete"
                                                        variant="danger"
                                                        handleAction={this.handleOpenRemove}
                                    />
            const action = <div>{undoButton}{removeButton}</div>
            return { _id, jumlah, unit, sub_unit, rincian_belanja, tanggal, action }
        });
        return (
            <div className="p-5 mb-lg-5">
                <h2>{title}</h2>
                <BootstrapTable
                                classes='table-feature'
                                striped
                                bootstrap4
                                keyField="id"
                                data={ data }
                                columns={ columns }
                                filter={ filterFactory() }
                                pagination={ paginationFactory() } />
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
            </div>
        );
    }
}

export default PengeluaranTerakhir;