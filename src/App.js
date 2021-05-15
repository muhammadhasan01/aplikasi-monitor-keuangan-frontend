import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { history, getUserFromToken } from "_helpers";
import { authenticationService } from "_services";
import { PrivateRoute } from "_components";

import {
  AdminHome,
  AdminPengurusanAkun,
  AdminInputPengeluaran,
  PaguAnggaran,
  RiwayatPenggunaan,
} from "admin";

import { User, RKAMain } from "user";

import { Header, Navigation } from "_components";

import { FormLogin, ForgotPassword, ResetPassword } from "./login";

require("dotenv").config();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: getUserFromToken(x),
      })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <Header userInfo={currentUser} />
        <Navigation userInfo={currentUser} />
        <Route exact path="/login" component={FormLogin} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ResetPassword} />
        <PrivateRoute
          exact
          path="/riwayat-pengeluaran"
          AdminComponent={RiwayatPenggunaan}
          UserType="Admin"
        />
        <PrivateRoute
          exact
          path="/"
          UserComponent={User}
          AdminComponent={AdminHome}
        />
        <PrivateRoute
          exact
          path="/pengurusan-akun"
          AdminComponent={AdminPengurusanAkun}
          UserType="Admin"
        />
        <PrivateRoute
          exact
          path="/input-pengeluaran"
          AdminComponent={AdminInputPengeluaran}
          UserType="Admin"
        />
        <PrivateRoute
          exact
          path="/pengisian-rka"
          UserComponent={RKAMain}
          UserType="User"
        />
        <PrivateRoute
          exact
          path="/pagu-anggaran"
          AdminComponent={PaguAnggaran}
          UserType="Admin"
        />
      </Router>
    );
  }
}

export default App;
