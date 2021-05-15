import { namaBulanIndonesia } from "./months";

export function formatTanggal(tanggal) {
  // 2021-04-28T09:26
  let jam = tanggal.substr(11, 2);
  jam = (Number(jam) + 7) % 24;
  if (jam < 10) jam = "0" + jam;
  const menit = tanggal.substr(14, 2);
  const hari = tanggal.substr(8, 2);
  const bulan = namaBulanIndonesia[Number(tanggal.substr(5, 2)) - 1];
  const tahun = tanggal.substr(0, 4);
  return `${jam}:${menit}, ${hari} ${bulan} ${tahun}`;
}