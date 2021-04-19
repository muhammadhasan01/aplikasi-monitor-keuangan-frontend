import React, { Component } from 'react';
import { UnitsDataService, ADODataService } from "_services";

export class AdminInputPengeluaran extends Component {
	constructor(props) {
		super(props);
		this.retrieveUnits = this.retrieveUnits.bind(this);
		this.retrieveADOs = this.retrieveADOs.bind(this);
		this.state = {
			units: [],
			ADOs: []
		}
	}

	componentDidMount() {
		this.retrieveUnits();
		this.retrieveADOs();
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

	render() {
		return (
			<div className='container'>
				<h1>Input Pengeluaran Unit</h1>
				<div className="form-group">
					<label htmlFor="select-unit">Select Unit</label>
					<select className="form-select form-select-sm" id="select-unit">
						{ this.state.units.map(unit => <option value={unit}>{unit}</option>) }
					</select>
					<label htmlFor="select-unit">Select ADO</label>
					<select className="form-select form-select-sm" id="select-unit">
						{ this.state.ADOs.map(ADO => <option value={ADO}>{ADO}</option>) }
					</select>
				</div>
			</div>
		);
	}
}
