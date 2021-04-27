import React, { Component } from 'react';
import { UnitsDataService, ADODataService } from "_services";
import InputUnitADO from './InputUnitADO';
import RincianRKAPengeluaran from "./RincianRKAPengeluaran";

export class AdminInputPengeluaran extends Component {
	constructor(props) {
		super(props);
		this.state = {
			units: [],
			ADOs: [],
			subunits: [],
			RKAs: null,
			inputs: null
		};
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

	getDataRKA = (rka, inputs) => {
		this.setState({ RKAs: rka, inputs: inputs })
	}

	render() {
		return (
			<div className='container-fluid ml-5'>
				<div className='row'>
					<div className='col-3'>
						<InputUnitADO data={this.state} sendDataRKA={this.getDataRKA}/>
					</div>
					<div className='col-8 ml-3 mt-2'>
						<RincianRKAPengeluaran RKAs={this.state.RKAs} inputs={this.state.inputs} />
					</div>
				</div>
			</div>
		);
	}
}
