import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { authenticationService } from '_services';

export default function App() {
	return (
		<Router>
			<div>
				<nav>
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
				</nav>
			</div>
		</Router>
	);
}