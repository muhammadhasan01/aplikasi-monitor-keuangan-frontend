import React, { Component } from "react";
import AlertNotFoundRKA from "./AlertNotFoundRKA";
import { Button, Tooltip, OverlayTrigger, Form, Col } from "react-bootstrap";
import { namaBulanIndonesia } from "_helpers";
import ModalInputPengeluaran from "./ModalInputPengeluaran";
import { tableData } from "./rka-pengeluaran-table";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { MdInput } from "react-icons/md";
import { BsPlusSquare } from "react-icons/all";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ModalTambahAlokasi from "./ModalTambahAlokasi";
import { BottomTooltip } from "_components";

const { SearchBar } = Search;

class RincianRKAPengeluaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSlot: 0,
      year: null,
      RKAs: null,
      showInput: false,
      showAlokasi: false,
      idxRKA: 0,
      bulanAlokasi: null,
    };
  }

  componentDidMount() {
    const currentMonth = new Date().getMonth();
    const curTimeSlot = namaBulanIndonesia[currentMonth];
    this.setState({ timeSlot: curTimeSlot, year: new Date().getFullYear() });
  }

  static getDerivedStateFromProps(nextProps) {
    return { RKAs: nextProps.RKAs };
  }

  handleChangeYear = ({ target: { value } }) =>
    this.setState({ year: Number(value) });
  handleChangeTimeSlot = ({ target: { value } }) =>
    this.setState({ timeSlot: value });
  handleOpenInput = (value) =>
    this.setState({ idxRKA: value, showInput: true });
  handleOpenAlokasi = (value) =>
    this.setState({ idxRKA: value, showAlokasi: true });
  handleCloseModalInput = () => this.setState({ showInput: false });
  handleCloseModalAlokasi = () => this.setState({ showAlokasi: false });
  handleBulanAlokasi = (value) => this.setState({ bulanAlokasi: value });

  handleUpdateRKAs = (RKA) => {
    const { RKAs, idxRKA } = this.state;
    RKAs[idxRKA] = RKA;
    this.setState({ RKAs: RKAs });
    this.forceUpdate();
  };

  render() {
    if (!this.props || !this.props.RKAs || !this.props.inputs) {
      return null;
    }
    const { unit, subunit, ADO } = this.props.inputs;
    const title = `Rincian RKA ${ADO} ${subunit} ${unit}`;
    const { showInput, showAlokasi, idxRKA, year, bulanAlokasi } = this.state;
    let { RKAs } = this.state;
    if (RKAs.length === 0)
      return (
        <AlertNotFoundRKA
          heading={`Data Belum Ada`}
          body={`Data mengenai ${title} belum ada`}
        />
      );
    RKAs = RKAs.map((RKA, idx) => {
      return {
        ...RKA,
        idx,
      };
    });
    const RKAsYear = RKAs.filter((RKA) => RKA.year === year);
    const timeSlot = this.state.timeSlot;
    const lowCaseTimeSlot = timeSlot.toLowerCase();
    const columns = tableData.getColumns(timeSlot);
    const curYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) years.push(curYear - i);
    const data =
      RKAs.length === 0
        ? null
        : RKAsYear.map((rka) => {
            const { idx } = rka;
            return {
              "Rincian Belanja": rka.rincian_belanja,
              "Alokasi Total": rka.total_rancangan,
              "Alokasi Bulan": rka.rancangan[lowCaseTimeSlot],
              "Penggunaan Bulan": rka.penggunaan[lowCaseTimeSlot],
              "Sisa Anggaran Bulan":
                rka.rancangan[lowCaseTimeSlot] -
                rka.penggunaan[lowCaseTimeSlot],
              Aksi: (
                <React.Fragment>
                  <BottomTooltip key="1" info="Input Pengeluaran">
                    <Button
                      className="m-1"
                      onClick={() => this.handleOpenInput(idx)}
                    >
                      <MdInput />
                    </Button>
                  </BottomTooltip>
                  <BottomTooltip key="2" info="Tambah Alokasi">
                    <Button
                      className="m-1"
                      variant="success"
                      onClick={() => this.handleOpenAlokasi(idx)}
                    >
                      <BsPlusSquare />
                    </Button>
                  </BottomTooltip>
                </React.Fragment>
              ),
            };
          });
    return (
      <div>
        <h2 className="mt-3">{title}</h2>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="select-year-form">
              <Form.Label>Pilih Tahun</Form.Label>
              <Form.Control as="select" onChange={this.handleChangeYear}>
                {years.map((year, id) => (
                  <option key={id} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="select-month-form">
              <Form.Label>Pilih Bulan</Form.Label>
              <Form.Control
                as="select"
                onChange={this.handleChangeTimeSlot}
                defaultValue={timeSlot}
              >
                {namaBulanIndonesia.map((bulan, ID) => (
                  <option key={ID} value={bulan}>
                    {bulan}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
        {data && (
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div className="mb-5">
                <h6>Lakukan pencarian RKA</h6>
                <SearchBar {...props.searchProps} />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  classes="table-feature"
                  striped
                  bootstrap4
                  filter={filterFactory()}
                  pagination={paginationFactory()}
                  noDataIndication={() => `Belum ada data`}
                />
              </div>
            )}
          </ToolkitProvider>
        )}
        {RKAs.length > 0 && (
          <ModalInputPengeluaran
            RKA={RKAs[idxRKA]}
            bulan={timeSlot}
            show={showInput}
            handleClose={this.handleCloseModalInput}
            handleUpdateRKAs={this.handleUpdateRKAs}
          />
        )}
        {RKAs.length > 0 && (
          <ModalTambahAlokasi
            RKA={RKAs[idxRKA]}
            bulan={timeSlot}
            show={showAlokasi}
            handleUpdateRKAs={this.handleUpdateRKAs}
            handleClose={this.handleCloseModalAlokasi}
            selectedBulan={bulanAlokasi}
            updateSelectedBulan={this.handleBulanAlokasi}
          />
        )}
      </div>
    );
  }
}

export default RincianRKAPengeluaran;
