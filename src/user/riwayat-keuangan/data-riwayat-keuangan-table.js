import { formatRupiah, formatTanggal } from "_helpers";
import { textFilter } from "react-bootstrap-table2-filter";
import ButtonAksiPengeluaran from "../../admin/home/RiwayatPengeluaran/ButtonAksiPengeluaran";
import { Reply, Trash } from "react-bootstrap-icons";
import React from "react";

export const dataRiwayatKeuanganTable = {
  getColumns,
  getData,
};

function getColumns() {
  return [
    {
      dataField: "tanggal",
      text: "Tanggal",
      sort: true,
      formatter: formatTanggal,
    },
    {
      dataField: "jumlah",
      text: "Jumlah",
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "sub_unit",
      text: "Subunit",
      filter: textFilter(),
    },
    {
      dataField: "rincian_belanja",
      text: "Rencana Belanja",
      filter: textFilter(),
    },
  ];
}

function getData(pengeluaran) {
  return pengeluaran.map((p) => {
    const {
      _id,
      RKA: { sub_unit, rincian_belanja },
      jumlah,
      createdAt: tanggal,
    } = p;
    return { _id, jumlah, sub_unit, rincian_belanja, tanggal };
  });
}
