import React, { Component } from "react";
import UnitsDataService from "../../../_services/units-service";
import ADODataService from "../../../_services/ado-service";
import PaguDataService from "../../../_services/pagu-service";
import ConfirmActionPopup from "./ConfirmActionPopup";
import NewADOForm from "./NewADOForm";
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
      editMode: false,
      currentAction: "",
      confirmAction: true,
      showConfirmAction: false,
      showNewADOForm: false,
      newADO: {
        name: "",
        detail: "",
      },
      showEditUserForm: false
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
      confirmAction: false,
      showConfirmAction: true,
    })
  }

  acceptAction(){
    this.setState({
      editMode: false,
      currentAction: "",
      confirmAction: true,
      showConfirmAction: false,
      showNewADOForm: false,
      showEditUserForm: false
    })
  }

  cancelAction(){
    this.setState({
      confirmAction: false,
      showConfirmAction: false
    })
  }

  showNewADOForm(){
    this.setState({
      showNewADOForm: true
    })
  }

  hideNewADOForm(){
    this.setState({
      showNewADOForm: false
    })
  }

  submitNewADO(){
    //pagu_list.forEach(pagu =>{
    //  PaguDataService
    //})
    this.hideNewADOForm();
  }

  onChangeADOName(e){
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        newADO: {
          ...prevState.currentUser,
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
          ...prevState.currentUser,
          detail: detail
        }
      };
    });
  }

  editPagu(){
    this.setState({
      editMode: true
    })
  }

  cancelEditPagu(){
    this.setState({
      editMode: false
    })
  }

  submitEditPagu(){
    //let pagu_list = this.state.Pagus;
    //pagu_list.forEach(pagu =>{
    //  PaguDataService
    //})
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
            console.log(obj);
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
        />
      );
    });
    return pagu_elements;
  }

  render() {
    const { editMode, showNewADOForm, currentAction, showConfirmAction, newADO } = this.state;

    return (
      <div id="pagu-anggaran">
        <div id="pagu-list">
          <h4>Pagu Anggaran</h4>
          {editMode ? (
            ''
          ) : (
            <div>
              <button onClick={() => this.showNewADOForm()}>+ ADO</button>
              <button onClick={() => this.editPagu()}>Edit Pagu</button>
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
            <button onClick={() => this.submitEditPagu()}>Submit</button>
            <button onClick={() => this.cancelEditPagu()}>Cancel</button>
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
              submit={() => this.submitNewADO()}
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