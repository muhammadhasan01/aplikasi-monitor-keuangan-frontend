import React from 'react';
import AdminHome from './adminHome';
import AdminInputPengeluaran from './adminInputPengeluaran';
import AdminPaguAnggaran from './adminPaguAnggaran';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/paguanggaran">
						<AdminPaguAnggaran />
					</Route>
					<Route path="/pengurusanakun">
						<UserManagement />
					</Route>
					<Route path="/riwayatpengeluaran">
						<Riwayat />
					</Route>
					<Route path="/inputpengeluaran">
						<AdminInputPengeluaran />
					</Route>
					<Route path="/">
						<AdminHome />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	return <h2>Home</h2>;
}

function UserManagement() {
	return <h2>User Management</h2>;
}

function Riwayat() {
	return <h2>Riwayat Pengeluaran & F11 </h2>;
}
