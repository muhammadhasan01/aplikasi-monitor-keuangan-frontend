import React, { Component } from 'react';
import AlertNotFoundRKA from "./AlertNotFoundRKA";
import { Button, Tooltip, OverlayTrigger, Form, Col } from 'react-bootstrap';
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
            year: null,
            RKAs: null,
            show: false,
            showMessage: false,
            idxRKA: null,
        }
    }

    componentDidMount() {
        const currentMonth = new Date().getMonth();
        const curTimeSlot = namaBulanIndonesia[currentMonth];
        this.setState({ timeSlot : curTimeSlot, year : new Date().getFullYear() });
    }

    static getDerivedStateFromProps(nextProps) {
        return { RKAs: nextProps.RKAs };
    }

    handleChangeYear = ({ target: { value }}) => this.setState({ year: Number(value) })
    handleChangeTimeSlot = ({ target: { value }}) => this.setState({ timeSlot: value })
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
        const { unit, subunit, ADO } = this.props.inputs;
        const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
        const { show, showMessage, idxRKA, year } = this.state;
        let { RKAs } = this.state;
        if (RKAs.length === 0) {
            return <AlertNotFoundRKA heading={`Data Belum Ada`} body={`Data mengenai ${title} belum ada`}/>
        }
        RKAs = RKAs.filter((RKA) => (RKA.year === year));
        const timeSlot = this.state.timeSlot;
        const lowCaseTimeSlot = timeSlot.toLowerCase();
        const columns = tableData.getColumns(timeSlot);
        const curYear = new Date().getFullYear();
        const years = [];
        for (let i = 0; i < 10; i++) years.push(curYear - i);
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
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="select-year-form">
                            <Form.Label>Pilih Tahun</Form.Label>
                            <Form.Control as="select" onChange={this.handleChangeYear}>
                                {years.map((year, id) => {
                                    return <option key={id} value={year}>{year}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="select-month-form">
                            <Form.Label>Pilih Bulan</Form.Label>
                            <Form.Control as="select" onChange={this.handleChangeTimeSlot} defaultValue={timeSlot}>
                                { namaBulanIndonesia.map((bulan, ID) =>
                                    <option key={ID} value={bulan}>{bulan}</option>) }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <ToolkitProvider search>
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
                                    noDataIndication={() => `Belum ada data pada tahun ${year}`}
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