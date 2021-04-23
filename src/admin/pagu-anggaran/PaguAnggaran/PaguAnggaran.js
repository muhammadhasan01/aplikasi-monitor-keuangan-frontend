import React, { Component } from "react";
import UnitsDataService from "../../../_services/units-service";
import ADODataService from "../../../_services/ado-service";
import PaguDataService from "../../../_services/pagu-service";
import ConfirmActionPopup from "./ConfirmActionPopup";
import NewADOForm from "./NewADOForm";
import EditPaguForm from "./EditPaguForm";
import PaguAnggaranRow from "./PaguAnggaranRow";

export default class PaguAnggaran extends Component {
  constructor(props) {
    super(props);
    this.acceptAction = this.acceptAction.bind(this);
    this.cancelAction = this.cancelAction.bind(this);

    this.state = {
      ADOs: [],
      Pagus: [],
      Units: [],
      currentUnit: [],
      editMode: false,
      currentAction: "",
      showConfirmAction: false,
      showNewADOForm: false,
      newADO: {
        name: "",
        detail: "",
      },
      showEditPaguForm: false
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
    ADODataService.getADOs()
      .then(response => {
        this.setState({
          ADOs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrievePagus() {
    PaguDataService.getAllPagus()
      .then(response => {
        this.setState({
          Pagus: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveUnits() {
    UnitsDataService.getUnits()
      .then(response => {
        this.setState({
          Units: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  showConfirmAction(){
    this.setState({
      showConfirmAction: true,
    })
  }

  acceptAction(){
    if (this.state.editMode || this.state.showEditPaguForm) {
      this.submitEditPagu();
    } else if (this.state.showNewADOForm) {
      this.submitNewADO();
    }
    this.setState({
      editMode: false,
      currentUnit: [],
      currentAction: "",
      showConfirmAction: false,
      showNewADOForm: false,
      showEditPaguForm: false
    })
  }

  cancelAction(){
    this.setState({
      currentAction: "",
      showConfirmAction: false
    })
  }

  showNewADOForm(){
    this.setState({
      currentAction: "Add New ADO",
      showNewADOForm: true
    })
  }

  hideNewADOForm(){
    this.setState({
      showNewADOForm: false
    })
  }

  submitNewADO(){
    const data = {
      name: this.state.newADO.name,
      detail: this.state.newADO.detail
    }
    console.log(data);
    ADODataService.createADO(data)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    this.hideNewADOForm();
  }

  onChangeADOName(e){
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        newADO: {
          ...prevState.newADO,
          name: name
        }
      };
    });
  }

  onChangeADODetail(e){
    const detail = e.target.value;

    this.setState(function(prevState) {
      return {
        newADO: {
          ...prevState.newADO,
          detail: detail
        }
      };
    });
  }

  showEditPaguForm(e){
    const unit = e.unit;
    const subunit = e.subunit;
    const ados = e.ados;
    this.setState({
      currentAction: "Edit Pagu",
      currentUnit: {
        unit: unit,
        subunit: subunit,
        ADOs: ados
      },
      showEditPaguForm: true
    })
  }

  hideEditPaguForm(){
    this.setState({
      showEditPaguForm: false
    })
  }

  showEditPagu(){
    this.setState({
      currentAction: "Edit Pagus",
      editMode: true
    })
  }

  hideEditPagu(){
    this.setState({
      editMode: false
    })
  }

  submitEditPagu(){
    let pagu_list = this.state.Pagus;
    pagu_list.forEach(pagu =>{
      if(pagu.changed){
        const unit = pagu.unit;
        const subunit = pagu.subunit;
        const ado = pagu.ADO;
        const year = pagu.year;
        const data = {
          alokasi: pagu.alokasi
        }
        PaguDataService.updateAlokasiPagu(unit, subunit, ado, year, data)
        .then(response => {
          console.log(response.data);
          this.hideEditPagu();
        })
        .catch(e => {
          console.log(e);
          this.hideEditPagu();
        });
      }
    })
  }

  renderADOs(){
    let ado_elements = [];
    let ado_list = this.state.ADOs;
    ado_list.forEach(ado =>{
      ado_elements.push(
        <th><p>{ado}</p></th>
      );
    });
    return ado_elements;
  }

  onChangePagu(e){
    let pagu_list = this.state.Pagus;
    pagu_list.forEach(pagu =>{
      let name = pagu.unit + " " + pagu.subunit + " " + pagu.ADO;
      if(name === e.target.name){
        pagu.alokasi = e.target.value;
        pagu.changed = true;
      }
    })
    this.setState({
      Pagus: pagu_list
    })
  }

  renderPagus(){
    let pagu_elements = [];
    let ado_list = this.state.ADOs;
    let pagu_list = this.state.Pagus;
    let unit_list = this.state.Units;
    let editMode = this.state.editMode;
    unit_list.forEach(unit =>{
      let total_anggaran = 0;
      let ados = [];
      ado_list.forEach(ado =>{
        let obj = {};
        obj["name"] = ado;
        obj["allocation"] = 0;
        ados.push(obj);
      });

      pagu_list.forEach(pagu =>{
        if((pagu.unit === unit.unit) && (pagu.subunit === unit.subunit)){
          ados.forEach(obj =>{
            if(obj["name"] === pagu.ADO){
              obj["allocation"] = pagu.alokasi;
            }
          });
          total_anggaran += pagu.alokasi;
        }
      });

      pagu_elements.push(
        <PaguAnggaranRow
          unit={unit.unit}
          subunit={unit.subunit}
          ados={ados}
          total={total_anggaran}
          editMode={editMode}
          onChange={(e) => this.onChangePagu(e)}
          onClickEdit={(e) => this.showEditPaguForm(e)}
        />
      );
    });
    return pagu_elements;
  }

  render() {
    const { editMode, showNewADOForm, showEditPaguForm, showConfirmAction, 
      currentUnit, newADO, currentAction } = this.state;

    return (
      <div id="pagu-anggaran">
        <div id="pagu-list">
          <h4>Pagu Anggaran</h4>
          {editMode ? (
            ''
          ) : (
            <div>
              <button onClick={() => this.showNewADOForm()}>+ ADO</button>
              <button onClick={() => this.showEditPagu()}>Edit Pagu</button>
            </div>
          )
          }
          <table id="pagu-table">
            <tr>
              <th><p>Unit</p></th>
              <th><p>Subunit</p></th>
              {this.renderADOs()}
              <th><p>Total</p></th>
              <th><p>Edit</p></th>
            </tr>
            {this.renderPagus()}
          </table>
        </div>
        {editMode ? (
          <div id="edit-buttons">
            <button onClick={() => this.showConfirmAction()}>Submit</button>
            <button onClick={() => this.hideEditPagu()}>Cancel</button>
          </div>
          ) : (
            ''
          )
        }
        {showNewADOForm ? (
          <div>
            <div class="pageDisable"></div>
            <NewADOForm
              name={newADO.name}
              onChangeName={(e) => this.onChangeADOName(e)}
              detail={newADO.detail}
              onChangeDetail={(e) => this.onChangeADODetail(e)}
              hide={() => this.hideNewADOForm()}
              submit={() => this.showConfirmAction()}
            />
          </div>
          ) : (
            ''
          )
        }
        {showEditPaguForm ? (
          <div>
            <div class="pageDisable"></div>
            <EditPaguForm
              unit={currentUnit.unit}
              subunit={currentUnit.subunit}
              ados={currentUnit.ADOs}
              onChange={(e) => this.onChangePagu(e)}
              hide={() => this.hideEditPaguForm()}
              submit={() => this.showConfirmAction()}
            />
          </div>
          ) : (
            ''
          )
        }
        {showConfirmAction ? (
          <div>
            <div class="formDisable"></div>
            <ConfirmActionPopup
              title={currentAction}
              acceptAction={() => this.acceptAction()}
              cancelAction={() => this.cancelAction()}
            />
          </div>
          ) : (
            ''
          )
        }
      </div>
    );
  }
}