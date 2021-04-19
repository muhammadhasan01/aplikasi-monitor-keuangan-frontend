import React, { Component } from 'react';

export class Admin extends Component {
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
