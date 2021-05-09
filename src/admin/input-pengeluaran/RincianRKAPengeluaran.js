import React, { Component } from 'react';
import AlertNotFoundRKA from "./AlertNotFoundRKA";
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { namaBulanIndonesia } from "_helpers";
import ModalInputPengeluaran from "./ModalInputPengeluaran";
import { tableData } from './rka-pengeluaran-table';
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { MdInput } from 'react-icons/md';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

class RincianRKAPengeluaran extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlot: 0,
            RKAs: null,
            show: false,
            showMessage: false,
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

    handleChangeTimeSlot = (e) => this.setState({ timeSlot: e.target.value })
    handleAction = ({ target: { value }}) => this.setState({ idxRKA: value, show: true })
    handleCloseModal = () => this.setState({ show: false, showMessage: false })

    handleUpdateRKAs = (RKA) => {
        const { RKAs, idxRKA } = this.state;
        RKAs[idxRKA] = RKA;
        this.setState({ RKAs: RKAs, showMessage: true });
    }

    render() {
        if (!this.props || !this.props.RKAs || !this.props.inputs) {
            return null;
        }
        const { RKAs, show, showMessage, idxRKA } = this.state;
        const { unit, subunit, ADO } = this.props.inputs;
        const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
        if (RKAs.length === 0) {
            return <AlertNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        }
        const timeSlot = this.state.timeSlot;
        const lowCaseTimeSlot = timeSlot.toLowerCase();
        const columns = tableData.getColumns(timeSlot);
        const data = RKAs.map((rka, idx) => {
            return {
                "Rincian Belanja": rka.rincian_belanja,
                "Alokasi Total": rka.total_rancangan,
                "Alokasi Bulan": rka.rancangan[lowCaseTimeSlot],
                "Penggunaan Bulan": rka.penggunaan[lowCaseTimeSlot],
                "Sisa Anggaran Bulan": rka.rancangan[lowCaseTimeSlot] - rka.penggunaan[lowCaseTimeSlot],
                "Aksi":
                    <OverlayTrigger key="bottom"  placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-bottom">
                                Input Pengeluaran
                            </Tooltip>
                        }>
                        <Button onClick={this.handleAction} value={idx}><MdInput /></Button>
                    </OverlayTrigger>
            };
        })
        return (
            <div>
                <h2 className="mt-3">{title}</h2>
                <label htmlFor="select-month">Pilih Bulan</label>
                <select className="form-select form-select-sm" id="select-month"
                        defaultValue={timeSlot} onChange={this.handleChangeTimeSlot}>
                    { namaBulanIndonesia.map((bulan, ID) =>
                        <option key={ID} value={bulan}>{bulan}</option>) }
                </select>
                <ToolkitProvider
                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    keyField="id"
                                    data={ data }
                                    columns={ columns }
                                    classes='table-feature'
                                    striped
                                    bootstrap4
                                    filter={filterFactory()}
                                    pagination={paginationFactory()}
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
                <ModalInputPengeluaran  RKA={RKAs[idxRKA]}
                                        bulan={timeSlot}
                                        show={show}
                                        showMessage={showMessage}
                                        handleClose={this.handleCloseModal}
                                        handleUpdateRKAs={this.handleUpdateRKAs}
                />
            </div>
        )
    }
}

export default RincianRKAPengeluaran;