import React, { Component } from 'react';
import ModalNotFoundRKA from "./ModalNotFoundRKA";
import { Table, Button } from 'react-bootstrap';
import { namaBulanIndonesia, formatRupiah } from "_helpers";
import ModalInputPengeluaran from "./ModalInputPengeluaran";

class RincianRKAPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlot: 0,
            RKAs: null,
            show: false,
            idxRKA: null,
        }
    }

    componentDidMount() {
        const currentMonth = new Date().getMonth();
        const curTimeSlot = namaBulanIndonesia[currentMonth];
        this.setState({ timeSlot : curTimeSlot });
    }

    static getDerivedStateFromProps(nextProps) {
        return { RKAs: nextProps.RKAs };
    }

    handleChangeTimeSlot = (e) => {
        this.setState({ timeSlot: e.target.value });
    }

    handleAction = (e) => {
        e.preventDefault();
        this.setState({ idxRKA: e.target.value, show: true })
    }

    handleCloseModal = () => {
        this.setState({ show: false });
    }

    render() {
        if (!this.props || !this.props.RKAs || !this.props.inputs) {
            return null;
        }
        const RKAs = this.state.RKAs;
        const { unit, subunit, ADO } = this.props.inputs;
        const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
        if (RKAs.length === 0) {
            return <ModalNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        }
        const timeSlot = this.state.timeSlot;
        const lowCaseTimeSlot = timeSlot.toLowerCase();
        const headerValues = ["Rincian Belanja", "Alokasi Total", `Alokasi Bulan ${timeSlot}`, `Penggunaan Bulan ${timeSlot}`,
                             `Sisa Anggaran Bulan ${timeSlot}`, "Aksi"];
        return (
            <>
                <h2 className='mt-2'>{title}</h2>
                <label htmlFor="select-month">Pilih Bulan</label>
                <select className="form-select form-select-sm" id="select-month"
                        defaultValue={timeSlot} onChange={this.handleChangeTimeSlot}>
                    { namaBulanIndonesia.map((bulan, ID) =>
                        <option key={ID} value={bulan}>{bulan}</option>) }
                </select>
                <Table responsive striped bordered hover style={{backgroundColor: 'lightblue'}}>
                    <thead>
                        <tr>
                        {headerValues.map((head, idx) => {
                                return <th key={idx} className='center' scope='col'>{head}</th>
                        })}
                        </tr>
                    </thead>
                    <tbody>
                    {RKAs.map((rka, idx) => {
                        const rowValues = [rka.rincian_belanja, rka.total_rancangan,
                            rka.rancangan[lowCaseTimeSlot], rka.penggunaan[lowCaseTimeSlot],
                            rka.rancangan[lowCaseTimeSlot] - rka.penggunaan[lowCaseTimeSlot]
                        ];
                        return (
                            <tr key={idx}>
                            {rowValues.map((data, id) => {
                                return <td key={id}>{formatRupiah(data)}</td>
                            })}
                            <td key={rowValues.length}>
                                <Button onClick={this.handleAction} value={idx}>Input Pengeluaran</Button>
                            </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                {this.state.show ? <ModalInputPengeluaran RKA={RKAs[this.state.idxRKA]}
                                                          bulan={timeSlot}
                                                          handleClose={this.handleCloseModal}
                /> : null}
            </>
        )
    }
}

export default RincianRKAPengeluaran;