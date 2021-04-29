import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {authenticationService} from "../_services";

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
                <div className="nav" onClick={() => authenticationService.logout()}>
                    Logout
                </div>
            </>
        );
    }

    userNavigation() {
        return (
            <>
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
            </>
        );
    }

    render() {
        const userInfo = this.props.userInfo;
        if (!userInfo) {
            return <div></div>
        }
        const { type } = userInfo;
        return (
            <nav className="navbar navbar-expand-lg">
                {type === "Admin" ? this.adminNavigation() : this.userNavigation()}
            </nav>
        );
    }
}