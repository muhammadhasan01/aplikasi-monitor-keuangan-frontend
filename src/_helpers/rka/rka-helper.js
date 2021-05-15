export function getSisaAnggaranFromBulan(RKA, bulan) {
  return getRancanganBulan(RKA, bulan) - getPenggunaanBulan(RKA, bulan);
}

export function getRancanganBulan(RKA, bulan) {
  const { rancangan } = RKA;
  const idBulan = bulan.toLowerCase();
  return Number(rancangan[idBulan]);
}

export function getPenggunaanBulan(RKA, bulan) {
  const { penggunaan } = RKA;
  const idBulan = bulan.toLowerCase();
  return Number(penggunaan[idBulan]);
}