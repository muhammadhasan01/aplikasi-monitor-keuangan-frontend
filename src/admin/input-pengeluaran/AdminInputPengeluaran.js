import React, { Component } from 'react';
import { UnitsDataService, ADODataService } from "_services";

export class AdminInputPengeluaran extends Component {
	constructor(props) {
		super(props);
		this.state = {
			units: [],
			ADOs: [],
			subunits: []
		};
		this.userInput = React.createRef();
	}

	componentDidMount() {
		this.retrieveUnits();
		this.retrieveADOs();
		this.retrieveSubunits();
	}

	retrieveUnits = () => {
		UnitsDataService.getDistinctUnits()
			.then(response => {
				this.setState({ units: response.data })
			})
			.catch(err => {
				console.log(err);
			});
	}

	retrieveADOs = () => {
		ADODataService.getDistinctADO()
			.then(response => {
				this.setState({ ADOs: response.data })
			})
			.catch(err => {
				console.log(err);
			})
	}

	retrieveSubunits = () => {
		UnitsDataService.getSubUnits()
			.then(response => {
				this.setState({ subunits: response.data })
			})
			.catch(err => {
				console.log(err);
		})
	}

	getRKA = (e) => {
		e.preventDefault();
		const node = this.userInput.current;
		const unit = node[0].value, subunit = node[1].value, ADO = node[2].value;
	}

	render() {
		return (
			<div className='container-fluid ml-5'>
				<h2 className='mt-3'>Input Pengeluaran Unit</h2>
				<form className="form-group" ref={this.userInput}>
					<label htmlFor="select-unit">Select Unit</label>
					<select className="form-select form-select-sm" id="select-unit">
						{ this.state.units.map((unit, ID) => <option key={ID} value={unit}>{unit}</option>) }
					</select>
					<label htmlFor="select-subunit">Select Subunit</label>
					<select className="form-select form-select-sm" id="select-subunit">
						{ this.state.subunits.map((subunit, ID) => <option key={ID} value={subunit}>{subunit}</option>) }
					</select>
					<label htmlFor="select-ADO">Select ADO</label>
					<select className="form-select form-select-sm" id="select-ADO">
						{ this.state.ADOs.map((ADO, ID) => <option key={ID} value={ADO}>{ADO}</option>) }
					</select> <br />
					<button className='btn btn-primary mt-2' onClick={this.getRKA}>Lihat RKA</button>
				</form>
			</div>
		);
	}
}
