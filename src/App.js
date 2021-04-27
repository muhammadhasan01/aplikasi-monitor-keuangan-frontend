import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { history, getUserFromToken } from "_helpers";
import { authenticationService } from "_services";
import { PrivateRoute } from "_components";

import {
	Admin,
	AdminPengurusanAkun,
	AdminInputPengeluaran,
	PaguAnggaran
} from 'admin';
import User from 'user/User';
import FormLogin from 'login/FormLogin';
import Header from "_components/Header";
import Navigation from "_components/Navigation";
import RKAMain from "./user/rka/RKA-Main";
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
			<Router>
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
				<PrivateRoute exact path="/input-pengeluaran"
							  AdminComponent={AdminInputPengeluaran}
							  UserType="Admin"
				/>
				<PrivateRoute exact path="/pengisian-rka"
							  UserComponent={RKAMain}
							  UserType="User"
				/>
				<PrivateRoute exact path='/pagu-anggaran'
									AdminComponent={PaguAnggaran}/>
			</Router>
		);
	}
}

export default App;
