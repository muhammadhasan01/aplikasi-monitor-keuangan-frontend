import React, { Component } from 'react';

class AdminHome extends Component {
	render() {
		return (
			<div class="container w90">
				<div class="column w60">
					<h2>Pengeluaran Terakhir</h2>
					<table class="data center">
						<tr>
							<th>Tanggal</th>
							<th>Unit</th>
							<th>Jumlah</th>
							<th>Keterangan</th>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td>Beli</td>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td>Beli</td>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td>Beli</td>
						</tr>
					</table>
					<button class="blue-btn">Show More</button>

					<h2>Verifikasi Pengeluaran</h2>
					<table class="center data">
						<tr>
							<th>Tanggal</th>
							<th>Unit</th>
							<th>Dokumen</th>
							<th>Action</th>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td>
								<button class="btn-verify">Verify</button>
								<button class="btn-reject">Reject</button>
							</td>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td class="verified">Verified</td>
						</tr>
						<tr>
							<td>21 Februari 2021</td>
							<td>Teknik Informatika</td>
							<td>Rp. 500.000.000</td>
							<td class="reject">Reject</td>
						</tr>
					</table>
					<button class="blue-btn">Show More</button>
				</div>
				<div class="column w40">
					<div class="cetak-laporan">
						<h2>Cetak Laporan Keuangan</h2>
						<form action="GET">
							<label for="unit">Unit</label>
							<select name="unit" id="unit">
								<option value="IF">Teknik Mesin</option>
								<option value="TM">Teknik Informatika</option>
							</select>
							<label for="time">Time Range</label>
							<select name="from" id="from">
								<option value="1">1 Jan</option>
								<option value="2">2 Jan</option>
							</select>
							to
							<select name="to" id="to">
								<option value="1">2 Feb</option>
								<option value="2">3 Feb</option>
							</select>
							<br />
							<button class="blue-btn">See Result</button>
							<button class="blue-btn">Download</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminHome;
