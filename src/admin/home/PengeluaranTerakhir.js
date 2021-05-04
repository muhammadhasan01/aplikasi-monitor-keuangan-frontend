import React, { Component } from 'react';
import { formatRupiah, formatTanggal } from "_helpers";
import { pengeluaranDataService } from "_services";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

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
}];

class PengeluaranTerakhir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pengeluaran: null
        };
    }

    componentDidMount() {
        this.retrievePengeluaran();
    }

    retrievePengeluaran = () => {
        pengeluaranDataService.getAllPengeluaran()
            .then(response => {
                console.log(response);
                this.setState({ pengeluaran: response.data });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { pengeluaran } = this.state;
        if (!pengeluaran || pengeluaran.length === 0) {
            return <h2>Belum ada pengeluaran terakhir</h2>
        }
        const data = pengeluaran.map((p, id) => {
            console.log(p)
            const { RKA: { unit, sub_unit, rincian_belanja }, jumlah, createdAt: tanggal } = p;
            return { id, jumlah, unit, sub_unit, rincian_belanja, tanggal }
        });
        console.log(data)
        return (
            <div className="p-5 mb-lg-5">
                <h2>{title}</h2>
                <BootstrapTable
                                striped
                                bootstrap4
                                keyField="id"
                                data={ data }
                                columns={ columns }
                                filter={ filterFactory() }
                                pagination={ paginationFactory() } />
            </div>
        );
    }
}

export default PengeluaranTerakhir;