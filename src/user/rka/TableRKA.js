import React, {Component} from 'react';
import {ADODataService, RKADataService} from "../../_services";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";
import AlertNotFoundRKA from "../../admin/input-pengeluaran/AlertNotFoundRKA";
import {formatRupiah} from "../../_helpers";

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

    render(){
        const unit = this.props.unit;
        const subunit = this.props.subunit
        const ado = this.props.ado;
        const rka = this.props.rka;

        const title = `Rincian RKA ${ado} ${subunit} ${unit}`;

        if(rka.length == 0){
            return <AlertNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        } else{
            return(
                <>
                    <Table responsive striped bordered hover style={{backgroundColor: 'lightblue'}}>
                    <thead style={{backgroundColor:"#0054a3", color:"white"}}>
                        <th>ADO</th>
                        <th>Kegiatan</th>
                        <th>Subkegiatan</th>
                        <th>Rincian Subkegiatan</th>
                        <th>Rincian Belanja</th>
                        <th>Jenis Belanja</th>
                        <th>Januari</th>
                        <th>Februari</th>
                        <th>Maret</th>
                        <th>April</th>
                        <th>Mei</th>
                        <th>Juni</th>
                        <th>Juli</th>
                        <th>Agustus</th>
                        <th>September</th>
                        <th>Oktober</th>
                        <th>November</th>
                        <th>Desember</th>
                    </thead>
                    <tbody className="table-striped">
                        {rka.map(this.renderRKARow)}
                    </tbody>
                    </Table>
                </>

            )
        }




    }
}

export default TableRKA;
