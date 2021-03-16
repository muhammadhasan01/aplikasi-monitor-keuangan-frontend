import React, { Component } from 'react';
import AdminNav from './adminNav';
import Header from './header';

class Admin extends Component {
	render() {
		return (
			<div>
				<Header />
				<AdminNav />
			</div>
		);
	}
}

export default Admin;
