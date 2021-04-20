import React, {Component, createRef} from 'react';
import {ADODataService, authenticationService} from "../../_services";
import {RKADataService} from "../../_services/rka-service";

export class RKAMain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ADO: [],
			RKA: []
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
				console.log(this.state.ADO);
			})
			.catch(err => {
				console.log(err);

			})
	}

	retrieveAllRKA = () => {
		const { unit, subunit } = authenticationService.UserInformation;
		RKADataService.loadAllRKA(unit, subunit)
			.then(response => {
				this.setState( {RKA: response.data});
				console.log(this.state.RKA);
			})
			.catch(err => {
				console.log(err);
			})
	}

	lihatRKA(e){
		console.log(this.currentADO.current);

		e.preventDefault();
	}

	handleADOChange = (e) => {
		console.log(this.currentADO.current.value);
	}

	render() {
		return (
				<form className="form-group" onSubmit={this.lihatRKA}>
					<label htmlFor="select-ADO">Select ADO</label>
					<select className="form-select form-select-sm" id="select-ADO" name="ado" onChange={this.handleADOChange} ref={this.currentADO}>
						<option value = "ALL">All</option>
						{ this.state.ADO.map(ADO => <option value={ADO}>{ADO}</option>) }
					</select> <br />
					<button className='btn btn-primary mt-2'>Lihat RKA</button>
				</form>
		);
	}
}

export default RKAMain;
