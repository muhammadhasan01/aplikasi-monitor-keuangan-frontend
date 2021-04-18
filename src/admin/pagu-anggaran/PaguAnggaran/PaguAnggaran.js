import React, { Component } from "react";
import UnitsDataService from "../../../_services/units-service";
import ADODataService from "../../../_services/ado-service";
import PaguDataService from "../../../_services/pagu-service";
import ConfirmActionPopup from "./ConfirmActionPopup";
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
      currentAction: "",
      confirmAction: true,
      showConfirmAction: false,
      showNewUserForm: false,
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
      currentAction: "",
      confirmAction: true,
      showConfirmAction: false,
      showNewUserForm: false,
      showEditUserForm: false
    })
  }

  cancelAction(){
    this.setState({
      confirmAction: false,
      showConfirmAction: false
    })
  }

  renderADOs(){
    let ado_elements = [];
    let ado_list = this.state.ADOs;
    ado_list.forEach(ado =>{
      ado_elements.push(
        <th><p>{ado.name}</p></th>
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
        break;
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
    unit_list.forEach(unit =>{
      let total_anggaran = 0;
      let ados = [];
      ado_list.forEach(ado =>{
        ados[ado.name] = 0;
      });

      pagu_list.forEach(pagu =>{
        if((pagu.unit === unit.unit) && (pagu.subunit === unit.subunit)){
          ados[pagu.ADO] = pagu.penggunaan;
          total_anggaran += pagu.penggunaan;
        }
      });

      pagu_elements.push(
        <PaguAnggaranRow
          unit={unit.unit}
          subunit={unit.subunit}
          ados={ados}
          total={total_anggaran}
          onChange={(e) => this.onChangePagu(e)}
        />
      );
    });
    return pagu_elements;
  }

  render() {
    const { currentUser, currentAction, showConfirmAction, showNewUserForm, showEditUserForm } = this.state;

    return (
      <div id="pagu-anggaran">
        <div id="pagu-list">
          <h4>Pagu Anggaran</h4>
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
        {showConfirmAction ? (
          <div>
            <div class="formDisable"></div>
            <ConfirmActionPopup
              title={currentAction}
              acceptAction={this.acceptAction}
              cancelAction={this.cancelAction}
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