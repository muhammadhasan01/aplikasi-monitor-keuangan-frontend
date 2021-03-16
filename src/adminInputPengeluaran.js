import React, { Component } from 'react';

class AdminInputPengeluaran extends Component {
	render() {
		return (
			<div class="container w90">
				<div class="column cekrka">
					<h2>Input Pengeluaran</h2>
					<form action="GET">
						<table>
							<tr>
								<td>Unit</td>
								<td>
									<select class="w100" name="unit" id="unit">
										<option value="IF">Teknik Mesin</option>
										<option value="TM">Teknik Informatika</option>
									</select>
								</td>
							</tr>
							<tr>
								<td>Ado</td>
								<td>
									<select class="w100" name="unit" id="unit">
										<option value="pendidikan">Pendidikan</option>
										<option value="penelitian">Penelitian</option>
										<option value="percobaan">Percobaan</option>
									</select>
								</td>
							</tr>
						</table>
						<button class="blue-btn">Lihat RKA</button>
					</form>
				</div>
				<div class="column ubahrka">
					<h2>Rincian RKA Program Studi Teknik Informatika</h2>
					<form action="GET">
						<table class="center data">
							<tr>
								<th>Uraian Belanja</th>
								<th>Alokasi Total</th>
								<th>Alokasi Triwulan 1</th>
								<th>Penggunaan Triwulan 1</th>

								<th>Sisa Anggaran Triwulan 1</th>
								<th>Aksi</th>
							</tr>
							<tr>
								<td>Pembelian Laptop Murah</td>
								<td>Rp. 1.000.000.000</td>

								<td>Rp. 500.000.000</td>
								<td>-</td>
								<td>Rp. 500.000.000</td>
								<td>
									<button class="btn-verify">Input Pengeluaran</button>
									<button class="btn-reject">Edit Pengeluaran</button>
								</td>
							</tr>
							<tr>
								<td>Pembelian Laptop Banyak</td>
								<td>Rp. 1.000.000.000</td>

								<td>Rp. 500.000.000</td>
								<td>-</td>
								<td>Rp. 500.000.000</td>
								<td>
									<button class="btn-verify">Input Pengeluaran</button>
									<button class="btn-reject">Edit Pengeluaran</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
			</div>
		);
	}
}

export default AdminInputPengeluaran;
