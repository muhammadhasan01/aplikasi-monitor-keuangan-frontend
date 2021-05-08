import React, { Component } from "react";
import { ADODataService, UnitsDataService, PaguDataService } from "_services";
import { Table, Button } from 'react-bootstrap';
import ConfirmActionPopup from "./ConfirmActionPopup";
import NewADOForm from "./NewADOForm";
import EditPaguForm from "./EditPaguForm";
import PaguAnggaranRow from "./PaguAnggaranRow";

export class PaguAnggaran extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ADOs: [],
      Pagus: [],
      Units: [],
      currentUnit: {
        unit: "",
        sub_unit: ""
      },
      editMode: false,
      showConfirmActionModal: false,
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
    ADODataService.getDistinctADO()
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

  resetStates(){
    this.setState({
      editMode: false,
      currentUnit: {
        unit: "",
        sub_unit: ""
      },
      currentAction: "",
      showConfirmAction: false,
      showNewADOForm: false,
      showEditPaguForm: false
    })
  }

  showConfirmActionModal(){
    this.setState({
      showConfirmActionModal: true,
    })
  }

  hideConfirmActionModal(){
    this.setState({
      showConfirmActionModal: false,
    })
  }

  showNewADOForm(){
    this.setState({
      currentAction: "Add New ADO",
      showNewADOForm: true
    });
    console.log(this.state);
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
    this.resetStates();
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
    const unit = e.data.unit;
    const sub_unit = e.data.subunit;
    console.log(e);
    this.setState({
      currentAction: "Edit Pagu",
      currentUnit: {
        unit: unit,
        sub_unit: sub_unit,
      },
      showEditPaguForm: true
    });
    console.log(this.state.currentUnit);
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
    this.resetStates();
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
    console.log(e.target.id)
    let pagu_list = this.state.Pagus;
    pagu_list.forEach(pagu =>{
      let name = pagu.unit + " " + pagu.subunit + " " + pagu.ADO;
      if(name === e.target.id){
        pagu.alokasi = e.target.value;
        pagu.changed = true;
        console.log(name);
        console.log(pagu.alokasi)
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

      unit.ados = ados;
      unit.total = total_anggaran;
      pagu_elements.push(
        <PaguAnggaranRow
          data={unit}
          editMode={editMode}
          onChange={(e) => this.onChangePagu(e)}
          onClickEdit={(e) => this.showEditPaguForm(e)}
        />
      );
    });
    return pagu_elements;
  }

  render() {
    const { ADOs, Pagus, editMode, showNewADOForm, showEditPaguForm, showConfirmActionModal, 
      currentUnit, newADO } = this.state;

    return (
      <div id="pagu-anggaran">
        <div id="pagu-list">
          <h4>Pagu Anggaran</h4>
          {editMode ? (
            ''
          ) : (
            <div>
              <Button onClick={() => this.showNewADOForm()}>+ ADO</Button>
              <Button onClick={() => this.showEditPagu()}>Edit Pagu</Button>
            </div>
          )
          }
          <Table responsive striped bordered hover style={{backgroundColor: 'white'}}>
            <tr>
              <th><p>Unit</p></th>
              <th><p>Subunit</p></th>
              {this.renderADOs()}
              <th><p>Total</p></th>
              <th><p>Edit</p></th>
            </tr>
            {this.renderPagus()}
          </Table>
        </div>
        {editMode ? (
          <>
            <Button onClick={() => this.showConfirmActionModal()}>Submit</Button>
            <Button onClick={() => this.hideEditPagu()}>Cancel</Button>
          </>
          ) : (
            ''
          )
        }
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
            ''
          )
        }
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
            ''
          )
        }
        {showConfirmActionModal ?
            <ConfirmActionPopup
              title="Edit All Pagus"
              acceptAction={() => this.submitEditPagu()}
              cancelAction={() => this.hideConfirmActionModal()}
            /> : null
          }
      </div>
    );
  }
}