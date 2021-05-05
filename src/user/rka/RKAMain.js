import React, {Component, createRef} from 'react';
import {ADODataService, authenticationService} from "_services";
import {RKADataService} from "_services/rka-service";
import ModalRKAForm from "./ModalRKAForm";
import RKATable from "./RKATable";
import {PaguDataService} from "../../_services/pagu-service";
import {formatRupiah} from "../../_helpers";
import {Row} from "react-bootstrap";

export class RKAMain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sisaADO: 0,
			penggunaanADO: 0,
			alokasiADO: 0,
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


	handleADOChange = (e) => {
		this.setState({currentADO: this.currentADO.current.value});
		e.preventDefault();
		const unit = this.state.unit;
		const subunit = this.state.subunit;
		const ado = this.currentADO.current.value;

		console.log(ado);

		if(ado == "ALL"){
			RKADataService.loadAllRKA(unit, subunit)
				.then(response => {
					this.setState( {RKA: response.data});
				})
				.catch(err => {
					console.log(err);
				})
		} else {
			RKADataService.getRKAUnitADO(unit, subunit, ado)
				.then(response => {
					this.setState( {RKA: response.data});
				})
				.catch(err => {
					console.log(err);
				});

			PaguDataService.getSisaPagu(unit, subunit, ado, new Date().getFullYear())
				.then(response =>{
					console.log(response.data);
					this.setState({sisaADO: response.data.value})
				})
				.catch(err => {
					console.log(err);
					this.setState({sisaADO: "-"})
				})
			PaguDataService.getAlokasiPagu(unit, subunit, ado, new Date().getFullYear())
				.then(response =>{
					console.log(response.data);
					this.setState({alokasiADO: response.data.value})
				})
				.catch(err => {
					console.log(err);
					this.setState({alokasiADO: "-"})
				})
			PaguDataService.getPenggunaanPagu(unit, subunit, ado, new Date().getFullYear())
				.then(response =>{
					console.log(response.data);
					this.setState({penggunaanADO: response.data.value})
				})
				.catch(err => {
					console.log(err);
					this.setState({penggunaanADO: "-"})
				})
		}
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
									onChange={this.handleADOChange} ref={this.currentADO}>
								<option value="ALL">All</option>
								{this.state.ADO.map(ADO => <option value={ADO}>{ADO}</option>)}
							</select> <br/>
						</form>

						<ModalRKAForm ado={ado} unit={unit} subunit={subunit}/>

					</div>
					<div className="col-10">

						Alokasi Total Anggaran {ado === "ALL" ? "" : ado} : {formatRupiah(this.state.alokasiADO)} <br/>
						Penggunaan Anggaran {ado === "ALL" ? "" : ado} sampai hari ini: {formatRupiah(this.state.penggunaanADO)} <br/>
						Sisa Anggaran {ado === "ALL" ? "" : ado} : {formatRupiah(this.state.sisaADO)} <br/>



						<RKATable ado={ado} unit={unit} subunit={subunit} rka={rka} />
					</div>

				</div>
			</div>
		);
	}
}
