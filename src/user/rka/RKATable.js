import React, { Component } from "react";
import { formatRupiah } from "_helpers";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import AlertNotFoundRKA from "../../admin/input-pengeluaran/AlertNotFoundRKA";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { SiMicrosoftexcel } from "react-icons/si";

const ExportCSVButton = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button
        className="btn btn-success justify-content-center align-items-center d-flex"
        onClick={handleClick}
      >
        Unduh Excel <SiMicrosoftexcel className="m-1" />
      </button>
    </div>
  );
};

var columns = [
  {
    dataField: "ADO",
    text: "ADO",
    sort: true,
  },
  {
    dataField: "kegiatan",
    text: "Kegiatan",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "subkegiatan",
    text: "Subkegiatan",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "rincian_subkegiatan",
    text: "Rincian Subkegiatan",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "rincian_belanja",
    text: "Rencana Belanja",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "jenis_belanja",
    text: "Jenis Belanja",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "januari",
    text: "Januari",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "februari",
    text: "Februari",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "maret",
    text: "Maret",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "april",
    text: "April",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "mei",
    text: "Mei",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "juni",
    text: "Juni",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "juli",
    text: "Juli",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "agustus",
    text: "Agustus",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "september",
    text: "September",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "oktober",
    text: "Oktober",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "november",
    text: "November",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
  {
    dataField: "desember",
    text: "Desember",
    sort: true,
    formatter: formatRupiah,
    hidden: true,
  },
];

class TableRKA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radio: 1,
    };
  }

  clickButton = () => {
    console.log("Button Clicked");
    console.log(columns[9].hidden);
    columns[9].hidden = !columns[9].hidden;
    this.forceUpdate();
  };

  handleColumnChange = (e) => {
    const monthOffset = 6;
    for (var i = monthOffset; i < columns.length; i++) {
      columns[i].hidden = true;
    }
    var array = [...e];
    while (array.length > 0) {
      var offset = array.pop();
      var startIter = monthOffset + (offset - 1) * 3;
      for (var i = startIter; i < startIter + 3; i++) {
        columns[i].hidden = false;
      }
    }

    this.forceUpdate();
  };

  render() {
    const unit = this.props.unit;
    const subunit = this.props.subunit;
    const ado = this.props.ado;
    const rka = this.props.rka;
    const title = `Rincian RKA ${ado} ${subunit} ${unit}`;

    const data = rka.map((elmt, id) => {
      const {
        ADO,
        kegiatan,
        subkegiatan,
        rincian_subkegiatan,
        rincian_belanja,
        jenis_belanja,
        rancangan: {
          januari,
          februari,
          maret,
          april,
          mei,
          juni,
          juli,
          agustus,
          september,
          oktober,
          november,
          desember,
        },
      } = elmt;
      return {
        id,
        ADO,
        kegiatan,
        subkegiatan,
        rincian_subkegiatan,
        rincian_belanja,
        jenis_belanja,
        januari,
        februari,
        maret,
        april,
        mei,
        juni,
        juli,
        agustus,
        september,
        oktober,
        november,
        desember,
      };
    });

    if (rka.length === 0) {
      return (
        <AlertNotFoundRKA
          heading={`Data Belum Ada`}
          body={`Data mengenai ${title} belum ada`}
        />
      );
    } else {
      return (
        <>
          <ToggleButtonGroup
            type="checkbox"
            onChange={this.handleColumnChange}
            className="mt-3 mb-3"
          >
            <ToggleButton style={{}} value={1}>
              Triwulan 1
            </ToggleButton>
            <ToggleButton value={2}>Triwulan 2</ToggleButton>
            <ToggleButton value={3}>Triwulan 3</ToggleButton>
            <ToggleButton value={4}>Triwulan 4</ToggleButton>
          </ToggleButtonGroup>

          <ToolkitProvider
            keyField="id"
            data={data}
            columns={columns}
            exportCSV
          >
            {(props) => (
              <div>
                <ExportCSVButton {...props.csvProps}>
                  Export CSV!!
                </ExportCSVButton>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  filter={filterFactory()}
                  pagination={paginationFactory()}
                  classes="table-feature"
                />
              </div>
            )}
          </ToolkitProvider>
        </>
      );
    }
  }
}

export default TableRKA;
