import React, { Component } from 'react';

class HomeAdmin extends Component {
	render() {
		return (
			<div class="container">
				<div class="column left">
					<h2>Pengeluaran Terakhir</h2>
					<table class="center">
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
					<table class="center">
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
				<div class="column right">
					<div class="cetak-laporan">
						<h2>Cetak Laporan Keuangan</h2>
						<form action="GET">
							<label for="unit">Unit</label>
							<select name="unit" id="unit">
								<option value="volvo">Volvo</option>
								<option value="saab">Saab</option>
								<option value="mercedes">Mercedes</option>
								<option value="audi">Audi</option>
							</select>
							<label for="time">Time Range</label>
							<select name="from" id="from">
								<option value="1">1</option>
								<option value="2">2</option>
							</select>
							to
							<select name="to" id="to">
								<option value="1">1</option>
								<option value="2">2</option>
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

export default HomeAdmin;
