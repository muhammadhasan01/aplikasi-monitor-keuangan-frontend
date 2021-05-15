import { formatRupiah } from "_helpers";

export const tableData = {
  getColumns,
};

function getColumns(timeSlot) {
  return [
    {
      dataField: "Rincian Belanja",
      text: "Rincian Belanja",
    },
    {
      dataField: "Alokasi Total",
      text: "Alokasi Total",
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "Alokasi Bulan",
      text: `Alokasi Bulan ${timeSlot}`,
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "Penggunaan Bulan",
      text: `Penggunaan Bulan ${timeSlot}`,
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "Sisa Anggaran Bulan",
      text: `Sisa Anggaran Bulan ${timeSlot}`,
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "Aksi",
      text: "Aksi",
    },
  ];
}