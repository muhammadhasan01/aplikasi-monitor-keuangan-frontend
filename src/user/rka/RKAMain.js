import React, {Component, createRef} from 'react';
import {ADODataService, authenticationService} from "_services";
import {RKADataService} from "_services/rka-service";
import TambahRKAForm from "./TambahRKAForm";
import { Modal, Button } from 'react-bootstrap';
import TableRKA from "./TableRKA";
import ModalRKAForm from "./TambahRKAForm";
import { Table } from 'react-bootstrap';
import {formatRupiah} from "../../_helpers";

export class RKAMain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ADO: [],
			RKA: [],
			unit: null,
			subunit: null,
			showRKAForm: false,
			currentADO: "ALL"
		}

		this.currentADO = createRef();
	}

	componentDidMount() {
		this.retrieveAllRKA();
		this.retrieveADOs();
	}

	retrieveADOs = () => {
		ADODataService.getDistinctADO()
			.then(response => {
				this.setState({ ADO: response.data });
			})
			.catch(err => {
				console.log(err);

			})
	}

	retrieveAllRKA = () => {
		const { unit, subunit } = authenticationService.UserInformation;
		this.setState({unit: unit, subunit: subunit});
		RKADataService.loadAllRKA(unit, subunit)
			.then(response => {
				this.setState( {RKA: response.data});
			})
			.catch(err => {
				console.log(err);
			})
	}


	getRKA = (e) => {
		this.setState({currentADO: this.currentADO.current.value});
		e.preventDefault();
		const unit = this.state.unit;
		const subunit = this.state.subunit;
		const ado = this.currentADO.current.value;

		console.log(ado);

		if(ado == "ALL"){
			RKADataService.loadAllRKA(unit, subunit)
				.then(response => {
					console.log("RKA", response.data);
					this.setState( {RKA: response.data});
				})
				.catch(err => {
					console.log(err);
				})
		} else {
			RKADataService.getRKAUnitADO(unit, subunit, ado)
				.then(response => {
					console.log("RKA", response.data);
					this.setState( {RKA: response.data});
				}).catch(err => {
				console.log(err);
			})
		}


	}

	handleADOChange = (e) => {
		this.setState({currentADO: e.target.value});
		console.log(this.currentADO.current.value);
	}

	renderRKARow = (rka, index) => {

		var data = Object.values(rka.rancangan).filter(elmt => typeof elmt !== "string");

		return(
			<tr key={index}>
				<td>{rka.ADO}</td>
				<td>{rka.kegiatan}</td>
				<td>{rka.subkegiatan}</td>
				<td>{rka.rincian_subkegiatan}</td>
				<td>{rka.rincian_belanja}</td>
				<td>{rka.jenis_belanja}</td>
				{data.map(bulan => <td>{formatRupiah(bulan)}</td>)}
			</tr>
		)
	}

	render() {
		const unit = this.state.unit;
		const subunit = this.state.subunit;
		const ado = this.state.currentADO;
		const rka = this.state.RKA;

		return (
			<div class="container-fluid ml-5">
				<div class="row">
					<div className="col-1.75">

						<form className="form-group">
							<label htmlFor="select-ADO">Select ADO</label>
							<select className="form-select form-select-sm" id="select-ADO" name="ado"
									onChange={this.getRKA} ref={this.currentADO}>
								<option value="ALL">All</option>
								{this.state.ADO.map(ADO => <option value={ADO}>{ADO}</option>)}
							</select> <br/>
						</form>

						<ModalRKAForm ado={ado} unit={unit} subunit={subunit}/>

					</div>
					<div className="col-10">
						<TableRKA ado={ado} unit={unit} subunit={subunit} rka={rka} />
					</div>

				</div>
			</div>
		);
	}
}
