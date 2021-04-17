import React, { Component } from 'react';
import Header from '../_components/Header';
import Navigation from "../_components/Navigation";

class RKAMain extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { userInfo } = this.props;
		return (
			<div>
				<Header userInfo={userInfo} />
				<Navigation userInfo={userInfo} />
			</div>
		);
	}
}

export default RKAMain;
