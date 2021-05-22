import React, { Component } from "react";
import { Link } from "react-router-dom";
import { authenticationService } from "../_services";
import { Navbar } from "react-bootstrap";
import { AiFillHome } from "react-icons/ai";

export class Navigation extends Component {
  adminNavigation() {
    return (
      <>
        <Link className="nav" to="/">
          Home
        </Link>
        <Link className="nav" to="/pagu-anggaran">
          Pagu Anggaran
        </Link>
        <Link className="nav" to="/pengurusan-akun">
          Pengurusan Akun
        </Link>
        <Link className="nav" to="/riwayat-pengeluaran">
          Riwayat Pengeluaran & Form F11
        </Link>
        <Link className="nav" to="/input-pengeluaran">
          Input Pengeluaran
        </Link>
      </>
    );
  }

  userNavigation() {
    return (
      <Navbar bg="primary">
        <Link className="nav" to="/">
          Home
        </Link>
        <Link className="nav" to="/riwayat-keuangan">
          Riwayat Keuangan
        </Link>
        <Link className="nav" to="/lapor-pengeluaran">
          Lapor Pengeluaran
        </Link>
        <Link className="nav" to="/pengisian-rka">
          Pengisian RKA
        </Link>
        <div className="nav" onClick={() => authenticationService.logout()}>
          Logout
        </div>
      </Navbar>
    );
  }

  render() {
    const userInfo = this.props.userInfo;
    if (!userInfo) {
      return null;
    }
    const { type } = userInfo;
    return (
      <nav className="py-2">
        {type === "Admin" ? this.adminNavigation() : this.userNavigation()}
      </nav>
    );
  }
}
