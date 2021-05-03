import React, { Component } from 'react';
import { formatRupiah, formatTanggal } from "_helpers";
import { pengeluaranDataService } from "_services";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const title = "Pengeluaran Terakhir";
const columns = [{
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
    text: 'Unit'
}, {
    dataField: 'subunit',
    text: 'Subunit'
}, {
    dataField: 'rincianBelanja',
    text: "Rencana Belanja"
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
            const { RKA: { unit, sub_unit, rincian_belanja }, jumlah, createdAt: tanggal } = p;
            return { id: id, jumlah: jumlah, unit: unit, subunit: sub_unit, rincianBelanja: rincian_belanja, tanggal: tanggal }
        });
        return (
            <div className='container-fluid p-3'>
                <h2>{title}</h2>
                <BootstrapTable classes="table-white" keyField="id" data={ data } columns={ columns } pagination={ paginationFactory() } />
            </div>
        );
    }
}

export default PengeluaranTerakhir;