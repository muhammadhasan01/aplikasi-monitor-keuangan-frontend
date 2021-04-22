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
		console.log(this.state.RKA);
	}

	renderRKA = (rka, index) => {

		var data = Object.values(rka.rancangan);
		var id = data.splice(-1,1);
		console.log(data);

		return(
			<tr key={index}>
				<td>{rka.ADO}</td>
				<td>{rka.kegiatan}</td>
				<td>{rka.subkegiatan}</td>
				<td>{rka.rincian_subkegiatan}</td>
				<td>{rka.rincian_belanja}</td>
				<td>{rka.jenis_belanja}</td>
				{data.map(bulan => <td>{bulan}</td>)}
			</tr>
		)
	}

	render() {
		return (
			<div class="container-fluid">
				<div class="row">
					<div className="col-sm">
						<form className="form-group" onSubmit={this.lihatRKA}>
							<label htmlFor="select-ADO">Select ADO</label>
							<select className="form-select form-select-sm" id="select-ADO" name="ado"
									onChange={this.handleADOChange} ref={this.currentADO}>
								<option value="ALL">All</option>
								{this.state.ADO.map(ADO => <option value={ADO}>{ADO}</option>)}
							</select> <br/>
							<button className='btn btn-primary mt-2'>Lihat RKA</button>
						</form>
					</div>

					<div class="table">
						<thead class="thead-dark">
							<th>ADO</th>
							<th>Kegiatan</th>
							<th>Subkegiatan</th>
							<th>Rincian Subkegiatan</th>
							<th>Rincian Belanja</th>
							<th>Jenis Belanja</th>
							<th>Januari</th>
							<th>Februari</th>
							<th>Maret</th>
							<th>April</th>
							<th>Mei</th>
							<th>Juni</th>
							<th>Juli</th>
							<th>Agustus</th>
							<th>September</th>
							<th>Oktober</th>
							<th>November</th>
							<th>Desember</th>
						</thead>
						<tbody class="table-striped">
							{this.state.RKA.map(this.renderRKA)}
						</tbody>
					</div>
				</div>

			</div>


		);
	}
}

export default RKAMain;
