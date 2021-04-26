import React, { Component } from "react";
import {RKADataService} from "_services"
import RiwayatPenggunaanRow from "./RiwayatPenggunaanRow";

export default class RiwayatPenggunaan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RKAs: [],
      currentUnit: "",
      currentSubunit: "",
      sortByDate: true,
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    this.retrieveRKAs();
  }

  retrieveRKAs() {
    RKADataService.getAllRKA()
      .then(response => {
        this.setState({
          RKAs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  filterRKAs(rkas){
    let filteredRKAs = [];
    const unit = this.state.currentUnit;
    const subunit = this.state.currentSubunit;
    rkas.forEach(rka => {
      if(((rka.unit === unit) || (unit === "")) && ((rka.sub_unit === subunit) || (subunit === ""))){
        filteredRKAs.push(rka);
      }
    });
    return filteredRKAs;
  }

  sortFunc(a, b){
    if (this.state.sortByDate){
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    } else {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
  }

  renderRKAs(){
    let rka_elements = [];
    let rka_list = this.filterRKAs(this.state.RKAs);
    rka_list
      .sort((a, b) => {
        return this.sortFunc(a, b)
      })
      .forEach(rka =>{
        rka_elements.push(
          <RiwayatPenggunaanRow
            rka={rka}
          />
        );
      });
    return rka_elements;
  }

  render() {
    return (
      <div id="riwayat-penggunaan">
        <div id="riwayat-penggunaan-list">
          <h4>Riwayat Penggunaan</h4>
          <table id="riwayat-penggunaan-table">
            <tr>
              <th><p>Unit</p></th>
              <th><p>Subunit</p></th>
              <th><p>Rincian Belanja</p></th>
              <th><p>Januari</p></th>
              <th><p>Februari</p></th>
              <th><p>Maret</p></th>
              <th><p>April</p></th>
              <th><p>Mei</p></th>
              <th><p>Juni</p></th>
              <th><p>Juli</p></th>
              <th><p>Agustus</p></th>
              <th><p>September</p></th>
              <th><p>Oktober</p></th>
              <th><p>November</p></th>
              <th><p>Desember</p></th>
              <th><p>Total</p></th>
            </tr>
            {this.renderRKAs()}
          </table>
        </div>
      </div>
    );
  }
}