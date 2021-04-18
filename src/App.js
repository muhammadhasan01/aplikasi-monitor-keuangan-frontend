import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import { history, getUserFromToken } from "_helpers";
import { authenticationService } from "_services";
import { PrivateRoute } from "_components";

import Admin from 'admin/Admin';
import AdminPengurusanAkun from 'admin/pengurusan-akun/AdminPengurusanAkun';
import User from 'user/User';
import FormLogin from 'login/FormLogin';
import Header from "_components/Header";
import Navigation from "_components/Navigation";
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
		return (
			<div className='container'>
				<Router history={history}>
					<Header userInfo={ this.state.currentUser } />
					<Navigation userInfo={ this.state.currentUser } />
					<Route exact path="/login" component={FormLogin} />
					<PrivateRoute exact path="/"
								  UserComponent={User}
								  AdminComponent={Admin}
					/>
					<PrivateRoute exact path="/pengurusan-akun"
								  AdminComponent={AdminPengurusanAkun}
								  UserType="Admin"
					/>
				</Router>
			</div>
		);
	}
}

export default App;
