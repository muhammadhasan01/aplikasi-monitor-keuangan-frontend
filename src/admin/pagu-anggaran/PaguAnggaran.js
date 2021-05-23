import React, { Component } from "react";
import { ADODataService, UnitsDataService, PaguDataService } from "_services";
import { Button, Container } from "react-bootstrap";
import ConfirmActionPopup from "./ConfirmActionPopup";
import NewADOForm from "./NewADOForm";
import EditPaguForm from "./EditPaguForm";
import { dataPaguAnggaran } from "./data-pagu-anggaran";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { FiEdit } from "react-icons/fi";
import { BottomTooltip } from "_components";
import { CgFileDocument } from "react-icons/cg";

export class PaguAnggaran extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ADOs: [],
      Pagus: [],
      Units: [],
      currentUnit: {
        unit: "",
        sub_unit: "",
      },
      editMode: false,
      showConfirmActionModal: false,
      showNewADOForm: false,
      newADO: {
        name: "",
        detail: "",
      },
      showEditPaguForm: false,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.retrieveADOs();
    this.retrievePagus();
    this.retrieveUnits();
  }

  retrieveADOs() {
    ADODataService.getDistinctADO()
      .then((response) => {
        this.setState({
          ADOs: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrievePagus() {
    PaguDataService.getAllPagus()
      .then((response) => {
        this.setState({
          Pagus: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveUnits() {
    UnitsDataService.getUnits()
      .then((response) => {
        this.setState({
          Units: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  resetStates() {
    this.setState({
      editMode: false,
      currentUnit: {
        unit: "",
        sub_unit: "",
      },
      currentAction: "",
      showConfirmAction: false,
      showNewADOForm: false,
      showEditPaguForm: false,
    });
  }

  showConfirmActionModal() {
    this.setState({
      showConfirmActionModal: true,
    });
  }

  hideConfirmActionModal() {
    this.setState({
      showConfirmActionModal: false,
    });
  }

  showNewADOForm() {
    this.setState({
      currentAction: "Add New ADO",
      showNewADOForm: true,
    });
  }

  hideNewADOForm() {
    this.setState({
      showNewADOForm: false,
    });
  }

  submitNewADO() {
    const data = {
      name: this.state.newADO.name,
      detail: this.state.newADO.detail,
    };
    ADODataService.createADO(data)
      .then(() => {
        // do nothing
      })
      .catch((e) => {
        console.log(e);
      });
    this.hideNewADOForm();
    this.resetStates();
  }

  onChangeADOName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        newADO: {
          ...prevState.newADO,
          name: name,
        },
      };
    });
  }

  onChangeADODetail(e) {
    const detail = e.target.value;

    this.setState(function (prevState) {
      return {
        newADO: {
          ...prevState.newADO,
          detail: detail,
        },
      };
    });
  }

  showEditPaguForm({ unit, subunit }) {
    this.setState({
      currentAction: "Edit Pagu",
      currentUnit: {
        unit: unit,
        sub_unit: subunit,
      },
      showEditPaguForm: true,
    });
  }

  hideEditPaguForm() {
    this.setState({
      showEditPaguForm: false,
    });
  }

  showEditPagu() {
    this.setState({
      currentAction: "Edit Pagus",
      editMode: true,
    });
  }

  hideEditPagu() {
    this.setState({
      editMode: false,
    });
  }

  submitEditPagu() {
    let pagu_list = this.state.Pagus;
    pagu_list.forEach((pagu) => {
      if (pagu.changed) {
        const unit = pagu.unit;
        const subunit = pagu.subunit;
        const ado = pagu.ADO;
        const year = pagu.year;
        const data = {
          alokasi: pagu.alokasi,
        };
        PaguDataService.updateAlokasiPagu(unit, subunit, ado, year, data)
          .then((response) => {
            this.hideEditPagu();
          })
          .catch((e) => {
            console.log(e);
            this.hideEditPagu();
          });
      }
    });
    this.resetStates();
  }

  onChangePagu(e) {
    let pagu_list = this.state.Pagus;
    pagu_list.forEach((pagu) => {
      let name = pagu.unit + " " + pagu.subunit + " " + pagu.ADO;
      if (name === e.target.id) {
        pagu.alokasi = e.target.value;
        pagu.changed = true;
      }
    });
    this.setState({
      Pagus: pagu_list,
    });
  }

  renderPagus() {
    const { ADOs, Units, Pagus } = this.state;
    let data = [];
    Units.forEach(({ unit, subunit }) => {
      const curData = { unit, subunit, total: 0 };
      ADOs.forEach((ADO) => {
        curData[ADO] = 0;
      });
      Pagus.forEach((Pagu) => {
        if (Pagu.unit === unit && Pagu.subunit === subunit) {
          curData[Pagu.ADO] += Number(Pagu.alokasi);
        }
      });
      ADOs.forEach((ADO) => {
        curData["total"] += curData[ADO];
      });
      curData["aksi"] = (
        <BottomTooltip key={1} info={"Edit Pagu"}>
          <Button
            variant="warning"
            onClick={() => this.showEditPaguForm({ unit, subunit })}
          >
            <FiEdit />
          </Button>
        </BottomTooltip>
      );
      data.push(curData);
    });
    const columns = dataPaguAnggaran.getColumns(ADOs);
    return (
      <BootstrapTable
        classes="table-feature"
        striped
        bootstrap4
        keyField="id"
        wrapperClasses="table-responsive"
        data={data}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
        noDataIndication="Belum ada data pagu anggaran"
      />
    );
  }

  render() {
    const {
      ADOs,
      Pagus,
      showNewADOForm,
      showEditPaguForm,
      showConfirmActionModal,
      currentUnit,
      newADO,
    } = this.state;

    return (
      <Container
        fluid
        className="mt-4 mb-5"
        style={{ width: "95%" }}
        id="pagu-anggaran"
      >
        <div id="pagu-list">
          <h3 className="float-left mb-2">Pagu Anggaran</h3>
          <Button
            className="mx-1 mb-2 float-right d-flex justify-content-center align-items-center"
            variant="success"
            onClick={() => this.showNewADOForm()}
          >
            Tambah ADO <CgFileDocument className="ml-1" />
          </Button>
        </div>
        {this.renderPagus()}
        {showNewADOForm ? (
          <NewADOForm
            name={newADO.name}
            onChangeName={(e) => this.onChangeADOName(e)}
            detail={newADO.detail}
            onChangeDetail={(e) => this.onChangeADODetail(e)}
            hide={() => this.hideNewADOForm()}
            submit={() => this.submitNewADO()}
          />
        ) : (
          ""
        )}
        {showEditPaguForm ? (
          <EditPaguForm
            selectedUnit={currentUnit}
            ados={ADOs}
            pagus={Pagus}
            onChange={(e) => this.onChangePagu(e)}
            hide={() => this.hideEditPaguForm()}
            submit={() => this.submitEditPagu()}
          />
        ) : (
          ""
        )}
        {showConfirmActionModal ? (
          <ConfirmActionPopup
            title="Edit All Pagus"
            acceptAction={() => this.submitEditPagu()}
            cancelAction={() => this.hideConfirmActionModal()}
          />
        ) : null}
      </Container>
    );
  }
}
