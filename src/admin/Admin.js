import React, { Component } from 'react';
import AdminNav from './navigation/AdminNav';
import Header from '../_components/Header';
import Navigation from "_components/Navigation";

class Admin extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { userInfo } = this.props;
		return (
			<div>
				ADMIN HOME
			</div>
		);
	}
}

export default Admin;
