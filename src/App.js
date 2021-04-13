import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { history, getUserFromToken } from "_helpers";
import { authenticationService } from "_services";
import { PrivateRoute } from "_components";

import Admin from 'admin/admin';
import User from 'user/user';
import FormLogin from 'login/formLogin';
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
		console.log("Ini dia", currentUser);
		return (
			<div className='container'>
				<Router history={history}>
					<Switch>
						<PrivateRoute exact path="/"
									  currentUser={this.state.currentUser}
									  UserComponent={User}
									  AdminComponent={Admin}
						/>
						<Route exact path="/login" component={FormLogin} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
