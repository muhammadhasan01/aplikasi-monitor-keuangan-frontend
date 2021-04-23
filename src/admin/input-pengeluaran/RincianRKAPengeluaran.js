import React, { Component } from 'react';
import ModalNotFoundRKA from "./ModalNotFoundRKA";
import { Table } from 'react-bootstrap';
import { namaBulanIndonesia } from "_helpers";

class RincianRKAPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlot: null
        }
    }

    componentDidMount() {
        const currentMonth = new Date().getMonth();
        const curTimeSlot = namaBulanIndonesia[currentMonth];
        this.setState({ timeSlot : curTimeSlot });
    }

    handleChangeTimeSlot = (e) => {
        this.setState({ timeSlot: e.target.value });
    }

    render() {
        if (!this.props || !this.props.RKA || !this.props.inputs) {
            return null;
        }
        const RKA = this.props.RKA;
        const { unit, subunit, ADO } = this.props.inputs;
        const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
        if (RKA.length === 0) {
            return <ModalNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        }
        const timeSlot = this.state.timeSlot;
        const lowCaseTimeSlot = timeSlot.toLowerCase();
        return (
            <>
                <h2 className='mt-2'>{title}</h2>
                <label htmlFor="select-month">Pilih Bulan</label>
                <select className="form-select form-select-sm" id="select-month" onChange={this.handleChangeTimeSlot}>
                    { namaBulanIndonesia.map((bulan, ID) =>
                        <option key={ID} value={bulan} selected={bulan === timeSlot}>{bulan}</option>) }
                </select>
                <Table responsive striped bordered hover style={{backgroundColor: 'lightblue'}}>
                    <thead>
                        <tr>
                        {["Rincian Belanja",
                            "Alokasi Total",
                            `Alokasi Bulan ${timeSlot}`,
                            `Penggunaan Bulan ${timeSlot}`,
                            `Sisa Anggaran Bulan ${timeSlot}`,
                            "Aksi"]
                            .map((head, idx) => {
                                return <th key={idx} scope='col'>{head}</th>
                        })}
                        </tr>
                    </thead>
                    <tbody>
                    {RKA.map((rka, idx) => {
                        return (
                            <tr key={idx}>
                            {[rka.rincian_belanja, rka.total_rancangan,
                            rka.rancangan[lowCaseTimeSlot], rka.penggunaan[lowCaseTimeSlot],
                            rka.rancangan[lowCaseTimeSlot] - rka.penggunaan[lowCaseTimeSlot]
                            ].map((data, id) => {
                                return <td key={id}>{data}</td>
                            })}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default RincianRKAPengeluaran;