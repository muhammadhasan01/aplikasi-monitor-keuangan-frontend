import React, { Component } from 'react';
import Header from '../_components/Header';
import Navigation from "../_components/Navigation";

class User extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { userInfo } = this.props;
		return (
			<div className='container'>
				User Home
			</div>
		);
	}
}

export default User;
