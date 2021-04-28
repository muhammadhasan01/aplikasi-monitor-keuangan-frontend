import React, { Component } from 'react';
import PengeluaranTerakhir from "./PengeluaranTerakhir";

export class AdminHome extends Component {
	render() {
		return (
			<div className='mx-5 mt-5'>
				<PengeluaranTerakhir />
			</div>
		);
	}
}