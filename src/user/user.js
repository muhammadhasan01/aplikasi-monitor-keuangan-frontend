import React, { Component } from 'react';
import Header from '../_components/header';

class User extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { userInfo } = this.props;
		return (
			<div>
				<Header />
				{
					JSON.stringify(userInfo)
				}
			</div>
		);
	}
}

export default User;
