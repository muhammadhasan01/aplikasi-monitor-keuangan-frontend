import React, { Component } from 'react';
import { formatRupiah, formatTanggal } from "_helpers";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import AlertNotFoundRKA from "../../admin/input-pengeluaran/AlertNotFoundRKA";
import {Button, ButtonGroup, Form, Table} from "react-bootstrap";

var columns = [
    {
        dataField: 'ADO',
        text: 'ADO',
        sort: true
    }, {
        dataField: 'kegiatan',
        text: 'Kegiatan',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'subkegiatan',
        text: 'Subkegiatan',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'rincian_subkegiatan',
        text: 'Rincian Subkegiatan',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'rincian_belanja',
        text: "Rencana Belanja",
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'jenis_belanja',
        text: "Jenis Belanja",
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'januari',
        text: "Januari",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'februari',
        text: "Februari",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'maret',
        text: "Maret",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'april',
        text: "April",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'mei',
        text: "Mei",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'juni',
        text: "Juni",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'juli',
        text: "Juli",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'agustus',
        text: "Agustus",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'september',
        text: "September",
        sort: true,
        formatter: formatRupiah,
        hidden:false
    }, {
        dataField: 'oktober',
        text: "Oktober",
        sort: true,
        formatter: formatRupiah,
        hidden:true
    }, {
        dataField: 'november',
        text: "November",
        sort: true,
        formatter: formatRupiah,
        hidden:true
    }, {
        dataField: 'desember',
        text: "Desember",
        sort: true,
        formatter: formatRupiah,
        hidden:true
    }];

class TableRKA extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.ado);
        console.log(this.props.rka);
    }

    renderRKARow = (rka, index) => {

        var data = Object.values(rka.rancangan).filter(elmt => typeof elmt !== "string");

        return(
            <tr key={index}>
                <td>{rka.ADO}</td>
                <td>{rka.kegiatan}</td>
                <td>{rka.subkegiatan}</td>
                <td>{rka.rincian_subkegiatan}</td>
                <td>{rka.rincian_belanja}</td>
                <td>{rka.jenis_belanja}</td>
                {data.map(bulan => <td>{formatRupiah(bulan)}</td>)}
            </tr>
        )
    }

    clickButton = () => {
        console.log("Button Clicked")
        console.log(columns[9].hidden)
        columns[9].hidden = !columns[9].hidden;
        this.forceUpdate();
    }

    render(){
        const unit = this.props.unit;
        const subunit = this.props.subunit;
        const ado = this.props.ado;
        const rka = this.props.rka;
        const title = `Rincian RKA ${ado} ${subunit} ${unit}`;

        const data = rka.map((elmt, id) => {
            console.log(elmt)
            const {ADO, kegiatan, subkegiatan, rincian_subkegiatan, rincian_belanja, jenis_belanja,
                penggunaan: {januari, februari, maret, april, mei, juni, juli, agustus,september,oktober, november, desember }} = elmt;
            return {id, ADO, kegiatan, subkegiatan, rincian_subkegiatan, rincian_belanja, jenis_belanja, januari, februari, maret, april, mei, juni, juli, agustus, september, oktober, november, desember}
        });

        console.log(data);



        if(rka.length == 0){
            return <AlertNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        } else{
            return(
                <>
                    <Button onClick={this.clickButton}>Click Button</Button>
                    <BootstrapTable
                        striped
                        bootstrap4
                        keyField="id"
                        data={ data }
                        columns={ columns }
                        filter={ filterFactory() }
                        pagination={ paginationFactory() }
                        rowClasses="table-striped"
                        />
                </>

            )
        }
    }
}
export default TableRKA;
