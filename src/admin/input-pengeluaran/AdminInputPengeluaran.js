import React, { Component } from 'react';
import { UnitsDataService, ADODataService } from "_services";

export class AdminInputPengeluaran extends Component {
	constructor(props) {
		super(props);
		this.retrieveUnits = this.retrieveUnits.bind(this);
		this.retrieveADOs = this.retrieveADOs.bind(this);
		this.retrieveSubunits = this.retrieveSubunits.bind(this);
		this.state = {
			units: [],
			ADOs: [],
			subunits: []
		}
	}

	componentDidMount() {
		this.retrieveUnits();
		this.retrieveADOs();
		this.retrieveSubunits();
	}

	retrieveUnits() {
		UnitsDataService.getDistinctUnits()
			.then(response => {
				this.setState({ units: response.data })
			})
			.catch(err => {
				console.log(err);
			});
	}

	retrieveADOs() {
		ADODataService.getDistinctADO()
			.then(response => {
				this.setState({ ADOs: response.data })
			})
			.catch(err => {
				console.log(err);
			})
	}

	retrieveSubunits() {
		UnitsDataService.getSubUnits()
			.then(response => {
				this.setState({ subunits: response.data })
			})
			.catch(err => {
				console.log(err);
		})
	}

	render() {
		return (
			<div className='container'>
				<h2 className='mt-3'>Input Pengeluaran Unit</h2>
				<div className="form-group">
					<label htmlFor="select-unit">Select Unit</label>
					<select className="form-select form-select-sm" id="select-unit">
						{ this.state.units.map(unit => <option value={unit}>{unit}</option>) }
					</select>
					<label htmlFor="select-subunit">Select Subunit</label>
					<select className="form-select form-select-sm" id="select-subunit">
						{ this.state.subunits.map(subunit => <option value={subunit}>{subunit}</option>) }
					</select>
					<label htmlFor="select-ADO">Select ADO</label>
					<select className="form-select form-select-sm" id="select-ADO">
						{ this.state.ADOs.map(ADO => <option value={ADO}>{ADO}</option>) }
					</select> <br />
					<button className='btn btn-primary mt-2'>Lihat RKA</button>
				</div>
			</div>
		);
	}
}
