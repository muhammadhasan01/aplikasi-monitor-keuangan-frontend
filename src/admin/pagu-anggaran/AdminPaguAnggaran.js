import React, { Component } from 'react';

class AdminPaguAnggaran extends Component {
	render() {
		return (
			<div class="container w90">
				<div class="column pagu">
					<h2>Pagu Anggaran</h2>
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
								<td>Anggaran Pendidikan</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-pendidikan"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Penelitian</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-penelitian"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Pengabdian Masyarakat</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-pengabdian-masyarakat"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Pendukung Akademik</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-pendukung-akademik"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Pelayanan Mahasiswa</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-pelayanan-mahasiswa"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Operasi & Pemeliharaan</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-operasi-pemeliharaan"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Administrasi</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-administrasi"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Beasiswa</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-beasiswa"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Anggaran Kemitraan</td>
								<td>
									<input
										class="input-pagu"
										type="text"
										name="a-kemitraan"
										placeholder="Rp."
										required
									/>
									<br />
								</td>
							</tr>
							<tr>
								<td>Total Anggaran</td>
								<td>Rp.1.000.000</td>
							</tr>
						</table>
						<button class="blue-btn">Lihat RKA</button>
					</form>
				</div>
			</div>
		);
	}
}

export default AdminPaguAnggaran;
