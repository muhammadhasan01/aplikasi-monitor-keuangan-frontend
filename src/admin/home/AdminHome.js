import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PengeluaranTerakhir from "./PengeluaranTerakhir";

export class AdminHome extends Component {
	render() {
		return (
			<Container fluid>
				<PengeluaranTerakhir />
			</Container>
		);
	}
}