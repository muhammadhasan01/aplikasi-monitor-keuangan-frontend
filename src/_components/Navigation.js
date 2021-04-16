import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {authenticationService} from "../_services";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    adminNavigation() {
        return (
            <>
                <Link className="nav" to="/">
                    Home
                </Link>
                <Link className="nav" to="/paguanggaran">
                    Pagu Anggaran
                </Link>
                <Link className="nav" to="/pengurusanakun">
                    Pengurusan Akun
                </Link>
                <Link className="nav" to="/riwayatpengeluaran">
                    Riwayat Pengeluaran & Form F11
                </Link>
                <Link className="nav" to="/inputpengeluaran">
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
        const { type } = this.props.userInfo;
        return (
            <nav>
                {type === "Admin" ? this.adminNavigation() : this.userNavigation()}
            </nav>
        );
    }
}

export default Navigation;