import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { history, getUserFromToken } from "_helpers";
import { authenticationService } from "_services";
import { PrivateRoute } from "_components";

import Admin from 'admin/Admin';
import User from 'user/User';
import FormLogin from 'login/FormLogin';
require('dotenv').config();

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null
		};
	}

	componentDidMount() {
		authenticationService.currentUser.subscribe(x => this.setState({
			currentUser: getUserFromToken(x)
		}));
	}

	logout() {
		authenticationService.logout();
		history.push('/');
	}

	render() {
		const { currentUser } = this.state;
		console.log("currentUser", currentUser);
		return (
			<div className='container'>
				<Router history={history}>
					<Switch>
						<Route exact path="/login" component={FormLogin} />
						<PrivateRoute exact path="/"
									  currentUser={this.state.currentUser}
									  UserComponent={User}
									  AdminComponent={Admin}
						/>

					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
